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
        	var args = [row_xpath,"",cols,attr];
        	var str = getNodeDetail(args);
			if(typeof str == 'undefined' || str == 'null')
				str = getNodeAttr(args);
			console.log(JSON.stringify({'sse_result':strTrim(str+row_xpath,'g')}));
        },
        getContent: function()
		{
			var row_xpath = strTrim($("#content_x").val(),"g");
			var cols = $("#content_y").val().split(',');
			var attr = $("#attr").val().split(',');
			var fn = function(rows) {
				var str = '';
				for (var i=0, len=rows.length; i < len; i++) {
					str += rows[i].join(",")+'\n';
				}
				$('#submit_result').text(str);
			}
			//nodes
			getRows([row_xpath,cols,attr],fn);
		}
    });
    return new otherToolView;
});
