// Level 5: Jiggy Puzzle - Sliding Tile Puzzle
function initLevel5() {
    const container = document.getElementById('level-5');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 5: Jiggy Puzzle</h2>
                <p>Slide the tiles to reveal the correct pattern</p>
            </div>
            
            <div class="level-narrative">
                An ancient sliding puzzle mechanism blocks the corridor. 
                Arrange the numbered tiles in sequential order from 1 to 15, 
                with the empty space in the bottom-right corner. 
                Slide wisely to unlock the path forward!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; margin-bottom: 10px; color: #f39c12;">
                            Moves: <span id="move-count5">0</span> | 
                            Time: <span id="time5">0</span>s
                        </div>
                    </div>
                    
                    <div id="jiggy-board" style="display: inline-grid; grid-template-columns: repeat(4, 90px); grid-template-rows: repeat(4, 90px); gap: 8px; padding: 20px; background: rgba(0, 0, 0, 0.4); border-radius: 15px; border: 3px solid var(--highlight-color); margin: 20px 0;">
                        <!-- Tiles will be generated here -->
                    </div>
                    
                    <div id="feedback5" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <p style="font-size: 0.9rem; opacity: 0.8; margin: 0;">
                            💡 Click on a tile adjacent to the empty space to slide it
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkSolution5()" class="btn btn-primary">Check Solution</button>
                <button onclick="shuffleBoard5()" class="btn btn-secondary">Shuffle</button>
                <button onclick="initLevel5()" class="btn btn-warning" style="background: var(--warning-color);">New Puzzle</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add styles
    if (!document.getElementById('level5-styles')) {
        const style = document.createElement('style');
        style.id = 'level5-styles';
        style.textContent = `
        .jiggy-tile {
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, rgba(233, 69, 96, 0.3), rgba(233, 69, 96, 0.1));
            border: 3px solid rgba(233, 69, 96, 0.6);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .jiggy-tile:hover {
            transform: scale(1.05);
            background: linear-gradient(135deg, rgba(233, 69, 96, 0.5), rgba(233, 69, 96, 0.2));
            box-shadow: 0 6px 12px rgba(233, 69, 96, 0.4);
        }
        
        .jiggy-tile.empty {
            background: rgba(0, 0, 0, 0.3);
            border: 2px dashed rgba(255, 255, 255, 0.2);
            cursor: default;
        }
        
        .jiggy-tile.empty:hover {
            transform: none;
            box-shadow: none;
        }
        
        .jiggy-tile.slideable {
            animation: pulse5 1s infinite;
        }
        
        @keyframes pulse5 {
            0%, 100% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); }
            50% { box-shadow: 0 6px 16px rgba(46, 204, 113, 0.5); }
        }
    `;
        document.head.appendChild(style);
    }
    
    // Initialize puzzle state
    window.level5Data = {
        board: [],
        emptyPos: { row: 3, col: 3 },
        moves: 0,
        startTime: Date.now(),
        timerInterval: null
    };
    
    // Create solved board then shuffle
    createBoard5();
    shuffleBoard5(50); // Shuffle with 50 random moves
    
    // Start timer
    window.level5Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level5Data.startTime) / 1000);
        document.getElementById('time5').textContent = elapsed;
    }, 1000);
}

function createBoard5() {
    const data = window.level5Data;
    const board = [];
    
    // Create 4x4 board with numbers 1-15 and one empty space
    for (let row = 0; row < 4; row++) {
        board[row] = [];
        for (let col = 0; col < 4; col++) {
            const num = row * 4 + col + 1;
            board[row][col] = num <= 15 ? num : 0; // 0 represents empty
        }
    }
    
    data.board = board;
    data.emptyPos = { row: 3, col: 3 };
    renderBoard5();
}

function renderBoard5() {
    const data = window.level5Data;
    const boardDiv = document.getElementById('jiggy-board');
    boardDiv.innerHTML = '';
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            const value = data.board[row][col];
            
            if (value === 0) {
                tile.className = 'jiggy-tile empty';
            } else {
                tile.className = 'jiggy-tile';
                tile.textContent = value;
                
                // Check if tile is adjacent to empty space
                if (isAdjacent5(row, col, data.emptyPos.row, data.emptyPos.col)) {
                    tile.classList.add('slideable');
                    tile.addEventListener('click', () => slideTile5(row, col));
                }
            }
            
            boardDiv.appendChild(tile);
        }
    }
    
    document.getElementById('move-count5').textContent = data.moves;
}

function isAdjacent5(row1, col1, row2, col2) {
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function slideTile5(row, col) {
    const data = window.level5Data;
    const emptyRow = data.emptyPos.row;
    const emptyCol = data.emptyPos.col;
    
    // Swap tile with empty space
    data.board[emptyRow][emptyCol] = data.board[row][col];
    data.board[row][col] = 0;
    data.emptyPos = { row, col };
    data.moves++;
    
    renderBoard5();
    
    // Auto-check if solved
    if (isSolved5()) {
        clearInterval(data.timerInterval);
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        document.getElementById('feedback5').innerHTML = 
            `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Puzzle Solved in ${data.moves} moves and ${elapsed} seconds!</span>`;
        setTimeout(() => completeLevel(5), 2000);
    }
}

function shuffleBoard5(moves = 50) {
    const data = window.level5Data;
    
    // Perform random valid moves
    for (let i = 0; i < moves; i++) {
        const adjacentTiles = [];
        const emptyRow = data.emptyPos.row;
        const emptyCol = data.emptyPos.col;
        
        // Find all adjacent tiles
        if (emptyRow > 0) adjacentTiles.push({ row: emptyRow - 1, col: emptyCol });
        if (emptyRow < 3) adjacentTiles.push({ row: emptyRow + 1, col: emptyCol });
        if (emptyCol > 0) adjacentTiles.push({ row: emptyRow, col: emptyCol - 1 });
        if (emptyCol < 3) adjacentTiles.push({ row: emptyRow, col: emptyCol + 1 });
        
        // Pick random adjacent tile and swap
        const randomTile = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
        data.board[emptyRow][emptyCol] = data.board[randomTile.row][randomTile.col];
        data.board[randomTile.row][randomTile.col] = 0;
        data.emptyPos = randomTile;
    }
    
    // Reset moves and time after shuffle
    data.moves = 0;
    data.startTime = Date.now();
    renderBoard5();
    document.getElementById('feedback5').innerHTML = '';
}

function isSolved5() {
    const data = window.level5Data;
    
    // Check if board is in solved state (1-15 in order, 0 at end)
    let expected = 1;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (row === 3 && col === 3) {
                return data.board[row][col] === 0;
            }
            if (data.board[row][col] !== expected) {
                return false;
            }
            expected++;
        }
    }
    return true;
}

function checkSolution5() {
    const data = window.level5Data;
    
    if (isSolved5()) {
        clearInterval(data.timerInterval);
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        document.getElementById('feedback5').innerHTML = 
            `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Perfect! Puzzle solved in ${data.moves} moves and ${elapsed} seconds!</span>`;
        setTimeout(() => completeLevel(5), 2000);
    } else {
        document.getElementById('feedback5').innerHTML = 
            '<span style="color: #f39c12;">Not quite there yet. Keep sliding!</span>';
    }
}
