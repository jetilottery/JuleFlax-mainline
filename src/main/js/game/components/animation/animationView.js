define(require => {

    const animationController = require("game/components/animation/animationController");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

    function init() {
        animationController.addAnimation({
            index: "spineSetUpPortrait",
            file: "spineSetUpPortrait",
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            alpha: 0,
            container: displayList.animationLayer
        });

        animationController.addAnimation({
            index: "spineSetUpLandscape",
            file: "spineSetUpLandscape",
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            alpha: 0,
            container: displayList.animationLayer
        });

        /*
         * RegularWinPopUp
         */
        animationController.addAnimation({
            index: "RegularWinPopUp",
            file: "RegularWinPopUp",
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            alpha: 1,
            container: displayList.popUpWinBG
        });

        /*
         * BigWinPopUp
         */
        animationController.addAnimation({
            index: "BigWinPopUp",
            file: "BigWinPopUp",
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            alpha: 1,
            container: displayList.popUpBigWinBG
        });
 
        animationController.addAnimation({
            index: "losePopUp",
            file: "LosePopUp",
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            alpha: 1,
            container: displayList.popUpLoseBG
        });

        setVisibility();

        //start attract mode / constant animations
        let animSet;
        if(isMobileOrTablet || orientation.get() !== "landscape") {
            animSet = "spineSetUpPortrait";
        } else {
            animSet = "spineSetUpLandscape";
        }
        msgBus.publish("animation.play", { index: animSet, anim: "santaSlide", loop: true, track: 1});
        msgBus.publish("animation.play", { index: animSet, anim: "treelights", loop: true, track: 2});
        msgBus.publish("animation.play", { index: animSet, anim: "star sparkle", loop: true, track: 3});
        msgBus.publish("animation.play", { index: animSet, anim: "gnome1 hat wobble", loop: false, track: 4});
        msgBus.publish("animation.play", { index: animSet, anim: "gnome2HatWobble", loop: false, track: 5});
    }

    let gnome1Hidden = false;
    function gnomeRandom(data) {
        let pick;
        switch(data.anim) {
            case "gnome1 pop out":
                gnome1Hidden = false;
                pick = ["gnome1 nose wobble", "gnome1 hat wobble"];
                pick.push(gnome1Hidden ? "gnome1 pop out" : "gnome1 disappear");
                break;
            case "gnome1 disappear":
                gnome1Hidden = true;
                pick = ["gnome1 nose wobble", "gnome1 hat wobble"];
                pick.push(gnome1Hidden ? "gnome1 pop out" : "gnome1 disappear");
                break;
            case "gnome1 hat wobble":
            case "gnome1 nose wobble":
                pick = ["gnome1 nose wobble", "gnome1 hat wobble"];
                pick.push(gnome1Hidden ? "gnome1 pop out" : "gnome1 disappear");
                break;
            case "gnome2HeadWobble":
            case "gnome2HatWobble":
            case "gnome2NoseWobble":
                pick = ["gnome2HeadWobble", "gnome2HatWobble", "gnome2NoseWobble"];
                break;
            default:
                pick = [];
        }
        if(pick.length) {
            let waitSeconds = config.attractAnimWaitDurationMin + Math.random() * (config.attractAnimWaitDurationMax - config.attractAnimWaitDurationMin);
            setTimeout(() => {
                msgBus.publish("animation.play", {
                    index: data.index,
                    anim: pick[Math.floor(Math.random() * pick.length)],
                    loop: false,
                    track: data.track
                });
            }, waitSeconds * 1000);    
        }
    }

    function setVisibility() {
        let landscape = isMobileOrTablet ? false : orientation.get() === "landscape";
        let animsL = animationController.getAnimation("spineSetUpLandscape");
        let animsP = animationController.getAnimation("spineSetUpPortrait");
        if(animsL && animsL.spineObject) {
            animsL.spineObject.alpha = landscape ? 1 : 0;
        }
        if(animsP && animsP.spineObject) {
            animsP.spineObject.alpha = landscape ? 0 : 1;
        }
    }

    msgBus.subscribe("animation.play", data => {
        animationController.playAnimation(data);
    });

    msgBus.subscribe("animation.add", data => {
        animationController.queueAnimation(data);
    });

    msgBus.subscribe("animation.clear", data => {
        animationController.clearAnimation(data);
    });

    msgBus.subscribe("GameSize.OrientationChange", setVisibility);

    msgBus.subscribe("animation.end", gnomeRandom);
    
    return {
        init
    };

});