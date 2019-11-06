import { Beam } from '../action/beam';
import { EnemyBeam } from '../action/enemy.beam';
import { Explosion } from '../action/explosion';
import { BackgroundHelper } from '../helper/background.helper';
import { PowerupHelper } from '../helper/powerup.helper';
import { PlayerHelper } from '../helper/player.helper';

class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame');
        this.BackgroundHelper = new BackgroundHelper(this);
        this.PowerupHelper = new PowerupHelper(this);
        this.PlayerHelper = new PlayerHelper(this);
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);
        this.background.setScale(config.width / this.background.potWidth);

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship');
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');

        this.ship1.setScale(gameSettings.eleScale);
        this.ship2.setScale(gameSettings.eleScale);
        this.ship3.setScale(gameSettings.eleScale);

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.ship1.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.ship1.body.velocity.y= _.random(...gameSettings.enemySpeedY);
        this.ship2.body.velocity.y= _.random(...gameSettings.enemySpeedY);
        this.ship3.body.velocity.y= _.random(...gameSettings.enemySpeedY);

        this.input.on('gameobjectdown', this.destroyShip, this);

        this.physics.world.setBoundsCollision();

        this.powerUps = this.physics.add.group();

        this.PowerupHelper.generatePowerups();

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
        this.player.play('thrust');
        this.player.setScale(gameSettings.eleScale * 2);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.input.on('pointerdown', this.PlayerHelper.selectPlayer, this.PlayerHelper);
        this.input.on('pointermove', this.PlayerHelper.movePlayer, this.PlayerHelper);
        this.input.on('pointerup', this.PlayerHelper.releasePlayer, this.PlayerHelper);

        this.autoShootBeam();
        this.autoEnemyShootBeam();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.player, (projectile, player) => {
            this.hurtPlayer(player, projectile);
        });

        this.physics.add.overlap(this.player, this.powerUps, this.PowerupHelper.pickPowerUp, null, this.PowerupHelper);

        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        this.beamSound = this.sound.add('audio_beam');
        this.explosionSound = this.sound.add('audio_explosion');
        this.pickupSound = this.sound.add('audio_pickup');
        this.music = this.sound.add('music');

        this.BackgroundHelper.init();
    }

    update() {
        this.moveShip(this.ship1);
        this.moveShip(this.ship2);
        this.moveShip(this.ship3);

        this.background.tilePositionY -= 0.5;

        this.PlayerHelper.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.player.active) {
                this.shootBeam();
            }
        }
        // for (let i = 0; i < this.projectiles.getChildren().length; i++) {
        //     let beam = this.projectiles.getChildren()[i];
        //     beam.update();
        // }
        // for (let beam of this.projectiles.getChildren()) {
        //     beam.update();
        // }
        this.projectiles.getChildren().forEach(beam => { beam.update() });

    }

    hurtPlayer(player, enemy) {
        if (enemy.owner === 'player') {
            return;
        }

        this.resetShipPos(enemy);
        this.shootBeamTimer.paused = true;

        // 4.3 don't hurt the player if it is invincible
        if (this.player.alpha < 1) {
            return;
        }

        // 2.2 spawn a explosion animation
        new Explosion(this, player.x, player.y);

        // 2.3 disable the player and hide it
        player.disableBody(true, true);

        // 3.1 after a time enable the player again
        this.time.addEvent({
            delay: 500,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }

    resetPlayer() {
        // 3.2 enable the player again
        let x = config.width / 2 - 8;
        let y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.level = 0;
        this.shootBeamTimer.paused = false;

        //
        // 4.1 make the player transparent to indicate invulnerability
        this.player.alpha = 0.5;
        //
        //
        // 4.2 move the ship from outside the screen to its original position
        this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function () {
                this.player.alpha = 1;
                this.shootBeamTimer.paused = false;
            },
            callbackScope: this
        });
    }

    hitEnemy(projectile, enemy) {
        this.explosionSound.play();
        // 2.1 spawn an explosion animation
        new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;

        let scoreFormated = this.BackgroundHelper.zeroPad(this.score, 6);
        this.scoreLabel.text = 'SCORE ' + scoreFormated;
    }

    autoShootBeam() {
        this.shootBeamTimer = this.time.addEvent({
            delay: gameSettings.playerShootDelay,
            callback: this.shootBeam,
            callbackScope: this,
            loop: true
        });
    }

    shootBeam() {
        switch (this.player.level) {
            case 1:
                new Beam(this);
                new Beam(this, -20);
                new Beam(this, 20);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                new Beam(this);
                new Beam(this, -20);
                new Beam(this, 20);
                new Beam(this, -40);
                new Beam(this, 40);
                break;
            default:
                new Beam(this);
                break;
        }
        this.beamSound.play();
        for(let item of this.projectiles.getChildren()) {
            if (item.owner === 'player' && item.body.velocity.y > -200) {
                item.body.velocity.y = -250;
            }
        }
    }

    autoEnemyShootBeam() {
        this.shootEnemyBeamTimer = this.time.addEvent({
            delay: gameSettings.enemyShootDelay,
            callback: this.enemyShootBeam,
            callbackScope: this,
            loop: true
        });
    }

    enemyShootBeam() {
        new EnemyBeam(this);
        this.beamSound.play();
    }

    moveShip(ship) {
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode');
    }

}

export { Scene2 };