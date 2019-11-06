export class PlayerHelper {
    constructor(scope) {
        this.__this = scope;
    }

    selectPlayer(pointer) {
        const playerX = this.__this.player.x;
        const playerY = this.__this.player.y;
        if (this.__this.player.body.enable &&
            (pointer.x >= playerX && pointer.x <= playerX + 32) ||
            (pointer.y >= playerY && pointer.y <= playerY + 48)) {
            this.__this.isPlayerSelected = true;
        } else {
            this.__this.isPlayerSelected = false;
        }
    }

    movePlayer(pointer) {
        if (this.__this.isPlayerSelected && this.__this.player.body.enable) {
            this.__this.player.x = pointer.x;
            this.__this.player.y = pointer.y;
        } else {
            this.__this.isPlayerSelected = false;
        }
    }

    releasePlayer() {
        this.__this.isPlayerSelected = false;
    }

    movePlayerManager() {
        this.__this.player.setVelocity(0);

        if (this.__this.cursorKeys.left.isDown) {
            this.__this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.__this.cursorKeys.right.isDown) {
            this.__this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.__this.cursorKeys.up.isDown) {
            this.__this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.__this.cursorKeys.down.isDown) {
            this.__this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }
}