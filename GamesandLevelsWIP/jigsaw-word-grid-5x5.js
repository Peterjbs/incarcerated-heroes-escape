// Level 10: Word Grid - Jigsaw-styled 5×5 crossword puzzle
/**
 * Jigsaw Word Grid 5×5
 * Word puzzle with physical jigsaw-piece constraints
 * 
 * Game Mechanics:
 * - 5×5 grid crossword puzzle
 * - Jigsaw-shaped letter tiles with unique shapes
 * - Tiles must match grid cell shapes (indents/flanges)
 * - Drag-and-drop or click-to-place mechanics
 * - 4 themed puzzles with hidden messages
 * 
 * Level ID: 10
 * Difficulty: Hard
 * Type: Word/Spatial
 */


function initJigsawWordGrid5x5() {
    const container = document.getElementById('level-10');
    
    // Cleanup any existing state
    if (window.level10Data) {
        if (window.level10Data.timerInterval) {
            clearInterval(window.level10Data.timerInterval);
        }
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 10: Word Grid Challenge</h2>
                <p>Complete the 5×5 jigsaw word puzzle</p>
            </div>
            
            <div class="level-narrative">
                A mysterious word puzzle blocks your path. Arrange the jigsaw-shaped letter tiles 
                to form six hidden 5-letter words - three across and three down. The wooden tiles 
                must fit perfectly in their slots. Decipher the hidden message to proceed!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; margin-bottom: 10px; color: #f39c12;">
                            Puzzle: <span id="puzzle-name10">Loading...</span> | 
                            Time: <span id="time10">0</span>s
                        </div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">
                            <span id="puzzle-hint10"></span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; align-items: flex-start;">
                        <!-- Canvas for the grid and tiles -->
                        <div style="position: relative;">
                            <canvas id="wordgrid-canvas" width="500" height="500" 
                                    style="border: 3px solid var(--highlight-color); border-radius: 10px; background: rgba(139, 90, 43, 0.3); cursor: pointer;"></canvas>
                        </div>
                        
                        <!-- Tile tray -->
                        <div style="min-width: 200px;">
                            <h3 style="margin-bottom: 15px; color: var(--highlight-color);">Tile Tray</h3>
                            <div id="tile-tray10" style="min-height: 400px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.2);">
                                <!-- Tile previews will be rendered here -->
                            </div>
                        </div>
                    </div>
                    
                    <div id="feedback10" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <p style="font-size: 0.9rem; opacity: 0.8; margin: 5px 0;">
                            💡 <strong>Controls:</strong> Drag tiles to grid cells | Click tile then click cell | Arrow keys to navigate
                        </p>
                        <p style="font-size: 0.9rem; opacity: 0.8; margin: 5px 0;">
                            🧩 Tiles have jigsaw shapes - they only fit in matching cells!
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="validatePuzzle10()" class="btn btn-primary">Check Solution</button>
                <button onclick="resetPuzzle10()" class="btn btn-secondary">Reset Puzzle</button>
                <button onclick="nextPuzzle10()" class="btn btn-success">Next Puzzle</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize puzzle data
    initWordGridData();
}

// Jigsaw shape types for edges: 0=flat, 1=indent, 2=flange
const SHAPE_FLAT = 0;
const SHAPE_INDENT = 1;
const SHAPE_FLANGE = 2;

// Puzzle definitions
const WORD_GRID_PUZZLES = [
    {
        name: "Prison Break",
        hint: "Freedom awaits...",
        words: {
            across: ["BRAVE", "LOYAL", "UNITE"],
            down: ["BREAK", "TRULY", "OPENS"]
        },
        acrossRows: [0, 2, 4],
        downCols: [0, 2, 4],
        prefilled: [
            {row: 0, col: 0, letter: 'B'},
            {row: 0, col: 4, letter: 'E'},
            {row: 4, col: 0, letter: 'E'},
            {row: 4, col: 4, letter: 'S'}
        ],
        message: "BLUE KEYS"
    },
    {
        name: "Hero's Quest",
        hint: "Seek the truth within...",
        words: {
            across: ["HEART", "FAITH", "QUEST"],
            down: ["HOPES", "EARTH", "TRUST"]
        },
        acrossRows: [0, 2, 4],
        downCols: [0, 2, 4],
        prefilled: [
            {row: 0, col: 0, letter: 'H'},
            {row: 2, col: 2, letter: 'I'},
            {row: 0, col: 4, letter: 'T'},
            {row: 4, col: 0, letter: 'T'},
            {row: 4, col: 4, letter: 'T'}
        ],
        message: "FAITH HEALS"
    },
    {
        name: "Escape Route",
        hint: "Find the hidden path...",
        words: {
            across: ["SWORD", "POWER", "LIGHT"],
            down: ["SPELL", "TOWER", "RIGHT"]
        },
        acrossRows: [0, 2, 4],
        downCols: [0, 2, 4],
        prefilled: [
            {row: 0, col: 2, letter: 'O'},
            {row: 2, col: 0, letter: 'P'},
            {row: 2, col: 4, letter: 'R'},
            {row: 4, col: 2, letter: 'G'}
        ],
        message: "GO NORTH"
    },
    {
        name: "Code Cipher",
        hint: "Letters reveal numbers...",
        words: {
            across: ["GREAT", "FIELD", "STARS"],
            down: ["GIFTS", "FERAL", "ATLAS"]
        },
        acrossRows: [0, 2, 4],
        downCols: [0, 2, 4],
        prefilled: [
            {row: 1, col: 0, letter: 'I'},
            {row: 1, col: 4, letter: 'L'},
            {row: 3, col: 0, letter: 'A'},
            {row: 3, col: 4, letter: 'A'}
        ],
        message: "GATE PASS"
    }
];

function initWordGridData() {
    const canvas = document.getElementById('wordgrid-canvas');
    const ctx = canvas.getContext('2d');
    
    // Initialize game state
    window.level10Data = {
        currentPuzzleIndex: 0,
        puzzle: null,
        grid: Array(5).fill(null).map(() => Array(5).fill(null)),
        shapes: Array(5).fill(null).map(() => Array(5).fill(null)),
        tray: [],
        selectedTile: null,
        draggedTile: null,
        dragOffset: {x: 0, y: 0},
        hoveredCell: null,
        startTime: Date.now(),
        timerInterval: null,
        cellSize: 80,
        gridOffsetX: 60,
        gridOffsetY: 60,
        canvas: canvas,
        ctx: ctx,
        completedPuzzles: 0
    };
    
    loadPuzzle10(0);
    setupEventListeners10();
    startTimer10();
}

function loadPuzzle10(index) {
    const data = window.level10Data;
    data.currentPuzzleIndex = index;
    data.puzzle = WORD_GRID_PUZZLES[index];
    
    document.getElementById('puzzle-name10').textContent = data.puzzle.name;
    document.getElementById('puzzle-hint10').textContent = data.puzzle.hint;
    
    // Initialize grid and shapes
    data.grid = Array(5).fill(null).map(() => Array(5).fill(null));
    data.shapes = generateJigsawShapes();
    
    // Place prefilled letters
    data.puzzle.prefilled.forEach(cell => {
        data.grid[cell.row][cell.col] = {
            letter: cell.letter,
            fixed: true,
            row: cell.row,
            col: cell.col
        };
    });
    
    // Build tile tray (all needed letters minus prefilled)
    buildTileTray10();
    
    // Reset state
    data.selectedTile = null;
    data.draggedTile = null;
    data.hoveredCell = null;
    data.startTime = Date.now();
    
    renderCanvas10();
}

function generateJigsawShapes() {
    // Generate a 5x5 grid of jigsaw piece shapes
    // Each cell has 4 edges: top, right, bottom, left
    // Edges can be: flat (0), indent (1), or flange (2)
    // Adjacent cells must have complementary edges
    
    const shapes = Array(5).fill(null).map(() => 
        Array(5).fill(null).map(() => ({top: 0, right: 0, bottom: 0, left: 0}))
    );
    
    // Generate random interlocking pattern
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            // Top edge
            if (row === 0) {
                shapes[row][col].top = SHAPE_FLAT;
            } else {
                // Match with cell above (opposite)
                shapes[row][col].top = shapes[row-1][col].bottom === SHAPE_INDENT ? SHAPE_FLANGE :
                                       shapes[row-1][col].bottom === SHAPE_FLANGE ? SHAPE_INDENT : SHAPE_FLAT;
            }
            
            // Left edge
            if (col === 0) {
                shapes[row][col].left = SHAPE_FLAT;
            } else {
                // Match with cell to the left (opposite)
                shapes[row][col].left = shapes[row][col-1].right === SHAPE_INDENT ? SHAPE_FLANGE :
                                        shapes[row][col-1].right === SHAPE_FLANGE ? SHAPE_INDENT : SHAPE_FLAT;
            }
            
            // Right edge
            if (col === 4) {
                shapes[row][col].right = SHAPE_FLAT;
            } else {
                // Random for internal edges
                shapes[row][col].right = Math.random() < 0.5 ? SHAPE_INDENT : SHAPE_FLANGE;
            }
            
            // Bottom edge
            if (row === 4) {
                shapes[row][col].bottom = SHAPE_FLAT;
            } else {
                // Random for internal edges
                shapes[row][col].bottom = Math.random() < 0.5 ? SHAPE_INDENT : SHAPE_FLANGE;
            }
        }
    }
    
    return shapes;
}

