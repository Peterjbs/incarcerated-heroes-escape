/**
 * 2-Word Anagram Solver
 * A word puzzle where players unscramble adjective-noun pairs
 * 
 * Game Mechanics:
 * - 4 scrambled adjective-noun phrases to solve
 * - Must solve at least 50% to proceed (allows skipping difficult ones)
 * - Hints available to reveal the individual words
 * - Progress tracking with visual progress bar
 * - Auto-uppercase input for consistency
 * 
 * Level ID: 2
 * Difficulty: Easy-Medium
 * Type: Word/Linguistic
 */

// Main initialization function for 2-word anagram solver
function initAnagramSolver2Word() {
    const container = document.getElementById('level-2');
    
    // Anagram word pairs (adjective-noun combinations)
    const wordPairs = [
        { scrambled: 'RKDA ESRFTO', answer: 'DARK FOREST', adjective: 'DARK', noun: 'FOREST' },
        { scrambled: 'DIHNDE OODR', answer: 'HIDDEN DOOR', adjective: 'HIDDEN', noun: 'DOOR' },
        { scrambled: 'TCESER TAPH', answer: 'SECRET PATH', adjective: 'SECRET', noun: 'PATH' },
        { scrambled: 'CEINTA KCOL', answer: 'ANCIENT LOCK', adjective: 'ANCIENT', noun: 'LOCK' }
    ];
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 2: 2-Word Anagram Solver</h2>
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
                <button onclick="submitAnagramSolver2Word()" class="btn btn-primary">Submit Answer</button>
                <button onclick="showHintAnagramSolver2Word()" class="btn btn-secondary">Show Hint</button>
                <button onclick="skipAnagramSolver2Word()" class="btn btn-warning" style="background: var(--warning-color);">Skip Phrase</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize game state
    window.anagramSolver2WordData = {
        wordPairs,
        currentPairIndex: 0,
        solvedCount: 0,
        hintShown: false
    };
    
    // Display first puzzle
    displayCurrentAnagramPair();
    
    // Setup event listeners
    const answerInput = document.getElementById('answer-input');
    
    // Enter key to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnagramSolver2Word();
        }
    });
    
    // Auto-uppercase input for consistency
    answerInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

/**
 * Display the current anagram pair and reset UI elements
 */
function displayCurrentAnagramPair() {
    const data = window.anagramSolver2WordData;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    // Update display
    document.getElementById('scrambled-word').textContent = pair.scrambled;
    document.getElementById('pair-number').textContent = data.currentPairIndex + 1;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
    document.getElementById('feedback2').innerHTML = '';
    document.getElementById('hint-area').innerHTML = '';
    
    // Update progress bar
    const progress = (data.solvedCount / data.wordPairs.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Reset hint flag
    data.hintShown = false;
}

/**
 * Check player's answer and provide feedback
 */
function submitAnagramSolver2Word() {
    const data = window.anagramSolver2WordData;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    const userAnswer = document.getElementById('answer-input').value.trim().toUpperCase();
    
    // Validate input
    if (!userAnswer) {
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #f39c12;">Please enter an answer!</span>';
        return;
    }
    
    // Check if answer is correct
    if (userAnswer === pair.answer) {
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Correct! Well done!</span>';
        
        data.solvedCount++;
        data.currentPairIndex++;
        
        // Check if all pairs solved
        if (data.currentPairIndex >= data.wordPairs.length) {
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #2ecc71; font-size: 1.5rem;">🎉 All phrases decoded! The path is clear!</span>';
                setTimeout(() => completeLevel(2), 1500);
            }, 1000);
        } else {
            // Move to next pair
            setTimeout(() => displayCurrentAnagramPair(), 1500);
        }
    } else {
        // Wrong answer feedback
        document.getElementById('feedback2').innerHTML = 
            '<span style="color: #e74c3c;">Not quite right. Try again!</span>';
        
        // Visual shake animation for wrong answer
        const input = document.getElementById('answer-input');
        input.style.animation = 'shake 0.5s';
        setTimeout(() => input.style.animation = '', 500);
    }
}

/**
 * Show hint revealing the adjective and noun
 */
function showHintAnagramSolver2Word() {
    const data = window.anagramSolver2WordData;
    if (!data || data.hintShown) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    document.getElementById('hint-area').innerHTML = 
        `<span style="color: #3498db;">💡 Hint: The adjective is "${pair.adjective}" and the noun is "${pair.noun}"</span>`;
    
    data.hintShown = true;
}

/**
 * Skip current puzzle and move to next
 * Must solve at least 50% to complete level
 */
function skipAnagramSolver2Word() {
    const data = window.anagramSolver2WordData;
    if (!data) return;
    
    const pair = data.wordPairs[data.currentPairIndex];
    
    // Show skipped answer
    document.getElementById('feedback2').innerHTML = 
        `<span style="color: #f39c12;">Skipped. The answer was: ${pair.answer}</span>`;
    
    data.currentPairIndex++;
    
    // Check if all pairs have been attempted
    if (data.currentPairIndex >= data.wordPairs.length) {
        // Require at least 50% solved to pass
        const requiredSolved = Math.ceil(data.wordPairs.length / 2);
        if (data.solvedCount >= requiredSolved) {
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #2ecc71; font-size: 1.3rem;">You solved enough puzzles to proceed!</span>';
                setTimeout(() => completeLevel(2), 1500);
            }, 1000);
        } else {
            // Not enough solved - restart
            setTimeout(() => {
                document.getElementById('feedback2').innerHTML = 
                    '<span style="color: #e74c3c;">You need to solve more puzzles. Restarting...</span>';
                setTimeout(() => initAnagramSolver2Word(), 2000);
            }, 1000);
        }
    } else {
        // Move to next pair
        setTimeout(() => displayCurrentAnagramPair(), 1500);
    }
}

// Add CSS animation for shake effect (only once)
if (!document.getElementById('anagram-solver-2word-styles')) {
    const style = document.createElement('style');
    style.id = 'anagram-solver-2word-styles';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// Backward compatibility: keep old function names as aliases
function initLevel2() { initAnagramSolver2Word(); }
function checkAnswer2() { submitAnagramSolver2Word(); }
function showHint2() { showHintAnagramSolver2Word(); }
function skipAnagram2() { skipAnagramSolver2Word(); }
function displayCurrentPair2() { displayCurrentAnagramPair(); }
