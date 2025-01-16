import { canvasHeight, canvasWidth } from "./config";

export class Enemy {
    x: number;
    y: number;
    width: number = 60;
    height: number = 60;
    imageTank: HTMLImageElement;

    enemiesDictionary = [
        {
            type: 'tank',
            speed: 1,
            width: 70,
            height: 34,
            src: "/assets/img/tank_70_34.png",
        },
        {
            type: 'plane',
            speed: 4,
            width: 60,
            height: 30,
            src: "/assets/img/enemy_plane.png",
        },
    ];
    currentEnemy = this.enemiesDictionary[0];

    constructor() {
        this.currentEnemy = this.enemiesDictionary[Math.round(Math.random())]; // random 0 tank || 1 = plane
        this.imageTank = new Image();
        this.imageTank.src = this.currentEnemy.src;
        this.y = canvasHeight - 34;
        this.x = canvasWidth;
        this.width = this.currentEnemy.width;
        this.height = this.currentEnemy.height;
        this.generateEnemy();
    }

    private generateEnemy(){
        if(this.currentEnemy.type === 'tank') {
            this.y = canvasHeight - 34;
        }
        if(this.currentEnemy.type === 'plane') {
            this.y = Math.random() * (canvasHeight - 90);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.imageTank, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.currentEnemy.speed;
    }
}
