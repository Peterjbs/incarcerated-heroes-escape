// Level 4: Filtered Match Breaker - Generate 16-character codes and match
function initLevel4() {
    const container = document.getElementById('level-4');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 4: Filtered Match Breaker</h2>
                <p>Generate and match the 16-character security code</p>
            </div>
            
            <div class="level-narrative">
                The security terminal hums with energy. You must generate the exact 16-character 
                access code by selecting the right character types and filters. 
                Match the target pattern to unlock the next chamber.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 30px;">
                        <h3 style="margin-bottom: 15px;">Target Code Pattern:</h3>
                        <div id="target-code" style="font-family: monospace; font-size: 1.8rem; padding: 15px; 
                                                      background: rgba(233, 69, 96, 0.1); border: 2px solid var(--highlight-color); 
                                                      border-radius: 8px; letter-spacing: 3px; word-break: break-all;">
                        </div>
                        <div id="pattern-hint" style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;"></div>
                    </div>
                    
                    <div style="margin: 30px 0; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <h3 style="margin-bottom: 15px;">Code Generator:</h3>
                        
                        <div style="margin: 20px 0; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                            <label style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="use-uppercase" checked style="width: 20px; height: 20px;">
                                <span>Include Uppercase (A-Z)</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="use-lowercase" checked style="width: 20px; height: 20px;">
                                <span>Include Lowercase (a-z)</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="use-numbers" checked style="width: 20px; height: 20px;">
                                <span>Include Numbers (0-9)</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="use-symbols" style="width: 20px; height: 20px;">
                                <span>Include Symbols (!@#$%)</span>
                            </label>
                        </div>
                        
                        <button onclick="generateCode4()" class="btn btn-primary" style="margin-top: 15px;">
                            Generate Code
                        </button>
                    </div>
                    
                    <div style="margin: 30px 0;">
                        <h3 style="margin-bottom: 15px;">Your Generated Code:</h3>
                        <div id="generated-code" style="font-family: monospace; font-size: 1.8rem; padding: 15px; 
                                                        background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.3); 
                                                        border-radius: 8px; letter-spacing: 3px; min-height: 60px; word-break: break-all;">
                            <span style="opacity: 0.5;">Click Generate Code</span>
                        </div>
                        <div id="match-status" style="margin-top: 15px; font-size: 1.2rem; min-height: 30px;"></div>
                    </div>
                    
                    <div id="feedback4" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div id="attempts-counter" style="margin-top: 20px; font-size: 1rem; opacity: 0.7;">
                        Attempts: <span id="attempt-count">0</span>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="checkMatch4()" class="btn btn-primary">Check Match</button>
                <button onclick="revealHint4()" class="btn btn-secondary">Show Hint</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Generate target code
    const targetCode = generateTargetCode4();
    
    window.level4Data = {
        targetCode,
        generatedCode: null,
        attempts: 0,
        hintRevealed: false
    };
    
    document.getElementById('target-code').textContent = targetCode;
    analyzePattern4(targetCode);
}

function generateTargetCode4() {
    // Generate a 16-character code with mixed character types
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    
    let code = '';
    
    // Ensure mix of types (easier pattern)
    for (let i = 0; i < 16; i++) {
        if (i % 3 === 0) {
            code += uppercase[Math.floor(Math.random() * uppercase.length)];
        } else if (i % 3 === 1) {
            code += lowercase[Math.floor(Math.random() * lowercase.length)];
        } else {
            code += numbers[Math.floor(Math.random() * numbers.length)];
        }
    }
    
    return code;
}

function analyzePattern4(code) {
    const hasUppercase = /[A-Z]/.test(code);
    const hasLowercase = /[a-z]/.test(code);
    const hasNumbers = /[0-9]/.test(code);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(code);
    
    const types = [];
    if (hasUppercase) types.push('uppercase');
    if (hasLowercase) types.push('lowercase');
    if (hasNumbers) types.push('numbers');
    if (hasSymbols) types.push('symbols');
    
    document.getElementById('pattern-hint').textContent = 
        `Pattern uses: ${types.join(', ')}`;
}

