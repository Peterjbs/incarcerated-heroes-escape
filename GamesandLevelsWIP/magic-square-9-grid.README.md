# Magic Square 9-Grid

## Overview

**Game ID:** `magic-square-9-grid`  
**File:** `magic-square-9-grid.js`  
**Difficulty:** Medium  
**Type:** Mathematical/Logic

## Description

A mathematical puzzle where players arrange numbers 1-9 in a 3×3 grid. Each row, column, and diagonal must sum to the magic constant of 15.

## Gameplay and Goals

Players must place the numbers 1 through 9 in a 3×3 grid such that every row, column, and both diagonals sum to exactly 15. This is a classic magic square puzzle with a unique solution family.

### Win Condition

Complete the 3×3 grid with all rows, columns, and diagonals summing to 15.

## Controls

- **Mouse Click**: Click a cell to select it, then click a number from the available pool
- **Number Selection**: Click numbers from the available number pool (1-9)
- **Hint Button**: Get a hint about number placement (if implemented)
- **Reset Button**: Clear the grid and start over

## Public API

### Initialization

```javascript
initMagicSquare9Grid()
```

**Parameters:** None (uses hardcoded container `#level-3`)

### Game Control Functions

```javascript
// Start new game
initMagicSquare9Grid()

// Backward compatibility
initLevel3()
```

## Known Issues

- **Container Dependency**: Requires `#level-3` container element
- **No Dynamic Container**: Uses hardcoded container ID
- **Click Event Listeners**: May accumulate if not properly cleaned up

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `magic-square-9-grid.html` in browser
2. Verify 3×3 grid displays with available numbers 1-9
3. Click a cell and then click a number to place it
4. Verify placed numbers are removed from available pool
5. Test validation (check sum constraints)
6. Complete puzzle and verify win condition

### Expected Behavior

- Grid displays empty 3×3 cells
- Number pool shows available numbers
- Clicking places numbers in selected cell
- Used numbers are removed from pool
- Validation checks row/column/diagonal sums
- Win message appears when puzzle is solved correctly

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/magic-square-9-grid.js"></script>
<div id="level-3"></div>
<script>initMagicSquare9Grid();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Magic Square 9-Grid"
3. Click "Load Game"

## Future Improvements

- Add configurable grid sizes (4×4, 5×5)
- Support custom container IDs
- Implement hint system
- Add solution display
- Track solve time and moves

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
