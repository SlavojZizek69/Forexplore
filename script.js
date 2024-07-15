document.addEventListener('DOMContentLoaded', () => {
    // ... Firebase Initialization (if needed) ...

    // DOM References
    const petElement = document.querySelector('.pet');
    const petContainer = document.getElementById('pet-container');
    // ... other references ...

    // Movement and Interaction State
    let isDragging = false;
    let currentX = petContainer.offsetWidth / 2; // Start at the center
    let isFollowingCursor = false;

    // Movement Parameters
    const speed = 10; // Adjust the movement speed as needed

    // Mouse/Touch Event Handlers
    petElement.addEventListener('mousedown', () => {
        isDragging = true;
        stopWalking(); // Stop automatic walking if active
    });

    petElement.addEventListener('mouseup', () => {
        isDragging = false;
        startWalking(); // Resume automatic walking
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            currentX = event.clientX - petElement.offsetWidth / 2;
            updatePetPosition();
        }
    });

    // Cursor Following Toggle
    petElement.addEventListener('dblclick', () => {
        isFollowingCursor = !isFollowingCursor;
        if (isFollowingCursor) {
            startFollowingCursor();
        } else {
            stopWalking();
        }
    });

    // Cursor Following Function
    function startFollowingCursor() {
        document.addEventListener('mousemove', (event) => {
            currentX = event.clientX - petElement.offsetWidth / 2;
            updatePetPosition();
        });
    }

    // Update Pet Position
    function updatePetPosition() {
        // Ensure the cat stays within the container
        currentX = Math.max(0, Math.min(currentX, petContainer.offsetWidth - petElement.offsetWidth));
        petElement.style.left = currentX + 'px';

        // Flip the sprite based on movement direction
        if (currentX > previousX) {
            petElement.style.transform = 'scaleX(1)'; // Face right
        } else {
            petElement.style.transform = 'scaleX(-1)'; // Face left
        }
        previousX = currentX; // Update previousX for the next comparison
    }

    // ... (Walking, Firebase, and other functions) ...
});




