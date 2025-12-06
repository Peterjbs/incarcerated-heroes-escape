// Level 9: Gate Master Maze - Lock and unlock gates to guide and trap
function initLevel9() {
    const container = document.getElementById('level-9');
    
    // Cleanup previous state
    if (window.level9Data) {
        if (window.level9Data.timerInterval) clearInterval(window.level9Data.timerInterval);
        if (window.level9Data.enemyInterval) clearInterval(window.level9Data.enemyInterval);
        if (window.level9Data.keyHandler) {
            document.removeEventListener('keydown', window.level9Data.keyHandler);
        }
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 9: Gate Master Maze</h2>
                <p>Control gates to create paths and trap enemies - the final escape!</p>
            </div>
            
            <div class="level-narrative">
                This is it - the final challenge before freedom! Master the gate control system 
                to create safe passages while trapping enemies. Guide your comrades (green dots) 
                to the exit while avoiding or trapping enemies (red dots). 
                Lock and unlock gates strategically to succeed!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                            <span>Time: <span id="timer9">0</span>s</span>
                            <span>Comrades: <span id="comrades9" style="color: #2ecc71;">0</span>/3</span>
                            <span>Moves: <span id="moves9">0</span></span>
                        </div>
                    </div>
                    
                    <canvas id="maze-canvas9" width="700" height="700" 
                            style="border: 3px solid var(--highlight-color); border-radius: 10px; 
                                   background: rgba(0, 0, 0, 0.5); max-width: 100%; display: block; margin: 0 auto;"></canvas>
                    
                    <div id="feedback9" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px; font-weight: bold; color: #f39c12;">
                            Click on gates (yellow bars) to toggle them open/closed
                        </div>
                        <div style="margin-bottom: 10px;">Player Controls: Arrow Keys or WASD</div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer9('up')" class="btn btn-secondary" style="padding: 8px 16px;">↑ W</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer9('left')" class="btn btn-secondary" style="padding: 8px 16px;">← A</button>
                                <button onclick="movePlayer9('down')" class="btn btn-secondary" style="padding: 8px 16px;">↓ S</button>
                                <button onclick="movePlayer9('right')" class="btn btn-secondary" style="padding: 8px 16px;">→ D</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 600px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.9rem;">
                            <div><span style="color: #3498db;">●</span> You</div>
                            <div><span style="color: #2ecc71;">●</span> Comrades</div>
                            <div><span style="color: #e74c3c;">●</span> Enemies</div>
                            <div><span style="color: #f39c12;">▬</span> Gate (click)</div>
                            <div><span style="color: #95a5a6;">▬</span> Locked Gate</div>
                            <div><span style="color: #9b59b6;">★</span> Exit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel9()" class="btn btn-secondary">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize maze data
    const cellSize = 35;
    const gridSize = 20;
    
    window.level9Data = {
        cellSize,
        gridSize,
        playerPos: { x: 1, y: 1 },
        exitPos: { x: 18, y: 18 },
        comrades: [
            { x: 3, y: 3, rescued: false },
            { x: 10, y: 10, rescued: false },
            { x: 16, y: 8, rescued: false }
        ],
        enemies: [
            { x: 7, y: 5, dx: 1, dy: 0, trapped: false },
            { x: 13, y: 10, dx: 0, dy: 1, trapped: false },
            { x: 5, y: 15, dx: -1, dy: 0, trapped: false }
        ],
        gates: [
            { x: 5, y: 7, orientation: 'horizontal', open: true },
            { x: 10, y: 5, orientation: 'vertical', open: true },
            { x: 15, y: 12, orientation: 'horizontal', open: false },
            { x: 8, y: 15, orientation: 'vertical', open: true },
            { x: 12, y: 8, orientation: 'horizontal', open: false }
        ],
        walls: generateMazeWalls9(gridSize),
        comradesRescued: 0,
        moves: 0,
        startTime: Date.now(),
        timerInterval: null,
        enemyInterval: null,
        keyHandler: null
    };
    
    setupCanvas9();
    renderMaze9();
    
    // Canvas click handler for gates
    const canvas = document.getElementById('maze-canvas9');
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / window.level9Data.cellSize);
        const y = Math.floor((e.clientY - rect.top) / window.level9Data.cellSize);
        toggleGate9(x, y);
    });
    
    // Start enemy movement
    window.level9Data.enemyInterval = setInterval(() => {
        moveEnemies9();
        moveComrades9();
        checkCollision9();
    }, 400);
    
    // Start timer
    window.level9Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level9Data.startTime) / 1000);
        document.getElementById('timer9').textContent = elapsed;
    }, 1000);
    
    // Keyboard controls
    const keyHandler = (e) => {
        const key = e.key.toLowerCase();
        if (['arrowup', 'w'].includes(key)) {
            e.preventDefault();
            movePlayer9('up');
        } else if (['arrowdown', 's'].includes(key)) {
            e.preventDefault();
            movePlayer9('down');
        } else if (['arrowleft', 'a'].includes(key)) {
            e.preventDefault();
            movePlayer9('left');
        } else if (['arrowright', 'd'].includes(key)) {
            e.preventDefault();
            movePlayer9('right');
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    window.level9Data.keyHandler = keyHandler;
}

function generateMazeWalls9(size) {
    const walls = new Set();
    
    // Add border walls
    for (let i = 0; i < size; i++) {
        walls.add(`0,${i}`);
        walls.add(`${size-1},${i}`);
        walls.add(`${i},0`);
        walls.add(`${i},${size-1}`);
    }
    
    // Add strategic interior walls
    for (let x = 4; x < size - 4; x += 5) {
        for (let y = 2; y < size - 2; y++) {
            if (y % 4 !== 0) walls.add(`${x},${y}`);
        }
    }
    
    return walls;
}

function setupCanvas9() {
    const canvas = document.getElementById('maze-canvas9');
    const data = window.level9Data;
    canvas.width = data.cellSize * data.gridSize;
    canvas.height = data.cellSize * data.gridSize;
}

function renderMaze9() {
    const canvas = document.getElementById('maze-canvas9');
    const ctx = canvas.getContext('2d');
    const data = window.level9Data;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = '#654321';
    data.walls.forEach(wallKey => {
        const [x, y] = wallKey.split(',').map(Number);
        ctx.fillRect(x * data.cellSize, y * data.cellSize, data.cellSize, data.cellSize);
    });
    
    // Draw gates
    data.gates.forEach(gate => {
        if (gate.orientation === 'horizontal') {
            ctx.fillStyle = gate.open ? '#f39c12' : '#95a5a6';
            ctx.fillRect(
                (gate.x - 1) * data.cellSize,
                gate.y * data.cellSize + data.cellSize / 2 - 3,
                data.cellSize * 3,
                6
            );
        } else {
            ctx.fillStyle = gate.open ? '#f39c12' : '#95a5a6';
            ctx.fillRect(
                gate.x * data.cellSize + data.cellSize / 2 - 3,
                (gate.y - 1) * data.cellSize,
                6,
                data.cellSize * 3
            );
        }
    });
    
    // Draw exit
    ctx.fillStyle = '#9b59b6';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
        '★',
        data.exitPos.x * data.cellSize + data.cellSize / 2,
        data.exitPos.y * data.cellSize + data.cellSize / 2
    );
    
    // Draw comrades
    data.comrades.forEach(comrade => {
        if (!comrade.rescued) {
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.arc(
                comrade.x * data.cellSize + data.cellSize / 2,
                comrade.y * data.cellSize + data.cellSize / 2,
                data.cellSize / 2 - 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    });
    
    // Draw enemies
    data.enemies.forEach(enemy => {
        if (!enemy.trapped) {
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(
                enemy.x * data.cellSize + data.cellSize / 2,
                enemy.y * data.cellSize + data.cellSize / 2,
                data.cellSize / 2 - 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
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

function isGateBlocking9(x, y) {
    const data = window.level9Data;
    return data.gates.some(gate => {
        if (!gate.open) {
            if (gate.orientation === 'horizontal') {
                return y === gate.y && x >= gate.x - 1 && x <= gate.x + 1;
            } else {
                return x === gate.x && y >= gate.y - 1 && y <= gate.y + 1;
            }
        }
        return false;
    });
}

function toggleGate9(clickX, clickY) {
    const data = window.level9Data;
    
    data.gates.forEach(gate => {
        let clicked = false;
        if (gate.orientation === 'horizontal') {
            clicked = clickY === gate.y && clickX >= gate.x - 1 && clickX <= gate.x + 1;
        } else {
            clicked = clickX === gate.x && clickY >= gate.y - 1 && clickY <= gate.y + 1;
        }
        
        if (clicked) {
            gate.open = !gate.open;
            renderMaze9();
        }
    });
}

function movePlayer9(direction) {
    const data = window.level9Data;
    let newX = data.playerPos.x;
    let newY = data.playerPos.y;
    
    if (direction === 'up') newY--;
    else if (direction === 'down') newY++;
    else if (direction === 'left') newX--;
    else if (direction === 'right') newX++;
    
    // Check if wall or closed gate
    if (data.walls.has(`${newX},${newY}`) || isGateBlocking9(newX, newY)) return;
    
    // Move player
    data.playerPos = { x: newX, y: newY };
    data.moves++;
    document.getElementById('moves9').textContent = data.moves;
    
    // Check if rescued a comrade
    data.comrades.forEach(comrade => {
        if (!comrade.rescued && comrade.x === newX && comrade.y === newY) {
            comrade.rescued = true;
            data.comradesRescued++;
            document.getElementById('comrades9').textContent = data.comradesRescued;
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #2ecc71;">Comrade rescued! (${data.comradesRescued}/3)</span>`;
            setTimeout(() => document.getElementById('feedback9').innerHTML = '', 1500);
        }
    });
    
    // Check if reached exit with all comrades
    if (newX === data.exitPos.x && newY === data.exitPos.y) {
        if (data.comradesRescued >= 3) {
            clearInterval(data.timerInterval);
            clearInterval(data.enemyInterval);
            const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
            
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #9b59b6; font-size: 1.8rem;">🎉 FREEDOM ACHIEVED! You escaped in ${elapsed}s with ${data.moves} moves! 🎉</span>`;
            
            setTimeout(() => completeLevel(9), 2500);
        } else {
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #f39c12;">Rescue all comrades first! (${data.comradesRescued}/3)</span>`;
            setTimeout(() => document.getElementById('feedback9').innerHTML = '', 2000);
        }
        return;
    }
    
    checkCollision9();
    renderMaze9();
}

function moveEnemies9() {
    const data = window.level9Data;
    
    data.enemies.forEach(enemy => {
        if (enemy.trapped) return;
        
        const newX = enemy.x + enemy.dx;
        const newY = enemy.y + enemy.dy;
        
        // Check if hitting wall, gate, or boundary
        if (data.walls.has(`${newX},${newY}`) || isGateBlocking9(newX, newY)) {
            // Reverse direction
            enemy.dx = -enemy.dx;
            enemy.dy = -enemy.dy;
        } else {
            enemy.x = newX;
            enemy.y = newY;
        }
    });
    
    renderMaze9();
}

function moveComrades9() {
    const data = window.level9Data;
    
    // Move rescued comrades toward exit
    data.comrades.forEach(comrade => {
        if (comrade.rescued && (comrade.x !== data.exitPos.x || comrade.y !== data.exitPos.y)) {
            // Simple pathfinding toward exit
            if (comrade.x < data.exitPos.x && !data.walls.has(`${comrade.x + 1},${comrade.y}`) && !isGateBlocking9(comrade.x + 1, comrade.y)) {
                comrade.x++;
            } else if (comrade.x > data.exitPos.x && !data.walls.has(`${comrade.x - 1},${comrade.y}`) && !isGateBlocking9(comrade.x - 1, comrade.y)) {
                comrade.x--;
            } else if (comrade.y < data.exitPos.y && !data.walls.has(`${comrade.x},${comrade.y + 1}`) && !isGateBlocking9(comrade.x, comrade.y + 1)) {
                comrade.y++;
            } else if (comrade.y > data.exitPos.y && !data.walls.has(`${comrade.x},${comrade.y - 1}`) && !isGateBlocking9(comrade.x, comrade.y - 1)) {
                comrade.y--;
            }
        }
    });
}

function checkCollision9() {
    const data = window.level9Data;
    
    // Check if player or comrades collide with enemies
    const playerHit = data.enemies.some(enemy => 
        !enemy.trapped && enemy.x === data.playerPos.x && enemy.y === data.playerPos.y
    );
    
    if (playerHit) {
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: #e74c3c; font-size: 1.3rem;">💥 Enemy caught you! Be more careful with gates!</span>';
        setTimeout(() => {
            document.getElementById('feedback9').innerHTML = '';
        }, 2000);
    }
}
