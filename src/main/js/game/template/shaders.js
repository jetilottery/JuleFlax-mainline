define(function(require) {
	const PIXI = require("com/pixijs/pixi");

	let shaders = {};

	shaders.init = function init() {
		let snow = {
			uniformConfig: {
				time: {
					type: "f",
					value: 0.0
				},
				alpha: {
					type: "f",
					value: 0.0
				}
			},
			vert: "",
			frag: "precision highp float;\n" +
			"varying vec2 vTextureCoord;\n" +
			"uniform sampler2D uSampler;\n" +
			"uniform vec2 dimensions;\n" +
			"uniform vec4 filterArea;\n" +
			"uniform float time;\n" +
			"uniform float alpha;\n" +
			"#define _totalFlakes 50\n" +
			"#define _windSpeed 0.2\n" +
			"float rnd(float x) {\n" +
			"    return fract(sin(dot(vec2(x+47.49,38.2467/(x+2.3)), vec2(12.9898, 78.233)))* (43758.5453));\n" +
			"}\n" +
			"void main() {\n" +
			"    float j;\n" +
			"	 vec4 color = texture2D(uSampler, vTextureCoord);\n" +
			"    for(int i = 0; i <_totalFlakes; i++) {\n" +
			"        j = float(i);\n" +
			"        float speed = 0.3+rnd(cos(j))*(0.7+0.5*cos(j/(float(_totalFlakes)*0.25)));\n" +
			"        vec2 center = vec2((0.25-vTextureCoord.y)*_windSpeed+rnd(j)+0.1*cos(time+sin(j)), mod(sin(j)+speed*(time*1.5*(0.1+_windSpeed)), 0.65));\n" +
			"        color += vec4(alpha*0.39*(1.0 - smoothstep(0.0, 0.001+speed*0.006, length(vTextureCoord - center))));\n" +
			"    }\n" +
			"	 gl_FragColor = color;\n" +
			"}\n",
			filter: null
		};
		snow.filter = new PIXI.Filter(null, snow.frag, snow.uniformConfig);
		PIXI.ticker.shared.add(() => {
			snow.filter.uniforms.time += PIXI.ticker.shared.elapsedMS / 1000;
		});
		shaders.snow = snow.filter;

		delete shaders.init;
	};

	return shaders;
});