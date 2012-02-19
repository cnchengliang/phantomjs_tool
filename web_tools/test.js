function waitFor(testFx, test_args, onReady, ready_args, timeOutMillis) {
	var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 30000, //< Default Max Timout is 10s
		start = new Date().getTime(),
		condition = false;
		var interval = null;
		interval = setInterval(
			function() {
				if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
					// If not time-out yet and condition not yet fulfilled
					condition = (typeof(testFx) === "string" ? eval(testFx) : testFx(test_args) != 'null'); //< defensive code
					
				} else {
					if(condition) {
						// Condition fulfilled (timeout and/or condition is 'true')
						typeof(onReady) === "string" ? eval(onReady) : onReady(ready_args); //< Do what it's supposed to do once the condition is fulfilled
						
					}else
					{
						console.log('waitfor_timeout');
					}					
					clearInterval(interval); //< Stop this interval
					interval = null;					
				}
			}
		, 1000); //< repeat check every 100ms
};

function getNodeDetail(args)
{
	var row_xpath = args[0],row_num = args[1],col_xpath = args[2],attr = args[3];
	var tmp = 'null';
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(row_xpath+row_num+col_xpath, document.documentElement, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(result && result.singleNodeValue)
	{
		if(attr === '')
		{
			tmp = result.singleNodeValue;
		}else
		{
			tmp = result.singleNodeValue[attr];
		}
	}
	return tmp;
}

function getNodeAttr(args)
{
	var row_xpath = args[0],row_num = args[1],col_xpath = args[2],attr = args[3];
	var tmp = 'null';
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(row_xpath+row_num+col_xpath, document.documentElement, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(result && result.singleNodeValue)
	{
		if(attr === '')
		{
			tmp = result.singleNodeValue;
		}else
		{
			for(var i=0,len=result.singleNodeValue.attributes.length;i<len;i++)
			{
				if(result.singleNodeValue.attributes[i]['nodeName'] == attr)
				{
					tmp = result.singleNodeValue.attributes[i]['nodeValue'];
					break;
				}
			}
		}
	}
	return tmp;
}


var page = {
  startX: 150,
  startY: 150,
  endX: 400,
  endY: 300,
  moveX: 0,
  moveY: 0,
  pageWidth: 0,
  pageHeight: 0,
  visibleWidth: 0,
  visibleHeight: 0,
  dragging: false,
  moving: false,
  resizing: false,
  isMouseDown: false,
  scrollXCount: 0,
  scrollYCount: 0,
  scrollX: 0,
  scrollY: 0,
  captureWidth: 0,
  captureHeight: 0,
  isSelectionAreaTurnOn: false,
  fixedElements_ : [],
  marginTop: 0,
  marginLeft: 0,
  modifiedBottomRightFixedElements: [],
  originalViewPortWidth: document.documentElement.clientWidth,
  defaultScrollBarWidth: 17, // Default scroll bar width on windows platform.


  /**
   * Determine if the page scrolled to bottom or right.
   */
  isScrollToPageEnd: function(coordinate) {
    var body = document.body;
    var docElement = document.documentElement;
    if (coordinate == 'x')
      return docElement.clientWidth + body.scrollLeft == body.scrollWidth;
    else if (coordinate == 'y')
      return docElement.clientHeight + body.scrollTop == body.scrollHeight;
  },

 /**
  * Initialize scrollbar position, and get the data browser
  */
  scrollInit: function(startX, startY) {
	
	page.startX = startX;
	page.startY = startY;

	
    page.scrollXCount = 0;
    page.scrollYCount = 1;
    page.scrollX = window.scrollX; // document.body.scrollLeft
    page.scrollY = window.scrollY;
  },
  /**
  * Calculate the next position of the scrollbar
  */
  scrollNext: function() {
	page.scrollXCount++;
	var doc = document.documentElement;

	window.scrollTo(
	  page.scrollYCount * doc.clientWidth + page.scrollX,
	  page.scrollXCount * doc.clientHeight + page.scrollY);

  },

  /**
  * Remove an element
  */
  init: function() { 
	page.scrollInit(0, 0);
  }
};


window.scrollTo(0,document.body.scrollTop-1000);

waitFor(is_bottom_page,["//div[@id='pl_content_homeFeed']/div[2][@class='feed_lists W_linka W_texta']/div[@class='W_pages']","","",""],is_ok,'',30000);

function is_bottom_page(args)
{
	var row_xpath = "//div[@id='pl_content_homeFeed']/div[2]/div[@class='W_loading']";
	var el = getNodeDetail([row_xpath,'','','']);
	//console.log(document.body.scrollTop);
	console.log(el.offsetTop);
	window.scrollTo(0,el.offsetTop);
	//page.scrollNext();
	var ret = 'null';
	//if(page.isScrollToPageEnd('y'))
		ret = getNodeDetail(args);
	return ret;
}
function is_ok()
{
	console.log('is_bottom');
}