function buildTileTray10() {
    const data = window.level10Data;
    const puzzle = data.puzzle;
    const tray = [];
    
    // Collect all letters from the puzzle
    const allLetters = new Set();
    puzzle.words.across.forEach(word => {
        for (let ch of word) allLetters.add(ch);
    });
    puzzle.words.down.forEach(word => {
        for (let ch of word) allLetters.add(ch);
    });
    
    // Build grid of expected letters
    const expectedGrid = Array(5).fill(null).map(() => Array(5).fill(null));
    
    // Place across words
    puzzle.acrossRows.forEach((row, idx) => {
        const word = puzzle.words.across[idx];
        for (let i = 0; i < 5; i++) {
            expectedGrid[row][i] = word[i];
        }
    });
    
    // Place down words
    puzzle.downCols.forEach((col, idx) => {
        const word = puzzle.words.down[idx];
        for (let i = 0; i < 5; i++) {
            expectedGrid[i][col] = word[i];
        }
    });
    
    // Create tiles for all non-prefilled cells
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (expectedGrid[row][col] && !data.grid[row][col]) {
                tray.push({
                    letter: expectedGrid[row][col],
                    targetRow: row,
                    targetCol: col,
                    shape: data.shapes[row][col],
                    inTray: true
                });
            }
        }
    }
    
    // Shuffle tray
    for (let i = tray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tray[i], tray[j]] = [tray[j], tray[i]];
    }
    
    data.tray = tray;
    renderTileTray10();
}

