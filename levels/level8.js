// Level 8: Pathfinder Extreme - Advanced pathfinding with multiple objectives
function initLevel8() {
    const container = document.getElementById('level-8');
    
    // Cleanup previous state
    if (window.level8Data) {
        if (window.level8Data.timerInterval) clearInterval(window.level8Data.timerInterval);
        if (window.level8Data.enemyInterval) clearInterval(window.level8Data.enemyInterval);
        if (window.level8Data.keyHandler) {
            document.removeEventListener('keydown', window.level8Data.keyHandler);
        }
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 8: Pathfinder Extreme</h2>
                <p>The ultimate pathfinding challenge with checkpoints and faster enemies</p>
            </div>
            
            <div class="level-narrative">
                This is the penultimate test. Navigate through an extreme maze, 
                collect all checkpoints in order, and avoid faster, smarter enemies. 
                Only the most skilled navigators will succeed!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                            <span>Time: <span id="timer8">0</span>s</span>
                            <span>Checkpoints: <span id="checkpoints8" style="color: #f39c12;">0</span>/4</span>
                            <span>Attempts: <span id="attempts8" style="color: #e74c3c;">0</span></span>
                        </div>
                    </div>
                    
                    <canvas id="maze-canvas8" width="700" height="700" 
                            style="border: 3px solid var(--highlight-color); border-radius: 10px; 
                                   background: rgba(0, 0, 0, 0.5); max-width: 100%; display: block; margin: 0 auto;"></canvas>
                    
                    <div id="feedback8" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px;">Controls: Arrow Keys or WASD</div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer8('up')" class="btn btn-secondary" style="padding: 8px 16px;">↑ W</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer8('left')" class="btn btn-secondary" style="padding: 8px 16px;">← A</button>
                                <button onclick="movePlayer8('down')" class="btn btn-secondary" style="padding: 8px 16px;">↓ S</button>
                                <button onclick="movePlayer8('right')" class="btn btn-secondary" style="padding: 8px 16px;">→ D</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <div style="display: flex; justify-content: space-around; font-size: 0.9rem;">
                            <div><span style="color: #3498db;">●</span> Player</div>
                            <div><span style="color: #e74c3c;">●</span> Enemy</div>
                            <div><span style="color: #f39c12;">★</span> Checkpoint</div>
                            <div><span style="color: #2ecc71;">★</span> Exit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel8()" class="btn btn-secondary">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize maze data
    const cellSize = 35;
    const gridSize = 20;
    
    window.level8Data = {
        cellSize,
        gridSize,
        playerPos: { x: 1, y: 1 },
        exitPos: { x: 18, y: 18 },
        checkpoints: [
            { x: 5, y: 5, collected: false },
            { x: 15, y: 5, collected: false },
            { x: 5, y: 15, collected: false },
            { x: 10, y: 10, collected: false }
        ],
        enemies: [
            { x: 8, y: 3, dx: 1, dy: 0 },
            { x: 12, y: 8, dx: 0, dy: 1 },
            { x: 16, y: 12, dx: -1, dy: 0 },
            { x: 4, y: 16, dx: 0, dy: -1 },
            { x: 10, y: 5, dx: 1, dy: 1 },
            { x: 6, y: 12, dx: -1, dy: 1 }
        ],
        walls: generateMazeWalls8(gridSize),
        attempts: 0,
        checkpointsCollected: 0,
        startTime: Date.now(),
        timerInterval: null,
        enemyInterval: null,
        keyHandler: null
    };
    
    setupCanvas8();
    renderMaze8();
    
    // Start enemy movement (faster than level 7)
    window.level8Data.enemyInterval = setInterval(() => {
        moveEnemies8();
        checkCollision8();
    }, 200);
    
    // Start timer
    window.level8Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level8Data.startTime) / 1000);
        document.getElementById('timer8').textContent = elapsed;
    }, 1000);
    
    // Keyboard controls
    const keyHandler = (e) => {
        const key = e.key.toLowerCase();
        if (['arrowup', 'w'].includes(key)) {
            e.preventDefault();
            movePlayer8('up');
        } else if (['arrowdown', 's'].includes(key)) {
            e.preventDefault();
            movePlayer8('down');
        } else if (['arrowleft', 'a'].includes(key)) {
            e.preventDefault();
            movePlayer8('left');
        } else if (['arrowright', 'd'].includes(key)) {
            e.preventDefault();
            movePlayer8('right');
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    window.level8Data.keyHandler = keyHandler;
}

function generateMazeWalls8(size) {
    const walls = new Set();
    
    // Add border walls
    for (let i = 0; i < size; i++) {
        walls.add(`0,${i}`);
        walls.add(`${size-1},${i}`);
        walls.add(`${i},0`);
        walls.add(`${i},${size-1}`);
    }
    
    // Add more complex interior walls
    for (let x = 2; x < size - 2; x += 3) {
        for (let y = 1; y < size - 1; y++) {
            if ((y % 5) !== 2) walls.add(`${x},${y}`);
        }
    }
    
    for (let y = 2; y < size - 2; y += 3) {
        for (let x = 1; x < size - 1; x++) {
            if ((x % 5) !== 3) walls.add(`${x},${y}`);
        }
    }
    
    return walls;
}

function setupCanvas8() {
    const canvas = document.getElementById('maze-canvas8');
    const data = window.level8Data;
    canvas.width = data.cellSize * data.gridSize;
    canvas.height = data.cellSize * data.gridSize;
}

function renderMaze8() {
    const canvas = document.getElementById('maze-canvas8');
    const ctx = canvas.getContext('2d');
    const data = window.level8Data;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = '#654321';
    data.walls.forEach(wallKey => {
        const [x, y] = wallKey.split(',').map(Number);
        ctx.fillRect(x * data.cellSize, y * data.cellSize, data.cellSize, data.cellSize);
    });
    
    // Draw checkpoints
    data.checkpoints.forEach((cp, index) => {
        if (!cp.collected) {
            ctx.fillStyle = '#f39c12';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                '★',
                cp.x * data.cellSize + data.cellSize / 2,
                cp.y * data.cellSize + data.cellSize / 2
            );
        }
    });
    
    // Draw exit
    const allCheckpointsCollected = data.checkpoints.every(cp => cp.collected);
    ctx.fillStyle = allCheckpointsCollected ? '#2ecc71' : '#e74c3c';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
        '★',
        data.exitPos.x * data.cellSize + data.cellSize / 2,
        data.exitPos.y * data.cellSize + data.cellSize / 2
    );
    
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

