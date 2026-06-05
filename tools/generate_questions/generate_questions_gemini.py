#!/usr/bin/env python3
"""
generate_questions_gemini.py
----------------------------
Uses the Google GenAI SDK to generate fill-in-the-blank quiz questions for
AWL Sublist 2 and 3 words. Structured output via Pydantic schema guarantees
valid JSON. A multi-turn self-correction loop feeds programmatic validation
errors back to the model before saving any batch.

Usage:
    python tools/generate_questions/generate_questions_gemini.py \
        --input  js/word-data.json \
        --output js/question-bank-sl23.json \
        [--batch-size 5] \
        [--resume] \
        [--sublist 2] \
        [--dry-run]

Requirements:
    pip install -r tools/generate_questions/requirements.txt
"""

import argparse
import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path
from typing import Literal  # used for level field only

from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from google.genai.errors import APIError, ClientError
from dotenv import load_dotenv

# ── Constants ──────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).parents[2]
ENV_FILE     = PROJECT_ROOT / ".env.local"

MAX_API_RETRIES      = 5   # Retries for transient network / rate-limit errors
MAX_CORRECTION_TURNS = 3   # Self-correction passes after validation failures
BASE_DELAY           = 2   # seconds; doubles on each retry

MODEL = "gemini-2.5-pro"

# Verbs that cannot take a direct object — used in the transitive-slot check
INTRANSITIVE_VERBS = {"occur", "respond", "proceed", "participate", "vary"}

# Article/determiner prefixes that signal a direct object follows the blank
DIRECT_OBJECT_PREFIXES = {
    "a ", "an ", "the ", "some ", "any ",
    "their ", "its ", "our ", "your ", "my ",
    "this ", "that ", "these ", "those ",
    "new ", "important ", "significant ", "valuable ",
    "public ", "corporate ", "social ", "environmental ",
    "each ", "every ", "all ", "both ",
}

# ── Pydantic schema ────────────────────────────────────────────────────────────

class QuizQuestion(BaseModel):
    word:        str                                    = Field(description="Target word base form, exactly as given")
    level:       Literal["learn", "proficient", "master"] = Field(description="Difficulty level")
    q_number:    int                                    = Field(description="1 or 2 — question number within this level")
    passage:     str                                    = Field(description="Sentence with exactly one ___ blank")
    distractors: list[str]                              = Field(description="Exactly 4 wrong-answer words, same POS as target")

class QuizBatch(BaseModel):
    questions: list[QuizQuestion]

# ── System prompt ──────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an expert vocabulary quiz author for the Academic Word List (AWL).
Your task is to generate fill-in-the-blank quiz questions for a vocabulary learning app
used by secondary school students (approximately Grade 9).

## OUTPUT FORMAT

Return a structured QuizBatch containing exactly N × 6 questions (2 per level × 3 levels),
grouped per word: learn/1, learn/2, proficient/1, proficient/2, master/1, master/2.

## GRAMMAR RULE (HARD CONSTRAINT)

Every passage must be grammatically correct with the exact BASE FORM of the word in the blank.
Use: modal + base verb ("must ___"), infinitive ("aim is to ___"),
     present simple plural ("researchers ___"), auxiliary verbs ("can", "will", "should", "may").
NEVER write a passage requiring -s/-es, -ed, or -ing in the blank.

## PART-OF-SPEECH RULES

- NOUN targets must appear in noun syntactic slots (subject, object, complement, after a determiner).
  NEVER place a noun after a modal verb ("must ___", "can ___") as if it were a verb.
- ADJECTIVE targets must appear in adjective slots (before a noun, or after a linking verb like "is", "seems", "appears").
  NEVER place an adjective after a modal verb as if it were a verb.
- VERB targets must appear in verb slots.

## LEVEL GUIDELINES

LEARN (q_number 1 and 2):
  - One clear sentence, maximum 20 words.
  - The correct answer must be obvious from strong context clues.
  - Distractors: choose 4 from the LEARN DISTRACTOR POOL matching the word's part of speech.
  - The two learn passages must cover different scenarios or subject areas.

