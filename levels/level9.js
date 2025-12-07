// Level 9: CCTV Security Breach - Hack security cameras and guide comrade to control room
function initLevel9() {
    const container = document.getElementById('level-9');
    
    // Cleanup previous intervals and listeners if they exist
    if (window.level9Data) {
        if (window.level9Data.gameInterval) clearInterval(window.level9Data.gameInterval);
        if (window.level9Data.recordingInterval) clearInterval(window.level9Data.recordingInterval);
        if (window.level9Data.uploadInterval) clearInterval(window.level9Data.uploadInterval);
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 9: CCTV Security Breach</h2>
                <p>Hack the security system and guide your comrade to the control room</p>
            </div>
            
            <div class="level-narrative">
                You've tapped into the prison's security network. Ten cameras monitor the facility,
                but the guards are watching. For each camera, wait for a clear view with no activity,
                record a 20-second loop, and upload it to fool the system. Then observe guard patrol
                routes and guide your comrade to the control room without detection.
            </div>
            
            <div class="puzzle-container">
                <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
                    <!-- Heatmap View -->
                    <div style="flex: 1; min-width: 400px;">
                        <h3 style="margin-bottom: 15px; text-align: center;">Security Overview</h3>
                        <canvas id="heatmap-canvas" width="500" height="500" 
                                style="border: 3px solid var(--highlight-color); border-radius: 8px; 
                                       background: #0a0a0a; max-width: 100%; cursor: pointer;"></canvas>
                        <div id="heatmap-legend" style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8; text-align: center;">
                            🔵 Cameras | 🔴 Guards | 🟢 Comrade | ⭐ Control Room
                        </div>
                    </div>
                    
                    <!-- Camera Control Panel -->
                    <div style="flex: 0 0 300px;">
                        <h3 style="margin-bottom: 15px; text-align: center;">Camera Control</h3>
                        <div id="camera-list" style="max-height: 400px; overflow-y: auto;"></div>
                        <div id="camera-status" style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                            <div style="font-weight: bold; margin-bottom: 10px;">Progress:</div>
                            <div id="cameras-hacked">Cameras Hacked: <span style="color: var(--success-color);">0/10</span></div>
                            <div id="comrade-status" style="margin-top: 10px;">Comrade Status: <span style="color: var(--warning-color);">Waiting</span></div>
                        </div>
                    </div>
                </div>
                
                <!-- Active Camera View -->
                <div id="camera-view-panel" style="display: none; margin-top: 20px; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 8px;">
                    <h3 style="margin-bottom: 15px;">Camera <span id="active-camera-id"></span> Feed</h3>
                    <canvas id="camera-feed" width="400" height="300" 
                            style="border: 2px solid var(--accent-color); border-radius: 8px; 
                                   background: #000; display: block; margin: 0 auto;"></canvas>
                    <div id="camera-controls" style="margin-top: 15px; text-align: center;">
                        <div id="activity-indicator" style="margin-bottom: 15px; font-size: 1.1rem;"></div>
                        <div id="recording-status" style="margin-bottom: 15px;"></div>
                        <button id="record-btn" class="btn btn-primary" style="display: none;">Start Recording</button>
                        <button id="close-camera-btn" class="btn btn-secondary">Close Camera</button>
                    </div>
                </div>
                
                <div id="feedback9" style="min-height: 40px; margin-top: 20px; font-size: 1.1rem; text-align: center;"></div>
            </div>
            
            <div class="level-controls">
                <button id="guide-comrade-btn" class="btn btn-success" style="display: none; background: var(--success-color);">Guide Comrade</button>
                <button onclick="initLevel9()" class="btn btn-warning">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize game state
    const gridSize = 10;
    const cellSize = 50;
    
    // Camera positions (distributed across the facility)
    const cameras = [
        { id: 1, x: 1, y: 1, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 2, x: 8, y: 1, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 3, x: 1, y: 5, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 4, x: 8, y: 5, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 5, x: 5, y: 2, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 6, x: 2, y: 8, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 7, x: 8, y: 8, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 8, x: 5, y: 5, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 9, x: 3, y: 3, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 10, x: 6, y: 7, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 }
    ];
    
    // Guard patrol routes
    const guards = [
        { x: 2, y: 2, path: [[2,2], [4,2], [4,4], [2,4]], pathIndex: 0, color: '#e74c3c' },
        { x: 7, y: 3, path: [[7,3], [7,6], [9,6], [9,3]], pathIndex: 0, color: '#c0392b' },
        { x: 4, y: 7, path: [[4,7], [6,7], [6,9], [4,9]], pathIndex: 0, color: '#e67e22' }
    ];
    
    // Comrade position and destination
    const comrade = { x: 0, y: 9, moving: false, path: [], pathIndex: 0 };
    const controlRoom = { x: 9, y: 0 };
    
    window.level9Data = {
        gridSize,
        cellSize,
        cameras,
        guards,
        comrade,
        controlRoom,
        activeCamera: null,
        recordingProgress: 0,
        uploadProgress: 0,
        gameActive: true,
        phase: 'hacking', // 'hacking' or 'guiding'
        gameInterval: null,
        recordingInterval: null,
        uploadInterval: null
    };
    
    // Setup canvas click handler for camera selection
    const heatmapCanvas = document.getElementById('heatmap-canvas');
    heatmapCanvas.addEventListener('click', handleHeatmapClick);
    
    // Setup camera control buttons
    document.getElementById('record-btn').addEventListener('click', startRecording);
    document.getElementById('close-camera-btn').addEventListener('click', closeCameraView);
    document.getElementById('guide-comrade-btn').addEventListener('click', startGuidingComrade);
    
    // Start game loop
    window.level9Data.gameInterval = setInterval(updateGame9, 500);
    
    // Initial render
    renderCameraList();
    renderHeatmap();
}

function handleHeatmapClick(e) {
    const data = window.level9Data;
    if (!data || data.phase !== 'hacking') return;
    
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const gridX = Math.floor(x / data.cellSize);
    const gridY = Math.floor(y / data.cellSize);
    
    // Check if clicked on a camera
    const camera = data.cameras.find(cam => cam.x === gridX && cam.y === gridY);
    if (camera && !camera.uploaded) {
        openCameraView(camera);
    }
}

function openCameraView(camera) {
    const data = window.level9Data;
    data.activeCamera = camera;
    
    document.getElementById('camera-view-panel').style.display = 'block';
    document.getElementById('active-camera-id').textContent = camera.id;
    
    renderCameraFeed();
    updateCameraControls();
}

function closeCameraView() {
    const data = window.level9Data;
    data.activeCamera = null;
    document.getElementById('camera-view-panel').style.display = 'none';
    
    if (data.recordingInterval) {
        clearInterval(data.recordingInterval);
        data.recordingInterval = null;
    }
    if (data.uploadInterval) {
        clearInterval(data.uploadInterval);
        data.uploadInterval = null;
    }
}

function renderCameraFeed() {
    const data = window.level9Data;
    if (!data.activeCamera) return;
    
    const canvas = document.getElementById('camera-feed');
    const ctx = canvas.getContext('2d');
    
    // Simulate camera feed with activity
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw static/noise effect
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.fillRect(x, y, size, size);
    }
    
    // Draw grid lines to simulate camera view
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Show activity if present
    if (data.activeCamera.hasActivity) {
        // Draw moving "person" silhouette
        const activityX = (Date.now() / 20) % canvas.width;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(activityX - 20, canvas.height - 80, 40, 70);
        ctx.beginPath();
        ctx.arc(activityX, canvas.height - 90, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Camera timestamp
    ctx.fillStyle = '#0f0';
    ctx.font = '14px monospace';
    ctx.fillText(`CAM ${data.activeCamera.id} - ${new Date().toLocaleTimeString()}`, 10, 20);
    
    if (data.activeCamera.recording) {
        ctx.fillStyle = '#f00';
        ctx.fillText(`REC ${Math.floor(data.recordingProgress)}s / 20s`, 10, 40);
        ctx.beginPath();
        ctx.arc(canvas.width - 20, 20, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateCameraControls() {
    const data = window.level9Data;
    if (!data.activeCamera) return;
    
    const camera = data.activeCamera;
    const activityDiv = document.getElementById('activity-indicator');
    const recordBtn = document.getElementById('record-btn');
    const recordingStatus = document.getElementById('recording-status');
    
    if (camera.uploaded) {
        activityDiv.innerHTML = '<span style="color: var(--success-color);">✓ Camera hacked and loop uploaded!</span>';
        recordBtn.style.display = 'none';
        recordingStatus.innerHTML = '';
    } else if (camera.recording) {
        activityDiv.innerHTML = '<span style="color: var(--warning-color);">Recording in progress...</span>';
        recordBtn.style.display = 'none';
        recordingStatus.innerHTML = `<div style="background: rgba(233, 69, 96, 0.2); padding: 10px; border-radius: 5px;">
            Progress: ${Math.floor(data.recordingProgress)}/20 seconds
        </div>`;
    } else if (camera.hasActivity) {
        activityDiv.innerHTML = '<span style="color: #e74c3c;">⚠ Activity detected - Wait for clear view</span>';
        recordBtn.style.display = 'none';
        recordingStatus.innerHTML = `<div style="color: #f39c12; font-size: 0.9rem;">
            Waiting for activity to clear... (${Math.floor(camera.activityTimer)}s)
        </div>`;
    } else {
        activityDiv.innerHTML = '<span style="color: var(--success-color);">✓ Clear view - Ready to record</span>';
        recordBtn.style.display = 'inline-block';
        recordingStatus.innerHTML = '';
    }
}

function startRecording() {
    const data = window.level9Data;
    if (!data.activeCamera || data.activeCamera.hasActivity) return;
    
    data.activeCamera.recording = true;
    data.recordingProgress = 0;
    
    data.recordingInterval = setInterval(() => {
        data.recordingProgress += 0.5;
        
        if (data.recordingProgress >= 20) {
            clearInterval(data.recordingInterval);
            data.recordingInterval = null;
            data.activeCamera.recording = false;
            startUploading();
        }
        
        renderCameraFeed();
        updateCameraControls();
    }, 500);
    
    updateCameraControls();
}

function startUploading() {
    const data = window.level9Data;
    if (!data.activeCamera) return;
    
    data.uploadProgress = 0;
    document.getElementById('recording-status').innerHTML = `
        <div style="background: rgba(46, 204, 113, 0.2); padding: 10px; border-radius: 5px;">
            <div>Uploading loop to system...</div>
            <div style="margin-top: 5px; background: rgba(255,255,255,0.1); height: 20px; border-radius: 10px; overflow: hidden;">
                <div id="upload-bar" style="width: 0%; height: 100%; background: var(--success-color); transition: width 0.3s;"></div>
            </div>
        </div>
    `;
    
    data.uploadInterval = setInterval(() => {
        data.uploadProgress += 10;
        
        const uploadBar = document.getElementById('upload-bar');
        if (uploadBar) {
            uploadBar.style.width = data.uploadProgress + '%';
        }
        
        if (data.uploadProgress >= 100) {
            clearInterval(data.uploadInterval);
            data.uploadInterval = null;
            data.activeCamera.uploaded = true;
            data.activeCamera.hacked = true;
            
            updateCameraControls();
            renderCameraList();
            updateProgress();
            
            const hackedCount = data.cameras.filter(c => c.hacked).length;
            if (hackedCount === data.cameras.length) {
                setTimeout(() => {
                    closeCameraView();
                    enterGuidingPhase();
                }, 1500);
            }
        }
    }, 300);
}

function renderCameraList() {
    const data = window.level9Data;
    const listDiv = document.getElementById('camera-list');
    
    listDiv.innerHTML = data.cameras.map(cam => {
        const status = cam.uploaded ? '✓ Hacked' : cam.recording ? '⏺ Recording' : cam.hasActivity ? '⚠ Active' : '○ Clear';
        const statusColor = cam.uploaded ? 'var(--success-color)' : cam.recording ? 'var(--warning-color)' : cam.hasActivity ? '#e74c3c' : '#3498db';
        
        return `
            <div class="camera-item" data-camera-id="${cam.id}" style="padding: 10px; margin-bottom: 8px; background: rgba(255,255,255,0.05); border-radius: 5px; 
                        border-left: 3px solid ${statusColor}; cursor: ${cam.uploaded ? 'default' : 'pointer'};">
                <div style="font-weight: bold;">Camera ${cam.id}</div>
                <div style="font-size: 0.9rem; opacity: 0.8; color: ${statusColor};">${status}</div>
            </div>
        `;
    }).join('');
    
    // Add event listeners to camera items
    listDiv.querySelectorAll('.camera-item').forEach(item => {
        const cameraId = parseInt(item.getAttribute('data-camera-id'));
        const camera = data.cameras.find(c => c.id === cameraId);
        if (camera && !camera.uploaded) {
            item.addEventListener('click', () => openCameraView(camera));
        }
    });
}

function renderHeatmap() {
    const data = window.level9Data;
    if (!data) return;
    
    const canvas = document.getElementById('heatmap-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= data.gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * data.cellSize, 0);
        ctx.lineTo(i * data.cellSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * data.cellSize);
        ctx.lineTo(canvas.width, i * data.cellSize);
        ctx.stroke();
    }
    
    // Draw heatmap for guard activity (recent positions)
    if (data.phase === 'guiding') {
        data.guards.forEach(guard => {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            guard.path.forEach(pos => {
                ctx.fillRect(pos[0] * data.cellSize, pos[1] * data.cellSize, data.cellSize, data.cellSize);
            });
        });
    }
    
    // Draw control room
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(
        data.controlRoom.x * data.cellSize + data.cellSize / 2,
        data.controlRoom.y * data.cellSize + data.cellSize / 2,
        data.cellSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⭐', data.controlRoom.x * data.cellSize + data.cellSize / 2, 
                        data.controlRoom.y * data.cellSize + data.cellSize / 2 + 7);
    
    // Draw cameras
    data.cameras.forEach(cam => {
        ctx.fillStyle = cam.hacked ? '#2ecc71' : '#3498db';
        ctx.beginPath();
        ctx.arc(
            cam.x * data.cellSize + data.cellSize / 2,
            cam.y * data.cellSize + data.cellSize / 2,
            data.cellSize / 4,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Camera label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(cam.id, cam.x * data.cellSize + data.cellSize / 2, 
                             cam.y * data.cellSize + data.cellSize / 2 + 4);
    });
    
    // Draw guards
    data.guards.forEach(guard => {
        ctx.fillStyle = guard.color;
        ctx.beginPath();
        ctx.arc(
            guard.x * data.cellSize + data.cellSize / 2,
            guard.y * data.cellSize + data.cellSize / 2,
            data.cellSize / 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Guard patrol path line
        if (data.phase === 'guiding') {
            ctx.strokeStyle = guard.color;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            guard.path.forEach((pos, i) => {
                const px = pos[0] * data.cellSize + data.cellSize / 2;
                const py = pos[1] * data.cellSize + data.cellSize / 2;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    });
    
    // Draw comrade
    if (data.phase === 'guiding') {
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(
            data.comrade.x * data.cellSize + data.cellSize / 2,
            data.comrade.y * data.cellSize + data.cellSize / 2,
            data.cellSize / 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('C', data.comrade.x * data.cellSize + data.cellSize / 2, 
                          data.comrade.y * data.cellSize + data.cellSize / 2 + 5);
        
        // Draw comrade's path if moving
        if (data.comrade.path.length > 0) {
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 3;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            data.comrade.path.forEach((pos, i) => {
                const px = pos[0] * data.cellSize + data.cellSize / 2;
                const py = pos[1] * data.cellSize + data.cellSize / 2;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
}

function updateGame9() {
    const data = window.level9Data;
    if (!data || !data.gameActive) return;
    
    // Update camera activity randomly
    data.cameras.forEach(cam => {
        if (!cam.hacked) {
            cam.activityTimer += 0.5;
            
            // Activity clears after 5-10 seconds
            if (cam.hasActivity && cam.activityTimer > 5 + Math.random() * 5) {
                cam.hasActivity = false;
                cam.activityTimer = 0;
            }
            // Activity returns after 3-8 seconds
            else if (!cam.hasActivity && cam.activityTimer > 3 + Math.random() * 5) {
                cam.hasActivity = true;
                cam.activityTimer = 0;
            }
        }
    });
    
    // Update guards patrol
    data.guards.forEach(guard => {
        const targetPos = guard.path[guard.pathIndex];
        if (guard.x === targetPos[0] && guard.y === targetPos[1]) {
            guard.pathIndex = (guard.pathIndex + 1) % guard.path.length;
        } else {
            // Move towards target
            if (guard.x < targetPos[0]) guard.x++;
            else if (guard.x > targetPos[0]) guard.x--;
            if (guard.y < targetPos[1]) guard.y++;
            else if (guard.y > targetPos[1]) guard.y--;
        }
    });
    
    // Update comrade movement
    if (data.comrade.moving && data.comrade.path.length > 0) {
        const targetPos = data.comrade.path[data.comrade.pathIndex];
        if (data.comrade.x === targetPos[0] && data.comrade.y === targetPos[1]) {
            data.comrade.pathIndex++;
            
            if (data.comrade.pathIndex >= data.comrade.path.length) {
                data.comrade.moving = false;
                data.comrade.path = [];
                data.comrade.pathIndex = 0;
                
                // Check if reached control room
                if (data.comrade.x === data.controlRoom.x && data.comrade.y === data.controlRoom.y) {
                    handleVictory9();
                }
            }
        } else {
            // Move towards target
            if (data.comrade.x < targetPos[0]) data.comrade.x++;
            else if (data.comrade.x > targetPos[0]) data.comrade.x--;
            if (data.comrade.y < targetPos[1]) data.comrade.y++;
            else if (data.comrade.y > targetPos[1]) data.comrade.y--;
        }
        
        // Check if caught by guard
        const caught = data.guards.some(g => g.x === data.comrade.x && g.y === data.comrade.y);
        if (caught) {
            handleCaught();
        }
    }
    
    // Update UI
    if (data.activeCamera) {
        renderCameraFeed();
        updateCameraControls();
    }
    renderCameraList();
    renderHeatmap();
}

function updateProgress() {
    const data = window.level9Data;
    const hackedCount = data.cameras.filter(c => c.hacked).length;
    
    document.getElementById('cameras-hacked').innerHTML = 
        `Cameras Hacked: <span style="color: var(--success-color);">${hackedCount}/10</span>`;
}

function enterGuidingPhase() {
    const data = window.level9Data;
    data.phase = 'guiding';
    
    document.getElementById('feedback9').innerHTML = 
        `<span style="color: var(--success-color); font-size: 1.3rem;">✓ All cameras hacked! Now guide your comrade to the control room.</span>`;
    
    document.getElementById('comrade-status').innerHTML = 
        'Comrade Status: <span style="color: var(--success-color);">Ready to move</span>';
    
    document.getElementById('guide-comrade-btn').style.display = 'inline-block';
    
    renderHeatmap();
}

function startGuidingComrade() {
    const data = window.level9Data;
    if (data.comrade.moving) return;
    
    // Simple path: move to control room avoiding guards
    // For simplicity, use a direct path (could implement A* for more sophistication)
    const path = [];
    let cx = data.comrade.x;
    let cy = data.comrade.y;
    
    // Create a safe path (going around guard patrol zones)
    // Path: (0,9) -> (0,0) -> (9,0)
    while (cy > 0) {
        cy--;
        path.push([cx, cy]);
    }
    while (cx < data.controlRoom.x) {
        cx++;
        path.push([cx, cy]);
    }
    
    data.comrade.path = path;
    data.comrade.pathIndex = 0;
    data.comrade.moving = true;
    
    document.getElementById('comrade-status').innerHTML = 
        'Comrade Status: <span style="color: var(--warning-color);">Moving to control room...</span>';
    
    document.getElementById('guide-comrade-btn').style.display = 'none';
}

function handleCaught() {
    const data = window.level9Data;
    data.comrade.moving = false;
    data.comrade.path = [];
    data.comrade.pathIndex = 0;
    data.comrade.x = 0;
    data.comrade.y = 9;
    
    document.getElementById('feedback9').innerHTML = 
        `<span style="color: #e74c3c; font-size: 1.3rem;">⚠ Comrade detected by guards! Resetting position...</span>`;
    
    setTimeout(() => {
        document.getElementById('feedback9').innerHTML = '';
        document.getElementById('guide-comrade-btn').style.display = 'inline-block';
        document.getElementById('comrade-status').innerHTML = 
            'Comrade Status: <span style="color: var(--warning-color);">Waiting for guidance</span>';
    }, 2000);
}

function handleVictory9() {
    const data = window.level9Data;
    data.gameActive = false;
    clearInterval(data.gameInterval);
    
    document.getElementById('feedback9').innerHTML = 
        `<span style="color: var(--success-color); font-size: 1.5rem;">✓ MISSION SUCCESS! Control room breached!</span>`;
    
    document.getElementById('comrade-status').innerHTML = 
        'Comrade Status: <span style="color: var(--success-color);">In control room!</span>';
    
    setTimeout(() => completeLevel(9), 2500);
}
