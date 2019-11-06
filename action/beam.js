class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene, velocityX = 0) {
        let x = scene.player.x;
        let y = scene.player.y - 32;

        super(scene, x, y, 'beam');
        this.owner = 'player';
        this.setScale(2);

        scene.add.existing(this);

        this.play('beam_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = gameSettings.playerBeamSpeedY;
        this.body.velocity.x = velocityX;

        scene.projectiles.add(this);

    }


    update() {
        if (this.y < 32) {
            this.destroy();
        }
    }
}

export { Beam };