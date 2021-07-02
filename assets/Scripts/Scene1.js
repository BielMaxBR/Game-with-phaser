import Keys from "./defKeys.js"

export default class Scene1 extends Phaser.Scene {
  construct() {
    //super({key: "Scene1"})
  }
  
  preload() {
    this.load.spritesheet("player", "assets/Images/spritesheet player.png", {
      frameWidth: 200,
      frameHeight: 320
    })
  }
  
  create() {
    this.player = this.add.sprite(150, 150, "player")
    
    this.player.setScale(0.2, 0.2)
    
    this.keyClass = new Keys()
    
    console.log()
  }
  
  update(delta) {
    this.walk()
  }
  
  walk() {
    if(this.keyClass.a.isDown) {
      console.log("Letra a apertada")
    }
  }
}