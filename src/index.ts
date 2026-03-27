import { updateGame, initGame } from "./game";
import { AssetManager } from "./utils/assets";

let lastTime = performance.now();

function gameLoop(time: number) {
    const dt = time - lastTime;
    lastTime = time;
    updateGame(dt);
    requestAnimationFrame(gameLoop);
}

AssetManager.loadAll().then(() => {
    initGame();
    requestAnimationFrame((time) => {
        lastTime = time;
        gameLoop(time);
    });
});
