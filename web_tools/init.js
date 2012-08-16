//python ../pyphantomjs.py --cookies-file=cookies.txt --load-images=no --ignore-ssl-errors=yes init.js taobao.comment

var url = '',params = {},cur_option = {},data = '',read_flag = 0,write_flag = 1,intervalId;

if (phantom.args.length === 0) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
} else {
	param_str = phantom.args[0].replace(/&apos;/g, "'");
	params = JSON.parse(param_str);
	url = params.url;
	cur_option = params.option;
}

/*
var options = getOptions("options.js");
eval('var cur_option = options.'+route);
phantom.setPort(cur_option.port);


var proxy = get_vars(cur_option.proxy_file);
var proxy_cur = 0;
phantom.setProxy(proxy[proxy_cur]);
var urls = cur_option.urls;
//urls = get_vars('tmp_urls');
var url_cur = 0;*/
var page = require('webpage').create();
var server = require('webserver').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7';
var loaded = false;

//消息提示console
page.onConsoleMessage = function (msg, line, source) {
	var content = msg;
	if(content.indexOf('phantomjs_finished') != -1)
	{
		console.log('finished');
		phantom.exit();
	}else if(content.indexOf("zmq_result") != -1)
	{
		content = content.replace("zmq_result","");
		//console.log('content> ' + content);
		phantom.push2Client(content);
	}else if(content.indexOf("file_result") != -1)
	{
		content = content.replace("file_result","");
		write2file("temp.txt",content+"\n");
	}else if(content.indexOf("sse_result") != -1)
	{
		if(write_flag == 1 && data == '')
	    {
			read_flag = 0;
	    	data = content;
	    	read_flag = 1;
	    }else
	    {
	    	setTimeout(function(){
	    		if(write_flag == 1 && data == '')
	    	    {
	    			read_flag = 0;
	    	    	data = content;
	    	    	read_flag = 1;
	    	    }else
    	    	{
	    	    	write2file("log.txt",data+"---"+content+"\n");
    	    	}
	    	},1000);
	    }
		
	}else
	{
		console.log('console> ' + content);
	}
};

//alert
page.onAlert = function (msg) {
     if(msg.indexOf('timeout') != -1)
     {
     	proxy_cur++;
     	var cur = proxy_cur%proxy.length;
     	phantom.setProxy(proxy[cur]);
     	console.log('proxy_cur> ' + proxy[cur]);page.open(urls[url_cur]);
     }else if(msg == "quit")
     {
     	//第一个站点采集完成后处理
     	if(urls.length == url_cur+1)
     	{
     		console.log('finished');
			phantom.exit();
		}else
		{
			url_cur++;
			console.log("url_cur:"+url_cur);			
			page.open(urls[url_cur]);
		}
     }else
     {
     	console.log(msg);
     }
 };

evaluateWithVars = function(page, func, vars)
{
	var fstr = func.toString();
	for(var v in vars)
	{
		switch(typeof(vars[v]))
		{
			case "string":
				var tmp = vars[v].replace(/[']/g, "\\'");
				fstr = fstr.replace("_VARS_"+v, "'"+tmp+"'");
				break;
			default:
				fstr = fstr.replace("_VARS_"+v, vars[v]);
		}
	}
	return page.evaluate(fstr)
}

page.onLoadFinished = function (status) {
    console.log('status :'+status);
	if (status !== 'success') {
        //console.log('Unable to access network');
        //phantom.exit();
    } else if(!loaded){
    	loaded = true;
    	console.log('loading js...');
		evaluateWithVars(
			page,
			function() { document.phantomjs_option = JSON.parse(_VARS_option); },
			{ "option": JSON.stringify(cur_option) }
		);
		page.injectJs('libs/require/myrequire.js');
		page.injectJs('main_built.js');
    }
};

page.onInitialized = function () {
    loaded = false;
};
/*
page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function (response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
*/

var port = 9080;
var listening = server.listen(port, function (request, response) {
	// we set the headers here
	response.statusCode = 200;
	if(request.url == '/exit')
	{		
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('bye~');
	    response.close();
		phantom.exit();
	}else if(request.url == '/route')
	{
		cur_option.row_xpath = "//title";
		evaluateWithVars(
			page,
			function() { document.phantomjs_option = JSON.parse(_VARS_option);document.location.hash = '#' + (new Date()).getTime(); },
			{ "option": JSON.stringify(cur_option) }
		);
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('route');
	    response.close();
	}else
	{
		var id,num = 1;
		response.headers = {"Cache": "no-cache", "Content-Type": "text/event-stream"};
		var intervalId = setInterval(function(){
			id = (new Date()).getTime();			
		    if(read_flag == 1 && data != '')
		    {
		    	write_flag = 0;
		    	response.write("id:"+id+"\ndata:"+data.replace(/\"/g, "\"")+"\n\n");
		    	data = '';
		    	write_flag = 1;
		    	num = 1;
		    }else
		    {
		    	if(data == '' && num%1000 == 0)
		    	{
		    		//clearInterval(intervalId);
			    	//response.close();
		    	}
		    	num++;		    	
		    }		    
		},10);
		
	}
});
if (!listening) {
    console.log("could not create web server listening on port " + port);
    phantom.exit();
}

page.open(url);


function getOptions(filename)
{
	var result = {};
	var fs = require("fs");
	try {
		f = fs.open(filename, "r");
		content = f.read();
		result = JSON.parse(content);
		f.close();
	} catch (e) {
		console.log(e);
	}
	return result;
}

function get_vars(filename)
{
	var result = [];
	var fs = require("fs");
	try {
		f = fs.open(filename, "r");
		content = f.read();
		//console.log(content);
		content = content.split("\n");
		//result = content.splice(0,1);
		
		for(var i=0,n=content.length;i<n;i++)
			if(content[i] != '')
				result[result.length] = content[i];
		f.close();
		/*
		f = fs.open('urls.txt', "w");
		f.write(content.join("\n"));
		f.close();*/
	} catch (e) {
		console.log(e);
	}
	return result;
}

function write2file(filename,content)
{
	var fs = require("fs");
	try {
		f = fs.open(filename, "a+");
		f.write(content);
		f.close();
	} catch (e) {
		console.log(e);
	}
}
