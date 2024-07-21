document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('pet-container');
    const svgns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgns, 'svg');
    svg.classList.add('pet');
    svg.setAttribute('viewBox', '0 0 100 100');
    svgContainer.appendChild(svg);

    function createSVGElement(tagName, attributes) {
        const element = document.createElementNS(svgns, tagName);
        for (const attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    const svgElements = [
        // Cat Body
        ['ellipse', { cx: 50, cy: 75, rx: 30, ry: 20, fill: '#F4A460' }],
        ['ellipse', { cx: 50, cy: 85, rx: 20, ry: 10, fill: '#fff' }],
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
        // Legs
        ['rect', { x: 35, y: 90, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 57, y: 90, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 20, y: 90, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 72, y: 90, width: 8, height: 15, fill: '#F4A460' }]
    ];

    const petElement = svg;
    svgElements.forEach(([tagName, attributes]) => {
        petElement.appendChild(createSVGElement(tagName, attributes));
    });

    // Movement and Interaction State
    let isFollowingCursor = false;
    let currentX = svgContainer.clientWidth / 2;
    let currentY = svgContainer.clientHeight - 40; 
    let previousX = currentX;
    let velocityX = 0;
    const speedX = 5;
    const accelerationX = 0.1;
    const friction = 0.8;

    petElement.addEventListener('click', () => {
        isFollowingCursor = !isFollowingCursor;
        if (isFollowingCursor) {
            startFollowingCursor();
        } else {
            stopFollowingCursor();
        }
    });

    function startFollowingCursor() {
        document.addEventListener('mousemove', updatePetPosition);
        petElement.style.animation = 'walkCycle 2s infinite';
    }

    function stopFollowingCursor() {
        document.removeEventListener('mousemove', updatePetPosition);
        petElement.style.animation = 'none';
    }

    function updatePetPosition(event) {
        if (isFollowingCursor) {
            const targetX = event.clientX - svgContainer.getBoundingClientRect().left - petElement.getBBox().width / 2;
            velocityX += (targetX - currentX) * accelerationX;
            velocityX *= friction;
            currentX += velocityX;
            currentX = Math.max(0, Math.min(currentX, svgContainer.clientWidth - petElement.getBBox().width));
        } else {
            velocityX *= friction;
            currentX += velocityX;
        }

        petElement.setAttribute('transform', `translate(${currentX}, ${currentY}) scaleX(${currentX > previousX ? 1 : -1})`);
        previousX = currentX;

        if (Math.abs(velocityX) > 0.5) {
            petElement.style.animation = 'walkCycle 2s infinite';
        } else {
            petElement.style.animation = 'none';
        }
    }
});








