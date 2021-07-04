export default class Scene1 extends Phaser.Scene {
  construct() {
    //super({key: "Scene1"})
  }

  preload() {
    this.load.spritesheet("player", "assets/Images/spritesheet player.png", {
      frameWidth: 176,
      frameHeight: 320
    })
    
    this.load.image("brick", "assets/Images/bricks.png")
  }

  create() {
    this.player = this.physics.add.sprite(150, 150, "player")

    this.player.setScale(0.2, 0.2)
    
    this.brick = this.physics.add.image(150, 300, "brick")
    
    this.arrayBlocks = []
    this.arrayBlocks.push(this.brick)
    
    for(let x = 0; x < this.arrayBlocks.length; x++) {
      this.block = this.arrayBlocks[x]
      this.block.setScale(0.5, 0.1)
      this.block.body.allowGravity = false
      this.block.body.setImmovable(true)
    }
    
    this.keys()
    this.animCreator()
    this.colisionChecker()
  }

  update() {
    this.walk(2)
  }

  walk(speed) {
    if(this.keys.a.isDown) {
      this.player.flipX = true
      if(this.canExeAnim) {
        this.player.play("walk", true)
      }
      this.player.x -= speed
    }
    
    if(this.keys.d.isDown) {
      this.player.flipX = false
      if(this.canExeAnim) {
        this.player.play("walk", true)
      }
      this.player.x += speed
    }
    
    if(this.keys.a.isUp == this.keys.d.isUp == true) {
      
      if(this.canExeAnim) {
        this.player.play("default", true)
      }
    }
  }
  
  jump() {
    if(this.keys.space.isDown) {
      this.player.body.setVelocityY(200 * -1)
      
      this.player.play("jump", true)
      
      this.canExeAnim = false
    }
  }
  
  keys() {
    this.keys = {
      a: this.input.keyboard.addKey("A"),
      d: this.input.keyboard.addKey("D"),
      space: this.input.keyboard.addKey("SPACE")
    }
  }
  
  animCreator() {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: 0,
      hideOnComplete: false
    })
    
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        start: 4,
        end: 4
      }),
      frameRate: 1,
      repeat: -1,
    })
    
    this.anims.create({
      key: "default",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0,
      hideOnComplete: false
    })
  }
  
  colisionChecker() {
    for(let x = 0; x < this.arrayBlocks.length; x++) {
      this.physics.add.collider(this.player, this.arrayBlocks[x], this.jump, function() {
        this.canExeAnim = true
      }, this)
    }
  }
}