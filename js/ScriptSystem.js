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
		if("nextIf" in currentDialogue === false){
			this.currentDialogue[name] = currentDialogue["next"]
		}
		if("triggeredEvent" in currentDialogue){
			this.events[currentDialogue["triggeredEvent"]["event"]] = currentDialogue["triggeredEvent"]["value"]
			if(currentDialogue["triggeredEvent"]["event"] in this.eventListeners){
				this.eventListeners[currentDialogue["triggeredEvent"]["event"]]()
			}
		}
		return JSON.parse(JSON.stringify(exchange))
	}

	completeThreshold(name){
		if(name in this.events){
			this.events[name] = true
			if(name in this.eventListeners){
				this.eventListeners[name]()
			}
		}
	}

	constructor(scene){
		this.scene = scene
		this.events = {
			"met_jessica": false,
			"talked_to_brody": false,
			"jukebox_checked": false,
			"finish": false,
			"blame_jessica": false,
			"blame_bill": false,
			"blame_ylvis": false
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

		this.eventListeners = {
			"jukebox_checked": ()=>{
				this.scene.vader.interactWith(this.scene.jukebox)
			},
			"learn_missing_vinyl": ()=>{
				this.scene.setMusic("music/02_Mystery Song.mp3")
			},
			"check_ruperts_bag": ()=>{

			},
			"blame_jessica": ()=>{

			},
			"blame_bill": ()=>{

			},
			"blame_ylvis": ()=>{

			}
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
				},
			},
			2: {
				exchange: false,
				triggeredEvent: {
					"event": "learn_missing_vinyl",
					"value": true
				},
				next: 3	
			},
			3: {
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
		//---------------------------------------------------
		//Rupert
		this.dialogue["Rupert"] = {
			0: {
				exchange: [
					{character:"Vader", text: "Hey there Rupert! Started early tonight didn’t you?"},
					{character:"Rupert", text: "I don’t drink and fly! I swear officer! CAHOooo-OwO-oO"},
					{character:"Vader", text: "I’m not an offic...just drink some water tonight. I don’t want to have to carry you home like last time..."},
					{character:"Vader", text: "...you tend to shit your pants near cars."},
					{character:"Rupert", text: "I ALWAYS FIND MY WAY HOME CAHOooo-OwO-oO!!!!!!!"},
				],
				next: 1
			},
			1: {
				exchange: [],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}

		}
		//---------------------------------------------------
		//Brody
		this.dialogue["Brody"] = {
			0: {
				exchange: [
					{character: "Vader", text: "Hello Brody"},
					{character: "Brody", text: "Hello Vader"},
				],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
		//---------------------------------------------------
		//Vader
		this.dialogue["Vader"] = {
			0: {
				exchange: [
					{character: "Vader", text: "No need to tap me, friend."}
				],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
		//---------------------------------------------------
		//Ylvis
		this.dialogue["Ylvis"] = {
			0: {
				exchange: [
					{character: "Narrator", text:"He seems lost in his thoughts, maybe you should leave him alone for now."}
				],
				nextIf: {
					event: "jukebox_checked",
					value: true,
					next: 1
				}
			},
			1: {
				exchange: [],
				nextIf: {
					event: "finish",
					value: true,
					next: 2
				}
			}
		}
		//---------------------------------------------------
		//Narrator
		this.dialogue["Narrator"] = {
			0: {
				exchange:[
					{character:"Narrator", text:"The bar is indeed looking emptier than usual. There is one regular, who already had more than he could handle, and few of the new faces."}
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