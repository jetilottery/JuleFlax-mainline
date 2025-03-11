define((require) => {
	const prizeData = require("skbJet/componentManchester/standardIW/prizeData");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

	return function scenarioTransform(scenarioString) {
		msgBus.publish("Game.started", scenarioString);
		
		// example sstring: "GJGJAIAFF"
		let game0, prizes0;
		game0 = scenarioString.split('');
		prizes0 = game0.map(elem => prizeData.prizeTable[elem]);
		
		return {
			prizes0: prizes0
		};
	};
});