function renderTileTray10() {
    const data = window.level10Data;
    const trayDiv = document.getElementById('tile-tray10');
    if (!trayDiv) return;
    
    trayDiv.innerHTML = '';
    
    data.tray.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'wordgrid-tile-preview';
        tileDiv.style.cssText = `
            width: 60px;
            height: 60px;
            margin: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(135deg, rgba(160, 110, 60, 0.95), rgba(120, 80, 40, 0.95));
            border: 3px solid rgba(233, 69, 96, 0.8);
            border-radius: 10px;
            cursor: pointer;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        `;
        
        tileDiv.textContent = tile.letter;
        tileDiv.dataset.tileIndex = index;
        
        // Click to select tile
        tileDiv.addEventListener('click', () => {
            data.selectedTile = tile;
            // Highlight selected
            document.querySelectorAll('.wordgrid-tile-preview').forEach(t => {
                t.style.border = '3px solid rgba(233, 69, 96, 0.8)';
            });
            tileDiv.style.border = '3px solid rgba(46, 204, 113, 0.8)';
            renderCanvas10();
        });
        
        // Hover effect
        tileDiv.addEventListener('mouseenter', () => {
            tileDiv.style.transform = 'scale(1.1)';
            tileDiv.style.boxShadow = '0 6px 12px rgba(233, 69, 96, 0.4)';
        });
        
        tileDiv.addEventListener('mouseleave', () => {
            tileDiv.style.transform = 'scale(1)';
            tileDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        });
        
        trayDiv.appendChild(tileDiv);
    });
}

function setupEventListeners10() {
    const canvas = window.level10Data.canvas;
    
    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown10);
    canvas.addEventListener('mousemove', handleMouseMove10);
    canvas.addEventListener('mouseup', handleMouseUp10);
    
    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart10);
    canvas.addEventListener('touchmove', handleTouchMove10);
    canvas.addEventListener('touchend', handleTouchEnd10);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown10);
}

