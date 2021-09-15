import * as PIXI from 'pixi.js';
import { Slot } from './slot';

const slotCountX = 5;
const slotCountY = 4;

export class GameApp
{
    private app: PIXI.Application;
    
    constructor()
    {
        // Create the PIXI application
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);
    }

    private createSlot(column: number, row: number)
    {
        const slot = new Slot(column, row, this.app);
    }
    
    spin()
    {
        for (var x = 0; x < slotCountX; ++x) {
            for (var y = 0; y < slotCountY; ++y) {
                this.createSlot(x, y);
            }
        }
    }
}