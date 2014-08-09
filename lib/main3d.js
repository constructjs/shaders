
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