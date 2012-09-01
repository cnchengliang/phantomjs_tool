define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'libs/function.common'
	], function ($, _, Backbone) {

    var otherToolView = Backbone.View.extend({
        el: $("#page"),
        initialize: function () {
            //this.bind("auto_get_content", this.auto_get_content);
            //$('body').append(mainHomeTemplate);
			/*
            this.collection = homeCollection.add({
                name: "Twitter"
            });*/
        },
        auto_get_content:function(row_xpath,cols,attr) {
        	/*
        	var args = [row_xpath,"",cols,attr];
        	var str = getNodeDetail(args);
			if(typeof str == 'undefined' || str == 'null')
				str = getNodeAttr(args);
			console.log(JSON.stringify({'sse_result':strTrim(str,'g')}));*/
        	
        	row_xpath = row_xpath.split(',');
			cols = cols.split(',');
			attr = attr.split(',');
			var fn = function(rows) {
				alert(JSON.stringify({'sse_result':rows}));
				alert('action_finished');
			}
			//nodes
			if(row_xpath.length == 1)
			{
				getRows([row_xpath,cols,attr],fn);
			}else
			{
				getRows_2([row_xpath,cols,attr],fn);
			}
        },
        auto_click:function(xpath) {
			var fn = function(ret) {
				if(ret)	alert('action_finished');
				else alert('action_error');
			}
			clickit(xpath,fn);
        }
    });
    return new otherToolView;
});
