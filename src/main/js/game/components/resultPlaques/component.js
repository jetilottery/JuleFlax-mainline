define(function(require) {
	var PIXI = require("com/pixijs/pixi");
    var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    var meterData = require("skbJet/componentManchester/standardIW/meterData");
    var isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");
    var nokFormat = require("skbJet/componentLondon/utils/nokFormat");
    var config = require("skbJet/componentManchester/standardIW/gameConfig");
	var utils = require("skbJet/componentManchester/standardIW/layout/utils");

	require("com/gsap/TweenLite");
    require("com/gsap/TimelineLite");

    var Tween = window.TweenLite;

    return function resultPlaques(parts) {
        // initial setup;
        parts.resultPlaques.visible = false;
        parts.winPlaque.visible = false;
        parts.losePlaque.visible = false;
        window.parts = parts;

		var winParticles = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("bigWinParticles").map(frame => {return PIXI.Texture.fromFrame(frame);}));
		winParticles.loop = false;
		winParticles.alpha = 0;
        winParticles.anchor.set(0.5);

		parts.popUpBigWinBG.addChild(winParticles);

        function showPlaque() {
            parts.resultPlaques.interactive = true;
            parts.resultPlaques.interactiveChildren = true;
            msgBus.publish("UI.updateButtons", {
                audioOn: {enabled: false},
                audioOff: {enabled: false},
                info: {enabled: false},
                left: {enabled: false},
                right: {enabled: false},
                back: {enabled: false},
                hint: {enabled: false},
                scratchAll: {enabled: false},
                playAgain: {enabled: false}
            });

			var formattedWin, win;
			if(config.mockData) {
				formattedWin = nokFormat(window.fakeMeterWin);
				win = window.fakeMeterWin;
			} else {
				formattedWin = nokFormat(meterData.totalWin);
				win = meterData.totalWin;
			}

            if(win === 0) {
                parts.losePlaque.visible = true;
                parts.winPlaque.visible = false;
                parts.resultPlaques.visible = true;

                Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone" });
                msgBus.publish("animation.play", { index: "losePopUp", anim: "losePopUpIntro", loop: false, track: 1});
            } else {
                parts.losePlaque.visible = false;
                parts.winPlaque.visible = true;
                parts.resultPlaques.visible = true;

                parts.popUpWinPrize.text = formattedWin;

                Tween.killTweensOf(parts.burst2);
                Tween.killTweensOf(parts.burst3);

                Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 0}, {alpha: 1, visible: 1});
                Tween.fromTo(parts.burst2, 10, {rotation: 0}, {rotation: Math.PI * 2, onComplete: function(t) {
                    t.restart();
                }, onCompleteParams: ["{self}"], ease: "Linear.easeNone" });
				Tween.fromTo(parts.burst3, 9, {rotation: 0}, {rotation: Math.PI * 2, onComplete: function(t) {
					t.restart();
				}, onCompleteParams: ["{self}"], ease: "Linear.easeNone" });

				if(win > config.bigWinLevel1) {
					winParticles.onComplete = () => {
						winParticles.alpha = 0;
					};
					winParticles.scale.set(2.5);
					winParticles.animationSpeed = 0.5;
					winParticles.alpha = 1;
                    winParticles.gotoAndPlay(0);
                    parts.popUpBigWinBG.alpha = 1;
                    parts.popUpWinBG.alpha = 0;

                    msgBus.publish("animation.play", { index: "BigWinPopUp", anim: "BigWinPopUpIntro", loop: false, track: 1, onComplete: () => {
                        msgBus.publish("animation.play", { index: "BigWinPopUp", anim: "santa Laugh", loop: true, track: 2});
                        msgBus.publish("animation.play", { index: "BigWinPopUp", anim: "toySack", loop: true, track: 3});
                        msgBus.publish("animation.play", { index: "BigWinPopUp", anim: "treeLights", loop: true, track: 4});
                        msgBus.publish("animation.play", { index: "BigWinPopUp", anim: "gnomeBeardFlick", loop: false, track: 5});
                    }});
                } else {
                    winParticles.alpha = 0;
                    parts.popUpBigWinBG.alpha = 0;
                    parts.popUpWinBG.alpha = 1;

                    msgBus.publish("animation.play", { index: "RegularWinPopUp", anim: "RegularWinPopUpIntro", loop: false, track: 1, onComplete: () => {
                        msgBus.publish("animation.play", { index: "RegularWinPopUp", anim: "santa Laugh", loop: true, track: 2});
                        msgBus.publish("animation.play", { index: "RegularWinPopUp", anim: "treeLights", loop: true, track: 3});
                        msgBus.publish("animation.play", { index: "RegularWinPopUp", anim: "gnomeBeardFlick", loop: false, track: 4});
                    }});
                }
            }
        }

        function gnomeRandom(data) {
            let pick = ["gnomeBeardFlick", "gnomeHatWobble", "gnomeNoseWobble"];
            if(pick.includes(data.anim)) {
                msgBus.publish("animation.play", {
                    index: data.index,
                    anim: pick[Math.floor(Math.random() * pick.length)],
                    loop: false,
                    track: data.track
                });    
            }
        }
        msgBus.subscribe("animation.end", gnomeRandom);

        parts.viewResultButton.on("press", function onPress() {
            if(!isMobileOrTablet) {
                msgBus.publish("UI.updateButtons", {
                    audioOn: {visible: true, enabled: true},
                    audioOff: {visible: true, enabled: true},
                    info: {visible: true, enabled: true},
                    left: {visible: false, enabled: false},
                    right: {visible: false, enabled: false},
                    hint: {visible: false, enabled: false},
                    back: {visible: false, enabled: false},
                    scratchAll: {visible: false, enabled: false},
                    gamePips: {visible: false},
                    buy: {visible: false, enabled: false},
                    try: {visible: false, enabled: false},
                    playAgain: {visible: true, enabled: true}
                });
            } else {
                msgBus.publish("UI.updateButtons", {
                    audioOn: {visible: true, enabled: true},
                    audioOff: {visible: true, enabled: true},
                    info: {visible: true, enabled: true},
                    left: {visible: true, enabled: true},
                    right: {visible: true, enabled: true},
                    hint: {visible: false, enabled: false},
                    back: {visible: false, enabled: false},
                    scratchAll: {visible: false, enabled: false},
                    gamePips: {visible: false},
                    buy: {visible: false, enabled: false},
                    try: {visible: false, enabled: false},
                    playAgain: {visible: true, enabled: true}
                });
            }
			msgBus.publish("Game.viewResult");

            parts.resultPlaques.interactive = false;
            parts.resultPlaques.interactiveChildren = false;
            Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 1}, {alpha: 0, visible: 0});
        });

        parts.okButton.on("press", function onPress() {
            parts.resultPlaques.interactive = false;
            parts.resultPlaques.interactiveChildren = false;
            msgBus.publish("UI.updateButtons", {
                audioOn: {visible: true, enabled: true},
                audioOff: {visible: true, enabled: true},
                info: {visible: true, enabled: true},
                left: {visible: false, enabled: false},
                right: {visible: false, enabled: false},
                back: {visible: false, enabled: false},
                hint: {visible: false, enabled: false},
                scratchAll: {visible: false, enabled: false},
                playAgain: {visible: false, enabled: false},
                buy: {visible: false, enabled: false},
                try: {visible: false, enabled: false}
            });

            Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 1}, {alpha: 0, visible: 0, onComplete: function (){
                msgBus.publish("Game.Finish");
            }});
        });

        msgBus.subscribe("Game.ShowResult", showPlaque);

        return parts.resultPlaques;
    };
});
