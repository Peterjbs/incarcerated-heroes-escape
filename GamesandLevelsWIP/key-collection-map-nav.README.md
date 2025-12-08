# Key Collection Map Navigation

## Overview

**Game ID:** `key-collection-map-nav`  
**File:** `key-collection-map-nav.js`  
**Difficulty:** Easy-Medium  
**Type:** Navigation/Collection

## Description

Grid-based navigation puzzle where players must collect 3 keys while navigating around obstacles on a 10×10 map.

## Gameplay and Goals

Players control a character on a 10×10 grid map containing obstacles and 3 keys. Navigate through the map to collect all keys and reach the exit. The challenge involves optimal pathfinding and avoiding dead ends.

### Win Condition

Collect all 3 keys and reach the exit position.

## Controls

- **Arrow Keys / WASD**: Move character (Up, Down, Left, Right)
- **Button Controls**: Optional UI buttons for movement
- **Keyboard Navigation**: Primary control method

## Public API

### Initialization

```javascript
initKeyCollectionMapNav()
```

**Parameters:** None (uses hardcoded container `#level-6`)

### Game Control Functions

```javascript
// Start new game
initKeyCollectionMapNav()

// Backward compatibility
initLevel6()
```

## Known Issues

- **Container Dependency**: Requires `#level-6` container element
- **No Dynamic Container**: Uses hardcoded container ID
- **Event Listener Cleanup**: Keyboard listeners may persist without proper cleanup

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `key-collection-map-nav.html` in browser
2. Verify 10×10 grid displays with player, keys, and obstacles
3. Test arrow key controls for movement
4. Verify player cannot move through obstacles
5. Collect a key and verify counter updates
6. Collect all 3 keys and reach exit
7. Verify win condition triggers

### Expected Behavior

- Grid displays player position, keys, obstacles, and exit
- Arrow keys move player one cell at a time
- Player blocked by obstacles
- Keys disappear when collected
- Key counter updates
- Move counter and timer track progress
- Win message appears after collecting all keys and reaching exit

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/key-collection-map-nav.js"></script>
<div id="level-6"></div>
<script>initKeyCollectionMapNav();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Key Collection Map Navigation"
3. Click "Load Game"

## Future Improvements

- Add configurable map sizes
- Support custom container IDs
- Implement pathfinding hints
- Add enemies/moving obstacles
- Track best time and fewest moves
- Persist high scores

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
