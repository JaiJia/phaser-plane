export class PowerupHelper {
    constructor(scope) {
        this.__this = scope;
    }
    
    generatePowerups() {
        this.__this.time.addEvent({
            delay: 5 * 1000,
            callback: function () {
                if (this.__this.powerUps.getChildren().length >= gameSettings.maxPowerups) {
                    return;
                }
                let powerUp = this.__this.physics.add.sprite(16, 16, 'power-up');
                powerUp.setScale(gameSettings.eleScale);
                this.__this.powerUps.add(powerUp);
                powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

                if (Math.random() > 0.5) {
                    powerUp.play('red');
                } else {
                    powerUp.play('gray');
                }

                powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
                powerUp.setCollideWorldBounds(true);
                powerUp.setBounce(1);
            },
            callbackScope: this,
            loop: 10
        });
    }

    pickPowerUp(player, powerUp) {
        powerUp.destroy();
        this.__this.pickupSound.play();
        player.level = (player.level || 0) + 1;
    }
}