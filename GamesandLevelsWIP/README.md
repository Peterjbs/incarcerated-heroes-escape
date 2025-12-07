# Games and Levels - Work In Progress

This directory contains refactored versions of all game levels with descriptive names and enhanced documentation.

## Purpose

The original level files (`level1.js`, `level2.js`, etc.) used generic numeric names that made it difficult to:
- Identify specific minigames by function
- Maintain and extend individual games
- Prevent accidental overwrites or confusion
- Document and discuss gameplay mechanics

This refactoring addresses these issues by giving each level a clear, descriptive name.

## Directory Structure

```
GamesandLevelsWIP/
├── 4-digit-code-breaker.js              # Level 1
├── 2-word-anagram-solver.js             # Level 2
├── magic-square-9-grid.js               # Level 3
├── 6-digit-timed-code-breaker.js        # Level 4
├── sliding-tile-15-puzzle.js            # Level 5
├── key-collection-map-nav.js            # Level 6
├── enemy-patrol-maze.js                 # Level 7
├── checkpoint-extreme-maze.js           # Level 8
├── gate-control-strategy-maze.js        # Level 9
├── jigsaw-word-grid-5x5.js              # Level 10
└── README.md                            # This file
```

## Level Reference Guide

### Level 1: 4-Digit Code Breaker
**File**: `4-digit-code-breaker.js`  
**Main Function**: `initCodeBreaker4Digit()`  
**Type**: Logic/Deduction  
**Difficulty**: Easy  

Classic code-breaking puzzle where players crack a 4-digit security code using position/value feedback over 10 attempts.

**Key Features**:
- Random 4-digit code generation
- Visual feedback system (✓ correct, ~ wrong position, ✗ not in code)
- Auto-advancing input fields
- Attempt history tracking

---

### Level 2: 2-Word Anagram Solver
**File**: `2-word-anagram-solver.js`  
**Main Function**: `initAnagramSolver2Word()`  
**Type**: Word/Linguistic  
**Difficulty**: Easy-Medium  

Unscramble adjective-noun word pairs from ancient inscriptions.

**Key Features**:
- 4 scrambled phrases to solve
- Progressive difficulty
- Hint system reveals individual words
- Skip option (must solve 50% to pass)
- Visual progress bar

---

### Level 3: Magic Square 9-Grid
**File**: `magic-square-9-grid.js`  
**Main Function**: `initMagicSquare9Grid()`  
**Type**: Mathematical/Logic  
**Difficulty**: Medium  

Arrange numbers 1-9 in a 3x3 grid where each row, column, and diagonal sums to 15.

**Key Features**:
- Click-based number placement
- Visual feedback for placed numbers
- Number pool management
- Comprehensive hint system
- Security-hardened (no eval usage)

---

### Level 4: 6-Digit Timed Code Breaker
**File**: `6-digit-timed-code-breaker.js`  
**Main Function**: `initCodeBreaker6DigitTimed()`  
**Type**: Logic/Timed  
**Difficulty**: Medium-Hard  

Advanced code-breaking with time pressure and enhanced feedback.

**Key Features**:
- Random 6-digit code
- 180-second countdown timer
- 12 attempts maximum
- Enhanced feedback (correct vs wrong positions)
- Detailed attempt history

---

### Level 5: Sliding Tile 15-Puzzle
**File**: `sliding-tile-15-puzzle.js`  
**Main Function**: `initSlidingTile15Puzzle()`  
**Type**: Spatial/Logic  
**Difficulty**: Medium  

Classic sliding puzzle mechanic with 15 numbered tiles.

**Key Features**:
- 4x4 grid layout
- Click-to-slide mechanics
- Move counter and timer
- Shuffle and reset functionality
- Solvability validation

---

### Level 6: Key Collection Map Navigation
**File**: `key-collection-map-nav.js`  
**Main Function**: `initKeyCollectionMapNav()`  
**Type**: Navigation/Collection  
**Difficulty**: Easy-Medium  

Grid-based navigation with key collection objectives.

**Key Features**:
- 10x10 grid map
- 3 keys to collect
- Obstacle navigation
- Keyboard and button controls
- Move and time tracking

---

### Level 7: Enemy Patrol Maze
**File**: `enemy-patrol-maze.js`  
**Main Function**: `initEnemyPatrolMaze()`  
**Type**: Stealth/Navigation  
**Difficulty**: Hard  

Canvas-based maze navigation with moving enemy patrols.

**Key Features**:
- Canvas rendering for smooth graphics
- Moving enemy AI with patrol patterns
- Collision detection and reset
- WASD/Arrow key controls
- Attempt tracking and best time

---

### Level 8: Checkpoint Extreme Maze
**File**: `checkpoint-extreme-maze.js`  
**Main Function**: `initCheckpointExtremeMaze()`  
**Type**: Advanced Navigation/Strategy  
**Difficulty**: Very Hard  

Advanced maze with multiple objectives and faster enemies.

**Key Features**:
- Larger, more complex maze
- 4 checkpoints (collect in any order)
- Faster, more aggressive enemies
- Checkpoint progress tracking
- Advanced pathfinding required

---

