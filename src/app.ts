import * as PIXI from 'pixi.js';
import { Slot } from './slot';
import { Button } from './button';

const slotCountX = 5;
const slotCountY = 4;

export class GameApp
{
    private app: PIXI.Application;
    private slots: Array<Slot>;
    private spinButton: Button;
    
    constructor()
    {
        // Create the PIXI application
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);
        
        // Create a spin button in the bottom right of the screen
        const buttonPosX = this.app.screen.width;
        const buttonPosY = this.app.screen.height;
        this.spinButton = new Button('btn_spin', buttonPosX, buttonPosY, 1.0, this.app);
        this.spinButton.onPress = () => this.onButtonDown();
        
        // Initialise slots array
        this.slots = Array<Slot>();
        this.createSlots();
    }
    
    onButtonDown()
    {
        this.releaseSlots();
    }

    createSlots()
    {
        for (var x = 0; x < slotCountX; ++x) {
            for (var y = 0; y < slotCountY; ++y) {
                // Create a new slot with the given column and row
                this.slots.push(new Slot(x, y, this.app));
            }
        }
    }
    
    releaseSlots()
    {
        // Release all slots
        for (var i = 0; i < this.slots.length; ++i)
        {
            this.slots[i].release();
        }
        // Clear slots array
        this.slots = [];
        // Generate new slots
        setTimeout(() => this.createSlots(), 1000);
    }
}