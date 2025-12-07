# Level Migration Mapping

## Complete Reference: Old Names → New Names

This document provides a comprehensive mapping from old generic level names to new descriptive names.

## Function Name Mapping

### Level 1: Code Breaker
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel1()` | `initCodeBreaker4Digit()` | Initialize level |
| `checkCode1()` | `submitCodeBreaker4Digit()` | Submit player's guess |
| `resetLevel1()` | `resetCodeBreaker4Digit()` | Reset/restart level |
| `window.level1Data` | `window.codeBreaker4DigitData` | Game state object |

### Level 2: Anagram Solver
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel2()` | `initAnagramSolver2Word()` | Initialize level |
| `checkAnswer2()` | `submitAnagramSolver2Word()` | Submit answer |
| `showHint2()` | `showHintAnagramSolver2Word()` | Show hint |
| `skipAnagram2()` | `skipAnagramSolver2Word()` | Skip current puzzle |
| `displayCurrentPair2()` | `displayCurrentAnagramPair()` | Update display |
| `window.level2Data` | `window.anagramSolver2WordData` | Game state object |

### Level 3: Magic Square
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel3()` | `initMagicSquare9Grid()` | Initialize level |
| `window.level3Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 4: Timed Code Breaker
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel4()` | `initCodeBreaker6DigitTimed()` | Initialize level |
| `window.level4Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 5: Sliding Tile Puzzle
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel5()` | `initSlidingTile15Puzzle()` | Initialize level |
| `window.level5Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 6: Map Navigation
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel6()` | `initKeyCollectionMapNav()` | Initialize level |
| `window.level6Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 7: Enemy Patrol Maze
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel7()` | `initEnemyPatrolMaze()` | Initialize level |
| `window.level7Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 8: Checkpoint Extreme Maze
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel8()` | `initCheckpointExtremeMaze()` | Initialize level |
| `window.level8Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 9: Gate Control Strategy Maze
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel9()` | `initGateControlStrategyMaze()` | Initialize level |
| `window.level9Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

### Level 10: Jigsaw Word Grid
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `initLevel10()` | `initJigsawWordGrid5x5()` | Initialize level |
| `window.level10Data` | Unchanged (internal) | Game state object |
| Helper functions remain unchanged (called internally) |

## File Name Mapping

| Old File | New File | Level # |
|----------|----------|---------|
| `levels/level1.js` | `GamesandLevelsWIP/4-digit-code-breaker.js` | 1 |
| `levels/level2.js` | `GamesandLevelsWIP/2-word-anagram-solver.js` | 2 |
| `levels/level3.js` | `GamesandLevelsWIP/magic-square-9-grid.js` | 3 |
| `levels/level4.js` | `GamesandLevelsWIP/6-digit-timed-code-breaker.js` | 4 |
| `levels/level5.js` | `GamesandLevelsWIP/sliding-tile-15-puzzle.js` | 5 |
| `levels/level6.js` | `GamesandLevelsWIP/key-collection-map-nav.js` | 6 |
| `levels/level7.js` | `GamesandLevelsWIP/enemy-patrol-maze.js` | 7 |
| `levels/level8.js` | `GamesandLevelsWIP/checkpoint-extreme-maze.js` | 8 |
| `levels/level9.js` | `GamesandLevelsWIP/gate-control-strategy-maze.js` | 9 |
| `levels/level10.js` | `GamesandLevelsWIP/jigsaw-word-grid-5x5.js` | 10 |

## HTML Import Updates

### Current (index.html)
```html
<script src="levels/level1.js"></script>
<script src="levels/level2.js"></script>
<script src="levels/level3.js"></script>
<script src="levels/level4.js"></script>
<script src="levels/level5.js"></script>
<script src="levels/level6.js"></script>
<script src="levels/level7.js"></script>
<script src="levels/level8.js"></script>
<script src="levels/level9.js"></script>
<script src="levels/level10.js"></script>
```

### Proposed (with new files)
```html
<script src="GamesandLevelsWIP/4-digit-code-breaker.js"></script>
<script src="GamesandLevelsWIP/2-word-anagram-solver.js"></script>
<script src="GamesandLevelsWIP/magic-square-9-grid.js"></script>
<script src="GamesandLevelsWIP/6-digit-timed-code-breaker.js"></script>
<script src="GamesandLevelsWIP/sliding-tile-15-puzzle.js"></script>
<script src="GamesandLevelsWIP/key-collection-map-nav.js"></script>
<script src="GamesandLevelsWIP/enemy-patrol-maze.js"></script>
<script src="GamesandLevelsWIP/checkpoint-extreme-maze.js"></script>
<script src="GamesandLevelsWIP/gate-control-strategy-maze.js"></script>
<script src="GamesandLevelsWIP/jigsaw-word-grid-5x5.js"></script>
```

