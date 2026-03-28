import { Airplane } from "./airplane";
import { Ammunition, AmmunitionType } from "./ammunition";
import { Enemy } from "./enemy";
import { checkCollision } from "./utils/collision";
import { canvasWidth, canvasHeight } from "./config";
import { Background } from "./environment/background";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Game variables
let background: Background;
let airplane: Airplane;
let ammunition: Ammunition[] = [];
let enemies: Enemy[] = [];
let score = 0;
let enemySpawnTimer = 0;
const ENEMY_SPAWN_INTERVAL = 2000;

export function initGame() {
    background = new Background(canvas.width, canvas.height);
    airplane = new Airplane();
}

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

// Functions
function shoot(ammunitionType: AmmunitionType) {
    if (!airplane) return;
    ammunition.push(new Ammunition(airplane.x + airplane.width, airplane.y + airplane.height / 2, ammunitionType));
}

function spawnEnemies() {
    enemies.push(new Enemy());
}

export function updateGame(dt: number) {
    if (!airplane || !background) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get CanvasRenderingContext2D");
    }

    enemySpawnTimer += dt;
    if (enemySpawnTimer > ENEMY_SPAWN_INTERVAL) {
        spawnEnemies();
        enemySpawnTimer = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update airplane
    background.draw(ctx);

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
            const isBombHittingPlane = bullet.currentAmmunition.type === 'bomb' && enemy.currentEnemy.type === 'plane';
            if (checkCollision(bullet, enemy) && !isBombHittingPlane) { // bombs should not destroy enemy planes
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
