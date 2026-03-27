export abstract class GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    constructor(x: number, y: number, width: number, height: number, speed: number = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    // abstract update(...args: any[]): void; // Leaving this out to allow flexible update signatures for now
}
