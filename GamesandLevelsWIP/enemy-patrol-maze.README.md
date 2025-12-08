# Enemy Patrol Maze

## Overview

**Game ID:** `enemy-patrol-maze`  
**File:** `enemy-patrol-maze.js`  
**Difficulty:** Hard  
**Type:** Stealth/Navigation

## Description

Canvas-based maze navigation with moving enemy patrols. Players must navigate from start to exit while avoiding enemies that follow patrol patterns.

## Gameplay and Goals

Navigate through a canvas-rendered maze while avoiding moving enemy patrols. Enemies follow predefined paths and reset player position on collision. Requires careful timing and spatial awareness.

### Win Condition

Reach the exit without colliding with enemies (or within allowed attempt limit).

## Controls

- **WASD Keys**: Movement (W=Up, A=Left, S=Down, D=Right)
- **Arrow Keys**: Alternative movement controls
- **Canvas-based**: Smooth real-time rendering

## Public API

### Initialization

```javascript
initEnemyPatrolMaze()
```

**Parameters:** None (uses hardcoded container `#level-7`)

### Game Control Functions

```javascript
// Start new game
initEnemyPatrolMaze()

// Setup canvas (helper)
setupCanvas7()

// Backward compatibility
initLevel7()
```

## Known Issues

- **Container Dependency**: Requires `#level-7` container element
- **Canvas Focus**: Canvas must have focus for keyboard input
- **Interval Cleanup**: Enemy animation intervals may persist without cleanup
- **Event Listener Cleanup**: Keyboard listeners may accumulate

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `enemy-patrol-maze.html` in browser
2. Verify canvas displays maze, player, and enemies
3. Test WASD/Arrow key controls
4. Verify enemies move along patrol paths
5. Collide with an enemy and verify reset
6. Navigate to exit successfully
7. Verify win condition

### Expected Behavior

- Canvas renders maze with walls, player, enemies, exit
- Player moves smoothly with keyboard controls
- Enemies follow patrol patterns
- Collision detection resets player to start
- Attempt counter increments on collision
- Timer tracks elapsed time
- Win message appears on reaching exit

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/enemy-patrol-maze.js"></script>
<div id="level-7"></div>
<script>initEnemyPatrolMaze();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Enemy Patrol Maze"
3. Click "Load Game"

## Future Improvements

- Add configurable maze layouts
- Support custom container IDs
- Implement difficulty levels (enemy speed)
- Add minimap
- Track best time
- Add sound effects for collisions
- Implement save/checkpoint system

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