PROFICIENT (q_number 1 and 2):
  - One to two sentences, maximum 30 words.
  - Context narrows the answer but requires genuine word knowledge.
  - Distractors: choose 4 from the PROFICIENT/MASTER DISTRACTOR POOL, same POS, plausible register but wrong here.
  - The two proficient passages must cover different scenarios or subject areas.

MASTER (q_number 1 and 2):
  - One to two sentences, maximum 35 words.
  - Tests precise usage, collocations, or register distinctions.
  - Use the word's collocation data to write natural academic passages.
  - Distractors: near-plausible — require genuine understanding to eliminate.
  - The two master passages must cover different scenarios and draw on different collocations.

## LEARN DISTRACTOR POOLS (by part of speech)

Verb targets:      create, vary, occur, respond, proceed, legislate, distribute,
                   require, define, establish, indicate, involve
Noun targets:      formula, method, period, source, income, section,
                   factor, theory, role, policy, function, structure
Adjective targets: available, evident, legal, major, significant, similar, specific

## PROFICIENT / MASTER DISTRACTOR POOLS (by part of speech)

Verb targets:
  Primary:  achieve, conduct, obtain, evaluate, restrict, select, demonstrate, justify
  Extended: allocate, clarify, compile, convert, implement, monitor,
            supplement, transform, undertake, verify

Noun targets:
  Primary:  outcome, component, scheme, framework, task, emphasis, alternative, element
  Extended: capacity, constraint, diversity, mechanism, parameter,
            priority, tendency, variation

Adjective targets:
  Primary:  appropriate, relevant, sufficient, dominant, initial, constant, primary, technical
  Extended: ambiguous, coherent, compatible, explicit, implicit,
            marginal, preliminary, systematic

Choose 4 from the combined pool. Do NOT use the same 4 across both proficient questions
or both master questions. Vary the selection within each word.

## DISTRACTOR RULES

1. NEVER use a near-synonym of the target as a distractor.
2. Do not use any word from the input "synonyms" or "taboo_words" arrays as a distractor.
3. Pre-validate every distractor: read the passage with each distractor in the blank —
   it must NOT make sense or fit grammatically.
4. Intransitive verbs (occur, respond, proceed, participate, vary) cannot be distractors
   when the blank is immediately followed by a direct object noun phrase.
5. All 4 distractors must be the same part of speech as the target word.
6. Exclude any word that is itself a target in the current batch.
7. Do not repeat any single distractor more than twice across all 6 questions for one word.

## PASSAGE RULES

1. Exactly one ___ (three underscores) per passage. No spaces around them.
2. Do not use the target word anywhere in the passage.
3. Do not use any word from the "taboo_words" list anywhere in the passage.
4. Academic register suitable for Grade 9–10 students.
5. Rotate subject domains across the 6 questions (science, law, business,
   education, environment, health) — do not use the same domain twice in a row.
