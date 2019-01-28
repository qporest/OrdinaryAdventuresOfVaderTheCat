let game = new VaderGame({
	debug: true,
	sprites: [
		"./img/Jessica.png",
		"./img/Bill.png",
		"./img/Rupert.png",
		"./img/Ylvis.png",
		"./img/Brody.png",
		"./img/Floor.png",
		"./img/Vader_RightFacing.png",
		"./img/JessicaTable.png",
		"./img/RupertTable.png",
		"./img/Bar.png",
		"./img/Jukebox_Complete.png",
		"./img/Jukebox_Incomplete.png",
		"./img/Lighting.png",
		"./img/icons/Vader.png",
		"./img/icons/Bill.png",
		"./img/icons/Narrator.png"
	],
	sprite_mapping: {
		'./img/Floor.png': 'floor',
		'./img/Vader_RightFacing.png': 'Vader',
		'./img/Jessica.png': 'Jessica',
		'./img/Rupert.png': 'Rupert',
		'./img/Ylvis.png': 'Ylvis',
		'./img/Bill.png': 'Bill',
		'./img/Brody.png': 'Brody',
		'./img/JessicaTable.png': 'JessicaTable',
		'./img/RupertTable.png': 'RupertTable',
		'./img/Bar.png': 'Bar',
		'./img/Jukebox_Incomplete.png': 'Jukebox_Incomplete',
		'./img/Jukebox_Complete.png': 'Jukebox_Complete',
		'./img/Lighting.png': 'Lamps',
		'./img/icons/Vader.png': 'VaderIcon',
		'./img/icons/Bill.png': 'BillIcon',
		'./img/icons/Narrator.png': 'NarratorIcon'
	}
})
game.run()