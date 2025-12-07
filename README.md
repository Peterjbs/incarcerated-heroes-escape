# 🎮 Incarcerated Heroes: Labyrinth Escape

A dystopian web-based puzzle adventure game where you play as a band of incarcerated heroes trapped in a labyrinth. Solve code-breaking and puzzle challenges to navigate through eight levels, avoid foes, and escape back to Earth to build a new home.

## 🌟 Game Overview

**Incarcerated Heroes: Labyrinth Escape** is a browser-based puzzle game featuring 9 unique challenges that test your code-breaking, pattern recognition, logic, navigation skills, and reflexes. Each level presents a different type of puzzle that you must complete to unlock the next chamber and ultimately escape the labyrinth.

## 🎯 Features

- **9 Unique Puzzle Levels**: Each with its own mechanics and challenge type
- **Progressive Difficulty**: Levels unlock sequentially as you complete each challenge
- **Interactive Mazes**: Navigate through pathfinding challenges with moving enemies
- **Gate Control Mechanics**: Strategic gate locking/unlocking in the final level
- **Auto-Save Progress**: Your game progress is automatically saved in your browser
- **Responsive Design**: Play on desktop or mobile devices
- **Immersive Narrative**: Story elements guide you through your escape
- **Victory Screen**: Celebrate your achievement upon completing all levels

## 🕹️ The 9 Levels

1. **Code Breaker** - Crack a 4-digit security code with limited attempts
2. **Anagram Solver** - Rearrange scrambled letters into adjective-noun pairs
3. **9-Number Grid** - Arrange numbers 1-9 to form a magic square (all rows, columns, and diagonals sum to 15)
4. **Advanced Code Breaker** - Crack a 6-digit code with a timer and enhanced feedback
5. **Jiggy Puzzle** - Solve a sliding tile puzzle (arrange tiles 1-15 in order)
6. **Map Navigation** - Navigate a grid-based map, collect keys, and reach the exit
7. **Pathfinder Challenge** - Navigate a maze while avoiding moving enemies
8. **Pathfinder Extreme** - Advanced pathfinding with checkpoints and faster enemies
9. **Gate Master Maze** - Control gates to guide comrades and trap enemies in the final escape

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
│   └── level9.js      # Gate Master Maze
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

## 🐛 Known Issues

None at this time. Please report any bugs you encounter!

## 📮 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Have fun escaping the labyrinth, hero!** 🎉
