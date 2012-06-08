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
        startVote: function()
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
					setTimeout(function(){_this.startVote();}, 1000);
				}
				,
				success: function(result){
					if(1 || result.indexOf('"currentPageNum":'+_this.opts.page) != -1)
					{
						console.log(result);
						setTimeout(function(){_this.startVote();}, 1000);
					}
				}
			});
		},
		f5: function()
		{
			_this = this;
			$.ajax({
				url: _this.opts.url,
				type: 'GET',
				//data: $("#loginForm",document.getElementById('main').contentDocument).serialize(),
				async: true,
				dataType: 'html',
				timeout: 3000,
				error:function()
				{
					alert('timeout:>'+_this.opts.page);
					setTimeout(function(){_this.f5();}, 1000);
				}
				,
				success: function(result){
					if(1)
					{
						_this.opts.page++;
						console.log(_this.opts.page);
						setTimeout(function(){_this.f5();}, 1000);
					}
				}
			});
		},
        render: function () {
         
        }
    });
    return new view;
});
