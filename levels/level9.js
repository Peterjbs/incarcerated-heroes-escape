// Level 9: Vital Signs Monitor - Manage tracking devices and mimic heartbeats
function initLevel9() {
    const container = document.getElementById('level-9');
    
    // Cleanup previous intervals if they exist
    if (window.level9Data) {
        if (window.level9Data.monitorInterval) clearInterval(window.level9Data.monitorInterval);
        if (window.level9Data.cycleInterval) clearInterval(window.level9Data.cycleInterval);
        if (window.level9Data.readingInterval) clearInterval(window.level9Data.readingInterval);
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 9: Vital Signs Monitor</h2>
                <p>Manage tracking devices and configure shock collars to mimic heartbeats</p>
            </div>
            
            <div class="level-narrative">
                You've discovered a tracking device monitoring the vitals of 5 allies. The device cycles: 
                monitors for 1 minute, then stops for 1 minute. To avoid alerting the enemy, you must 
                remove each device, place it in a drain, and configure a shock collar to convincingly 
                mimic the ally's heartbeat. For each ally, review their heartbeat pattern, then swap 
                the device during the monitoring phase. After the off period, a 15-second reading will 
                test your mimicry: orange means refine it, green means success. Three consecutive 
                orange readings for any ally will trigger a red alert and failure.
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div id="device-status" style="margin: 20px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">
                            Device Status: <span id="cycle-status" style="color: var(--success-color);">MONITORING</span>
                        </div>
                        <div style="font-size: 1rem; margin-bottom: 10px;">
                            Cycle Time: <span id="cycle-timer">60</span>s
                        </div>
                        <div id="cycle-progress-bar" style="background: rgba(255,255,255,0.1); height: 15px; border-radius: 8px; overflow: hidden; max-width: 500px; margin: 10px auto;">
                            <div id="cycle-progress-fill" style="background: linear-gradient(90deg, var(--success-color), #27ae60); height: 100%; width: 100%; transition: width 0.3s linear;"></div>
                        </div>
                    </div>
                    
                    <div id="allies-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">
                        <!-- Allies will be generated here -->
                    </div>
                    
                    <div id="current-ally-detail" style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.08); border-radius: 8px; min-height: 200px; display: none;">
                        <!-- Detailed ally info will be shown here when swapping -->
                    </div>
                    
                    <div id="feedback9" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel9()" class="btn btn-warning" style="background: var(--warning-color);">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Add level-specific styles
    if (!document.getElementById('level9-styles')) {
        const style = document.createElement('style');
        style.id = 'level9-styles';
        style.textContent = `
        .ally-card {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 15px;
            transition: all 0.3s ease;
        }
        
        .ally-card:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-2px);
        }
        
        .ally-card.completed {
            border-color: var(--success-color);
            background: rgba(46, 204, 113, 0.1);
        }
        
        .ally-card.failed {
            border-color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
        }
        
        .ally-card.active {
            border-color: var(--highlight-color);
            box-shadow: 0 0 20px rgba(233, 69, 96, 0.3);
        }
        
        .heartbeat-display {
            height: 80px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            position: relative;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .heartbeat-line {
            position: absolute;
            bottom: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--success-color);
        }
        
        .heartbeat-pulse {
            animation: pulse 1s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 5px;
        }
        
        .status-indicator.monitoring {
            background: var(--success-color);
            box-shadow: 0 0 10px var(--success-color);
        }
        
        .status-indicator.stopped {
            background: #95a5a6;
        }
        
        .status-indicator.reading {
            background: var(--warning-color);
            animation: blink 0.5s ease-in-out infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        .result-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 0.9rem;
            margin: 2px;
        }
        
        .result-badge.orange {
            background: rgba(243, 156, 18, 0.3);
            border: 2px solid var(--warning-color);
            color: var(--warning-color);
        }
        
        .result-badge.green {
            background: rgba(46, 204, 113, 0.3);
            border: 2px solid var(--success-color);
            color: var(--success-color);
        }
        
        .result-badge.red {
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
            color: #e74c3c;
        }
        
        .swap-button {
            background: var(--highlight-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        
        .swap-button:hover:not(:disabled) {
            background: #ff6b9d;
            transform: scale(1.05);
        }
        
        .swap-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .heartbeat-config {
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }
        
        .config-slider {
            width: 100%;
            margin: 10px 0;
        }
        `;
        document.head.appendChild(style);
    }
    
    // Generate 5 allies with different heartbeat patterns
    const allies = [
        { id: 1, name: 'Ally Alpha', heartRate: 72, variability: 5, pattern: 'steady' },
        { id: 2, name: 'Ally Beta', heartRate: 85, variability: 8, pattern: 'moderate' },
        { id: 3, name: 'Ally Gamma', heartRate: 65, variability: 3, pattern: 'calm' },
        { id: 4, name: 'Ally Delta', heartRate: 95, variability: 12, pattern: 'stressed' },
        { id: 5, name: 'Ally Epsilon', heartRate: 78, variability: 6, pattern: 'normal' }
    ].map(ally => ({
        ...ally,
        status: 'pending', // pending, swapped, completed, failed
        consecutiveOranges: 0,
        results: [],
        deviceRemoved: false,
        collarConfigured: false,
        configuredRate: 70,
        configuredVariability: 5
    }));
    
    window.level9Data = {
        allies,
        currentAlly: null,
        cyclePhase: 'monitoring', // monitoring, stopped, reading
        cycleTime: 60, // Time remaining in current phase
        monitorCycleDuration: 60,
        readingDuration: 15,
        gameCompleted: false,
        gameFailed: false
    };
    
    renderAllies9();
    startCycle9();
}

