// Level 6: Map Navigation - Find the path through a grid-based map
/**
 * Key Collection Map Navigation
 * Grid-based navigation with key collection objectives
 * 
 * Game Mechanics:
 * - 10x10 grid map with player movement
 * - Collect 3 keys scattered across the map
 * - Navigate around obstacles (walls)
 * - Keyboard (arrow keys) or button controls
 * - Move counter and time tracking
 * 
 * Level ID: 6
 * Difficulty: Easy-Medium
 * Type: Navigation/Collection
 */


function initKeyCollectionMapNav() {
    const container = document.getElementById('level-6');
    
    // Cleanup previous state
    if (window.level6Data && window.level6Data.keyHandler) {
        document.removeEventListener('keydown', window.level6Data.keyHandler);
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 6: Map Navigation</h2>
                <p>Navigate through the treacherous map to reach the exit</p>
            </div>
            
            <div class="level-narrative">
                A perilous map lies before you. Navigate through the terrain, 
                avoiding obstacles and finding the optimal path to the exit. 
                Collect all the keys to unlock the final gate!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                            <span>Moves: <span id="moves6" style="color: #f39c12;">0</span></span>
                            <span>Keys: <span id="keys6" style="color: #2ecc71;">0</span>/3</span>
                            <span>Time: <span id="timer6">0</span>s</span>
                        </div>
                    </div>
                    
                    <div id="map-grid" style="display: inline-grid; grid-template-columns: repeat(10, 50px); grid-template-rows: repeat(10, 50px); gap: 2px; padding: 15px; background: rgba(0, 0, 0, 0.4); border-radius: 10px; border: 3px solid var(--highlight-color); margin: 20px 0;">
                        <!-- Map cells will be generated here -->
                    </div>
                    
                    <div id="feedback6" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px;">Controls: Arrow Keys or Click</div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer6('up')" class="btn btn-secondary" style="padding: 8px 16px;">↑</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer6('left')" class="btn btn-secondary" style="padding: 8px 16px;">←</button>
                                <button onclick="movePlayer6('down')" class="btn btn-secondary" style="padding: 8px 16px;">↓</button>
                                <button onclick="movePlayer6('right')" class="btn btn-secondary" style="padding: 8px 16px;">→</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <div style="display: flex; justify-content: space-around; font-size: 0.9rem;">
                            <div><span style="font-size: 1.3rem;">🟦</span> Player</div>
                            <div><span style="font-size: 1.3rem;">🟫</span> Wall</div>
                            <div><span style="font-size: 1.3rem;">🔑</span> Key</div>
                            <div><span style="font-size: 1.3rem;">🚪</span> Exit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel6()" class="btn btn-secondary">Reset Map</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add styles
    if (!document.getElementById('level6-styles')) {
        const style = document.createElement('style');
        style.id = 'level6-styles';
        style.textContent = `
        .map-cell {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .map-cell.path {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .map-cell.wall {
            background: rgba(101, 67, 33, 0.6);
            border: 1px solid rgba(101, 67, 33, 0.8);
        }
        
        .map-cell.player {
            background: rgba(52, 152, 219, 0.6);
            border: 2px solid #3498db;
            box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
        }
        
        .map-cell.key {
            background: rgba(241, 196, 15, 0.3);
            border: 1px solid rgba(241, 196, 15, 0.5);
        }
        
        .map-cell.exit {
            background: rgba(46, 204, 113, 0.3);
            border: 2px solid #2ecc71;
            box-shadow: 0 0 15px rgba(46, 204, 113, 0.4);
        }
        
        .map-cell.exit.locked {
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
            box-shadow: 0 0 15px rgba(231, 76, 60, 0.4);
        }
    `;
        document.head.appendChild(style);
    }
    
    // Initialize level data
    window.level6Data = {
        playerPos: { row: 0, col: 0 },
        keysCollected: 0,
        totalKeys: 3,
        moves: 0,
        startTime: Date.now(),
        timerInterval: null,
        map: generateMap6()
    };
    
    renderMap6();
    
    // Keyboard controls
    const keyHandler = (e) => {
        const key = e.key;
        if (key === 'ArrowUp' || key === 'w' || key === 'W') {
            e.preventDefault();
            movePlayer6('up');
        } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
            e.preventDefault();
            movePlayer6('down');
        } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
            e.preventDefault();
            movePlayer6('left');
        } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
            e.preventDefault();
            movePlayer6('right');
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    window.level6Data.keyHandler = keyHandler;
    
    // Start timer
    window.level6Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level6Data.startTime) / 1000);
        document.getElementById('timer6').textContent = elapsed;
    }, 1000);
}

