export class Cloud {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.width = Math.random() * 100 + 50; // Cloud width
        this.height = Math.random() * 50 + 20; // Cloud height
        this.x = Math.random() * canvasWidth; // Random starting position
        this.y = Math.random() * (canvasHeight / 2); // Random height in the sky
        this.speed = Math.random() * 2 + 0.5; // Random speed
    }

    update() {
        this.x -= this.speed; // Move cloud to the left
        if (this.x + this.width < 0) {
            this.x = window.innerWidth; // Reset position when off-screen
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}
