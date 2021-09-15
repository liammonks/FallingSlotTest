export class Slot
{
    spritePath: string;
    spinRate: number;
    
    constructor(slotSpriteIndex: number, spinRate: number)
    {
        this.spritePath = "./images/symbols/symbol_" + slotSpriteIndex + ".png";
        this.spinRate = spinRate;
    }
}