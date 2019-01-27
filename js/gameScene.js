class GameScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    this.layers = []
    this.ground = null
    this.characters = null
  }

  init(app){
    // Adding ground
    this.ground = new TiledFloor(app.sprites["floor"], this)
    this.stage.addChild(this.ground.sprite)
    this.layers.push([this.ground])
    console.log("GameScene")
  }

  update(dt) {
    // console.log("Init was updated")
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