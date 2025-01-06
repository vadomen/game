import { Cloud } from "./cloud";
import { Tree } from "./tree";

export class Background {
    canvasWidth: number;
    canvasHeight: number;
    clouds: Cloud[] = [];
    cloudCount: number = 5;
    trees: Tree[] = [];
    treeCount: number = 6;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Generate clouds
        for (let i = 0; i < this.cloudCount; i++) {
            this.clouds.push(new Cloud(canvasWidth, canvasHeight));
        }
       // Generate trees
        for (let i = 0; i < this.treeCount; i++) {
            this.trees.push(new Tree(canvasWidth, canvasHeight));
        }
    }

    drawSky(ctx: CanvasRenderingContext2D) {
        // Gradient sky
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, "#87CEEB"); // Light blue
        gradient.addColorStop(1, "#ffffff"); // White near the horizon

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawGround(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#733434";
        ctx.fillRect(0, this.canvasHeight - 4, this.canvasWidth, this.canvasHeight);
    }

    drawClouds(ctx: CanvasRenderingContext2D) {
        this.clouds.forEach((cloud) => {
            cloud.update();
            cloud.draw(ctx);
        });
    }

    drawTrees(ctx: CanvasRenderingContext2D) {
        this.trees.forEach((tree) => {
            tree.update();
            tree.draw(ctx);
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawSky(ctx);
        this.drawClouds(ctx);
        this.drawTrees(ctx);
        this.drawGround(ctx);
    }
}

