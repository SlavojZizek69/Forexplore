document.addEventListener('DOMContentLoaded', () => {

    // Firebase Initialization (Replace with your actual config)
    const firebaseConfig = {
        // ... your Firebase configuration ...
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(); // Or firebase.database() if you're using Realtime Database

    // References to sections
    const loginSection = document.getElementById('Log In');
    const signupSection = document.getElementById('Sign Up');
    const hero = document.getElementById('hero');
    const about = document.getElementById('about');

    // Button references
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    
    // Pet State and References
    const petElement = document.querySelector('.pet');
    let isWalking = false;
    let walkInterval;
    let directionX = 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = 0; 
    let currentY = 0; 

    // Animation Parameters
    const speedX = 5; 
    const speedY = 3; 
    const maxX = window.innerWidth - petElement.offsetWidth;
    const maxY = window.innerHeight - petElement.offsetHeight;

    // Walking Function
    function startWalking() {
        isWalking = true;
        petElement.style.animationPlayState = 'running'; 

        walkInterval = setInterval(() => {
            // Calculate new position
            currentX += speedX * directionX;
            currentY += speedY * directionY;

            // Boundary checks
            if (currentX < 0 || currentX > maxX) {
                directionX *= -1;
            }
            if (currentY < 0 || currentY > maxY) {
                directionY *= -1;
            }

            // Apply position and flip if needed
            petElement.style.transform = `translateX(${currentX}px) translateY(${currentY}px) scaleX(${directionX})`;
        }, 100); 
    }

    function stopWalking() {
        isWalking = false;
        petElement.style.animationPlayState = 'paused';
        clearInterval(walkInterval);
    }

    // Initial state: Show the pet and start walking
    petContainer.style.display = 'block';
    startWalking();

    // Click to toggle walking
    petElement.addEventListener('click', () => {
        if (isWalking) {
            stopWalking();
        } else {
            startWalking();
        }
    });

    // Login / Sign Up section toggling
    if (loginButton && signupButton) { // Check if the buttons exist before adding event listeners
        loginButton.addEventListener('click', () => {
            hero.style.display = 'none';
            about.style.display = 'none';
            loginSection.style.display = 'block';
            signupSection.style.display = 'none'; // Hide signup if it's visible
        });

        signupButton.addEventListener('click', () => {
            hero.style.display = 'none';
            about.style.display = 'none';
            signupSection.style.display = 'block';
            loginSection.style.display = 'none'; // Hide login if it's visible
        });
    }

    // Placeholder for Firebase Authentication
    // ... (Replace these comments with your actual Firebase authentication code) ...

    // Pet Data Handling (Firebase)
    // ... (Functions to fetch, update, and handle pet data in Firebase) ...
});



