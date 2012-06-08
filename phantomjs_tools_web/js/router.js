// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/taobao/comment',
	'views/taobao/jie',
	'views/test/vote'
	], function (
	$, 
	_, 
	Backbone, 
	optionModel, 
	taobaoCommentView,
	taobaoJieView,
	testVoteView
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
			case 'test.vote':
				testVoteView.setOptions({'url':options.url});
				testVoteView.startVote();
				break;
			case 'test.f5':
				testVoteView.setOptions({'url':options.url});
				testVoteView.f5();
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
