let game = new VaderGame({
	debug: true,
	sprites: [
		"./img/Floor.png",
		"./img/Vader_RightFacing.png",
		"./img/Jessica.png",
		"./img/JessicaTable.png",
		"./img/RupertTable.png",
		"./img/Bar.png",
		"./img/Jukebox_Complete.png",
		"./img/Jukebox_Incomplete.png",
		"./img/Lighting.png"
	],
	sprite_mapping: {
		'./img/Floor.png': 'floor',
		'./img/Vader_RightFacing.png': 'Vader',
		'./img/Jessica.png': 'Jessica',
		'./img/JessicaTable.png': 'JessicaTable',
		'./img/RupertTable.png': 'RupertTable',
		'./img/Bar.png': 'Bar',
		'./img/Jukebox_Incomplete.png': 'Jukebox_Incomplete',
		'./img/Jukebox_Complete.png': 'Jukebox_Complete',
		'./img/Lighting.png': 'Lamps'
	}
})
game.run()