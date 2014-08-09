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