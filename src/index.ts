import * as PIXI from 'pixi.js';
import { Slot } from './slots';

const app = new PIXI.Application();

document.body.appendChild(app.view);

const slot = new Slot(1, 0.01);

// load the texture we need
app.loader
    .add('symbol', slot.spritePath)
    .load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image
        const symbol = new PIXI.Sprite(resources.symbol.texture);

        // Setup the position of the bunny
        symbol.x = app.renderer.width / 2;
        symbol.y = app.renderer.height / 2;

        // Rotate around the center
        symbol.anchor.x = 0.5;
        symbol.anchor.y = 0.5;

        // Add the bunny to the scene we are building
        app.stage.addChild(symbol);

        // Listen for frame updates
        app.ticker.add(() => {
            // each frame we spin the bunny around a bit
            symbol.rotation += slot.spinRate;
        });
});

console.log("success");