// Level 9: Vital Signs Subterfuge - Extract bio-trackers and deceive the surveillance network
function initLevel9() {
    const container = document.getElementById('level-9');
    
    // Cleanup previous intervals and event listeners
    if (window.level9Data) {
        if (window.level9Data.cycleInterval) clearInterval(window.level9Data.cycleInterval);
        if (window.level9Data.heartbeatInterval) clearInterval(window.level9Data.heartbeatInterval);
        if (window.level9Data.extractionInterval) clearInterval(window.level9Data.extractionInterval);
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 9: Vital Signs Subterfuge</h2>
                <p>Hijack a MedBot, extract bio-trackers, and fool the enemy surveillance network</p>
            </div>
            
            <div class="level-narrative">
                The prison's surveillance system monitors 5 allies via subcutaneous bio-trackers. 
                You've commandeered a maintenance MedBot with extraction capabilities. 
                During each 60-second monitoring cycle, you must: extract a tracker using precision 
                controls, analyze the ally's unique bio-signature, then program a counterfeit signal 
                using rhythm-matching and parameter tuning. The system validates after each stopped 
                cycle—a green reading means success, orange requires refinement. Three orange 
                failures trigger a red alert. Each ally presents unique challenges based on their physical condition.
            </div>
            
            <div id="game-screen-9" class="puzzle-container">
                <!-- Dynamic game screens will load here -->
            </div>
            
            <div id="feedback9" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem; text-align: center;"></div>
            
            <div class="level-controls">
                <button onclick="initLevel9()" class="btn btn-warning" style="background: var(--warning-color);">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add comprehensive styles
    if (!document.getElementById('level9-styles')) {
        const style = document.createElement('style');
        style.id = 'level9-styles';
        style.textContent = `
        .ally-card-9 {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        
        .ally-card-9:hover:not(.disabled) {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(233, 69, 96, 0.3);
        }
        
        .ally-card-9.completed {
            border-color: var(--success-color);
            background: rgba(46, 204, 113, 0.1);
        }
        
        .ally-card-9.failed {
            border-color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
        }
        
        .ally-card-9.active {
            border-color: var(--highlight-color);
            box-shadow: 0 0 25px rgba(233, 69, 96, 0.5);
        }
        
        .ally-card-9.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .difficulty-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .difficulty-easy { background: rgba(46, 204, 113, 0.3); color: var(--success-color); }
        .difficulty-medium { background: rgba(243, 156, 18, 0.3); color: var(--warning-color); }
        .difficulty-hard { background: rgba(231, 76, 60, 0.3); color: #e74c3c; }
        .difficulty-extreme { background: rgba(155, 89, 182, 0.3); color: #9b59b6; }
        
        .extraction-canvas {
            border: 3px solid var(--highlight-color);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.5);
            cursor: crosshair;
            display: block;
            margin: 0 auto;
        }
        
        .vital-display {
            background: rgba(0, 0, 0, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
        }
        
        .vital-meter {
            height: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            margin: 10px 0;
        }
        
        .vital-meter-fill {
            height: 100%;
            transition: width 0.3s ease;
            background: linear-gradient(90deg, var(--success-color), #27ae60);
        }
        
        .vital-value {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: bold;
            color: white;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
            z-index: 1;
        }
        
        .heartbeat-tap-zone {
            width: 300px;
            height: 200px;
            margin: 20px auto;
            background: radial-gradient(circle, rgba(233, 69, 96, 0.2), transparent);
            border: 3px solid var(--highlight-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.1s ease;
            position: relative;
        }
        
        .heartbeat-tap-zone:active {
            transform: scale(0.95);
            background: radial-gradient(circle, rgba(233, 69, 96, 0.4), transparent);
        }
        
        .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid var(--highlight-color);
            border-radius: 50%;
            animation: pulse-animation 1s ease-out;
            opacity: 0;
        }
        
        @keyframes pulse-animation {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        
        .rhythm-feedback {
            margin: 15px 0;
            font-size: 1.1rem;
            min-height: 30px;
        }
        
        .accuracy-bar {
            width: 100%;
            height: 25px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
            margin: 15px 0;
        }
        
        .accuracy-fill {
            height: 100%;
            transition: width 0.3s ease, background 0.3s ease;
        }
        
        .config-control {
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }
        
        .config-slider {
            width: 100%;
            margin: 10px 0;
            height: 8px;
            border-radius: 4px;
            outline: none;
            -webkit-appearance: none;
            background: rgba(255, 255, 255, 0.2);
        }
        
        .config-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--highlight-color);
            cursor: pointer;
        }
        
        .config-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--highlight-color);
            cursor: pointer;
            border: none;
        }
        
        .result-badge-9 {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
            margin: 3px;
            text-transform: uppercase;
        }
        
        .result-badge-9.green {
            background: rgba(46, 204, 113, 0.3);
            border: 2px solid var(--success-color);
            color: var(--success-color);
        }
        
        .result-badge-9.orange {
            background: rgba(243, 156, 18, 0.3);
            border: 2px solid var(--warning-color);
            color: var(--warning-color);
        }
        
        .result-badge-9.red {
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
            color: #e74c3c;
        }
        
        .medbot-indicator {
            background: rgba(52, 152, 219, 0.2);
            border: 2px solid #3498db;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
        }
        
        .extraction-progress {
            width: 100%;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .extraction-fill {
            height: 100%;
            background: linear-gradient(90deg, #3498db, #2980b9);
            transition: width 0.2s linear;
        }
        
        .target-marker {
            position: absolute;
            width: 30px;
            height: 30px;
            border: 3px solid var(--success-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: marker-pulse 1s ease-in-out infinite;
        }
        
        @keyframes marker-pulse {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        .cursor-tracker {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--highlight-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px var(--highlight-color);
        }
        
        .screen-9 {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize game state with diverse allies
    const allies = [
        {
            id: 1,
            name: 'Marcus "Ironheart" Vale',
            age: 58,
            condition: 'Cardiac arrhythmia',
            difficulty: 'hard',
            heartRate: 68,
            heartVariability: 15,
            bloodOxygen: 94,
            oxygenVariability: 3,
            temperature: 37.1,
            tempVariability: 0.4,
            rhythmPattern: 'irregular', // Irregular heartbeat
            extractionDifficulty: 7,
            story: 'Veteran soldier with a damaged heart from combat injuries'
        },
        {
            id: 2,
            name: 'Dr. Aria Chen',
            age: 34,
            condition: 'Healthy, athletic',
            difficulty: 'easy',
            heartRate: 62,
            heartVariability: 4,
            bloodOxygen: 99,
            oxygenVariability: 1,
            temperature: 36.8,
            tempVariability: 0.2,
            rhythmPattern: 'steady',
            extractionDifficulty: 3,
            story: 'Medical researcher with exceptional cardiovascular health'
        },
        {
            id: 3,
            name: 'Elder Kato Yamada',
            age: 76,
            condition: 'Bradycardia, low oxygen',
            difficulty: 'extreme',
            heartRate: 52,
            heartVariability: 8,
            bloodOxygen: 89,
            oxygenVariability: 5,
            temperature: 36.2,
            tempVariability: 0.6,
            rhythmPattern: 'slow_irregular',
            extractionDifficulty: 9,
            story: 'Oldest member, fragile but determined survivor'
        },
        {
            id: 4,
            name: 'Lieutenant Sasha Volkov',
            age: 29,
            condition: 'Combat stress, tachycardia',
            difficulty: 'medium',
            heartRate: 95,
            heartVariability: 12,
            bloodOxygen: 96,
            oxygenVariability: 2,
            temperature: 37.4,
            tempVariability: 0.5,
            rhythmPattern: 'rapid',
            extractionDifficulty: 5,
            story: 'Special forces operative under high psychological stress'
        },
        {
            id: 5,
            name: 'Zara "Phantom" Brooks',
            age: 42,
            condition: 'Anxiety disorder, hyperventilation',
            difficulty: 'medium',
            heartRate: 78,
            heartVariability: 10,
            bloodOxygen: 97,
            oxygenVariability: 4,
            temperature: 36.9,
            tempVariability: 0.3,
            rhythmPattern: 'variable',
            extractionDifficulty: 6,
            story: 'Stealth expert with anxiety-induced vital fluctuations'
        }
    ].map(ally => ({
        ...ally,
        status: 'pending', // pending, extracting, configuring, completed, failed
        trackerExtracted: false,
        vitalsConfigured: false,
        rhythmMatched: false,
        consecutiveOranges: 0,
        results: [],
        configuredHeartRate: 70,
        configuredOxygen: 95,
        configuredTemp: 37.0,
        rhythmAccuracy: 0
    }));
    
    window.level9Data = {
        allies,
        currentAlly: null,
        currentScreen: 'selection', // selection, extraction, vitals, rhythm, validation
        cyclePhase: 'monitoring', // monitoring, stopped, validation
        cycleTime: 60,
        monitorCycleDuration: 60,
        validationDuration: 15,
        gameCompleted: false,
        gameFailed: false,
        medbotActive: true,
        // Extraction mini-game state
        extractionProgress: 0,
        extractionTargetX: 0,
        extractionTargetY: 0,
        extractionCursorX: 0,
        extractionCursorY: 0,
        // Rhythm matching state
        heartbeatTaps: [],
        targetBPM: 0,
        rhythmStartTime: 0
    };
    
    renderScreen9('selection');
    startMonitoringCycle9();
}

// Render different game screens
function renderScreen9(screen) {
    const data = window.level9Data;
    if (!data) return;
    
    data.currentScreen = screen;
    const container = document.getElementById('game-screen-9');
    
    switch (screen) {
        case 'selection':
            renderAllySelection9(container);
            break;
        case 'extraction':
            renderExtraction9(container);
            break;
        case 'vitals':
            renderVitalsConfig9(container);
            break;
        case 'rhythm':
            renderRhythmMatch9(container);
            break;
        case 'validation':
            renderValidation9(container);
            break;
    }
}

// Screen 1: Ally Selection
function renderAllySelection9(container) {
    const data = window.level9Data;
    
    container.innerHTML = `
        <div class="screen-9" style="text-align: center;">
            <div class="medbot-indicator">
                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">
                    🤖 MedBot Status: ${data.medbotActive ? 'ACTIVE' : 'STANDBY'}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.8;">
                    Monitoring Cycle: ${data.cyclePhase === 'monitoring' ? data.cycleTime + 's remaining' : 'VALIDATION IN PROGRESS'}
                </div>
            </div>
            
            <h3 style="margin: 30px 0 20px 0;">Select Ally for Bio-Tracker Extraction</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
                ${data.allies.map(ally => renderAllyCard9(ally)).join('')}
            </div>
        </div>
    `;
}

function renderAllyCard9(ally) {
    const data = window.level9Data;
    const canSelect = !ally.trackerExtracted && data.cyclePhase === 'monitoring';
    const statusIcon = ally.status === 'completed' ? '✓' : 
                       ally.status === 'failed' ? '✗' : 
                       ally.trackerExtracted ? '⚙️' : '○';
    
    const resultsHTML = ally.results.length > 0 ? 
        `<div style="margin-top: 12px;">
            ${ally.results.map(r => 
                `<span class="result-badge-9 ${r}">${r}</span>`
            ).join('')}
        </div>` : '';
    
    const disabledClass = canSelect ? '' : 'disabled';
    const onClick = canSelect ? `onclick="selectAlly9(${ally.id})"` : '';
    
    return `
        <div class="ally-card-9 ${ally.status === 'completed' ? 'completed' : ''} ${ally.status === 'failed' ? 'failed' : ''} ${disabledClass}" ${onClick}>
            <div class="difficulty-badge difficulty-${ally.difficulty}">${ally.difficulty}</div>
            
            <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 8px;">
                ${statusIcon} ${ally.name}
            </div>
            
            <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 12px; font-style: italic;">
                ${ally.story}
            </div>
            
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                Age: ${ally.age} | Condition: ${ally.condition}
            </div>
            
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                ❤️ HR: ${ally.heartRate}±${ally.heartVariability} BPM (${ally.rhythmPattern})
            </div>
            
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                💨 O₂: ${ally.bloodOxygen}±${ally.oxygenVariability}%
            </div>
            
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                🌡️ Temp: ${ally.temperature}±${ally.tempVariability}°C
            </div>
            
            ${ally.trackerExtracted ? `
                <div style="margin-top: 10px; padding: 8px; background: rgba(52, 152, 219, 0.2); border-radius: 5px; font-size: 0.85rem;">
                    ✓ Tracker Extracted | Signal Configured
                </div>
            ` : ''}
            
            ${ally.consecutiveOranges > 0 ? 
                `<div style="margin-top: 10px; font-size: 0.85rem; color: var(--warning-color);">
                    ⚠️ Orange Readings: ${ally.consecutiveOranges}/3
                </div>` : ''}
            
            ${resultsHTML}
        </div>
    `;
}

// Screen 2: Tracker Extraction (Precision Mini-Game)
function renderExtraction9(container) {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    // Set random target location
    data.extractionTargetX = 200 + Math.random() * 200;
    data.extractionTargetY = 150 + Math.random() * 150;
    data.extractionProgress = 0;
    
    container.innerHTML = `
        <div class="screen-9" style="text-align: center;">
            <h3 style="margin-bottom: 20px;">MedBot Extraction Protocol: ${ally.name}</h3>
            
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="font-size: 1rem; margin-bottom: 10px;">
                    Guide the MedBot's laser to the bio-tracker signal (pulsing circle).
                    Maintain position for ${ally.extractionDifficulty} seconds to extract safely.
                </div>
                <div style="font-size: 0.9rem; opacity: 0.7;">
                    Difficulty: ${ally.difficulty.toUpperCase()} | Precision Required: ${ally.extractionDifficulty}/10
                </div>
            </div>
            
            <div style="position: relative; display: inline-block; margin: 20px 0;">
                <canvas id="extraction-canvas-9" class="extraction-canvas" width="600" height="400"></canvas>
            </div>
            
            <div class="extraction-progress">
                <div id="extraction-fill-9" class="extraction-fill" style="width: 0%;"></div>
            </div>
            
            <div id="extraction-feedback-9" style="margin: 15px 0; font-size: 1.1rem; min-height: 30px;"></div>
            
            <button onclick="cancelExtraction9()" class="btn btn-secondary">Abort Extraction</button>
        </div>
    `;
    
    startExtraction9();
}

function startExtraction9() {
    const data = window.level9Data;
    const ally = data.currentAlly;
    const canvas = document.getElementById('extraction-canvas-9');
    const ctx = canvas.getContext('2d');
    const progressBar = document.getElementById('extraction-fill-9');
    const feedback = document.getElementById('extraction-feedback-9');
    
    let isExtracting = false;
    const proximityThreshold = 40; // pixels
    const extractionTime = ally.extractionDifficulty * 1000; // ms
    let extractionStart = 0;
    
    // Draw the scene
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw "bio-metric scan" background
        ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Draw target (pulsing circle)
        const pulse = Math.sin(Date.now() / 200) * 0.2 + 1;
        ctx.beginPath();
        ctx.arc(data.extractionTargetX, data.extractionTargetY, 25 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'var(--success-color)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(data.extractionTargetX, data.extractionTargetY, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
        ctx.fill();
        
        // Draw cursor position
        if (data.extractionCursorX && data.extractionCursorY) {
            ctx.beginPath();
            ctx.arc(data.extractionCursorX, data.extractionCursorY, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--highlight-color)';
            ctx.fill();
            
            // Draw laser line
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height);
            ctx.lineTo(data.extractionCursorX, data.extractionCursorY);
            ctx.strokeStyle = 'rgba(233, 69, 96, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        data.extractionCursorX = e.clientX - rect.left;
        data.extractionCursorY = e.clientY - rect.top;
        
        const distance = Math.sqrt(
            Math.pow(data.extractionCursorX - data.extractionTargetX, 2) +
            Math.pow(data.extractionCursorY - data.extractionTargetY, 2)
        );
        
        if (distance < proximityThreshold) {
            if (!isExtracting) {
                isExtracting = true;
                extractionStart = Date.now();
                feedback.innerHTML = '<span style="color: var(--success-color);">✓ Locked on target! Hold steady...</span>';
            }
            
            const elapsed = Date.now() - extractionStart;
            const progress = Math.min(100, (elapsed / extractionTime) * 100);
            data.extractionProgress = progress;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                completeExtraction9();
            }
        } else {
            if (isExtracting) {
                isExtracting = false;
                feedback.innerHTML = '<span style="color: var(--warning-color);">⚠️ Target lost! Reacquire position...</span>';
            }
            data.extractionProgress = Math.max(0, data.extractionProgress - 2);
            progressBar.style.width = data.extractionProgress + '%';
        }
    });
}

function completeExtraction9() {
    const data = window.level9Data;
    data.currentAlly.trackerExtracted = true;
    
    document.getElementById('extraction-feedback-9').innerHTML = 
        '<span style="color: var(--success-color); font-size: 1.3rem;">✓ Tracker Successfully Extracted!</span>';
    
    setTimeout(() => {
        renderScreen9('vitals');
    }, 1500);
}

function cancelExtraction9() {
    const data = window.level9Data;
    data.currentAlly = null;
    renderScreen9('selection');
}

// Screen 3: Vitals Configuration (Dials and Sliders)
function renderVitalsConfig9(container) {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    container.innerHTML = `
        <div class="screen-9" style="text-align: center;">
            <h3 style="margin-bottom: 20px;">Configure Counterfeit Bio-Signal: ${ally.name}</h3>
            
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="font-size: 1rem;">
                    Match the ally's vital signs to create a convincing fake signal.
                    The closer your settings, the better chance of a green validation.
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 800px; margin: 30px auto;">
                <!-- Original Vitals -->
                <div class="vital-display">
                    <h4 style="margin-bottom: 15px; color: var(--highlight-color);">Original Bio-Signature</h4>
                    
                    <div style="margin: 15px 0;">
                        <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">Heart Rate</div>
                        <div style="font-size: 1.3rem; font-weight: bold;">
                            ${ally.heartRate} ± ${ally.heartVariability} BPM
                        </div>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">Blood Oxygen</div>
                        <div style="font-size: 1.3rem; font-weight: bold;">
                            ${ally.bloodOxygen} ± ${ally.oxygenVariability}%
                        </div>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">Body Temperature</div>
                        <div style="font-size: 1.3rem; font-weight: bold;">
                            ${ally.temperature} ± ${ally.tempVariability}°C
                        </div>
                    </div>
                </div>
                
                <!-- Configured Vitals -->
                <div class="vital-display">
                    <h4 style="margin-bottom: 15px; color: var(--success-color);">Counterfeit Signal Config</h4>
                    
                    <div class="config-control">
                        <label style="display: block; margin-bottom: 5px; font-size: 0.9rem;">
                            Heart Rate: <strong id="config-hr-9">${ally.configuredHeartRate}</strong> BPM
                        </label>
                        <input type="range" class="config-slider" id="hr-slider-9" 
                               min="40" max="120" value="${ally.configuredHeartRate}" 
                               oninput="updateVitalConfig9('heartRate', this.value)" />
                    </div>
                    
                    <div class="config-control">
                        <label style="display: block; margin-bottom: 5px; font-size: 0.9rem;">
                            Blood Oxygen: <strong id="config-o2-9">${ally.configuredOxygen}</strong>%
                        </label>
                        <input type="range" class="config-slider" id="o2-slider-9" 
                               min="80" max="100" value="${ally.configuredOxygen}" 
                               oninput="updateVitalConfig9('oxygen', this.value)" />
                    </div>
                    
                    <div class="config-control">
                        <label style="display: block; margin-bottom: 5px; font-size: 0.9rem;">
                            Temperature: <strong id="config-temp-9">${ally.configuredTemp}</strong>°C
                        </label>
                        <input type="range" class="config-slider" id="temp-slider-9" 
                               min="35.0" max="39.0" step="0.1" value="${ally.configuredTemp}" 
                               oninput="updateVitalConfig9('temperature', this.value)" />
                    </div>
                </div>
            </div>
            
            <div style="margin: 30px 0;">
                <button onclick="proceedToRhythm9()" class="btn btn-primary" style="font-size: 1.1rem; padding: 15px 40px;">
                    Proceed to Rhythm Matching →
                </button>
                <button onclick="cancelExtraction9()" class="btn btn-secondary" style="margin-left: 15px;">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

function updateVitalConfig9(type, value) {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    if (type === 'heartRate') {
        ally.configuredHeartRate = parseInt(value);
        document.getElementById('config-hr-9').textContent = value;
    } else if (type === 'oxygen') {
        ally.configuredOxygen = parseInt(value);
        document.getElementById('config-o2-9').textContent = value;
    } else if (type === 'temperature') {
        ally.configuredTemp = parseFloat(value);
        document.getElementById('config-temp-9').textContent = value;
    }
}

function proceedToRhythm9() {
    const data = window.level9Data;
    data.currentAlly.vitalsConfigured = true;
    renderScreen9('rhythm');
}

// Screen 4: Rhythm Matching (Tap to Match Heartbeat)
function renderRhythmMatch9(container) {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    // Calculate target BPM
    data.targetBPM = ally.heartRate;
    data.heartbeatTaps = [];
    data.rhythmStartTime = Date.now();
    
    const tapDuration = 10000; // 10 seconds
    
    container.innerHTML = `
        <div class="screen-9" style="text-align: center;">
            <h3 style="margin-bottom: 20px;">Rhythm Matching: ${ally.name}</h3>
            
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="font-size: 1rem; margin-bottom: 10px;">
                    Tap the rhythm zone to match the ally's heartbeat pattern.
                    Target: <strong>${data.targetBPM} BPM</strong> (${ally.rhythmPattern})
                </div>
                <div style="font-size: 0.9rem; opacity: 0.7;">
                    Tap for 10 seconds - try to maintain consistent timing!
                </div>
            </div>
            
            <div id="tap-zone-9" class="heartbeat-tap-zone">
                <div style="font-size: 2rem; font-weight: bold; pointer-events: none;">
                    TAP HERE
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <div style="font-size: 1.2rem; margin-bottom: 10px;">
                    Current BPM: <strong id="current-bpm-9">0</strong>
                </div>
                <div style="font-size: 1rem;">
                    Taps: <strong id="tap-count-9">0</strong> | 
                    Time: <strong id="rhythm-timer-9">10</strong>s
                </div>
            </div>
            
            <div class="accuracy-bar">
                <div id="rhythm-accuracy-9" class="accuracy-fill" style="width: 0%; background: linear-gradient(90deg, #e74c3c, var(--warning-color), var(--success-color));"></div>
            </div>
            
            <div id="rhythm-feedback-9" class="rhythm-feedback"></div>
        </div>
    `;
    
    startRhythmMatching9(tapDuration);
}

function startRhythmMatching9(duration) {
    const data = window.level9Data;
    const ally = data.currentAlly;
    const tapZone = document.getElementById('tap-zone-9');
    const currentBPMDisplay = document.getElementById('current-bpm-9');
    const tapCountDisplay = document.getElementById('tap-count-9');
    const timerDisplay = document.getElementById('rhythm-timer-9');
    const accuracyBar = document.getElementById('rhythm-accuracy-9');
    const feedback = document.getElementById('rhythm-feedback-9');
    
    let timeLeft = duration / 1000;
    
    // Tap handler
    const handleTap = (e) => {
        e.preventDefault();
        const now = Date.now();
        data.heartbeatTaps.push(now);
        
        // Visual feedback
        const ring = document.createElement('div');
        ring.className = 'pulse-ring';
        tapZone.appendChild(ring);
        setTimeout(() => ring.remove(), 1000);
        
        tapCountDisplay.textContent = data.heartbeatTaps.length;
        
        // Calculate current BPM
        if (data.heartbeatTaps.length >= 2) {
            const recentTaps = data.heartbeatTaps.slice(-5);
            const intervals = [];
            for (let i = 1; i < recentTaps.length; i++) {
                intervals.push(recentTaps[i] - recentTaps[i-1]);
            }
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const currentBPM = Math.round(60000 / avgInterval);
            currentBPMDisplay.textContent = currentBPM;
            
            // Calculate accuracy
            const diff = Math.abs(currentBPM - data.targetBPM);
            const accuracy = Math.max(0, 100 - (diff * 5));
            accuracyBar.style.width = accuracy + '%';
            
            if (accuracy > 80) {
                feedback.innerHTML = '<span style="color: var(--success-color);">Excellent rhythm!</span>';
            } else if (accuracy > 60) {
                feedback.innerHTML = '<span style="color: var(--warning-color);">Getting closer...</span>';
            } else {
                feedback.innerHTML = '<span style="color: #e74c3c;">Try to match the target BPM</span>';
            }
        }
    };
    
    tapZone.addEventListener('click', handleTap);
    tapZone.addEventListener('touchstart', handleTap);
    
    // Add keyboard support (space bar)
    const handleKeyboard = (e) => {
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            handleTap(e);
        }
    };
    document.addEventListener('keydown', handleKeyboard);
    
    // Timer
    const timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.removeEventListener('keydown', handleKeyboard);
            completeRhythmMatching9();
        }
    }, 1000);
}

