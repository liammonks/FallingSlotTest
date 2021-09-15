import * as PIXI from 'pixi.js';
import { Slot } from './slot';

const slotCountX = 5;
const slotCountY = 4;

export class GameApp
{
    private app: PIXI.Application;
    private slots: Array<Slot>;
    
    constructor()
    {
        // Create the PIXI application
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);
        this.slots = Array<Slot>();
    }

    private createSlot(column: number, row: number)
    {
        // Create a new slot with the given column and row
        this.slots.push(new Slot(column, row, this.app));
    }
    
    spin()
    {
        for (var x = 0; x < slotCountX; ++x) {
            for (var y = 0; y < slotCountY; ++y) {
                this.createSlot(x, y);
            }
        }
    }
    
    release()
    {
        // Start on the bottom row, iterate upwards
        for (var y = 0; y < slotCountY; ++y)
        {
            // For each slot on this row
            for (var x = 0; x < slotCountX; ++x) {
                this.slots[x + (y * slotCountX)].release();
            }
        }
    }
}