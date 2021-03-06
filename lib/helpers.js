
	// Helpers

	// underscore helpers
	_.mixin({
		inArray: _.inArray || function(value, array){
			return array.indexOf(value) > -1;
		},
		// - Check if in debug mode (requires the existence of a global DEBUG var)
		// Usage: _.inDebug()
		inDebug : _.inDebug || function() {
			return ( typeof DEBUG != "undefined" && DEBUG );
		}
	});
