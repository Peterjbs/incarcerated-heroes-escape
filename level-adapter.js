/**
 * Level Adapter
 * Provides wrapper functions to connect the refactored minigames 
 * with the dynamic 36-level system.
 * 
 * The adapter:
 * - Routes level IDs to appropriate minigame init functions
 * - Passes variant configurations
 * - Handles level code display
 * - Adds navigation buttons and instructions
 */

/**
 * Universal minigame wrapper that adds common UI elements
 */
function wrapMinigameUI(containerId, levelCode, themeId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Add level code display and navigation to the container
    const levelCodeDisplay = document.createElement('div');
    levelCodeDisplay.className = 'level-code-display';
    levelCodeDisplay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        padding: 8px 15px;
        border-radius: 5px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        z-index: 1000;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.3);
    `;
    levelCodeDisplay.innerHTML = `
        <div style="opacity: 0.7; font-size: 0.75rem; margin-bottom: 3px;">Level Code:</div>
        <div style="font-weight: bold; letter-spacing: 1px;">${levelCode}</div>
    `;
    
    // Add to body for fixed positioning
    document.body.appendChild(levelCodeDisplay);
    
    // Store reference for cleanup
    if (!window.minigameUIElements) {
        window.minigameUIElements = [];
    }
    window.minigameUIElements.push(levelCodeDisplay);
}

/**
 * Clean up minigame UI elements
 */
function cleanupMinigameUI() {
    if (window.minigameUIElements) {
        window.minigameUIElements.forEach(el => {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        window.minigameUIElements = [];
    }
}

/**
 * Add instructions panel to a minigame
 */
function addInstructionsPanel(containerId, instructions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const instructionsButton = document.createElement('button');
    instructionsButton.className = 'btn btn-info instructions-toggle';
    instructionsButton.textContent = '❓ Instructions';
    instructionsButton.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1000;
        padding: 10px 15px;
        font-size: 0.9rem;
    `;
    
    instructionsButton.onclick = () => {
        const panel = document.getElementById('instructions-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    const instructionsPanel = document.createElement('div');
    instructionsPanel.id = 'instructions-panel';
    instructionsPanel.style.cssText = `
        position: fixed;
        top: 60px;
        left: 10px;
        max-width: 400px;
        background: rgba(0, 0, 0, 0.9);
        padding: 20px;
        border-radius: 8px;
        z-index: 999;
        display: none;
        color: white;
        max-height: 70vh;
        overflow-y: auto;
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    instructionsPanel.innerHTML = `
        <h3 style="margin-top: 0; color: var(--highlight-color);">How to Play</h3>
        ${instructions}
    `;
    
    document.body.appendChild(instructionsButton);
    document.body.appendChild(instructionsPanel);
    
    if (!window.minigameUIElements) {
        window.minigameUIElements = [];
    }
    window.minigameUIElements.push(instructionsButton, instructionsPanel);
}

/**
 * Enhanced navigation that includes Next level button
 */
function enhanceNavigation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Find the level controls div
    const controls = container.querySelector('.level-controls');
    if (!controls) return;
    
    // Get current level ID from container
    const levelId = parseInt(containerId.replace('level-', ''));
    const currentLevel = GameState.levels.find(l => l.id === levelId);
    
    if (!currentLevel) return;
    
    // Find next unlocked level
    const nextLevel = GameState.levels.find(l => l.id > levelId && l.unlocked);
    
    // Add Next button if there's a next level
    if (nextLevel) {
        const existingNext = controls.querySelector('.btn-next');
        if (!existingNext) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-primary btn-next';
            nextBtn.textContent = 'Next Level ➔';
            nextBtn.onclick = () => {
                cleanupMinigameUI();
                startLevel(nextLevel.id);
            };
            
            // Insert before the Back button
            const backBtn = controls.querySelector('.btn-back');
            if (backBtn) {
                controls.insertBefore(nextBtn, backBtn);
            } else {
                controls.appendChild(nextBtn);
            }
        }
    }
}

/**
 * Adapter functions for each minigame type
 * These wrap the original init functions and pass the correct level ID
 */

// Code Breaker 4-Digit Adapter
window.initCodeBreaker4Digit = function(levelId = 1) {
    const containerId = `level-${levelId}`;
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const config = window.currentLevelConfig || {};
    const variantConfig = config.variantConfig || { digits: 4, attempts: 10, allowRepeats: true };
    
    // Clean up any existing UI elements
    cleanupMinigameUI();
    
    // Add level code display
    wrapMinigameUI(containerId, config.code || 'CB4-V0-S00-42', config.themeId || 'midnight');
    
    // Generate secret code with variant config
    const secretCode = Array.from({length: variantConfig.digits || 4}, () => 
        Math.floor(Math.random() * 10)
    );
    const maxAttempts = variantConfig.attempts || 10;
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>4-Digit Code Breaker</h2>
                <p>Crack the ${variantConfig.digits || 4}-digit security code</p>
            </div>
            
            <div class="level-narrative">
                The cold metal door stands before you, its electronic lock blinking red. 
                ${variantConfig.digits || 4} digits stand between you and freedom. You have ${maxAttempts} attempts 
                before the alarm triggers. Choose wisely, hero.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 20px;">
                        ${Array.from({length: variantConfig.digits || 4}).map((_, i) => 
                            `<input type="number" id="digit${i+1}" class="code-input" min="0" max="9" maxlength="1" />`
                        ).join('')}
                    </div>
                    <div id="feedback" style="min-height: 60px; margin-bottom: 20px; font-size: 1.1rem;"></div>
                    <div id="attempts-left" style="margin-bottom: 20px; font-size: 1.1rem; color: #f39c12;">
                        Attempts remaining: ${maxAttempts}
                    </div>
                    <div id="history" style="margin-top: 20px; max-height: 200px; overflow-y: auto;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="submitCodeBreaker('${containerId}', ${levelId})" class="btn btn-primary">Submit Code</button>
                <button onclick="resetCodeBreaker('${containerId}')" class="btn btn-secondary">Reset</button>
                <button onclick="cleanupMinigameUI(); showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add instructions
    addInstructionsPanel(containerId, `
        <p><strong>Objective:</strong> Crack the ${variantConfig.digits || 4}-digit code</p>
        <p><strong>Attempts:</strong> ${maxAttempts}</p>
        <p><strong>Feedback System:</strong></p>
        <ul>
            <li>✓ = Correct digit in correct position</li>
            <li>~ = Correct digit in wrong position</li>
            <li>✗ = Digit not in code</li>
        </ul>
        <p><strong>Controls:</strong> Enter digits and click Submit</p>
    `);
    
    // Enhance navigation
    enhanceNavigation(containerId);
    
    // Store game state
    window.codeBreaker4DigitData = {
        containerId,
        levelId,
        secretCode,
        maxAttempts,
        attempts: 0,
        history: []
    };
    
    // Setup auto-advance for inputs
    setupCodeInputs(variantConfig.digits || 4);
};

// Helper function for code inputs
function setupCodeInputs(digitCount) {
    for (let i = 1; i <= digitCount; i++) {
        const input = document.getElementById(`digit${i}`);
        if (input) {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && i < digitCount) {
                    document.getElementById(`digit${i+1}`)?.focus();
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && i > 1) {
                    document.getElementById(`digit${i-1}`)?.focus();
                }
                if (e.key === 'Enter') {
                    const data = window.codeBreaker4DigitData;
                    if (data) {
                        submitCodeBreaker(data.containerId, data.levelId);
                    }
                }
            });
        }
    }
    
    // Focus first input
    document.getElementById('digit1')?.focus();
}

// Submit function for code breaker
function submitCodeBreaker(containerId, levelId) {
    const data = window.codeBreaker4DigitData;
    if (!data) return;
    
    const digitCount = data.secretCode.length;
    const guess = [];
    
    for (let i = 1; i <= digitCount; i++) {
        const input = document.getElementById(`digit${i}`);
        const value = parseInt(input?.value || '');
        if (isNaN(value)) {
            alert('Please enter all digits');
            return;
        }
        guess.push(value);
    }
    
    data.attempts++;
    
    // Check if correct
    if (guess.every((digit, i) => digit === data.secretCode[i])) {
        document.getElementById('feedback').innerHTML = `
            <div style="color: var(--success-color); font-size: 1.5rem;">
                ✓ CODE CRACKED! Access Granted!
            </div>
        `;
        setTimeout(() => {
            completeLevel(levelId);
        }, 1500);
        return;
    }
    
    // Generate feedback
    const feedback = guess.map((digit, i) => {
        if (digit === data.secretCode[i]) return '✓';
        if (data.secretCode.includes(digit)) return '~';
        return '✗';
    });
    
    // Update UI
    document.getElementById('feedback').innerHTML = `
        <div style="display: flex; justify-content: center; gap: 10px; font-size: 1.5rem;">
            ${feedback.map(f => `<span>${f}</span>`).join('')}
        </div>
    `;
    
    const attemptsLeft = data.maxAttempts - data.attempts;
    document.getElementById('attempts-left').textContent = `Attempts remaining: ${attemptsLeft}`;
    
    // Add to history
    const historyItem = document.createElement('div');
    historyItem.style.cssText = 'display: flex; justify-content: center; gap: 10px; margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;';
    historyItem.innerHTML = `
        <span style="font-weight: bold;">${guess.join(' ')}</span>
        <span>→</span>
        <span>${feedback.join(' ')}</span>
    `;
    document.getElementById('history').prepend(historyItem);
    
    // Check if out of attempts
    if (data.attempts >= data.maxAttempts) {
        document.getElementById('feedback').innerHTML = `
            <div style="color: var(--highlight-color);">
                Out of attempts! The code was: ${data.secretCode.join(' ')}
            </div>
        `;
    } else {
        // Clear inputs for next attempt
        for (let i = 1; i <= digitCount; i++) {
            const input = document.getElementById(`digit${i}`);
            if (input) input.value = '';
        }
        document.getElementById('digit1')?.focus();
    }
}

// Reset function for code breaker
function resetCodeBreaker(containerId) {
    const data = window.codeBreaker4DigitData;
    if (!data) return;
    
    // Reinitialize the level
    initCodeBreaker4Digit(data.levelId);
}

// Export adapter functions
window.LevelAdapter = {
    wrapMinigameUI,
    cleanupMinigameUI,
    addInstructionsPanel,
    enhanceNavigation
};