function movePlayer8(direction) {
    const data = window.level8Data;
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
    
    // Check if collected a checkpoint
    data.checkpoints.forEach((cp, index) => {
        if (!cp.collected && cp.x === newX && cp.y === newY) {
            cp.collected = true;
            data.checkpointsCollected++;
            document.getElementById('checkpoints8').textContent = data.checkpointsCollected;
            document.getElementById('feedback8').innerHTML = 
                `<span style="color: #f39c12;">★ Checkpoint ${data.checkpointsCollected}/4 collected!</span>`;
            setTimeout(() => document.getElementById('feedback8').innerHTML = '', 1500);
        }
    });
    
    // Check if reached exit
    if (newX === data.exitPos.x && newY === data.exitPos.y) {
        const allCheckpointsCollected = data.checkpoints.every(cp => cp.collected);
        
        if (allCheckpointsCollected) {
            clearInterval(data.timerInterval);
            clearInterval(data.enemyInterval);
            const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
            
            document.getElementById('feedback8').innerHTML = 
                `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Level Complete in ${elapsed}s with ${data.attempts} attempts!</span>`;
            
            setTimeout(() => completeLevel(8), 2000);
        } else {
            document.getElementById('feedback8').innerHTML = 
                `<span style="color: #e74c3c;">Collect all checkpoints first! (${data.checkpointsCollected}/4)</span>`;
            setTimeout(() => document.getElementById('feedback8').innerHTML = '', 2000);
        }
        return;
    }
    
    checkCollision8();
    renderMaze8();
}

function moveEnemies8() {
    const data = window.level8Data;
    
    data.enemies.forEach(enemy => {
        const newX = enemy.x + enemy.dx;
        const newY = enemy.y + enemy.dy;
        
        // Check if hitting wall or boundary
        if (data.walls.has(`${newX},${newY}`)) {
            // Try to turn randomly
            const directions = [
                { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
            ];
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            
            if (!data.walls.has(`${enemy.x + randomDir.dx},${enemy.y + randomDir.dy}`)) {
                enemy.dx = randomDir.dx;
                enemy.dy = randomDir.dy;
                enemy.x += enemy.dx;
                enemy.y += enemy.dy;
            } else {
                // Reverse direction
                enemy.dx = -enemy.dx;
                enemy.dy = -enemy.dy;
            }
        } else {
            enemy.x = newX;
            enemy.y = newY;
        }
    });
    
    renderMaze8();
}

function checkCollision8() {
    const data = window.level8Data;
    
    // Check if player collides with any enemy
    const collision = data.enemies.some(enemy => 
        enemy.x === data.playerPos.x && enemy.y === data.playerPos.y
    );
    
    if (collision) {
        clearInterval(data.timerInterval);
        clearInterval(data.enemyInterval);
        data.attempts++;
        document.getElementById('attempts8').textContent = data.attempts;
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #e74c3c; font-size: 1.3rem;">💥 Caught by enemy! Restarting...</span>';
        
        setTimeout(() => initLevel8(), 1500);
    }
}
