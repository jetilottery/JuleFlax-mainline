define({
	_BASE_APP: {
		children: ["background", "game"]
	},

	game: {
		type: "container",
		children: ["gameContainers", "intro", "flaxLogo", "purchase", "introTitle", "snow", "balanceMeterNT"]
	},

	/*
	 * BALANCE
	 */
	balanceMeterNT: {
		type: "text",
		style: "balanceMeterStyle",
		string: "",
		anchor: { x: 1, y: 0 },
		landscape: { x: 1426, y: 12, maxWidth: 230 },
		portrait: { x: 869, y: 44, maxWidth: 400 }
	},

	snow: {
		type: "rectangle",
		x: 0,
		y: 0,
		width: 256,
		height: 256,
		fillAlpha: 0,
		fill: 0x000000
	},

	/*
	 * BACKGROUND
	 */
	background: {
		type: "rectangle",
		children: ["backdrop", "tinySkiers", "animationLayer", "titleLogo"],
		landscape: {
			x: 0,
			y: 0,
			width: 1440,
			height: 810,
			fill: 0x005017
		},
		portrait: {
			x: 0,
			y: 0,
			width: 900,
			height: 1600,
			fill: 0x005017
		}
	},

	backdrop: {
		type: "sprite",
		x: 0,
		y: 0,
		portrait: { texture: "gamebasePortrait" },
		landscape: { texture: "gamebaseLandscape" }
	},

	tinySkiers: {
		type: "container",
		landscape: { x: 145, y: 87 },
		portrait: { x: 80, y: 410 }
	},

	animationLayer: {
		type: "container",
		landscape: { x: 720, y: 405 },
		portrait: { x: 450, y: 800 }
	},

	flaxLogo: {
		type: "sprite",
		texture: "flaxLogo",
		anchor: 0,
		scale: 1.4,
		landscape: { x: 27, y: 21 },
		portrait: { x: 28, y: 32 }
	},

	titleLogo: {
		type: "sprite",
		texture: "titleLogo",
		anchor: 0.5,
		alpha: 0,
		landscape: { x: 1240, y: 138, scale: 0.66 },
		portrait: { x: 608, y: 340, scale: 1 }
	},

	/*
	 * GAME CONTAINERS
	 */
	gameContainers: {
		type: "container",
		children: ["mainGame"]
	},

	mainGame: {
		type: "container",
		children: [
			"mainGameTagLine",
			"mainGameTiles"
		],
		alpha: 0,
		visible: false
	},

	mainGameTagLine: {
		type: "sprite",
		texture: "Finn tre like og vinn",
		anchor: 0.5,
		landscape: {
			x: 720,
			y: 649
		},
		portrait: {
			x: 450,
			y: 1330
		}
	},

	mainGameTiles: {
		type: "container",
		children: [
			"mainGameTile0",
			"mainGameTile1",
			"mainGameTile2",
			"mainGameTile3",
			"mainGameTile4",
			"mainGameTile5",
			"mainGameTile6",
			"mainGameTile7",
			"mainGameTile8",
			"mainGameParticles0",
			"mainGameParticles1",
			"mainGameParticles2",
			"mainGameParticles3",
			"mainGameParticles4",
			"mainGameParticles5",
			"mainGameParticles6",
			"mainGameParticles7",
			"mainGameParticles8"
		],
		portrait: { x: 0, y: 866, scale: 1 },
		landscape: { x: 368, y: 379, scale: 0.78 }
	},

	mainGameTile0: {
		type: "container",
		x: 180,
		y: -220,
		alpha: 0
	},
	mainGameTile1: {
		type: "container",
		x: 450,
		y: -220,
		alpha: 0
	},
	mainGameTile2: {
		type: "container",
		x: 720,
		y: -220,
		alpha: 0
	},

	mainGameTile3: {
		type: "container",
		x: 180,
		y: -2,
		alpha: 0
	},
	mainGameTile4: {
		type: "container",
		x: 450,
		y: -2,
		alpha: 0
	},
	mainGameTile5: {
		type: "container",
		x: 720,
		y: -2,
		alpha: 0
	},
	
	mainGameTile6: {
		type: "container",
		x: 180,
		y: 220,
		alpha: 0
	},
	mainGameTile7: {
		type: "container",
		x: 450,
		y: 220,
		alpha: 0
	},
	mainGameTile8: {
		type: "container",
		x: 720,
		y: 220,
		alpha: 0
	},

	mainGameParticles0: {
		type: "container",
		x: 180,
		y: -220
	},
	mainGameParticles1: {
		type: "container",
		x: 450,
		y: -220
	},
	mainGameParticles2: {
		type: "container",
		x: 720,
		y: -220
	},

	mainGameParticles3: {
		type: "container",
		x: 180,
		y: -2
	},
	mainGameParticles4: {
		type: "container",
		x: 450,
		y: -2
	},
	mainGameParticles5: {
		type: "container",
		x: 720,
		y: -2
	},

	mainGameParticles6: {
		type: "container",
		x: 180,
		y: 220
	},
	mainGameParticles7: {
		type: "container",
		x: 450,
		y: 220
	},
	mainGameParticles8: {
		type: "container",
		x: 720,
		y: 220
	},

	/*
	 * INTRO ASSETS
	 */
	intro: {
		type: "container",
		children: ["introDiamond", "introSnow"]
	},
	introDiamond: {
		type: "sprite",
		anchor: 0.5,
		landscape: { x: 720, y: 405, texture: "purchaseDiamondLandscape" },
		portrait: { x: 450, y: 800, texture: "purchaseDiamondPortrait" }
	},
	/*
	introSnow: {
		type: "sprite",
		texture: "snow3",
		anchor: { x: 0.5, y: 1 },
		landscape: { x: 720, y: 0 },
		portrait: { x: 450, y: 0 }
	},
	*/
	introSnow: {
		type: "rectangle",
		fill: 0x000000,
		fillAlpha: 0,
		x: 0,
		y: 0,
		landscape: { width: 1440, height: 810 },
		portrait: { width: 900, height: 1600 }
	},

	introTitle: {
		type: "sprite",
		texture: "titleText",
		alpha: 0,
		anchor: 0.5,
		landscape: { x: 720, y: 270 },
		portrait: { x: 450, y: 519 }
	},
	/*
	 * PURCHASE SCREEN
	 */
	purchase: {
		type: "container",
		children: ["purchaseCard", "priceTag"]
	},
		purchaseCard: {
			type: "sprite",
			anchor: 0.5,
			landscape: {
				texture: "purchaseCardLandscape",
				x: 726,
				y: 358
			},
			portrait: {
				texture: "purchaseCardPortrait",
				x: 450,
				y: 794
			}
		},
		priceTag: {
			type: "sprite",
			anchor: 0.5,
			children: ["ticketPrice"],
			landscape: {
				x: 406,
				y: 529,
				texture: "diamondPriceLandscape",
			},
			portrait: {
				x: 220,
				y: 1190,
				texture: "diamondPricePortrait",
			}
		},
			ticketPrice: {
				type: "text",
				string: "ticketCost",
				style: "ticketPriceStyle",
				anchor: 0.5,
				x: 0,
				y: -4,
				tint: 0xffffff,
				maxWidth: 100
			},
	/*
	 * UI
	 */

	brushButton: {
		type: "button",
		landscape: {
			x: 1140,
			y: 37
		},
		portrait: {
			x: 0,
			y: -100
		},
		textures: {
			enabled:    "brushButtonEnabled",
			over:       "brushButtonOver",
			pressed:    "brushButtonPressed",
			disabled:   "brushButtonEnabled"
		},
		children: ["menu", "selected"]
	},
	menu: {
		type: "sprite",
		texture: "brushMenu",
		anchor: {
			x: 0.5,
			y: 0
		},
		x: 0,
		y: -26,
		children: ["coinButton", "keyButton", "wandButton"]
	},
	coinButton: {
		type: "button",
		x: 0,
		y: 69,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelector",
			over:       "brushMenuSelectorOver",
			pressed:    "brushMenuSelectorPressed",
			disabled:   "brushMenuSelector"
		},
		children: ["coin"]
	},
	coin: {
		type: "sprite",
		texture: "coin",
		x: -34,
		y: -20
	},
	keyButton: {
		type: "button",
		x: 0,
		y: 118,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelector",
			over:       "brushMenuSelectorOver",
			pressed:    "brushMenuSelectorPressed",
			disabled:   "brushMenuSelector"
		},
		children: ["key"]
	},
	key: {
		type: "sprite",
		texture: "key",
		x: -34,
		y: -20
	},
	wandButton: {
		type: "button",
		x: 0,
		y: 164,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelectorBottom",
			over:       "brushMenuSelectorBottomOver",
			pressed:    "brushMenuSelectorBottomPressed",
			disabled:   "brushMenuSelectorBottom"
		},
		children: ["wand"]
	},
	wand: {
		type: "sprite",
		texture: "wand",
		x: -34,
		y: -21
	},
	selected: {
		name: "selected",
		type: "sprite",
		x: -15,
		y: -2,
		anchor: 0.5,
		texture: "coin"
	},

	/*
	 * ERROR
	 */
	errorContainer: {
		type: "container",
		children: [
			"errorOverlay",
			"errorBackground",
			"errorTitle",
			"errorMessage",
			"errorExit",
			"timeoutExit",
			"timeoutContinue"
		],
	},
	errorOverlay: {
		type: "rectangle",
		fillAlpha: 0.5,
		fill: 0x000000,
		anchor: 0,
		x: 0,
		y: 0,
		landscape: {
			width: 1440,
			height: 810,
		},
		portrait: {
			width: 900,
			height: 1600,
		}
	},
	errorBackground: {
		type: "rectangle",
		fill: 0xBBBBBB,
		lineWidth: 2,
		lineColor: 0x000000,
		radius: 4,
		landscape: {
			x: 50,
			y: 80,
			width: 1340,
			height: 600
		},
		portrait: {
			x: 30,
			y: 234,
			width: 840,
			height: 1200
		}
	},
	errorTitle: {
		type: "text",
		style: "messageText",
		anchor: 0.5,
		x: 0,
		y: -300
	},
	errorMessage: {
		type: "text",
		style: "messageText",
		anchor: 0.5,
		wordWrap: true,
		landscape: { x: 720, y: 260, wordWrapWidth: 1290 },
		portrait: { x: 450, y: 528, wordWrapWidth: 800 }
	},
	errorExit: {
		type: "button",
		string: "button_exit",
		landscape: { x: 720, y: 680, scale: 0.7 },
		portrait: { x: 450, y: 1424 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	},
	timeoutExit: {
		type: "button",
		string: "button_exit",
		landscape: { x: 803, y: 680, scale: 0.7 },
		portrait: { x: 650, y: 1424 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	},
	timeoutContinue: {
		type: "button",
		string: "button_continue",
		landscape: { x: 597, y: 680, scale: 0.7 },
		portrait: { x: 250, y: 1424 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	},

    /*
    * UI Panel
    */
   buttonSet: {
		type:           "container",
		landscape:      { x: 0, y: 740, scale: 0.7 },
		portrait:       { x: 0, y: 1500 },
		children: [
			"audioOnButton",
			"audioOffButton",
			"infoButton",
			"gamePips",
			"leftButton",
			"rightButton",
			"hintButton",
			"backButton",
			"scratchAllButton",
			"dialogueOverlay",
			"scratchAllDialogue",
			"playAgainButton",
			"buyButton",
			"tryButton"
		]
	},
	audioOnButton: {
        type:           "button",
        landscape:      {x: 38, y: 17 },
        portrait:       { x: 51, y: -100 },
        textures: {
            enabled:    "soundOnIconUp",
            over:       "soundOnIconOver",
            pressed:    "soundOnIconDown",
            disabled:   "soundOnIconDisabled"
        }
    },
    audioOffButton: {
        type:           "button",
        landscape:      {x: 38, y: 17 },
        portrait:       { x: 51, y: -100 },
        textures: {
            enabled:    "soundOffIconUp",
            over:       "soundOffIconOver",
            pressed:    "soundOffIconDown",
            disabled:   "soundOffIconDisabled"
        }
    },
    infoButton: {
        type:           "button",
        landscape:      { x: 130, y: 17 },
        portrait:       { x: 162, y: -36 },
        textures: {
            enabled:    "infoUp",
            over:       "infoOver",
            pressed:    "infoDown",
            disabled:   "infoDisabled"
        }
    },
    buyButton: {
        type:           "button",
        landscape:      { x: 1028, y: 2 },
        portrait:       { x: 450, y: 2 },
        string:         "button_buy",
        textures: {
            enabled:    "buttonBaseUp",
            over:       "buttonBaseOver",
            pressed:    "buttonBaseDown",
            disabled:   "buttonBaseDisabled"
        },
        style: {
            enabled:    "mainButtonEnabled",
            over:       "mainButtonOver",
            pressed:    "mainButtonPressed",
            disabled:   "mainButtonDisabled"
        }
    },
    tryButton: {
        type:           "button",
        landscape:      { x: 1028, y: 2 },
        portrait:       { x: 450, y: 2 },
        string:         "button_try",
        textures: {
            enabled:    "buttonBaseUp",
            over:       "buttonBaseOver",
            pressed:    "buttonBaseDown",
            disabled:   "buttonBaseDisabled"
        },
        style: {
            enabled:    "mainButtonEnabled",
            over:       "mainButtonOver",
            pressed:    "mainButtonPressed",
            disabled:   "mainButtonDisabled"
        }
    },
    scratchAllButton: {
        type:           "button",
        landscape:      { x: 1028, y: 2 },
        portrait:       { x: 450, y: 2 },
        string:         "button_scratchAll",
        textures: {
            enabled:    "buttonBaseUp",
            over:       "buttonBaseOver",
            pressed:    "buttonBaseDown",
            disabled:   "buttonBaseDisabled"
        },
        style: {
            enabled:    "mainButtonEnabled",
            over:       "mainButtonOver",
            pressed:    "mainButtonPressed",
            disabled:   "mainButtonDisabled"
        }
    },
    dialogueOverlay: {
        type:           "rectangle",
        fillAlpha: 0.5,
        fill: 0x000000,
        anchor: 0,
        alpha: 0,
        x: 0,
        landscape: {
            width: 800,
            height: 600,
            y: -518,
        },
        portrait: {
            width: 640,
            height: 1136,
            y: -900,
        }
    },
    playAgainButton: {
        type:           "button",
        landscape:      { x: 1028, y: 2 },
        portrait:       { x: 450, y: 2 },
        string:         "button_playAgain",
        textures: {
            enabled:    "buttonBaseUp",
            over:       "buttonBaseOver",
            pressed:    "buttonBaseDown",
            disabled:   "buttonBaseDisabled"
        },
        style: {
            enabled:    "mainButtonEnabled",
            over:       "mainButtonOver",
            pressed:    "mainButtonPressed",
            disabled:   "mainButtonDisabled"
        }
	},
	
	spinner: {
        type: "sprite",
        landscape: { x: 720, y: 400 },
        portrait: { x: 450, y: 768 },
        anchor: 0.5,
        texture: "networkActivity"
    }
});
