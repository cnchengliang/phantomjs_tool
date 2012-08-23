// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/taobao/comment',
	'views/taobao/jie',
	'views/cs8684/bus',
	'views/other/vote',
	'views/other/tool'
	], function (
	$, 
	_, 
	Backbone, 
	optionModel, 
	taobaoCommentView,
	taobaoJieView,
	cs8684View,
	otherVoteView,
	otherToolView
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
			case 'cs8684':				
				cs8684View.getRoute();
				break;
			case 'other.vote':
				otherVoteView.setOptions({'url':options.url});
				otherVoteView.startVote();
				break;
			case 'other.f5':
				otherVoteView.setOptions({'url':options.url});
				otherVoteView.f5();
				break;
			case 'other.tool':
				switch(options.action.action)
				{
					case 'auto_get_content':otherToolView.auto_get_content(options.action.row_xpath,options.action.cols,options.action.attr);break;
					case 'auto_click':otherToolView.auto_click(options.action.xpath);break;
				}
				
				break;				
		}
	}
	$(window).bind('hashchange', function() {
		optionModel.getOption(actions);
	});
    var initialize = function () {
			optionModel.getOption(actions);
			//console.log(optionModel.defaults);
        };	
    return {
        initialize: initialize
    };
});
