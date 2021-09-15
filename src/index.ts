import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);

// load the texture we need
app.loader
    .add('symbol', './images/symbols/symbol_1.png')
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
            symbol.rotation += 0.01;
        });
});

console.log("success");