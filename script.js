document.addEventListener('DOMContentLoaded', () => {

    // References to sections
    const loginSection = document.getElementById('Log In');
    const signupSection = document.getElementById('Sign Up');
    const hero = document.getElementById('hero');
    const about = document.getElementById('about');

    // Button references
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    
    // ... (Login/Signup Logic - Replace the placeholders with Firebase code) ...

    // Pet Initialization (No Firebase dependency)
    const petContainer = document.getElementById('pet-container');
    const petElement = document.querySelector('.pet');
    let isWalking = false;
    let walkInterval;
    let direction = 1; 

    function startWalking() {
        isWalking = true;
        petElement.style.animationPlayState = 'running'; 

        walkInterval = setInterval(() => {
            const maxX = window.innerWidth - petElement.offsetWidth - 20;
            const maxY = window.innerHeight - petElement.offsetHeight - 20; 

            let newX = parseInt(petElement.style.left || 0) + (5 * direction);
            let newY = parseInt(petElement.style.bottom || 0) + (Math.random() * 6 - 3);

            if (newX < 0) {
                newX = 0;
                direction *= -1;
            } else if (newX > maxX) {
                newX = maxX;
                direction *= -1; 
            }

            if (newY < 0) newY = 0;
            if (newY > maxY) newY = maxY;

            petElement.style.left = newX + 'px';
            petElement.style.bottom = newY + 'px';
            petElement.style.transform = `scaleX(${direction})`; 
        }, 100); 
    }

    function stopWalking() {
        isWalking = false;
        petElement.style.animationPlayState = 'paused';
        clearInterval(walkInterval);
    }

    petContainer.style.display = 'block'; // Make the pet container visible on page load
    startWalking(); 
    
    petElement.addEventListener('click', () => {
        if (isWalking) {
            stopWalking();
        } else {
            startWalking();
        }
    });
});


