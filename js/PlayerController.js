class Player extends Character {
	constructor(sprite, scene, pos){
		super(sprite, scene, pos)
		// this.character = character
		this.actionQueue = []
		this.velocity = 0.6
		this.currentActionData = null
		this.status = null
		this.currentAction = null
		this.processAction = {
			"move": this.moveUpdate.bind(this),
			"interact": this.interactUpdate.bind(this),
			"moveTo": this.createPath.bind(this)
		}
	}

	moveToChar(char){
		this.actionQueue.push({
			"cmd": "moveTo",
			"goal": char.interactionPoint
		})
		this.interactWith(char)
	}

	moveTo(pos){
		let path = this.scene.map.getPath(this.pos, pos)
		console.log("Path")
		console.log(JSON.stringify(path))
		if(path == -1){
			console.log("Impossible to get to")
			return
		}
		this.actionQueue.push({
			"cmd": "moveTo",
			"goal": pos
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
		if(!this.currentAction){
			if(this.actionQueue.length){
				console.log("Starting new action")
				this.currentAction = this.actionQueue.shift()
				this.processAction[this.currentAction["cmd"]](dt)
			}
		} else {
			console.log("Keeping action going")
			this.processAction[this.currentAction["cmd"]](dt)
		}
	}

	createPath(dt){
		this.currentAction["cmd"] = "move"
		this.currentAction["path"] = this.scene.map.getPath(this.pos, this.currentAction["goal"])
	}

	moveUpdate(dt){
		if(!this.status){
			console.log("No status")
			this.status = true
			if(!this.currentAction["path"].length){
				this.currentAction = null
				return
			}
			let nextPos = this.currentAction["path"].shift()
			this.currentActionData = {
				endPos: nextPos,
				start : this.coordinates,
				end: this.adjustCoordinates(this.scene.map.coordinatesForIndex(nextPos)),
				timeLeft: this.velocity
			}
			this.currentActionData.incrementX = (this.currentActionData.end.x-this.currentActionData.start.x)/this.velocity
			this.currentActionData.incrementY = (this.currentActionData.end.y-this.currentActionData.start.y)/this.velocity
		} else {
			this.currentActionData.timeLeft -= dt
			this.sprite.x += dt * this.currentActionData.incrementX
			this.sprite.y += dt * this.currentActionData.incrementY
			if(this.currentActionData.timeLeft <= 0){
				this.pos = this.currentActionData.endPos
				this.updatePosition()
				this.status = null
			}
		}
	}

	interactUpdate(dt){
		console.log("Gotta start the interaction here")
	}
}