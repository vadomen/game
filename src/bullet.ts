export class Bullet {
    x: number;
    y: number;
    width: number = 10;
    height: number = 5;
    speed: number = 5;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        this.x += 3;
    }
}
