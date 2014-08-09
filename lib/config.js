
	// Dependencies
	construct.config = Object.extend(construct.config, {
		"paths": {
			"three-oculus" : [
				"//rawgit.com/constructjs/shaders/master/deps/OculusRiftEffect"
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
