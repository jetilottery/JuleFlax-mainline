define(require => {

    const resources = require("skbJet/component/resourceLoader/resourceLib");
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

    require("com/gsap/TweenLite");

    const Tween = window.TweenLite;


    let animationList = {

    };

    function addAnimation(value) {
        let anim =  new PIXI.spine.Spine( resources.spine[value.file].spineData );
        animationList[value.index] = {};
        animationList[value.index].index = value.index;
        animationList[value.index].spineObject = anim;
        animationList[value.index].name = value.name;
        animationList[value.index].loop = value.loop;
        animationList[value.index].loopCount = 0;

        anim.position.set(
            value.x,
            value.y
        );

        anim.pivot.set(
            value.pivotX,
            value.pivotY
        );

        if(typeof value.scaleX === "number" && typeof value.scaleY === "number") {
            anim.scale.set(
                value.scaleX,
                value.scaleY
            );
        }

        anim.alpha = value.alpha;

        if(value.back === undefined) {
            value.container.addChild(anim);
        } else {
            value.container.addChildAt(anim,0);
        }

    }

    function getAnimation(value) {
        return animationList[value];
    }

    function getAnimationList() {
        return animationList;
    }

    function playAnimation(value) {
        let loop = false;
        if(typeof value.loop === "number" && value.loop > 1) {
            animationList[value.index].loopCount = value.loop;
        } else {
            loop = value.loop;
        }

        if(typeof value.track === "number") {
            animationList[value.index].spineObject.state.setAnimation(
                value.track,
                value.anim,
                loop === undefined ? animationList[value.index].loop : loop
            );            
        } else if(value.newTrack) {
            animationList[value.index].spineObject.state.setAnimation(
                animationList[value.index].spineObject.state.tracks.length,
                value.anim,
                loop === undefined ? animationList[value.index].loop : loop
            );    
        } else {
            animationList[value.index].spineObject.state.setAnimation(
                0,
                value.anim,
                loop === undefined ? animationList[value.index].loop : loop
            );    
        }

        if(value.onComplete && typeof value.onComplete === "function") {
            if(typeof value.track === "number") {
                animComplete(animationList[value.index].spineObject.state.tracks[value.track], value.onComplete);
            } else {
                animationList[value.index].spineObject.state.onComplete = value.onComplete;
            }
        } else if(typeof value.track === "number") {
            animComplete(animationList[value.index].spineObject.state.tracks[value.track], () => {
                if(loop === false) {
                    animationList[value.index].loopCount--;
                    if(animationList[value.index].loopCount > 0) {
                        playAnimation(value);
                    } else {
                        msgBus.publish("animation.end", value);
                    }
                }
            });
        } else {
            animationList[value.index].spineObject.state.onComplete = () => {
                if(loop === false) {
                    animationList[value.index].loopCount--;
                    if(animationList[value.index].loopCount > 0) {
                        playAnimation(value);
                    } else {
                        msgBus.publish("animation.end", value);
                    }
                }
            };
        }
    }

    async function animComplete(trackEntry, onComplete) {
        let _that = this;
        await new Promise(resolve => {
            function poll() {
                if(trackEntry.isComplete()) {
                    PIXI.ticker.shared.remove(poll, _that);
                    resolve();
                }
            }
            PIXI.ticker.shared.add(poll, _that);
        });
        onComplete();
    }

    function clearAnimation(value) {
        let track = animationList[value.index].spineObject.state.tracks.filter(track => track && track.animation.name === value.anim)[0];
        if(track) {
            animationList[value.index].spineObject.state.clearTrack(track.trackIndex);
        }
    }

    function queueAnimation(value) {
        animationList[value.index].spineObject.state.addAnimation(
            0,
            value.anim,
            value.loop === undefined ? animationList[value.index].loop : value.loop
        );
    }

    function fadeBetween(current,next,time) {
        Tween.to(current,time,{
           alpha:0
        });
        Tween.to(next,time,{
            alpha:1
        });
    }

    return {
        getAnimation,
        playAnimation,
        clearAnimation,
        queueAnimation,
        fadeBetween,
        getAnimationList,
        addAnimation
    };

});
