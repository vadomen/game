import { Airplane } from "./airplane";
import { Ammunition, AmmunitionType } from "./ammunition";
import { Enemy } from "./enemy";
import { checkCollision } from "./utils/collision";
import { canvasWidth, canvasHeight } from "./config";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Track keys
const keys: { [key: string]: boolean } = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (e.key === " ") shoot('bullet');
});

document.addEventListener("keyup", (e) => {
    if (e.key === "b" || e.key === "B") shoot('bomb');
    keys[e.key] = false;
});

// Game variables
const airplane = new Airplane();
const ammunition: Ammunition[] = [];
const enemies: Enemy[] = [];
let score = 0;

// Functions
function shoot(ammunitionType: AmmunitionType) {
    ammunition.push(new Ammunition(airplane.x + airplane.width, airplane.y + airplane.height / 2, ammunitionType));
}

function spawnEnemies() {
    enemies.push(new Enemy());
}

export function updateGame() {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get CanvasRenderingContext2D");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update airplane
    airplane.draw(ctx);
    airplane.update(keys, canvas);

    // Draw, update, and remove bullets
    ammunition.forEach((bullet, index) => {
        bullet.update();
        bullet.draw(ctx);

        // Remove off-screen bullets
        if (bullet.x > canvas.width) {
            ammunition.splice(index, 1);
        }
        if (bullet.y > canvas.height) {
            ammunition.splice(index, 1);
        }
    });

    // Draw, update, and remove enemies
    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw(ctx);

        // Check collision with airplane
        if (checkCollision(airplane, enemy)) {
            // alert(`Game Over! Your score: ${score}`);
            document.location.reload();
        }

        // Check collision with bullets
        ammunition.forEach((bullet, bulletIndex) => {
            if (checkCollision(bullet, enemy)) {
                enemies.splice(index, 1);
                ammunition.splice(bulletIndex, 1);
                score += 10;
            }
        });

        // Remove off-screen obstacles
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
        }
    });

    // Display score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Spawn obstacles every 2 seconds
setInterval(spawnEnemies, 2000);
