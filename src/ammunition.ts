export type AmmunitionType = 'bullet' | 'bomb';

interface IAmmunitionDictionaryType {
        type: AmmunitionType,
        color: string,
        speed: number,
        width: number,
        height: number,
}

interface IAmmunitionDictionary {
    bullet: IAmmunitionDictionaryType;
    bomb: IAmmunitionDictionaryType;
}

export class Ammunition {
    x: number;
    y: number;
    width: number = 10;
    height: number = 5;
    speed: number = 2;
    ammunitionDictionary: IAmmunitionDictionary = {
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
    currentAmmunition: IAmmunitionDictionaryType = this.ammunitionDictionary['bullet'];

    constructor(x: number, y: number, ammunitionType: AmmunitionType) {
        this.x = x;
        this.y = y;

        this.currentAmmunition = this.ammunitionDictionary[ammunitionType];
        this.width = this.currentAmmunition.width;
        this.height = this.currentAmmunition.height;
        this.speed = this.currentAmmunition.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.currentAmmunition.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if(this.currentAmmunition.type === 'bullet') this.x += this.speed;
        if(this.currentAmmunition.type === 'bomb') this.y += this.speed;
    }
}