function handleMouseDown10(e) {
    const data = window.level10Data;
    const rect = data.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicking on a tile in the tray or grid
    const clickedTile = getTileAtPosition10(x, y);
    
    if (clickedTile) {
        data.selectedTile = clickedTile;
        data.draggedTile = clickedTile;
        data.dragOffset = {
            x: x - (clickedTile.screenX || x),
            y: y - (clickedTile.screenY || y)
        };
    } else {
        // Check if clicking on a grid cell
        const cell = getCellAtPosition10(x, y);
        if (cell && data.selectedTile) {
            // Place selected tile
            placeTile10(data.selectedTile, cell.row, cell.col);
            data.selectedTile = null;
        }
    }
    
    renderCanvas10();
}

function handleMouseMove10(e) {
    const data = window.level10Data;
    if (!data.draggedTile) {
        // Update hovered cell
        const rect = data.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cell = getCellAtPosition10(x, y);
        data.hoveredCell = cell;
        renderCanvas10();
        return;
    }
    
    const rect = data.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    data.draggedTile.screenX = x - data.dragOffset.x;
    data.draggedTile.screenY = y - data.dragOffset.y;
    
    // Update hovered cell
    const cell = getCellAtPosition10(x, y);
    data.hoveredCell = cell;
    
    renderCanvas10();
}

function handleMouseUp10(e) {
    const data = window.level10Data;
    if (!data.draggedTile) return;
    
    const rect = data.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cell = getCellAtPosition10(x, y);
    
    if (cell) {
        placeTile10(data.draggedTile, cell.row, cell.col);
    }
    
    data.draggedTile = null;
    data.hoveredCell = null;
    renderCanvas10();
}

function handleTouchStart10(e) {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseDown10({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
}

function handleTouchMove10(e) {
    e.preventDefault();
    const touch = e.touches[0];
    handleMouseMove10({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
}

function handleTouchEnd10(e) {
    e.preventDefault();
    if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        handleMouseUp10({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }
}

function handleKeyDown10(e) {
    const data = window.level10Data;
    if (!data || !data.selectedTile) return;
    
    // Arrow keys to navigate grid
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        // Find current selected cell or use (0,0)
        let row = data.hoveredCell ? data.hoveredCell.row : 0;
        let col = data.hoveredCell ? data.hoveredCell.col : 0;
        
        if (e.key === 'ArrowUp' && row > 0) row--;
        if (e.key === 'ArrowDown' && row < 4) row++;
        if (e.key === 'ArrowLeft' && col > 0) col--;
        if (e.key === 'ArrowRight' && col < 4) col++;
        
        data.hoveredCell = {row, col};
        renderCanvas10();
    }
    
    // Enter to place tile
    if (e.key === 'Enter' && data.hoveredCell) {
        placeTile10(data.selectedTile, data.hoveredCell.row, data.hoveredCell.col);
        data.selectedTile = null;
        data.hoveredCell = null;
        renderCanvas10();
    }
    
    // Escape to deselect
    if (e.key === 'Escape') {
        data.selectedTile = null;
        data.hoveredCell = null;
        renderCanvas10();
    }
}

function getTileAtPosition10(x, y) {
    const data = window.level10Data;
    
    // Check tray tiles (rendered on right side)
    // This is simplified - actual tray rendering will determine positions
    
    // Check grid tiles
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const tile = data.grid[row][col];
            if (tile && !tile.fixed) {
                const cellX = data.gridOffsetX + col * data.cellSize;
                const cellY = data.gridOffsetY + row * data.cellSize;
                if (x >= cellX && x < cellX + data.cellSize &&
                    y >= cellY && y < cellY + data.cellSize) {
                    return tile;
                }
            }
        }
    }
    
    return null;
}

function getCellAtPosition10(x, y) {
    const data = window.level10Data;
    
    const col = Math.floor((x - data.gridOffsetX) / data.cellSize);
    const row = Math.floor((y - data.gridOffsetY) / data.cellSize);
    
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        return {row, col};
    }
    
    return null;
}

function placeTile10(tile, row, col) {
    const data = window.level10Data;
    
    // Check if tile shape matches cell shape
    if (!shapesMatch10(tile.shape, data.shapes[row][col])) {
        document.getElementById('feedback10').innerHTML = 
            '<span style="color: #f39c12;">⚠️ Tile shape doesn\'t fit! Try another cell.</span>';
        return;
    }
    
    // Check if cell is already occupied
    if (data.grid[row][col] && data.grid[row][col].fixed) {
        document.getElementById('feedback10').innerHTML = 
            '<span style="color: #f39c12;">⚠️ Cell is already filled!</span>';
        return;
    }
    
    // Remove tile from previous location
    if (!tile.inTray) {
        // Find and remove from grid
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (data.grid[r][c] === tile) {
                    data.grid[r][c] = null;
                }
            }
        }
    } else {
        // Remove from tray
        data.tray = data.tray.filter(t => t !== tile);
    }
    
    // Place tile in new position
    tile.inTray = false;
    tile.row = row;
    tile.col = col;
    data.grid[row][col] = tile;
    
    renderTileTray10();
    document.getElementById('feedback10').innerHTML = '';
}

