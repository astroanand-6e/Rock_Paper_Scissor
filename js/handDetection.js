/**
 * Hand Detection Module using MediaPipe Hands
 * Handles camera input and gesture recognition
 */

class HandDetector {
    constructor() {
        this.hands = null;
        this.camera = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.onGestureDetected = null;
        this.lastGesture = null;
        this.gestureHoldTime = 0;
        this.REQUIRED_HOLD_TIME = 1000; // ms to hold gesture to confirm
        this.lastTime = 0;
    }

    async init(videoElement, canvasElement) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.canvasCtx = canvasElement.getContext('2d');

        // Initialize MediaPipe Hands
        this.hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }});

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults(this.onResults.bind(this));

        // Initialize Camera
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({image: this.videoElement});
            },
            width: 1280,
            height: 720
        });
    }

    start() {
        if (this.camera) {
            this.camera.start();
        }
    }

    stop() {
        if (this.camera) {
            this.camera.stop(); // Note: CameraUtils might not have stop, but we can stop stream
            const stream = this.videoElement.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                this.videoElement.srcObject = null;
            }
        }
    }

    setGestureCallback(callback) {
        this.onGestureDetected = callback;
    }

    onResults(results) {
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            const handedness = results.multiHandedness && results.multiHandedness.length > 0 ? results.multiHandedness[0] : { score: 0.95 }; // Fallback
            
            // Draw landmarks
            drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS,
                           {color: '#00f2ff', lineWidth: 2}); // Neon Blue
            drawLandmarks(this.canvasCtx, landmarks, {color: '#ff0033', lineWidth: 1, radius: 3}); // Neon Red

            // Detect Gesture
            const gesture = this.detectGesture(landmarks);
            this.processGesture(gesture);

            // Calculate Bounding Box
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            const width = this.canvasElement.width;
            const height = this.canvasElement.height;

            for (const lm of landmarks) {
                const x = lm.x * width;
                const y = lm.y * height;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }

            // Add padding
            const padding = 20;
            minX = Math.max(0, minX - padding);
            minY = Math.max(0, minY - padding);
            maxX = Math.min(width, maxX + padding);
            maxY = Math.min(height, maxY + padding);

            // Draw Bounding Box
            this.canvasCtx.strokeStyle = '#00f2ff'; // Neon Blue
            this.canvasCtx.lineWidth = 3;
            this.canvasCtx.strokeRect(minX, minY, maxX - minX, maxY - minY);

            // Draw Label and Confidence
            if (gesture) {
                const score = handedness.score.toFixed(2);
                const label = `${gesture.charAt(0).toUpperCase() + gesture.slice(1)} = ${score}`;
                
                this.canvasCtx.font = 'bold 16px Inter, sans-serif';
                const textMetrics = this.canvasCtx.measureText(label);
                const textWidth = textMetrics.width;
                const textHeight = 24;
                const textX = minX;
                const textY = minY - 10 > 0 ? minY - 10 : minY + 20; // Draw above if space, else inside

                // Text Background
                this.canvasCtx.fillStyle = 'rgba(0, 242, 255, 0.2)';
                this.canvasCtx.fillRect(textX, textY - 16, textWidth + 10, 20);

                // Text
                this.canvasCtx.fillStyle = '#ffffff';
                this.canvasCtx.fillText(label, textX + 5, textY);
            }
        } else {
            this.processGesture(null);
        }
        this.canvasCtx.restore();
    }

    detectGesture(landmarks) {
        // Simple heuristic based gesture recognition
        // Thumb: 4, Index: 8, Middle: 12, Ring: 16, Pinky: 20
        // Base: 0
        
        const isFingerOpen = (tipIdx, pipIdx) => {
            // Check distance from wrist (0) to tip vs wrist to pip (proximal interphalangeal)
            // Or simply y coordinate if hand is upright. 
            // Better: Compare distance to wrist. Open if Tip is further than PIP.
            // Note: This is simplified.
            return landmarks[tipIdx].y < landmarks[pipIdx].y; // Assuming upright hand
        };

        // More robust: Check if finger tip is above the knuckle (MCP)
        // 0: Wrist
        // Thumb: 1(CMC), 2(MCP), 3(IP), 4(TIP)
        // Index: 5(MCP), 6(PIP), 7(DIP), 8(TIP)
        // ...
        
        // Let's use a simpler bounding box logic or relative positions
        // For Rock Paper Scissors, we mainly care about extended fingers.
        
        const thumbOpen = landmarks[4].x < landmarks[3].x; // Right hand assumption for now, need to fix for left/mirror
        // Actually, let's use the standard "is finger extended" check
        // For non-thumb fingers, tip y < pip y (if hand is up)
        
        const indexOpen = landmarks[8].y < landmarks[6].y;
        const middleOpen = landmarks[12].y < landmarks[10].y;
        const ringOpen = landmarks[16].y < landmarks[14].y;
        const pinkyOpen = landmarks[20].y < landmarks[18].y;
        
        // Thumb is tricky. Let's check if tip is far from index base
        // Or just check x distance for thumb
        
        let extendedCount = 0;
        if (indexOpen) extendedCount++;
        if (middleOpen) extendedCount++;
        if (ringOpen) extendedCount++;
        if (pinkyOpen) extendedCount++;
        
        // Rock: 0 fingers extended (or just thumb)
        // Paper: 4-5 fingers extended
        // Scissors: 2 fingers extended (Index + Middle)
        
        if (extendedCount === 0) return 'rock';
        if (extendedCount >= 4) return 'paper';
        if (extendedCount === 2 && indexOpen && middleOpen) return 'scissors';
        
        return null;
    }

    processGesture(gesture) {
        const now = Date.now();
        if (gesture === this.lastGesture && gesture !== null) {
            if (now - this.lastTime > this.REQUIRED_HOLD_TIME) {
                if (this.onGestureDetected) {
                    this.onGestureDetected(gesture);
                    this.lastTime = now; // Reset to avoid rapid firing? Or maybe we want one-shot
                    // For game, we probably want to lock it in once confirmed
                }
            }
        } else {
            this.lastGesture = gesture;
            this.lastTime = now;
        }
    }
}

// Export for use in other files
window.HandDetector = HandDetector;
