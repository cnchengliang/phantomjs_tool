//node r.js -o app/js/app.build.js

//dir
/*
({
    appDir: "../",
    baseUrl: "js/",
    dir: "../../built",

    paths: {
		loader: 'libs/loader',
		jQuery: 'libs/jquery/loader',
		Underscore: 'libs/underscore/loader',
		Backbone: 'libs/backbone/loader',
		templates: '../templates'
	},
	modules: [
        //Optimize the application files. 
        {
            name: "main"
        }
    ]
})*/

//single file

({
    baseUrl: "./",
    paths: {
		loader: 'libs/loader',
		jQuery: 'libs/jquery/loader',
		Underscore: 'libs/underscore/loader',
		Backbone: 'libs/backbone/loader',
		templates: '../templates'
	},
	name: "main",
	namespace: "myGlobalRequire",
	uglify: {
        beautify: false
    },
	out: "../../main_built.js"
})
