class DialogueScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    this.app = null
    this.text = ""
    this.sprite = null
    this.textObject = null
    this.textStyle = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fill: "#4CC1EE",
      stroke: "black",
      strokeThickness: 3,
      wordWrap: true,
      wordWrapWidth: 400
    })
    this.WIDTH = 500
    this.HEIGHT = 250
  }
  init(app){
    this.app = app
    this.stage.width = this.WIDTH
    this.stage.height = this.HEIGHT
    this.stage.alpha = 0.8
    this.stage.x = this.app.canvas.width/2 - this.WIDTH/2
    this.stage.y = this.app.canvas.height/4 - this.HEIGHT/2
    this.dialogue = new PIXI.Graphics()
    this.dialogue.beginFill(0x000000)
    this.dialogue.drawRect(0, 0, this.WIDTH, this.HEIGHT)
    this.dialogue.endFill();
    this.stage.addChild(this.dialogue)
  }

  setDialogue({icon, text}){
    this.dialogue.removeChild(this.sprite)
    this.dialogue.removeChild(this.textObject)
    //set icon
    if(icon){
      this.sprite = icon
      this.sprite.x = 50
      this.sprite.width = 50
      this.sprite.y = 50
      this.sprite.y = 50
      this.dialogue.addChild(this.sprite)
    }
    this.textObject = new PIXI.Text(text, this.textStyle)
    this.textObject.x = 75
    this.textObject.y = this.HEIGHT/2 - this.textObject.height/2
    this.dialogue.addChild(this.textObject)
  }

  processEvt(evt) {
    console.log("Event in the dialogue!!!")
    this.app.popScene()
  }

}
