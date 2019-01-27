class InitScene extends Scene {
  constructor(obj = {
    UI: [],
    gameObjects: []
  }) {
    super(obj)
    
  }

  init(){
    console.log("Init scene")
  }

  update(dt) {
    // console.log("Init was updated")
  }

  render() {
    // console.log("I was rendered")
  }
}
