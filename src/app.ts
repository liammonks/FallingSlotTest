import * as PIXI from 'pixi.js';
import { Slot } from './slot';
import { Button } from './button';
import { Howl, Howler } from 'howler';

const slotCountX = 5;
const slotCountY = 4;

export class GameApp
{
    private app: PIXI.Application;
    private slots: Array<Slot>;
    private spinButton: Button;
    private spinButtonSound: Howl;
    
    constructor()
    {
        // Create the PIXI application
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);
        
        // Create background
        const backgroundSprite = PIXI.Sprite.from('./images/background.png');
        // Set sprite scale
        backgroundSprite.width = this.app.screen.width;
        backgroundSprite.height = this.app.screen.height;
        backgroundSprite.x = 0;
        backgroundSprite.y = 0;
        backgroundSprite.anchor.set(0.0);
        
        // Add the sprite to the scene we are building
        this.app.stage.addChild(backgroundSprite);

        
        // Create a spin button in the bottom right of the screen
        const buttonPosX = this.app.screen.width;
        const buttonPosY = this.app.screen.height;
        this.spinButton = new Button('btn_spin', buttonPosX, buttonPosY, 1.0, this.app);
        this.spinButton.onPress = () => this.onButtonDown();
        
        // Initialise slots array
        this.slots = Array<Slot>();
        
        this.spinButtonSound = new Howl({
            src: ['./sounds/Start_Button.mp3']
        });
    }
    
    onButtonDown()
    {
        this.spinButtonSound.play();
        // Disable the button, re-enabled after slots have landed/cleared
        this.spinButton.disable();
        
        // Create slots if none exist already, otherwise drop the existing slots
        if (this.slots.length == 0)
        {
            this.createSlots();
        }
        else
        {
            this.releaseSlots();
        }
        
        // Calculate the max amount of time it can take for a slot to land
        // fallDistance == (0.5 * Slot.fallRate) * fallDuration^2
        // fallDuration^2 == fallDistance / (0.5 * Slot.fallRate)
        const maxFallDistance = this.app.screen.height + (Slot.slotScale * slotCountY);
        const maxFallDuration = Math.sqrt(maxFallDistance / (0.5 * Slot.fallRate));
        setTimeout(() => this.spinButton.enable(), maxFallDuration * 1000);
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
        // Auto enerate new slots
        //setTimeout(() => this.createSlots(), 1000);
    }
}