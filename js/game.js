class VaderGame extends Game {
	constructor(options={}){
		super(options)
		this.scenes = {
			preload: new InitScene()
		}
		this.changeScene("preload")
	}

	postSpriteInit(){
		console.log("Game ready to start")
		//this.changeScene("gane")
	}
}