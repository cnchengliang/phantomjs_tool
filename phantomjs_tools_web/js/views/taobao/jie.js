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
        },
        initialize: function () {
        	//$('body').append(testTemplate);
        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        },
        getContent: function()
		{
			var row_xpath_1 = "//div[@id='wrap']/div[1][@class='shop']/div[1][@class='shop-show floatleft']/div[2][@class='shop-info']/p[3][@class='third-row']/span[1][@class='wp']";
			var row_xpath_2 = "//div[@id='wrap']/div[1][@class='shop']/div[1][@class='shop-show floatleft']/div[1][@class='shop-name']/h2[@class='floatleft dib']/a";

			var arrStr = [];
			arrStr[arrStr.length] = getNodeDetail([row_xpath_1,"","","innerHTML"]);
			arrStr[arrStr.length] = getNodeDetail([row_xpath_2,"","","innerHTML"]);
			arrStr[arrStr.length] = getNodeDetail([row_xpath_2,"","","href"]);

			console.log("file_result" + arrStr.join(","));
			arrStr = null;

			alert("quit");
		},
        render: function () {
         
        }
    });
    return new view;
});
