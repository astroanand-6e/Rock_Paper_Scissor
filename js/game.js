// Main game controller

document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating elements for consistent look with landing page
    // This function can remain if it's purely for aesthetics and doesn't interfere with gameLogic
    createFloatingElements(); 
    
    // GameLogic is already instantiated and sets up its own event listeners
    // via its constructor and the new GameLogic() call at the end of gameLogic.js
    // So, no need to re-initialize 'game' here or re-attach listeners that gameLogic handles.

    // If there are UI elements or logic specific to game.html that gameLogic doesn't manage,
    // they can be handled here. For example, the 'Back to Menu' button is a simple link.
    // Reset and Play Again buttons are handled by gameLogic.
});

// Function to create floating elements (copied from landing.js for consistency)
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) {
        // console.warn("Floating elements container not found on this page.");
        return;
    }

    const elements = [
        { type: 'rock', count: 7, asset: 'Rock_HG.png' }, // Ensure these asset names are correct
        { type: 'paper', count: 7, asset: 'paper_HG.png' },
        { type: 'scissors', count: 7, asset: 'Scissor_HG.png' }
    ];
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Create zones for element placement
    const zones = [
        { name: 'left', x: [0, windowWidth * 0.2], y: [0, windowHeight] },
        { name: 'right', x: [windowWidth * 0.8, windowWidth], y: [0, windowHeight] },
        { name: 'top', x: [0, windowWidth], y: [0, windowHeight * 0.2] },
        { name: 'bottom', x: [0, windowWidth], y: [windowHeight * 0.8, windowHeight] }
    ];

    let elementIndex = 0;
    for (const elType of elements) {
        for (let i = 0; i < elType.count; i++) {
            const element = document.createElement('div');
            element.className = `floating ${elType.type}`;
            // Set background image for floating elements
            // Assuming your CSS for .floating.rock, .floating.paper, .floating.scissors handles the images
            // Or, you can set them directly:
            // element.style.backgroundImage = `url('assets/images/${elType.asset}')`;
            
            // Select a zone for this element
            const zone = zones[elementIndex % zones.length];
            elementIndex++;
            
            // Random position within the selected zone
            const randomX = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
            const randomY = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];
            
            // Convert to percentage for CSS positioning
            const percentX = (randomX / windowWidth) * 100;
            const percentY = (randomY / windowHeight) * 100;
            
            element.style.left = `${percentX}%`;
            element.style.top = `${percentY}%`;

            // Random animation delay and duration for variety
            const delay = Math.random() * 8;
            const duration = 15 + Math.random() * 20;
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;

            // Random initial scale and opacity for more variety
            element.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
            element.style.opacity = `${0.6 + Math.random() * 0.3}`;

            floatingContainer.appendChild(element);
        }
    }
}

// The updateGameDisplay function might be redundant if gameLogic.displayResult handles all UI updates.
// If gameLogic.displayResult is comprehensive, this function can be removed.
// For now, I'll comment it out to avoid conflicts.
/*
function updateGameDisplay(playerChoice, computerChoice, result) {
    // Image mapping to use the correct filenames
    const imageMap = {
        'rock': 'Rock_HG.png',
        'paper': 'paper_HG.png',
        'scissors': 'Scissor_HG.png'
    };
    
    // Update player preview
    const playerPreview = document.getElementById('player-preview');
    playerPreview.src = `assets/images/${imageMap[playerChoice]}`;
    playerPreview.alt = playerChoice;

    // Update computer preview - make sure it's visible
    const computerPreview = document.getElementById('computer-move-display');
    computerPreview.src = `assets/images/${imageMap[computerChoice]}`;
    computerPreview.alt = computerChoice;
    computerPreview.style.display = 'block';

    // Force a reflow to ensure the image is updated
    computerPreview.offsetHeight;
    
    // Show result
    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = result;
    resultDisplay.style.display = 'block';
}
*/