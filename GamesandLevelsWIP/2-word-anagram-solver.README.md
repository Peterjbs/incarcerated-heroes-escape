# 2-Word Anagram Solver

## Overview

**Game ID:** `2-word-anagram-solver`  
**File:** `2-word-anagram-solver.js`  
**Difficulty:** Easy-Medium  
**Type:** Word/Linguistic

## Description

A word puzzle where players unscramble adjective-noun pairs from ancient inscriptions. Players must decode scrambled two-word phrases to progress.

## Gameplay and Goals

Players are presented with 4 scrambled adjective-noun phrases. Each phrase consists of two words where the letters have been scrambled while maintaining word boundaries (spaces preserved).

The player must:
- Rearrange the scrambled letters to reveal the original phrases
- Solve at least 50% (2 out of 4) to complete the level
- Use hints when stuck (reveals individual words)

### Win Condition

Successfully unscramble at least 2 out of 4 word pairs to unlock the next level.

## Controls

- **Text Input**: Type the unscrambled phrase in the input field
- **Submit Button**: Check your answer
- **Skip Button**: Skip the current phrase and move to the next
- **Hint Button**: Reveal the individual words (adjective and noun separately)
- **Keyboard**: Type answers directly; auto-uppercase for consistency

## Public API

This game exposes the following functions for integration:

### Initialization

```javascript
// Primary initialization function
initAnagramSolver2Word()
```

**Parameters:** None (uses hardcoded container `#level-2`)

**Returns:** None

### Game Control Functions

```javascript
// Start a new game (alias for init)
initAnagramSolver2Word()

// Backward compatibility alias
initLevel2()
```

### Adapter Pattern (if needed)

The HTML wrapper automatically detects the correct entry point. If needed, you can create an adapter:

```javascript
// Example: if game exposes a different function name
// Map it to the expected pattern
window.initAnagramSolver2Word = window.someOtherGameInitFunction;
```

## Known Issues

- **Container Dependency**: Game requires a `#level-2` container element to be present in the DOM
- **No Dynamic Container**: Cannot specify custom container; uses hardcoded ID
- **State Persistence**: Game state is not persisted between page reloads
- **Hint Usage Tracking**: Hints are unlimited; no penalty for overuse

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `2-word-anagram-solver.html` in browser
2. Verify game initializes with the first scrambled phrase displayed
3. Enter incorrect answer and verify feedback shows
4. Enter correct answer and verify progression to next phrase
5. Use hint button and verify it reveals individual words
6. Complete 2 phrases and verify level completion

### Expected Behavior

- Game displays scrambled phrase clearly
- Input field accepts text and auto-converts to uppercase
- Submit button validates answer and provides feedback
- Skip button moves to next phrase
- Hint reveals individual words without completing the puzzle
- Progress bar updates as phrases are completed
- Completion message shows when 50% threshold reached

## Tweaks and Configuration

Current implementation uses hardcoded word pairs (as of 2025-12-08):
- DARK FOREST
- HIDDEN DOOR
- SECRET PATH
- ANCIENT LOCK

**Note:** These are the current word pairs in the game. Check the source code in `initAnagramSolver2Word()` for the most up-to-date list.

To modify word pairs, edit the `wordPairs` array in `initAnagramSolver2Word()` function.

## Integration Notes

### Using the HTML Wrapper

The standalone HTML wrapper (`2-word-anagram-solver.html`) provides:
- Automatic game initialization on page load
- Basic UI controls (New Game, Reset)
- Error handling and informative messages
- Standalone testing capability

### Using via Test Runner

Load this game in the test-runner:
1. Open `test-runner.html` in a browser
2. Select "2-Word Anagram Solver" from the dropdown
3. Click "Load Game" to test in iframe
4. Click "Open in New Tab" for full-screen testing

### Integration Example

```html
<!-- Include the game script -->
<script src="GamesandLevelsWIP/2-word-anagram-solver.js"></script>

<!-- Create required container -->
<div id="level-2"></div>

<!-- Initialize the game -->
<script>
    // Initialize using the main function
    initAnagramSolver2Word();
</script>
```

## Future Improvements

- Add configurable word pairs via options parameter
- Support custom container IDs
- Add difficulty levels with more/fewer word pairs
- Implement scoring system based on time and hints used
- Add word list validation
- Persist progress in localStorage
- Add timer for speedrun mode

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