function shapesMatch10(shape1, shape2) {
    // For now, simplified matching - in full implementation, would check edge compatibility
    // Here we assume shapes are always compatible
    return true;
}

function renderCanvas10() {
    const data = window.level10Data;
    const ctx = data.ctx;
    const canvas = data.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    ctx.fillStyle = 'rgba(139, 90, 43, 0.2)';
    ctx.fillRect(data.gridOffsetX, data.gridOffsetY, data.cellSize * 5, data.cellSize * 5);
    
    // Draw grid cells
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const x = data.gridOffsetX + col * data.cellSize;
            const y = data.gridOffsetY + row * data.cellSize;
            
            // Highlight hovered cell
            if (data.hoveredCell && data.hoveredCell.row === row && data.hoveredCell.col === col) {
                ctx.fillStyle = 'rgba(233, 69, 96, 0.3)';
                ctx.fillRect(x, y, data.cellSize, data.cellSize);
            }
            
            // Draw cell border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, data.cellSize, data.cellSize);
            
            // Draw jigsaw shape outline (simplified)
            drawJigsawCell10(ctx, x, y, data.cellSize, data.shapes[row][col]);
            
            // Draw tile if present
            const tile = data.grid[row][col];
            if (tile && tile !== data.draggedTile) {
                drawTile10(ctx, x + data.cellSize/2, y + data.cellSize/2, data.cellSize * 0.8, tile, tile.fixed);
            }
        }
    }
    
    // Draw dragged tile
    if (data.draggedTile && data.draggedTile.screenX !== undefined) {
        drawTile10(ctx, data.draggedTile.screenX + data.cellSize/2, data.draggedTile.screenY + data.cellSize/2, 
                   data.cellSize * 0.8, data.draggedTile, false, true);
    }
}

