import { GameApp } from './app';

const gameApp = new GameApp();
gameApp.spin();
setTimeout(() => gameApp.release(), 2000);

console.log("success");