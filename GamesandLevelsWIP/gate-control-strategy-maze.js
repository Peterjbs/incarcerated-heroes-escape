// Level 9: Gate Master Maze - Lock and unlock gates to guide and trap
/**
 * Gate Control Strategy Maze
 * Strategic puzzle with environmental control and NPC guidance
 * 
 * Game Mechanics:
 * - Toggle gates to create/block paths
 * - Guide friendly NPCs (comrades) to exit
 * - Trap or avoid enemy NPCs
 * - Complex AI for NPCs and enemies
 * - Strategic planning required
 * 
 * Level ID: 9
 * Difficulty: Very Hard
 * Type: Strategy/Puzzle
 */


function initGateControlStrategyMaze() {
    const container = document.getElementById('level-9');
    
    // Cleanup previous state
    if (window.level9Data) {
        if (window.level9Data.timerInterval) clearInterval(window.level9Data.timerInterval);
        if (window.level9Data.enemyInterval) clearInterval(window.level9Data.enemyInterval);
        if (window.level9Data.keyHandler) {
            document.removeEventListener('keydown', window.level9Data.keyHandler);
        }
    }
    
    container.innerHTML = `
        <div class="level-container">
            <div class="level-header">
                <h2>Level 9: Gate Master Maze</h2>
                <p>Control gates to create paths and trap enemies - the final escape!</p>
            </div>
            
            <div class="level-narrative">
                This is it - the final challenge before freedom! Master the gate control system 
                to create safe passages while trapping enemies. Guide your comrades (green dots) 
                to the exit while avoiding or trapping enemies (red dots). 
                Lock and unlock gates strategically to succeed!
            </div>
            
            <div class="puzzle-container">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 1.1rem; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                            <span>Time: <span id="timer9">0</span>s</span>
                            <span>Comrades: <span id="comrades9" style="color: #2ecc71;">0</span>/3</span>
                            <span>Moves: <span id="moves9">0</span></span>
                        </div>
                    </div>
                    
                    <canvas id="maze-canvas9" width="700" height="700" 
                            style="border: 3px solid var(--highlight-color); border-radius: 10px; 
                                   background: rgba(0, 0, 0, 0.5); max-width: 100%; display: block; margin: 0 auto;"></canvas>
                    
                    <div id="feedback9" style="min-height: 40px; margin: 20px 0; font-size: 1.1rem;"></div>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 10px; font-weight: bold; color: #f39c12;">
                            Click on gates (yellow bars) to toggle them open/closed
                        </div>
                        <div style="margin-bottom: 10px;">Player Controls: Arrow Keys or WASD</div>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="movePlayer9('up')" class="btn btn-secondary" style="padding: 8px 16px;">↑ W</button>
                            <div style="width: 100%; display: flex; gap: 10px; justify-content: center;">
                                <button onclick="movePlayer9('left')" class="btn btn-secondary" style="padding: 8px 16px;">← A</button>
                                <button onclick="movePlayer9('down')" class="btn btn-secondary" style="padding: 8px 16px;">↓ S</button>
                                <button onclick="movePlayer9('right')" class="btn btn-secondary" style="padding: 8px 16px;">→ D</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; max-width: 600px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.9rem;">
                            <div><span style="color: #3498db;">●</span> You</div>
                            <div><span style="color: #2ecc71;">●</span> Comrades</div>
                            <div><span style="color: #e74c3c;">●</span> Enemies</div>
                            <div><span style="color: #f39c12;">▬</span> Gate (click)</div>
                            <div><span style="color: #95a5a6;">▬</span> Locked Gate</div>
                            <div><span style="color: #9b59b6;">★</span> Exit</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="level-controls">
                <button onclick="initLevel9()" class="btn btn-secondary">Restart Level</button>
                <button onclick="showScreen('level-select')" class="btn btn-back">Back to Levels</button>
            </div>
        </div>
    `;
    
    // Initialize game state
    const gridSize = 10;
    const cellSize = 50;
    
    // Facility map with walls and rooms (0 = path, 1 = wall, 2 = room)
    const facilityMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],  // Row 0 - Control room at top right
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],  // Row 1
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0],  // Row 2
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],  // Row 3
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],  // Row 4
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],  // Row 5
        [0, 1, 1, 0, 1, 1, 1, 0, 0, 0],  // Row 6
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],  // Row 7
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 0],  // Row 8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // Row 9 - Start position bottom left
    ];
    
    // Camera positions with viewing angles (distributed across the facility)
    const cameras = [
        { id: 1, x: 1, y: 1, angle: 45, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 2, x: 8, y: 1, angle: 225, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 3, x: 1, y: 5, angle: 0, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 4, x: 8, y: 5, angle: 180, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 5, x: 5, y: 2, angle: 270, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 6, x: 2, y: 8, angle: 90, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 7, x: 8, y: 8, angle: 315, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 8, x: 5, y: 5, angle: 180, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 9, x: 3, y: 3, angle: 135, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 },
        { id: 10, x: 6, y: 7, angle: 45, viewRange: 4, hacked: false, recording: false, uploaded: false, hasActivity: true, activityTimer: 0 }
    ];
    
    // Guard patrol routes
    const guards = [
        { x: 2, y: 2, path: [[2,2], [4,2], [4,4], [2,4]], pathIndex: 0, color: '#e74c3c' },
        { x: 7, y: 3, path: [[7,3], [7,6], [9,6], [9,3]], pathIndex: 0, color: '#c0392b' },
        { x: 4, y: 7, path: [[4,7], [6,7], [6,9], [4,9]], pathIndex: 0, color: '#e67e22' }
    ];
    
    // Flying objects (drones and robots)
    const flyingObjects = [
        { type: 'drone', x: 2, y: 1, vx: 0.1, vy: 0.05, emoji: '🚁' },
        { type: 'robot', x: 7, y: 4, vx: -0.08, vy: 0.1, emoji: '🤖' },
        { type: 'drone', x: 4, y: 6, vx: 0.12, vy: -0.06, emoji: '🛸' }
    ];
    
    // Escaped bionic kangaroo and joey
    const kangaroo = { 
        x: Math.random() * 8 + 1, 
        y: Math.random() * 8 + 1, 
        vx: 0, 
        vy: 0,
        searchTimer: 0,
        emoji: '🦘',
        size: 0.4
    };
    const joey = { 
        x: Math.random() * 8 + 1, 
        y: Math.random() * 8 + 1, 
        vx: 0, 
        vy: 0,
        searchTimer: 0,
        emoji: '🦘',
        size: 0.25
    };
    
    // Comrade position and destination
    const comrade = { x: 0, y: 9, moving: false, path: [], pathIndex: 0 };
    const controlRoom = { x: 9, y: 0 };
    
    window.level9Data = {
        gridSize,
        cellSize,
        facilityMap,
        cameras,
        guards,
        comrade,
        controlRoom,
        flyingObjects,
        kangaroo,
        joey,
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
    
    // Draw facility map (walls and rooms)
    for (let y = 0; y < data.gridSize; y++) {
        for (let x = 0; x < data.gridSize; x++) {
            const cellType = data.facilityMap[y][x];
            const px = x * data.cellSize;
            const py = y * data.cellSize;
            
            if (cellType === 1) {
                // Wall
                ctx.fillStyle = '#2c3e50';
                ctx.fillRect(px, py, data.cellSize - 1, data.cellSize - 1);
                // Add texture
                ctx.strokeStyle = '#34495e';
                ctx.lineWidth = 1;
                ctx.strokeRect(px + 2, py + 2, data.cellSize - 5, data.cellSize - 5);
            } else if (cellType === 2) {
                // Room (control room)
                ctx.fillStyle = '#16a085';
                ctx.fillRect(px, py, data.cellSize - 1, data.cellSize - 1);
            } else {
                // Path - draw grid
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.lineWidth = 1;
                ctx.strokeRect(px, py, data.cellSize, data.cellSize);
            }
        }
    }
    
    // Draw camera line of sight (radar-like view)
    data.cameras.forEach(cam => {
        if (cam.hacked || data.phase === 'guiding') {
            ctx.save();
            ctx.globalAlpha = 0.15;
            ctx.fillStyle = cam.hacked ? '#2ecc71' : '#3498db';
            
            const cx = cam.x * data.cellSize + data.cellSize / 2;
            const cy = cam.y * data.cellSize + data.cellSize / 2;
            const angleRad = (cam.angle * Math.PI) / 180;
            const viewAngle = 90 * Math.PI / 180; // 90 degree FOV
            
            // Draw cone of vision
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, cam.viewRange * data.cellSize, 
                   angleRad - viewAngle/2, angleRad + viewAngle/2);
            ctx.closePath();
            ctx.fill();
            
            // Draw radar sweep effect
            ctx.strokeStyle = cam.hacked ? '#2ecc71' : '#3498db';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.3;
            ctx.stroke();
            
            ctx.restore();
        }
    });
    
    // Draw heatmap for guard activity (recent positions)
    if (data.phase === 'guiding') {
        data.guards.forEach(guard => {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            guard.path.forEach(pos => {
                ctx.fillRect(pos[0] * data.cellSize, pos[1] * data.cellSize, data.cellSize, data.cellSize);
            });
        });
    }
    
    // Draw control room marker
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(
        data.controlRoom.x * data.cellSize + data.cellSize / 2,
        data.controlRoom.y * data.cellSize + data.cellSize / 2,
        data.cellSize / 3,
    // Initialize maze data
    const cellSize = 35;
    const gridSize = 20;
    
    window.level9Data = {
        cellSize,
        gridSize,
        playerPos: { x: 1, y: 1 },
        exitPos: { x: 18, y: 18 },
        comrades: [
            { x: 3, y: 3, rescued: false },
            { x: 10, y: 10, rescued: false },
            { x: 16, y: 8, rescued: false }
        ],
        enemies: [
            { x: 7, y: 5, dx: 1, dy: 0, trapped: false },
            { x: 13, y: 10, dx: 0, dy: 1, trapped: false },
            { x: 5, y: 15, dx: -1, dy: 0, trapped: false }
        ],
        gates: [
            { x: 5, y: 7, orientation: 'horizontal', open: true },
            { x: 10, y: 5, orientation: 'vertical', open: true },
            { x: 15, y: 12, orientation: 'horizontal', open: false },
            { x: 8, y: 15, orientation: 'vertical', open: true },
            { x: 12, y: 8, orientation: 'horizontal', open: false }
        ],
        walls: generateMazeWalls9(gridSize),
        comradesRescued: 0,
        moves: 0,
        startTime: Date.now(),
        timerInterval: null,
        enemyInterval: null,
        keyHandler: null
    };
    
    setupCanvas9();
    renderMaze9();
    
    // Canvas click handler for gates
    const canvas = document.getElementById('maze-canvas9');
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / window.level9Data.cellSize);
        const y = Math.floor((e.clientY - rect.top) / window.level9Data.cellSize);
        toggleGate9(x, y);
    });
    
    // Start enemy movement
    window.level9Data.enemyInterval = setInterval(() => {
        moveEnemies9();
        moveComrades9();
        checkCollision9();
    }, 400);
    
    // Start timer
    window.level9Data.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - window.level9Data.startTime) / 1000);
        document.getElementById('timer9').textContent = elapsed;
    }, 1000);
    
    // Keyboard controls
    const keyHandler = (e) => {
        const key = e.key.toLowerCase();
        if (['arrowup', 'w'].includes(key)) {
            e.preventDefault();
            movePlayer9('up');
        } else if (['arrowdown', 's'].includes(key)) {
            e.preventDefault();
            movePlayer9('down');
        } else if (['arrowleft', 'a'].includes(key)) {
            e.preventDefault();
            movePlayer9('left');
        } else if (['arrowright', 'd'].includes(key)) {
            e.preventDefault();
            movePlayer9('right');
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    window.level9Data.keyHandler = keyHandler;
}

function generateMazeWalls9(size) {
    const walls = new Set();
    
    // Add border walls
    for (let i = 0; i < size; i++) {
        walls.add(`0,${i}`);
        walls.add(`${size-1},${i}`);
        walls.add(`${i},0`);
        walls.add(`${i},${size-1}`);
    }
    
    // Add strategic interior walls
    for (let x = 4; x < size - 4; x += 5) {
        for (let y = 2; y < size - 2; y++) {
            if (y % 4 !== 0) walls.add(`${x},${y}`);
        }
    }
    
    return walls;
}

function setupCanvas9() {
    const canvas = document.getElementById('maze-canvas9');
    const data = window.level9Data;
    canvas.width = data.cellSize * data.gridSize;
    canvas.height = data.cellSize * data.gridSize;
}

function renderMaze9() {
    const canvas = document.getElementById('maze-canvas9');
    const ctx = canvas.getContext('2d');
    const data = window.level9Data;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = '#654321';
    data.walls.forEach(wallKey => {
        const [x, y] = wallKey.split(',').map(Number);
        ctx.fillRect(x * data.cellSize, y * data.cellSize, data.cellSize, data.cellSize);
    });
    
    // Draw gates
    data.gates.forEach(gate => {
        if (gate.orientation === 'horizontal') {
            ctx.fillStyle = gate.open ? '#f39c12' : '#95a5a6';
            ctx.fillRect(
                (gate.x - 1) * data.cellSize,
                gate.y * data.cellSize + data.cellSize / 2 - 3,
                data.cellSize * 3,
                6
            );
        } else {
            ctx.fillStyle = gate.open ? '#f39c12' : '#95a5a6';
            ctx.fillRect(
                gate.x * data.cellSize + data.cellSize / 2 - 3,
                (gate.y - 1) * data.cellSize,
                6,
                data.cellSize * 3
            );
        }
    });
    
    // Draw exit
    ctx.fillStyle = '#9b59b6';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
        '★',
        data.exitPos.x * data.cellSize + data.cellSize / 2,
        data.exitPos.y * data.cellSize + data.cellSize / 2
    );
    
    // Draw comrades
    data.comrades.forEach(comrade => {
        if (!comrade.rescued) {
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.arc(
                comrade.x * data.cellSize + data.cellSize / 2,
                comrade.y * data.cellSize + data.cellSize / 2,
                data.cellSize / 2 - 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    });
    
    // Draw enemies
    data.enemies.forEach(enemy => {
        if (!enemy.trapped) {
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(
                enemy.x * data.cellSize + data.cellSize / 2,
                enemy.y * data.cellSize + data.cellSize / 2,
                data.cellSize / 2 - 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    });
    
    // Draw player
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(
        data.playerPos.x * data.cellSize + data.cellSize / 2,
        data.playerPos.y * data.cellSize + data.cellSize / 2,
        data.cellSize / 2 - 2,
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
        
        // Direction indicator
        const angleRad = (cam.angle * Math.PI) / 180;
        const dx = Math.cos(angleRad) * data.cellSize / 3;
        const dy = Math.sin(angleRad) * data.cellSize / 3;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cam.x * data.cellSize + data.cellSize / 2, 
                   cam.y * data.cellSize + data.cellSize / 2);
        ctx.lineTo(cam.x * data.cellSize + data.cellSize / 2 + dx,
                   cam.y * data.cellSize + data.cellSize / 2 + dy);
        ctx.stroke();
    });
    
    // Draw flying objects (drones and robots)
    data.flyingObjects.forEach(obj => {
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.emoji, 
                    obj.x * data.cellSize + data.cellSize / 2,
                    obj.y * data.cellSize + data.cellSize / 2 + 7);
        
        // Add glow effect
        ctx.save();
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.fillText(obj.emoji, 
                    obj.x * data.cellSize + data.cellSize / 2,
                    obj.y * data.cellSize + data.cellSize / 2 + 7);
        ctx.restore();
    });
    
    // Draw bionic kangaroo and joey
    [data.kangaroo, data.joey].forEach(roo => {
        const size = roo.size * data.cellSize;
        ctx.font = `${size}px Arial`;
        ctx.textAlign = 'center';
        
        // Add search beam effect
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(roo.x * data.cellSize + data.cellSize / 2,
                roo.y * data.cellSize + data.cellSize / 2,
                data.cellSize * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw kangaroo
        ctx.save();
        ctx.shadowColor = '#ffeb3b';
        ctx.shadowBlur = 15;
        ctx.fillText(roo.emoji, 
                    roo.x * data.cellSize + data.cellSize / 2,
                    roo.y * data.cellSize + data.cellSize / 2 + size/3);
        ctx.restore();
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
    
    // Update flying objects
    data.flyingObjects.forEach(obj => {
        obj.x += obj.vx;
        obj.y += obj.vy;
        
        // Bounce off edges
        if (obj.x < 0 || obj.x > data.gridSize) {
            obj.vx *= -1;
            obj.x = Math.max(0, Math.min(data.gridSize, obj.x));
        }
        if (obj.y < 0 || obj.y > data.gridSize) {
            obj.vy *= -1;
            obj.y = Math.max(0, Math.min(data.gridSize, obj.y));
        }
    });
    
    // Update kangaroo and joey - they search for each other
    [data.kangaroo, data.joey].forEach((roo, idx) => {
        const other = idx === 0 ? data.joey : data.kangaroo;
        const dx = other.x - roo.x;
        const dy = other.y - roo.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If close enough, they found each other - celebrate briefly then separate
        if (distance < 0.5) {
            roo.searchTimer = 10; // Wait 5 seconds before searching again
            // Jump away in random direction
            roo.vx = (Math.random() - 0.5) * 0.3;
            roo.vy = (Math.random() - 0.5) * 0.3;
        } else if (roo.searchTimer > 0) {
            roo.searchTimer--;
            // Random hop movement
            roo.x += roo.vx;
            roo.y += roo.vy;
        } else {
            // Move towards each other
            const speed = 0.05;
            roo.vx = (dx / distance) * speed;
            roo.vy = (dy / distance) * speed;
            roo.x += roo.vx;
            roo.y += roo.vy;
        }
        
        // Keep in bounds and avoid walls
        roo.x = Math.max(0.5, Math.min(data.gridSize - 0.5, roo.x));
        roo.y = Math.max(0.5, Math.min(data.gridSize - 0.5, roo.y));
    });
    
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

function isGateBlocking9(x, y) {
    const data = window.level9Data;
    return data.gates.some(gate => {
        if (!gate.open) {
            if (gate.orientation === 'horizontal') {
                return y === gate.y && x >= gate.x - 1 && x <= gate.x + 1;
            } else {
                return x === gate.x && y >= gate.y - 1 && y <= gate.y + 1;
            }
        }
        return false;
    });
}

function toggleGate9(clickX, clickY) {
    const data = window.level9Data;
    
    data.gates.forEach(gate => {
        let clicked = false;
        if (gate.orientation === 'horizontal') {
            clicked = clickY === gate.y && clickX >= gate.x - 1 && clickX <= gate.x + 1;
        } else {
            clicked = clickX === gate.x && clickY >= gate.y - 1 && clickY <= gate.y + 1;
        }
        
        if (clicked) {
            gate.open = !gate.open;
            renderMaze9();
        }
    });
}

function movePlayer9(direction) {
    const data = window.level9Data;
    let newX = data.playerPos.x;
    let newY = data.playerPos.y;
    
    if (direction === 'up') newY--;
    else if (direction === 'down') newY++;
    else if (direction === 'left') newX--;
    else if (direction === 'right') newX++;
    
    // Check if wall or closed gate
    if (data.walls.has(`${newX},${newY}`) || isGateBlocking9(newX, newY)) return;
    
    // Move player
    data.playerPos = { x: newX, y: newY };
    data.moves++;
    document.getElementById('moves9').textContent = data.moves;
    
    // Check if rescued a comrade
    data.comrades.forEach(comrade => {
        if (!comrade.rescued && comrade.x === newX && comrade.y === newY) {
            comrade.rescued = true;
            data.comradesRescued++;
            document.getElementById('comrades9').textContent = data.comradesRescued;
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #2ecc71;">Comrade rescued! (${data.comradesRescued}/3)</span>`;
            setTimeout(() => document.getElementById('feedback9').innerHTML = '', 1500);
        }
    });
    
    // Check if reached exit with all comrades
    if (newX === data.exitPos.x && newY === data.exitPos.y) {
        if (data.comradesRescued >= 3) {
            clearInterval(data.timerInterval);
            clearInterval(data.enemyInterval);
            const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
            
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #9b59b6; font-size: 1.8rem;">🎉 FREEDOM ACHIEVED! You escaped in ${elapsed}s with ${data.moves} moves! 🎉</span>`;
            
            setTimeout(() => completeLevel(9), 2500);
        } else {
            document.getElementById('feedback9').innerHTML = 
                `<span style="color: #f39c12;">Rescue all comrades first! (${data.comradesRescued}/3)</span>`;
            setTimeout(() => document.getElementById('feedback9').innerHTML = '', 2000);
        }
        return;
    }
    
    checkCollision9();
    renderMaze9();
}

function moveEnemies9() {
    const data = window.level9Data;
    
    data.enemies.forEach(enemy => {
        if (enemy.trapped) return;
        
        const newX = enemy.x + enemy.dx;
        const newY = enemy.y + enemy.dy;
        
        // Check if hitting wall, gate, or boundary
        if (data.walls.has(`${newX},${newY}`) || isGateBlocking9(newX, newY)) {
            // Reverse direction
            enemy.dx = -enemy.dx;
            enemy.dy = -enemy.dy;
        } else {
            enemy.x = newX;
            enemy.y = newY;
        }
    });
    
    renderMaze9();
}

function moveComrades9() {
    const data = window.level9Data;
    
    // Move rescued comrades toward exit
    data.comrades.forEach(comrade => {
        if (comrade.rescued && (comrade.x !== data.exitPos.x || comrade.y !== data.exitPos.y)) {
            // Simple pathfinding toward exit
            if (comrade.x < data.exitPos.x && !data.walls.has(`${comrade.x + 1},${comrade.y}`) && !isGateBlocking9(comrade.x + 1, comrade.y)) {
                comrade.x++;
            } else if (comrade.x > data.exitPos.x && !data.walls.has(`${comrade.x - 1},${comrade.y}`) && !isGateBlocking9(comrade.x - 1, comrade.y)) {
                comrade.x--;
            } else if (comrade.y < data.exitPos.y && !data.walls.has(`${comrade.x},${comrade.y + 1}`) && !isGateBlocking9(comrade.x, comrade.y + 1)) {
                comrade.y++;
            } else if (comrade.y > data.exitPos.y && !data.walls.has(`${comrade.x},${comrade.y - 1}`) && !isGateBlocking9(comrade.x, comrade.y - 1)) {
                comrade.y--;
            }
        }
    });
}

function checkCollision9() {
    const data = window.level9Data;
    
    // Check if player or comrades collide with enemies
    const playerHit = data.enemies.some(enemy => 
        !enemy.trapped && enemy.x === data.playerPos.x && enemy.y === data.playerPos.y
    );
    
    if (playerHit) {
        document.getElementById('feedback9').innerHTML = 
            '<span style="color: #e74c3c; font-size: 1.3rem;">💥 Enemy caught you! Be more careful with gates!</span>';
        setTimeout(() => {
            document.getElementById('feedback9').innerHTML = '';
        }, 2000);
    }
}

// Backward compatibility: keep old function names as aliases
function initLevel9() { initGateControlStrategyMaze(); }
