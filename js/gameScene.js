class GameScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    this.layers = []
    this.map = null
    this.vader = null
    this.characters = null
  }

  init(app){
    // Adding map
    this.map = new TiledFloor(app.sprites["floor"], this)
    this.stage.addChild(this.map.sprite)
    this.gameObjects.push(this.map)
    // Adding player
    this.vader = new Player(app.sprites["Vader"], this, {row:0, col:0})
    this.stage.addChild(this.vader.sprite)
    this.gameObjects.push(this.vader)
    // Character creation
    this.characters = {}
    this.characters["Jessica"] = new NPC({
      sprite:app.sprites["Jessica"], 
      scene: this, 
      pos: {row:4, col:3},
      interactionPoint: {row:4, col:4}
    })
    for(let characterName in this.characters){
      this.stage.addChild(this.characters[characterName].sprite)
      this.gameObjects.push(this.characters[characterName])
    }
    // Defining layers
    this.layers.push([this.vader, this.characters["Jessica"]])
    this.layers.push([this.map])
    console.log("GameScene")
  }

  render() {
    // console.log("I was rendered")
  }

  processEvt(evt) {
    if(evt.type=="touch"){
      let processed = false
      for(let layer of this.layers){
        let in_layer = false 
        for(let obj of layer){
          in_layer = obj.processEvt(evt)
          if(in_layer){processed = true}
        }
        if(processed){ break }
      }
    } else {
      super.processEvt(evt)
    }
  }

}