const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let car = {
    x: 375,
    y: 450,
    width: 100,
    height: 150,
    speed: 15
};

let keys = {};
let obstacles = [];
let score = 0;
let gameOver = false;

// Charger l'image de la voiture
const carImage = new Image();
carImage.src = 'car.png';

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawCar() {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    ctx.fillStyle = 'blue';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function updateObstacles() {
    for (let obstacle of obstacles) {
        obstacle.y += 2;
        if (obstacle.y > canvas.height) {
            obstacle.y = -obstacle.height;
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
            score += 10;
        }

        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.height + car.y > obstacle.y
        ) {
            gameOver = true;
        }
    }
}

function createObstacle() {
    let obstacle = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 50,
        height: 100
    };
    obstacles.push(obstacle);
}

function update() {
    if (keys['ArrowLeft'] && car.x > 0) {
        car.x -= car.speed;
    }
    if (keys['ArrowRight'] && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    updateObstacles();
    drawObstacles();

    document.getElementById('score').textContent = `Score: ${score}`;

    if (!gameOver) {
        requestAnimationFrame(update);
    } else {
        alert('Game Over! Your score: ' + score);
    }
}

// Attendre que l'image soit chargée avant de démarrer le jeu
carImage.onload = () => {
    createObstacle();
    setInterval(createObstacle, 2000);
    update();
};
