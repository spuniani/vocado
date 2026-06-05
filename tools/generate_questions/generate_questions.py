#!/usr/bin/env python3
"""
generate_questions.py
---------------------
Uses the Claude API to generate fill-in-the-blank quiz questions for AWL
Sublist 2 and 3 words, outputting them in the same format as question-bank.js.

Usage:
    python tools/generate_questions/generate_questions.py \
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
import sys
import time
from collections import Counter
from pathlib import Path

import anthropic
from dotenv import load_dotenv

# ── Constants ──────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).parents[2]
ENV_FILE     = PROJECT_ROOT / ".env.local"

MAX_RETRIES = 5
BASE_DELAY  = 2   # seconds; doubles on each retry (exponential backoff)
MODEL       = "claude-sonnet-4-5"
MAX_TOKENS  = 8192  # 5 words × 6 questions × ~120 tokens each, with headroom

# ── System prompt ──────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an expert vocabulary quiz author for the Academic Word List (AWL).
Your task is to generate fill-in-the-blank quiz questions for a vocabulary learning app
used by secondary school students (approximately Grade 9).

## OUTPUT FORMAT

Return ONLY a valid JSON array. No prose, no markdown fences, no explanation.
Each object has exactly these keys:
  "word"        : string  — the target word (base form, exactly as given)
  "level"       : string  — one of: "learn", "proficient", "master"
  "q_number"    : integer — 1 or 2
  "passage"     : string  — a sentence with exactly one blank marked as ___
  "distractors" : array   — exactly 4 strings, each a wrong-answer word

For N input words, return exactly N × 6 objects (2 per level × 3 levels), grouped per word:
learn/1, learn/2, proficient/1, proficient/2, master/1, master/2 — then the next word.

## GRAMMAR RULE (HARD CONSTRAINT)

Every passage must be grammatically correct when the exact BASE FORM of the word fills the blank.
Construct passages using:
  - modal + base verb:        "Students must ___ the data carefully."
  - infinitive construction:  "The aim is to ___ a clear result."
  - present simple (first or second person, or plural subject):
                              "Researchers often ___ samples from..."
  - auxiliary verbs: "can", "will", "should", "need to", "be able to", "may", "might"

NEVER write a passage that requires -s/-es, -ed, or -ing in the blank.
Before finalising each passage, read it aloud with the base form in the blank to confirm it sounds natural.

## LEVEL GUIDELINES

LEARN (q_number 1 and 2):
  - One clear sentence, maximum 20 words.
  - The correct answer must be obvious from strong context clues.
  - Distractors: choose 4 from the LEARN DISTRACTOR POOL matching the word's part of speech.
  - The two learn passages must cover different scenarios or subject areas.

PROFICIENT (q_number 1 and 2):
  - One to two sentences, maximum 30 words.
  - Context narrows the answer but requires genuine knowledge of the word's meaning.
  - Distractors: choose 4 from the PROFICIENT/MASTER DISTRACTOR POOL matching the word's POS.
    They must be plausible in register but clearly wrong in this specific passage.
  - The two proficient passages must cover different scenarios or subject areas.

MASTER (q_number 1 and 2):
  - One to two sentences, maximum 35 words.
  - Tests precise usage, collocations, or register distinctions.
  - Use the word's collocation data (provided per word) to write natural academic passages.
  - Distractors: choose 4 from the PROFICIENT/MASTER DISTRACTOR POOL; they must be
    near-plausible enough to require genuine understanding to eliminate.
  - The two master passages must cover different scenarios and draw on different collocations.

## LEARN DISTRACTOR POOLS (by part of speech)

Verb targets:
  create, vary, occur, respond, proceed, legislate, distribute,
  require, define, establish, indicate, involve

Noun targets:
  formula, method, period, source, income, section,
  factor, theory, role, policy, function, structure

Adjective targets:
  available, evident, legal, major, significant, similar, specific

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

Choose 4 from the combined primary + extended pool matching the word's POS.
Do NOT use the same 4 distractors across both proficient questions, or across both master questions.

## DISTRACTOR RULES (apply to all levels)

1. NEVER use a near-synonym of the target as a distractor. If the target is "evaluate",
   do not use "assess". If the target is "achieve", do not use "attain" or "accomplish".
   When in doubt, exclude the word.
2. Do not use any word from the input word's "synonyms" array as a distractor.
3. Do not use any word from the input word's "taboo_words" array as a distractor.
4. Pre-validate: read the passage with each distractor in the blank — it must NOT make sense.
5. All 4 distractors must be the same part of speech as the target word.
6. Exclude any word that is itself a target word in the current batch.
7. Do not repeat any single distractor more than twice across all 6 questions for one word.

## PASSAGE RULES

1. Exactly one ___ (three underscores) per passage. No spaces around the underscores.
2. Do not use the target word itself anywhere in the passage.
3. Do not use any word from the "taboo_words" list anywhere in the passage.
4. Academic register: clear, formal English suitable for a Grade 9–10 student.
5. Rotate subject domains across the 6 questions for each word (e.g. science, law, business,
   education, environment, health) — do not use the same domain twice in a row.
"""


