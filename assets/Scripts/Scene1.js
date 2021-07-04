export default class Scene1 extends Phaser.Scene {
  construct() {
    //super({key: "Scene1"})
  }

  preload() {
    this.load.spritesheet("player", "assets/Images/spritesheet player.png", {
      frameWidth: 185,
      frameHeight: 320
    })

    this.load.image("brick", "assets/Images/bricks.png")
  }

  create() {
    this.dash = 0


    this.player = this.physics.add.sprite(150, 150, "player")
    this.player.setCollideWorldBounds(true)
    this.player.setScale(0.2, 0.2)

    this.brick = this.physics.add.image(150, 300, "brick")

    this.arrayBlocks = []
    this.arrayBlocks.push(this.brick)

    for (let x = 0; x < this.arrayBlocks.length; x++) {
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
    this.walk()
  }

  walk() {
    this.speed = 0
    this.player.setVelocityX(0)

    if (this.keys.a.isDown) {
      this.player.flipX = true

      if (this.canExeAnim) {
        this.player.play("walk", true)
      }

      this.speed = -100
    }

    if (this.keys.d.isDown) {
      this.player.flipX = false

      if (this.canExeAnim) {
        this.player.play("walk", true)
      }

      this.speed = 100
    }

    if (this.keys.a.isUp && this.keys.d.isUp) {

      this.speed = 0

      if (this.canExeAnim) {
        this.player.play("default", true)
      }
    }


    if (this.keys.e.isDown && !this.bool) {

      this.bool = true

      this.player.play("dash", true)


      if (this.player.flipX == true) {
        this.dash = -400
      }
      else {
        this.dash = 400
      }

      this.time.addEvent({
        delay: 150,
        callback: () => {
          this.dash = 0
        },
        callbackScope: this,
        loop: false
      })

      this.time.addEvent({
        delay: 3000,
        callback: function() {
          this.bool = false
        },
        callbackScope: this,
        loop: false
      })
    }
    
    this.player.body.setVelocityX(this.dash != 0 ? this.dash : this.speed)

  }

  jump() {
    if (this.keys.space.isDown) {
      if (this.keys.e.isUp) {
        this.player.body.setVelocityY(200 * -1)

        this.player.play("jump", true)

        this.canExeAnim = false
      }
    }
  }

  keys() {
    this.keys = {
      a: this.input.keyboard.addKey("A"),

      d: this.input.keyboard.addKey("D"),

      space: this.input.keyboard.addKey("SPACE"),

      e: this.input.keyboard.addKey("E")
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

    this.anims.create({
      key: "dash",
      frames: this.anims.generateFrameNumbers("player", {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: 0,
      hideOnComplete: false
    })
  }

  colisionChecker() {
    for (let x = 0; x < this.arrayBlocks.length; x++) {
      this.physics.add.collider(this.player, this.arrayBlocks[x], this.jump, function() {
        this.canExeAnim = true
      }, this)
    }
  }
}