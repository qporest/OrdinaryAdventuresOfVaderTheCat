let game = new VaderGame({
	debug: true,
	sprites: [
		"./img/Floor.png"
	],
	sprite_mapping: {
		'./img/Floor.png': 'floor'
	}
})
game.run()