# ── Prompt builder ─────────────────────────────────────────────────────────────

def build_user_message(batch: list[dict]) -> str:
    n = len(batch)
    word_data = json.dumps(batch, indent=2)
    return (
        f"Generate quiz questions for the following {n} word(s).\n\n"
        f"Word data:\n{word_data}\n\n"
        f"Return a JSON array of exactly {n * 6} question objects following the system prompt rules.\n"
        f"Respect each word's \"taboo_words\" and \"synonyms\" when choosing distractors.\n"
        f"Use each word's \"collocations\" to craft the master-level passages.\n"
        f"Exclude all words in this batch from the distractor pools: "
        f"{[w['word'] for w in batch]}."
    )


# ── Validation ─────────────────────────────────────────────────────────────────

def validate_questions(questions: list, expected_words: list[str]) -> list[str]:
    """Return a list of error strings. Empty list means valid."""
    errors = []
    expected_set = set(expected_words)

    for i, q in enumerate(questions):
        loc = f"[item {i}]"
        for key in ("word", "level", "q_number", "passage", "distractors"):
            if key not in q:
                errors.append(f"{loc} missing key '{key}'")

        word = q.get("word")
        if word not in expected_set:
            errors.append(f"{loc} unexpected word '{word}'")

        if q.get("level") not in ("learn", "proficient", "master"):
            errors.append(f"{loc} invalid level '{q.get('level')}' for word '{word}'")

        if q.get("q_number") not in (1, 2):
            errors.append(f"{loc} invalid q_number '{q.get('q_number')}' for word '{word}'")

        passage = q.get("passage", "")
        if passage.count("___") != 1:
            errors.append(f"{loc} passage must contain exactly one '___' (word '{word}')")

        distractors = q.get("distractors")
        if not isinstance(distractors, list) or len(distractors) != 4:
            errors.append(f"{loc} distractors must be a list of exactly 4 strings (word '{word}')")

    # Count check: each word must have exactly 6 questions
    word_counts = Counter(q["word"] for q in questions if "word" in q)
    for word in expected_words:
        count = word_counts.get(word, 0)
        if count != 6:
            errors.append(f"Expected 6 questions for '{word}', got {count}")

    return errors


# ── API call with retry ────────────────────────────────────────────────────────

