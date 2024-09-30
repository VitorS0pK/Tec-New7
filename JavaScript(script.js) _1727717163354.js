
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let cannonX = canvas.width / 2;
const cannonY = canvas.height - 30;
const cannonWidth = 60;
const cannonHeight = 20;
let bullets = [];
let targets = [];
let score = 0;
let gameInterval;
let targetInterval;

// Função para desenhar o canhão
function drawCannon() {
    ctx.fillStyle = '#00f';
    ctx.fillRect(cannonX, cannonY, cannonWidth, cannonHeight);
}

// Função para desenhar os alvos
function drawTargets() {
    ctx.fillStyle = '#f00';
    targets.forEach(target => {
        ctx.fillRect(target.x, target.y, target.size, target.size);
    });
}

// Função para desenhar as balas
function drawBullets() {
    ctx.fillStyle = '#ff0';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Função para atualizar a posição das balas e verificar colisões
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCannon();
    drawTargets();
    drawBullets();

    // Atualiza as balas
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        // Verifica se a bala saiu da tela
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }

        // Verifica colisão com os alvos
        targets.forEach((target, targetIndex) => {
            if (bullet.x < target.x + target.size &&
                bullet.x + bullet.width > target.x &&
                bullet.y < target.y + target.size &&
                bullet.y + bullet.height > target.y) {
                // Remove a bala e o alvo
                bullets.splice(index, 1);
                targets.splice(targetIndex, 1);
                score++;
                document.getElementById('score').innerText = `Pontos: ${score}`;
            }
        });
    });
}

// Função para gerar alvos
function generateTarget() {
    const size = 30;
    const x = Math.random() * (canvas.width - size);
    targets.push({ x, y: 0, size });
}

// Função para controlar o canhão
document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    cannonX = event.clientX - rect.left - cannonWidth / 2;
});

// Função para atirar
document.addEventListener('click', () => {
    bullets.push({ x: cannonX + cannonWidth / 2, y: cannonY, width: 5, height: 20, speed: 5 });
});

// Iniciar o jogo
function startGame() {
    gameInterval = setInterval(update, 20);
    targetInterval = setInterval(generateTarget, 1000);
}

// Iniciar o jogo
startGame();
