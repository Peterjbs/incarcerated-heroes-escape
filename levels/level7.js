// Level 7: Predator Prey Dungeon - Navigate a maze, avoid red dots (foes), reach the exit
function initLevel7() {
    const container = document.getElementById('level-7');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 7: Predator Prey Dungeon</h2>
                <p>Navigate the maze and avoid the patrolling guards to reach the exit</p>
            </div>
            
            <div class="level-narrative">
                The final corridor is a deadly maze patrolled by automated sentries. 
                Move carefully through the dungeon, avoiding the red guards at all costs. 
                One touch and you'll be sent back to the start. Reach the green exit to escape!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; margin-bottom: 10px;">
                            Time Elapsed: <span id="game-timer">0</span>s | 
                            Attempts: <span id="attempt-counter">0</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: center; margin: 20px 0;">
                        <canvas id="maze-canvas" width="600" height="600" 
                                style="border: 3px solid var(--highlight-color); border-radius: 8px; 
                                       background: rgba(0, 0, 0, 0.5); max-width: 100%;"></canvas>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px; font-size: 1rem; opacity: 0.8;">
                            Controls: Use Arrow Keys or WASD to move
                        </div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer7('up')" class="btn btn-secondary" style="padding: 10px 20px;">↑</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer7('left')" class="btn btn-secondary" style="padding: 10px 20px;">←</button>
                                <button onclick="movePlayer7('down')" class="btn btn-secondary" style="padding: 10px 20px;">↓</button>
                                <button onclick="movePlayer7('right')" class="btn btn-secondary" style="padding: 10px 20px;">→</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="feedback7" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel7()" class="btn btn-warning" style="background: var(--warning-color);">Restart Maze</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize maze game
    const canvas = document.getElementById('maze-canvas');
    const ctx = canvas.getContext('2d');
    
    const gridSize = 15;
    const cellSize = canvas.width / gridSize;
    
    // Create simple maze (0 = path, 1 = wall)
    const maze = generateMaze7(gridSize);
    
    // Player position
    const player = { x: 1, y: 1 };
    
    // Exit position
    const exit = { x: gridSize - 2, y: gridSize - 2 };
    
    // Guards (enemies)
    const guards = [
        { x: 5, y: 5, dx: 1, dy: 0 },
        { x: 10, y: 8, dx: 0, dy: 1 },
        { x: 7, y: 12, dx: -1, dy: 0 }
    ];
    
    window.level7Data = {
        canvas,
        ctx,
        gridSize,
        cellSize,
        maze,
        player,
        exit,
        guards,
        gameActive: true,
        startTime: Date.now(),
        attempts: 0,
        timerInterval: null
    };
    
    // Start timer
    window.level7Data.timerInterval = setInterval(updateTimer7, 1000);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress7);
    
    // Start guard movement
    window.level7Data.guardInterval = setInterval(moveGuards7, 500);
    
    // Initial render
    renderMaze7();
}

function generateMaze7(size) {
    const maze = Array(size).fill(null).map(() => Array(size).fill(1));
    
    // Create simple paths
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            if (Math.random() > 0.3) {
                maze[i][j] = 0;
            }
        }
    }
    
    // Ensure start and end are clear
    maze[1][1] = 0;
    maze[size - 2][size - 2] = 0;
    
    // Create guaranteed path
    let x = 1, y = 1;
    while (x < size - 2 || y < size - 2) {
        maze[y][x] = 0;
        if (x < size - 2 && Math.random() > 0.3) x++;
        if (y < size - 2 && Math.random() > 0.3) y++;
    }
    
    return maze;
}

