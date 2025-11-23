// Game logic for Rock Paper Scissors

class GameLogic {
    constructor() {
        this.initialize();
        this.setupEventListeners();
    }

    initialize() {
        // Game state
        this.rounds = parseInt(sessionStorage.getItem('gameRounds')) || 3;
        this.currentRound = 1;
        this.playerScore = 0;
        this.computerScore = 0;
        this.isGameActive = false;
        this.playerMove = null;
        this.computerMove = null;

        // Update UI
        document.getElementById('total-rounds').textContent = this.rounds;
        document.getElementById('round-number').textContent = this.currentRound;
        this.updateScores();
        this.updateStatus('Choose your move using gestures or buttons!');

        // Initialize Hand Detector
        if (window.HandDetector) {
            this.handDetector = new HandDetector();
            const videoEl = document.getElementById('input-video');
            const canvasEl = document.getElementById('output-canvas');

            if (videoEl && canvasEl) {
                this.handDetector.init(videoEl, canvasEl).then(() => {
                    this.handDetector.start();
                    this.handDetector.setGestureCallback(this.handleGesture.bind(this));
                }).catch(err => {
                    console.error("Failed to init hand detector:", err);
                    this.updateStatus('Camera access denied or error. Use buttons to play.', 'error');
                });
            }
        }
    }

    handleGesture(gesture) {
        if (!this.isGameActive && gesture) {
            const btn = document.querySelector(`.gesture-btn[data-gesture="${gesture}"]`);
            if (btn) {
                // Only update if different to avoid spamming
                if (this.playerMove !== gesture) {
                    this.handleMoveSelection(btn);
                }
            }
        }
    }

    setupEventListeners() {
        // Gesture buttons
        document.querySelectorAll('.gesture-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleMoveSelection(btn));
        });

