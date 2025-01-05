import { Airplane } from "./airplane";
import { Bullet } from "./bullet";
import { Obstacle } from "./obstacle";
import { checkCollision } from "./utils/collision";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 1000;
canvas.height = 500;

// Track keys
const keys: { [key: string]: boolean } = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (e.key === " ") shootBullet();
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Game variables
const airplane = new Airplane();
const bullets: Bullet[] = [];
const obstacles: Obstacle[] = [];
let score = 0;

// Functions
function shootBullet() {
    bullets.push(new Bullet(airplane.x + airplane.width, airplane.y + airplane.height / 2));
}

function spawnObstacle() {
    const y = Math.random() * (canvas.height - 30);
    obstacles.push(new Obstacle(canvas.width, y));
}


// Game loop
function updateGame() {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get CanvasRenderingContext2D");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update airplane
    airplane.draw(ctx);
    // Update airplane position
    airplane.update(keys, canvas);

    // Draw, update, and remove bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw(ctx);

        // Remove off-screen bullets
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });

    // Draw, update, and remove obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.update();
        obstacle.draw(ctx);

        // Check collision with airplane
        if (checkCollision(airplane, obstacle)) {
            // alert(`Game Over! Your score: ${score}`);
            document.location.reload();
        }

        // Check collision with bullets
        bullets.forEach((bullet, bulletIndex) => {
            if (checkCollision(bullet, obstacle)) {
                obstacles.splice(index, 1);
                bullets.splice(bulletIndex, 1);
                score += 10;
            }
        });

        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
    });

    // Display score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Spawn obstacles every 2 seconds
setInterval(spawnObstacle, 2000);

// Game loop
function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();


