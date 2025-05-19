document.addEventListener('DOMContentLoaded', () => {
    // Initialize hand detector
    const handDetector = new HandDetector();
    
    // Initialize game logic
    const gameLogic = new GameLogic();
    window.gameLogic = gameLogic; // Make it globally accessible
    
    // DOM elements
    const startGameBtn = document.getElementById('start-game-btn');
    const resetGameBtn = document.getElementById('reset-game-btn');
    const rockBtn = document.getElementById('rock-btn');
    const paperBtn = document.getElementById('paper-btn');
    const scissorsBtn = document.getElementById('scissors-btn');
    const roundsSelect = document.getElementById('rounds-select');
    const startDetectionBtn = document.getElementById('start-detection-btn');
    
    // Event listeners for buttons
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            const roundsToWin = parseInt(roundsSelect.value);
            gameLogic.startGame(roundsToWin);
        });
    }
    
    if (resetGameBtn) {
        resetGameBtn.addEventListener('click', () => {
            gameLogic.resetGame();
        });
    }
    
    // Move button event listeners
    if (rockBtn) {
        rockBtn.addEventListener('click', () => gameLogic.playRound('rock'));
    }
    
    if (paperBtn) {
        paperBtn.addEventListener('click', () => gameLogic.playRound('paper'));
    }
    
    if (scissorsBtn) {
        scissorsBtn.addEventListener('click', () => gameLogic.playRound('scissors'));
    }
    
    // Initialize hand detection if button exists
    if (startDetectionBtn) {
        startDetectionBtn.addEventListener('click', async () => {
            const success = await handDetector.startDetection();
            if (success) {
                startDetectionBtn.disabled = true;
                startDetectionBtn.textContent = 'Detection Active';
            }
        });
    }
    
    // Handle gesture detection events
    document.addEventListener('gestureDetected', (event) => {
        const gesture = event.detail;
        
        // Only process gesture if game is active
        if (gameLogic.isGameActive && !gameLogic.computerChoiceTimeout) {
            if (['rock', 'paper', 'scissors'].includes(gesture)) {
                // Highlight the corresponding button
                const btn = document.getElementById(`${gesture}-btn`);
                if (btn) {
                    btn.classList.add('active-gesture');
                    setTimeout(() => btn.classList.remove('active-gesture'), 1000);
                }
                
                // Play the round with detected gesture
                gameLogic.playRound(gesture);
            }
        }
    });
    
    // Initialize tooltip for camera permissions
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            tooltip.appendChild(tooltipEl);
        });
        
        tooltip.addEventListener('mouseleave', () => {
            const tooltipEl = tooltip.querySelector('.tooltip');
            if (tooltipEl) {
                tooltipEl.remove();
            }
        });
    });
});
