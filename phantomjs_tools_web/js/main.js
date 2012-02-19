// Filename: main.js

var cnf = {
	paths: {
        loader: 'libs/loader',
        jQuery: 'libs/jquery/loader',
        Underscore: 'libs/underscore/loader',
        Backbone: 'libs/backbone/loader',
        templates: '../templates'
    }
};

typeof require == 'undefined'?myGlobalRequire.require.config(cnf):require.config(cnf);

typeof requirejs == 'undefined'?requirejs=myGlobalRequire.requirejs:'';
typeof require == 'undefined'?require=myGlobalRequire.require:'';
typeof define == 'undefined'?define=myGlobalRequire.define:'';
	

require([

	// Load our app module and pass it to our definition function
	'app',

	// Some plugins have to be loaded in order due to their non AMD compliance
	// Because these scripts are not "modules" they do not pass any values to the definition function below
	], function (App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});
