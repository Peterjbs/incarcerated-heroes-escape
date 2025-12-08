# Checkpoint Extreme Maze

## Overview

**Game ID:** `checkpoint-extreme-maze`  
**File:** `checkpoint-extreme-maze.js`  
**Difficulty:** Very Hard  
**Type:** Advanced Navigation/Strategy

## Description

Advanced canvas-based maze with 4 checkpoints to collect and faster, more aggressive enemies. Players must navigate a larger maze, collect all checkpoints, and reach the exit.

## Gameplay and Goals

Navigate through an extreme difficulty maze collecting 4 checkpoints in any order while avoiding fast-moving enemies. Requires advanced pathfinding skills and strategic planning to minimize encounters with enemies.

### Win Condition

Collect all 4 checkpoints and reach the exit.

## Controls

- **WASD Keys**: Movement (W=Up, A=Left, S=Down, D=Right)
- **Arrow Keys**: Alternative movement controls
- **Canvas-based**: Smooth real-time rendering

## Public API

### Initialization

```javascript
initCheckpointExtremeMaze()
```

**Parameters:** None (uses hardcoded container `#level-8`)

### Game Control Functions

```javascript
// Start new game
initCheckpointExtremeMaze()

// Setup canvas (helper)
setupCanvas8()

// Backward compatibility
initLevel8()
```

## Known Issues

- **Container Dependency**: Requires `#level-8` container element
- **Canvas Focus**: Canvas must have focus for keyboard input
- **Interval Cleanup**: Multiple intervals (timer, enemies) may persist without cleanup
- **Event Listener Cleanup**: Keyboard listeners may accumulate

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `checkpoint-extreme-maze.html` in browser
2. Verify canvas displays maze, player, checkpoints, enemies
3. Test WASD/Arrow key controls
4. Verify enemies move faster than in enemy-patrol-maze
5. Collect a checkpoint and verify counter updates
6. Collide with an enemy and verify reset
7. Collect all 4 checkpoints and reach exit
8. Verify win condition

### Expected Behavior

- Canvas renders larger maze with walls, player, enemies, checkpoints, exit
- Player moves smoothly with keyboard controls
- Enemies move faster and more aggressively
- Checkpoint counter updates as checkpoints are collected
- Collision detection resets player to start
- Attempt counter increments on collision
- Timer tracks elapsed time
- Win message appears after collecting all checkpoints and reaching exit

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/checkpoint-extreme-maze.js"></script>
<div id="level-8"></div>
<script>initCheckpointExtremeMaze();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Checkpoint Extreme Maze"
3. Click "Load Game"

## Future Improvements

- Add configurable maze layouts
- Support custom container IDs
- Implement difficulty levels
- Add minimap with checkpoint indicators
- Track best time and fewest attempts
- Add checkpoint order optimization hints
- Implement save/checkpoint system

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
