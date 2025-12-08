# 4-Digit Code Breaker

## Overview

**Game ID:** `4-digit-code-breaker`  
**File:** `4-digit-code-breaker.js`  
**Difficulty:** Easy  
**Type:** Logic/Deduction

## Description

A logic puzzle where players must crack a 4-digit security code using deductive reasoning and feedback from their guesses. Players have 10 attempts to deduce the correct code.

## Gameplay and Goals

Players must guess a randomly generated 4-digit code (each digit 0-9). After each guess, the game provides feedback:
- ✓ = Correct digit in correct position
- ~ = Correct digit in wrong position
- ✗ = Digit not in code

The player must use this feedback to logically deduce the correct code within 10 attempts.

### Win Condition

Successfully guess the 4-digit code within 10 attempts.

## Controls

- **Number Inputs**: Enter digits 0-9 in each of the 4 input fields
- **Submit Button**: Submit your guess and receive feedback
- **Auto-advancing**: Input fields auto-advance as you type
- **Keyboard**: Use arrow keys to navigate between fields

## Public API

This game exposes the following functions for integration:

### Initialization

```javascript
// Primary initialization function
initCodeBreaker4Digit()
```

**Parameters:** None (uses hardcoded container `#level-1`)

**Returns:** None

### Game Control Functions

```javascript
// Start a new game (alias for init)
initCodeBreaker4Digit()

// Backward compatibility alias
initLevel1()
```

### Adapter Pattern (if needed)

The HTML wrapper provides standard entry points:

```javascript
// Standard adapter in HTML wrapper
window.initCodeBreaker4Digit = function() {
    // Calls the actual game function
    initCodeBreaker4Digit();
};
```

## Known Issues

- **Container Dependency**: Game requires a `#level-1` container element to be present in the DOM
- **No Dynamic Container**: Cannot specify custom container; uses hardcoded ID
- **State Persistence**: Game state is not persisted between page reloads
- **Input Validation**: Minimal client-side validation for non-numeric input

## Testing Notes

### Tested On

- **Browsers:** Chrome 120+, Firefox 121+
- **Date:** 2025-12-08

### Test Steps

1. Load `4-digit-code-breaker.html` in browser
2. Verify game initializes with 4 empty input fields
3. Enter a 4-digit guess and submit
4. Verify feedback symbols appear (✓, ~, or ✗ for each digit)
5. Enter incorrect guesses and verify attempt counter decreases
6. Enter correct code and verify win message
7. Verify game prevents submission after 10 attempts

### Expected Behavior

- Input fields accept only single digits (0-9)
- Fields auto-advance as digits are entered
- Submit button provides immediate feedback
- Attempt counter updates after each guess
- Attempt history shows all previous guesses with feedback
- Win/loss message appears with appropriate styling
- Game disables inputs after win or loss

## Tweaks and Configuration

Current implementation uses:
- **Code Length:** 4 digits
- **Max Attempts:** 10
- **Digit Range:** 0-9

To modify these parameters, edit the constants in `initCodeBreaker4Digit()` function.

## Integration Notes

### Using the HTML Wrapper

The standalone HTML wrapper (`4-digit-code-breaker.html`) provides:
- Automatic game initialization on page load
- Basic UI controls (New Game, Reset)
- Error handling and informative messages
- Standalone testing capability

### Using via Test Runner

Load this game in the test-runner:
1. Open `test-runner.html` in a browser
2. Select "4-Digit Code Breaker" from the dropdown
3. Click "Load Game" to test in iframe
4. Click "Open in New Tab" for full-screen testing

### Integration Example

```html
<!-- Include the game script -->
<script src="GamesandLevelsWIP/4-digit-code-breaker.js"></script>

<!-- Create required container -->
<div id="level-1"></div>

<!-- Initialize the game -->
<script>
    // Initialize using the main function
    initCodeBreaker4Digit();
</script>
```

## Future Improvements

- Add configurable code length (4, 5, or 6 digits)
- Support custom container IDs
- Add difficulty levels (easy/medium/hard with different attempt limits)
- Implement hint system
- Add timer for speedrun mode
- Persist progress in localStorage
- Add sound effects for feedback
- Add color-blind friendly mode

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