def call_api(client: anthropic.Anthropic, user_message: str, batch_index: int) -> str:
    """Call the API with exponential backoff. Returns raw response text."""
    nudge = ""
    for attempt in range(MAX_RETRIES):
        try:
            user_content = user_message + nudge
            response = client.messages.create(
                model=MODEL,
                max_tokens=MAX_TOKENS,
                system=[
                    {
                        "type": "text",
                        "text": SYSTEM_PROMPT,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": user_content}],
            )

            # Log cache performance
            usage = response.usage
            cached = getattr(usage, "cache_read_input_tokens", 0) or 0
            created = getattr(usage, "cache_creation_input_tokens", 0) or 0
            print(
                f"  tokens — in: {usage.input_tokens}, out: {usage.output_tokens}, "
                f"cache_read: {cached}, cache_created: {created}"
            )

            text = response.content[0].text
            if not text or not text.strip():
                raise ValueError("API returned empty response — treating as retryable error")
            return text

        except anthropic.RateLimitError:
            delay = BASE_DELAY * (2 ** attempt)
            print(f"  Rate limited on batch {batch_index}. Retrying in {delay}s...")
            time.sleep(delay)

        except anthropic.APIStatusError as e:
            if e.status_code >= 500:
                delay = BASE_DELAY * (2 ** attempt)
                print(f"  Server error {e.status_code} on batch {batch_index}. Retrying in {delay}s...")
                time.sleep(delay)
            else:
                print(f"  API error {e.status_code}: {e.message}")
                raise

        except anthropic.APIConnectionError:
            delay = BASE_DELAY * (2 ** attempt)
            print(f"  Connection error on batch {batch_index}. Retrying in {delay}s...")
            time.sleep(delay)

        # On parse failure nudge — only set after first attempt
        nudge = "\n\nIMPORTANT: Return ONLY the raw JSON array. No markdown, no explanation."

    raise RuntimeError(f"Max retries exceeded on batch {batch_index}")


# ── Scratch file helpers ───────────────────────────────────────────────────────

def load_completed_words(scratch_path: Path) -> set[str]:
    """Return set of words already written to the scratch file."""
    if not scratch_path.exists():
        return set()
    words = set()
    with scratch_path.open() as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                q = json.loads(line)
                words.add(q["word"])
            except (json.JSONDecodeError, KeyError):
                pass
    return words


def append_to_scratch(scratch_path: Path, questions: list[dict]) -> None:
    """Atomically append a batch of questions to the scratch file."""
    with scratch_path.open("a", encoding="utf-8") as f:
        for q in questions:
            f.write(json.dumps(q, ensure_ascii=False) + "\n")


def scratch_to_output(scratch_path: Path, output_path: Path) -> int:
    """Convert JSONL scratch file to final JSON array. Returns question count."""
    questions = []
    with scratch_path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                questions.append(json.loads(line))

    with output_path.open("w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    return len(questions)


# ── Main ───────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate AWL quiz questions using the Claude API."
    )
    parser.add_argument(
        "--input", required=True,
        help="Path to word-data.json (relative to project root or absolute)"
    )
    parser.add_argument(
        "--output", required=True,
        help="Path for the output JSON file"
    )
    parser.add_argument(
        "--batch-size", type=int, default=5,
        help="Number of words per API call (default: 5)"
    )
    parser.add_argument(
        "--resume", action="store_true",
        help="Skip words already present in the scratch file"
    )
    parser.add_argument(
        "--sublist", type=int, choices=[2, 3],
        help="Process only SL2 or SL3 words (default: both)"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Print the first batch prompt and exit without calling the API"
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    # ── Load API key ───────────────────────────────────────────────────────────
    load_dotenv(dotenv_path=ENV_FILE, override=True)
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit(
            f"Error: ANTHROPIC_API_KEY not found.\n"
            f"Add it to {ENV_FILE} or set it as an environment variable."
        )

    # ── Resolve paths relative to project root ─────────────────────────────────
    input_path  = Path(args.input) if Path(args.input).is_absolute() else PROJECT_ROOT / args.input
    output_path = Path(args.output) if Path(args.output).is_absolute() else PROJECT_ROOT / args.output
    scratch_path = output_path.with_suffix(".tmp.jsonl")

    # ── Load and filter word data ──────────────────────────────────────────────
    with input_path.open(encoding="utf-8") as f:
        all_words = json.load(f)

    if args.sublist:
        all_words = [w for w in all_words if w["sublist"] == args.sublist]

    # Sort deterministically: sublist then word alphabetically
    all_words.sort(key=lambda w: (w["sublist"], w["word"]))

    # ── Resume: skip already-completed words ───────────────────────────────────
    if args.resume:
        completed = load_completed_words(scratch_path)
        remaining = [w for w in all_words if w["word"] not in completed]
        if completed:
            print(f"Resuming: {len(completed)} words already done, {len(remaining)} remaining.")
    else:
        remaining = all_words

    if not remaining:
        print("Nothing to do — all words already processed.")
        if scratch_path.exists():
            count = scratch_to_output(scratch_path, output_path)
            print(f"Output written: {output_path} ({count} questions)")
        return

    # ── Batch planning ─────────────────────────────────────────────────────────
    batches = [
        remaining[i : i + args.batch_size]
        for i in range(0, len(remaining), args.batch_size)
    ]
    total_expected = len(remaining) * 6
    print(
        f"\n{'─' * 60}\n"
        f"  Words to process : {len(remaining)}\n"
        f"  Batch size       : {args.batch_size}\n"
        f"  Batches          : {len(batches)}\n"
        f"  Questions target : {total_expected}\n"
        f"  Model            : {MODEL}\n"
        f"  Output           : {output_path}\n"
        f"  Scratch file     : {scratch_path}\n"
        f"{'─' * 60}\n"
    )

    # ── Dry run ────────────────────────────────────────────────────────────────
    if args.dry_run:
        print("=== SYSTEM PROMPT ===")
        print(SYSTEM_PROMPT)
        print("\n=== FIRST BATCH USER MESSAGE ===")
        print(build_user_message(batches[0]))
        return

    # ── API client ─────────────────────────────────────────────────────────────
    client = anthropic.Anthropic(api_key=api_key)

    # ── Main loop ──────────────────────────────────────────────────────────────
    failed_batches = []
    start_time = time.time()

    for batch_index, batch in enumerate(batches, start=1):
        batch_words = [w["word"] for w in batch]
        print(f"Batch {batch_index}/{len(batches)}: {batch_words}")

        user_message = build_user_message(batch)
        raw_text     = None

        try:
            raw_text = call_api(client, user_message, batch_index)
        except Exception as e:
            print(f"  ERROR calling API: {e}")
            failed_batches.append(batch_index)
            _dump_failed(output_path, batch_index, None, str(e))
            continue

        # ── Parse JSON ─────────────────────────────────────────────────────────
        questions = None
        try:
            questions = json.loads(_strip_fences(raw_text))
            if not isinstance(questions, list):
                raise ValueError("Response is not a JSON array")
        except (json.JSONDecodeError, ValueError) as e:
            print(f"  JSON parse error: {e}")
            # Retry once with a nudge
            try:
                nudged = user_message + "\n\nIMPORTANT: Return ONLY the raw JSON array. No markdown, no explanation."
                raw_text = call_api(client, nudged, batch_index)
                questions = json.loads(_strip_fences(raw_text))
            except Exception as retry_err:
                print(f"  Retry also failed: {retry_err}")
                failed_batches.append(batch_index)
                _dump_failed(output_path, batch_index, raw_text, str(retry_err))
                continue

        # ── Validate ───────────────────────────────────────────────────────────
        errors = validate_questions(questions, batch_words)
        if errors:
            print(f"  Validation failed ({len(errors)} error(s)):")
            for err in errors[:5]:   # Show first 5 errors only
                print(f"    • {err}")
            if len(errors) > 5:
                print(f"    … and {len(errors) - 5} more")
            failed_batches.append(batch_index)
            _dump_failed(output_path, batch_index, raw_text, "\n".join(errors))
            continue

        # ── Save ───────────────────────────────────────────────────────────────
        append_to_scratch(scratch_path, questions)
        elapsed = time.time() - start_time
        print(f"  ✓ {len(questions)} questions saved  (elapsed: {elapsed:.0f}s)")

    # ── Finalise ───────────────────────────────────────────────────────────────
    print(f"\n{'─' * 60}")

    if scratch_path.exists():
        count = scratch_to_output(scratch_path, output_path)
        print(f"Output written : {output_path} ({count} questions)")
    else:
        print("No questions were saved — check failed batch files.")

    if failed_batches:
        print(f"\n⚠  {len(failed_batches)} batch(es) failed: {failed_batches}")
        print(f"   Inspect failed_batch_*.json files next to the output file.")
        print(f"   Re-run with --resume to retry failed words.")
    else:
        print("All batches completed successfully.")

    print(f"{'─' * 60}\n")


def _strip_fences(text: str) -> str:
    """Remove markdown code fences if present (```json ... ``` or ``` ... ```)."""
    text = text.strip()
    if text.startswith("```"):
        # Remove opening fence line
        text = text[text.index("\n") + 1:] if "\n" in text else text[3:]
        # Remove closing fence
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3].rstrip()
    return text.strip()


def _dump_failed(output_path: Path, batch_index: int, raw: str | None, detail: str) -> None:
    """Write a failed batch record alongside the output file for later inspection."""
    failed_path = output_path.parent / f"failed_batch_{batch_index}.json"
    payload = {"batch_index": batch_index, "detail": detail, "raw_response": raw}
    with failed_path.open("w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"  Saved failed batch to: {failed_path}")


if __name__ == "__main__":
    main()
