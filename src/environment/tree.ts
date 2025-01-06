import { getRandom } from "../utils/helpers";

export class Tree {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    image: HTMLImageElement;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.width = getRandom(20, 40);
        this.height = getRandom(60, 80);
        this.x = Math.random() * canvasWidth; // Random starting position
        this.y = canvasHeight - this.height;
        this.speed = Math.random() * 0.5 + 0.5; // Random speed

        this.image = new Image();
        this.image.src = `/assets/img/tree_${Math.round(Math.random())}.png`;
    }

    update() {
        this.x -= this.speed; // Move tree to the left
        if (this.x + this.width < 0) {
            this.x = window.innerWidth; // Reset position when off-screen
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