function completeRhythmMatching9() {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    // Calculate final accuracy
    if (data.heartbeatTaps.length >= 3) {
        const intervals = [];
        for (let i = 1; i < data.heartbeatTaps.length; i++) {
            intervals.push(data.heartbeatTaps[i] - data.heartbeatTaps[i-1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const achievedBPM = 60000 / avgInterval;
        const diff = Math.abs(achievedBPM - data.targetBPM);
        ally.rhythmAccuracy = Math.max(0, 100 - (diff * 5));
    } else {
        ally.rhythmAccuracy = 0;
    }
    
    ally.rhythmMatched = true;
    ally.status = 'configuring';
    
    document.getElementById('rhythm-feedback-9').innerHTML = 
        `<span style="color: var(--success-color); font-size: 1.2rem;">✓ Rhythm Sequence Recorded! Accuracy: ${Math.round(ally.rhythmAccuracy)}%</span>`;
    
    setTimeout(() => {
        finalizeConfiguration9();
    }, 2000);
}

function finalizeConfiguration9() {
    const data = window.level9Data;
    const ally = data.currentAlly;
    
    document.getElementById('feedback9').innerHTML = 
        `<span style="color: var(--success-color);">✓ Counterfeit signal configured for ${ally.name}. Awaiting validation cycle...</span>`;
    
    data.currentAlly = null;
    renderScreen9('selection');
}

// Monitoring cycle management
function startMonitoringCycle9() {
    const data = window.level9Data;
    
    data.cycleInterval = setInterval(() => {
        if (data.gameCompleted || data.gameFailed) {
            clearInterval(data.cycleInterval);
            return;
        }
        
        data.cycleTime--;
        
        if (data.cycleTime <= 0) {
            if (data.cyclePhase === 'monitoring') {
                // Start validation
                data.cyclePhase = 'validation';
                data.cycleTime = data.validationDuration;
                validateSignals9();
            } else {
                // Return to monitoring
                data.cyclePhase = 'monitoring';
                data.cycleTime = data.monitorCycleDuration;
            }
            
            if (data.currentScreen === 'selection') {
                renderScreen9('selection');
            }
        }
    }, 1000);
}

function validateSignals9() {
    const data = window.level9Data;
    
    setTimeout(() => {
        let allCompleted = true;
        let anyFailed = false;
        
        data.allies.forEach(ally => {
            if (ally.status === 'completed' || ally.status === 'failed') {
                return;
            }
            
            if (!ally.trackerExtracted) {
                allCompleted = false;
                return;
            }
            
            // Calculate accuracy for each vital
            const hrDiff = Math.abs(ally.heartRate - ally.configuredHeartRate);
            const o2Diff = Math.abs(ally.bloodOxygen - ally.configuredOxygen);
            const tempDiff = Math.abs(ally.temperature - ally.configuredTemp);
            
            // Scoring system
            let score = 0;
            
            // Heart rate (40% weight)
            if (hrDiff <= ally.heartVariability) score += 40;
            else if (hrDiff <= ally.heartVariability * 2) score += 20;
            
            // Oxygen (30% weight)
            if (o2Diff <= ally.oxygenVariability) score += 30;
            else if (o2Diff <= ally.oxygenVariability * 2) score += 15;
            
            // Temperature (30% weight)
            if (tempDiff <= ally.tempVariability) score += 30;
            else if (tempDiff <= ally.tempVariability * 2) score += 15;
            
            // Add rhythm bonus (up to 20% extra)
            score += (ally.rhythmAccuracy / 100) * 20;
            
            let result;
            if (score >= 75) {
                result = 'green';
                ally.status = 'completed';
                ally.results.push(result);
                ally.consecutiveOranges = 0;
            } else {
                result = 'orange';
                ally.results.push(result);
                ally.consecutiveOranges++;
                
                if (ally.consecutiveOranges >= 3) {
                    result = 'red';
                    ally.status = 'failed';
                    ally.results[ally.results.length - 1] = 'red';
                    anyFailed = true;
                } else {
                    allCompleted = false;
                }
            }
            
            if (ally.status !== 'completed' && ally.status !== 'failed') {
                allCompleted = false;
            }
        });
        
        if (anyFailed) {
            data.gameFailed = true;
            document.getElementById('feedback9').innerHTML = 
                '<span style="color: #e74c3c; font-size: 1.3rem;">❌ RED ALERT! Multiple validation failures detected. Mission compromised!</span>';
            
            setTimeout(() => {
                if (confirm('Mission failed. Try again?')) {
                    initLevel9();
                } else {
                    showScreen('level-select');
                }
            }, 3000);
        } else if (allCompleted) {
            data.gameCompleted = true;
            document.getElementById('feedback9').innerHTML = 
                '<span style="color: var(--success-color); font-size: 1.5rem;">✓ ALL SIGNALS VALIDATED! Surveillance network successfully deceived!</span>';
            
            setTimeout(() => completeLevel(9), 2500);
        } else {
            const orangeAllies = data.allies.filter(a => 
                a.results.length > 0 && a.results[a.results.length - 1] === 'orange'
            );
            
            if (orangeAllies.length > 0) {
                document.getElementById('feedback9').innerHTML = 
                    `<span style="color: var(--warning-color);">⚠️ Validation: Some signals need refinement: ${orangeAllies.map(a => a.name.split(' ')[0]).join(', ')}. Reconfigure during next cycle.</span>`;
            }
        }
        
        if (data.currentScreen === 'selection') {
            renderScreen9('selection');
        }
    }, data.validationDuration * 1000);
}

function selectAlly9(allyId) {
    const data = window.level9Data;
    const ally = data.allies.find(a => a.id === allyId);
    
    if (!ally || ally.trackerExtracted || data.cyclePhase !== 'monitoring') {
        return;
    }
    
    data.currentAlly = ally;
    renderScreen9('extraction');
}
