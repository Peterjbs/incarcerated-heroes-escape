// Level 8: Final Synthesis - Combining elements from all puzzles
function initLevel8() {
    const container = document.getElementById('level-8');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 8: Final Synthesis</h2>
                <p>The ultimate challenge - prove your mastery of all skills</p>
            </div>
            
            <div class="level-narrative">
                This is it, hero. The final door to freedom stands before you. 
                It requires mastery of all the skills you've learned: code-breaking, 
                pattern recognition, logic, and quick thinking. Complete this challenge 
                to secure your escape and return home to Earth!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div id="synthesis-stage" style="min-height: 400px; padding: 30px;">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                    
                    <div id="feedback8" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin-top: 20px;">
                        <div style="font-size: 1.1rem; margin-bottom: 10px;">Overall Progress:</div>
                        <div style="background: rgba(255,255,255,0.1); height: 30px; border-radius: 15px; overflow: hidden; max-width: 500px; margin: 0 auto;">
                            <div id="overall-progress" style="background: linear-gradient(90deg, var(--highlight-color), #2ecc71); height: 100%; width: 0%; transition: width 0.5s ease;"></div>
                        </div>
                        <div id="progress-text" style="margin-top: 10px; font-size: 1rem; opacity: 0.8;">Stage 1 of 4</div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls" id="level8-controls">
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    window.level8Data = {
        currentStage: 0,
        stages: [
            { name: 'Code Breaking', completed: false },
            { name: 'Pattern Matching', completed: false },
            { name: 'Math Challenge', completed: false },
            { name: 'Memory Test', completed: false }
        ]
    };
    
    startStage8(0);
}

function startStage8(stageIndex) {
    const data = window.level8Data;
    data.currentStage = stageIndex;
    
    const progress = (stageIndex / data.stages.length) * 100;
    document.getElementById('overall-progress').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Stage ${stageIndex + 1} of ${data.stages.length}`;
    
    switch (stageIndex) {
        case 0:
            renderCodeStage8();
            break;
        case 1:
            renderPatternStage8();
            break;
        case 2:
            renderMathStage8();
            break;
        case 3:
            renderMemoryStage8();
            break;
        default:
            handleFinalVictory8();
    }
}

function renderCodeStage8() {
    const stage = document.getElementById('synthesis-stage');
    const code = Math.floor(1000 + Math.random() * 9000);
    
    window.level8Data.stageData = { code };
    
    stage.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--highlight-color);">Stage 1: Code Breaking</h3>
        <p style="margin-bottom: 20px;">Enter the 4-digit code: <span style="color: #f39c12; font-size: 1.3rem;">${code}</span></p>
        
        <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
            <input type="number" id="stage1-input" class="code-input" style="width: 300px; padding: 15px; font-size: 1.5rem; text-align: center;" 
                   placeholder="Enter code" maxlength="4" />
        </div>
        
        <button onclick="checkCodeStage8()" class="btn btn-primary">Submit Code</button>
    `;
    
    document.getElementById('stage1-input').focus();
    document.getElementById('stage1-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCodeStage8();
    });
}

function checkCodeStage8() {
    const input = document.getElementById('stage1-input').value;
    const correct = window.level8Data.stageData.code.toString();
    
    if (input === correct) {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Code Correct!</span>';
        window.level8Data.stages[0].completed = true;
        setTimeout(() => {
            document.getElementById('feedback8').innerHTML = '';
            startStage8(1);
        }, 1500);
    } else {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #e74c3c;">Incorrect code. Try again!</span>';
    }
}

function renderPatternStage8() {
    const stage = document.getElementById('synthesis-stage');
    
    const patterns = ['ABAB', 'XXYY', 'ABCD', 'AAAA'];
    const correct = patterns[Math.floor(Math.random() * patterns.length)];
    const scrambled = correct.split('').sort(() => Math.random() - 0.5).join('');
    
    window.level8Data.stageData = { correct };
    
    stage.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--highlight-color);">Stage 2: Pattern Matching</h3>
        <p style="margin-bottom: 20px;">Unscramble this pattern: <span style="color: #f39c12; font-size: 1.5rem; letter-spacing: 5px;">${scrambled}</span></p>
        <p style="margin-bottom: 20px; opacity: 0.7;">Hint: Find the repeating pattern</p>
        
        <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
            <input type="text" id="stage2-input" style="width: 300px; padding: 15px; font-size: 1.5rem; text-align: center; 
                                                        text-transform: uppercase; background: rgba(255,255,255,0.1); color: white; 
                                                        border: 2px solid rgba(255,255,255,0.3); border-radius: 8px;" 
                   placeholder="Enter pattern" maxlength="4" />
        </div>
        
        <button onclick="checkPatternStage8()" class="btn btn-primary">Submit Pattern</button>
    `;
    
    document.getElementById('stage2-input').focus();
    document.getElementById('stage2-input').addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
    document.getElementById('stage2-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPatternStage8();
    });
}

function checkPatternStage8() {
    const input = document.getElementById('stage2-input').value.toUpperCase();
    const correct = window.level8Data.stageData.correct;
    
    if (input === correct) {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Pattern Correct!</span>';
        window.level8Data.stages[1].completed = true;
        setTimeout(() => {
            document.getElementById('feedback8').innerHTML = '';
            startStage8(2);
        }, 1500);
    } else {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #e74c3c;">Incorrect pattern. Try again!</span>';
    }
}

function renderMathStage8() {
    const stage = document.getElementById('synthesis-stage');
    
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const answer = a * b + c;
    
    window.level8Data.stageData = { answer };
    
    stage.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--highlight-color);">Stage 3: Math Challenge</h3>
        <p style="margin-bottom: 20px;">Solve this equation:</p>
        <p style="font-size: 2rem; margin: 30px 0; color: var(--highlight-color);">${a} × ${b} + ${c} = ?</p>
        
        <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
            <input type="number" id="stage3-input" style="width: 200px; padding: 15px; font-size: 1.5rem; text-align: center; 
                                                          background: rgba(255,255,255,0.1); color: white; 
                                                          border: 2px solid rgba(255,255,255,0.3); border-radius: 8px;" 
                   placeholder="Answer" />
        </div>
        
        <button onclick="checkMathStage8()" class="btn btn-primary">Submit Answer</button>
    `;
    
    document.getElementById('stage3-input').focus();
    document.getElementById('stage3-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkMathStage8();
    });
}

