// Level 6: Tactical Trivia Slots - Answer trivia to control a slot machine
function initLevel6() {
    const container = document.getElementById('level-6');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 6: Tactical Trivia Slots</h2>
                <p>Answer trivia questions to align the slots and unlock the door</p>
            </div>
            
            <div class="level-narrative">
                A mystical slot machine blocks the corridor, its reels spinning with ancient symbols. 
                Answer trivia questions correctly to control the reels. 
                Align three matching symbols to break the seal and proceed.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin: 30px 0;">
                        <div id="slot-machine" style="display: flex; justify-content: center; gap: 20px; margin: 30px 0;">
                            <div class="slot-reel" id="reel1">?</div>
                            <div class="slot-reel" id="reel2">?</div>
                            <div class="slot-reel" id="reel3">?</div>
                        </div>
                        <div id="slot-status" style="font-size: 1.3rem; margin: 20px 0; min-height: 40px;"></div>
                    </div>
                    
                    <div style="margin: 30px 0; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <div id="question-area">
                            <h3 style="margin-bottom: 15px;">Trivia Question:</h3>
                            <div id="question-text" style="font-size: 1.2rem; margin: 20px 0; line-height: 1.8; min-height: 60px;"></div>
                            
                            <div id="answer-options" style="display: grid; grid-template-columns: 1fr; gap: 10px; max-width: 500px; margin: 20px auto;">
                            </div>
                        </div>
                    </div>
                    
                    <div id="feedback6" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin-top: 20px; font-size: 1rem; opacity: 0.8;">
                        Correct Answers: <span id="correct-count">0</span> / <span id="total-questions">5</span>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel6()" class="btn btn-secondary">Reset Puzzle</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add slot machine styles
    const style = document.createElement('style');
    style.textContent = `
        .slot-reel {
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            background: rgba(255, 255, 255, 0.05);
            border: 3px solid var(--highlight-color);
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(233, 69, 96, 0.3);
        }
        
        .slot-reel.spinning {
            animation: spin 0.5s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        
        .answer-option {
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
        }
        
        .answer-option:hover {
            background: rgba(233, 69, 96, 0.2);
            border-color: var(--highlight-color);
            transform: translateX(5px);
        }
        
        .answer-option.correct {
            background: rgba(46, 204, 113, 0.3);
            border-color: #2ecc71;
        }
        
        .answer-option.incorrect {
            background: rgba(231, 76, 60, 0.3);
            border-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
    
    // Trivia questions
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            correct: 1,
            symbol: "🗼"
        },
        {
            question: "What is 2 + 2 × 2?",
            options: ["6", "8", "4", "10"],
            correct: 0,
            symbol: "🔢"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Jupiter", "Mars", "Saturn"],
            correct: 2,
            symbol: "🔴"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3,
            symbol: "🌊"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
            correct: 1,
            symbol: "🎨"
        },
        {
            question: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correct: 2,
            symbol: "🔢"
        },
        {
            question: "Which programming language is known for AI?",
            options: ["Java", "C++", "Python", "Ruby"],
            correct: 2,
            symbol: "🐍"
        }
    ];
    
    // Randomize and select questions
    const selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    
    window.level6Data = {
        questions: selectedQuestions,
        currentQuestion: 0,
        correctCount: 0,
        reels: ['?', '?', '?'],
        symbols: ['🗼', '🔢', '🔴', '🌊', '🎨', '🐍', '⭐', '💎']
    };
    
    displayQuestion6();
}

function displayQuestion6() {
    const data = window.level6Data;
    
    if (data.currentQuestion >= data.questions.length) {
        checkWinCondition6();
        return;
    }
    
    const question = data.questions[data.currentQuestion];
    
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('total-questions').textContent = data.questions.length;
    
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        button.textContent = option;
        button.onclick = () => selectAnswer6(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('feedback6').innerHTML = '';
}

function selectAnswer6(selectedIndex) {
    const data = window.level6Data;
    const question = data.questions[data.currentQuestion];
    
    const options = document.querySelectorAll('.answer-option');
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        data.correctCount++;
        
        document.getElementById('feedback6').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.2rem;">✓ Correct!</span>';
        
        // Spin and update a reel
        const reelIndex = data.currentQuestion % 3;
        spinReel6(reelIndex, question.symbol);
        
        document.getElementById('correct-count').textContent = data.correctCount;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        
        document.getElementById('feedback6').innerHTML = 
            '<span style="color: #e74c3c;">✗ Incorrect. The correct answer is highlighted.</span>';
        
        // Randomize a reel on wrong answer
        const reelIndex = data.currentQuestion % 3;
        const randomSymbol = data.symbols[Math.floor(Math.random() * data.symbols.length)];
        spinReel6(reelIndex, randomSymbol);
    }
    
    data.currentQuestion++;
    
    setTimeout(() => {
        if (data.currentQuestion < data.questions.length) {
            displayQuestion6();
        } else {
            checkWinCondition6();
        }
    }, 2000);
}

function spinReel6(reelIndex, finalSymbol) {
    const data = window.level6Data;
    const reel = document.getElementById(`reel${reelIndex + 1}`);
    
    reel.classList.add('spinning');
    
    setTimeout(() => {
        reel.classList.remove('spinning');
        reel.textContent = finalSymbol;
        data.reels[reelIndex] = finalSymbol;
        
        updateSlotStatus6();
    }, 500);
}

function updateSlotStatus6() {
    const data = window.level6Data;
    
    if (data.reels[0] === data.reels[1] && data.reels[1] === data.reels[2] && data.reels[0] !== '?') {
        document.getElementById('slot-status').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ ALL REELS ALIGNED!</span>';
    }
}

function checkWinCondition6() {
    const data = window.level6Data;
    
    // Check if all reels match
    if (data.reels[0] === data.reels[1] && data.reels[1] === data.reels[2] && data.reels[0] !== '?') {
        document.getElementById('question-area').innerHTML = 
            '<h3 style="color: #2ecc71; font-size: 1.8rem;">🎰 JACKPOT! Door Unlocked! 🎰</h3>';
        
        setTimeout(() => completeLevel(6), 2000);
    } else {
        document.getElementById('question-area').innerHTML = `
            <h3 style="color: #f39c12; margin-bottom: 20px;">Reels Not Aligned</h3>
            <p>You answered ${data.correctCount} out of ${data.questions.length} questions correctly, 
            but the reels didn't align. Try again!</p>
            <button onclick="initLevel6()" class="btn btn-primary" style="margin-top: 20px;">Try Again</button>
        `;
    }
}
