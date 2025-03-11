define(function(require) {
	const app = require("skbJet/componentManchester/standardIW/app");
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const mainGame = require("game/components/mainGame");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const shaders = require("game/template/shaders");

	require("com/gsap/TimelineLite");
	const Timeline = window.TimelineLite;

	let gameFinished = false;
	let resetCalled = false;

	function gameReset() {
		resetCalled = true;
		clearGames();

		// Fade out the win/lose terminator in case it is still playing
		if (audio.isPlaying("winTerminator")) {
			audio.fadeOut("winTerminator", 1);
		}
		if (audio.isPlaying("loseTerminator")) {
			audio.fadeOut("loseTerminator", 1);
		}

		msgBus.publish("UI.updateButtons", {
			audioOn: {visible: true, enabled: true},
			audioOff: {visible: true, enabled: true},
			info: {visible: true, enabled: true},
			back: {visible: false, enabled: false},
			buy: false,
			try: false,
			playAgain: {visible: false}
		});

		gameFlow.next("BUY_SCREEN");
	}

	//Simple latch to force waiting till the games have faded before clearing them.
	function clearGames() {
		//Check that the game has fully faded out of view, or if the game was never started(timeout), just reset
		if(!mainGame.started || (resetCalled && gameFinished)) {
			//have to force buy/try button to come back on MB
			if(!mainGame.started) {
				forceBuyToAppear();
				setTimeout(forceBuyToAppear, 5000);
				setTimeout(forceBuyToAppear, 10000); //This is overkill but there seems to be no easy way around this
			}

			mainGame.reset();
			gameFinished = false;
			resetCalled = false;

			msgBus.publish("UI.updateButtons", {
				buy: {visible: SKBeInstant.config.wagerType === "BUY", enabled: SKBeInstant.config.wagerType === "BUY"},
				try: {visible: SKBeInstant.config.wagerType === "TRY", enabled: SKBeInstant.config.wagerType === "TRY"}
			});
		}
	}

	//Seems there is no way to guarantee the order of events on a mandatory break, so we need to use timeouts to force the button to reappear
	function forceBuyToAppear() {
		if(SKBeInstant.config.wagerType === "BUY") {
			displayList.buyButton.enabled = true;
			displayList.buyButton.visible = true;
			displayList.buyButton.alpha = 1;
		} else if(SKBeInstant.config.wagerType === "TRY") {
			displayList.tryButton.enabled = true;
			displayList.tryButton.visible = true;
			displayList.tryButton.alpha = 1;
		}
	}

	msgBus.subscribe("Game.Finish", () => {
		mainGame.setActive(false);
		msgBus.publish("UI.updateButtons", {
			audioOn: false,
			audioOff: false,
			info: false,
			scratchAll: false,
			buy: false,
			try: false,
			left: false,
			right: false,
			back: false,
			scratchAllConfirm: false,
			scratchAllCancel: false,
			playAgain: false
		});
		new Timeline({
			onComplete: () => {
				app.stage.filters = [];
				gameFinished = true;
				clearGames();
			}
		})
			.to(shaders.snow.uniforms, 2, {alpha: 0})
			.to(displayList.mainGame, 1, {alpha: 0, visible: false}, 0)
			.to(displayList.titleLogo, 1, {alpha: 0}, 0)
			.to(displayList.introDiamond.scale, 0.4, {x: 1, y: 1}, 1)
			.to(displayList.purchase, 1, {alpha: 1, visible: true}, 1);
	});

	gameFlow.handle(gameReset, "GAME_RESET");
});
