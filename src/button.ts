import * as PIXI from 'pixi.js';

export class Button
{
    public onPress: Function;
    
    buttonTexture: PIXI.Texture;
    buttonHoverTexture: PIXI.Texture;
    buttonPressedTexture: PIXI.Texture;
    buttonDisabledTexture: PIXI.Texture;
    buttonSprite: PIXI.Sprite;
    
    private enabled = true;
    
    constructor(spriteName: string, positionX: number, positionY: number, anchor: number, app: PIXI.Application)
    {
        // Get relevant textures
        this.buttonTexture = PIXI.Texture.from('./images/ui/' + spriteName + '_normal.png');
        this.buttonHoverTexture = PIXI.Texture.from('./images/ui/' + spriteName + '_hover.png');
        this.buttonPressedTexture = PIXI.Texture.from('./images/ui/' + spriteName + '_pressed.png');
        this.buttonDisabledTexture = PIXI.Texture.from('./images/ui/' + spriteName + '_disabled.png');

        this.buttonSprite = new PIXI.Sprite(this.buttonTexture);

        // Set button position
        this.buttonSprite.anchor.set(anchor);
        this.buttonSprite.x = positionX;
        this.buttonSprite.y = positionY;
        // Make button interactive
        this.buttonSprite.interactive = true;
        this.buttonSprite.buttonMode = true;
        
        this.buttonSprite.on('pointerover', () => this.onPointerOver());
        this.buttonSprite.on('pointerout', () => this.onPointerOut());
        this.buttonSprite.on('pointerdown', () => this.onPointerDown());
        this.buttonSprite.on('pointerup', () => this.onPointerUp());

        app.stage.addChild(this.buttonSprite);
    }
    
    public enable()
    {
        this.enabled = true;
        this.buttonSprite.texture = this.buttonTexture;
    }
    
    public disable()
    {
        this.enabled = false;
        this.buttonSprite.texture = this.buttonDisabledTexture;
    }
    
    onPointerOver()
    {
        if (!this.enabled) { return; }
        this.buttonSprite.texture = this.buttonHoverTexture;
    }
    
    onPointerOut()
    {
        if (!this.enabled) { return; }
        this.buttonSprite.texture = this.buttonTexture;
    }
    
    onPointerDown()
    {
        if (!this.enabled) { return; }
        this.buttonSprite.texture = this.buttonPressedTexture;
        this.onPress();        
    }
    
    onPointerUp()
    {
        if (!this.enabled) { return; }
        this.buttonSprite.texture = this.buttonHoverTexture;
    }
}