**Note**: All backward compatibility aliases are included, so old function calls like `initLevel1()` will still work!

## Game State (game.js) Updates

### Current Level Metadata
```javascript
{
    id: 1,
    title: "Code Breaker",
    description: "Crack the 4-digit security code",
    // ...
}
```

### Recommended Updates (Optional)
```javascript
{
    id: 1,
    title: "4-Digit Code Breaker",  // More descriptive
    description: "Crack the 4-digit security code with deductive reasoning",
    initFunction: "initCodeBreaker4Digit",  // New field for clarity
    // ...
}
```

**Note**: Title updates are cosmetic - level IDs remain the same for save compatibility.

## Testing Updates (test/index.html)

### Current Level Array
```javascript
const levels = [
    {num: 1, title: "Code Breaker", desc: "..."},
    {num: 2, title: "Anagram Solver", desc: "..."},
    // ... only 9 levels
];
```

### Recommended Updates
```javascript
const levels = [
    {num: 1, title: "4-Digit Code Breaker", desc: "..."},
    {num: 2, title: "2-Word Anagram Solver", desc: "..."},
    {num: 3, title: "Magic Square 9-Grid", desc: "..."},
    {num: 4, title: "6-Digit Timed Code Breaker", desc: "..."},
    {num: 5, title: "Sliding Tile 15-Puzzle", desc: "..."},
    {num: 6, title: "Key Collection Map Nav", desc: "..."},
    {num: 7, title: "Enemy Patrol Maze", desc: "..."},
    {num: 8, title: "Checkpoint Extreme Maze", desc: "..."},
    {num: 9, title: "Gate Control Strategy Maze", desc: "..."},
    {num: 10, title: "Jigsaw Word Grid 5×5", desc: "..."},  // ADD THIS
];
```

## Level Container IDs (Unchanged)

The HTML container IDs remain the same for backward compatibility:

- `level-1` → Code Breaker
- `level-2` → Anagram Solver
- `level-3` → Magic Square
- `level-4` → Timed Code Breaker
- `level-5` → Sliding Tile Puzzle
- `level-6` → Map Navigation
- `level-7` → Enemy Patrol Maze
- `level-8` → Checkpoint Extreme Maze
- `level-9` → Gate Control Strategy Maze
- `level-10` → Jigsaw Word Grid

## Migration Strategies

### Strategy 1: Full Replacement (Recommended for Production)
1. Update all HTML imports to point to new files
2. Update game.js metadata with new titles
3. Remove old `levels/` directory files
4. Update README and documentation
5. Test all levels thoroughly

### Strategy 2: Gradual Migration (Lower Risk)
1. Import both old and new files
2. Gradually update function calls
3. Use backward compatibility aliases during transition
4. Remove old files when all references updated
5. Clean up aliases later

### Strategy 3: Aliasing Only (No Code Changes)
1. Update HTML imports to new files
2. Continue using old function names via aliases
3. No other code changes needed
4. Update documentation only

## Backward Compatibility Notes

All new files include backward compatibility aliases:

```javascript
// At end of each new file
function initLevel1() { initCodeBreaker4Digit(); }
function initLevel2() { initAnagramSolver2Word(); }
// ... etc
```

This means:
- ✅ Old code continues to work without changes
- ✅ New code can use descriptive names
- ✅ Gradual migration is possible
- ✅ No breaking changes for existing saves

## Search and Replace Guide

If doing a full migration, use these patterns:

### In HTML files:
```bash
# Old pattern
levels/level1.js → GamesandLevelsWIP/4-digit-code-breaker.js
levels/level2.js → GamesandLevelsWIP/2-word-anagram-solver.js
# ... etc for all levels
```

### In JavaScript files (optional):
```bash
# Function calls (optional - aliases work)
initLevel1() → initCodeBreaker4Digit()
initLevel2() → initAnagramSolver2Word()
# ... etc
```

## Checklist for Full Integration

- [ ] Update `index.html` script imports
- [ ] Update `test/index.html` level array
- [ ] Update `game.js` level titles (optional)
- [ ] Update README.md level descriptions
- [ ] Test each level loads correctly
- [ ] Test level progression works
- [ ] Test save/load functionality
- [ ] Verify backward compatibility
- [ ] Remove old `levels/` files (backup first!)
- [ ] Update any developer documentation

## Rollback Plan

If issues occur:
1. Keep old `levels/` directory as backup
2. Revert HTML imports to old files
3. Old files have same functionality
4. No data loss (save format unchanged)

---

**Last Updated**: 2025-12-07  
**Maintained By**: Development Team  
**Related Docs**: GamesandLevelsWIP/README.md, WIPandMINIGAMEISSUES.md
