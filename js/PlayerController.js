class Player extends PIXIGameObject {
	constructor(sprite, scene, pos){
		super(sprite)
		this.pos = pos
		// this.character = character
		this.actionQueue = []
		this.velocity = 3
		this.currentPath = []
	}

	moveToChar(char){
		let path = this.scene.map.getPath(this.pos, pos)
		if(path == -1){
			console.log("Impossible to get to")
			return
		}
		path.pop() // just need to get 1 away from the char
		this.actionQueue.push({
			"cmd": "move",
			"path": path
		})
		this.interactWith(char)
	}

	moveTo(pos){
		let path = this.scene.map.getPath(this.pos, pos)
		if(path == -1){
			console.log("Impossible to get to")
			return
		}
		this.actionQueue.push({
			"cmd": "move",
			"path": path
		})
	}

	interactWith(char){
		this.actionQueue.push({
			"cmd": "interact",
			"character": char
		})
	}

	processTouchEvent(evt, coord){

	}

	update(dt){

	}
}