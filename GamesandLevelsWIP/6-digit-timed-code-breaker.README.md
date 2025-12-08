# 6-Digit Timed Code Breaker

## Overview

**Game ID:** `6-digit-timed-code-breaker`  
**File:** `6-digit-timed-code-breaker.js`  
**Difficulty:** Medium-Hard  
**Type:** Logic/Timed

## Description

An advanced code-breaking puzzle with time pressure. Players must crack a 6-digit security code within 180 seconds using enhanced feedback and strategic deduction.

## Gameplay and Goals

Players must guess a randomly generated 6-digit code under time pressure (180-second countdown). The game provides enhanced feedback showing both correct positions and wrong positions separately.

After each guess:
- Shows count of correct digits in correct positions
- Shows count of correct digits in wrong positions
- Displays detailed attempt history

Players have 12 attempts to crack the code before time runs out.

### Win Condition

Successfully guess the 6-digit code within 180 seconds and 12 attempts.

## Controls

- **Number Inputs**: Enter digits 0-9 in each of the 6 input fields
- **Submit Button**: Submit your guess and receive feedback
- **Auto-advancing**: Input fields auto-advance as you type
- **Keyboard**: Use arrow keys to navigate between fields
- **Timer**: Displays countdown in real-time

## Public API

This game exposes the following functions for integration:

### Initialization

```javascript
// Primary initialization function
initCodeBreaker6DigitTimed()
```

**Parameters:** None (uses hardcoded container `#level-4`)

**Returns:** None

### Game Control Functions

```javascript
// Start a new game (alias for init)
initCodeBreaker6DigitTimed()

// Backward compatibility alias
initLevel4()
```

### Adapter Pattern (if needed)

The HTML wrapper automatically detects the correct entry point. If needed, you can create an adapter:

```javascript
// Example: if game exposes a different function name
// Map it to the expected pattern
window.initCodeBreaker6DigitTimed = window.someOtherGameInitFunction;
```

## Known Issues

- **Container Dependency**: Game requires a `#level-4` container element to be present in the DOM
- **No Dynamic Container**: Cannot specify custom container; uses hardcoded ID
- **Timer Cleanup**: Timer intervals may persist if page navigation occurs before completion
- **State Persistence**: Game state is not persisted between page reloads

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `6-digit-timed-code-breaker.html` in browser
2. Verify game initializes with 6 empty input fields and 180-second timer
3. Verify timer counts down in real-time
4. Enter a 6-digit guess and submit
5. Verify feedback shows counts of correct/wrong positions
6. Verify attempt history displays with detailed feedback
7. Test time-out scenario (wait for timer to reach 0)
8. Test success scenario (guess correct code)

### Expected Behavior

- Timer starts automatically on game initialization
- Input fields accept only single digits (0-9)
- Fields auto-advance as digits are entered
- Submit button provides enhanced feedback (correct vs wrong positions)
- Attempt history updates with each guess
- Game ends on timeout or correct guess
- Win/loss message appears appropriately
- Timer stops on game completion

## Tweaks and Configuration

Current implementation uses:
- **Code Length:** 6 digits
- **Time Limit:** 180 seconds
- **Max Attempts:** 12
- **Digit Range:** 0-9

To modify these parameters, edit the constants in `initCodeBreaker6DigitTimed()` function.

## Integration Notes

### Using the HTML Wrapper

The standalone HTML wrapper (`6-digit-timed-code-breaker.html`) provides:
- Automatic game initialization on page load
- Basic UI controls (New Game, Reset)
- Error handling and informative messages
- Standalone testing capability

### Using via Test Runner

Load this game in the test-runner:
1. Open `test-runner.html` in a browser
2. Select "6-Digit Timed Code Breaker" from the dropdown
3. Click "Load Game" to test in iframe
4. Click "Open in New Tab" for full-screen testing

### Integration Example

```html
<!-- Include the game script -->
<script src="GamesandLevelsWIP/6-digit-timed-code-breaker.js"></script>

<!-- Create required container -->
<div id="level-4"></div>

<!-- Initialize the game -->
<script>
    // Initialize using the main function
    initCodeBreaker6DigitTimed();
</script>
```

## Future Improvements

- Add configurable time limits
- Support custom container IDs
- Add difficulty modes (varies code length, time, attempts)
- Implement pause functionality
- Add sound effects for urgency as time runs low
- Persist best times in localStorage
- Add visual timer bar
- Implement hint system with time penalties

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
