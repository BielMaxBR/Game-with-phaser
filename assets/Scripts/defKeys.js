import Scene1 from "./Scene1.js"

export default class keys extends Phaser.Input.Keyboard.KeyboardPlugin {
  constructor() {
    super(Scene1)
  }
  
  create() {
    this.keys = new KeyboardPlugin(Scene1)
    
    this.a = this.keys.addKey("A")
  }
  
  update() {
    
  }
}