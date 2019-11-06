export class BackgroundHelper {
    constructor(scope) {
        this.__this = scope;
    }

    init() {
        this.drawHeader();
        this.playBGM();
    }

    drawHeader() {
        let graphics = this.__this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20 * gameSettings.eleScale);
        graphics.lineTo(0, 20 * gameSettings.eleScale);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.__this.score = 0;
        let scoreFormated = this.zeroPad(this.__this.score, 6);
        this.__this.scoreLabel = this.__this.add.bitmapText(
            10 * gameSettings.eleScale,
            5 * gameSettings.eleScale,
            'pixelFont',
            'SCORE ' + scoreFormated,
            16 * gameSettings.eleScale
        );
    }

    playBGM() {
        const musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        this.__this.music.play(musicConfig);
    }

    zeroPad(number, size) {
        let stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = '0' + stringNumber;
        }
        return stringNumber;
    }
}