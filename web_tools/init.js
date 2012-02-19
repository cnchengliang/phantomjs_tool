//python ../pyphantomjs.py --cookies-file=cookies.txt --load-images=no --ignore-ssl-errors=yes init.js taobao.comment

var route = '';

if (phantom.args.length === 0) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
} else {
    route = phantom.args[0];
}


var options = getOptions("options.js");
eval('var cur_option = options.'+route);
phantom.setPort(cur_option.port);


var proxy = get_vars(cur_option.proxy_file);
var proxy_cur = -1;
var urls = cur_option.urls;
//urls = get_vars('tmp_urls');
var url_cur = 0;
var page = new WebPage();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7';
var loaded = false;
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
	}else
	{
		console.log('console> ' + content);
	}
};
page.onAlert = function (msg) {
     if(msg.indexOf('timeout') != -1)
     {
     	proxy_cur++;
     	var cur = proxy_cur%proxy.length;
     	phantom.setProxy(proxy[cur]);
     	console.log('proxy_cur> ' + proxy[cur]);
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
	var fstr = func.toString()
	for(var v in vars)
	{
		switch(typeof(vars[v]))
		{
			case "string":
				fstr = fstr.replace("_VARS_"+v, "'"+vars[v]+"'")
				break
			default:
				fstr = fstr.replace("_VARS_"+v, vars[v])
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
    	//console.log('loading js...');
		evaluateWithVars(
			page,
			function() { document.phantomjs_option = JSON.parse(_VARS_option); },
			{ "option": JSON.stringify(cur_option) }
		);
		page.injectJs('myrequire.js');
		if(route == 'test')
			page.injectJs('test.js');
		else
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
page.open(urls[url_cur]);


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
