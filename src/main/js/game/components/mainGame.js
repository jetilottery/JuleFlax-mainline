define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	const MainGameTile = require("./MainGameTile");
    const audio = require("skbJet/componentManchester/standardIW/audio");

    require("com/gsap/TweenLite");
    const Tween = window.TweenLite;

    let tiles;
    let numbers;

	//you can generate a maskMap with ScratchMask.removeTransparent. You will need different masks for each orientation if the tiles are scaled differently.
    let maskMapL = JSON.parse("[false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]");
    let maskMapP = JSON.parse("[false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]");
	let _started = false;

    function init() {
        tiles = [
            MainGameTile.fromContainer(displayList.mainGameTile0, displayList.mainGameParticles0),
            MainGameTile.fromContainer(displayList.mainGameTile1, displayList.mainGameParticles1),
            MainGameTile.fromContainer(displayList.mainGameTile2, displayList.mainGameParticles2),
            MainGameTile.fromContainer(displayList.mainGameTile3, displayList.mainGameParticles3),
            MainGameTile.fromContainer(displayList.mainGameTile4, displayList.mainGameParticles4),
            MainGameTile.fromContainer(displayList.mainGameTile5, displayList.mainGameParticles5),
            MainGameTile.fromContainer(displayList.mainGameTile6, displayList.mainGameParticles6),
            MainGameTile.fromContainer(displayList.mainGameTile7, displayList.mainGameParticles7),
            MainGameTile.fromContainer(displayList.mainGameTile8, displayList.mainGameParticles8)
        ];
		window.mainGameTiles = tiles; //DEBUG
    }

    function populate(data) {
        numbers = data;
    }

    function enable() {
		_started = true;

        // Return an array of promises for each tile's lifecycle
        return tiles.map(async tile => {
            // Get the next Winning Number
            const nextData = numbers.shift();
            // Populate the tile with the next Winning Number, ready to be uncovered
            tile.populate(nextData);
            // Enable the tile and wait for it to be revealed (manually or automatically)
            await tile.enable();
            // Play the Winning Number reveal audio
            audio.playSequential("playerNumber");
            // Wait for the uncover animation (if animated)
            await tile.scratch();
            msgBus.publish("Game.mainGameTile", nextData);

			window.lastTile = tile;
            let matching = 0;
            tiles.forEach(function check(t){
                if(t._revealed && t.value === tile.value) {
                    matching++;
                }
            });
			window.lastMatching = matching;
            if(matching >= 3) {
                tiles.forEach(function check(t){
                    if(!t.matched && t._revealed && t.value === tile.value) {
                        t.match();
                        t.presentWin();
                        audio.playSequential("match");
                    }
                });
				if(!config.mockData) {
					meterData.win += tile.value;
				}
            }
        });
	}

    function setActive(active) {
        tiles.forEach(function(tile) {
            tile.active = active;
			tile.scratchMask.cloneTransparent(displayList.mainGameTiles.scale.x < 1 ? maskMapL : maskMapP);
            if(!tile._revealed) {
                tile.resultContainer.scale.set(Math.min(0.9, tile.foil.width / tile.valueSprite.width));
            }
        });
    }
    
    function revealAll() {
        // Get all the tiles yet to be revealed
        const unrevealed = tiles.filter(tile => !tile._revealed);
        // Return an array of tweens that calls reveal on each tile in turn
        return unrevealed.map((tile) => Tween.delayedCall(0, tile.reveal, null, tile).duration(tile.scratchDuration));
    }

    function reset() {
        tiles.forEach(tile => tile.reset());
		_started = false;
    }

    function checkMatch() {
        //noop
    }
    msgBus.subscribe("Game.mainGameTile", checkMatch);

    return {
        init,
        populate,
        enable,
        setActive,
        revealAll,
        reset,
		get started() {
			return _started;
		}
    };
});
