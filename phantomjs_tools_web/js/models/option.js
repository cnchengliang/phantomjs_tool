define([
	'Underscore', 
	'Backbone'
	], function (_, Backbone) {
    var model = Backbone.Model.extend({
        defaults: {
            default_data: 'ok'
        },
        initialize: function () {},
		getOption: function(callback){
			if(1)
			{
				var options = document.phantomjs_option;
				callback(options);
			}	
		}

    });
    return new model;

});
