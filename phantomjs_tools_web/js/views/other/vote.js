define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'text!templates/vote.html',
	'libs/function.common'
	], function ($, _, Backbone, voteTemplate) {

    var view = Backbone.View.extend({
        el: $("#page"),
        opts: {
        	user_id: '',
		    url: "",
		    page:1
        },
        initialize: function () {
        	//$('body').append(voteTemplate);
        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        },
        startVote: function()
		{
        	//curl --data "ID=1963&page=10&yname=&lie2=小红帽长沙星城国际幼儿园&file1=xiaolianbb_ll7&name1=" http://www.zgxhm.com/xiaolianbb_taobiao.asp
			$('form[name=form1963]').submit();
			//alert($("form[name=form1963]").attr("ID"));
			alert($('body').text());
			alert('timeout:>');
			
        	/*_this = this;
			$.ajax({
				url: _this.opts.url,
				type: 'POST',
				data: 'ID=1963&page=10&yname=&lie2=小红帽长沙星城国际幼儿园&file1=xiaolianbb_ll7&name1=',//$("#loginForm",document.getElementById('main').contentDocument).serialize(),
				async: true,
				dataType: 'html',
				timeout: 30000,
				error:function(jqXHR, textStatus, errorThrown)
				{
					alert(JSON.stringify(jqXHR),textStatus, errorThrown);
					alert('t2imeout:>'+_this.opts.url);
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
			});*/
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
