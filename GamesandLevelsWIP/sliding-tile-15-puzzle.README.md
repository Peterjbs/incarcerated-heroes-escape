# Sliding Tile 15-Puzzle

## Overview

**Game ID:** `sliding-tile-15-puzzle`  
**File:** `sliding-tile-15-puzzle.js`  
**Difficulty:** Medium  
**Type:** Spatial/Logic

## Description

Classic sliding puzzle with 15 numbered tiles in a 4×4 grid. Players must arrange tiles in sequential order (1-15) with the empty space in the bottom-right corner.

## Gameplay and Goals

Players interact with a 4×4 grid containing 15 numbered tiles and one empty space. Clicking a tile adjacent to the empty space slides it into that space. The goal is to arrange all tiles in sequential order from 1 to 15, with the empty space at position (4,4).

### Win Condition

Arrange tiles in order: 1, 2, 3, ..., 15, with empty space in bottom-right corner.

## Controls

- **Mouse Click**: Click any tile adjacent to the empty space to slide it
- **Shuffle Button**: Randomize the board (built into game UI)
- **Reset Button**: Start a new puzzle
- **Move Counter**: Tracks number of moves made
- **Timer**: Tracks elapsed time

## Public API

This game exposes the following functions for integration:

### Initialization

```javascript
// Primary initialization function
initSlidingTile15Puzzle()
```

**Parameters:** None (uses hardcoded container `#level-5`)

**Returns:** None

### Game Control Functions

```javascript
// Start a new game
initSlidingTile15Puzzle()

// Shuffle the board
shuffleTiles5()

// Backward compatibility alias
initLevel5()
```

## Known Issues

- **Container Dependency**: Game requires a `#level-5` container element to be present in the DOM
- **No Dynamic Container**: Cannot specify custom container; uses hardcoded ID
- **Solvability**: Initial shuffle should always produce solvable configuration (to be verified)
- **Timer Persistence**: Timer may continue running if not properly cleaned up

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `sliding-tile-15-puzzle.html` in browser
2. Verify 4×4 grid displays with 15 numbered tiles
3. Click a tile adjacent to empty space and verify it slides
4. Click a non-adjacent tile and verify no movement
5. Use shuffle button and verify tiles randomize
6. Verify move counter increments with each valid move
7. Verify timer tracks elapsed time
8. Complete puzzle and verify win condition

### Expected Behavior

- Only tiles adjacent to empty space are clickable/slidable
- Move counter increments only on valid moves
- Timer starts on first move or initialization
- Win detection triggers when tiles are in correct order
- Visual feedback for winning state
- Shuffle produces random but solvable configurations

## Tweaks and Configuration

Current implementation uses:
- **Grid Size:** 4×4
- **Tile Count:** 15 (one empty)
- **Visual Style:** Numbered tiles with gradient styling

To modify grid size or styling, edit the initialization code in `initSlidingTile15Puzzle()`.

## Integration Notes

### Using the HTML Wrapper

The standalone HTML wrapper (`sliding-tile-15-puzzle.html`) provides:
- Automatic game initialization on page load
- Basic UI controls (New Game, Shuffle)
- Error handling and informative messages
- Standalone testing capability

### Using via Test Runner

Load this game in the test-runner:
1. Open `test-runner.html` in a browser
2. Select "Sliding Tile 15-Puzzle" from the dropdown
3. Click "Load Game" to test in iframe
4. Click "Open in New Tab" for full-screen testing

### Integration Example

```html
<!-- Include the game script -->
<script src="GamesandLevelsWIP/sliding-tile-15-puzzle.js"></script>

<!-- Create required container -->
<div id="level-5"></div>

<!-- Initialize the game -->
<script>
    // Initialize using the main function
    initSlidingTile15Puzzle();
</script>
```

## Future Improvements

- Add configurable grid sizes (3×3, 4×4, 5×5)
- Support custom container IDs
- Implement hint system (show next optimal move)
- Add solve animation
- Track best time/fewest moves
- Persist high scores in localStorage
- Add image-based puzzles (not just numbers)
- Implement undo functionality

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
