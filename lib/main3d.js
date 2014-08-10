
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
			worldScale: 1, // worldScale 1 means that 1 Units == 1m
			shaders: construct.options.shaders || [],
			hudID: "hud" // the hud of the id
		},

		events: events,

		shaders: new Backbone.Model(),
/*
		initialize: function( options ){

			// events
			$(this.el).on("update", _.bind(this._updateShaders, this));

			return Main3D.prototype.initialize.call(this, options);
		},
*/
		_start: function( $3d ){
			// Here is the effect for the Oculus Rift
			if( _.inArray("rift", this.options.shaders) ){
				var rift = new THREE.OculusRiftEffect( $3d.renderer, { worldScale: this.options.worldScale } );
				rift.setSize( window.innerWidth, window.innerHeight ); // is there a chance this should be contained to the viwe dimensions?
				this.shaders.set({ rift: rift });
				vrhtml.startWithoutNPVR( this.options.hudID ); // check if the id exists first?
			}

			return Main3D.prototype._start.call(this, $3d);
		},

		_updateShaders: function( e ){
			// this isn't working...

		},

		_update: function( e ){
			// variables
			var shaders = this.shaders.attributes;
			// get active
			var scene = this.$3d.active.scene;
			var camera = this.$3d.active.camera;
			// prerequisites
			if( !_.isEmpty( shaders ) && scene && camera ){
				// loop through shaders
				for( var i in shaders ){
					shaders[i].render( scene, camera );
				}
			}

			return Main3D.prototype._update.call(this, e);
		}
	});

}