document.addEventListener('DOMContentLoaded', function() {
    // Get references to all gesture buttons
    const gestureButtons = document.querySelectorAll('.gesture-btn');
    const playerPreview = document.getElementById('player-preview');
    const playerMoveText = document.getElementById('player-move');
    
    // Initialize with question mark
    playerPreview.src = './assets/images/question.png';
    
    // Add click event to each gesture button
    gestureButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            gestureButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Get the gesture type from data attribute
            const gesture = this.getAttribute('data-gesture');
            
            // Update preview image based on selected gesture
            switch(gesture) {
                case 'rock':
                    playerPreview.src = './assets/images/Rock_HG.png';
                    playerMoveText.textContent = 'Rock';
                    break;
                case 'paper':
                    playerPreview.src = './assets/images/paper_HG.png';
                    playerMoveText.textContent = 'Paper';
                    break;
                case 'scissors':
                    playerPreview.src = './assets/images/Scissor_HG.png';
                    playerMoveText.textContent = 'Scissors';
                    break;
            }
            
            // Make sure the preview is visible
            playerPreview.style.display = 'block';
            
            // Enable the start button if it exists
            const startButton = document.getElementById('start-btn');
            if (startButton) {
                startButton.disabled = false;
            }
        });
    });
});