function generateMap6() {
    // 0 = path, 1 = wall, 2 = key, 3 = exit
    const map = [
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 2, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 2, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 0, 0, 3]
    ];
    return map;
}

function renderMap6() {
    const data = window.level6Data;
    const gridDiv = document.getElementById('map-grid');
    gridDiv.innerHTML = '';
    
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'map-cell';
            
            // Check if player is at this position
            if (row === data.playerPos.row && col === data.playerPos.col) {
                cell.classList.add('player');
                cell.textContent = '🟦';
            } else {
                const cellType = data.map[row][col];
                if (cellType === 1) {
                    cell.classList.add('wall');
                    cell.textContent = '🟫';
                } else if (cellType === 2) {
                    cell.classList.add('key');
                    cell.textContent = '🔑';
                } else if (cellType === 3) {
                    cell.classList.add('exit');
                    if (data.keysCollected < data.totalKeys) {
                        cell.classList.add('locked');
                        cell.textContent = '🔒';
                    } else {
                        cell.textContent = '🚪';
                    }
                } else {
                    cell.classList.add('path');
                }
            }
            
            gridDiv.appendChild(cell);
        }
    }
    
    document.getElementById('moves6').textContent = data.moves;
    document.getElementById('keys6').textContent = data.keysCollected;
}

function movePlayer6(direction) {
    const data = window.level6Data;
    let newRow = data.playerPos.row;
    let newCol = data.playerPos.col;
    
    if (direction === 'up') newRow--;
    else if (direction === 'down') newRow++;
    else if (direction === 'left') newCol--;
    else if (direction === 'right') newCol++;
    
    // Check bounds
    if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10) return;
    
    // Check if wall
    if (data.map[newRow][newCol] === 1) {
        document.getElementById('feedback6').innerHTML = 
            '<span style="color: #e74c3c;">Cannot move through walls!</span>';
        setTimeout(() => document.getElementById('feedback6').innerHTML = '', 1500);
        return;
    }
    
    // Move player
    data.playerPos = { row: newRow, col: newCol };
    data.moves++;
    
    // Check if key collected
    if (data.map[newRow][newCol] === 2) {
        data.keysCollected++;
        data.map[newRow][newCol] = 0; // Remove key
        document.getElementById('feedback6').innerHTML = 
            '<span style="color: #2ecc71;">🔑 Key collected!</span>';
        setTimeout(() => document.getElementById('feedback6').innerHTML = '', 1500);
    }
    
    // Check if reached exit
    if (data.map[newRow][newCol] === 3) {
        if (data.keysCollected >= data.totalKeys) {
            clearInterval(data.timerInterval);
            const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
            document.getElementById('feedback6').innerHTML = 
                `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Exit Reached! Completed in ${data.moves} moves and ${elapsed}s!</span>`;
            setTimeout(() => completeLevel(6), 2000);
        } else {
            document.getElementById('feedback6').innerHTML = 
                `<span style="color: #f39c12;">🔒 Exit is locked! Collect all ${data.totalKeys} keys first!</span>`;
            setTimeout(() => document.getElementById('feedback6').innerHTML = '', 2000);
        }
    }
    
    renderMap6();
}

// Backward compatibility: keep old function names as aliases
function initLevel6() { initKeyCollectionMapNav(); }