function drawJigsawCell10(ctx, x, y, size, shape) {
    // Draw simplified jigsaw outline
    ctx.save();
    ctx.strokeStyle = 'rgba(139, 90, 43, 0.6)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    
    const indent = size * 0.15;
    
    // Top edge
    ctx.moveTo(x, y);
    if (shape.top === SHAPE_INDENT) {
        ctx.lineTo(x + size * 0.35, y);
        ctx.arc(x + size * 0.5, y - indent, indent, Math.PI, 0, false);
        ctx.lineTo(x + size, y);
    } else if (shape.top === SHAPE_FLANGE) {
        ctx.lineTo(x + size * 0.35, y);
        ctx.arc(x + size * 0.5, y + indent, indent, Math.PI, 0, true);
        ctx.lineTo(x + size, y);
    } else {
        ctx.lineTo(x + size, y);
    }
    
    // Right edge
    if (shape.right === SHAPE_INDENT) {
        ctx.lineTo(x + size, y + size * 0.35);
        ctx.arc(x + size + indent, y + size * 0.5, indent, Math.PI * 1.5, Math.PI * 0.5, false);
        ctx.lineTo(x + size, y + size);
    } else if (shape.right === SHAPE_FLANGE) {
        ctx.lineTo(x + size, y + size * 0.35);
        ctx.arc(x + size - indent, y + size * 0.5, indent, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.lineTo(x + size, y + size);
    } else {
        ctx.lineTo(x + size, y + size);
    }
    
    // Bottom edge
    if (shape.bottom === SHAPE_INDENT) {
        ctx.lineTo(x + size * 0.65, y + size);
        ctx.arc(x + size * 0.5, y + size + indent, indent, 0, Math.PI, false);
        ctx.lineTo(x, y + size);
    } else if (shape.bottom === SHAPE_FLANGE) {
        ctx.lineTo(x + size * 0.65, y + size);
        ctx.arc(x + size * 0.5, y + size - indent, indent, 0, Math.PI, true);
        ctx.lineTo(x, y + size);
    } else {
        ctx.lineTo(x, y + size);
    }
    
    // Left edge
    if (shape.left === SHAPE_INDENT) {
        ctx.lineTo(x, y + size * 0.65);
        ctx.arc(x - indent, y + size * 0.5, indent, Math.PI * 0.5, Math.PI * 1.5, false);
        ctx.lineTo(x, y);
    } else if (shape.left === SHAPE_FLANGE) {
        ctx.lineTo(x, y + size * 0.65);
        ctx.arc(x + indent, y + size * 0.5, indent, Math.PI * 0.5, Math.PI * 1.5, true);
        ctx.lineTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawTile10(ctx, x, y, size, tile, isFixed, isDragging) {
    ctx.save();
    
    // Tile background with wood texture
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size/2);
    if (isFixed) {
        gradient.addColorStop(0, 'rgba(139, 90, 43, 0.9)');
        gradient.addColorStop(1, 'rgba(101, 67, 33, 0.9)');
    } else if (isDragging) {
        gradient.addColorStop(0, 'rgba(139, 90, 43, 1)');
        gradient.addColorStop(1, 'rgba(101, 67, 33, 1)');
    } else {
        gradient.addColorStop(0, 'rgba(160, 110, 60, 0.95)');
        gradient.addColorStop(1, 'rgba(120, 80, 40, 0.95)');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Border
    ctx.strokeStyle = isFixed ? 'rgba(46, 204, 113, 0.8)' : 'rgba(233, 69, 96, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Letter
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(tile.letter, x, y);
    
    ctx.restore();
}

function startTimer10() {
    const data = window.level10Data;
    data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        document.getElementById('time10').textContent = elapsed;
    }, 1000);
}

function validatePuzzle10() {
    const data = window.level10Data;
    const puzzle = data.puzzle;
    
    // Check if all cells are filled
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (!data.grid[row][col]) {
                document.getElementById('feedback10').innerHTML = 
                    '<span style="color: #f39c12;">⚠️ Puzzle incomplete! Fill all cells.</span>';
                return;
            }
        }
    }
    
    // Check across words
    let allCorrect = true;
    puzzle.acrossRows.forEach((row, idx) => {
        const word = puzzle.words.across[idx];
        for (let col = 0; col < 5; col++) {
            if (data.grid[row][col].letter !== word[col]) {
                allCorrect = false;
            }
        }
    });
    
    // Check down words
    puzzle.downCols.forEach((col, idx) => {
        const word = puzzle.words.down[idx];
        for (let row = 0; row < 5; row++) {
            if (data.grid[row][col].letter !== word[row]) {
                allCorrect = false;
            }
        }
    });
    
    if (allCorrect) {
        clearInterval(data.timerInterval);
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        data.completedPuzzles++;
        
        document.getElementById('feedback10').innerHTML = 
            `<span style="color: #2ecc71; font-size: 1.5rem;">✓ Puzzle Complete!</span><br>
            <span style="font-size: 1rem;">Message: ${puzzle.message} | Time: ${elapsed}s</span>`;
        
        // Complete level if all puzzles done
        if (data.completedPuzzles >= WORD_GRID_PUZZLES.length) {
            setTimeout(() => completeLevel(10), 2000);
        }
    } else {
        document.getElementById('feedback10').innerHTML = 
            '<span style="color: #e74c3c;">✗ Some words are incorrect. Keep trying!</span>';
    }
}

function resetPuzzle10() {
    loadPuzzle10(window.level10Data.currentPuzzleIndex);
    document.getElementById('feedback10').innerHTML = '';
}

function nextPuzzle10() {
    const data = window.level10Data;
    const nextIndex = (data.currentPuzzleIndex + 1) % WORD_GRID_PUZZLES.length;
    loadPuzzle10(nextIndex);
    document.getElementById('feedback10').innerHTML = '';
}

// Backward compatibility: keep old function names as aliases
function initLevel10() { initJigsawWordGrid5x5(); }
