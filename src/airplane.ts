export class Airplane {
    x: number = 50;
    y: number = 200;
    width: number = 60;
    height: number = 30;
    speed: number = 5;
    image: HTMLImageElement;
    // loaded: boolean = false;

    constructor() {
        this.image = new Image();
        this.image.src = "/assets/img/plane.png";
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
