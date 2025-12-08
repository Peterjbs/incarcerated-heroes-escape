# Gate Control Strategy Maze

## Overview

**Game ID:** `gate-control-strategy-maze`  
**File:** `gate-control-strategy-maze.js`  
**Difficulty:** Very Hard  
**Type:** Strategy/Puzzle

## Description

Strategic puzzle with environmental control and NPC guidance. Players must toggle gates to guide friendly NPCs to the exit while trapping or avoiding enemy NPCs. Requires careful planning and timing.

## Gameplay and Goals

Navigate a complex maze with toggleable gates, friendly comrade NPCs, and enemy NPCs. Use gate controls to create paths for comrades while blocking enemies. Guide all comrades to the exit while avoiding or trapping enemies.

### Win Condition

Guide all friendly comrades to the exit while preventing enemies from reaching it.

## Controls

- **WASD Keys**: Player movement (W=Up, A=Left, S=Down, D=Right)
- **Arrow Keys**: Alternative movement controls
- **Space/Click**: Toggle gates (when near a gate control)
- **Strategic Planning**: Required for optimal gate timing

## Public API

### Initialization

```javascript
initGateControlStrategyMaze()
```

**Parameters:** None (uses hardcoded container `#level-9`)

### Game Control Functions

```javascript
// Start new game
initGateControlStrategyMaze()

// Setup canvas (helper)
setupCanvas9()

// Backward compatibility
initLevel9()
```

## Known Issues

- **Container Dependency**: Requires `#level-9` container element
- **Complex State**: Multiple NPCs with AI may cause performance issues
- **Interval Cleanup**: Multiple intervals (timer, NPCs) may persist without cleanup
- **Event Listener Cleanup**: Keyboard listeners may accumulate

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `gate-control-strategy-maze.html` in browser
2. Verify canvas displays maze, player, comrades, enemies, gates
3. Test WASD/Arrow key controls for movement
4. Test gate toggle functionality
5. Verify comrade NPCs follow AI pathfinding
6. Verify enemy NPCs move and can be blocked by gates
7. Guide all comrades to exit
8. Verify win condition

### Expected Behavior

- Canvas renders maze with walls, gates, player, NPCs, exit
- Player moves smoothly with keyboard controls
- Gates toggle open/closed on activation
- Comrade NPCs pathfind toward exit
- Enemy NPCs patrol or chase player
- Gate controls affect NPC movement
- Win message appears when all comrades reach exit

## Integration Notes

### Using the HTML Wrapper

```html
<script src="GamesandLevelsWIP/gate-control-strategy-maze.js"></script>
<div id="level-9"></div>
<script>initGateControlStrategyMaze();</script>
```

### Using via Test Runner

1. Open `test-runner.html`
2. Select "Gate Control Strategy Maze"
3. Click "Load Game"

## Future Improvements

- Add configurable maze layouts
- Support custom container IDs
- Implement difficulty levels (more NPCs, faster enemies)
- Add tutorial/hint system
- Track optimal solution moves
- Add replay functionality
- Implement undo/checkpoint system

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
