export function createGameTextures(scene) {
    createCatTextures(scene);
    createMouseTextures(scene);
    createBirdTextures(scene);
    createHazardTextures(scene);
}

function createCatTextures(scene) {
    if (scene.textures.exists('cat_idle')) return;

    // 1. CAT IDLE (32x32)
    const canvasIdle = scene.textures.createCanvas('cat_idle', 32, 32);
    const ctxI = canvasIdle.getContext('2d');
    drawCatBase(ctxI, 0);
    canvasIdle.refresh();

    // 2. CAT WALK 1 (32x32)
    const canvasW1 = scene.textures.createCanvas('cat_walk1', 32, 32);
    const ctxW1 = canvasW1.getContext('2d');
    drawCatBase(ctxW1, 1);
    canvasW1.refresh();

    // 3. CAT WALK 2 (32x32)
    const canvasW2 = scene.textures.createCanvas('cat_walk2', 32, 32);
    const ctxW2 = canvasW2.getContext('2d');
    drawCatBase(ctxW2, 2);
    canvasW2.refresh();

    // 4. CAT JUMP (32x32)
    const canvasJ = scene.textures.createCanvas('cat_jump', 32, 32);
    const ctxJ = canvasJ.getContext('2d');
    drawCatBase(ctxJ, 3);
    canvasJ.refresh();

    // 5. CAT HURT (32x32)
    const canvasH = scene.textures.createCanvas('cat_hurt', 32, 32);
    const ctxH = canvasH.getContext('2d');
    drawCatBase(ctxH, 4);
    canvasH.refresh();
}

function drawCatBase(ctx, frameType) {
    ctx.clearRect(0, 0, 32, 32);

    const isHurt = (frameType === 4);
    const bodyColor = isHurt ? '#FF3333' : '#1A1A26';
    const strokeColor = isHurt ? '#FF8888' : '#00FFFF';

    // Cyan Outline silhouette for max visibility on dark backgrounds
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;

    // Ears
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(6, 12); ctx.lineTo(3, 3); ctx.lineTo(11, 7);
    ctx.moveTo(22, 12); ctx.lineTo(25, 3); ctx.lineTo(17, 7);
    ctx.fill();
    ctx.stroke();

    // Inner Ears (Pink)
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.moveTo(6, 10); ctx.lineTo(4, 5); ctx.lineTo(10, 7);
    ctx.moveTo(22, 10); ctx.lineTo(24, 5); ctx.lineTo(18, 7);
    ctx.fill();

    // Head
    ctx.fillStyle = bodyColor;
    ctx.fillRect(5, 7, 18, 12);
    ctx.strokeRect(5, 7, 18, 12);

    // Eyes
    if (isHurt) {
        // Dizzy X eyes
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(7, 10); ctx.lineTo(11, 14);
        ctx.moveTo(11, 10); ctx.lineTo(7, 14);
        ctx.moveTo(16, 10); ctx.lineTo(20, 14);
        ctx.moveTo(20, 10); ctx.lineTo(16, 14);
        ctx.stroke();
    } else {
        // Glowing Emerald Eyes
        ctx.fillStyle = '#00FFCC';
        ctx.fillRect(8, 10, 4, 5);
        ctx.fillRect(16, 10, 4, 5);
        ctx.fillStyle = '#111111'; // Slit Pupils
        ctx.fillRect(10, 11, 1.5, 3);
        ctx.fillRect(17, 11, 1.5, 3);
    }

    // Nose
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.moveTo(14, 15); ctx.lineTo(12, 13); ctx.lineTo(16, 13);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(2, 13); ctx.lineTo(7, 14);
    ctx.moveTo(2, 16); ctx.lineTo(7, 15);
    ctx.moveTo(26, 13); ctx.lineTo(21, 14);
    ctx.moveTo(26, 16); ctx.lineTo(21, 15);
    ctx.stroke();

    // Body
    ctx.fillStyle = bodyColor;
    ctx.fillRect(7, 18, 14, 10);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(7, 18, 14, 10);

    // Paws / Legs depending on frame animation
    ctx.fillStyle = '#333344';
    if (frameType === 0) { // Idle
        ctx.fillRect(7, 27, 4, 4);
        ctx.fillRect(17, 27, 4, 4);
    } else if (frameType === 1) { // Walk 1
        ctx.fillRect(5, 27, 4, 4);
        ctx.fillRect(19, 27, 4, 4);
    } else if (frameType === 2) { // Walk 2
        ctx.fillRect(9, 27, 4, 4);
        ctx.fillRect(15, 27, 4, 4);
    } else if (frameType === 3) { // Jump
        ctx.fillRect(4, 25, 4, 5);
        ctx.fillRect(20, 25, 4, 5);
    } else { // Hurt
        ctx.fillRect(6, 27, 5, 4);
        ctx.fillRect(17, 27, 5, 4);
    }

    // Tail (Animated per frame)
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    if (frameType === 3) {
        // Tail straight back when jumping
        ctx.rect(21, 20, 9, 3);
    } else {
        // Tail curved up
        ctx.rect(21, 15, 3, 9);
        ctx.rect(23, 12, 4, 3);
    }
    ctx.fill();
}

function createMouseTextures(scene) {
    if (scene.textures.exists('mouse')) return;

    const canvas = scene.textures.createCanvas('mouse', 32, 32);
    const ctx = canvas.getContext('2d');

    // Ears
    ctx.fillStyle = '#FFC0CB';
    ctx.beginPath();
    ctx.arc(8, 10, 6, 0, Math.PI * 2);
    ctx.arc(24, 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Body
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(6, 12, 20, 16);
    ctx.strokeRect(6, 12, 20, 16);

    // Eyes
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(10, 16, 2, 0, Math.PI * 2);
    ctx.arc(22, 16, 2, 0, Math.PI * 2);
    ctx.fill();

    // Pink Nose
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.arc(16, 22, 3, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
}

function createBirdTextures(scene) {
    if (scene.textures.exists('bird')) return;

    const canvas = scene.textures.createCanvas('bird', 24, 24);
    const ctx = canvas.getContext('2d');

    // Body (Gold)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(12, 12, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Wings
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(8, 12); ctx.lineTo(2, 6); ctx.lineTo(10, 10);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#111111';
    ctx.fillRect(15, 9, 2, 2);

    // Beak
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.moveTo(18, 11); ctx.lineTo(23, 13); ctx.lineTo(18, 15);
    ctx.fill();

    canvas.refresh();
}

function createHazardTextures(scene) {
    if (scene.textures.exists('projectile_plate')) return;

    const canvas = scene.textures.createCanvas('projectile_plate', 24, 24);
    const ctx = canvas.getContext('2d');

    // Spinning Hot Tangerine Plate
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.arc(12, 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner ring
    ctx.strokeStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(12, 12, 5, 0, Math.PI * 2);
    ctx.stroke();

    canvas.refresh();
}
