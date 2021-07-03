export default class keys extends Phaser.Input.Keyboard.KeyboardPlugin {
  constructor(scene) {
    super(scene)
    this.a = this.keys.addKey("A")
  }
}