class ScriptSystem {

	getDialogueFor(char){
		let name = char.name
		console.log("Getting exchange for "+name)
		let currentDialogue = this.dialogue[name][this.currentDialogue[name]]
		console.log(currentDialogue)
		while("nextIf" in currentDialogue){
			if(this.events[currentDialogue["nextIf"]["event"]] == currentDialogue["nextIf"]["value"]){
				this.currentDialogue[name] = currentDialogue["nextIf"]["next"]
				currentDialogue = this.dialogue[name][this.currentDialogue[name]]
			} else {
				break;
			}
		}
		let exchange = currentDialogue["exchange"]
		console.log(exchange)
		if("nextIf" in currentDialogue === false){
			this.currentDialogue[name] = currentDialogue["next"]
			if("triggeredEvent" in currentDialogue){
				this.events[currentDialogue["triggeredEvent"]["event"]] = currentDialogue["triggeredEvent"]["value"]
			}
		}
		return JSON.parse(JSON.stringify(exchange))
	}

	completeThreshold(name){
		if(name in this.events){
			this.events[name] = true
		}
	}

	constructor(){
		this.events = {
			"met_jessica": false,
			"talked_to_brody": false,
			"jukebox_checked": false,
			"finish": false
		}
		this.currentDialogue = {
			"Jessica": 0,
			"Rupert": 0,
			"Brody": 0,
			"Bill": 0,
			"Vader": 0,
			"Ylvis": 0,
			"Jukebox": 0
		}
		this.dialogue = {}
		//-------------------------------------------------
		//Bill
		this.dialogue["Bill"] = {
			0: {
				exchange: [
					{character: "Vader", text: "Hey, Bill!"},
					{character: "Bill", text: "Hey, Vader…"},
					{character: "Vader", text: "Slow night?"},
					{character: "Bill", text: "*crosses arms* might be, but that doesn’t mean I’m letting up on my bouncer duties… you’ve got your ID?"},
					{character: "Vader", text: "I’ve been coming here for my past 8 lives - don’t pull my tail! Let me get out of this rain!"},
					{character: "Bill", text: ""},
					{character: "Vader", text: "*huffs* You still look younger than a kitten, hand it over bud!"},
					{character: "Narrator", text: "You roll your eyes and hand over your ID to enter the bar."}
				],
				next: 1
			},
			1: {
				exchange: [
					{character: "Vader", "text": "I've got nothing to ask him at the moment."}
				],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
		//------------------------------------------------
		//Jessica
		this.dialogue["Jessica"] = {
			0: {
				exchange: [
					{character: "Jessica", text: "Haven’t seen you before!"},
					{character: "Vader", text: "I come here every Saturday night... just as you do."},
					{character: "Narrator", text: "You notice a pink sparkly drink in her hand with a tiny umbrella. You’ve always wondered where those came from."},
					{character: "Jessica", text: "hmm.. I wonder why I’ve never noticed you…"},
					{character: "Vader", text: "Yeah, with whiskers like this, I’m hard to miss."},
					{character: "Jessica", text: "Huh...yeah, sure."}
				],
				next: 1,
				triggeredEvent: {
					"event": "met_jessica",
					"value": true
				}
			},
			1: {
				exchange: [
					{character: "Vader", "text": "I've got nothing to ask her at the moment."}
				],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
		//--------------------------------------------------
		//Jukebox
		this.dialogue["Jukebox"] = {
			0: {
				exchange: [
					{character: "Vader", text: "First, I would like to grab a drink."}
				],
				nextIf: {
					"event": "talked_to_brody",
					"value": true,
					"next": 1
				}
			},
			1: {
				exchange: [
					{character: "Vader", text: "Hum pum pum, some good music will liven this place up."},
					{character: "Jessica", text: "Do you mind putting on a song I could dance to? What's the name of that popular one, that's played everywhere right now?"},
					{character: "Vader", text: "I know exactly which one you mean..."},
					{character: "Vader", text: "It's not here!"},
					{character: "Jessica", text: "It can't be! I was just dancing to it here yesterday!"},
					{character: "Narrator", text: "You are wondering if she stayed here since yesterday. In fact you have never not seen her here."},
					{character: "Vader", text: "I'll ask Brody about it"},
				],
				next: 2,
				triggeredEvent: {
					"event": "jukebox_checked",
					"value": true
				}
			},
			2: {
				exchange: [
					{character: "Vader", "text": "I've got to find where the song is."}
				],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
	}
}