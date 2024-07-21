
document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('pet-container');
    const svgns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgns, 'svg');
    svg.classList.add('pet');
    svg.setAttribute('viewBox', '0 0 100 120'); // Adjusted for health bar
    svgContainer.appendChild(svg);

    function createSVGElement(tagName, attributes) {
        const element = document.createElementNS(svgns, tagName);
        for (const attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    const catGroup = createSVGElement('g', {});
    svg.appendChild(catGroup);

    const svgElements = [
        // Cat Body
        ['ellipse', { cx: 50, cy: 70, rx: 30, ry: 20, fill: '#F4A460' }],
        ['ellipse', { cx: 50, cy: 80, rx: 20, ry: 10, fill: '#fff' }],
        // Cat Head
        ['circle', { cx: 50, cy: 40, r: 20, fill: '#F4A460' }],
        // Ears
        ['polygon', { points: "40,25 30,10 45,5", fill: '#F4A460' }],
        ['polygon', { points: "60,25 70,10 55,5", fill: '#F4A460' }],
        // Eyes
        ['circle', { cx: 40, cy: 35, r: 4, fill: '#000' }],
        ['circle', { cx: 60, cy: 35, r: 4, fill: '#000' }],
        // Nose & Mouth
        ['polygon', { points: "50,38 48,42 52,42", fill: '#000' }],
        ['path', { d: "M 45 40 Q 50 45 55 40", stroke: '#000', fill: 'none' }],
        // Tail
        ['path', { d: "M 70 60 C 80 40 90 80 80 70", stroke: '#F4A460', strokeWidth: '5', fill: 'none' }],
        // Legs (Adjusted positions to account for health bar)
        ['rect', { x: 35, y: 85, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 57, y: 85, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 20, y: 85, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 72, y: 85, width: 8, height: 15, fill: '#F4A460' }]
    ];

    svgElements.forEach(([tagName, attributes]) => {
        catGroup.appendChild(createSVGElement(tagName, attributes));
    });

    // Health Bar
    const healthBarBackground = createSVGElement('rect', { 
        x: 20, y: 100, width: 60, height: 10, fill: '#ddd', rx: 5, ry: 5, id: 'healthBarBackground'
    });
    const healthBarFill = createSVGElement('rect', { 
        x: 20, y: 100, width: 60, height: 10, fill: 'green', rx: 5, ry: 5, id: 'healthBar' 
    });
    const healthBarText = createSVGElement('text', { 
        x: 50, y: 108, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#000', 'font-size': 8
    });
    healthBarText.textContent = "100";
    svg.appendChild(healthBarBackground);
    svg.appendChild(healthBarFill);
    svg.appendChild(healthBarText);

    // Movement and Interaction State
    let isFollowingCursor = false;
    let currentX = svgContainer.clientWidth / 2;
    let currentY = svgContainer.clientHeight - 50; 
    let previousX = currentX;
    let velocityX = 0;
    const speedX = 5;
    const accelerationX = 0.1;
    const friction = 0.8;

    // Health State
    let health = 100;

    // Cat Click Event
    catGroup.addEventListener('click', () => {
        health -= 10;
        updateHealthBar();
        if (health <= 0) {
            alert('Game Over!');
            health = 100; // Reset health
            updateHealthBar();
        }
    });

    // Health Bar Update Function
    function updateHealthBar() {
        const healthPercentage = health / 100;
        healthBarFill.setAttribute('width', 60 * healthPercentage);

        healthBarFill.classList.remove('low-health', 'critical-health');
        if (health <= 50) {
            healthBarFill.classList.add('low-health');
        }
        if (health <= 20) {
            healthBarFill.classList.add('critical-health');
        }
        healthBarText.textContent = health; // Update the health text
    }


    // Cursor Following
   svgContainer.addEventListener('click', () => { 
        isFollowingCursor = !isFollowingCursor;
        if (isFollowingCursor) {
            startFollowingCursor();
        } else {
            stopFollowingCursor();
        }
    });

    function startFollowingCursor() {
        document.addEventListener('mousemove', updatePetPosition);
        catGroup.style.animation = 'walkCycle 2s infinite'; // Apply animation to the group
    }

    function stopFollowingCursor() {
        document.removeEventListener('mousemove', updatePetPosition);
        catGroup.style.animation = 'none'; // Remove animation from the group
    }

    function updatePetPosition(event) {
        if (isFollowingCursor) {
            const targetX = event.clientX - svgContainer.getBoundingClientRect().left - catGroup.getBBox().width / 2; // Use catGroup.getBBox()
            velocityX += (targetX - currentX) * accelerationX;
            velocityX *= friction;
            currentX += velocityX;
            currentX = Math.max(0, Math.min(currentX, svgContainer.clientWidth - catGroup.getBBox().width));
        } else {
            velocityX *= friction;
            currentX += velocityX;
        }

        catGroup.setAttribute('transform', `translate(${currentX}, ${currentY}) scaleX(${currentX > previousX ? 1 : -1})`); // Apply transform to the group
        previousX = currentX;

        if (Math.abs(velocityX) > 0.5) {
            catGroup.style.animation = 'walkCycle 2s infinite';
        } else {
            catGroup.style.animation = 'none';
        }
    }
});












