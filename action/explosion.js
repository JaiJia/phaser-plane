class Explosion extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y){
    super(scene, x, y, "explosion");
    this.setScale(gameSettings.eleScale);
    scene.add.existing(this);
    this.play("explode");
  }
}

export { Explosion };