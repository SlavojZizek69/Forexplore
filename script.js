document.addEventListener('DOMContentLoaded', () => {
    // Firebase Initialization (if needed)
    // ...

    // Pet State and References
    const petElement = document.querySelector('.pet');
    const petContainer = document.getElementById('pet-container');
    // ... other references ...

    // Movement and Interaction State
    let isDragging = false;
    let currentX = petContainer.offsetWidth / 2; // Start at the center
    let currentY = 0; // Assuming the pet starts at the bottom of the container
    let isFollowingCursor = false;
    let previousX = currentX; // Initialize previousX

    // Animation Parameters
    const speedX = 5; 
    const speedY = 3; 
    const maxX = window.innerWidth - petElement.offsetWidth;
    const maxY = window.innerHeight - petElement.offsetHeight;

    // Function Definitions (Moved to the top)
    function startWalking() {
        isWalking = true;
        petElement.style.animationPlayState = 'running';
        walkInterval = setInterval(() => {
            // ... (Movement logic as before) ...
        }, 100); 
    }

    function stopWalking() {
        isWalking = false;
        petElement.style.animationPlayState = 'paused';
        clearInterval(walkInterval);
    }

    function updatePetPosition() {
        // ... (Boundary checks as before) ...
        petElement.style.transform = `translateX(${currentX}px) translateY(${currentY}px) scaleX(${directionX})`; 
    }

    // Function to fetch modules from your database (Firebase example)
    async function fetchModulesFromDatabase(startIndex, numItems) {
        const db = firebase.firestore();
        const querySnapshot = await db.collection('microlearning_modules')
            .orderBy('createdAt')
            .startAfter(startIndex)
            .limit(numItems)
            .get();

        const modules = [];
        querySnapshot.forEach(doc => {
            modules.push(doc.data());
        });

        return modules;
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

    // Cursor Following Toggle
    petElement.addEventListener('dblclick', () => {
        isFollowingCursor = !isFollowingCursor;
        if (isFollowingCursor) {
            startFollowingCursor();
        } else {
            stopWalking(); // Stop automatic walking if enabled
        }
    });

    // Cursor Following Function
    function startFollowingCursor() {
        document.addEventListener('mousemove', (event) => {
            currentX = event.clientX - petElement.offsetWidth / 2;
            updatePetPosition();
        });
    }

    // Login / Sign Up section toggling
    if (loginButton && signupButton) {
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





