define((require) => {
	const FittedText = require("skbJet/componentManchester/standardIW/components/fittedText");
	const TextStyles = require("skbJet/componentManchester/standardIW/textStyles");
	const PIXI = require("com/pixijs/pixi");
	const nokFormat = require("skbJet/componentLondon/utils/nokFormat");
	const utils = require("skbJet/componentManchester/standardIW/layout/utils");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	require("com/gsap/TweenMax");
	require("com/gsap/TimelineLite");

	const Tween = window.TweenMax;
	const Timeline = window.TimelineLite;

	//const ScratchSymbol = require("skbJet/componentLondon/customIW/components/ScratchSymbol");
	const ScratchSymbol = require("./ScratchSymbol");

	class MainGameTile extends ScratchSymbol {
		constructor() {
			let foil = new PIXI.Container();
			let foilBase = PIXI.Sprite.fromFrame("panelUnscratched");
			let foilMelt = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("meltFrames").map(frame => {return PIXI.Texture.fromFrame(frame);}));
			foilBase.anchor.set(0.5);
			foilMelt.anchor.set(0.5);
			foilMelt.alpha = 0;
			foilMelt.animationSpeed = 0.5;
			foilMelt.loop = false;
			foil.addChild(foilBase, foilMelt);
			super(143, 186, {
				background: "none",
				win: "panelScratchedWin",
				lose: "panelScratchedLose",
				foil: foil,
				gutter: 200
			});

			this.foilBase = foilBase;
			this.foilMelt = foilMelt;
			this.valueSprite = new FittedText("XXX XXX,-");
			this.valueSprite.y = -3;
			this.valueSprite.anchor.set(0.5);
			this.valueSprite.style = TextStyles.parse("prizeValueNoWin");
			this.maxWinSprite = PIXI.Sprite.fromFrame("maxWinSymbol");
			this.maxWinSprite.anchor.set(0.5);
			this.maxWinSprite.alpha = 0;

			this.resultContainer.addChild(this.valueSprite, this.maxWinSprite);

			this.winParticles = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("winParticles").map(frame => {return PIXI.Texture.fromFrame(frame);}));
			this.winParticles.loop = false;
			this.winParticles.alpha = 0;
			this.winParticles.anchor.set(0.5);

			this.reset();
		}

		async melt() {
			return new Promise(resolve => {
				this.resultContainer.alpha = 0;
				this.resultContainer.visible = true;
				this.resultContainer.mask = null;
				this.background.alpha = 0;
				this.background.visible = true;
				this.background.mask = null;
				this.resultContainer.parent.removeChild(this.antiResult);
				this.foilBase.alpha = 0;
				this.foilMelt.alpha = 1;
				this.foilMelt.visible = true;
				this.foilMelt.onComplete = resolve;
				this.foilMelt.gotoAndPlay(0);
				Tween.to(this.resultContainer, (1/24)*this.foilMelt.totalFrames/this.foilMelt.animationSpeed, {alpha: 1});
				Tween.to(this.background, (1/24)*this.foilMelt.totalFrames/this.foilMelt.animationSpeed, {alpha: 1});
			});
		}

		async scratch() {
			if(this.idleTimeline !== null) {
				this.idleTimeline.seek(this.idleTimeline.duration, false);
			}
			if(this.scratchedOnce) {
				await super.scratch();
			} else {
				return new Promise(resolve0 => {
					this.melt().then(() => {
						new Timeline({
							onComplete: () => {
								this._revealed = true;
								resolve0();
							}, onCompleteScope: this
						})
							.to(this.resultContainer.scale, 0.5833, {x: 1, y: 1}, 0);
					});
				});
			}
		}

		populate(value) {
			this.value = value;
			this.valueSprite.text = nokFormat(value);
			if(this.value >= config.bigWinLevel1) {
				this.lose.texture = PIXI.Texture.fromFrame("panelScratchedLose");
				this.win.texture = PIXI.Texture.fromFrame("panelScratchedMaxWin");
				this.valueSprite.text = ""; //Hide the number if it's the top prize
				this.maxWinSprite.alpha = 1;
			} else {
				this.lose.texture = PIXI.Texture.fromFrame("panelScratchedLose");
				this.win.texture = PIXI.Texture.fromFrame("panelScratchedWin");
				this.valueSprite.text = nokFormat(value);
				this.maxWinSprite.alpha = 0;
			}
		}

		reset() {
			this.foilBase.alpha = 1;
			this.foilBase.visible = true;
			this.foilMelt.alpha = 0;
			this.foilMelt.visible = false;
			this.foilMelt.scale.set(1);
			super.reset();
			this.value = -1;
			this.valueSprite.text = "XXX XXX,-";
			this.valueSprite.style = TextStyles.parse("prizeValueNoWin");
			this.lose.alpha = 1;
			this.lose.visible = true;
			this.win.alpha = 0;
			this.win.visible = false;
			this.winParticles.alpha = 0;
			this.maxWinSprite.alpha = 0;
			this.scratchedOnce = false;
		}

		match() {
			this.matched = true;
			Tween.fromTo(this.win, 0.25, {alpha: 0, visible: 0}, {alpha: 1, visible: 1});
			Tween.fromTo(this.lose, 0.25, {alpha: 1, visible: 1}, {alpha: 0, visible: 0});
			this.valueSprite.style = TextStyles.parse("prizeValueWin");
		}

		presentWin() {

			this.winParticles.onComplete = () => {
				this.winParticles.alpha = 0;
				this.reveal();
			};
			this.winParticles.alpha = 1;
			this.winParticles.animationSpeed = 0.5;
			this.winParticles.gotoAndPlay(0);
			return new Promise(resolve => this.reveal = resolve);
		}

		idle() {
			this.idleTimeline = new Timeline({
				onComplete: () => {
					this.idleTimeline = null;
				}
			})
				.to(this.container, 1, { ease: this.idleWiggle, rotation: -Math.PI/8 });
		}

		static fromContainer(main, particles) {
			const tile = new MainGameTile();
			tile.container = main;
			tile.particleContainer = particles;

			main.addChild(tile.background, tile.resultContainer, tile.foil);
			particles.addChild(tile.winParticles);

			return tile;
		}
	}

	return MainGameTile;
});