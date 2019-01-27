let game = new VaderGame({
	debug: true,
	sprites: [
		"./img/Floor.png",
		"./img/char_placeholder.png",
		"./img/Jessica.png",
		"./img/JessicaTable.png",
		"./img/RupertTable.png",
		"./img/Bar.png",
		"./img/Lighting.png"
	],
	sprite_mapping: {
		'./img/Floor.png': 'floor',
		'./img/char_placeholder.png': 'Vader',
		'./img/Jessica.png': 'Jessica',
		'./img/JessicaTable.png': 'JessicaTable',
		'./img/RupertTable.png': 'RupertTable',
		'./img/Bar.png': 'Bar',
		'./img/Lighting.png': 'Lamps'
	}
})
game.run()