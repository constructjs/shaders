	construct.shaders = function( options ){
		// options is an array...
		options = options || [];
		//console.log(options);

		// lookup options
		if( options.indexOf("rift") > -1 ) {
			construct.config.deps.push("three-oculus");
		}
		// save options
		Object.extend(construct.options, { shaders: options });

		return function( e ){
			//console.log( "update" );
		};

	};
