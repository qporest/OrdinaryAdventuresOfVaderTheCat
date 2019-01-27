class GameScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    this.layers = []
    this.map = null
    this.characters = null
  }

  init(app){
    // Adding map
    this.map = new TiledFloor(app.sprites["floor"], this)
    this.vader = new Player(app.sprites["Vader"], this, {row:0, col:0})
    this.stage.addChild(this.map.sprite)
    this.stage.addChild(this.vader.sprite)
    this.gameObjects.push(this.vader)
    this.layers.push([this.vader])
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