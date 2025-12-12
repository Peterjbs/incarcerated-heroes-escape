/**
 * Level Generator System
 * Dynamically generates 36 unique level variants from 10 base minigame types
 * 
 * Features:
 * - Seeded random generation for reproducibility
 * - Level codes for identification and debugging
 * - Deterministic theme assignment
 * - Max 2 instances per base game type/config
 * - All game types appear at least once
 */

// Seeded random number generator for reproducibility
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    
    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}

// Theme configurations for visual variety
const THEMES = [
    {
        id: 'midnight',
        name: 'Midnight Steel',
        primary: '#0a0e27',
        secondary: '#1a1f3a',
        accent: '#2d3561',
        highlight: '#5b7fb8',
        success: '#4a9d8f',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)'
    },
    {
        id: 'crimson',
        name: 'Crimson Dawn',
        primary: '#2d0a0e',
        secondary: '#4a1319',
        accent: '#6b1f2a',
        highlight: '#e94560',
        success: '#2ecc71',
        background: 'linear-gradient(135deg, #2d0a0e 0%, #4a1319 100%)'
    },
    {
        id: 'emerald',
        name: 'Emerald Depths',
        primary: '#0a2d1e',
        secondary: '#133d2c',
        accent: '#1e563f',
        highlight: '#3fbb8f',
        success: '#2ecc71',
        background: 'linear-gradient(135deg, #0a2d1e 0%, #133d2c 100%)'
    },
    {
        id: 'amber',
        name: 'Amber Twilight',
        primary: '#2d1f0a',
        secondary: '#4a3313',
        accent: '#6b4b1f',
        highlight: '#f39c12',
        success: '#27ae60',
        background: 'linear-gradient(135deg, #2d1f0a 0%, #4a3313 100%)'
    },
    {
        id: 'violet',
        name: 'Violet Haze',
        primary: '#1a0a2d',
        secondary: '#2a1342',
        accent: '#3d1f5b',
        highlight: '#9b59b6',
        success: '#1abc9c',
        background: 'linear-gradient(135deg, #1a0a2d 0%, #2a1342 100%)'
    },
    {
        id: 'ocean',
        name: 'Ocean Deep',
        primary: '#0a1a2d',
        secondary: '#132a42',
        accent: '#1f3d5b',
        highlight: '#3498db',
        success: '#16a085',
        background: 'linear-gradient(135deg, #0a1a2d 0%, #132a42 100%)'
    },
    {
        id: 'slate',
        name: 'Slate Shadow',
        primary: '#1a1a1a',
        secondary: '#2a2a2a',
        accent: '#3d3d3d',
        highlight: '#95a5a6',
        success: '#27ae60',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
    },
    {
        id: 'rust',
        name: 'Rust Forge',
        primary: '#2d1a0a',
        secondary: '#42271e',
        accent: '#5b3a2a',
        highlight: '#d35400',
        success: '#27ae60',
        background: 'linear-gradient(135deg, #2d1a0a 0%, #42271e 100%)'
    },
    {
        id: 'teal',
        name: 'Teal Frost',
        primary: '#0a2d2d',
        secondary: '#134242',
        accent: '#1f5b5b',
        highlight: '#1abc9c',
        success: '#2ecc71',
        background: 'linear-gradient(135deg, #0a2d2d 0%, #134242 100%)'
    },
    {
        id: 'indigo',
        name: 'Indigo Night',
        primary: '#0f0a2d',
        secondary: '#1a1342',
        accent: '#2a1f5b',
        highlight: '#6c5ce7',
        success: '#00b894',
        background: 'linear-gradient(135deg, #0f0a2d 0%, #1a1342 100%)'
    }
];

