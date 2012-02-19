// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/taobao/comment',
	'views/taobao/jie'
	], function (
	$, 
	_, 
	Backbone, 
	optionModel, 
	taobaoCommentView,
	taobaoJieView
	) {

	var actions = function(options) {

		switch(options.route)
		{
			case 'taobao.comment':		
				taobaoCommentView.setOptions({'user_id':options.user_id,'page':options.page});
				taobaoCommentView.getContent();
				break;
			case 'taobao.jie':				
				taobaoJieView.getContent();
				break;
		}
	}
	
    var initialize = function () {
			optionModel.getOption(actions);
			//console.log(optionModel.defaults);
        };	
    return {
        initialize: initialize
    };
});
