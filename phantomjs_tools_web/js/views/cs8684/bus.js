define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'text!templates/test.html',
	'libs/function.common'
	], function ($, _, Backbone, testTemplate) {

    var view = Backbone.View.extend({
        el: $("#page"),
        opts: {
        	user_id: '',
		    url: "",
		    page:1
        },
        initialize: function () {
        	//$('body').append(testTemplate);
        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        },
        getRoute: function()
		{
			_this = this;
			$.ajax({
				url: _this.opts.url,
				type: 'POST',
				//data: $("#loginForm",document.getElementById('main').contentDocument).serialize(),
				async: true,
				dataType: 'html',
				timeout: 3000,
				error:function()
				{
					alert('timeout:>'+_this.opts.page);
					
				}
				,
				success: function(result){
					if(1 || result.indexOf('"currentPageNum":'+_this.opts.page) != -1)
					{
						console.log(result);
						
					}
				}
			});
		},
		getStation: function()
		{
			_this = this;
			$.ajax({
				url: _this.opts.url,
				type: 'POST',
				//data: $("#loginForm",document.getElementById('main').contentDocument).serialize(),
				async: true,
				dataType: 'html',
				timeout: 3000,
				error:function()
				{
					alert('timeout:>'+_this.opts.page);
					
				}
				,
				success: function(result){
					if(1 || result.indexOf('"currentPageNum":'+_this.opts.page) != -1)
					{
						console.log(result);
						
					}
				}
			});
		},
        render: function () {
         
        }
    });
    return new view;
});
