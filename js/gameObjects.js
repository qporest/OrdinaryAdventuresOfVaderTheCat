class PIXIGameObject extends GameObject {
	constructor(sprite){
		super()
		this.sprite = sprite
		this.sprite.hitArea = this.generateHitArea()
	}

	generateHitArea(){
		console.log("Rectangle hit area")
		return new PIXI.Rectangle(0,0,this.sprite.width,this.sprite.height)
	}

	processEvt(evt){
		if(evt.type=="touch"){
			console.log("Checking touch hit box")
			let localClick = this.sprite.toLocal({x: evt.x, y:evt.y})
			let isHit = this.sprite.hitArea.contains(localClick.x, localClick.y)
			console.log(isHit)
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
	constructor(sprite, scene){
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
		this.heightOffset = 189
		this.WIDTH = 128
		this.HEIGHT = 64
		this.sprite.hitArea = this.generateHitArea()
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
					this.searchMap[neighbour.row][neighbour.col] = 1
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
		console.log("Polygon hit area")
		return new PIXI.Polygon(
			0, (this.sprite.height-this.heightOffset)/2 + this.heightOffset,
			this.sprite.width/2, 0 + this.heightOffset,
			this.sprite.width, (this.sprite.height-this.heightOffset)/2 + this.heightOffset,
			this.sprite.width/2, (this.sprite.height-this.heightOffset) + this.heightOffset
		)
	}

	processTouchEvent(evt, coord){
		coord.x -= this.sprite.width / 2
		coord.y -= this.heightOffset
		let row = Math.floor((coord.y / (this.HEIGHT/2) - coord.x / (this.WIDTH/2))/2)
		let col = Math.floor((coord.x / (this.WIDTH/2) + coord.y / (this.HEIGHT/2))/2)
		if(row>=this.map.length) row = this.map.length-1
		if(col>=this.map[0].length) col = this.map[0].length-1
		console.log(row+" "+col)
		console.log(this.getPath({row:0,col:0},{row,col}))
	}
}

class Character extends PIXIGameObject {
	constructor(sprite, scene){
		super(sprite)
		this.scene = scene
	}

	processTouchEvent(evt, coord){

	}
}