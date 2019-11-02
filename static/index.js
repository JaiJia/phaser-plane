import Phaser from 'phaser';
import { globalConfig } from './game.config';
import * as _  from 'lodash';
import { Scene1 } from './scene/Scene1';
import { Scene2 } from './scene/Scene2';

window._ = _;

window.gameSettings = {
    playerSpeed: 400,
    maxPowerups: 5,
    powerUpVel: 100,
};

window.config = _.merge(globalConfig, {
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
});


window.game = new Phaser.Game(config);
