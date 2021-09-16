import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

const playDuration = 0.5;
const audioCount = 3;

export class Splash
{
    
    playTick: PIXI.TickerCallback<Splash>;

    private sprite: PIXI.Sprite;
    private textures: Array<PIXI.Texture>;
    audio: Howl;

    private frameIndex = 0;
    private t = 0.0;
    
    constructor(positionX: number, positionY: number, app: PIXI.Application)
    {
        // Get textures
        this.textures = new Array<PIXI.Texture>();
        this.textures.push(PIXI.Texture.from('./images/splash/splash_0.png'));
        this.textures.push(PIXI.Texture.from('./images/splash/splash_1.png'));
        this.textures.push(PIXI.Texture.from('./images/splash/splash_2.png'));
        this.textures.push(PIXI.Texture.from('./images/splash/splash_3.png'));
        
        // Create sprite
        this.sprite = PIXI.Sprite.from(this.textures[0]);
        this.sprite.x = positionX;
        this.sprite.y = positionY;
        this.sprite.anchor.set(0.25);
        app.stage.addChild(this.sprite);
        
        // Setup audio
        const audioIndex = 1 + Math.round(Math.random() * (audioCount - 1));
        this.audio = new Howl({
            src: ['./sounds/Splash_' + audioIndex + '.mp3']
        });
        this.audio.play();
        
        // Listen for frame updates
        this.playTick = () => this.play(app);
        app.ticker.add(this.playTick);
    }
    
    play(app: PIXI.Application)
    {
        this.t += app.ticker.elapsedMS / 1000;
        // Check what frame we should be on based on elapsed time
        const newFrameIndex = Math.round((this.t / playDuration) * (this.textures.length - 1));
        // Update sprite texture
        if (this.frameIndex != newFrameIndex)
        {
            this.frameIndex = newFrameIndex;
            this.sprite.texture = this.textures[this.frameIndex];
        }
        if (this.t >= playDuration) {
            app.stage.removeChild(this.sprite);
            // Remove this function from the ticker
            app.ticker.remove(this.playTick);
        }
    }
    
}