function generateCode4() {
    const useUppercase = document.getElementById('use-uppercase').checked;
    const useLowercase = document.getElementById('use-lowercase').checked;
    const useNumbers = document.getElementById('use-numbers').checked;
    const useSymbols = document.getElementById('use-symbols').checked;
    
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        document.getElementById('feedback4').innerHTML = 
            '<span style="color: #f39c12;">Please select at least one character type!</span>';
        return;
    }
    
    const chars = [];
    if (useUppercase) chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (useLowercase) chars.push('abcdefghijklmnopqrstuvwxyz');
    if (useNumbers) chars.push('0123456789');
    if (useSymbols) chars.push('!@#$%^&*');
    
    const allChars = chars.join('');
    let code = '';
    
    for (let i = 0; i < 16; i++) {
        code += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    window.level4Data.generatedCode = code;
    window.level4Data.attempts++;
    
    document.getElementById('generated-code').textContent = code;
    document.getElementById('attempt-count').textContent = window.level4Data.attempts;
    
    // Calculate similarity
    const similarity = calculateSimilarity4(window.level4Data.targetCode, code);
    
    if (similarity === 100) {
        document.getElementById('match-status').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.3rem;">✓ EXACT MATCH!</span>';
        document.getElementById('feedback4').innerHTML = '';
    } else {
        document.getElementById('match-status').innerHTML = 
            `<span style="color: #f39c12;">Similarity: ${similarity.toFixed(1)}%</span>`;
        document.getElementById('feedback4').innerHTML = '';
    }
}

function calculateSimilarity4(target, generated) {
    if (!generated) return 0;
    
    let matches = 0;
    const minLength = Math.min(target.length, generated.length);
    
    for (let i = 0; i < minLength; i++) {
        if (target[i] === generated[i]) {
            matches++;
        }
    }
    
    return (matches / target.length) * 100;
}

function checkMatch4() {
    const data = window.level4Data;
    if (!data.generatedCode) {
        document.getElementById('feedback4').innerHTML = 
            '<span style="color: #f39c12;">Please generate a code first!</span>';
        return;
    }
    
    if (data.generatedCode === data.targetCode) {
        document.getElementById('feedback4').innerHTML = 
            '<span style="color: #2ecc71; font-size: 1.5rem;">✓ PERFECT MATCH! Access Granted!</span>';
        
        setTimeout(() => completeLevel(4), 1500);
    } else {
        const similarity = calculateSimilarity4(data.targetCode, data.generatedCode);
        
        if (similarity >= 80) {
            document.getElementById('feedback4').innerHTML = 
                '<span style="color: #3498db;">Very close! Adjust your filters and try again.</span>';
        } else if (similarity >= 50) {
            document.getElementById('feedback4').innerHTML = 
                '<span style="color: #f39c12;">Getting warmer. Check which character types you\'re using.</span>';
        } else {
            document.getElementById('feedback4').innerHTML = 
                '<span style="color: #e74c3c;">Not quite right. Review the pattern hint.</span>';
        }
    }
}

function revealHint4() {
    const data = window.level4Data;
    if (data.hintRevealed) return;
    
    const code = data.targetCode;
    const hasUppercase = /[A-Z]/.test(code);
    const hasLowercase = /[a-z]/.test(code);
    const hasNumbers = /[0-9]/.test(code);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(code);
    
    let hint = 'Required character types: ';
    const required = [];
    if (hasUppercase) required.push('Uppercase');
    if (hasLowercase) required.push('Lowercase');
    if (hasNumbers) required.push('Numbers');
    if (hasSymbols) required.push('Symbols');
    
    hint += required.join(', ');
    
    document.getElementById('feedback4').innerHTML = 
        `<span style="color: #3498db;">💡 Hint: ${hint}</span>`;
    
    data.hintRevealed = true;
}
