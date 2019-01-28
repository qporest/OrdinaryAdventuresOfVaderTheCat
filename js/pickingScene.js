class PickingScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    this.app = null
    this.text = ""
    this.sprite = null
    this.textObject = null
    this.WIDTH = 600
    this.HEIGHT = 250
  }
  init(app, parentScene){
    this.app = app
    this.parentScene = parentScene
    this.stage.width = this.WIDTH
    this.stage.height = this.HEIGHT
    this.stage.alpha = 0.8
    this.stage.x = this.app.canvas.width/2 - this.WIDTH/2
    this.stage.y = this.app.canvas.height/4 - this.HEIGHT/2
    this.container = new PIXI.Graphics()
    this.container.beginFill(0x000000)
    this.container.drawRect(0, 0, this.WIDTH, this.HEIGHT)
    this.container.endFill();

    this.jessicaContainer = new PIXI.Container()
    this.jessicaContainer.x = 10
    this.jessicaContainer.y = 50
    this.jessicaContainer.height = 150
    this.jessicaContainer.width = 180
    let jessicaDrawing = new PIXI.Graphics()
    jessicaDrawing.beginFill(0x000000)
    jessicaDrawing.drawRect(0, 0, 180, 150)
    jessicaDrawing.endFill()
    this.jessicaContainer.addChild(jessicaDrawing)
    this.addTextToContainer("Jessica", this.jessicaContainer)
    this.container.addChild(this.jessicaContainer)

    this.billContainer = new PIXI.Container()
    this.billContainer.x = 210
    this.billContainer.y = 50
    this.billContainer.height = 150
    this.billContainer.width = 180
    let billDrawing = new PIXI.Graphics()
    billDrawing.beginFill(0x000000)
    billDrawing.drawRect(0, 0, 180, 150)
    billDrawing.endFill()
    this.billContainer.addChild(billDrawing)
    this.addTextToContainer("Bill", this.billContainer)
    this.container.addChild(this.billContainer)

    this.ylvisContainer = new PIXI.Container()
    this.ylvisContainer.x = 410
    this.ylvisContainer.y = 50
    this.ylvisContainer.height = 150
    this.ylvisContainer.width = 180
    let ylvisDrawing = new PIXI.Graphics()
    ylvisDrawing.beginFill(0x000000)
    ylvisDrawing.drawRect(0, 0, 180, 150)
    ylvisDrawing.endFill()
    this.ylvisContainer.addChild(ylvisDrawing)
    this.addTextToContainer("Ylvis", this.ylvisContainer)
    this.container.addChild(this.ylvisContainer)

    this.stage.addChild(this.container)
  }

  addTextToContainer(text, container){
    let textStyle = new PIXI.TextStyle({
      fontFamily: "arcade",
      fontSize: 20,
      fill: "#DDDCD6",
      stroke: "black",
      strokeThickness: 0,
      wordWrap: true,
      wordWrapWidth: 400
    })
    let textObject = new PIXI.Text(text, textStyle)
    textObject.x = container.width/2 - textObject.width/2
    textObject.y = container.height/2 - textObject.height/2
    container.addChild(textObject)
  }

  clickIn(pos, container){
    if(pos.x >= container.x && pos.x <= container.x+container.width){
      if(pos.y >= container.y && pos.y <= container.y + container.height){
        return true
      }
    }
    return false
  }

  processEvt(evt) {
    if(evt.type=="touch"){
      let localClick = this.stage.toLocal({x: evt.x, y:evt.y})
      if(this.clickIn(localClick, this.jessicaContainer)){
        this.parentScene.blameCharacter("Jessica")
        this.exit()
      } else if(this.clickIn(localClick, this.billContainer)){
        this.parentScene.blameCharacter("Bill")
        this.exit()
      } else if(this.clickIn(localClick, this.ylvisContainer)){
        this.parentScene.blameCharacter("Ylvis")
        this.exit()
      }
    }
  }

  exit(){
    this.app.popScene()
  }

}
