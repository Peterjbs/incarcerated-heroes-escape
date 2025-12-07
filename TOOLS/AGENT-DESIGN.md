# Playability / Aesthetics Agent — Design & Runbook

Goal
- Provide an automated agent to evaluate and suggest improvements to the 5×5 cross-word tile puzzles in the repo.
- Improve playability and bring the visual aesthetic closer to the high-fidelity wooden look of jiggy.html.
- Discover grid variations and detect any puzzle instances where the six words can encode a short secret message (for example acrostic of first letters forming an English word/phrase).

What the agent does
1. Playability scoring:
   - Counts tiles per puzzle, prefilled vs movable tiles.
   - Measures uniqueness of consonants (goal: only vowels repeat per puzzle).
   - Estimates branching factor by counting how many positions could accept each tile (rough estimate from letter counts and positions).
   - Flags puzzles with too many identical letters or too few constraints.

2. Grid variations:
   - Applies transforms (transpose, rotate, mirror, and a few blocked-cell variants) and scores them.
   - Generates a handful of alternative blocked-cell patterns (e.g., corners fixed, midpoints fixed, plus-shape) and scores them.

3. Secret-message search:
   - For each puzzle or candidate variation, builds the six words (3 across, 3 down) and checks concatenations:
     - Acrostic of first letters (word formed by the 6 first letters).
     - Acrostic of last letters.
     - Concatenate entire words and search for known short phrases (requires external word list to be effective).
   - Uses a supplied dictionary to check whether the formed strings are English words or phrases.

How to run
- Node >= 14 recommended.
- Provide an English wordlist (simple newline-separated list) for best secret-message detection.
- Example:
  node tools/game-agent.js --puzzles=tools/puzzles.json --wordlist=/path/to/wordlist.txt

Output
- A human-readable report printed to stdout and saved to tools/agent-report.json with:
  - Per-puzzle playability scores and suggestions.
  - Candidate variations and their scores.
  - Any secret-message matches.

Notes on aesthetics improvements
- The front-end improvements (canvas-based UI) are intentionally faithful to jiggy.html: they reuse the same tile rendering pipeline (shape paths, timber gradients, flanges/indents) so the 5×5 tiles look identical to jiggy's carved wooden tiles.
- If you want to further tune the art, adjust the WOOD_SETS, INK_COLORS, and bevel/tri overlay constants in the HTML file.

Extensibility & testing
- Add A/B playtesting hooks: sample completion times, number of clicks/drags, error rates.
- Add a CI job to run the agent with a fixed word list and fail if a puzzle's playability score falls under a target threshold.
