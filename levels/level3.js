// Level 3: Math Grid Puzzle - Drag numbers to complete equations
function initLevel3() {
    const container = document.getElementById('level-3');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 3: Math Grid Puzzle</h2>
                <p>Arrange numbers in the grid to make all equations correct</p>
            </div>
            
            <div class="level-narrative">
                A mystical grid of numbers blocks your path. Arrange the tiles so that 
                each row and column forms a valid mathematical equation. 
                The ancient mechanism will unlock only when all equations balance perfectly.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div id="math-grid" style="display: inline-block; margin: 30px auto;">
                        <!-- Grid will be generated here -->
                    </div>
                    
                    <div id="available-numbers" style="margin: 30px 0;">
                        <h3 style="margin-bottom: 15px;">Available Numbers:</h3>
                        <div id="number-pool" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                            <!-- Numbers will be generated here -->
                        </div>
                    </div>
                    
                    <div id="feedback3" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkGrid3()" class="btn btn-primary">Check Solution</button>
                <button onclick="clearGrid3()" class="btn btn-secondary">Clear Grid</button>
                <button onclick="initLevel3()" class="btn btn-warning" style="background: var(--warning-color);">New Puzzle</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add grid styles
    if (!document.getElementById('level3-styles')) {
        const style = document.createElement('style');
        style.id = 'level3-styles';
        style.textContent = `
        .math-grid-row {
            display: flex;
            gap: 5px;
            margin: 5px 0;
        }
        
        .math-cell {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            border-radius: 5px;
        }
        
        .math-cell.droppable {
            border: 2px dashed rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
        }
        
        .math-cell.droppable.drag-over {
            background: rgba(233, 69, 96, 0.2);
            border-color: var(--highlight-color);
        }
        
        .math-cell.droppable.filled {
            background: rgba(46, 204, 113, 0.2);
            border: 2px solid rgba(46, 204, 113, 0.5);
        }
        
        .math-cell.operator {
            background: transparent;
            border: none;
            color: var(--highlight-color);
        }
        
        .number-tile {
            width: 60px;
            height: 60px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            cursor: grab;
            transition: all 0.3s ease;
        }
        
        .number-tile:hover {
            transform: scale(1.1);
            background: rgba(233, 69, 96, 0.2);
            border-color: var(--highlight-color);
        }
        
        .number-tile.dragging {
            opacity: 0.5;
            cursor: grabbing;
        }
        
        .number-tile.used {
            opacity: 0.3;
            cursor: not-allowed;
        }
    `;
        document.head.appendChild(style);
    }
    
    // Generate puzzle: 3x3 grid with simple equations
    // Format: [num] [op] [num] = [result]
    //         [op]
    //         [num]
    //         =
    //         [result]
    
    const puzzle = generateMathPuzzle3();
    
    window.level3Data = {
        puzzle,
        gridState: Array(9).fill(null)
    };
    
    renderMathGrid3();
}

function generateMathPuzzle3() {
    // Simple puzzle: arrange numbers 1-9 in a 3x3 grid
    // Row 1: a + b = c (where positions 0, 1, 2)
    // Row 2: d - e = f (where positions 3, 4, 5)
    // Row 3: g * h = i (where positions 6, 7, 8)
    
    // For simplicity, let's use a predefined solution
    const solutions = [
        { values: [1, 2, 3, 4, 1, 3, 2, 3, 6], ops: ['+', '-', '×'] },
        { values: [2, 3, 5, 6, 2, 4, 1, 4, 4], ops: ['+', '-', '×'] },
        { values: [1, 4, 5, 7, 3, 4, 2, 2, 4], ops: ['+', '-', '×'] }
    ];
    
    const solution = solutions[Math.floor(Math.random() * solutions.length)];
    const availableNumbers = [...solution.values].sort(() => Math.random() - 0.5);
    
    return {
        solution: solution.values,
        operators: solution.ops,
        available: availableNumbers
    };
}

function renderMathGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    const gridDiv = document.getElementById('math-grid');
    gridDiv.innerHTML = '';
    
    // Create 3x3 grid with operators
    // Row format: [0] + [1] = [2]
    //            [3] - [4] = [5]
    //            [6] × [7] = [8]
    
    for (let row = 0; row < 3; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'math-grid-row';
        
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'math-cell';
            
            if (col === 1) {
                // Operator
                cell.classList.add('operator');
                cell.textContent = data.puzzle.operators[row];
            } else if (col === 3) {
                // Equals sign
                cell.classList.add('operator');
                cell.textContent = '=';
            } else {
                // Number slot
                const idx = row * 3 + (col > 3 ? 2 : col);
                cell.classList.add('droppable');
                cell.dataset.index = idx;
                
                if (data.gridState[idx] !== null) {
                    cell.textContent = data.gridState[idx];
                    cell.classList.add('filled');
                }
                
                // Click to clear
                cell.addEventListener('click', () => {
                    if (data.gridState[idx] !== null) {
                        data.gridState[idx] = null;
                        renderMathGrid3();
                        renderNumberPool3();
                    }
                });
            }
            
            rowDiv.appendChild(cell);
        }
        
        gridDiv.appendChild(rowDiv);
    }
    
    renderNumberPool3();
}

function renderNumberPool3() {
    const data = window.level3Data;
    if (!data) return;
    
    const poolDiv = document.getElementById('number-pool');
    poolDiv.innerHTML = '';
    
    const usedNumbers = data.gridState.filter(n => n !== null);
    
    data.puzzle.available.forEach((num, idx) => {
        const tile = document.createElement('div');
        tile.className = 'number-tile';
        tile.textContent = num;
        tile.dataset.number = num;
        
        const timesUsed = usedNumbers.filter(n => n === num).length;
        const timesAvailable = data.puzzle.available.filter(n => n === num).length;
        
        if (timesUsed >= timesAvailable) {
            tile.classList.add('used');
        } else {
            tile.addEventListener('click', () => {
                placeNumberInGrid3(num);
            });
        }
        
        poolDiv.appendChild(tile);
    });
}

function placeNumberInGrid3(number) {
    const data = window.level3Data;
    if (!data) return;
    
    // Find first empty slot
    const emptyIndex = data.gridState.findIndex(n => n === null);
    if (emptyIndex !== -1) {
        data.gridState[emptyIndex] = number;
        renderMathGrid3();
        renderNumberPool3();
    }
}

function calculateResult3(a, b, operator) {
    switch(operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '*': return a * b;
        case '/': return a / b;
        default: return 0;
    }
}

function checkGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    // Check if all slots filled
    if (data.gridState.some(n => n === null)) {
        document.getElementById('feedback3').innerHTML = 
            '<span style="color: #f39c12;">Please fill all slots in the grid!</span>';
        return;
    }
    
    // Check each equation
    const row1Valid = calculateResult3(data.gridState[0], data.gridState[1], data.puzzle.operators[0]) === data.gridState[2];
    const row2Valid = calculateResult3(data.gridState[3], data.gridState[4], data.puzzle.operators[1]) === data.gridState[5];
    const row3Valid = calculateResult3(data.gridState[6], data.gridState[7], data.puzzle.operators[2]) === data.gridState[8];
    
    if (row1Valid && row2Valid && row3Valid) {
        document.getElementById('feedback3').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ Perfect! All equations are correct!</span>';
        
        setTimeout(() => completeLevel(3), 1500);
    } else {
        const errors = [];
        if (!row1Valid) errors.push('Row 1');
        if (!row2Valid) errors.push('Row 2');
        if (!row3Valid) errors.push('Row 3');
        
        document.getElementById('feedback3').innerHTML = 
            `<span style="color: #e74c3c;">Incorrect equations in: ${errors.join(', ')}. Try again!</span>`;
    }
}

function clearGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    data.gridState = Array(9).fill(null);
    renderMathGrid3();
    renderNumberPool3();
    document.getElementById('feedback3').innerHTML = '';
}
