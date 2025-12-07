# Level Testing Interface

This directory contains testing utilities for the Incarcerated Heroes: Labyrinth Escape game.

## Quick Start

### Local Testing

1. Start a local web server in the repository root:
   ```bash
   python -m http.server 8000
   # or
   python3 -m http.server 8000
   # or
   npx http-server -p 8000
   ```

2. Navigate to the test page:
   ```
   http://localhost:8000/test/
   ```

3. All levels are automatically unlocked - click any level card to start testing

## Features

- **One-Click Access**: Direct links to each level
- **Auto-Unlock**: All levels unlocked automatically via localStorage
- **Visual Interface**: Clean, organized level listing
- **Quick Navigation**: Fast switching between levels for QA testing

## Files

- `index.html` - Main testing interface with level cards
- `README.md` - This file

## Usage Notes

### Testing Individual Levels

Click any level card in the testing interface to:
1. Unlock all levels in localStorage
2. Navigate to the main game
3. Auto-start the selected level

### Manual Testing Workflow

1. Open test page
2. Click a level to test
3. Play through the level
4. Use browser back button or navigate to test page again
5. Select next level

### Clearing Progress

To reset all progress and test from a clean state:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## Level Status

### Current Branch (9 Levels)
- ✅ Level 1: Code Breaker - Playable
- ✅ Level 2: Anagram Solver - Playable
- ✅ Level 3: 9-Number Grid - **FIXED** (was rendering as 9x1, now 3x3)
- ✅ Level 4: Advanced Code Breaker - Playable
- ✅ Level 5: Jiggy Puzzle - Playable
- ✅ Level 6: Map Navigation - Playable
- ✅ Level 7: Pathfinder Challenge - Playable
- ✅ Level 8: Pathfinder Extreme - Playable
- ✅ Level 9: Gate Master Maze - Playable

### Main Branch Only
- ⚠️ Level 10: Word Grid Challenge - Only available in `main` branch

## Troubleshooting

### Level doesn't load
- Check browser console for errors
- Verify you're running a local server (not file://)
- Clear browser cache and localStorage

### Levels are locked
- The test page should auto-unlock all levels
- If not, manually clear localStorage and reload

### Level 10 not found
- Level 10 only exists in the `main` branch
- Switch branches or merge main to access it

## Development

To add new test features:
1. Edit `test/index.html`
2. Test changes locally
3. Update this README with new features

## See Also

- `/REPORT.md` - Comprehensive audit report
- `/README.md` - Main project documentation
- `/levels/` - Individual level implementations
