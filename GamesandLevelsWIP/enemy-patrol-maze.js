// Level 7: Pathfinder Challenge - Navigate through a complex pathfinding maze with enemies
/**
 * Enemy Patrol Maze
 * Canvas-based maze navigation with moving enemies
 * 
 * Game Mechanics:
 * - Canvas rendering for smooth graphics
 * - Moving enemies with patrol patterns
 * - Collision detection and reset on contact
 * - WASD or arrow key controls
 * - Attempt tracking and best time
 * 
 * Level ID: 7
 * Difficulty: Hard
 * Type: Stealth/Navigation
 */


function initEnemyPatrolMaze() {
    const container = document.getElementById('level-7');
    
    // Cleanup previous state
    if (window.level7Data) {
        if (window.level7Data.timerInterval) clearInterval(window.level7Data.timerInterval);
        if (window.level7Data.enemyInterval) clearInterval(window.level7Data.enemyInterval);
        if (window.level7Data.keyHandler) {
            document.removeEventListener('keydown', window.level7Data.keyHandler);
        }
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 7: Pathfinder Challenge</h2>
                <p>Navigate the maze while avoiding moving enemies</p>
            </div>
            
            <div class="level-narrative">
                A complex maze filled with patrolling enemies blocks your escape. 
                Find the shortest path to the exit while avoiding the red enemies. 
                One touch means starting over. Use strategy and timing to succeed!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                            <span>Time: <span id="timer7">0</span>s</span>
                            <span>Attempts: <span id="attempts7" style="color: #e74c3c;">0</span></span>
                            <span>Best: <span id="best7" style="color: #2ecc71;">--</span></span>
                        </div>
                    </div>
                    
                    <canvas id="maze-canvas7" width="700" height="700" 
                            style="border: 3px solid var(--highlight-color); border-radius: 10px; 
                                   background: rgba(0, 0, 0, 0.5); max-width: 100%; display: block; margin: 0 auto;"></canvas>
                    
                    <div id="feedback7" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px;">Controls: Arrow Keys or WASD</div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer7('up')" class="btn btn-secondary" style="padding: 8px 16px;">↑ W</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer7('left')" class="btn btn-secondary" style="padding: 8px 16px;">← A</button>
                                <button onclick="movePlayer7('down')" class="btn btn-secondary" style="padding: 8px 16px;">↓ S</button>
                                <button onclick="movePlayer7('right')" class="btn btn-secondary" style="padding: 8px 16px;">→ D</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <div style="display: flex; justify-content: space-around; font-size: 0.9rem;">
                            <div><span style="color: #3498db;">●</span> Player</div>
                            <div><span style="color: #e74c3c;">●</span> Enemy</div>
                            <div><span style="color: #2ecc71;">●</span> Exit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel7()" class="btn btn-secondary">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize maze data
    const cellSize = 35;
    const gridSize = 20;
    
    window.level7Data = {
        cellSize,
        gridSize,
        playerPos: { x: 1, y: 1 },
        exitPos: { x: 18, y: 18 },
        enemies: [
            { x: 5, y: 5, dx: 1, dy: 0 },
            { x: 10, y: 3, dx: 0, dy: 1 },
            { x: 15, y: 10, dx: -1, dy: 0 },
            { x: 8, y: 15, dx: 0, dy: -1 }
        ],
        walls: generateMazeWalls7(gridSize),
        attempts: 0,
        bestTime: null,
        startTime: Date.now(),
        timerInterval: null,
        enemyInterval: null,
        keyHandler: null
    };
    
    setupCanvas7();
    renderMaze7();
    
    // Start enemy movement
    window.level7Data.enemyInterval = setInterval(() => {
        moveEnemies7();
        checkCollision7();
    }, 300);
    
    // Start timer
    window.level7Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level7Data.startTime) / 1000);
        document.getElementById('timer7').textContent = elapsed;
    }, 1000);
    
    // Keyboard controls
    const keyHandler = (e) => {
        const key = e.key.toLowerCase();
        if (['arrowup', 'w'].includes(key)) {
            e.preventDefault();
            movePlayer7('up');
        } else if (['arrowdown', 's'].includes(key)) {
            e.preventDefault();
            movePlayer7('down');
        } else if (['arrowleft', 'a'].includes(key)) {
            e.preventDefault();
            movePlayer7('left');
        } else if (['arrowright', 'd'].includes(key)) {
            e.preventDefault();
            movePlayer7('right');
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    window.level7Data.keyHandler = keyHandler;
}

function generateMazeWalls7(size) {
    const walls = new Set();
    
    // Add border walls
    for (let i = 0; i < size; i++) {
        walls.add(`0,${i}`);
        walls.add(`${size-1},${i}`);
        walls.add(`${i},0`);
        walls.add(`${i},${size-1}`);
    }
    
    // Add interior walls in a pattern
    for (let x = 3; x < size - 3; x += 4) {
        for (let y = 2; y < size - 2; y++) {
            if (y !== 10) walls.add(`${x},${y}`);
        }
    }
    
    for (let y = 3; y < size - 3; y += 4) {
        for (let x = 2; x < size - 2; x++) {
            if (x !== 10) walls.add(`${x},${y}`);
        }
    }
    
    return walls;
}

function setupCanvas7() {
    const canvas = document.getElementById('maze-canvas7');
    const data = window.level7Data;
    canvas.width = data.cellSize * data.gridSize;
    canvas.height = data.cellSize * data.gridSize;
}

function renderMaze7() {
    const canvas = document.getElementById('maze-canvas7');
    const ctx = canvas.getContext('2d');
    const data = window.level7Data;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = '#654321';
    data.walls.forEach(wallKey => {
        const [x, y] = wallKey.split(',').map(Number);
        ctx.fillRect(x * data.cellSize, y * data.cellSize, data.cellSize, data.cellSize);
    });
    
    // Draw exit
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(
        data.exitPos.x * data.cellSize + data.cellSize / 2,
        data.exitPos.y * data.cellSize + data.cellSize / 2,
        data.cellSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Draw enemies
    ctx.fillStyle = '#e74c3c';
    data.enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(
            enemy.x * data.cellSize + data.cellSize / 2,
            enemy.y * data.cellSize + data.cellSize / 2,
            data.cellSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
    
    // Draw player
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(
        data.playerPos.x * data.cellSize + data.cellSize / 2,
        data.playerPos.y * data.cellSize + data.cellSize / 2,
        data.cellSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function movePlayer7(direction) {
    const data = window.level7Data;
    let newX = data.playerPos.x;
    let newY = data.playerPos.y;
    
    if (direction === 'up') newY--;
    else if (direction === 'down') newY++;
    else if (direction === 'left') newX--;
    else if (direction === 'right') newX++;
    
    // Check if wall
    if (data.walls.has(`${newX},${newY}`)) return;
    
    // Move player
    data.playerPos = { x: newX, y: newY };
    
    // Check if reached exit
    if (newX === data.exitPos.x && newY === data.exitPos.y) {
        clearInterval(data.timerInterval);
        clearInterval(data.enemyInterval);
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        
        if (!data.bestTime || elapsed < data.bestTime) {
            data.bestTime = elapsed;
        }
        
        document.getElementById('feedback7').innerHTML = 
            `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Exit Reached in ${elapsed}s!</span>`;
        
        setTimeout(() => completeLevel(7), 2000);
        return;
    }
    
    checkCollision7();
    renderMaze7();
}

function moveEnemies7() {
    const data = window.level7Data;
    
    data.enemies.forEach(enemy => {
        const newX = enemy.x + enemy.dx;
        const newY = enemy.y + enemy.dy;
        
        // Check if hitting wall or boundary
        if (data.walls.has(`${newX},${newY}`)) {
            // Reverse direction
            enemy.dx = -enemy.dx;
            enemy.dy = -enemy.dy;
        } else {
            enemy.x = newX;
            enemy.y = newY;
        }
    });
    
    renderMaze7();
}

function checkCollision7() {
    const data = window.level7Data;
    
    // Check if player collides with any enemy
    const collision = data.enemies.some(enemy => 
        enemy.x === data.playerPos.x && enemy.y === data.playerPos.y
    );
    
    if (collision) {
        clearInterval(data.timerInterval);
        clearInterval(data.enemyInterval);
        data.attempts++;
        document.getElementById('attempts7').textContent = data.attempts;
        document.getElementById('feedback7').innerHTML = 
            '<span style="color: #e74c3c; font-size: 1.3rem;">💥 Caught by enemy! Restarting...</span>';
        
        setTimeout(() => {
            initLevel7();
            if (data.bestTime) {
                document.getElementById('best7').textContent = `${data.bestTime}s`;
            }
        }, 1500);
    }
}

// Backward compatibility: keep old function names as aliases
function initLevel7() { initEnemyPatrolMaze(); }
