// Level 4: Advanced Code Breaker - Enhanced 6-digit code with timer
function initLevel4() {
    const container = document.getElementById('level-4');
    
    // Cleanup timer if exists
    if (window.level4Data && window.level4Data.timerInterval) {
        clearInterval(window.level4Data.timerInterval);
    }
    
    // Generate random 6-digit code
    const secretCode = Array.from({length: 6}, () => Math.floor(Math.random() * 10));
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 4: Advanced Code Breaker</h2>
                <p>Crack the 6-digit security code before time runs out!</p>
            </div>
            
            <div class="level-narrative">
                A more sophisticated security system guards this chamber. You must crack a 6-digit code 
                with only 12 attempts, and the timer is counting down. 
                Use the enhanced feedback system wisely to deduce the correct sequence!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px; font-size: 1.3rem; color: #f39c12;">
                        Time Remaining: <span id="timer4">180</span>s | 
                        Attempts Left: <span id="attempts4">12</span>/12
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 30px 0;">
                        <input type="number" id="digit4-1" class="code-input4" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4-2" class="code-input4" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4-3" class="code-input4" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4-4" class="code-input4" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4-5" class="code-input4" min="0" max="9" maxlength="1" />
                        <input type="number" id="digit4-6" class="code-input4" min="0" max="9" maxlength="1" />
                    </div>
                    
                    <div id="feedback4" style="min-height: 60px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div id="history4" style="margin-top: 30px; max-height: 300px; overflow-y: auto; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
                        <h3 style="margin-bottom: 15px; font-size: 1.1rem;">Attempt History:</h3>
                        <div id="history-list4"></div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkCode4()" class="btn btn-primary">Submit Code</button>
                <button onclick="initLevel4()" class="btn btn-secondary">Reset Puzzle</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add styles
    if (!document.getElementById('level4-styles')) {
        const style = document.createElement('style');
        style.id = 'level4-styles';
        style.textContent = `
        .code-input4 {
            width: 65px;
            height: 65px;
            font-size: 1.8rem;
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 8px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .code-input4:focus {
            border-color: var(--highlight-color);
            box-shadow: 0 0 15px rgba(233, 69, 96, 0.5);
            transform: scale(1.05);
        }
        
        .code-input4::-webkit-inner-spin-button,
        .code-input4::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        .history-item4 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border-left: 4px solid rgba(233, 69, 96, 0.5);
        }
        
        .digit-row4 {
            display: flex;
            gap: 8px;
        }
        
        .digit-feedback4 {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .correct4 {
            background: rgba(46, 204, 113, 0.3);
            border: 2px solid #2ecc71;
            color: #2ecc71;
        }
        
        .close4 {
            background: rgba(243, 156, 18, 0.3);
            border: 2px solid #f39c12;
            color: #f39c12;
        }
        
        .wrong4 {
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
            color: #e74c3c;
        }
    `;
        document.head.appendChild(style);
    }
    
    // Setup input handlers
    const inputs = container.querySelectorAll('.code-input4');
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
            }
            if (e.target.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
            if (e.key === 'Enter') {
                checkCode4();
            }
        });
    });
    
    inputs[0].focus();
    
    // Initialize level data
    window.level4Data = {
        secretCode,
        attempts: 0,
        maxAttempts: 12,
        timeRemaining: 180,
        timerInterval: null
    };
    
    // Start timer
    window.level4Data.timerInterval = setInterval(() => {
        window.level4Data.timeRemaining--;
        document.getElementById('timer4').textContent = window.level4Data.timeRemaining;
        
        if (window.level4Data.timeRemaining <= 0) {
            clearInterval(window.level4Data.timerInterval);
            document.getElementById('feedback4').innerHTML = 
                `<span style="color: #e74c3c; font-size: 1.3rem;">⏰ Time's Up! The code was: ${window.level4Data.secretCode.join('')}</span>`;
            inputs.forEach(input => input.disabled = true);
            setTimeout(() => initLevel4(), 3000);
        } else if (window.level4Data.timeRemaining <= 30) {
            document.getElementById('timer4').style.color = '#e74c3c';
        } else if (window.level4Data.timeRemaining <= 60) {
            document.getElementById('timer4').style.color = '#f39c12';
        }
    }, 1000);
}

function checkCode4() {
    const data = window.level4Data;
    if (!data) return;
    
    const inputs = document.querySelectorAll('.code-input4');
    const guess = Array.from(inputs).map(input => parseInt(input.value));
    
    // Validate all digits entered
    if (guess.some(d => isNaN(d))) {
        document.getElementById('feedback4').innerHTML = 
            '<span style="color: #e74c3c;">Please enter all 6 digits!</span>';
        return;
    }
    
    data.attempts++;
    document.getElementById('attempts4').textContent = data.maxAttempts - data.attempts;
    
    // Check if correct
    if (JSON.stringify(guess) === JSON.stringify(data.secretCode)) {
        clearInterval(data.timerInterval);
        document.getElementById('feedback4').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ CODE CRACKED! Chamber unlocked!</span>';
        inputs.forEach(input => input.disabled = true);
        setTimeout(() => completeLevel(4), 1500);
        return;
    }
    
    // Provide enhanced feedback
    const feedback = guess.map((digit, i) => {
        if (digit === data.secretCode[i]) {
            return { digit, status: 'correct4', symbol: '✓' };
        } else if (data.secretCode.includes(digit)) {
            return { digit, status: 'close4', symbol: '~' };
        } else {
            return { digit, status: 'wrong4', symbol: '✗' };
        }
    });
    
    // Count exact matches
    const exactMatches = feedback.filter(f => f.status === 'correct4').length;
    const wrongPosition = feedback.filter(f => f.status === 'close4').length;
    
    // Add to history
    const historyList = document.getElementById('history-list4');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item4';
    historyItem.innerHTML = `
        <div class="digit-row4">
            ${feedback.map(f => 
                `<div class="digit-feedback4 ${f.status}">${f.digit}</div>`
            ).join('')}
        </div>
        <div style="font-size: 0.9rem; color: #f39c12;">
            ${exactMatches} correct • ${wrongPosition} misplaced
        </div>
    `;
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    const attemptsLeft = data.maxAttempts - data.attempts;
    
    if (attemptsLeft > 0) {
        document.getElementById('feedback4').innerHTML = 
            `<span style="color: #f39c12;">${exactMatches} digit(s) in correct position, ${wrongPosition} digit(s) in wrong position</span>`;
    } else {
        clearInterval(data.timerInterval);
        document.getElementById('feedback4').innerHTML = 
            `<span style="color: #e74c3c; font-size: 1.3rem;">Out of attempts! The code was: ${data.secretCode.join('')}</span>`;
        inputs.forEach(input => input.disabled = true);
        setTimeout(() => initLevel4(), 3000);
    }
}
