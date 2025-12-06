// Level 1: Code Breaker - Crack a 4-digit code
function initLevel1() {
    const container = document.getElementById('level-1');
    
    // Generate random 4-digit code
    const secretCode = Array.from({length: 4}, () => Math.floor(Math.random() * 10));
    let attempts = 0;
    const maxAttempts = 10;
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 1: Code Breaker</h2>
                <p>Crack the 4-digit security code to unlock the first door</p>
            </div>
            
            <div class="level-narrative">
                The cold metal door stands before you, its electronic lock blinking red. 
                Four digits stand between you and freedom. You have ${maxAttempts} attempts 
                before the alarm triggers. Choose wisely, hero.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 20px;">
                        <input type="number" id="digit1" class="code-input" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit2" class="code-input" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit3" class="code-input" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4" class="code-input" min="0" max="9" maxlength="1" />
                    </div>
                    <div id="feedback" style="min-height: 60px; margin-bottom: 20px; font-size: 1.1rem;"></div>
                    <div id="attempts-left" style="margin-bottom: 20px; font-size: 1.1rem; color: #f39c12;">
                        Attempts remaining: ${maxAttempts}
                    </div>
                    <div id="history" style="margin-top: 20px; max-height: 200px; overflow-y: auto;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkCode1()" class="btn btn-primary">Submit Code</button>
                <button onclick="resetLevel1()" class="btn btn-secondary">Reset</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add styles for code inputs
    if (!document.getElementById('level1-styles')) {
        const style = document.createElement('style');
        style.id = 'level1-styles';
        style.textContent = `
        .code-input {
            width: 70px;
            height: 70px;
            font-size: 2rem;
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 8px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .code-input:focus {
            border-color: var(--highlight-color);
            box-shadow: 0 0 15px rgba(233, 69, 96, 0.5);
        }
        
        .code-input::-webkit-inner-spin-button,
        .code-input::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        .history-item {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 10px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 5px;
        }
        
        .digit-feedback {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .correct {
            background: rgba(46, 204, 113, 0.3);
            border: 2px solid #2ecc71;
        }
        
        .close {
            background: rgba(243, 156, 18, 0.3);
            border: 2px solid #f39c12;
        }
        
        .wrong {
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
        }
    `;
        document.head.appendChild(style);
    }
    
    // Auto-focus and auto-advance inputs
    const inputs = container.querySelectorAll('.code-input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            // Limit to single digit
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
            }
            
            // Auto-advance to next input
            if (e.target.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            // Backspace handling
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
            
            // Enter to submit
            if (e.key === 'Enter') {
                checkCode1();
            }
        });
    });
    
    inputs[0].focus();
    
    // Store secret code and attempt count
    window.level1Data = {
        secretCode,
        attempts: 0,
        maxAttempts
    };
}

function checkCode1() {
    const data = window.level1Data;
    if (!data) return;
    
    const inputs = document.querySelectorAll('.code-input');
    const guess = Array.from(inputs).map(input => parseInt(input.value) || 0);
    
    // Validate all digits entered
    if (inputs[0].value === '' || inputs[1].value === '' || 
        inputs[2].value === '' || inputs[3].value === '') {
        document.getElementById('feedback').innerHTML = 
            '<span style="color: #e74c3c;">Please enter all 4 digits!</span>';
        return;
    }
    
    data.attempts++;
    
    // Check if correct
    if (JSON.stringify(guess) === JSON.stringify(data.secretCode)) {
        document.getElementById('feedback').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ CODE CORRECT! Door unlocked!</span>';
        
        // Disable inputs
        inputs.forEach(input => input.disabled = true);
        
        // Complete level after short delay
        setTimeout(() => completeLevel(1), 1500);
        return;
    }
    
    // Provide feedback
    const feedback = guess.map((digit, i) => {
        if (digit === data.secretCode[i]) {
            return { digit, status: 'correct', text: '✓' };
        } else if (data.secretCode.includes(digit)) {
            return { digit, status: 'close', text: '~' };
        } else {
            return { digit, status: 'wrong', text: '✗' };
        }
    });
    
    // Add to history
    const historyDiv = document.getElementById('history');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = feedback.map(f => 
        `<div class="digit-feedback ${f.status}">${f.digit}<br>${f.text}</div>`
    ).join('');
    historyDiv.insertBefore(historyItem, historyDiv.firstChild);
    
    const attemptsLeft = data.maxAttempts - data.attempts;
    document.getElementById('attempts-left').textContent = 
        `Attempts remaining: ${attemptsLeft}`;
    
    if (attemptsLeft > 0) {
        document.getElementById('feedback').innerHTML = 
            '<span style="color: #f39c12;">Not quite right. Check the feedback below!</span><br>' +
            '<span style="font-size: 0.9rem; opacity: 0.8;">✓ = Correct position | ~ = Wrong position | ✗ = Not in code</span>';
    } else {
        document.getElementById('feedback').innerHTML = 
            `<span style="color: #e74c3c;">Out of attempts! The code was: ${data.secretCode.join('')}</span>`;
        inputs.forEach(input => input.disabled = true);
        setTimeout(() => resetLevel1(), 3000);
    }
}

function resetLevel1() {
    initLevel1();
}
