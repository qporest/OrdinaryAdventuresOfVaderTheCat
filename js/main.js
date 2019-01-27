let game = new VaderGame({
	debug: true,
	sprites: [
		"./img/Floor.png",
		"./img/char_placeholder.png",
		"./img/Jessica.png"
	],
	sprite_mapping: {
		'./img/Floor.png': 'floor',
		'./img/char_placeholder.png': 'Vader',
		'./img/Jessica.png': 'Jessica'
	}
})
game.run()