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
//pangjiu	胖9点
user_id = '49584334';
//sszn	时尚指南
user_id = '103195305';
//rifangu	日蕃谷
user_id = '74986823';
//xiaotaiyang	太阳屋
user_id = '43779244';
//echo2434	美女的大衣柜
user_id = '18098508';
//52cici
user_id = '103915621';
//linda-fashion
user_id = '97627132';
//xixihere	西西和
user_id = '11552165';
//amii
user_id = '17962636';
//wmdw
user_id = '95976576';
//lovefish100
user_id = '67361364';
//shop10771490
user_id = '10771490';
//hhhit
user_id = '13261504';
//shop35325787
user_id = '64451065';
//anshutong	十月传奇
user_id = '10821859';
//mois
user_id ='310000';
//lanlandm	兰兰的小屋
user_id = '24082492';
//mmtt	木棉天堂
user_id = '49141352';
//abc123	燕子城堡
user_id = '54779859';
//youjianxiaoxi
user_id = '106207503';
//myelsa	爱莎
user_di = '17749025';
//baibai2010
user_id = '26784';
//meilaiyanqu
user_id = '200983346';
//gdhouse
user_id = '25333869';
//qianqian123
user_id = '89222714';
//md1916
user_id ='60526855';
//wakeup
user_id = '127082056';
//izz
user_id = '21659330';
//happy123
user_id = '33283';
//yasako
user_id = '102890';
//52mlmm
user_id = '82960950';
//ccstyle
user_id = '56104664';
//livas
user_id = '21411712';
//52youjia
user_id = '114971928';
//mlxy010
user_id = '45429913';
//lxbl168
user_id = '215205064';
//jinxi
user_id = '82576001';
//mirrorfun
user_id = '22216155';
//butoucun
user_id = '1011';
//1900man
user_id = '88506080';
//shop36313378
user_id = '127089414';
//9mgcn
user_id = '73900259';
//liangsanshi
user_id = '25004642';
//lrcp
user_id = '36174144';
//rainierbaby
user_id = '1518126';
//tsza77
user_id = '352197264';
//imaiyi
user_id = '15657501';
//catworld
user_id = '60993955';
//mayiazhai
user_id = '13225714';
//judyroom
user_id = '4509';
//koudai
user_id = '40116255';
//danyige
user_id = '38092091';
//9876543210
user_id = '62004902';
//yxjy
user_id = '11714174';
//qiutian168
user_id = '20235535';
//d1p1
user_id = '103096605';
//asando
user_id = '22438470';
//tbvivica
user_id = '46161045';
//aiaiwan
user_id = '46216288';
//welcom
usre_id = '117538404';
//taoshirtw
user_id = '544148357';
//yiyayou
user_id = '188653804';
//tomgoods
user_id = '56249258';
//manyz
user_id = '23476856';
//0573ms
user_id = '292583297';
//suuma
user_id = '15099881';
//osha
user_id = '52614644';
//iwswm
user_id = '98942987';
//hdys
user_id = '37350';



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