function checkMathStage8() {
    const input = parseInt(document.getElementById('stage3-input').value);
    const correct = window.level8Data.stageData.answer;
    
    if (input === correct) {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Math Correct!</span>';
        window.level8Data.stages[2].completed = true;
        setTimeout(() => {
            document.getElementById('feedback8').innerHTML = '';
            startStage8(3);
        }, 1500);
    } else {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #e74c3c;">Incorrect answer. Try again!</span>';
    }
}

function renderMemoryStage8() {
    const stage = document.getElementById('synthesis-stage');
    
    const sequence = Array.from({length: 5}, () => Math.floor(Math.random() * 10));
    
    window.level8Data.stageData = { sequence, revealed: true };
    
    stage.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--highlight-color);">Stage 4: Memory Test</h3>
        <p style="margin-bottom: 20px;">Memorize this sequence:</p>
        <div id="sequence-display" style="font-size: 3rem; margin: 30px 0; letter-spacing: 15px; color: #2ecc71;">
            ${sequence.join(' ')}
        </div>
        <p id="memory-instruction" style="margin-bottom: 20px;">The sequence will disappear in 5 seconds...</p>
        
        <div id="memory-input" style="display: none;">
            <input type="text" id="stage4-input" style="width: 300px; padding: 15px; font-size: 1.5rem; text-align: center; 
                                                          letter-spacing: 10px; background: rgba(255,255,255,0.1); color: white; 
                                                          border: 2px solid rgba(255,255,255,0.3); border-radius: 8px;" 
                   placeholder="Enter sequence" maxlength="5" />
            <br><br>
            <button onclick="checkMemoryStage8()" class="btn btn-primary">Submit Sequence</button>
        </div>
    `;
    
    // Hide sequence after 5 seconds
    setTimeout(() => {
        document.getElementById('sequence-display').textContent = '? ? ? ? ?';
        document.getElementById('memory-instruction').textContent = 'Enter the sequence you memorized:';
        document.getElementById('memory-input').style.display = 'block';
        document.getElementById('stage4-input').focus();
        
        document.getElementById('stage4-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkMemoryStage8();
        });
    }, 5000);
}

function checkMemoryStage8() {
    const input = document.getElementById('stage4-input').value.replace(/\s/g, '');
    const correct = window.level8Data.stageData.sequence.join('');
    
    if (input === correct) {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ Memory Perfect!</span>';
        window.level8Data.stages[3].completed = true;
        setTimeout(() => {
            handleFinalVictory8();
        }, 1500);
    } else {
        document.getElementById('feedback8').innerHTML = 
            '<span style="color: #e74c3c;">Incorrect sequence. The correct answer was: ' + correct + '</span>';
        setTimeout(() => {
            renderMemoryStage8();
        }, 2000);
    }
}

function handleFinalVictory8() {
    const stage = document.getElementById('synthesis-stage');
    
    document.getElementById('overall-progress').style.width = '100%';
    document.getElementById('progress-text').textContent = 'All Stages Complete!';
    
    stage.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="font-size: 2.5rem; color: #2ecc71; margin-bottom: 20px;">
                🎉 SYNTHESIS COMPLETE! 🎉
            </h2>
            <p style="font-size: 1.3rem; line-height: 2; margin: 20px 0;">
                You have proven your mastery of all skills!<br>
                Code-breaking ✓<br>
                Pattern Recognition ✓<br>
                Mathematical Logic ✓<br>
                Memory Retention ✓
            </p>
            <p style="font-size: 1.5rem; margin-top: 30px; color: var(--highlight-color);">
                The final door opens before you...
            </p>
        </div>
    `;
    
    setTimeout(() => completeLevel(8), 3000);
}
