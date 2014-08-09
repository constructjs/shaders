/**
 * @name construct.shaders
 * A construct.js extension for shader management
 *
 * Version: 0.1.0 (Sat, 09 Aug 2014 11:56:28 GMT)
 * Homepage: https://github.com/constructjs/shaders
 *
 * @author makesites
 * Initiated by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license MIT license
 */

 (function(){
	// exit now if contruct hasn't already been defined
	if(typeof construct == "undefined") return;


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


function extendMain3D(){

	// add the appropariate events based on the input methods initialized
	var types = construct.options.shaders || [];
	var events = {};
	// lookup input types
	if( types.indexOf("rift") > -1 ) {
	}

	// save parent
	var Main3D = APP.Views.Main3D;

	APP.Views.Main3D = Main3D.extend({

		options: {
			worldScale: 1,
			shaders: construct.options.shaders
		},

		events: events,

		shaders: new Backbone.Model(),
/*
		initialize: function( options ){

			return Main3D.prototype.initialize.call(this, options);
		},
*/
		_start: function( $3d ){
			// Here is the effect for the Oculus Rift
			if( _.inArray("rift", this.options.shaders) ){
				// worldScale 100 means that 1 Units == 1m
				var rift = new THREE.OculusRiftEffect( $3d.renderer, { worldScale: this.options.worldScale } );
				rift.setSize( window.innerWidth, window.innerHeight ); // is there a chance this should be contained to the viwe dimensions?
				this.shaders.set({ rift: rift });
			}
			return Main3D.prototype._start.call(this, $3d);
		},

		update: function( e ){
			// prerequisite #1
			var shaders = this.shaders.attributes;
			if( _.isEmpty( shaders ) ) return;
			// Oculus Rift effect
			var scene = this.$3d.active.scene;
			var camera = this.$3d.active.camera;
			// prerequisite #2
			if( !scene || !camera ) return;
			// loop through shaders
			for( var i in shaders ){
				shaders[i].render( scene, camera );
			}
		}

	});

}
function extendMesh(){

	var Parent = APP.Mesh;

	APP.Mesh = Parent.extend({

		shaders: new Backbone.Model()
/*
		_start: function( options ){

			return Parent.prototype._start.call( this, options );
		},
*/
	});


}

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



	// Update views after dependencies are loaded
	construct.promise.add(function(){
		extendMain3D();
		extendMesh();
	});

})();
