export class Ammunition {
    x: number;
    y: number;
    width: number = 10;
    height: number = 5;
    speed: number = 2;
    ammunitionDictionary = {
        bullet: {
            type: 'bullet',
            color: 'grey',
            speed: 4,
            width: 10,
            height: 5,
        },
        bomb: {
            type: 'bomb',
            color: 'red',
            speed: 1,
            width: 5,
            height: 10,
        }
    };
    currentAmmunition = this.ammunitionDictionary['bullet'];

    constructor(x: number, y: number, ammunitionType: string) {
        this.x = x;
        this.y = y;
        // @ts-ignore
        this.currentAmmunition = this.ammunitionDictionary[ammunitionType];
        this.width = this.currentAmmunition.width;
        this.height = this.currentAmmunition.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.currentAmmunition.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if(this.currentAmmunition.type === 'bullet') this.x += this.currentAmmunition.speed;
        if(this.currentAmmunition.type === 'bomb') this.y += this.currentAmmunition.speed;
    }
}