"""

# ── Prompt builder ─────────────────────────────────────────────────────────────

def build_user_message(batch: list[dict]) -> str:
    n = len(batch)
    return (
        f"Generate quiz questions for the following {n} word(s).\n\n"
        f"Word data:\n{json.dumps(batch, indent=2)}\n\n"
        f"Return exactly {n * 6} question objects.\n"
        f"Respect each word's 'taboo_words' and 'synonyms' when choosing distractors.\n"
        f"Use each word's 'collocations' for master-level passages.\n"
        f"Exclude these batch words from all distractor pools: {[w['word'] for w in batch]}."
    )

# ── Validation ─────────────────────────────────────────────────────────────────

def validate_questions(questions: list[dict], expected_words: list[str],
                       word_data: dict[str, dict]) -> list[str]:
    """
    Full validation sweep. Returns a list of error strings; empty = valid.
    Checks: schema, counts, blank presence, inflection, target-in-passage,
    taboo-in-passage, taboo/synonym as distractor, intransitive in transitive slot.
    """
    errors = []
    expected_set = set(expected_words)

    for i, q in enumerate(questions):
        loc   = f"[item {i} / {q.get('word','?')} {q.get('level','?')}/{q.get('q_number','?')}]"
        word  = q.get("word", "")
        psg   = q.get("passage", "")
        dists = q.get("distractors", [])
        wdata = word_data.get(word, {})

        # Schema
        for key in ("word", "level", "q_number", "passage", "distractors"):
            if key not in q:
                errors.append(f"{loc} missing key '{key}'")

        if word not in expected_set:
            errors.append(f"{loc} unexpected word '{word}'")

        if psg.count("___") != 1:
            errors.append(f"{loc} passage must contain exactly one '___'")

        if not isinstance(dists, list) or len(dists) != 4:
            errors.append(f"{loc} distractors must be a list of exactly 4 strings")

        if not psg or not word:
            continue

        # Target word in its own passage
        if re.search(rf"\b{re.escape(word)}\b", psg, re.I):
            errors.append(f"{loc} target word '{word}' appears in its own passage")

        # Inflected form of target in passage
        if re.search(rf"\b{re.escape(word)}(?:s|ed|ing|er)\b", psg, re.I):
            errors.append(f"{loc} inflected form of '{word}' appears in passage")

        # Taboo word in passage
        taboo    = [t.lower() for t in wdata.get("taboo_words", [])]
        synonyms = [s.lower() for s in wdata.get("synonyms", [])]
        for t in taboo:
            if re.search(rf"\b{re.escape(t)}\b", psg.lower()):
                errors.append(f"{loc} taboo word '{t}' appears in passage")

        # Taboo word or synonym used as distractor
        for d in dists:
            if d.lower() in taboo:
                errors.append(f"{loc} taboo word '{d}' used as distractor")
            if d.lower() in synonyms:
                errors.append(f"{loc} synonym '{d}' used as distractor")

        # Intransitive verb distractor in a transitive slot
        blank_pos = psg.find("___")
        if blank_pos != -1:
            after = psg[blank_pos + 3:].strip().lower()
            bad   = [d for d in dists if d.lower() in INTRANSITIVE_VERBS]
            if bad and any(after.startswith(p) for p in DIRECT_OBJECT_PREFIXES):
                errors.append(
                    f"{loc} intransitive distractor(s) {bad} used in transitive slot "
                    f"(blank followed by direct object: '{after[:20]}...')"
                )

    # Count check
    counts = Counter(q["word"] for q in questions if "word" in q)
    for w in expected_words:
        if counts.get(w, 0) != 6:
            errors.append(f"Expected 6 questions for '{w}', got {counts.get(w, 0)}")

    return errors

# ── API call with separate retry and correction loops ─────────────────────────

def call_api(client: genai.Client, contents: list, config: types.GenerateContentConfig,
             batch_index: int) -> str:
    """
    Calls the Gemini API with exponential backoff for transient errors.
    Returns raw response text. Raises RuntimeError if all retries exhausted.
    """
    for attempt in range(MAX_API_RETRIES):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=contents,
                config=config,
            )
            usage = response.usage_metadata
            if usage:
                print(
                    f"    tokens — in: {usage.prompt_token_count}, "
                    f"out: {usage.candidates_token_count}"
                )
            return response.text

        except ClientError as e:
            # 429 rate limit or 503 unavailable → retry
            if e.status_code in (429, 503):
                delay = BASE_DELAY * (2 ** attempt)
                print(f"    Rate limit / overload (attempt {attempt + 1}). Retrying in {delay}s...")
                time.sleep(delay)
            else:
                raise  # 4xx auth errors etc. are not retryable

        except APIError as e:
            delay = BASE_DELAY * (2 ** attempt)
            print(f"    API error (attempt {attempt + 1}): {e}. Retrying in {delay}s...")
            time.sleep(delay)

    raise RuntimeError(f"Max API retries exceeded on batch {batch_index}")

def generate_batch(client: genai.Client, batch: list[dict],
                   word_data: dict[str, dict], batch_index: int) -> list[dict]:
    """
    Generates questions for one batch. If validation finds errors, feeds them
    back to the model in a multi-turn correction loop (up to MAX_CORRECTION_TURNS).
    Raises RuntimeError if corrections are exhausted without a clean result.
    """
    batch_words = [w["word"] for w in batch]

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        response_mime_type="application/json",
        response_schema=QuizBatch,
        temperature=0.15,
    )

    # Conversation history — grows with each correction turn
    contents = [
        types.Content(role="user", parts=[types.Part.from_text(text=build_user_message(batch))])
    ]

    for turn in range(1, MAX_CORRECTION_TURNS + 1):
        print(f"  Turn {turn}/{MAX_CORRECTION_TURNS}...")

        raw = call_api(client, contents, config, batch_index)

        try:
            data      = json.loads(raw)
            questions = [q.model_dump() if hasattr(q, "model_dump") else q
                         for q in data.get("questions", data if isinstance(data, list) else [])]
        except (json.JSONDecodeError, TypeError, AttributeError) as e:
            raise RuntimeError(f"JSON parse failed on batch {batch_index}: {e}")

        errors = validate_questions(questions, batch_words, word_data)

        if not errors:
            if turn > 1:
                print(f"  ✓ Self-correction succeeded on turn {turn}.")
            return questions

        # Show errors and build a targeted critique
        print(f"  ⚠  {len(errors)} validation error(s):")
        for err in errors[:5]:
            print(f"    • {err}")
        if len(errors) > 5:
            print(f"    • … and {len(errors) - 5} more")

        if turn == MAX_CORRECTION_TURNS:
            break  # Don't append a critique we'll never use

        # Targeted critique: list every failing item with its specific error
        critique = (
            "Your response failed the following programmatic validation checks:\n\n"
            + "\n".join(f"- {e}" for e in errors)
            + "\n\nPlease fix only the failing items. For each error:\n"
              "  • If the passage uses a taboo word or the target word — rewrite the passage.\n"
              "  • If a distractor is a synonym, taboo word, or intransitive verb in a "
              "transitive slot — replace it with a valid word from the appropriate distractor pool.\n"
              "  • Do not change items that passed validation.\n"
              "Return the complete corrected question list."
        )

        contents.append(types.Content(role="model", parts=[types.Part.from_text(text=raw)]))
        contents.append(types.Content(role="user",  parts=[types.Part.from_text(text=critique)]))

    raise RuntimeError(
        f"Batch {batch_index}: still {len(errors)} error(s) after {MAX_CORRECTION_TURNS} correction turns"
    )

# ── Scratch file helpers ───────────────────────────────────────────────────────

def load_completed_words(scratch_path: Path) -> set[str]:
    if not scratch_path.exists():
        return set()
    words = set()
    with scratch_path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                try:
                    words.add(json.loads(line)["word"])
                except (json.JSONDecodeError, KeyError):
                    pass
    return words

def append_to_scratch(scratch_path: Path, questions: list[dict]) -> None:
    with scratch_path.open("a", encoding="utf-8") as f:
        for q in questions:
            f.write(json.dumps(q, ensure_ascii=False) + "\n")

def scratch_to_output(scratch_path: Path, output_path: Path) -> int:
    questions = []
    with scratch_path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                questions.append(json.loads(line))
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    return len(questions)

def dump_failed(output_path: Path, batch_index: int, detail: str) -> None:
    path    = output_path.parent / f"failed_batch_{batch_index}.json"
    payload = {"batch_index": batch_index, "detail": detail}
    with path.open("w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print(f"  Saved failure details to: {path}")

# ── CLI ────────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate AWL quiz questions using the Gemini API."
    )
    parser.add_argument("--input",      required=True,              help="Path to word-data.json")
    parser.add_argument("--output",     required=True,              help="Path for output JSON file")
    parser.add_argument("--batch-size", type=int, default=5,        help="Words per API call (default: 5)")
    parser.add_argument("--resume",     action="store_true",        help="Skip words already in scratch file")
    parser.add_argument("--sublist",    type=int, choices=[2, 3],   help="Process only SL2 or SL3")
    parser.add_argument("--dry-run",    action="store_true",        help="Print first batch prompt and exit")
    return parser.parse_args()

# ── Main ───────────────────────────────────────────────────────────────────────

def main() -> None:
    args = parse_args()

    # Load API key
    load_dotenv(dotenv_path=ENV_FILE, override=True)
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        sys.exit(f"Error: GEMINI_API_KEY not found in {ENV_FILE}")

    # Resolve paths
    input_path   = Path(args.input)  if Path(args.input).is_absolute()  else PROJECT_ROOT / args.input
    output_path  = Path(args.output) if Path(args.output).is_absolute() else PROJECT_ROOT / args.output
    scratch_path = output_path.with_suffix(".tmp.jsonl")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Load word data
    with input_path.open(encoding="utf-8") as f:
        all_words = json.load(f)
    word_data = {w["word"]: w for w in all_words}  # keyed for fast validation lookups

    if args.sublist:
        all_words = [w for w in all_words if w["sublist"] == args.sublist]
    all_words.sort(key=lambda w: (w["sublist"], w["word"]))

    # Resume: skip completed words
    if args.resume:
        completed = load_completed_words(scratch_path)
        remaining = [w for w in all_words if w["word"] not in completed]
        if completed:
            print(f"Resuming: {len(completed)} words done, {len(remaining)} remaining.")
    else:
        remaining = all_words

    if not remaining:
        print("Nothing to do — all words already processed.")
        if scratch_path.exists():
            count = scratch_to_output(scratch_path, output_path)
            print(f"Output written: {output_path} ({count} questions)")
        return

    batches = [remaining[i : i + args.batch_size]
               for i in range(0, len(remaining), args.batch_size)]
    total   = len(remaining) * 6

    print(
        f"\n{'─' * 60}\n"
        f"  Words to process : {len(remaining)}\n"
        f"  Batch size       : {args.batch_size}\n"
        f"  Batches          : {len(batches)}\n"
        f"  Questions target : {total}\n"
        f"  Model            : {MODEL}\n"
        f"  Correction turns : {MAX_CORRECTION_TURNS}\n"
        f"  Output           : {output_path}\n"
        f"{'─' * 60}\n"
    )

    # Dry run: show prompt and exit
    if args.dry_run:
        print("=== SYSTEM PROMPT ===")
        print(SYSTEM_PROMPT)
        print("\n=== FIRST BATCH USER MESSAGE ===")
        print(build_user_message(batches[0]))
        return

    client         = genai.Client(api_key=api_key)
    failed_batches = []
    start_time     = time.time()

    for batch_index, batch in enumerate(batches, start=1):
        batch_words = [w["word"] for w in batch]
        print(f"Batch {batch_index}/{len(batches)}: {batch_words}")

        try:
            questions = generate_batch(client, batch, word_data, batch_index)
            append_to_scratch(scratch_path, questions)
            elapsed = time.time() - start_time
            print(f"  ✓ {len(questions)} questions saved  (elapsed: {elapsed:.0f}s)")

        except Exception as e:
            print(f"  ✗ Batch {batch_index} failed: {e}")
            failed_batches.append(batch_index)
            dump_failed(output_path, batch_index, str(e))

    # Finalise
    print(f"\n{'─' * 60}")
    if scratch_path.exists():
        count = scratch_to_output(scratch_path, output_path)
        print(f"Output written : {output_path} ({count} questions)")
    else:
        print("No questions saved — check failed batch files.")

    if failed_batches:
        print(f"\n⚠  {len(failed_batches)} batch(es) failed: {failed_batches}")
        print("   Re-run with --resume to retry failed words.")
    else:
        print("All batches completed successfully.")
    print(f"{'─' * 60}\n")


if __name__ == "__main__":
    main()
