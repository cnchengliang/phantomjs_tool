/*
//tianshizhicheng
var user_id = '217225';
//yunifang
user_id = '94298837';
//nala
user_id = '171367901';
//100f1
user_id = '279839';
//artka 阿卡
user_id = '12333767';
//tone 小虫米子
user_id = '12375520';
//sugargirl 七格格
user_id = '12149668';
//ripsky 裂帛
user_id = '27984093';
//fenhongdabuwawa
user_id = '22822030';
//99luna
user_id = '21750756';
//xiaoweitongxue
user_id = '43084091';
//mumuhome
user_id = '101208715';
//0077	柚子美衣
user_id = '1200778';
//72bianshishangwu	七十二变时尚屋
user_id = '247483';
//iwes	小怡靓衣
user_id = '10199638';
//ciaodafanfan	
user_id = '21968005';
//mimius
user_id = '50841317';
//pippa	眼袋自制
user_id = '25834894';
//xgj	西瓜家
user_id = '56651352';
//sszn	时尚指南
user_id = '103195305';

SELECT *,count(shopurl) FROM `taobao_jie_top` WHERE `type`="美容热卖排行榜" group by `shopurl` order by count(shopurl) desc
//afusjt	阿芙
user_id = '379250310';
//xybc	相宜本草
user_id = '90919986';
//zhuhengshao
user_id = '30452024';
//ty	天夷.芳草集
user_id = '94246074';
*/

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
		    url: "http://rate.taobao.com/member_rate.htm?rater=0&content=1&direction=0&identity=1&from=rate&isSeller=1&current_page=1&user_id=",
		    page: 1
        },
        initialize: function () {
        	//$('body').append(testTemplate);
        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        	this.opts.url += this.opts.user_id+"&page=";
        },
        getContent: function()
		{
			_this = this;
			$.ajax({
				url: _this.opts.url+_this.opts.page,
				type: 'GET',
				//data: $("#loginForm",document.getElementById('main').contentDocument).serialize(),
				async: true,
				dataType: 'html',
				timeout: 30000,
				error:function()
				{
					alert('timeout:>'+_this.opts.page);
					setTimeout(function(){_this.getContent();}, 10000);
				}
				,
				success: function(result){
					if(result.indexOf('"currentPageNum":'+_this.opts.page) != -1 || result.indexOf('currentPageNum') == -1 )
					{
						if(result.indexOf('"rateListDetail":[]') != -1)
						{
							console.log("phantomjs_finished");
						}else
						{
							result = result.replace("TB.rateList = ","zmq_result");
							console.log(result);							
							_this.opts.page++;
							setTimeout(function(){_this.getContent();}, 1000);
						}
					}
				}
			});
		},
        render: function () {
         
        }
    });
    return new view;
});
