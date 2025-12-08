# Jigsaw Word Grid 5×5

## Overview

**Game ID:** `jigsaw-word-grid-5x5`  
**File:** `jigsaw-word-grid-5x5.js`  
**Difficulty:** Hard  
**Type:** Word/Spatial

## Description

Word puzzle with physical jigsaw-piece constraints. Players must place letter tiles with jigsaw shapes (indents/flanges) into a 5×5 crossword grid where tile shapes must match cell shapes.

## Gameplay and Goals

Complete a 5×5 crossword puzzle using jigsaw-shaped letter tiles. Each tile and grid cell has a unique shape with indents and flanges. Tiles can only be placed where shapes match. The puzzle includes 4 themed word sets with hidden messages.

### Win Condition

Complete the 5×5 grid with all tiles correctly placed (both letters and shapes matching).

## Controls

- **Drag and Drop**: Drag letter tiles from the tray to the grid
- **Mouse Click**: Select and place tiles
- **Shape Matching**: Tiles only fit where shapes align
- **Visual Feedback**: Invalid placements are highlighted

## Public API

### Initialization

```javascript
initJigsawWordGrid5x5()
```

**Parameters:** None (uses hardcoded container `#level-10`)

### Game Control Functions

```javascript
// Start new game
initJigsawWordGrid5x5()

// Initialize word grid data (helper)
initWordGridData()

// Setup event listeners (helper)
setupEventListeners10()

// Backward compatibility
initLevel10()
```

## Known Issues

- **Container Dependency**: Requires `#level-10` container element
- **Canvas/SVG Rendering**: May have performance issues with complex shapes
- **Drag-and-Drop**: Touch support may be limited
- **State Complexity**: Shape matching logic is complex and may have edge cases

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `jigsaw-word-grid-5x5.html` in browser
2. Verify 5×5 grid displays with jigsaw-shaped cells
3. Verify tile tray shows available letter tiles with shapes
4. Drag a tile to a matching grid cell
5. Verify tile placement (shape must match)
6. Try placing tile in non-matching cell (should reject)
7. Complete puzzle and verify win condition
8. Check for hidden message reveal

### Expected Behavior

- Grid displays 5×5 cells with jigsaw shapes
- Tile tray shows letter tiles with matching shapes
- Drag-and-drop works smoothly
- Invalid placements are rejected with visual feedback
- Valid placements lock tiles in place
- Completion triggers hidden message reveal
- Progress tracked across 4 themed puzzles

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/jigsaw-word-grid-5x5.js"></script>
<div id="level-10"></div>
<script>initJigsawWordGrid5x5();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Jigsaw Word Grid 5×5"
3. Click "Load Game"

## Future Improvements

- Add configurable grid sizes
- Support custom container IDs
- Implement hint system (highlight next valid placement)
- Add undo functionality
- Track completion time
- Add more puzzle themes
- Improve touch/mobile support
- Add sound effects for valid/invalid placements

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
