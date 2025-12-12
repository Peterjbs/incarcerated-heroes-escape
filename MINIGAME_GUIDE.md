# Minigame Guide

Complete documentation for all minigames and variants in the Incarcerated Heroes: Labyrinth Escape game.

## Table of Contents

1. [Level Code Format](#level-code-format)
2. [Game Types](#game-types)
3. [Minigame Details](#minigame-details)
4. [Themes](#themes)

---

## Level Code Format

Each level has a unique code that identifies the minigame type, variant, position, and seed.

**Format:** `GAME-VX-SXX-SEED`

**Example:** `CB4-V0-S00-42`
- `CB4` = Game code (4-Digit Code Breaker)
- `V0` = Variant index 0
- `S00` = Slot index 00 (position in the 36-level grid)
- `42` = Random seed used for generation

### Game Code Reference

| Code | Game Name |
|------|-----------|
| CB4 | 4-Digit Code Breaker |
| AN2 | 2-Word Anagram Solver |
| MS9 | Magic Square 9-Grid |
| CB6 | 6-Digit Timed Code Breaker |
| ST15 | Sliding Tile 15-Puzzle |
| KCM | Key Collection Map Navigation |
| EPM | Enemy Patrol Maze |
| CEM | Checkpoint Extreme Maze |
| GCS | Gate Control Strategy |
| JWG | Jigsaw Word Grid 5×5 |

---

## Game Types

The 36 levels are distributed across these game type categories:

- **Logic/Deduction**: Code breaking puzzles
- **Word/Linguistic**: Anagram and word puzzles
- **Mathematical**: Number arrangement puzzles
- **Spatial**: Tile sliding puzzles
- **Navigation**: Map traversal challenges
- **Stealth**: Enemy avoidance mazes
- **Strategy**: Gate control and NPC management

---

## Minigame Details

### 1. 4-Digit Code Breaker (CB4)

**Type:** Logic/Deduction  
**Difficulty:** Easy  
**Level Code:** CB4-VX-SXX-42

#### Rules
Crack a 4-digit security code (0-9 for each digit) within a limited number of attempts.

#### Mechanics
- Random code generated at start
- Submit guesses using input fields
- Receive feedback after each attempt:
  - **✓** = Correct digit in correct position
  - **~** = Correct digit in wrong position
  - **✗** = Digit not in code

#### Win Condition
Enter the exact 4-digit code in the correct order.

#### Controls
- **Mouse/Touch:** Click input fields and type digits
- **Keyboard:** Type digits directly, Tab to move between fields, Enter to submit
- **Auto-advance:** Automatically moves to next field after entering a digit

#### Variants

| Variant | Digits | Attempts | Allow Repeats |
|---------|--------|----------|---------------|
| V0 | 4 | 10 | Yes |
| V1 | 4 | 8 | Yes |
| V2 | 4 | 10 | No |
| V3 | 4 | 12 | Yes |

#### Validation Logic
- Compares each digit of guess with secret code
- Generates position-aware feedback
- Tracks attempt count
- Success: All digits match positions

---

### 2. 2-Word Anagram Solver (AN2)

**Type:** Word/Linguistic  
**Difficulty:** Easy-Medium  
**Level Code:** AN2-VX-SXX-42

#### Rules
Unscramble adjective-noun pairs from ancient inscriptions.

#### Mechanics
- 4 scrambled phrases presented sequentially
- Must solve minimum percentage to pass (usually 50%)
- Hint system reveals individual words
- Skip option available for difficult phrases
- Progress bar shows completion status

#### Starting State
- First phrase displayed scrambled
- All letters visible but in wrong order
- Progress: 0/4 phrases solved

#### Win Condition
Solve at least 2 out of 4 phrases correctly (50% threshold).

#### Controls
- **Keyboard:** Type answers directly, Enter to submit
- **Buttons:** Submit Answer, Show Hint, Skip Phrase
- **Auto-uppercase:** Input automatically converted to uppercase

#### Variants

| Variant | Word Set | Min Solve Required |
|---------|----------|-------------------|
| V0 | Set 1 | 2/4 |
| V1 | Set 2 | 2/4 |
| V2 | Set 3 | 3/4 |
| V3 | Set 4 | 2/4 |

**Example Word Pairs:**
- DARK FOREST
- HIDDEN DOOR
- SECRET PATH
- ANCIENT LOCK

#### Validation Logic
- Case-insensitive comparison
- Exact match required
- Tracks solved count
- Success: Meets minimum solve threshold

---

### 3. Magic Square 9-Grid (MS9)

**Type:** Mathematical/Logic  
**Difficulty:** Medium  
**Level Code:** MS9-VX-SXX-42

#### Rules
Arrange numbers 1-9 in a 3×3 grid where each row, column, and diagonal sums to 15.

#### Mechanics
- Click cells to place numbers
- Numbers 1-9 available in pool
- Once placed, number removed from pool
- Clear cell to return number to pool
- Real-time feedback on current sums

#### Starting State
- Empty 3×3 grid
- All numbers 1-9 available
- Target sum: 15 for all lines

#### Win Condition
All rows, columns, and both diagonals sum to exactly 15.

#### Controls
- **Mouse/Touch:** Click cell, then click number to place
- **Buttons:** Submit to check, Hint for guidance, Clear to reset

#### Keybindings
- **1-9 Keys:** Select number
- **Click Grid:** Place selected number
- **Right-click/Long-press:** Clear cell

#### Variants

| Variant | Grid Size | Target Sum | Prefilled Cells |
|---------|-----------|------------|-----------------|
| V0 | 3×3 | 15 | 0 |
| V1 | 3×3 | 15 | 1 |
| V2 | 3×3 | 15 | 2 |
| V3 | 3×3 | 15 | 3 |

#### Validation Logic
- Sum each row: Must equal 15
- Sum each column: Must equal 15
- Sum main diagonal (top-left to bottom-right): Must equal 15
- Sum anti-diagonal (top-right to bottom-left): Must equal 15
- All numbers 1-9 used exactly once
- Success: All conditions met

**Note:** Classic solution has 5 in the center.

---

### 4. 6-Digit Timed Code Breaker (CB6)

**Type:** Logic/Timed  
**Difficulty:** Medium-Hard  
**Level Code:** CB6-VX-SXX-42

#### Rules
Advanced code-breaking with time pressure and enhanced feedback system.

#### Mechanics
- Random 6-digit code
- Countdown timer (varies by variant)
- Limited attempts (10-14)
- Enhanced feedback shows correct vs wrong position counts
- Detailed attempt history

#### Starting State
- Timer at full time (120-200 seconds)
- 0 attempts used
- Empty input fields
- Full attempt allowance

#### Win Condition
Enter the exact 6-digit code before time runs out and within attempt limit.

#### Controls
- **Keyboard:** Type digits, Tab to advance, Enter to submit
- **Auto-advance:** Moves to next field after digit entry
- **Visual timer:** Shows remaining time

#### Variants

| Variant | Digits | Time Limit | Max Attempts |
|---------|--------|------------|--------------|
| V0 | 6 | 180s | 12 |
| V1 | 6 | 150s | 10 |
| V2 | 6 | 200s | 14 |
| V3 | 6 | 120s | 10 |

#### Validation Logic
- Position-aware digit checking
- Counts correct positions
- Counts wrong positions
- Tracks time remaining
- Success: All digits correct AND time remaining > 0

---

### 5. Sliding Tile 15-Puzzle (ST15)

**Type:** Spatial/Logic  
**Difficulty:** Medium  
**Level Code:** ST15-VX-SXX-42

#### Rules
Classic sliding puzzle with 15 numbered tiles in a 4×4 grid.

#### Mechanics
- 4×4 grid with one empty space
- Click adjacent tile to slide it into empty space
- Move counter tracks efficiency
- Timer tracks completion time
- Shuffle ensures solvability

#### Starting State
- Tiles shuffled (50-120 moves depending on variant)
- Empty space usually in bottom-right
- Timer at 0:00
- Move count at 0

#### Win Condition
Arrange tiles in order: 1-15 from top-left to bottom-right, with empty space at bottom-right.

```
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 [ ]
```

#### Controls
- **Mouse/Touch:** Click tile adjacent to empty space
- **Keyboard:** Arrow keys to move tiles (in some variants)
- **Buttons:** Reset to reshuffle, Solve for hint

#### Variants

| Variant | Grid Size | Shuffle Moves | Difficulty |
|---------|-----------|---------------|------------|
| V0 | 4×4 | 50 | Easy |
| V1 | 4×4 | 80 | Medium |
| V2 | 4×4 | 100 | Hard |
| V3 | 4×4 | 120 | Very Hard |

#### Validation Logic
- Check each tile is in correct position
- Verify sequential order 1-15
- Empty space in position 16 (bottom-right)
- Success: All tiles in order

---

### 6. Key Collection Map Navigation (KCM)

**Type:** Navigation/Collection  
**Difficulty:** Easy-Medium  
**Level Code:** KCM-VX-SXX-42

#### Rules
Navigate a grid map to collect all keys and reach the exit.

#### Mechanics
- Grid-based movement (10×10 or 12×12)
- 3-4 keys scattered on map
- Obstacles block certain paths
- Move counter tracks efficiency
- Timer tracks completion time

#### Starting State
- Player at starting position (usually top-left)
- All keys uncollected
- Exit visible but locked until keys collected
- Move count: 0

#### Win Condition
Collect all required keys AND reach the exit position.

#### Controls
- **Keyboard:** Arrow keys or WASD to move
- **Buttons:** Up, Down, Left, Right directional buttons
- **Visual:** Player position highlighted

#### Keybindings
- **↑/W:** Move up
- **↓/S:** Move down
- **←/A:** Move left
- **→/D:** Move right

#### Variants

| Variant | Map Size | Key Count | Obstacle Count |
|---------|----------|-----------|----------------|
| V0 | 10×10 | 3 | 15 |
| V1 | 10×10 | 4 | 18 |
| V2 | 12×12 | 3 | 20 |
| V3 | 10×10 | 3 | 12 |

#### Map Legend
- **🟦** Player
- **🔑** Key (uncollected)
- **✅** Key (collected)
- **🚪** Exit
- **⬛** Obstacle/Wall
- **⬜** Walkable path

#### Validation Logic
- Track collected keys (must equal total keys)
- Check player position matches exit
- Success: All keys collected AND at exit

---

### 7. Enemy Patrol Maze (EPM)

**Type:** Stealth/Navigation  
**Difficulty:** Hard  
**Level Code:** EPM-VX-SXX-42

#### Rules
Navigate a canvas-based maze while avoiding moving enemy patrols.

#### Mechanics
- Real-time enemy movement with AI patterns
- Collision detection and reset on contact
- Smooth canvas rendering
- Multiple enemy types with different speeds
- Attempt counter tracks failures

#### Starting State
- Player at maze entrance
- Enemies at patrol start positions
- Attempt count: 0
- Best time: None

#### Win Condition
Reach the exit without touching any enemies.

#### Controls
- **Keyboard:** WASD or Arrow keys for movement
- **Continuous movement:** Hold key to keep moving
- **Visual indicators:** Player, enemies, walls clearly marked

#### Keybindings
- **W/↑:** Move up
- **S/↓:** Move down
- **A/←:** Move left
- **D/→:** Move right
- **R:** Restart current attempt

#### Variants

| Variant | Enemy Count | Enemy Speed | Maze Complexity |
|---------|-------------|-------------|-----------------|
| V0 | 3 | 1.0× | Simple |
| V1 | 4 | 1.2× | Simple |
| V2 | 3 | 1.5× | Complex |
| V3 | 5 | 1.0× | Simple |

#### Enemy AI Patterns
- **Patrol:** Follow fixed path back and forth
- **Random:** Change direction randomly
- **Chase:** Move toward player when in range (advanced variants)

#### Validation Logic
- Continuous collision checking
- Reset on enemy contact
- Success: Reach exit tile without collision

---

### 8. Checkpoint Extreme Maze (CEM)

**Type:** Navigation/Strategy  
**Difficulty:** Very Hard  
**Level Code:** CEM-VX-SXX-42

#### Rules
Advanced maze with multiple checkpoints and faster, more aggressive enemies.

#### Mechanics
- Larger, more complex maze layout
- 4-6 checkpoints to collect in any order
- Faster enemy patrols
- Checkpoint progress tracking
- Enhanced difficulty over Enemy Patrol Maze

#### Starting State
- Player at maze entrance
- 0 checkpoints collected
- All enemies at start positions
- No checkpoint order required

#### Win Condition
Collect all checkpoints AND reach the exit without dying.

#### Controls
- **Keyboard:** WASD or Arrow keys
- **Visual feedback:** Checkpoints change appearance when collected
- **Progress indicator:** Shows X/Total checkpoints

#### Keybindings
Same as Enemy Patrol Maze (EPM)

#### Variants

| Variant | Checkpoints | Enemy Count | Enemy Speed |
|---------|-------------|-------------|-------------|
| V0 | 4 | 4 | 1.5× |
| V1 | 5 | 3 | 1.8× |
| V2 | 4 | 5 | 1.3× |
| V3 | 6 | 4 | 1.5× |

#### Validation Logic
- Track collected checkpoints
- Collision detection with enemies
- Success: All checkpoints collected AND at exit

---

### 9. Gate Control Strategy (GCS)

**Type:** Strategy/Puzzle  
**Difficulty:** Very Hard  
**Level Code:** GCS-VX-SXX-42

#### Rules
Strategic puzzle requiring environmental control and NPC management.

#### Mechanics
- Toggleable gates control paths
- Guide friendly NPCs (comrades) to exit
- Trap or avoid enemy NPCs
- Complex AI for both allies and enemies
- Requires strategic planning and timing

#### Starting State
- Gates in initial configuration
- NPCs at starting positions
- Player at control station
- No comrades saved yet

#### Win Condition
All friendly comrades reach the exit safely.

#### Controls
- **Mouse/Touch:** Click gates to toggle open/closed
- **Keyboard:** Number keys to toggle specific gates
- **Visual:** Gates show open/closed state clearly

#### Keybindings
- **1-8:** Toggle gates 1-8
- **Space:** Pause/Resume simulation
- **R:** Reset level

#### Variants

| Variant | Gate Count | Friendly NPCs | Enemy NPCs |
|---------|------------|---------------|------------|
| V0 | 6 | 3 | 4 |
| V1 | 8 | 2 | 5 |
| V2 | 7 | 4 | 3 |
| V3 | 6 | 3 | 6 |

#### NPC Behavior
- **Friendly NPCs:** Move toward exit, avoid enemies
- **Enemy NPCs:** Patrol patterns, block paths
- **Gate interaction:** All NPCs respect gate states

#### Validation Logic
- Track comrade positions
- Check if comrades reached exit
- Ensure no comrades caught by enemies
- Success: All comrades at exit

---

### 10. Jigsaw Word Grid 5×5 (JWG)

**Type:** Word/Spatial  
**Difficulty:** Hard  
**Level Code:** JWG-VX-SXX-42

#### Rules
Crossword-style word puzzle with jigsaw-shaped letter tiles that must match cell shapes.

#### Mechanics
- 5×5 grid with intersecting words
- 3 across words and 3 down words (5 letters each)
- Tiles have unique shapes (indents/flanges)
- Tiles only fit in matching cell shapes
- Drag-and-drop mechanics
- Multiple themed puzzles

#### Starting State
- Empty grid or partially prefilled (4-5 letters depending on variant)
- All available tiles in tray
- Puzzle theme/hint displayed

#### Win Condition
All cells filled correctly with letters forming valid intersecting words.

#### Controls
- **Mouse:** Drag tiles from tray to grid
- **Touch:** Tap tile, then tap destination cell
- **Keyboard:** Arrow keys to navigate, Enter to place selected tile
- **Right-click:** Return tile to tray

#### Keybindings
- **Arrow Keys:** Navigate grid
- **Enter:** Place/remove tile
- **Space:** Select/deselect tile
- **Backspace:** Remove tile from cell

#### Variants

| Variant | Puzzle Theme | Prefilled Count | Difficulty |
|---------|--------------|-----------------|------------|
| V0 | Prison Break | 4 | Medium |
| V1 | Hero's Quest | 5 | Easy |
| V2 | Escape Route | 3 | Hard |
| V3 | Code Cipher | 4 | Medium |

#### Puzzle Structure
Grid positions for words:
- **Across:** Rows 0, 2, 4
- **Down:** Columns 0, 2, 4
- **Intersections:** Where across and down words cross

#### Hidden Messages
Each puzzle reveals a message when completed:
- V0: "BLUE KEYS"
- V1: "FAITH HEALS"
- V2: "GO NORTH"
- V3: "GATE PASS"

#### Validation Logic
- Check all cells filled
- Verify across words are valid
- Verify down words are valid
- Verify intersections match
- Success: All words valid AND intersections correct

**Note:** Current implementation may not fully enforce jigsaw shape matching (known issue).

---

## Themes

Each level is assigned a theme that affects its visual appearance. Themes are deterministically assigned based on level position.

### Available Themes

| Theme ID | Theme Name | Primary Color | Highlight Color |
|----------|------------|---------------|-----------------|
| midnight | Midnight Steel | #0a0e27 | #5b7fb8 |
| crimson | Crimson Dawn | #2d0a0e | #e94560 |
| emerald | Emerald Depths | #0a2d1e | #3fbb8f |
| amber | Amber Twilight | #2d1f0a | #f39c12 |
| violet | Violet Haze | #1a0a2d | #9b59b6 |
| ocean | Ocean Deep | #0a1a2d | #3498db |
| slate | Slate Shadow | #1a1a1a | #95a5a6 |
| rust | Rust Forge | #2d1a0a | #d35400 |
| teal | Teal Frost | #0a2d2d | #1abc9c |
| indigo | Indigo Night | #0f0a2d | #6c5ce7 |

### Theme Assignment
Themes cycle through the list based on level position (level.id % 10), ensuring visual variety across the 36 levels.

---

## General Gameplay Tips

### Code Breaking (CB4, CB6)
- Use deductive reasoning
- Track which digits are confirmed
- Pay attention to position feedback
- Start with unique digits when possible

### Word Puzzles (AN2, JWG)
- Look for common letter patterns
- Use hints strategically
- In anagrams, identify word length
- In word grids, solve intersections first

### Spatial Puzzles (MS9, ST15)
- Plan moves ahead
- In magic square, remember center = 5
- In sliding tiles, solve row by row
- Don't rush - fewer moves is better

### Navigation (KCM, EPM, CEM)
- Plan your route before moving
- Watch enemy patterns
- Collect items efficiently
- Memorize maze layout

### Strategy (GCS)
- Observe NPC behavior first
- Time gate toggles carefully
- Create safe corridors
- Trap enemies away from exit

---

## Technical Notes

### State Persistence
Currently, minigame state is not fully persisted when returning to the menu. This is a planned enhancement for future updates.

### Level Code Reproduction
To reproduce a specific level from its code:
1. The seed (last number) determines randomization
2. The variant (VX) determines configuration
3. Same code always generates same puzzle

### Validation Methods
All minigames use client-side validation. The code avoids `eval()` for security - all operations use explicit functions.

---

## Troubleshooting

### Common Issues

**Level won't load:**
- Refresh the page
- Check browser console for errors
- Ensure all scripts loaded

**Can't click tiles/buttons:**
- Ensure level fully initialized
- Try clicking slightly away from edges
- Check if instructions panel is blocking

**Progress not saving:**
- Check browser allows localStorage
- Don't use private/incognito mode
- Clear cache if issues persist

---

## Credits

**Game Design:** Incarcerated Heroes Team  
**Level System:** Dynamic 36-level generator  
**Documentation:** Complete variant guide

**Version:** 2.0.0 (Dynamic Levels)  
**Last Updated:** December 2025

---

## Quick Reference: All 36 Levels

The game generates 36 unique levels following these constraints:
- ✅ All 10 game types appear at least once
- ✅ No game type/variant combination appears more than twice
- ✅ Each level has a unique code for identification
- ✅ Themes assigned deterministically for consistent reproduction

For specific level configurations, check the level code displayed in-game.
