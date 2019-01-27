class PIXIGameObject extends GameObject {
	constructor(sprite){
		super()
		this.sprite = sprite
	}

	processEvt(evt){
		if(evt.type=="touch"){
			let localClick = this.sprite.toLocal({x: evt.x, y:evt.y})
			let isHit = this.sprite.hitArea.contains(localClick.x, localClick.y)
			if(!isHit){ 
				return false 
			}
			this.processTouchEvent(evt, localClick)
			return true
		} else {
			this.processNonTouchEvent(evt)
		}
	}

	processTouchEvent(evt, localClick){

	}

	processNonTouchEvent(evt){

	}
}

class TiledFloor extends PIXIGameObject {
	/*
	Tiled Floor is symmetrical, with walls around it. Only floor is clickable.
	*/
	constructor(sprite, scene, heightOffset=0){
		super(sprite)
		this.map = [
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]
		]
		this.scene = scene
		this.heightOffset = heightOffset
		// this.heightOffset = 189
		this.sprite.hitArea = this.generateHitArea()
		this.WIDTH = 128
		this.HEIGHT = 64
	}

	getPath(start, end){
		this.searchMap = JSON.parse(JSON.stringify(this.map))
		this.searchMap[start.row][start.col] = 1
		this.searchMap[end.row][end.col] = 0
		let queue = [[start]]
		let found = false
		while(queue.length>0){
			let cur = queue.shift()
			if(cur[cur.length-1].col==end.col && cur[cur.length-1].row == end.row){
				return cur
			}
			for(let neighbour of this.getNeighbourCoordinates(cur[cur.length-1])){
				if(this.searchMap[neighbour.row][neighbour.col] == 0){
					let nxt = cur.slice()
					nxt.push(neighbour)
					queue.push(nxt)
				}
			}
		}
		return -1
	}

	getNeighbourCoordinates(point){
		let ans = []
		if(point.row+1<this.map.length)ans.push({row:point.row+1, col: point.col})
		if(point.col+1<this.map[0].length)ans.push({row:point.row, col: point.col+1})
		if(point.row-1>=0)ans.push({row:point.row-1, col: point.col})
		if(point.col-1>=0)ans.push({row:point.row, col: point.col-1})
		return ans
	}

	generateHitArea(){
		return new PIXI.Polygon(
			0, this.sprite.height/2 + this.heightOffset,
			this.sprite.width/2, 0 + this.heightOffset,
			this.sprite.width, this.sprite.height/2 + this.heightOffset,
			this.sprite.width/2, this.sprite.height + this.heightOffset
		)
	}

	processTouchEvent(evt, coord){
		coord.x -= this.sprite.width / 2
		coord.y -= this.heightOffset
		console.log(coord.x+" "+coord.y)
		let row = Math.floor((coord.y / (this.HEIGHT/2) - coord.x / (this.WIDTH/2))/2)
		let col = Math.floor((coord.x / (this.WIDTH/2) + coord.y / (this.HEIGHT/2))/2)
		console.log(row+" "+col)
	}
}