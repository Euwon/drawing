import { getStroke } from 'perfect-freehand';

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Adjusting for device pixel ratio
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
ctx.scale(dpr, dpr);

let painting = false;

function startPosition(e) {
    painting = true;
    canvas.setPointerCapture(e.pointerId); // Capture pointer events for this canvas
    ctx.beginPath(); // Begin a new path

    // Adjusted calculation for starting coordinates
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr);

    ctx.moveTo(x, y); // Move to the starting point without drawing a line
}

function draw(e) {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr);

    // Default line width for mouse, adjusted by pressure for pen
    console.log('Pressure:', e.pressure);
    const baseLineWidth = 5; // Base line width
    ctx.lineWidth = e.pointerType === 'pen' ? baseLineWidth * e.pressure : baseLineWidth;
    
    ctx.lineCap = 'round';
    ctx.lineTo(x, y); // Draw a line to the new position
    ctx.stroke();
    ctx.beginPath(); // Begin a new path to avoid connecting dots directly
    ctx.moveTo(x, y); // Move to this position to start the next line
}

function finishedPosition(e) {
    canvas.releasePointerCapture(e.pointerId); // Release pointer capture
    painting = false;
    ctx.beginPath(); // Prepare for a new path the next time the user draws
}

canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointerleave', finishedPosition); // Optional, to handle the pen leaving the canvas

