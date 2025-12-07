# 🎮 Incarcerated Heroes: Labyrinth Escape

A dystopian web-based puzzle adventure game where you play as a band of incarcerated heroes trapped in a labyrinth. Solve code-breaking and puzzle challenges to navigate through eight levels, avoid foes, and escape back to Earth to build a new home.

## 🌟 Game Overview

**Incarcerated Heroes: Labyrinth Escape** is a browser-based puzzle game featuring 10 unique challenges that test your code-breaking, pattern recognition, logic, navigation skills, word-solving abilities, and reflexes. Each level presents a different type of puzzle that you must complete to unlock the next chamber and ultimately escape the labyrinth.

## 🎯 Features

- **10 Unique Puzzle Levels**: Each with its own mechanics and challenge type
- **Progressive Difficulty**: Levels unlock sequentially as you complete each challenge
- **Word Grid Puzzles**: New jigsaw-styled 5×5 crossword mini-game with drag-and-drop tiles
- **Interactive Mazes**: Navigate through pathfinding challenges with moving enemies
- **Gate Control Mechanics**: Strategic gate locking/unlocking in the final level
- **Auto-Save Progress**: Your game progress is automatically saved in your browser
- **Responsive Design**: Play on desktop or mobile devices
- **Immersive Narrative**: Story elements guide you through your escape
- **Victory Screen**: Celebrate your achievement upon completing all levels

## 🕹️ The 10 Levels

1. **Code Breaker** - Crack a 4-digit security code with limited attempts
2. **Anagram Solver** - Rearrange scrambled letters into adjective-noun pairs
3. **9-Number Grid** - Arrange numbers 1-9 to form a magic square (all rows, columns, and diagonals sum to 15)
4. **Advanced Code Breaker** - Crack a 6-digit code with a timer and enhanced feedback
5. **Jiggy Puzzle** - Solve a sliding tile puzzle (arrange tiles 1-15 in order)
6. **Map Navigation** - Navigate a grid-based map, collect keys, and reach the exit
7. **Pathfinder Challenge** - Navigate a maze while avoiding moving enemies
8. **Pathfinder Extreme** - Advanced pathfinding with checkpoints and faster enemies
9. **Gate Master Maze** - Control gates to guide comrades and trap enemies in the final escape
10. **Word Grid Challenge** - Solve jigsaw-styled 5×5 crossword puzzles with themed word sets

## 🚀 How to Play

### Online (GitHub Pages)

Visit the live game at: `https://peterjbs.github.io/incarcerated-heroes-escape/`

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Peterjbs/incarcerated-heroes-escape.git
   ```

2. Navigate to the project directory:
   ```bash
   cd incarcerated-heroes-escape
   ```

3. Open `index.html` in your web browser:
   - **Windows**: Double-click `index.html`
   - **Mac/Linux**: Right-click → Open With → Your preferred browser
   - **Or use a local server** (recommended):
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000 in your browser
     ```

### Testing/Development Mode

For testing and QA purposes, use the dedicated testing interface:

```bash
# Start local server
python -m http.server 8000

# Navigate to testing page
http://localhost:8000/test/
```

The testing interface provides:
- ✅ All levels unlocked automatically
- ✅ One-click access to any level
- ✅ Quick navigation for QA testing
- ✅ Level status indicators

See `test/README.md` for detailed testing documentation.

## 🎮 Controls

- **Mouse/Touch**: Click buttons and interact with puzzle elements
- **Keyboard**: 
  - Arrow Keys / WASD (Level 7 maze navigation)
  - Enter (Submit answers in various levels)
  - Number keys (Code entry)

## 💾 Game Progress

Your progress is automatically saved in your browser's localStorage. You can:
- Resume your game at any time
- Replay completed levels
- Reset all progress from the main menu

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with modern features (gradients, animations, flexbox, grid)
- **Vanilla JavaScript** - Game logic and interactivity
- **Canvas API** - For Level 7 maze rendering
- **LocalStorage API** - Progress persistence

### Project Structure
```
incarcerated-heroes-escape/
├── index.html          # Main game entry point
├── styles.css          # Global styles and theme
├── game.js            # Core game state management
├── levels/            # Individual level implementations
│   ├── level1.js      # Code Breaker
│   ├── level2.js      # Anagram Solver
│   ├── level3.js      # 9-Number Grid (Magic Square)
│   ├── level4.js      # Advanced Code Breaker
│   ├── level5.js      # Jiggy Puzzle (Sliding Tiles)
│   ├── level6.js      # Map Navigation
│   ├── level7.js      # Pathfinder Challenge
│   ├── level8.js      # Pathfinder Extreme
│   ├── vital_signs.js # Gate Master Maze
│   └── level10.js     # Word Grid Challenge (NEW)
└── README.md          # This file
```

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🎨 Customization