        // Game control buttons
        document.getElementById('start-btn').addEventListener('click', () => this.startRound());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());

        // Play again button in modal
        const playAgainBtn = document.getElementById('play-again-btn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.resetGame());
        }
    }

    handleMoveSelection(button) {
        if (this.isGameActive) return;

        // Remove selection from all buttons
        document.querySelectorAll('.gesture-btn').forEach(btn => btn.classList.remove('selected'));

        // Select current button
        button.classList.add('selected');

        // Update player move
        this.playerMove = button.dataset.gesture;

        // Image mapping to handle file naming
        const imageMap = {
            'rock': 'Rock_HG.png',
            'paper': 'paper_HG.png',
            'scissors': 'Scissor_HG.png'
        };

        // Update preview
        const playerPreview = document.getElementById('player-preview');
        playerPreview.src = `assets/images/${imageMap[this.playerMove]}`;

        // Update move text
        const playerMoveText = document.getElementById('player-move');
        if (playerMoveText) {
            playerMoveText.textContent = this.playerMove.charAt(0).toUpperCase() + this.playerMove.slice(1);
        }

        // Enable start button
        document.getElementById('start-btn').disabled = false;

        this.updateStatus('Ready! Press "Start Round" to play.');
    }

    startRound() {
        if (!this.playerMove) return;

        this.isGameActive = true;
        document.getElementById('start-btn').disabled = true;

        // Start countdown
        let count = 3;
        const countdownEl = document.getElementById('countdown');

        const countdown = setInterval(() => {
            if (count > 0) {
                countdownEl.textContent = count;
                count--;
            } else {
                clearInterval(countdown);
                countdownEl.textContent = '';
                this.playRound();
            }
        }, 1000);
    }

    playRound() {
        // Generate computer move
        const computerMove = this.generateComputerMove();
        this.computerMove = computerMove;

        // Determine winner
        const result = this.determineWinner(this.playerMove, computerMove);

        // Display result
        this.displayResult(this.playerMove, computerMove, result);

        // Check if game is over
        if (this.playerScore >= Math.ceil(this.rounds / 2) ||
            this.computerScore >= Math.ceil(this.rounds / 2) ||
            this.currentRound >= this.rounds) {
            this.endGame();
        } else {
            this.prepareNextRound();
        }
    }

    // Method to generate computer move
    generateComputerMove() {
        const moves = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
    }

    // Method to determine winner
    determineWinner(playerChoice, computerChoice) {
        // Update display first to ensure images are shown
        this.updateMoveDisplays(playerChoice, computerChoice);

        if (playerChoice === computerChoice) {
            return 'tie';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            this.playerScore++;
            return 'win';
        } else {
            this.computerScore++;
            return 'lose';
        }
    }

    // Method for updating the displays
    updateMoveDisplays(playerChoice, computerChoice) {
        // Image mapping to handle file naming
        const imageMap = {
            'rock': 'Rock_HG.png',
            'paper': 'paper_HG.png',
            'scissors': 'Scissor_HG.png'
        };

        // Update player preview
        const playerPreview = document.getElementById('player-preview');
        playerPreview.src = `assets/images/${imageMap[playerChoice]}`;
        playerPreview.alt = playerChoice;

        // Update computer preview
        const computerPreview = document.getElementById('computer-move-display');
        computerPreview.src = `assets/images/${imageMap[computerChoice]}`;
        computerPreview.alt = computerChoice;
        computerPreview.style.display = 'block';

        // Update computer move text
        const computerMoveText = document.getElementById('computer-move-text');
        if (computerMoveText) {
            computerMoveText.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
        }
    }

    // Method to display the result
    displayResult(playerChoice, computerChoice, result) {
        // Make sure displays are updated
        this.updateMoveDisplays(playerChoice, computerChoice);

        // Update result text
        const resultDisplay = document.getElementById('result');
        resultDisplay.textContent = this.getResultMessage(result);
        resultDisplay.style.display = 'block';

        // Update score display
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('computer-score').textContent = this.computerScore;

        // Update status message
        this.updateStatus(this.getStatusMessage(result), this.getStatusType(result));
    }

    getResultMessage(result) {
        switch (result) {
            case 'win': return 'You win!';
            case 'lose': return 'Computer wins!';
            case 'tie': return 'It\'s a tie!';
            default: return '';
        }
    }

    getStatusMessage(result) {
        switch (result) {
            case 'win': return 'You won this round!';
            case 'lose': return 'Computer won this round!';
            case 'tie': return 'It\'s a tie!';
            default: return '';
        }
    }

    getStatusType(result) {
        switch (result) {
            case 'win': return 'success';
            case 'lose': return 'error';
            case 'tie': return 'warning';
            default: return 'info';
        }
    }

    updateScores() {
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('computer-score').textContent = this.computerScore;
    }

    prepareNextRound() {
        this.currentRound++;
        document.getElementById('round-number').textContent = this.currentRound;

        // Reset move selection
        this.playerMove = null;
        this.isGameActive = false;

        // Reset UI
        document.querySelectorAll('.gesture-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('player-preview').src = 'assets/images/question.png';
        document.getElementById('computer-move-display').src = 'assets/images/rsp_computer.gif';
        document.getElementById('start-btn').disabled = true;

        this.updateStatus('Choose your move for the next round!');
    }

    endGame() {
        const modal = document.getElementById('game-over-modal');
        const winner = this.playerScore > this.computerScore ? 'You' : 'Computer';
        const score = `${this.playerScore} - ${this.computerScore}`;

        document.getElementById('modal-title').textContent =
            winner === 'You' ? '🎉 Congratulations! 🎉' : 'Game Over!';
        document.getElementById('final-result').textContent =
            `${winner} won the game! (${score})`;

        modal.classList.remove('hidden');
        modal.classList.add('show');
    }

    resetGame() {
        const modal = document.getElementById('game-over-modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);

        // Re-initialize game state
        this.currentRound = 1;
        this.playerScore = 0;
        this.computerScore = 0;
        this.isGameActive = false;
        this.playerMove = null;
        this.computerMove = null;

        document.getElementById('total-rounds').textContent = this.rounds;
        document.getElementById('round-number').textContent = this.currentRound;
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('computer-score').textContent = this.computerScore;

        // Reset UI
        document.querySelectorAll('.gesture-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('player-preview').src = 'assets/images/question.png';
        document.getElementById('computer-move-display').src = 'assets/images/rsp_computer.gif';
        const computerMoveText = document.getElementById('computer-move-text');
        if (computerMoveText) computerMoveText.textContent = 'Waiting...';
        document.getElementById('start-btn').disabled = true;

        this.updateStatus('Choose your move!');

        // Hide result display
        const resultDisplay = document.getElementById('result');
        resultDisplay.textContent = '';
        resultDisplay.style.display = 'none';
    }

    updateStatus(message, type = 'info') {
        const statusEl = document.getElementById('status');
        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameLogic = new GameLogic();
});
