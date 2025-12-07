/**
 * Magic Square 9-Grid
 * A mathematical puzzle where players arrange numbers 1-9 in a 3x3 grid
 * 
 * Game Mechanics:
 * - Place numbers 1-9 in a 3x3 grid
 * - Each row, column, and diagonal must sum to 15
 * - Click-based number placement system
 * - Visual feedback for placed numbers
 * - Hint system available
 * 
 * Level ID: 3
 * Difficulty: Medium
 * Type: Mathematical/Logic
 * 
 * Note: Classic magic square puzzle with fixed magic constant of 15
 */

// Main initialization function for magic square 9-grid
function initMagicSquare9Grid() {
    const container = document.getElementById('level-3');
    
    // Cleanup previous state if it exists
    if (window.level3Data && window.level3Data.clickHandler) {
        document.removeEventListener('click', window.level3Data.clickHandler);
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 3: 9-Number Grid</h2>
                <p>Arrange numbers 1-9 so each row, column, and diagonal sums to 15</p>
            </div>
            
            <div class="level-narrative">
                A mystical 3x3 grid blocks your path forward. Arrange the numbers 1 through 9 
                so that every row, every column, and both diagonals sum to exactly 15. 
                This ancient magic square is the key to unlocking the next chamber.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 30px;">
                        <div style="font-size: 1.1rem; margin-bottom: 15px; color: #f39c12;">
                            Target Sum: 15 (for each row, column, and diagonal)
                        </div>
                    </div>
                    
                    <div id="magic-grid" style="margin: 30px auto;">
                        <!-- Grid will be generated here -->
                    </div>
                    
                    <div id="available-numbers" style="margin: 30px 0;">
                        <h3 style="margin-bottom: 15px;">Available Numbers:</h3>
                        <div id="number-pool" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; max-width: 500px; margin: 0 auto;">
                            <!-- Numbers 1-9 will be generated here -->
                        </div>
                    </div>
                    
                    <div id="feedback3" style="min-height: 60px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div id="hint-section" style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 500px; margin: 20px auto;">
                        <button onclick="showHint3()" class="btn btn-secondary" style="margin-bottom: 10px;">Show Hint</button>
                        <div id="hint-text" style="font-size: 0.9rem; opacity: 0.8; display: none;"></div>
                    </div>
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
        .magic-grid-container {
            display: inline-grid;
            grid-template-columns: repeat(3, 80px);
            grid-template-rows: repeat(3, 80px);
            gap: 8px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            border: 3px solid var(--highlight-color);
        }
        
        .magic-cell {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 8px;
            border: 2px dashed rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .magic-cell:hover {
            background: rgba(233, 69, 96, 0.1);
            border-color: var(--highlight-color);
            transform: scale(1.05);
        }
        
        .magic-cell.filled {
            background: rgba(46, 204, 113, 0.2);
            border: 2px solid rgba(46, 204, 113, 0.5);
            color: #2ecc71;
        }
        
        .magic-cell.filled:hover {
            background: rgba(46, 204, 113, 0.3);
        }
        
        .number-tile3 {
            width: 60px;
            height: 60px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: bold;
            background: linear-gradient(135deg, rgba(233, 69, 96, 0.2), rgba(233, 69, 96, 0.1));
            border: 2px solid rgba(233, 69, 96, 0.5);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #fff;
        }
        
        .number-tile3:hover {
            transform: scale(1.15);
            background: linear-gradient(135deg, rgba(233, 69, 96, 0.4), rgba(233, 69, 96, 0.2));
            border-color: var(--highlight-color);
            box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
        }
        
        .number-tile3.used {
            opacity: 0.3;
            cursor: not-allowed;
            filter: grayscale(1);
        }
        
        .number-tile3.used:hover {
            transform: none;
            box-shadow: none;
        }
        
        .number-tile3.selected {
            background: linear-gradient(135deg, rgba(46, 204, 113, 0.4), rgba(46, 204, 113, 0.2));
            border-color: #2ecc71;
            box-shadow: 0 0 25px rgba(46, 204, 113, 0.6);
        }
    `;
        document.head.appendChild(style);
    }
    
    // Initialize game state
    window.level3Data = {
        gridState: Array(9).fill(null),
        selectedNumber: null
    };
    
    renderMagicGrid3();
    renderNumberPool3();
}

function renderMagicGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    const gridDiv = document.getElementById('magic-grid');
    gridDiv.innerHTML = '';
    gridDiv.className = 'magic-grid-container';
    
    // Create 3x3 grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'magic-cell';
        cell.dataset.index = i;
        
        if (data.gridState[i] !== null) {
            cell.textContent = data.gridState[i];
            cell.classList.add('filled');
        }
        
        cell.addEventListener('click', () => {
            if (data.selectedNumber !== null && data.gridState[i] === null) {
                // Place number
                data.gridState[i] = data.selectedNumber;
                data.selectedNumber = null;
                renderMagicGrid3();
                renderNumberPool3();
            } else if (data.gridState[i] !== null) {
                // Remove number
                data.gridState[i] = null;
                renderMagicGrid3();
                renderNumberPool3();
            }
        });
        
        gridDiv.appendChild(cell);
    }
}

function renderNumberPool3() {
    const data = window.level3Data;
    if (!data) return;
    
    const poolDiv = document.getElementById('number-pool');
    poolDiv.innerHTML = '';
    
    for (let num = 1; num <= 9; num++) {
        const tile = document.createElement('div');
        tile.className = 'number-tile3';
        tile.textContent = num;
        
        const isUsed = data.gridState.includes(num);
        
        if (isUsed) {
            tile.classList.add('used');
        } else {
            if (data.selectedNumber === num) {
                tile.classList.add('selected');
            }
            
            tile.addEventListener('click', () => {
                if (!isUsed) {
                    data.selectedNumber = data.selectedNumber === num ? null : num;
                    renderNumberPool3();
                }
            });
        }
        
        poolDiv.appendChild(tile);
    }
}

function checkGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    // Check if all slots filled
    if (data.gridState.some(n => n === null)) {
        document.getElementById('feedback3').innerHTML = 
            '<span style="color: #f39c12;">⚠ Please fill all 9 cells in the grid!</span>';
        return;
    }
    
    // Check magic square: all rows, columns, and diagonals sum to 15
    const grid = data.gridState;
    const targetSum = 15;
    
    // Check rows
    const row1 = grid[0] + grid[1] + grid[2];
    const row2 = grid[3] + grid[4] + grid[5];
    const row3 = grid[6] + grid[7] + grid[8];
    
    // Check columns
    const col1 = grid[0] + grid[3] + grid[6];
    const col2 = grid[1] + grid[4] + grid[7];
    const col3 = grid[2] + grid[5] + grid[8];
    
    // Check diagonals
    const diag1 = grid[0] + grid[4] + grid[8];
    const diag2 = grid[2] + grid[4] + grid[6];
    
    const allSums = [row1, row2, row3, col1, col2, col3, diag1, diag2];
    const allCorrect = allSums.every(sum => sum === targetSum);
    
    if (allCorrect) {
        document.getElementById('feedback3').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ Perfect! You\'ve solved the Magic Square!</span>';
        
        setTimeout(() => completeLevel(3), 1500);
    } else {
        const errors = [];
        if (row1 !== targetSum) errors.push('Row 1');
        if (row2 !== targetSum) errors.push('Row 2');
        if (row3 !== targetSum) errors.push('Row 3');
        if (col1 !== targetSum) errors.push('Column 1');
        if (col2 !== targetSum) errors.push('Column 2');
        if (col3 !== targetSum) errors.push('Column 3');
        if (diag1 !== targetSum) errors.push('Main Diagonal');
        if (diag2 !== targetSum) errors.push('Anti Diagonal');
        
        document.getElementById('feedback3').innerHTML = 
            `<span style="color: #e74c3c;">✗ Incorrect sums in: ${errors.slice(0, 3).join(', ')}${errors.length > 3 ? '...' : ''}. Try again!</span>`;
    }
}

function clearGrid3() {
    const data = window.level3Data;
    if (!data) return;
    
    data.gridState = Array(9).fill(null);
    data.selectedNumber = null;
    renderMagicGrid3();
    renderNumberPool3();
    document.getElementById('feedback3').innerHTML = '';
    document.getElementById('hint-text').style.display = 'none';
}

function showHint3() {
    const hintText = document.getElementById('hint-text');
    if (hintText.style.display === 'none' || !hintText.style.display) {
        hintText.style.display = 'block';
        hintText.innerHTML = `
            <strong>Hint:</strong> In a 3×3 magic square where each row, column, and diagonal sums to 15:
            <br>• The center cell should contain 5
            <br>• Corner cells contain even numbers (2, 4, 6, 8)
            <br>• Edge cells (middle of sides) contain odd numbers (1, 3, 7, 9)
            <br>• One valid solution: Place 2 in top-left, 9 in top-middle, 4 in top-right...
        `;
    } else {
        hintText.style.display = 'none';
    }
}

// Backward compatibility: keep old function names as aliases
function initLevel3() { initMagicSquare9Grid(); }
