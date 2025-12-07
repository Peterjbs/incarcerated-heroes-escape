// Game State Management
const GameState = {
    levels: [
        {
            id: 1,
            title: "Code Breaker",
            description: "Crack the 4-digit security code",
            completed: false,
            unlocked: true
        },
        {
            id: 2,
            title: "Anagram Solver",
            description: "Rearrange letters into meaningful words",
            completed: false,
            unlocked: false
        },
        {
            id: 3,
            title: "9-Number Grid",
            description: "Arrange numbers 1-9 in the magic grid",
            completed: false,
            unlocked: false
        },
        {
            id: 4,
            title: "Advanced Code Breaker",
            description: "Master the enhanced codebreaking challenge",
            completed: false,
            unlocked: false
        },
        {
            id: 5,
            title: "Jiggy Puzzle",
            description: "Solve the sliding tile puzzle",
            completed: false,
            unlocked: false
        },
        {
            id: 6,
            title: "Map Navigation",
            description: "Find the path through the treacherous map",
            completed: false,
            unlocked: false
        },
        {
            id: 7,
            title: "Pathfinder Challenge",
            description: "Navigate the complex pathfinding maze",
            completed: false,
            unlocked: false
        },
        {
            id: 8,
            title: "Pathfinder Extreme",
            description: "Master the ultimate pathfinding test",
            completed: false,
            unlocked: false
        },
        {
            id: 9,
            title: "Gate Master Maze",
            description: "Lock and unlock gates to escape the final labyrinth",
            completed: false,
            unlocked: false
        },
        {
            id: 10,
            title: "Word Grid Challenge",
            description: "Solve jigsaw-styled 5×5 word puzzles",
            completed: false,
            unlocked: false
        },
        {
            id: 11,
            title: "CCTV Security Breach",
            description: "Hack the security system and guide your comrade",
            completed: false,
            unlocked: false
        },
        {
            id: 12,
            title: "Vital Signs Subterfuge",
            description: "Extract trackers and deceive surveillance",
            completed: false,
            unlocked: false
        }
    ],
    currentLevel: null
};

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            GameState.levels = savedState.levels || GameState.levels;
        } catch (e) {
            console.error('Error loading game state:', e);
        }
    }
}

// Save game state to localStorage
function saveGameState() {
    try {
        localStorage.setItem('gameState', JSON.stringify(GameState));
    } catch (e) {
        console.error('Error saving game state:', e);
    }
}

// Reset all progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        GameState.levels.forEach((level, index) => {
            level.completed = false;
            level.unlocked = index === 0;
        });
        saveGameState();
        renderLevelSelect();
        showScreen('main-menu');
    }
}

// Reset and replay
function resetAndReplay() {
    resetProgress();
    showScreen('level-select');
}

// Screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        
        // Special handling for level select
        if (screenId === 'level-select') {
            renderLevelSelect();
        }
        
        // Check if all levels completed when showing level select
        if (screenId === 'level-select' && allLevelsCompleted()) {
            setTimeout(() => showScreen('victory'), 500);
        }
    }
}

// Render level select grid
function renderLevelSelect() {
    const grid = document.getElementById('level-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    GameState.levels.forEach(level => {
        const card = document.createElement('div');
        card.className = 'level-card';
        
        if (level.completed) {
            card.classList.add('completed');
        }
        if (!level.unlocked) {
            card.classList.add('locked');
        }
        
        const status = level.completed ? '✓' : (level.unlocked ? '○' : '🔒');
        
        card.innerHTML = `
            <div class="level-status">${status}</div>
            <div class="level-number">Level ${level.id}</div>
            <div class="level-title">${level.title}</div>
            <div class="level-description">${level.description}</div>
        `;
        
        if (level.unlocked) {
            card.addEventListener('click', () => startLevel(level.id));
        }
        
        grid.appendChild(card);
    });
}

// Start a level
function startLevel(levelId) {
    const level = GameState.levels.find(l => l.id === levelId);
    if (!level || !level.unlocked) return;
    
    GameState.currentLevel = levelId;
    
    // Initialize the level
    const levelInitFunction = window[`initLevel${levelId}`];
    if (typeof levelInitFunction === 'function') {
        levelInitFunction();
    }
    
    showScreen(`level-${levelId}`);
}

// Complete a level
function completeLevel(levelId) {
    const level = GameState.levels.find(l => l.id === levelId);
    if (!level) return;
    
    level.completed = true;
    
    // Unlock next level
    if (levelId < GameState.levels.length) {
        const nextLevel = GameState.levels.find(l => l.id === levelId + 1);
        if (nextLevel) {
            nextLevel.unlocked = true;
        }
    }
    
    saveGameState();
    
    // Show completion message
    showCompletionMessage(level);
}

// Show completion message
function showCompletionMessage(level) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(46, 204, 113, 0.95);
        color: white;
        padding: 30px 50px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.5s ease;
    `;
    
    message.innerHTML = `
        <div>✓ Level ${level.id} Complete!</div>
        <div style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">${level.title}</div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(message);
            
            // Return to level select after completion
            if (allLevelsCompleted()) {
                renderVictoryStats();
                showScreen('victory');
            } else {
                showScreen('level-select');
            }
        }, 500);
    }, 2000);
}

// Check if all levels completed
function allLevelsCompleted() {
    return GameState.levels.every(level => level.completed);
}

// Render victory stats
function renderVictoryStats() {
    const statsDiv = document.getElementById('victory-stats');
    if (!statsDiv) return;
    
    const completedCount = GameState.levels.filter(l => l.completed).length;
    
    statsDiv.innerHTML = `
        <h3 style="margin-bottom: 15px;">Mission Statistics</h3>
        <p style="font-size: 1.2rem;">Challenges Completed: ${completedCount}/${GameState.levels.length}</p>
        <p style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">You are truly a hero!</p>
    `;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translate(-50%, -60%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -40%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    loadGameState();
    renderLevelSelect();
});