function renderMaze7() {
    const data = window.level7Data;
    if (!data) return;
    
    const { ctx, maze, gridSize, cellSize, player, exit, guards } = data;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, data.canvas.width, data.canvas.height);
    
    // Draw maze
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#0f3460';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
    
    // Draw exit
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(exit.x * cellSize + 2, exit.y * cellSize + 2, cellSize - 4, cellSize - 4);
    
    // Draw guards
    guards.forEach(guard => {
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(
            guard.x * cellSize + cellSize / 2,
            guard.y * cellSize + cellSize / 2,
            cellSize / 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
    
    // Draw player
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(
        player.x * cellSize + cellSize / 2,
        player.y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function movePlayer7(direction) {
    const data = window.level7Data;
    if (!data || !data.gameActive) return;
    
    const { player, maze, gridSize } = data;
    let newX = player.x;
    let newY = player.y;
    
    switch (direction) {
        case 'up': newY--; break;
        case 'down': newY++; break;
        case 'left': newX--; break;
        case 'right': newX++; break;
    }
    
    // Check bounds
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) return;
    
    // Check walls
    if (maze[newY][newX] === 1) return;
    
    // Update position
    player.x = newX;
    player.y = newY;
    
    // Check for guard collision
    if (checkGuardCollision7()) {
        handleDeath7();
        return;
    }
    
    // Check for exit
    if (player.x === data.exit.x && player.y === data.exit.y) {
        handleVictory7();
        return;
    }
    
    renderMaze7();
}

function handleKeyPress7(e) {
    const keyMap = {
        'ArrowUp': 'up', 'w': 'up', 'W': 'up',
        'ArrowDown': 'down', 's': 'down', 'S': 'down',
        'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
        'ArrowRight': 'right', 'd': 'right', 'D': 'right'
    };
    
    const direction = keyMap[e.key];
    if (direction) {
        e.preventDefault();
        movePlayer7(direction);
    }
}

function moveGuards7() {
    const data = window.level7Data;
    if (!data || !data.gameActive) return;
    
    const { guards, maze, gridSize } = data;
    
    guards.forEach(guard => {
        let newX = guard.x + guard.dx;
        let newY = guard.y + guard.dy;
        
        // Bounce off walls
        if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize || maze[newY][newX] === 1) {
            guard.dx *= -1;
            guard.dy *= -1;
            newX = guard.x + guard.dx;
            newY = guard.y + guard.dy;
        }
        
        guard.x = newX;
        guard.y = newY;
    });
    
    if (checkGuardCollision7()) {
        handleDeath7();
    }
    
    renderMaze7();
}

function checkGuardCollision7() {
    const data = window.level7Data;
    if (!data) return false;
    
    return data.guards.some(guard => 
        guard.x === data.player.x && guard.y === data.player.y
    );
}

function handleDeath7() {
    const data = window.level7Data;
    if (!data) return;
    
    data.gameActive = false;
    data.attempts++;
    
    document.getElementById('attempt-counter').textContent = data.attempts;
    document.getElementById('feedback7').innerHTML = 
        '<span style="color: #e74c3c; font-size: 1.3rem;">💀 Caught by guards! Resetting position...</span>';
    
    // Reset player position
    setTimeout(() => {
        data.player.x = 1;
        data.player.y = 1;
        data.gameActive = true;
        document.getElementById('feedback7').innerHTML = '';
        renderMaze7();
    }, 1500);
}

function handleVictory7() {
    const data = window.level7Data;
    if (!data) return;
    
    data.gameActive = false;
    clearInterval(data.timerInterval);
    clearInterval(data.guardInterval);
    
    const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
    
    document.getElementById('feedback7').innerHTML = 
        `<span style="color: #2ecc71; font-size: 1.5rem;">✓ ESCAPED! Time: ${elapsed}s, Attempts: ${data.attempts + 1}</span>`;
    
    // Remove keyboard listener
    document.removeEventListener('keydown', handleKeyPress7);
    
    setTimeout(() => completeLevel(7), 2000);
}

function updateTimer7() {
    const data = window.level7Data;
    if (!data) return;
    
    const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
    document.getElementById('game-timer').textContent = elapsed;
}

// Cleanup on level change
window.addEventListener('beforeunload', () => {
    if (window.level7Data) {
        clearInterval(window.level7Data.timerInterval);
        clearInterval(window.level7Data.guardInterval);
    }
});
