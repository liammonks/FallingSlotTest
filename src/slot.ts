import * as PIXI from 'pixi.js';

const slotScale = 100;
const symbolSpriteCount = 8;
const maxReleaseDelay = 250;

export class Slot
{
    column: number;
    row: number;
    sprite: PIXI.Sprite;
    
    falling = true;
    released = false;
    velocityY = 0;
    
    constructor(column: number, row: number, app: PIXI.Application)
    {
        this.column = column;
        this.row = row;
        // Get a random sprite index (1 to 8)
        const slotSpriteIndex = 1 + Math.round(Math.random() * (symbolSpriteCount - 1));
        const spritePath = "./images/symbols/symbol_" + slotSpriteIndex + ".png";
        // load the sprite
        this.sprite = PIXI.Sprite.from(spritePath);
        
        // Set sprite scale
        this.sprite.width = slotScale;
        this.sprite.height = slotScale;
        
        // Setup the position of the sprite
        this.sprite.x = slotScale * column;
        // Start the sprite off the top edge of the screen, randomly offset this position further up based on the slots row
        this.sprite.y = (-slotScale * row) - ((Math.random() + row) * slotScale);

        // Add the sprite to the scene we are building
        app.stage.addChild(this.sprite);
        // Listen for frame updates
        app.ticker.add(() => this.fall(app));
    }
    
    fall(app: PIXI.Application)
    {
        if (!this.falling) { return; }
        this.velocityY += app.ticker.deltaTime * 0.1;
        this.sprite.position.y += this.velocityY;
        
        const floor = app.screen.height - (this.sprite.height * (this.row + 1));
        
        // Stop the sprite from falling at the floor position if it is not being released
        if (!this.released && this.sprite.position.y >= floor)
        {
            // Snap sprite to floor
            this.sprite.position.y = floor;
            this.falling = false;
        }
        if (this.released && this.sprite.position.y >= app.screen.height)
        {
            app.stage.removeChild(this.sprite);
            this.falling = false;
            //app.ticker.remove(() => this.fall(app)); // No idea how this remove function works
        }
    }
    
    public release()
    {
        const delay = (Math.random() * maxReleaseDelay) + (this.row * maxReleaseDelay);
        setTimeout(() => {
            // Start the sprite falling again
            this.falling = true;
            // Mark the sprite as released so that it will destroy itself once off screen
            this.released = true;
            // Reset velocity
            this.velocityY = 0;
        }, delay);
    }
    
}