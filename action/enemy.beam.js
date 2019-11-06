class EnemyBeam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const tempRandom = Math.round(Math.random() * scene.enemies.getLength());
        const tempEnemy = scene.enemies.getChildren()[tempRandom];
        if (!tempEnemy) {
            return {};
        }
        let x = tempEnemy.x;
        let y = tempEnemy.y + 16;
        // const playerX = scene.player.x;
        const playerY = scene.player.y;
        // const directionX = x > playerX ? -1 : 1;
        const directionY = y > playerY ? -1 : 1;

        super(scene, x, y, 'beam');
        this.setScale(1.5);

        scene.add.existing(this);

        this.play('enemy_beam_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = _.random(...gameSettings.enemyBeamSpeedY) * directionY;
        // this.body.velocity.x = (150 + Math.round(Math.random() * 50)) * directionX;
        this.body.velocity.x = 0;
        this.setAngle(180);

        scene.projectiles.add(this);
    }

    update() {
        if (this.y > config.height) {
            this.destroy();
        }
    }
}

export { EnemyBeam };