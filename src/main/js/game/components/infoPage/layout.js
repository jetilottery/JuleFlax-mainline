define({
    _BASE_INFO: {
        children: ["infoBase"]
    },
    infoBase: {
        type: "container",
        children: ["bgInfo", "scrollBar", "titleBar"]
    },

    /*
     * Background
     */
    titleBar: {
        type: "rectangle",
        children: ["titleBarTitle", "infoCloseButton"],
        fillAlpha: 1,
        fill: 0x00b3e9,
        landscape: { width: 1440 },
        portrait: { width: 900 },
        height: 50
    },
        titleBarTitle: {
            type: "text",
            style: "infoTitle",
            anchor: 0.5,
            landscape: { x: 720 },
            portrait: { x: 450 },
            y: 25,
            string: "infoTitle"
        },
        infoCloseButton: {
            type: "button",
            landscape:      { x: 1415 },
            portrait:       { x: 875 },
            y: 25,
            textures: {
                enabled:    "infoClose",
                over:       "infoClose",
                pressed:    "infoClose",
                disabled:   "infoClose"
            }
        },
    scrollBar: {
        type: "rectangle",
        children: ["scrollPosition"],
        fillAlpha: 0.3,
        fill: 0xAAAAAA,
        landscape: {
            x: 1410,
            width: 30,
            height: 760
        },
        portrait: {
            x: 870,
            width: 30,
            height: 1550,
            alpha: 0
        },
        y: 50
    },
        scrollPosition: {
            type: "rectangle",
            fillAlpha: 0.3,
            fill: 0xAAAAAA,
            x: 0,
            y: 0,
            width: 30,
            height: 60
        },



	bgInfo: {
        type: "rectangle",
        children: ["bgInfo0", "bgInfo1"],
        fillAlpha: 0.8,
        fill: 0x27567b,
        landscape: {
            width: 1440,
            height: 810
        },
        portrait: {
            width: 900,
            height: 1600
        },
        x: 0,
        y: 0
    },

	bgInfo0: {
		type: "sprite",
		texture: "game2Panel",
		anchor: 0.5,
		landscape: { x: 720, y: 300 },
		portrait: { x: 450, y: 590 }
	},

	bgInfo1: {
		type: "container",
		children: ["gameVersion", "helpTitle", "help", "payTableTitle", "payTable", "oddsLabel0", "oddsLabel1", "oddsLabel2"]
	},
		gameVersion: {
			type: "text",
			style: "versionText",
				landscape: {
				x: 0,
				y: 51
			},
			portrait: {
				x: 0,
				y: 51
			},
			maxWidth: 60,
			alpha: 0.3
		},
        helpTitle: {
            type: "container",
            children: ["helpTitleIcon", "helpTitleText"],
            landscape:  { x: 600 },
            portrait:    { x: 335 },
            y: 75
        },
            helpTitleIcon: {
                type: "sprite",
                x: 0,
                y: 0,
                texture: "menu"
            },
            helpTitleText: {
                type: "text",
                style: "infoSubTitle",
                x: 55,
                y: 4,
                string: "helpTitle0"
            },
        help: {
            type: "rectangle",
            children: ["helpTitle0", "help0", "helpIcon", "helpTitle1", "help1"],
            fillAlpha: 0.3,
            fill: 0x000000,
            lineWidth: 4,
            lineColor: 0xFFFFFF,
            radius: 6,
            landscape: {
                width: 1404,
                height: 450
            },
            portrait: {
                width: 864,
                height: 450
            },
            x: 18,
            y: 143
        },
            helpTitle0: {
                type: "text",
                style: "helpHeader",
                x: 18,
                y: 24,
                string: ""
            },
			help0: {
				type: "text",
				style: "helpText",
				x: 18,
				y: 68,
				wordWrap: true,
				landscape: {
					string: "help0_landscape",
					wordWrapWidth: 1388
				},
				portrait: {
					string: "help0_portrait",
					wordWrapWidth: 848
				}
			},
			helpIcon: {
				type: "sprite",
				texture: "scratchBaseSpecial",
				scale: 0.35,
				landscape: {
					x: 718,
					y: 55
				},
				portrait: {
					x: 720,
					y: 55
				}
			},
            helpTitle1: {
                type: "text",
                style: "helpHeader",
                landscape: {
					x: 18,
					y: 180
				},
                portrait: {
					x: 18,
					y: 180
				},
                string: "helpTitle1"
            },
            help1: {
                type: "text",
                style: "helpText",
                wordWrap: true,
                landscape: {
					x: 18,
                    y: 270,
                    wordWrapWidth: 1388,
                    string: "help1_landscape"
                },
                portrait: {
					x: 18,
                    y: 270,
                    wordWrapWidth: 848,
                    string: "help1_portrait"
                }
            },
        payTableTitle: {
            type: "container",
            children: ["payTableTitleIcon", "payTableTitleText"],
            landscape:  { x: 600, y: 640},
            portrait:    { x: 335, y: 640}
        },
            payTableTitleIcon: {
                type: "sprite",
                x: 0,
                y: 0,
                texture: "cup"
            },
            payTableTitleText: {
                type: "text",
                style: "infoSubTitle",
                x: 55,
                y: 4,
                string: "payTableTitle"
            },
        payTable: {
            type: "rectangle",
            children: [
                "payTableBar0",
                "payTableBar1",
                "payTableBar2",
                "payTableBar3",
                "payTableBar4",
                "payTableVerticalBar",
                "payTableTitle0",
                "payTableTitle1",
                "payTableP0",
                "payTableP1",
                "payTableP2",
                "payTableP3",
                "payTableP4",
                "payTableP5",
                "payTableP6",
                "payTableP7",
                "payTableP8",
                "payTableP9",
                "payTableV0",
                "payTableV1",
                "payTableV2",
                "payTableV3",
                "payTableV4",
                "payTableV5",
                "payTableV6",
                "payTableV7",
                "payTableV8",
                "payTableV9"
            ],
            fillAlpha: 0.3,
            fill: 0x000000,
            lineWidth: 4,
            lineColor: 0xFFFFFF,
            radius: 6,
            landscape: {
				x: 199,
                y: 734,
                width: 1388,
                height: 530,
				scale: 0.78
            },
            portrait: {
				x: 18,
                y: 734,
                width: 848,
                height: 530,
				scale: 1
            }
        },
            payTableBar0: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 50,
                landscape: { width: 1388 },
                portrait: { width: 848 },
                height: 48
            },
            payTableBar1: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 146,
                landscape: { width: 1388 },
                portrait: { width: 848 },
                height: 48
            },
            payTableBar2: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 242,
                landscape: { width: 1388 },
                portrait: { width: 848 },
                height: 48
            },
            payTableBar3: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 338,
                landscape: { width: 1388 },
                portrait: { width: 848 },
                height: 48
            },
            payTableBar4: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 434,
                landscape: { width: 1388 },
                portrait: { width: 848 },
                height: 48
            },
            payTableVerticalBar: {
                type: "rectangle",
                fillAlpha: 0,
                fill: 0x000000,
                landscape: { x: 381 },
                portrait: { x: 301 },
                y: 0,
                width: 4,
                height: 530
            },
            payTableTitle0: {
                type: "text",
                style: "payTableHeader",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 26,
                string: "payTableHeader0"
            },
            payTableTitle1: {
                type: "text",
                style: "payTableHeader",
                anchor: 0.5,
                landscape: { x: 1020 },
                portrait: { x: 656 },
                y: 26,
                string: "payTableHeader1"
            },
            payTableP0: {
                type: "text",
                style: "payTableText0",
                string: "payTableP0",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 76
            },
            payTableP1: {
                type: "text",
                style: "payTableText1",
                string: "payTableP1",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 124
            },
            payTableP2: {
                type: "text",
                style: "payTableText0",
                string: "payTableP2",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 172
            },
            payTableP3: {
                type: "text",
                style: "payTableText1",
                string: "payTableP3",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 220
            },
            payTableP4: {
                type: "text",
                style: "payTableText0",
                string: "payTableP4",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 268
            },
            payTableP5: {
                type: "text",
                style: "payTableText1",
                string: "payTableP5",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 316
            },
            payTableP6: {
                type: "text",
                style: "payTableText0",
                string: "payTableP6",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 364
            },
            payTableP7: {
                type: "text",
                style: "payTableText1",
                string: "payTableP7",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 412
            },
            payTableP8: {
                type: "text",
                style: "payTableText0",
                string: "payTableP8",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 460
            },
            payTableP9: {
                type: "text",
                style: "payTableText1",
                string: "payTableP9",
                anchor: 0.5,
                landscape: { x: 356 },
                portrait: { x: 219 },
                y: 508
            },
            payTableV0: {
                type: "text",
                style: "payTableText0",
                string: "payTableV0",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 76
            },
            payTableV1: {
                type: "text",
                style: "payTableText1",
                string: "payTableV1",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 124
            },
            payTableV2: {
                type: "text",
                style: "payTableText0",
                string: "payTableV2",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 172
            },
            payTableV3: {
                type: "text",
                style: "payTableText1",
                string: "payTableV3",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 220
            },
            payTableV4: {
                type: "text",
                style: "payTableText0",
                string: "payTableV4",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 268
            },
            payTableV5: {
                type: "text",
                style: "payTableText1",
                string: "payTableV5",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 316
            },
            payTableV6: {
                type: "text",
                style: "payTableText0",
                string: "payTableV6",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 364
            },
            payTableV7: {
                type: "text",
                style: "payTableText1",
                string: "payTableV7",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 412
            },
            payTableV8: {
                type: "text",
                style: "payTableText0",
                string: "payTableV8",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 460
            },
            payTableV9: {
                type: "text",
                style: "payTableText1",
                string: "payTableV9",
                anchor: 0.5,
                landscape: { x: 1020},
                portrait: { x: 656 },
                y: 508
            },
        oddsLabel0: {
            type: "text",
            style: "odds",
            string: "odds0",
            anchor: 0.5,
            landscape: { x: 720, y: 1200 },
            portrait: { x: 450, y: 1350 }
        },
        oddsLabel1: {
            type: "text",
            style: "odds",
            string: "odds1",
            anchor: 0.5,
            landscape: { x: 720, y: 1270 },
            portrait: { x: 450, y: 1420 }
        },
        oddsLabel2: {
            type: "text",
            style: "odds",
            string: "odds2",
            anchor: 0.5,
            landscape: { x: 720, y: 1340 },
            portrait: { x: 450, y: 1490 }
        }
});