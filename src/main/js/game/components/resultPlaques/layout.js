define({
    _BASE_RESULTPLAQUES: {
        children: ["resultPlaques"]
    },
    /*
     * INTRO
     */
    resultPlaques: {
        type: "rectangle",
        children: ["winPlaque", "losePlaque", "viewResultButton", "okButton"],
        x: 0,
        y: 0,
        width: 1440,
        height: 1600,
        fill: 0x000000,
        fillAlpha: 0.8
    },
        /*
         * Win
         */
        winPlaque: {
            type: "container",
            portrait: {
                x: 0,
                y: 0
            },
            landscape: {
                x: 0,
                y: 30
            },
            children: ["burst2", "burst3", "winPopUp"]
        },
            burst2: {
                type: "sprite",
				portrait: {
					x: 450,
					y: 800,
				},
				landscape: {
					x: 720,
					y: 405
				},
                anchor: 0.5,
                scale: 2,
                texture: "popUpWinSunBurst"
            },
			burst3: {
				type: "sprite",
				portrait: {
					x: 450,
					y: 800,
					scale: 2
				},
				landscape: {
					x: 720,
					y: 405
				},
                anchor: 0.5,
                scale: 2,
				texture: "popUpWinSunBurst"
			},
            winPopUp: {
                type: "container",
				portrait: {
					x: 450,
					y: 720
				},
				landscape: {
					x: 720,
                    y: 371,
                    scale: 0.86
				},
                children: ["popUpWinBG", "popUpBigWinBG", "popUpWinPrize"]
            },
                popUpWinBG: {
                    type: "container",
                    x: 0,
                    y: 0
                },
                popUpBigWinBG: {
                    type: "container",
                    x: 0,
                    y: 0
                },
                popUpWinPrize: {
					type: "text",
					style: "popUpPrize",
					string: "",
					anchor: 0.5,
					rotation: -0.0916297857297023,
					x: -1,
					y: -88
                },
        losePlaque: {
            type: "container",
            children: ["losePopUp"],
			portrait: {
				x: 0,
				y: 0
			},
			landscape: {
				x: 0,
				y: 30
			}
        },
            losePopUp: {
                type: "container",
                portrait: {
					x: 450,
                    y: 720,
                    scale: 1
				},
				landscape: {
					x: 720,
                    y: 371,
                    scale: 0.88
				},
                children: ["popUpLoseBG"]
            },
                popUpLoseBG: {
                    type: "container",
                    x: 0,
                    y: 0
                },
        viewResultButton: {
            type:           "button",
            portrait: {
                x:          286,
                y:          943,
                scale:		1
            },
            landscape: {
                x:          555,
                y:          654,
                scale:      1
            },
            string:         "button_viewResult",
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
        okButton: {
            type:           "button",
            portrait: {
                x:          620,
                y:          943,
                scale: 		1
            },
            landscape: {
                x:          883,
                y:          654,
                scale:      1
            },
            string:         "button_ok",
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
        }
});