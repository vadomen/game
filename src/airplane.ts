import { AssetManager } from "./utils/assets";
import { GameObject } from "./gameObject";

export class Airplane extends GameObject {
    image: HTMLImageElement;

    constructor() {
        super(50, 200, 60, 30, 5);
        this.image = AssetManager.getImage("plane");
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update(keys: { [key: string]: boolean }, canvas: HTMLCanvasElement) {
        if (keys["ArrowUp"] && this.y > 0) {
            this.y -= this.speed;
        }
        if (keys["ArrowDown"] && this.y + this.height < canvas.height - 60) {
            this.y += this.speed;
        }
        if (keys["ArrowLeft"] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys["ArrowRight"] && this.x + this.height < canvas.width) {
            this.x += this.speed;
        }
    }
}