// Base game type definitions with variant configurations
const BASE_GAMES = [
    {
        id: 'code-breaker-4',
        name: '4-Digit Code Breaker',
        type: 'logic',
        difficulty: 'easy',
        initFunction: 'initCodeBreaker4Digit',
        scriptPath: 'GamesandLevelsWIP/4-digit-code-breaker.js',
        maxVariants: 4,
        variantConfigs: [
            { digits: 4, attempts: 10, allowRepeats: true },
            { digits: 4, attempts: 8, allowRepeats: true },
            { digits: 4, attempts: 10, allowRepeats: false },
            { digits: 4, attempts: 12, allowRepeats: true }
        ]
    },
    {
        id: 'anagram-2word',
        name: '2-Word Anagram Solver',
        type: 'word',
        difficulty: 'easy-medium',
        initFunction: 'initAnagramSolver2Word',
        scriptPath: 'GamesandLevelsWIP/2-word-anagram-solver.js',
        maxVariants: 4,
        variantConfigs: [
            { wordSet: 1, minSolve: 2 },
            { wordSet: 2, minSolve: 2 },
            { wordSet: 3, minSolve: 3 },
            { wordSet: 4, minSolve: 2 }
        ]
    },
    {
        id: 'magic-square',
        name: 'Magic Square 9-Grid',
        type: 'math',
        difficulty: 'medium',
        initFunction: 'initMagicSquare9Grid',
        scriptPath: 'GamesandLevelsWIP/magic-square-9-grid.js',
        maxVariants: 4,
        variantConfigs: [
            { gridSize: 3, targetSum: 15, prefilled: 0 },
            { gridSize: 3, targetSum: 15, prefilled: 1 },
            { gridSize: 3, targetSum: 15, prefilled: 2 },
            { gridSize: 3, targetSum: 15, prefilled: 3 }
        ]
    },
    {
        id: 'code-breaker-6',
        name: '6-Digit Timed Code Breaker',
        type: 'logic',
        difficulty: 'medium-hard',
        initFunction: 'initCodeBreaker6DigitTimed',
        scriptPath: 'GamesandLevelsWIP/6-digit-timed-code-breaker.js',
        maxVariants: 4,
        variantConfigs: [
            { digits: 6, timeLimit: 180, attempts: 12 },
            { digits: 6, timeLimit: 150, attempts: 10 },
            { digits: 6, timeLimit: 200, attempts: 14 },
            { digits: 6, timeLimit: 120, attempts: 10 }
        ]
    },
    {
        id: 'sliding-tile',
        name: 'Sliding Tile 15-Puzzle',
        type: 'spatial',
        difficulty: 'medium',
        initFunction: 'initSlidingTile15Puzzle',
        scriptPath: 'GamesandLevelsWIP/sliding-tile-15-puzzle.js',
        maxVariants: 4,
        variantConfigs: [
            { gridSize: 4, shuffleMoves: 50 },
            { gridSize: 4, shuffleMoves: 80 },
            { gridSize: 4, shuffleMoves: 100 },
            { gridSize: 4, shuffleMoves: 120 }
        ]
    },
    {
        id: 'key-collection',
        name: 'Key Collection Map Nav',
        type: 'navigation',
        difficulty: 'easy-medium',
        initFunction: 'initKeyCollectionMapNav',
        scriptPath: 'GamesandLevelsWIP/key-collection-map-nav.js',
        maxVariants: 4,
        variantConfigs: [
            { mapSize: 10, keyCount: 3, obstacleCount: 15 },
            { mapSize: 10, keyCount: 4, obstacleCount: 18 },
            { mapSize: 12, keyCount: 3, obstacleCount: 20 },
            { mapSize: 10, keyCount: 3, obstacleCount: 12 }
        ]
    },
    {
        id: 'enemy-patrol',
        name: 'Enemy Patrol Maze',
        type: 'stealth',
        difficulty: 'hard',
        initFunction: 'initEnemyPatrolMaze',
        scriptPath: 'GamesandLevelsWIP/enemy-patrol-maze.js',
        maxVariants: 4,
        variantConfigs: [
            { enemyCount: 3, enemySpeed: 1.0, mazeComplexity: 1 },
            { enemyCount: 4, enemySpeed: 1.2, mazeComplexity: 1 },
            { enemyCount: 3, enemySpeed: 1.5, mazeComplexity: 2 },
            { enemyCount: 5, enemySpeed: 1.0, mazeComplexity: 1 }
        ]
    },
    {
        id: 'checkpoint-maze',
        name: 'Checkpoint Extreme Maze',
        type: 'navigation',
        difficulty: 'very-hard',
        initFunction: 'initCheckpointExtremeMaze',
        scriptPath: 'GamesandLevelsWIP/checkpoint-extreme-maze.js',
        maxVariants: 4,
        variantConfigs: [
            { checkpoints: 4, enemyCount: 4, enemySpeed: 1.5 },
            { checkpoints: 5, enemyCount: 3, enemySpeed: 1.8 },
            { checkpoints: 4, enemyCount: 5, enemySpeed: 1.3 },
            { checkpoints: 6, enemyCount: 4, enemySpeed: 1.5 }
        ]
    },
    {
        id: 'gate-control',
        name: 'Gate Control Strategy',
        type: 'strategy',
        difficulty: 'very-hard',
        initFunction: 'initGateControlStrategyMaze',
        scriptPath: 'GamesandLevelsWIP/gate-control-strategy-maze.js',
        maxVariants: 4,
        variantConfigs: [
            { gateCount: 6, npcCount: 3, enemyCount: 4 },
            { gateCount: 8, npcCount: 2, enemyCount: 5 },
            { gateCount: 7, npcCount: 4, enemyCount: 3 },
            { gateCount: 6, npcCount: 3, enemyCount: 6 }
        ]
    },
    {
        id: 'jigsaw-wordgrid',
        name: 'Jigsaw Word Grid 5×5',
        type: 'word',
        difficulty: 'hard',
        initFunction: 'initJigsawWordGrid5x5',
        scriptPath: 'GamesandLevelsWIP/jigsaw-word-grid-5x5.js',
        maxVariants: 4,
        variantConfigs: [
            { puzzleSet: 1, prefilledCount: 4 },
            { puzzleSet: 2, prefilledCount: 5 },
            { puzzleSet: 3, prefilledCount: 3 },
            { puzzleSet: 4, prefilledCount: 4 }
        ]
    }
];

