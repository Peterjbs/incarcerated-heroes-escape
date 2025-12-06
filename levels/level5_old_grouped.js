// Level 5: Grouped Score Breaker - Score matches in a dictionary
function initLevel5() {
    const container = document.getElementById('level-5');
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 5: Grouped Score Breaker</h2>
                <p>Find matching patterns in the database to unlock the vault</p>
            </div>
            
            <div class="level-narrative">
                An ancient database guards the path forward. You must identify matching patterns 
                within the data groups. Find all matches with a score above the threshold 
                to prove your analytical prowess and gain access.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 30px;">
                        <h3 style="margin-bottom: 15px;">Database Records:</h3>
                        <div id="database-records" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
                                                          gap: 15px; margin: 20px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
                        </div>
                    </div>
                    
                    <div style="margin: 30px 0; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <h3 style="margin-bottom: 15px;">Pattern Matcher:</h3>
                        <p style="margin-bottom: 15px; opacity: 0.8;">Select two records to check if they match</p>
                        
                        <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                            <div>
                                <label style="display: block; margin-bottom: 5px;">First Record:</label>
                                <select id="record1" style="padding: 10px; font-size: 1rem; border-radius: 5px; 
                                                             background: rgba(255, 255, 255, 0.1); color: white; border: 2px solid rgba(255, 255, 255, 0.3);">
                                    <option value="">Select...</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px;">Second Record:</label>
                                <select id="record2" style="padding: 10px; font-size: 1rem; border-radius: 5px; 
                                                             background: rgba(255, 255, 255, 0.1); color: white; border: 2px solid rgba(255, 255, 255, 0.3);">
                                    <option value="">Select...</option>
                                </select>
                            </div>
                        </div>
                        
                        <button onclick="checkMatch5()" class="btn btn-primary" style="margin-top: 15px;">
                            Check Match
                        </button>
                        
                        <div id="match-result" style="margin-top: 20px; min-height: 40px; font-size: 1.1rem;"></div>
                    </div>
                    
                    <div style="margin: 30px 0;">
                        <h3 style="margin-bottom: 15px;">Found Matches:</h3>
                        <div id="found-matches" style="min-height: 60px; padding: 15px; background: rgba(46, 204, 113, 0.1); 
                                                       border: 2px solid rgba(46, 204, 113, 0.3); border-radius: 8px;">
                            <span style="opacity: 0.7;">No matches found yet</span>
                        </div>
                        <div style="margin-top: 15px; font-size: 1.1rem;">
                            Progress: <span id="match-progress">0</span> / <span id="total-required">3</span> matches required
                        </div>
                    </div>
                    
                    <div id="feedback5" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Generate database records
    const records = generateRecords5();
    const matchingPairs = findMatchingPairs5(records);
    
    window.level5Data = {
        records,
        matchingPairs,
        foundMatches: new Set(),
        requiredMatches: 3
    };
    
    renderRecords5();
    populateSelects5();
}

function generateRecords5() {
    // Generate records with patterns
    const patterns = [
        { id: 'A1', code: 'ALPHA-001', pattern: 'XXX-NNN' },
        { id: 'A2', code: 'ALPHA-002', pattern: 'XXX-NNN' },
        { id: 'B1', code: 'BETA-100', pattern: 'XXX-NNN' },
        { id: 'B2', code: 'BETA-200', pattern: 'XXX-NNN' },
        { id: 'C1', code: 'GAM-001X', pattern: 'XXX-NNNX' },
        { id: 'C2', code: 'GAM-002Y', pattern: 'XXX-NNNX' },
        { id: 'D1', code: 'DELTA99', pattern: 'XXXNN' },
        { id: 'D2', code: 'OMEGA88', pattern: 'XXXNN' }
    ];
    
    return patterns.sort(() => Math.random() - 0.5);
}

