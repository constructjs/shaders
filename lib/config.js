
	// Dependencies
	construct.config = Object.extend(construct.config, {
		"paths": {
			"three-oculus" : [
				"//rawgit.com/constructjs/shaders/master/deps/OculusRiftEffect"
			],
			"vrhtml" : [
				"//rawgit.com/constructjs/shaders/master/deps/vrhtml"
			]
		},
		"shim": {
			"three-oculus": {
				"deps": [
					"three-js"
				]
			}
		}
	});
