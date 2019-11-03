import Phaser from 'phaser';
import * as _  from 'lodash';
import { Scene1 } from './scene/Scene1';
import { Scene2 } from './scene/Scene2';

const clientWidth = window.innerWidth;
const clientHeight = window.innerHeight;

window._ = _;

window.config = {
    width: clientWidth,
    height: clientHeight,
    type: Phaser.CANVAS,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false,
            debugShowVelocity: false
        }
    }
};

window.game = new Phaser.Game(config);

window.gameSettings = {
    playerSpeed: 400,
    maxPowerups: 5,
    powerUpVel: 100,
    isPC: !!game.device.os.desktop,
    eleScale: game.device.os.desktop ? 2 : 3,
    isLandscape: !!game.scale.isLandscape, // 横屏
};
