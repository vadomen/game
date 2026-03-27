import { GameObject } from "./gameObject";

export type AmmunitionType = 'bullet' | 'bomb';

interface IAmmunitionDictionaryType {
        type: AmmunitionType,
        color: string,
        speed: number,
        width: number,
        height: number,
}

const ammunitionDictionary: Record<AmmunitionType, IAmmunitionDictionaryType> = {
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

export class Ammunition extends GameObject {
    currentAmmunition: IAmmunitionDictionaryType;

    constructor(x: number, y: number, ammunitionType: AmmunitionType) {
        const ammoInfo = ammunitionDictionary[ammunitionType];
        super(x, y, ammoInfo.width, ammoInfo.height, ammoInfo.speed);
        this.currentAmmunition = ammoInfo;
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
