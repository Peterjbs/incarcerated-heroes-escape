// Game State Management
const GameState = {
    levels: [], // Will be populated dynamically from level generator
    currentLevel: null,
    generatedLevels: null // Cache for generated levels
};

// Initialize 36 dynamic levels
function initializeLevels() {
    // Generate or retrieve cached levels
    if (!GameState.generatedLevels) {
        const seed = 42; // Fixed seed for consistent generation
        GameState.generatedLevels = window.LevelGenerator.generate36Levels(seed);
    }
    
    // Convert generated levels to GameState format
    GameState.levels = GameState.generatedLevels.map((genLevel, index) => ({
        id: genLevel.id,
        code: genLevel.code,
        title: genLevel.baseGameName,
        description: `${genLevel.gameType} challenge - ${genLevel.difficulty}`,
        completed: false,
        unlocked: true, // All levels unlocked per requirements
        baseGameId: genLevel.baseGameId,
        variantIndex: genLevel.variantIndex,
        variantConfig: genLevel.variantConfig,
        initFunction: genLevel.initFunction,
        themeId: genLevel.themeId,
        seed: genLevel.seed,
        slotIndex: index
    }));
}

// Load game state from localStorage
function loadGameState() {
    // Initialize levels first
    initializeLevels();
    
    const saved = localStorage.getItem('gameState');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            // Merge saved completion/unlock state with generated levels
            if (savedState.levels && savedState.levels.length === GameState.levels.length) {
                savedState.levels.forEach((savedLevel, index) => {
                    if (GameState.levels[index]) {
                        GameState.levels[index].completed = savedLevel.completed || false;
                        // Keep all unlocked per requirements
                        GameState.levels[index].unlocked = true;
                    }
                });
            }
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
        GameState.levels.forEach((level) => {
            level.completed = false;
            level.unlocked = true; // All levels remain unlocked
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

// Render level select grid (6x6 = 36 levels)
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
        
        // Apply theme colors as data attribute for styling
        card.setAttribute('data-theme', level.themeId);
        
        const status = level.completed ? '✓' : (level.unlocked ? '○' : '🔒');
        const theme = window.LevelGenerator.getTheme(level.themeId);
        
        card.innerHTML = `
            <div class="level-status">${status}</div>
            <div class="level-number">Level ${level.id}</div>
            <div class="level-code" style="font-size: 0.7rem; opacity: 0.7; margin-top: 5px;">${level.code}</div>
            <div class="level-title">${level.title}</div>
            <div class="level-description">${level.description}</div>
        `;
        
        // Apply theme accent color to card
        card.style.borderLeft = `4px solid ${theme.highlight}`;
        
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
    
    // Get the container for this level
    const container = document.getElementById(`level-${levelId}`);
    if (!container) {
        console.error(`Level container not found: level-${levelId}`);
        return;
    }
    
    // Store level config and theme in window for access by init functions
    window.currentLevelConfig = {
        id: level.id,
        code: level.code,
        variantConfig: level.variantConfig,
        seed: level.seed,
        themeId: level.themeId,
        slotIndex: level.slotIndex
    };
    
    // Apply theme to the level container
    window.LevelGenerator.applyTheme(`level-${levelId}`, level.themeId);
    
    // Initialize the level using the init function from the base game
    const levelInitFunction = window[level.initFunction];
    if (typeof levelInitFunction === 'function') {
        // Pass the level container ID to the init function
        // The init functions will need to be updated to use this ID
        levelInitFunction(levelId);
    } else {
        console.error(`Init function not found: ${level.initFunction}`);
        // Fallback to old level function if available
        const fallbackFunction = window[`initLevel${levelId}`];
        if (typeof fallbackFunction === 'function') {
            fallbackFunction();
        }
    }
    
    showScreen(`level-${levelId}`);
}

// Complete a level
function completeLevel(levelId) {
    const level = GameState.levels.find(l => l.id === levelId);
    if (!level) return;
    
    level.completed = true;
    
    // All levels remain unlocked per requirements
    
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