function renderAllies9() {
    const data = window.level9Data;
    if (!data) return;
    
    const container = document.getElementById('allies-container');
    container.innerHTML = '';
    
    data.allies.forEach(ally => {
        const card = document.createElement('div');
        card.className = 'ally-card';
        
        if (ally.status === 'completed') {
            card.classList.add('completed');
        } else if (ally.status === 'failed') {
            card.classList.add('failed');
        } else if (data.currentAlly && data.currentAlly.id === ally.id) {
            card.classList.add('active');
        }
        
        const statusIcon = ally.status === 'completed' ? '✓' : 
                          ally.status === 'failed' ? '✗' : 
                          ally.deviceRemoved ? '⚙️' : '○';
        
        const resultsHTML = ally.results.length > 0 ? 
            `<div style="margin-top: 10px;">
                ${ally.results.map(r => 
                    `<span class="result-badge ${r}">${r.toUpperCase()}</span>`
                ).join('')}
            </div>` : '';
        
        card.innerHTML = `
            <div style="font-weight: bold; font-size: 1.1rem; margin-bottom: 8px;">
                ${statusIcon} ${ally.name}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                Heart Rate: ${ally.heartRate} ± ${ally.variability} BPM
            </div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">
                Pattern: ${ally.pattern}
            </div>
            ${ally.deviceRemoved ? `
                <div style="font-size: 0.85rem; color: var(--warning-color); margin-bottom: 5px;">
                    Device: REMOVED
                </div>
                <div style="font-size: 0.85rem; opacity: 0.8;">
                    Collar: ${ally.configuredRate} ± ${ally.configuredVariability} BPM
                </div>
            ` : ''}
            ${resultsHTML}
            <div style="margin-top: 10px;">
                ${ally.consecutiveOranges > 0 ? 
                    `<div style="font-size: 0.85rem; color: var(--warning-color);">
                        Consecutive Oranges: ${ally.consecutiveOranges}/3
                    </div>` : ''}
            </div>
            ${ally.status === 'pending' && !ally.deviceRemoved && data.cyclePhase === 'monitoring' ? 
                `<button class="swap-button" onclick="startSwap9(${ally.id})">Review & Swap</button>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function startSwap9(allyId) {
    const data = window.level9Data;
    if (!data || data.cyclePhase !== 'monitoring') return;
    
    const ally = data.allies.find(a => a.id === allyId);
    if (!ally || ally.deviceRemoved) return;
    
    data.currentAlly = ally;
    
    const detailDiv = document.getElementById('current-ally-detail');
    detailDiv.style.display = 'block';
    
    detailDiv.innerHTML = `
        <h3 style="margin-bottom: 15px; color: var(--highlight-color);">
            ${ally.name} - Heartbeat Review & Configuration
        </h3>
        
        <div style="margin: 20px 0; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
            <h4 style="margin-bottom: 10px;">Original Heartbeat Pattern</h4>
            <div style="font-size: 1rem; margin-bottom: 10px;">
                Base Rate: <strong>${ally.heartRate} BPM</strong> | 
                Variability: <strong>± ${ally.variability} BPM</strong> | 
                Pattern: <strong>${ally.pattern}</strong>
            </div>
            <div class="heartbeat-display">
                <canvas id="heartbeat-canvas-${ally.id}" width="400" height="80"></canvas>
            </div>
        </div>
        
        <div class="heartbeat-config">
            <h4 style="margin-bottom: 15px;">Configure Shock Collar Mimicry</h4>
            <div style="margin: 15px 0;">
                <label style="display: block; margin-bottom: 5px;">
                    Heart Rate: <strong id="config-rate-${ally.id}">${ally.configuredRate}</strong> BPM
                </label>
                <input type="range" class="config-slider" id="rate-slider-${ally.id}" 
                       min="60" max="100" value="${ally.configuredRate}" 
                       onchange="updateConfig9(${ally.id}, 'rate', this.value)" />
            </div>
            <div style="margin: 15px 0;">
                <label style="display: block; margin-bottom: 5px;">
                    Variability: <strong id="config-var-${ally.id}">± ${ally.configuredVariability}</strong> BPM
                </label>
                <input type="range" class="config-slider" id="var-slider-${ally.id}" 
                       min="0" max="15" value="${ally.configuredVariability}" 
                       onchange="updateConfig9(${ally.id}, 'variability', this.value)" />
            </div>
            <div style="margin: 20px 0;">
                <button class="swap-button" onclick="confirmSwap9(${ally.id})" 
                        style="font-size: 1.1rem; padding: 12px 30px;">
                    Remove Device & Install Collar
                </button>
                <button class="swap-button" onclick="cancelSwap9()" 
                        style="background: #95a5a6; margin-left: 10px;">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    // Draw heartbeat visualization
    setTimeout(() => drawHeartbeat9(ally), 50);
    
    document.getElementById('feedback9').innerHTML = 
        '<span style="color: var(--warning-color);">Review the heartbeat pattern and configure the collar to match as closely as possible.</span>';
    
    renderAllies9();
}

function drawHeartbeat9(ally) {
    const canvas = document.getElementById(`heartbeat-canvas-${ally.id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw baseline
    ctx.strokeStyle = 'rgba(46, 204, 113, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Draw heartbeat pattern
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const beats = 5;
    const beatWidth = width / beats;
    
    for (let i = 0; i < beats; i++) {
        const baseX = i * beatWidth;
        const variance = (Math.random() - 0.5) * ally.variability * 2;
        const amplitude = 30 + variance;
        
        // ECG-like pattern
        ctx.moveTo(baseX, height / 2);
        ctx.lineTo(baseX + beatWidth * 0.2, height / 2);
        ctx.lineTo(baseX + beatWidth * 0.3, height / 2 - amplitude);
        ctx.lineTo(baseX + beatWidth * 0.35, height / 2 + amplitude * 0.3);
        ctx.lineTo(baseX + beatWidth * 0.4, height / 2);
        ctx.lineTo(baseX + beatWidth, height / 2);
    }
    
    ctx.stroke();
}

function updateConfig9(allyId, type, value) {
    const data = window.level9Data;
    if (!data || !data.currentAlly || data.currentAlly.id !== allyId) return;
    
    const ally = data.currentAlly;
    
    if (type === 'rate') {
        ally.configuredRate = parseInt(value);
        document.getElementById(`config-rate-${allyId}`).textContent = value;
    } else if (type === 'variability') {
        ally.configuredVariability = parseInt(value);
        document.getElementById(`config-var-${allyId}`).textContent = `± ${value}`;
    }
}

function confirmSwap9(allyId) {
    const data = window.level9Data;
    if (!data || !data.currentAlly || data.currentAlly.id !== allyId) return;
    
    const ally = data.currentAlly;
    ally.deviceRemoved = true;
    ally.collarConfigured = true;
    ally.status = 'swapped';
    
    document.getElementById('current-ally-detail').style.display = 'none';
    document.getElementById('feedback9').innerHTML = 
        `<span style="color: var(--success-color);">✓ Device removed from ${ally.name} and shock collar installed. Awaiting validation reading...</span>`;
    
    data.currentAlly = null;
    renderAllies9();
}

function cancelSwap9() {
    const data = window.level9Data;
    if (!data) return;
    
    data.currentAlly = null;
    document.getElementById('current-ally-detail').style.display = 'none';
    document.getElementById('feedback9').innerHTML = '';
    renderAllies9();
}

function startCycle9() {
    const data = window.level9Data;
    if (!data) return;
    
    // Main cycle interval (runs every second)
    data.cycleInterval = setInterval(() => {
        if (data.gameCompleted || data.gameFailed) {
            clearInterval(data.cycleInterval);
            return;
        }
        
        data.cycleTime--;
        document.getElementById('cycle-timer').textContent = data.cycleTime;
        
        // Update progress bar
        let progress;
        if (data.cyclePhase === 'monitoring') {
            progress = (data.cycleTime / data.monitorCycleDuration) * 100;
        } else if (data.cyclePhase === 'stopped') {
            progress = (data.cycleTime / data.monitorCycleDuration) * 100;
        } else if (data.cyclePhase === 'reading') {
            progress = (data.cycleTime / data.readingDuration) * 100;
        }
        document.getElementById('cycle-progress-fill').style.width = progress + '%';
        
        if (data.cycleTime <= 0) {
            transitionCyclePhase9();
        }
    }, 1000);
}

function transitionCyclePhase9() {
    const data = window.level9Data;
    if (!data) return;
    
    if (data.cyclePhase === 'monitoring') {
        // Move to stopped phase
        data.cyclePhase = 'stopped';
        data.cycleTime = data.monitorCycleDuration;
        
        document.getElementById('cycle-status').textContent = 'STOPPED';
        document.getElementById('cycle-status').style.color = '#95a5a6';
        document.getElementById('cycle-progress-fill').style.background = 
            'linear-gradient(90deg, #95a5a6, #7f8c8d)';
        
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: #95a5a6;">Device monitoring stopped. Waiting for next cycle...</span>';
        
    } else if (data.cyclePhase === 'stopped') {
        // Move to reading phase
        data.cyclePhase = 'reading';
        data.cycleTime = data.readingDuration;
        
        document.getElementById('cycle-status').textContent = 'READING';
        document.getElementById('cycle-status').style.color = 'var(--warning-color)';
        document.getElementById('cycle-progress-fill').style.background = 
            'linear-gradient(90deg, var(--warning-color), #e67e22)';
        
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: var(--warning-color);">⚠️ Taking 15-second validation readings...</span>';
        
    } else if (data.cyclePhase === 'reading') {
        // Process readings and return to monitoring
        processReadings9();
        
        data.cyclePhase = 'monitoring';
        data.cycleTime = data.monitorCycleDuration;
        
        document.getElementById('cycle-status').textContent = 'MONITORING';
        document.getElementById('cycle-status').style.color = 'var(--success-color)';
        document.getElementById('cycle-progress-fill').style.background = 
            'linear-gradient(90deg, var(--success-color), #27ae60)';
    }
    
    renderAllies9();
}

function processReadings9() {
    const data = window.level9Data;
    if (!data) return;
    
    let allCompleted = true;
    let anyFailed = false;
    
    data.allies.forEach(ally => {
        if (ally.status === 'completed' || ally.status === 'failed') {
            return;
        }
        
        if (!ally.deviceRemoved) {
            allCompleted = false;
            return;
        }
        
        // Calculate accuracy of the configured collar
        const rateDiff = Math.abs(ally.heartRate - ally.configuredRate);
        const varDiff = Math.abs(ally.variability - ally.configuredVariability);
        
        // Determine result based on accuracy
        // Green: within 3 BPM for rate and 2 for variability
        // Orange: outside those thresholds
        let result;
        if (rateDiff <= 3 && varDiff <= 2) {
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
    
    // Check win/lose conditions
    if (anyFailed) {
        data.gameFailed = true;
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: #e74c3c; font-size: 1.3rem;">❌ ALERT TRIGGERED! An ally\'s mimicry failed after 3 attempts. Mission failed!</span>';
        
        setTimeout(() => {
            if (confirm('Mission failed. Would you like to try again?')) {
                initLevel9();
            } else {
                showScreen('level-select');
            }
        }, 3000);
    } else if (allCompleted) {
        data.gameCompleted = true;
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: var(--success-color); font-size: 1.5rem;">✓ ALL ALLIES SECURED! All heartbeat mimicry successful!</span>';
        
        setTimeout(() => completeLevel(9), 2000);
    } else {
        // Show results feedback
        const orangeAllies = data.allies.filter(a => 
            a.results.length > 0 && a.results[a.results.length - 1] === 'orange'
        );
        
        if (orangeAllies.length > 0) {
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: var(--warning-color);">⚠️ Some allies need refinement: ${orangeAllies.map(a => a.name).join(', ')}. Adjust their collars during the next monitoring phase.</span>`;
        }
    }
    
    renderAllies9();
}