The game uses CSS custom properties (variables) for easy theming. Edit `styles.css` to customize colors:

```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #0f3460;
    --highlight-color: #e94560;
    --success-color: #2ecc71;
    --warning-color: #f39c12;
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new puzzle types
- Improve existing puzzles
- Enhance the UI/UX
- Add sound effects or music

## 📝 License

This project is open source and available under the MIT License.

## 👏 Credits

- Game Design & Development: Incarcerated Heroes Team
- Inspired by classic code-breaking and puzzle games

## 🎯 Tips for Players

- **Level 1**: Pay attention to the feedback symbols (✓ = correct position, ~ = wrong position, ✗ = not in code)
- **Level 2**: The hint reveals the individual words if you're stuck
- **Level 3**: In a magic square, the center cell should contain 5. Try placing it there first!
- **Level 4**: The enhanced feedback shows how many digits are in correct vs wrong positions
- **Level 5**: Look for patterns - try to get the first row correct, then work on subsequent rows
- **Level 6**: Plan your route to collect all keys before heading to the exit
- **Level 7**: Watch the enemy patrol patterns and time your movements carefully
- **Level 8**: Collect checkpoints in any order, but plan an efficient route to minimize enemy encounters
- **Level 9**: Use gates strategically to trap enemies and create safe paths for your comrades
- **Level 10**: Each puzzle hides a message in six 5-letter words. Jigsaw-shaped tiles only fit in matching cells!

## 🧩 Word Grid Challenge (Level 10)

Level 10 introduces a unique word puzzle mini-game featuring jigsaw-styled letter tiles:

### Game Mechanics
- **5×5 Grid**: Complete crossword-style puzzles with 3 across and 3 down words
- **Jigsaw Tiles**: Each tile has a unique shape with indents and flanges that only fit specific cells
- **Multiple Puzzles**: Four thematic puzzles with varying difficulty
- **Hidden Messages**: Each puzzle reveals a thematic phrase when completed

### Controls
- **Drag & Drop**: Click and drag tiles from the tray to the grid
- **Click to Place**: Click a tile, then click a cell to place it
- **Keyboard**: Use arrow keys to navigate and Enter to place selected tiles
- **Touch Support**: Full touch/mobile support with tap-to-select

### Puzzle Variants
The game includes four themed puzzles with different prefill patterns:
1. **Prison Break** - Corner letters prefilled (BLUE KEYS message)
2. **Hero's Quest** - Center and corners prefilled (FAITH HEALS message)
3. **Escape Route** - Edge midpoints prefilled (GO NORTH message)
4. **Code Cipher** - Diagonal pattern prefilled (GATE PASS message)

### Adding New Puzzles

To create custom puzzles, edit the `WORD_GRID_PUZZLES` array in `levels/level10.js`:

```javascript
{
    name: "Your Puzzle Name",
    hint: "A helpful hint...",
    words: {
        across: ["WORD1", "WORD2", "WORD3"],  // 5 letters each
        down: ["WORD4", "WORD5", "WORD6"]      // 5 letters each
    },
    acrossRows: [0, 2, 4],  // Which rows contain across words
    downCols: [0, 2, 4],     // Which columns contain down words
    prefilled: [
        {row: 0, col: 0, letter: 'W'},  // Pre-placed letters
        // Add more as needed
    ],
    message: "HIDDEN MESSAGE"  // Revealed on completion
}
```

### Design Guidelines
- **Word Selection**: Choose 5-letter words that intersect properly at rows 0,2,4 and columns 0,2,4
- **Letter Constraints**: Vowels may repeat; try to use unique consonants per puzzle for difficulty
- **Prefill Strategy**: More prefilled letters make puzzles easier; 4-5 is recommended
- **Thematic Words**: Consider creating word sets that tell a story or encode hints for other levels
- **Message Encoding**: The hidden message can provide clues, celebration text, or narrative elements

## 🐛 Known Issues

None at this time. Please report any bugs you encounter!

## 📮 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Have fun escaping the labyrinth, hero!** 🎉