### Level 9: Gate Control Strategy Maze
**File**: `gate-control-strategy-maze.js`  
**Main Function**: `initGateControlStrategyMaze()`  
**Type**: Strategy/Puzzle  
**Difficulty**: Very Hard  

Strategic puzzle with environmental control and NPC guidance.

**Key Features**:
- Toggleable gates for path control
- Guide friendly NPCs (comrades) to exit
- Trap or avoid enemy NPCs
- Complex AI for NPCs and enemies
- Strategic planning and timing required

---

### Level 10: Jigsaw Word Grid 5×5
**File**: `jigsaw-word-grid-5x5.js`  
**Main Function**: `initJigsawWordGrid5x5()`  
**Type**: Word/Spatial  
**Difficulty**: Hard  

Word puzzle with physical jigsaw-piece constraints.

**Key Features**:
- 5×5 crossword grid
- Jigsaw-shaped letter tiles
- Tiles must match cell shapes (indents/flanges)
- Drag-and-drop mechanics
- 4 themed puzzles with hidden messages

## Code Organization

### File Structure

Each level file follows this structure:

```javascript
/**
 * [Level Title]
 * [Description]
 * 
 * Game Mechanics:
 * - [Mechanic 1]
 * - [Mechanic 2]
 * ...
 * 
 * Level ID: [number]
 * Difficulty: [Easy|Medium|Hard|Very Hard]
 * Type: [Category]
 */

// Main initialization function
function init[DescriptiveName]() {
    // Level setup code
}

// Helper functions
function [helperFunction1]() { }
function [helperFunction2]() { }

// Backward compatibility: keep old function names as aliases
function initLevel[N]() { init[DescriptiveName](); }
```

### Naming Conventions

- **Main Functions**: `init[GameType][Descriptor]()`
  - Examples: `initCodeBreaker4Digit()`, `initMagicSquare9Grid()`
  
- **Helper Functions**: Descriptive names with context
  - Examples: `submitCodeBreaker4Digit()`, `displayCurrentAnagramPair()`

- **State Objects**: `window.[gameName]Data`
  - Examples: `window.codeBreaker4DigitData`, `window.anagramSolver2WordData`

### Backward Compatibility

All files maintain backward compatibility with the original function names:

```javascript
// Old code still works
function initLevel1() { initCodeBreaker4Digit(); }
function checkCode1() { submitCodeBreaker4Digit(); }
```

This ensures the refactoring doesn't break existing code that calls these functions.

## Implementation Status

| Level | File | Status | Documentation | Backward Compat |
|-------|------|--------|---------------|-----------------|
| 1 | 4-digit-code-breaker.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 2 | 2-word-anagram-solver.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 3 | magic-square-9-grid.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 4 | 6-digit-timed-code-breaker.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 5 | sliding-tile-15-puzzle.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 6 | key-collection-map-nav.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 7 | enemy-patrol-maze.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 8 | checkpoint-extreme-maze.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 9 | gate-control-strategy-maze.js | ✅ Complete | ✅ Complete | ✅ Yes |
| 10 | jigsaw-word-grid-5x5.js | ✅ Complete | ✅ Complete | ✅ Yes |

## Migration Guide

### For Developers

When integrating these refactored levels:

1. **Option A: Direct Replacement** (Breaking Change)
   - Replace `levels/levelX.js` with `GamesandLevelsWIP/[new-name].js`
   - Update all function calls to use new names
   - Update HTML imports

2. **Option B: Gradual Migration** (Recommended)
   - Keep both old and new files temporarily
   - Use backward compatibility aliases
   - Gradually update call sites to new names
   - Remove old files when complete

3. **Option C: Aliasing in HTML**
   - Import new files
   - Keep using old function names via aliases
   - No code changes needed in other files

### Testing Refactored Levels

Each level can be tested independently:

```javascript
// In browser console or test file
initCodeBreaker4Digit();  // New name
initLevel1();             // Old name (still works)
```

## Benefits of This Refactoring

1. **Clarity**: Descriptive names make code more readable and maintainable
2. **Discoverability**: Easy to find specific minigame implementations
3. **Extensibility**: Adding new variations doesn't require renumbering
4. **Documentation**: Each file includes comprehensive gameplay documentation
5. **Maintainability**: Clear separation of concerns and consistent patterns
6. **Future-Proof**: New levels can be added without name conflicts

## Known Issues

See `../WIPandMINIGAMEISSUES.md` for detailed issue tracking.

Key issues:
- Duplicate level ID 9 in game.js (needs resolution)
- Test interface missing level 10
- Standalone HTML files (jiggy.html, wordgrid-enhanced-canvas.html) need integration decision

## Next Steps

1. ✅ Complete all level refactoring
2. ⏳ Update game.js level metadata
3. ⏳ Update index.html imports
4. ⏳ Update test/index.html
5. ⏳ Fix duplicate level ID issue
6. ⏳ Create comprehensive migration guide
7. ⏳ Test all levels in integrated environment
8. ⏳ Update main README.md

## Questions or Feedback

For questions about specific levels or the refactoring approach, refer to:
- Individual level file documentation (JSDoc headers)
- `../WIPandMINIGAMEISSUES.md` for known issues
- GitHub issue for this refactoring effort

---

**Last Updated**: 2025-12-07  
**Status**: Level files complete, integration pending
