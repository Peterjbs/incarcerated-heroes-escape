# {GAME_TITLE}

## Overview

**Game ID:** `{GAME_ID}`  
**File:** `{JS_FILE}`  
**Difficulty:** {DIFFICULTY}  
**Type:** {GAME_TYPE}

## Description

{GAME_DESCRIPTION}

## Gameplay and Goals

{GAMEPLAY_DESCRIPTION}

### Win Condition

{WIN_CONDITION}

## Controls

{CONTROLS_DESCRIPTION}

## Public API

This game exposes the following functions for integration:

### Initialization

```javascript
// Primary initialization function
{INIT_FUNCTION}(container, options)
```

**Parameters:**
- `container` - DOM element or selector for the game container
- `options` - (Optional) Configuration object

**Returns:** None

### Game Control Functions

```javascript
// Start a new game
{NEW_GAME_FUNCTION}()

// Reset the current game
{RESET_FUNCTION}()

// Shuffle/Randomize (if applicable)
{SHUFFLE_FUNCTION}()

// Show solution/hints (if applicable)
{SOLUTION_FUNCTION}()
```

### Adapter Pattern (if needed)

If the game exposes non-standard entry points, the HTML wrapper includes an adapter:

```javascript
// Example adapter in HTML wrapper
window.init{CamelCasedId} = function(container, options) {
    // Calls the actual game function
    {ACTUAL_FUNCTION_NAME}();
};
```

## Known Issues

{KNOWN_ISSUES}

## Testing Notes

### Tested On

- **Browsers:** {TESTED_BROWSERS}
- **Date:** {TEST_DATE}

### Test Steps

1. {TEST_STEP_1}
2. {TEST_STEP_2}
3. {TEST_STEP_3}
4. {TEST_STEP_4}

### Expected Behavior

{EXPECTED_BEHAVIOR}

## Tweaks and Configuration

{TWEAKS_DESCRIPTION}

## Integration Notes

### Using the HTML Wrapper

The standalone HTML wrapper (`{GAME_ID}.html`) provides:
- Automatic game initialization
- Basic UI controls (New Game, Reset, etc.)
- Error handling and informative messages
- Standalone testing capability

### Using via Test Runner

Load this game in the test-runner:
1. Open `test-runner.html` in a browser
2. Select "{GAME_TITLE}" from the dropdown
3. Click "Load Game" to test in iframe
4. Click "Open in New Tab" for full-screen testing

### Integration Example

```html
<!-- Include the game script -->
<script src="GamesandLevelsWIP/{JS_FILE}"></script>

<!-- Create a container -->
<div id="game-container"></div>

<!-- Initialize the game -->
<script>
    // Option 1: Use standard init pattern
    {INIT_FUNCTION}();
    
    // Option 2: Use with custom container
    const container = document.getElementById('game-container');
    {INIT_FUNCTION}(container);
</script>
```

## Future Improvements

{FUTURE_IMPROVEMENTS}

---

**Last Updated:** {LAST_UPDATED}  
**Version:** 1.0.0
