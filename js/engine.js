// frame used for scheduling canvas update
let frame

// used for game loop control
let last,
  step = 1 / 60,
  dt = 0

class Game {

  constructor(options = {}) {
    last = performance.now()
    frame = (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    )

    this.sprites = {}

    this.scene = []
    this.currentScene = null

    this.eventBuffer = []

    this.DEFAULT_WIDTH = 640
    this.DEFAULT_HEIGHT = 480
    this.debug = false

    this.app = null
    this.stage = null

    this.setUpCanvas(options)
    this.loadSprites(options)
      // set up the keyboard listener
    document.addEventListener('keyup', this.processEvt.bind(this))
  }

  initSpritePromise(src, name) {
    let self = this
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => {
        if(!self.sprites[name]) self.sprites[name] = []
        self.sprites[name].push(new Sprite(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height
        }))
        console.log("Resolved")
        resolve()
      }
      img.onerror = reject
      img.src = src
    })
  }

  loadSprites(options){
    console.log("I will load sprites here later")
    this.postSpriteInit()
  }

  /**
   * Specifically sets up canvas from the given options
   */
  setUpCanvas(options) {
    if (options.resolution){
      this.app = new PIXI.Application({
        width: options.resolution.width,
        height: options.resolution.height,
        antialias: true
      })
    } else {
      this.app = new PIXI.Application({
        width: this.DEFAULT_WIDTH,
        height: this.DEFAULT_HEIGHT,
        antialias: true
      })
    }
    this.canvas = this.app.view
    document.body.appendChild(this.app.view)
  }

  /* Gets overridden. Called after the sprites are loaded.
  */
  postSpriteInit(){
    console.log("Sprites loaded.")
  }

  /* Changes game scene to a given, clears the stack.
   * @param {Number} scene - scene to change to
   */
  changeScene(scene) {
    this.scene.length = 0
    if (this.debug > 2) {
      console.log("Changing scene to " + scene.toString())
    }
    this.pushScene(this.scenes[scene])
    this.currentScene.init()
  }

  pushScene(scene){
    console.log("Scene pushed")
    this.scene.push(scene)
    this.currentScene = this.scene[this.scene.length - 1]
    console.log("Changed current scene")
  }

  popScene(){
    console.log("Scene popped")
    let latest = this.scene.pop()
    this.currentScene = this.scene[this.scene.length - 1]
    return latest
  }

  /* Starts the game loop */
  run() {
    this.canvas.focus()
    frame(this.update.bind(this))
  }

  processEvt(evt) {
    this.eventBuffer.push(evt)
  }

  /* The game loop.
   * Checks the events and updates the scene based on them.
   * Attempts to keep a constant fps.
   * Renders the current scene.
   */
  update(now) {
    // process all the events recorded
    for (let event of this.eventBuffer) {
      this.currentScene.processEvt(event)
    }
    this.eventBuffer.length = 0
      // process frame at given fps
      // if there is a need to catch up on update logic
    dt += Math.min(1, (now - last) / 1000)
    while (dt > step) {
      dt -= step
      this.updateScene(step)
    }
    last = now
    this.render() // render the result
    frame(this.update.bind(this)) // schedule next update
  }

  updateScene(dt) {
    // the current scene update should be called here
    if (this.debug) {
      console.log("Updating: [" + dt.toFixed(10) + "] " + this.scene)
    }
    this.currentScene.update(dt)
  }

  render() {
    if (this.debug) {
      console.log("Rendering")
    }
    this.currentScene.render(this.app)
      // the render is called here
  }
}

class Scene {
  constructor({
    UI,
    gameObjects
  }) {
    this.UI = UI
    this.gameObjects = gameObjects
  }

  /**
   * @param {Number} dt - update time
   */
  update(dt) {
      //updates components that depend on time and goes through the event buffer
      for (let obj of this.gameObjects) {
        obj.update(dt)
      }
    }
    /**
     * @param {context2D} ctx - ctx to render on
     */
  render(ctx) {
    console.log("We render stuff here")
  }

  processEvt(evt) {
    for (let obj of this.gameObjects) {
      obj.processEvt(evt)
    }
    for (let obj of this.UI) {
      obj.processEvt(evt)
    }
  }

  init() {
    console.log("Initializing scene")
  }
}

// essentially an interface
class GameObject {
  constructor(){
    this._toDelete = true
  }

  // draws object
  render(ctx) {
  }
    // updates it
  update(dt) {
  }

  //processes events
  processEvt(evt){
  }

  // whether it still should be on the screen
  get toDelete() {
    return this._toDelete
  }

  set toDelete(value) {
    this._toDelete = value
  }
}

class Sprite {
  constructor(img, {
    x,
    y,
    width,
    height
  }) {
    this.img = img
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw(ctx, x, y) {
    ctx.drawImage(this.img, this.x, this.y, this.width,
      this.height, x, y, this.width, this.height)
  }
}