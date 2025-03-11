define(function(require) {
	const PIXI = require("com/pixijs/pixi");
	const app = require("skbJet/componentManchester/standardIW/app");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	//const utils = require("skbJet/componentManchester/standardIW/layout/utils");
	const CatmullRom = require("skbJet/componentLondon/utils/CatmullRom");
	const isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");

	const ScratchSymbol = require("game/components/ScratchSymbol");
	const mainGame = require("game/components/mainGame");
	const revealAll = require("game/revealAll");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const resources = require("skbJet/component/resourceLoader/resourceLib");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const meterData = require('skbJet/componentManchester/standardIW/meterData');
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const shaders = require("game/template/shaders");


	require("com/gsap/TweenMax");
	require("com/gsap/TimelineLite");
	require("com/gsap/easing/CustomEase");

	const Tween = window.TweenMax;
	const Timeline = window.TimelineLite;
	//const Ease = window.CustomEase;

	//Ski routes
	let controlPoints = [
		[ new PIXI.Point(366.00,49.00), new PIXI.Point(391.50,62.00), new PIXI.Point(381.50,72.50), new PIXI.Point(342.50,67.00), new PIXI.Point(325.00,74.50), new PIXI.Point(322.00,104.00), new PIXI.Point(309.50,108.00), new PIXI.Point(287.50,112.50), new PIXI.Point(275.00,119.00), new PIXI.Point(248.00,123.00), new PIXI.Point(237.00,130.50), new PIXI.Point(217.00,137.50), new PIXI.Point(202.50,138.50), new PIXI.Point(179.00,139.00), new PIXI.Point(152.50,135.00), new PIXI.Point(149.50,127.50) ],
		[ new PIXI.Point(372.00,52.67), new PIXI.Point(388.00,66.33), new PIXI.Point(360.00,65.00), new PIXI.Point(369.67,78.67), new PIXI.Point(337.67,72.67), new PIXI.Point(349.67,86.00), new PIXI.Point(317.00,79.67), new PIXI.Point(326.33,93.00), new PIXI.Point(290.33,86.67), new PIXI.Point(304.00,98.33), new PIXI.Point(268.00,93.67), new PIXI.Point(276.33,103.67), new PIXI.Point(225.00,109.00), new PIXI.Point(232.00,119.50), new PIXI.Point(184.00,126.00), new PIXI.Point(160.50,122.00) ],
		[ new PIXI.Point(371.00,48.50), new PIXI.Point(395.50,60.00), new PIXI.Point(360.00,63.50), new PIXI.Point(369.00,77.50), new PIXI.Point(357.00,84.50), new PIXI.Point(349.86,88.32), new PIXI.Point(339.00,98.50), new PIXI.Point(326.50,101.00), new PIXI.Point(303.50,85.00), new PIXI.Point(273.50,92.00), new PIXI.Point(278.00,104.00), new PIXI.Point(206.50,126.00), new PIXI.Point(174.50,128.50), new PIXI.Point(160.50,123.00) ]
	];
	let skiRoutes = controlPoints.map(elem => new CatmullRom(elem, 0.5, 50, false));
	let skierTween;
	let skierCount = 0;
	function tinySkier() {
		let skier = {
			sprite: new PIXI.Graphics(),
			progress: 0,
			route: skiRoutes[Math.floor(Math.random() * skiRoutes.length)]
		};
		displayList.tinySkiers.addChild(skier.sprite);
		skier.sprite.beginFill(skierCount % 10 ? 0x000000 : 0xFF0000); // Every 10th skier is an instructor (red guy)
		skier.sprite.drawCircle(0, 0, 2);

		Tween.fromTo(
			skier,
			7 + Math.random(),
			{progress: 0},
			{
				delay: Math.random(),
				progress: 1,
				ease: "Linear.easeNone",
				onUpdate: () => {
					let pos = skier.route.getPosition(skier.progress);
					skier.sprite.x = pos.x; skier.sprite.y = pos.y;
				},
				onComplete: () => {
					displayList.tinySkiers.removeChild(skier.sprite);
				}
			}
		);
		skierTween.play(0);
		skierCount++;
	}

	function intro() {
		skierTween = Tween.to({}, 2, {
			onComplete: tinySkier
		});

		let l = !isMobileOrTablet;
		window.tinySkier = tinySkier; //Just for fun


		displayList.snow.filters = [shaders.snow];
		displayList.snow.width = displayList.background.width;
		displayList.snow.height = displayList.background.height;

		new Timeline({
			onComplete: () => {
				//Check if the FPS is holding up
				if(PIXI.ticker.shared.FPS < 20) {
					//bad FPS, fade out the snow to cheer it up
					Tween.to(shaders.snow.uniforms, 2, {alpha: 0, onComplete: () => {
						app.stage.filters = [];
					}});
				}

				displayList.brushButton.interactive = true;
				mainGame.setActive(true);
				ScratchSymbol.enableIdle();
				msgBus.publish("UI.updateButtons", {
					audioOn: {visible: true, enabled: true},
					audioOff: {visible: true, enabled: true},
					info: {visible: true, enabled: true},
					scratchAll: {visible: true, enabled: true},
					buy: false,
					try: false,
					left: false,
					right: false,
					back: false,
					hint: false,
					scratchAllConfirm: false,
					scratchAllCancel: false,
					playAgain: false,
					gamePips: false
				});
			}
		})
			.to(displayList.buyButton, 0.1, {alpha: 0}, 0)
			.to(displayList.tryButton, 0.1, {alpha: 0}, 0)
			//.fromTo(displayList.introSnow, 3.1, {alpha: 1, y: 0}, {alpha: 1, y: 800, ease: "Linear.easeNone"}, 0)
			.fromTo(shaders.snow.uniforms, 2, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 0)
			.to(displayList.introDiamond.scale, 0.4, {x: 1.9, y: 1.8, ease: "Linear.easeNone"}, 3.1)
			.to(displayList.purchase, 0.4, {alpha: 0, ease: "Linear.easeNone"}, 3.1)
			//.to(displayList.introSnow, 0.4, {alpha: 0, ease: "Linear.easeNone"}, 3.1)
			.fromTo(displayList.introTitle, 0.25, {alpha: 0, x: (l ? 720 : 450), y: (l ? 243 : 519)}, {alpha: 1, ease: "Linear.easeNone"}, 3.1)
			.fromTo(displayList.introTitle.scale, 0.25, {x: 1.9, y: 1.9}, {x: 1, y: 1, ease: "Linear.easeNone"}, 3.1)
			.to(displayList.introTitle, 0.4167, {x: (l ? 1240 : 608), y: (l ? 138 : 340), ease: "Linear.easeNone"}, 3.9167)
			.to(displayList.introTitle.scale, 0.4167, {x: (l ? 0.66 : 1), y: (l ? 0.66 : 1), ease: "Linear.easeNone"}, 3.9167)
			.to(displayList.titleLogo, 0, {alpha: 1, ease: "Linear.easeNone"}, 4.5)
			.to(displayList.introTitle, 0, {alpha: 0, ease: "Linear.easeNone"}, 4.5)
			.to(displayList.mainGame, 0, {alpha: 1, visible: true, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile0, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 180, y: -220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile1, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 450, y: -220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile2, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 720, y: -220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile3, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 180, y: -2, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile4, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 450, y: -2, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile5, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 720, y: -2, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile6, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 180, y: 220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile7, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 450, y: 220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTile8, 0.5, {alpha: 0, x: 450, y: -2}, {alpha: 1, x: 720, y: 220, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.mainGameTagLine, 0.6, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 6.0833);

	}
	msgBus.subscribe("Game.Intro", intro);

	async function startReveal() {
		// Listen for autoplay activation which triggers the remaining cards to reveal automatically
		msgBus.subscribe("Game.AutoPlayStart", revealAll.start);

		// Listen for autoplay deactivation which cancels the revealAll timeline
		msgBus.subscribe("Game.AutoPlayStop", revealAll.stop);

		msgBus.publish("Game.Intro");

		// Enable all of the winning numbers and player numbers, wait until they are all revealed
		await Promise.all([...mainGame.enable()]);
		/*if(autoPlay.enabled && gameConfig.autoPlaySingleSound) {
			msgBus.publish("singlePrizeReveal.reveal", revealAll);
			await singlePrizeReveal.complete;
		}*/

		ScratchSymbol.disableIdle();

		msgBus.publish("UI.updateButtons", {
			audioOn: {visible: true, enabled: true},
			audioOff: {visible: true, enabled: true},
			info: {visible: true, enabled: true},
			back: {enabled: false},
			scratchAll: {enabled: false}
		});
		displayList.brushButton.interactive = false;
		Tween.to(displayList.brushButton, 0.25, {alpha: 0});


		if(config.mockData) {
			meterData.win = meterData.totalWin;
		}

		gameFlow.next("REVEAL_COMPLETE");
	}

	msgBus.subscribe("MeterData.Balance", (data) => {
		displayList.balanceMeterNT.text = resources.i18n.game.Game.balanceMeter + SKBeInstant.formatCurrency(data).formattedAmount;
	});

	gameFlow.handle(startReveal, "START_REVEAL");
});