/**
 * Generate 36 unique level configurations
 * Ensures:
 * - All 10 game types appear at least once
 * - No game type/config combination appears more than twice
 * - Deterministic based on seed
 */
function generate36Levels(seed = 42) {
    const rng = new SeededRandom(seed);
    const levels = [];
    const usageCount = {}; // Track usage per game type
    
    // Phase 1: Ensure each base game appears at least once
    BASE_GAMES.forEach((game, index) => {
        const variantIndex = 0; // Use first variant for initial coverage
        const levelCode = generateLevelCode(game.id, variantIndex, levels.length, seed);
        
        levels.push({
            id: levels.length + 1,
            code: levelCode,
            baseGameId: game.id,
            baseGameName: game.name,
            gameType: game.type,
            difficulty: game.difficulty,
            variantIndex: variantIndex,
            variantConfig: game.variantConfigs[variantIndex],
            initFunction: game.initFunction,
            scriptPath: game.scriptPath,
            themeId: THEMES[levels.length % THEMES.length].id,
            seed: seed + levels.length
        });
        
        const key = `${game.id}-${variantIndex}`;
        usageCount[key] = 1;
    });
    
    // Phase 2: Fill remaining slots (36 - 10 = 26) with variants
    while (levels.length < 36) {
        // Select random game
        const game = BASE_GAMES[rng.nextInt(0, BASE_GAMES.length - 1)];
        
        // Select random variant
        const variantIndex = rng.nextInt(0, game.variantConfigs.length - 1);
        const key = `${game.id}-${variantIndex}`;
        
        // Check if we can use this combination (max 2 times)
        const currentUsage = usageCount[key] || 0;
        if (currentUsage >= 2) {
            continue; // Skip this combination, try another
        }
        
        const levelCode = generateLevelCode(game.id, variantIndex, levels.length, seed);
        
        levels.push({
            id: levels.length + 1,
            code: levelCode,
            baseGameId: game.id,
            baseGameName: game.name,
            gameType: game.type,
            difficulty: game.difficulty,
            variantIndex: variantIndex,
            variantConfig: game.variantConfigs[variantIndex],
            initFunction: game.initFunction,
            scriptPath: game.scriptPath,
            themeId: THEMES[levels.length % THEMES.length].id,
            seed: seed + levels.length
        });
        
        usageCount[key] = currentUsage + 1;
    }
    
    return levels;
}

/**
 * Generate a unique level code for identification
 * Format: GAME-VAR-SLOT-SEED
 * Example: CB4-V0-S00-42 = CodeBreaker4, Variant 0, Slot 0, Seed 42
 */
function generateLevelCode(gameId, variantIndex, slotIndex, seed) {
    const gameCode = {
        'code-breaker-4': 'CB4',
        'anagram-2word': 'AN2',
        'magic-square': 'MS9',
        'code-breaker-6': 'CB6',
        'sliding-tile': 'ST15',
        'key-collection': 'KCM',
        'enemy-patrol': 'EPM',
        'checkpoint-maze': 'CEM',
        'gate-control': 'GCS',
        'jigsaw-wordgrid': 'JWG'
    }[gameId] || 'UNK';
    
    const slotStr = String(slotIndex).padStart(2, '0');
    return `${gameCode}-V${variantIndex}-S${slotStr}-${seed}`;
}

/**
 * Parse a level code back into its components
 */
function parseLevelCode(code) {
    const parts = code.split('-');
    if (parts.length !== 4) return null;
    
    const [gameCode, varPart, slotPart, seedPart] = parts;
    
    return {
        gameCode,
        variantIndex: parseInt(varPart.substring(1)),
        slotIndex: parseInt(slotPart.substring(1)),
        seed: parseInt(seedPart)
    };
}

/**
 * Get theme for a level based on theme ID
 */
function getTheme(themeId) {
    return THEMES.find(t => t.id === themeId) || THEMES[0];
}

/**
 * Apply theme to a container element
 */
function applyTheme(containerId, themeId) {
    const theme = getTheme(themeId);
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    // Create theme style element if it doesn't exist
    let styleId = `theme-${containerId}`;
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    
    // Apply theme CSS
    styleEl.textContent = `
        #${containerId} {
            --primary-color: ${theme.primary};
            --secondary-color: ${theme.secondary};
            --accent-color: ${theme.accent};
            --highlight-color: ${theme.highlight};
            --success-color: ${theme.success};
        }
        
        #${containerId} .level-container,
        #${containerId} .puzzle-container {
            background: ${theme.background};
        }
        
        #${containerId} .level-header h2,
        #${containerId} .btn-primary {
            color: ${theme.highlight};
        }
    `;
}

// Export for use in game.js
window.LevelGenerator = {
    generate36Levels,
    generateLevelCode,
    parseLevelCode,
    getTheme,
    applyTheme,
    BASE_GAMES,
    THEMES
};
