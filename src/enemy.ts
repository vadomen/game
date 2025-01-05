import { canvasHeight, canvasWidth } from "./config";

export class Enemy {
    x: number;
    y: number;
    width: number = 60;
    height: number = 60;

    enemiesDictionary = [
        {
            type: 'tank',
            color: 'green',
            speed: 1,
            width: 60,
            height: 30,
        },
        {
            type: 'plane',
            color: 'red',
            speed: 4,
            width: 30,
            height: 20,
        },
    ];
    currentEnemy = this.enemiesDictionary[0];

    constructor() {
        this.currentEnemy = this.enemiesDictionary[Math.round(Math.random())]; // random 0 tank || 1 = plane
        this.x = canvasWidth;
        this.y = canvasHeight - 30;
        this.width = this.currentEnemy.width;
        this.height = this.currentEnemy.height;
        this.generateEnemy();
    }

    private generateEnemy(){
        if(this.currentEnemy.type === 'tank') {
            this.y = canvasHeight - 30;
        }
        if(this.currentEnemy.type === 'plane') {
            this.y = Math.random() * (canvasHeight - 90);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.currentEnemy.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.currentEnemy.speed;
    }
}
