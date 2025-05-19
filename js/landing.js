// Landing page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add floating elements
    createFloatingElements();

    // Handle scroll reveal animations
    handleScrollAnimations();

    // Game mode selection
    setupGameModeSelection();

    // Handle play button clicks
    setupPlayButtons();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const types = ['rock', 'paper', 'scissors'];
    const count = 12; // Number of floating elements
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        
        element.className = `floating ${type}`;
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
    }
}

function handleScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('scrolled');
            }
        });
        
        // Show sticky CTA after user has scrolled a bit
        const stickyCta = document.querySelector('.sticky-cta-container');
        if (window.scrollY > 300) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

function setupGameModeSelection() {
    const bestOf3Btn = document.getElementById('best-of-3');
    const bestOf5Btn = document.getElementById('best-of-5');
    const customInput = document.getElementById('custom-rounds');
    
    // Default selection
    let gameRounds = 3;
    
    bestOf3Btn.addEventListener('click', function() {
        bestOf3Btn.classList.add('active');
        bestOf5Btn.classList.remove('active');
        gameRounds = 3;
        sessionStorage.setItem('gameRounds', gameRounds);
    });
    
    bestOf5Btn.addEventListener('click', function() {
        bestOf5Btn.classList.add('active');
        bestOf3Btn.classList.remove('active');
        gameRounds = 5;
        sessionStorage.setItem('gameRounds', gameRounds);
    });
    
    customInput.addEventListener('change', function() {
        bestOf3Btn.classList.remove('active');
        bestOf5Btn.classList.remove('active');
        
        // Validate input
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 15) {
            value = 15;
        }
        
        this.value = value;
        gameRounds = value;
        sessionStorage.setItem('gameRounds', gameRounds);
    });
}

function setupPlayButtons() {
    const mainPlayBtn = document.getElementById('play-btn');
    const stickyPlayBtn = document.getElementById('play-btn-sticky');
    
    function handlePlayClick() {
        // Add page transition effect
        document.body.classList.add('page-transition-out');
        
        // Redirect after animation
        setTimeout(() => {
            window.location.href = 'game.html';
        }, 300);
    }
    
    mainPlayBtn.addEventListener('click', handlePlayClick);
    stickyPlayBtn.addEventListener('click', handlePlayClick);
}
