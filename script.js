document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('catCanvas');
    const ctx = canvas.getContext('2d');

    // Cat Parts (You can customize these values)
    const body = {
        shape: 'ellipse',
        x: 64,
        y: 70,
        radiusX: 30,
        radiusY: 20,
        fill: '#F4A460'
    };

    const head = {
        shape: 'circle',
        x: 64,
        y: 30,
        radius: 20,
        fill: '#F4A460'
    };

    const earLeft = {
        shape: 'triangle',
        points: [[50, 15], [40, 5], [55, 10]],
        fill: '#F4A460'
    };

    const earRight = {
        shape: 'triangle',
        points: [[74, 15], [84, 5], [79, 10]],
        fill: '#F4A460'
    };

    const eyeLeft = { shape: 'circle', x: 48, y: 30, radius: 4, fill: '#000' };
    const eyeRight = { shape: 'circle', x: 76, y: 30, radius: 4, fill: '#000' };

    const nose = {
        shape: 'triangle',
        points: [[64, 38], [60, 42], [68, 42]],
        fill: '#000'
    };

    const mouth = {
        shape: 'curve',
        start: [56, 42],
        control1: [64, 48],
        control2: [72, 48],
        end: [80, 42],
        stroke: '#000',
        lineWidth: 2
    };

    const tail = {
        shape: 'curve',
        start: [90, 65],
        control1: [100, 45],
        control2: [110, 85],
        end: [100, 75],
        stroke: '#F4A460',
        lineWidth: 5,
        fill: 'none'
    };

    // ... Add more parts as needed (legs, whiskers, etc.)

    // Drawing Functions
    function drawEllipse(ellipse) {
        ctx.beginPath();
        ctx.ellipse(ellipse.x, ellipse.y, ellipse.radiusX, ellipse.radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = ellipse.fill;
        ctx.fill();
    }

    function drawCircle(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.fill;
        ctx.fill();
    }

    function drawTriangle(triangle) {
        ctx.beginPath();
        ctx.moveTo(triangle.points[0][0], triangle.points[0][1]);
        ctx.lineTo(triangle.points[1][0], triangle.points[1][1]);
        ctx.lineTo(triangle.points[2][0], triangle.points[2][1]);
        ctx.closePath();
        ctx.fillStyle = triangle.fill;
        ctx.fill();
    }

    function drawCurve(curve) {
        ctx.beginPath();
        ctx.moveTo(curve.start[0], curve.start[1]);
        ctx.bezierCurveTo(...curve.control1, ...curve.control2, ...curve.end);
        ctx.strokeStyle = curve.stroke;
        ctx.lineWidth = curve.lineWidth;
        if (curve.fill) ctx.fillStyle = curve.fill;
        ctx.stroke();
        if (curve.fill) ctx.fill();
    }

    // Draw the cat
    drawEllipse(body);
    drawEllipse(belly);
    drawCircle(head);
    drawTriangle(earLeft);
    drawTriangle(earRight);
    drawCircle(eyeLeft);
    drawCircle(eyeRight);
    drawTriangle(nose);
    drawCurve(mouth);
    drawCurve(tail);
    // ... Draw other parts ...
});


