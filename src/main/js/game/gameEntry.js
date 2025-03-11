define(function (require) {
	const PIXI = require("com/pixijs/pixi");
	window.PIXI = PIXI;

	//PIXI.settings.MIPMAP_TEXTURES = false; //stops ugly border lines appearing on scaled/rotated images

	require("polyfill");
	const app = require("skbJet/componentManchester/standardIW/app");
	const layout = require("skbJet/componentManchester/standardIW/layout");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const textStyles = require("skbJet/componentManchester/standardIW/textStyles");
	const gameSize = require("skbJet/componentManchester/standardIW/gameSize");
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	//const documents = require("skbJet/componentManchester/standardIW/documents");
	const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
	const loadController = require("skbJet/componentManchester/standardIW/loadController");
	const spineSubLoader = 	require("skbJet/componentManchester/spineLoader/SpineSubLoader");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

    //const prizestructureTransform = require("game/prizestructureTransform");
	//const prizetableTransform = require("game/prizetableTransform");
	const scenarioTransform = require("game/scenarioTransform");

	const layoutEngine = require("skbJet/componentManchester/standardIW/layout/engine");
	const orientation = require("skbJet/componentManchester/standardIW/orientation");
	const isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");

	const templateLayout = require("game/template/layout");
	const templateConfig = require("game/template/config");
	const templateAudioMap = require("game/template/audioMap");
	const templateTextStyles = require("game/template/textStyles");
	const gameConfig = require("game/custom/config");
	const gameAudioMap = require("game/custom/audioMap");
	const gameLayout = require("game/custom/layout");
	const gameTextStyles = require("game/custom/textStyles");

	const dimensions = require("game/template/dimensions");
	const windowSize = require('skbJet/component/deviceCompatibility/windowSize');
	const animationView = require("game/components/animation/animationView");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");

	// Require IW component templates
	let buttonBar = require("skbJet/componentLondon/customIW/ui/buttonSet/template");
	let errorPlaque = require("skbJet/componentManchester/standardIW/ui/errorPlaque/template");
	let ticketSelectBar = require("skbJet/componentManchester/standardIW/ui/ticketSelectBar/template");
	let footer = require("skbJet/componentManchester/standardIW/ui/footer/template");
	let networkActivity = require("skbJet/componentLondon/customIW/ui/networkActivity/template");
	let scratchBrush = require("skbJet/componentLondon/customIW/scratchBrush/template");
	
	// Require all game specific components that need initializing
	let resultPlaques = require("game/components/resultPlaques/template");
	let infoPage = require("game/components/infoPage/template");
	let mainGame = require("game/components/mainGame");
	let shaders = require("game/template/shaders");

	// Require game side state handlers.
	require("game/ticketAcquired");
	require("game/startReveal");
	require("game/resultScreen");
	require("game/gameReset");
	require("game/error");

	// Register template configs and game overrides
	layout.register(templateLayout, gameLayout);
	audio.register(templateAudioMap, gameAudioMap);
	config.register(templateConfig, gameConfig);
	textStyles.register(templateTextStyles, gameTextStyles);
    loadController.registerSubLoader("spine", new spineSubLoader());

	// Set game size for portrait and landscape
	gameSize.set(dimensions);

	// We have some custom resize code that has to fire *after* the event listener in gameSize. The listener is added in gameInit to ensure this.
	function resize(buttonSetY, balanceY, tagLineY) {
		let winW = windowSize.getDeviceWidth();
		let winH = windowSize.getDeviceHeight();
		if(winH > winW) {
			let ratio = window.innerWidth / app.renderer.width;
			let sH = Math.min(app.renderer.height * ratio, window.innerHeight + config.scaleGutterOut);
			let margin = (window.innerHeight - sH) / 2;

			app.view.style.height = String(sH) + "px";
			app.view.style.width = String(window.innerWidth) + "px";
			app.view.style.marginLeft = "0px";
			app.view.style.marginTop = String(margin) + "px";

			let sR = app.view.height / parseInt(app.view.style.height);
			let viewTop = -margin * sR;
			let viewBottom = app.view.height + (margin * sR);
			displayList.balanceMeterNT.y = Math.max(balanceY, viewTop + config.topMarginMin);
			displayList.buttonSet.y = Math.min(buttonSetY, viewBottom - config.bottomMarginMin);

			displayList.flaxLogo.y = displayList.balanceMeterNT.y + 10;
			displayList.mainGameTagLine.y = Math.min(displayList.buttonSet.y - 80, tagLineY);
		} else {
			app.view.style.width = String(window.innerWidth) + "px";
			app.view.style.height = String(window.innerHeight) + "px";
			app.view.style.marginTop = "0px";
			app.view.style.marginLeft = "0px";
		}
		//HACK: On the EM portal the game tries to downscale itself instead of leaving us to do it. Undo all its bad changes here.
		document.body.style.width = window.innerWidth + "px";
		document.body.style.height = window.innerHeight + "px";
		document.body.style.backgroundColor = "#000";
		document.body.style.overflow = "hidden";
		document.getElementById("game").style.transform = "";

		let bugDiv = document.getElementById("bugDiv");
		if(bugDiv !== null) {
			bugDiv.parentElement.removeChild(bugDiv);
		}
	}

	function updateLayout() {
		layoutEngine.update(
			templateLayout._BASE_APP,
			layout.layouts,
			isMobileOrTablet ? "portrait" : orientation.get()
		);
	}

	function gameInit() {
		// Register a transform function that can be used to turn the prizetable data into structured
		// data representing the prizetables in the paytable document
        /*if (SKBeInstant.isWLA()){
            documents.registerPrizestructureTransform(prizestructureTransform);
        } else {
            documents.registerPrizetableTransform(prizetableTransform);
        }*/
		// Register a transform function that can be used to turn the scenario string into useable data
		scenarioData.registerTransform(scenarioTransform);

		// Init StandardIW UI templates
		resultPlaques = resultPlaques();
		errorPlaque = errorPlaque();
		buttonBar = buttonBar();
		ticketSelectBar = ticketSelectBar();
		footer = footer();
		networkActivity = networkActivity();

		// Inititialize all game components
		mainGame.init();
		infoPage = infoPage();
		scratchBrush = scratchBrush();
		shaders.init();
		animationView.init();

		buttonBar.children.forEach(child => child.alpha = 0);

		// Add everything to the stage
		app.stage.addChild(
			layout.container,
			buttonBar,
			resultPlaques,
			scratchBrush,
			infoPage,
			errorPlaque,
			networkActivity
		);

		//force orientation checks
		msgBus.subscribe("GameSize.OrientationChange", updateLayout);
		updateLayout();

		const BALANCE_Y = displayList.balanceMeterNT.y.valueOf();
		const BUTTONSET_Y = displayList.buttonSet.y.valueOf();
		const TAGLINE_Y = displayList.mainGameTagLine.y.valueOf();
		window.addEventListener("resize", () => { resize(BUTTONSET_Y, BALANCE_Y, TAGLINE_Y); });
		resize(BUTTONSET_Y, BALANCE_Y, TAGLINE_Y);

		msgBus.publish("UI.updateButtons", {
			audioOn: {visible: true, enabled: true},
			audioOff: {visible: true, enabled: true},
			info: {visible: true, enabled: true},
			back: {visible: false, enabled: false},
			buy: {visible: SKBeInstant.config.wagerType === "BUY", enabled: SKBeInstant.config.wagerType === "BUY"},
			try: {visible: SKBeInstant.config.wagerType === "TRY", enabled: SKBeInstant.config.wagerType === "TRY"},
			playAgain: {visible: false}
		});

		// Once everything is initialized continue to next state
		gameFlow.next();
	}

	gameFlow.handle(gameInit, "GAME_INIT");
});