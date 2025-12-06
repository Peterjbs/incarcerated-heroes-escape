# 🎮 Incarcerated Heroes: Labyrinth Escape

A dystopian web-based puzzle adventure game where you play as a band of incarcerated heroes trapped in a labyrinth. Solve code-breaking and puzzle challenges to navigate through eight levels, avoid foes, and escape back to Earth to build a new home.

## 🌟 Game Overview

**Incarcerated Heroes: Labyrinth Escape** is a browser-based puzzle game featuring 8 unique challenges that test your code-breaking, pattern recognition, logic, and reflexes. Each level presents a different type of puzzle that you must complete to unlock the next chamber and ultimately escape the labyrinth.

## 🎯 Features

- **8 Unique Puzzle Levels**: Each with its own mechanics and challenge type
- **Progressive Difficulty**: Levels unlock sequentially as you complete each challenge
- **Auto-Save Progress**: Your game progress is automatically saved in your browser
- **Responsive Design**: Play on desktop or mobile devices
- **Immersive Narrative**: Story elements guide you through your escape
- **Victory Screen**: Celebrate your achievement upon completing all levels

## 🕹️ The 8 Levels

1. **Code Breaker** - Crack a 4-digit security code with limited attempts
2. **Anagram Solver** - Rearrange scrambled letters into adjective-noun pairs
3. **Math Grid Puzzle** - Arrange numbers to complete mathematical equations
4. **Filtered Match Breaker** - Generate and match 16-character security codes
5. **Grouped Score Breaker** - Find matching patterns in database records
6. **Tactical Trivia Slots** - Answer trivia questions to align slot machine reels
7. **Predator Prey Dungeon** - Navigate a maze while avoiding patrolling guards
8. **Final Synthesis** - A multi-stage challenge combining all your learned skills

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
   - **Or use a local server**:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000 in your browser
     ```

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
│   ├── level3.js      # Math Grid Puzzle
│   ├── level4.js      # Filtered Match Breaker
│   ├── level5.js      # Grouped Score Breaker
│   ├── level6.js      # Tactical Trivia Slots
│   ├── level7.js      # Predator Prey Dungeon
│   └── level8.js      # Final Synthesis
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
- **Level 3**: Start by finding combinations that work for the simpler operations
- **Level 4**: Use the pattern hint to determine which character types to include
- **Level 5**: Look for patterns with the same structure (XXX-NNN format)
- **Level 6**: You need to align all three reels with matching symbols
- **Level 7**: Take your time and learn the guard patrol patterns
- **Level 8**: Each stage tests a skill from previous levels - stay focused!

## 🐛 Known Issues

None at this time. Please report any bugs you encounter!

## 📮 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Have fun escaping the labyrinth, hero!** 🎉
