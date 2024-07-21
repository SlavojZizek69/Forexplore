document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('pet-container');
    const svgns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgns, 'svg');
    svg.classList.add('pet');
    svg.setAttribute('viewBox', '0 0 200 200');  // Increased viewBox size
    svg.setAttribute('width', '100%');  // Make SVG responsive
    svg.setAttribute('height', '100%');
    svgContainer.appendChild(svg);

    function createSVGElement(tagName, attributes) {
        const element = document.createElementNS(svgns, tagName);
        for (const attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    const catGroup = createSVGElement('g', { transform: 'translate(100, 100)' });  // Center the cat
    svg.appendChild(catGroup);

    const svgElements = [
        // Cat Body
        ['ellipse', { cx: 0, cy: 30, rx: 30, ry: 20, fill: '#F4A460' }],
        ['ellipse', { cx: 0, cy: 40, rx: 20, ry: 10, fill: '#fff' }],
        // Cat Head
        ['circle', { cx: 0, cy: 0, r: 20, fill: '#F4A460' }],
        // Ears
        ['polygon', { points: "-10,-15 -20,-30 -5,-35", fill: '#F4A460' }],
        ['polygon', { points: "10,-15 20,-30 5,-35", fill: '#F4A460' }],
        // Eyes
        ['circle', { cx: -10, cy: -5, r: 4, fill: '#000' }],
        ['circle', { cx: 10, cy: -5, r: 4, fill: '#000' }],
        // Nose & Mouth
        ['polygon', { points: "0,-2 -2,2 2,2", fill: '#000' }],
        ['path', { d: "M -5 0 Q 0 5 5 0", stroke: '#000', fill: 'none' }],
        // Tail
        ['path', { d: "M 20 20 C 30 0 40 40 30 30", stroke: '#F4A460', strokeWidth: '5', fill: 'none' }],
        // Legs
        ['rect', { x: -15, y: 45, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 7, y: 45, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: -30, y: 45, width: 8, height: 15, fill: '#F4A460' }],
        ['rect', { x: 22, y: 45, width: 8, height: 15, fill: '#F4A460' }]
    ];

    svgElements.forEach(([tagName, attributes]) => {
        catGroup.appendChild(createSVGElement(tagName, attributes));
    });

    // Health Bar (Created as SVG Elements)
    const healthBarBackground = createSVGElement('rect', { 
        x: 50, y: 170, width: 100, height: 20, fill: '#ddd', rx: 5, ry: 5, id: 'healthBarBackground'
    });
    const healthBarFill = createSVGElement('rect', { 
        x: 50, y: 170, width: 100, height: 20, fill: 'green', rx: 5, ry: 5, id: 'healthBar' 
    });
    const healthBarText = createSVGElement('text', { 
        x: 100, y: 185, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#000', 'font-size': 14
    });
    healthBarText.textContent = "100";
    svg.appendChild(healthBarBackground);
    svg.appendChild(healthBarFill);
    svg.appendChild(healthBarText);

    // Health State
    let health = 100;

    // Cat Click Event
    catGroup.addEventListener('click', () => {
        health = Math.max(0, health - 10);  // Ensure health doesn't go below 0
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
        healthBarFill.setAttribute('width', 100 * healthPercentage);
        healthBarFill.setAttribute('fill', health > 50 ? 'green' : health > 20 ? 'yellow' : 'red'); 
        healthBarText.textContent = health;
    }

    // Remove movement-related code to keep the cat centered
});

