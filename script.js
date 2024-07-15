document.addEventListener("DOMContentLoaded", () => {
    // ... Firebase Initialization (if needed) ...
  
    // ... (Login/Signup Logic from the previous response) ...
  
    // Pet State and References
    const petElement = document.querySelector('.pet');
    const petContainer = document.getElementById('pet-container');

    // Movement and Interaction State
    let isFollowingCursor = false;
    let currentX = petContainer.offsetWidth / 2; // Start at the center
    let currentY = 0; // Assuming the pet starts at the bottom of the container
    let previousX = currentX;

    // Animation Parameters
    const speedX = 5; 
    const speedY = 3; 
    const maxX = window.innerWidth - petElement.offsetWidth;
    const maxY = window.innerHeight - petElement.offsetHeight;

    // Toggle Cursor Following
    petElement.addEventListener('click', () => {
        isFollowingCursor = !isFollowingCursor;
        if (isFollowingCursor) {
            startFollowingCursor();
        } else {
            stopFollowingCursor();
        }
    });

    // Cursor Following Function
    function startFollowingCursor() {
        document.addEventListener('mousemove', updatePetPosition);
        petElement.style.animation = 'walkCycle 2s infinite'; // Switch to walking animation
    }

    function stopFollowingCursor() {
        document.removeEventListener('mousemove', updatePetPosition);
        petElement.style.animation = 'none'; // Stop walking animation
    }

    // Update Pet Position
    function updatePetPosition(event) {
        if (isFollowingCursor) {
            currentX = event.clientX - petElement.offsetWidth / 2;
            // Optional: add mouseY tracking for vertical movement
            // currentY = event.clientY - petElement.offsetHeight / 2;
        }

        // Boundary checks
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        // Apply position and flip if needed
        petElement.style.transform = `translateX(<span class="math-inline">\{currentX\}px\) translateY\(</span>{currentY}px) scaleX(${currentX > previousX ? 1 : -1})`;
        previousX = currentX;
    }
  });






