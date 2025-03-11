define((require) => {
	const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	let scenarioCounter = 0;
	let debugData = [{
		scenario: {
			prizes0: [
				1000000,
				100000,
				10000,
				10000,
				10000,
				40000,
				50000,
				60000,
				70000
			],
			win: 10000
		}
	}, {
		scenario: {
			prizes0: [
				25000000,
				100000,
				10000,
				20000,
				25000000,
				40000,
				50000,
				25000000,
				70000
			],
			win: 25000000
		}
	}, {
		scenario: {
			prizes0: [
				1000000,
				100000,
				10000,
				20000,
				30000,
				40000,
				50000,
				60000,
				70000
			],
			win: 0
		}
	}];

	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const mainGame = require("game/components/mainGame");

	function ticketAcquired() {
		if(config.mockData) {
			scenarioCounter %= debugData.length;
			mainGame.populate(debugData[scenarioCounter].scenario.prizes0);
			window.fakeMeterWin = debugData[scenarioCounter].scenario.win;
			scenarioCounter++;
		} else {
			mainGame.populate(scenarioData.scenario.prizes0);
		}

		if (!audio.isPlaying("music")) {
			audio.fadeIn("music", 0.5, true);
		}
		
		gameFlow.next("START_REVEAL");
	}

	gameFlow.handle(ticketAcquired, "TICKET_ACQUIRED");
});
