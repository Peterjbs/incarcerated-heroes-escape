// Level 2: Anagram Solver - Rearrange letters for adjective-noun pairs
function initLevel2() {
    const container = document.getElementById('level-2');
    
    // Anagram word pairs (adjective-noun)
    const wordPairs = [
        { scrambled: 'RKDA ESRFTO', answer: 'DARK FOREST', adjective: 'DARK', noun: 'FOREST' },
        { scrambled: 'DIHNDE OODR', answer: 'HIDDEN DOOR', adjective: 'HIDDEN', noun: 'DOOR' },
        { scrambled: 'TCESER TAPH', answer: 'SECRET PATH', adjective: 'SECRET', noun: 'PATH' },
        { scrambled: 'CEINTA KLOCEFDB', answer: 'ANCIENT LOCK', adjective: 'ANCIENT', noun: 'LOCK' }
    ];
    
    let currentPairIndex = 0;
    let solvedCount = 0;
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 2: Anagram Solver</h2>
                <p>Rearrange the scrambled letters to reveal the hidden phrases</p>
            </div>
            
            <div class="level-narrative">
                Ancient inscriptions cover the walls, their letters scrambled by time. 
                Decode these ${wordPairs.length} mystical phrases to reveal the path forward. 
                Each phrase is an adjective followed by a noun.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.2rem; margin-bottom: 10px;">
                            Phrase <span id="pair-number">1</span> of ${wordPairs.length}
                        </div>
                        <div id="progress-bar" style="background: rgba(255,255,255,0.1); height: 20px; border-radius: 10px; overflow: hidden; margin: 0 auto; max-width: 400px;">
                            <div id="progress-fill" style="background: linear-gradient(90deg, var(--highlight-color), #ff6b9d); height: 100%; width: 0%; transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                    
                    <div id="scrambled-word" style="font-size: 2.5rem; font-weight: bold; letter-spacing: 8px; margin: 30px 0; color: var(--highlight-color); min-height: 60px;">
                    </div>
                    
                    <div style="margin: 30px 0;">
                        <input type="text" id="answer-input" placeholder="Enter your answer..." 
                               style="width: 100%; max-width: 500px; padding: 15px; font-size: 1.2rem; text-align: center; 
                                      border: 2px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); 
                                      color: white; border-radius: 8px; outline: none; text-transform: uppercase;"
                               autocomplete="off" />
                    </div>
                    
                    <div id="feedback2" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div id="hint-area" style="margin: 20px 0; min-height: 30px; font-size: 0.9rem; opacity: 0.7;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkAnswer2()" class="btn btn-primary">Submit Answer</button>
                <button onclick="showHint2()" class="btn btn-secondary">Show Hint</button>
                <button onclick="skipAnagram2()" class="btn btn-warning" style="background: var(--warning-color);">Skip Phrase</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    window.level2Data = {
        wordPairs,
        currentPairIndex: 0,
        solvedCount: 0,
        hintShown: false
    };
    
    displayCurrentPair2();
    
    // Enter key to submit
    document.getElementById('answer-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer2();
        }
    });
    
    // Auto-uppercase input
    document.getElementById('answer-input').addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

function displayCurrentPair2() {
    const data = window.level2Data;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    document.getElementById('scrambled-word').textContent = pair.scrambled;
    document.getElementById('pair-number').textContent = data.currentPairIndex + 1;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
    document.getElementById('feedback2').innerHTML = '';
    document.getElementById('hint-area').innerHTML = '';
    
    const progress = ((data.solvedCount) / data.wordPairs.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    data.hintShown = false;
}

function checkAnswer2() {
    const data = window.level2Data;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    const userAnswer = document.getElementById('answer-input').value.trim().toUpperCase();
    
    if (!userAnswer) {
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #f39c12;">Please enter an answer!</span>';
        return;
    }
    
    if (userAnswer === pair.answer) {
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Correct! Well done!</span>';
        
        data.solvedCount++;
        data.currentPairIndex++;
        
        if (data.currentPairIndex >= data.wordPairs.length) {
            // All pairs solved
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #2ecc71; font-size: 1.5rem;">🎉 All phrases decoded! The path is clear!</span>';
                setTimeout(() => completeLevel(2), 1500);
            }, 1000);
        } else {
            // Move to next pair
            setTimeout(() => displayCurrentPair2(), 1500);
        }
    } else {
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #e74c3c;">Not quite right. Try again!</span>';
        
        // Shake animation
        const input = document.getElementById('answer-input');
        input.style.animation = 'shake 0.5s';
        setTimeout(() => input.style.animation = '', 500);
    }
}

function showHint2() {
    const data = window.level2Data;
    if (!data || data.hintShown) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    document.getElementById('hint-area').innerHTML = 
        `<span style="color: #3498db;">💡 Hint: The adjective is "${pair.adjective}" and the noun is "${pair.noun}"</span>`;
    
    data.hintShown = true;
}

function skipAnagram2() {
    const data = window.level2Data;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    document.getElementById('feedback2').innerHTML = 
        `<span style="color: #f39c12;">Skipped. The answer was: ${pair.answer}</span>`;
    
    data.currentPairIndex++;
    
    if (data.currentPairIndex >= data.wordPairs.length) {
        if (data.solvedCount >= Math.ceil(data.wordPairs.length / 2)) {
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #2ecc71; font-size: 1.3rem;">You solved enough puzzles to proceed!</span>';
                setTimeout(() => completeLevel(2), 1500);
            }, 1000);
        } else {
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #e74c3c;">You need to solve more puzzles. Restarting...</span>';
                setTimeout(() => initLevel2(), 2000);
            }, 1000);
        }
    } else {
        setTimeout(() => displayCurrentPair2(), 1500);
    }
}

// Add shake animation
const style2 = document.createElement('style');
style2.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style2);
