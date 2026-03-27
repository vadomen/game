import { canvasHeight, canvasWidth } from "./config";
import { AssetManager } from "./utils/assets";
import { GameObject } from "./gameObject";

const enemiesDictionary = [
    {
        type: 'tank',
        speed: 1,
        width: 70,
        height: 34,
        assetKey: "tank",
    },
    {
        type: 'plane',
        speed: 4,
        width: 60,
        height: 30,
        assetKey: "enemy_plane",
    },
];

export class Enemy extends GameObject {
    imageTank: HTMLImageElement;
    currentEnemy: any;

    constructor() {
        const rndEnemy = enemiesDictionary[Math.round(Math.random())];
        super(canvasWidth, 
              rndEnemy.type === 'tank' ? canvasHeight - 34 : Math.random() * (canvasHeight - 90), 
              rndEnemy.width, 
              rndEnemy.height, 
              rndEnemy.speed);
              
        this.currentEnemy = rndEnemy;
        this.imageTank = AssetManager.getImage(this.currentEnemy.assetKey);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.imageTank, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
    }
}