function findMatchingPairs5(records) {
    const pairs = [];
    
    for (let i = 0; i < records.length; i++) {
        for (let j = i + 1; j < records.length; j++) {
            if (records[i].pattern === records[j].pattern) {
                pairs.push([records[i].id, records[j].id].sort().join('-'));
            }
        }
    }
    
    return pairs;
}

function renderRecords5() {
    const data = window.level5Data;
    const container = document.getElementById('database-records');
    
    container.innerHTML = '';
    
    data.records.forEach(record => {
        const card = document.createElement('div');
        card.style.cssText = `
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        card.innerHTML = `
            <div style="font-weight: bold; color: var(--highlight-color); margin-bottom: 5px;">${record.id}</div>
            <div style="font-family: monospace; font-size: 0.9rem;">${record.code}</div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--highlight-color)';
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            card.style.transform = 'scale(1)';
        });
        
        container.appendChild(card);
    });
}

function populateSelects5() {
    const data = window.level5Data;
    const select1 = document.getElementById('record1');
    const select2 = document.getElementById('record2');
    
    select1.innerHTML = '<option value="">Select...</option>';
    select2.innerHTML = '<option value="">Select...</option>';
    
    data.records.forEach(record => {
        const option1 = document.createElement('option');
        option1.value = record.id;
        option1.textContent = `${record.id} - ${record.code}`;
        select1.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = record.id;
        option2.textContent = `${record.id} - ${record.code}`;
        select2.appendChild(option2);
    });
}

function checkMatch5() {
    const data = window.level5Data;
    const record1Id = document.getElementById('record1').value;
    const record2Id = document.getElementById('record2').value;
    
    if (!record1Id || !record2Id) {
        document.getElementById('match-result').innerHTML = 
            '<span style="color: #f39c12;">Please select two records!</span>';
        return;
    }
    
    if (record1Id === record2Id) {
        document.getElementById('match-result').innerHTML = 
            '<span style="color: #e74c3c;">Please select two different records!</span>';
        return;
    }
    
    const record1 = data.records.find(r => r.id === record1Id);
    const record2 = data.records.find(r => r.id === record2Id);
    
    const pairKey = [record1Id, record2Id].sort().join('-');
    
    // Check if patterns match
    const isMatch = record1.pattern === record2.pattern;
    
    if (isMatch) {
        if (!data.foundMatches.has(pairKey)) {
            data.foundMatches.add(pairKey);
            
            document.getElementById('match-result').innerHTML = 
                '<span style="color: #2ecc71; font-size: 1.2rem;">✓ MATCH FOUND! Pattern verified!</span>';
            
            updateFoundMatches5();
            
            // Check if puzzle complete
            if (data.foundMatches.size >= data.requiredMatches) {
                setTimeout(() => {
                    document.getElementById('feedback5').innerHTML = 
                        '<span style="color: #2ecc71; font-size: 1.5rem;">✓ All required matches found! Access granted!</span>';
                    setTimeout(() => completeLevel(5), 1500);
                }, 1000);
            }
        } else {
            document.getElementById('match-result').innerHTML = 
                '<span style="color: #f39c12;">You already found this match!</span>';
        }
    } else {
        document.getElementById('match-result').innerHTML = 
            '<span style="color: #e74c3c;">✗ No match. Patterns are different.</span>';
    }
}

function updateFoundMatches5() {
    const data = window.level5Data;
    const container = document.getElementById('found-matches');
    
    if (data.foundMatches.size === 0) {
        container.innerHTML = '<span style="opacity: 0.7;">No matches found yet</span>';
    } else {
        const matches = Array.from(data.foundMatches).map(pair => {
            return `<div style="padding: 8px; margin: 5px; background: rgba(46, 204, 113, 0.2); 
                            border-radius: 5px; display: inline-block;">${pair}</div>`;
        }).join('');
        
        container.innerHTML = matches;
    }
    
    document.getElementById('match-progress').textContent = data.foundMatches.size;
}
