import Scene1 from "./Scene1.js"

var config = {
  type: Phaser.WEBGL,
  width: 300,
  height: 300,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 500}
    }
  },
  
  scene: [ Scene1 ]
}

var game = new Phaser.Game(config)