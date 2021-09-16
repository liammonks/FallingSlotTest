import * as PIXI from 'pixi.js';

const symbolSpriteCount = 8;

export class Slot
{
    static maxReleaseDelay = 250;
    static slotScale = 100;
    static fallRate = 1000.0;

    column: number;
    row: number;
    sprite: PIXI.Sprite;
    fallTick: PIXI.TickerCallback<Slot>;
    
    private falling = true;
    private released = false;
    private velocityY = 0;
    
    constructor(column: number, row: number, app: PIXI.Application)
    {
        this.column = column;
        this.row = row;
        // Get a random sprite index (1 to 8)
        const slotSpriteIndex = 1 + Math.round(Math.random() * (symbolSpriteCount - 1));
        const spritePath = './images/symbols/symbol_' + slotSpriteIndex + '.png';
        // load the sprite
        this.sprite = PIXI.Sprite.from(spritePath);
        
        // Set sprite scale
        this.sprite.width = Slot.slotScale;
        this.sprite.height = Slot.slotScale;
        
        // Setup the position of the sprite
        this.sprite.x = Slot.slotScale * column;
        // Start the sprite off the top edge of the screen, randomly offset this position further up based on the slots row
        this.sprite.y = (-Slot.slotScale * (row + 1)) - ((Math.random() + row) * Slot.slotScale);
        
        // Add the sprite to the scene we are building
        app.stage.addChild(this.sprite);
        // Listen for frame updates
        this.fallTick = () => this.fall(app);
        app.ticker.add(this.fallTick);
    }
    
    fall(app: PIXI.Application)
    {
        if (!this.falling) { return; }
        this.velocityY += Slot.fallRate * (app.ticker.elapsedMS / 1000);        
        this.sprite.position.y += this.velocityY * (app.ticker.elapsedMS / 1000);
        
        const floor = app.screen.height - (this.sprite.height * (this.row + 1));
        
        // Stop the sprite from falling at the floor position if it is not being released
        if (!this.released && this.sprite.position.y >= floor)
        {
            // Snap sprite to floor
            this.sprite.position.y = floor;
            this.falling = false;
        }
        // Prepare this object for destroy once below screen height
        if (this.released && this.sprite.position.y >= app.screen.height)
        {
            // Remove this slots sprite from the canvas
            app.stage.removeChild(this.sprite);
            // Remove this function from the ticker
            app.ticker.remove(this.fallTick);
            // GARBAGE COLLECTION ?
        }
    }
    
    public release()
    {
        const delay = (Math.random() * Slot.maxReleaseDelay) + (this.row * Slot.maxReleaseDelay);
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