/**
 * @author flimshaw / http://charliehoey.com
 *
 * Technicolor Shader
 * Simulates the look of the two-strip technicolor process popular in early 20th century films.
 * More historical info here: http://www.widescreenmuseum.com/oldcolor/technicolor1.htm
 * Demo here: http://charliehoey.com/technicolor_shader/shader_test.html
 */

THREE.Technicolor3Shader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"hue": { type: "f", value: 1.},
		"saturation": { type: "f", value: .6 }
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float hue;",
		"uniform float saturation;",
		"varying vec2 vUv;",

		// hue
		"float angle = hue * 3.14159265;",
		"float s = sin(angle), c = cos(angle);",
		"vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;",
		"float len = length(gl_FragColor.rgb);",
/*
		"float max(float v1, float v2) { ",
			"if(v1 > v2) {",
				"return v1;",
			"} else {",
				"return v2;",
			"}",
		"}",
*/
		"void main() {",

			"vec4 tex = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );",
			
			/*"vec4 cyanTex = vec4(0., tex.r, tex.r, 1.0);",
			"vec4 yellowTex = vec4(tex.b, tex.b, 0.,  1.0);",
			"vec4 magentaTex = vec4(tex.g, 0., tex.g,  1.0);",*/

			//"gl_FragColor = vec4(max(yellowTex.r, magentaTex.r), max(cyanTex.g, yellowTex.g), max(cyanTex.b, magentaTex.b), 1.0);",
			"gl_FragColor = vec4(max(tex.b, tex.g), max(tex.r, tex.b), max(tex.r, tex.g), 1.0);",
			// saturation
			"float average = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;",
			"if (saturation > 0.0) {",
				"gl_FragColor.rgb += (average - gl_FragColor.rgb) * (1.0 - 1.0 / (1.001 - saturation));",
			"} else {",
				"gl_FragColor.rgb += (average - gl_FragColor.rgb) * (-saturation);",
			"}",

			// hue
			"gl_FragColor.rgb = vec3(",
				"dot(gl_FragColor.rgb, weights.xyz),",
				"dot(gl_FragColor.rgb, weights.zxy),",
				"dot(gl_FragColor.rgb, weights.yzx)",
			");",



		"}"

	].join("\n")

};