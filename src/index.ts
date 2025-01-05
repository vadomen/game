import { updateGame } from "./game";

// Game loop
function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();


