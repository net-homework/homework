(function () {
 	 /* main */
 	 if (!document.getElementById) return false;

 	 var render = {
 	 	blogList: [{accessCount:"11",//阅读数
								allowView:"-100",//日志阅读权限，10000为私人阅读
								classId:"fks_0870508080067081",//日志分类ID
								className:"默认分类",//日志分类名称
								commentCount:"0",//日志评论数量
								comments:"null",//日志评论对象
								content:"",
								id:"fks_0800740930068083086080067081",//日志ID
								ip:"60.191.86.3",
								isPublished:"1",
								lastAccessCountUpdateTime:"1299123080100",
								modifyTime:"1277264192935",//日志更新时间
								publishTime:"1277264160592",
								publishTimeStr:"11:36:00",
								publisherId:"0",
								publisherNickname:"null",
								publisherUsername:"null",
								rank:"0",//日志排名，5代表置顶日志
								recomBlogHome:"false",
								shortPublishDateStr:"2010-6-23",
								title:"js高性能原则(转载)",//日志标题
								blogContent:"js高性能原则(转载)的日志内容就这些",//日志内容
								userId:"126770605",//用户ID
								userName:"testblog1",//用户名
								userNickname:"testblog"}],//用户昵称
			getData: function () {},
			showBlogList: function () {},
			showFridList: function () {},
			init: function () {}						
 	 };//render object

 	 render.getData = function () {
 	 	 /* get blog list from server... */

 	 };

 	 render.showBlogList = function () {
 	 	 /* show blog list... */ 
 	 };
 	
 	 /* add top dropdown list */
	 var topDrop = function () {
	 	 var _topEle = document.getElementById('select_pop');
	 	 var _popL = document.getElementById('pop');
	 	 var _icon = document.getElementById('top_icon');
	 	 EventUtil.addHandler(_topEle,'mouseover',function () {
	 	 	 /* show list... */ 
	 	 	 _icon.setAttribute('class', 'c-icon-up');
	 	 	 _popL.setAttribute('class', 'f-show');
	 	});
	 	 EventUtil.addHandler(_topEle,'mouseout',function () {
	 	 	 /* hide list... */
	 	 	 _icon.setAttribute('class', 'c-icon-down');
	 	 	 _popL.setAttribute('class', 'f-hide');
	 	});
	};

	/*add more dropdown */
	var moreDrop = function () {
	 	var _body = document.getElementsByTagName('body')[0];
	 	var _blog_list = document.getElementById('blog_list');
	 	var _items = _blog_list.getElementsByTagName('ul');
	 	var _len = _items.length;

	 	for (var i=0;i<_len;i++) {
	 	 	var _icon = document.getElementById('icon'+i);
	 	 	var _more = document.getElementById('more_'+i);
	 	 	
	 	 	/* show list... */
	 	 	EventUtil.addHandler(_more,'click',function () {
		 	 	event = EventUtil.getEvent(event);
		 	 	var _target = EventUtil.getTarget(event);
		 	 		 	
		 	 	_target.parentNode.setAttribute('class', 'c-more f-show-all');
		 	 	_target.parentNode.getElementsByTagName('ul')[0].setAttribute('class', 'f-show');

		 	 	var _icon = _target.getElementsByTagName('span');
		 	 	_icon[0].setAttribute('class', 'c-icon-up');

		 	 	/* hide list... */
	 	 		EventUtil.addHandler(_body,'click',function () {
	 	 	 	//点击页面其他地方 隐藏下拉列表
		 	 	 	_target.parentNode.setAttribute('class', 'c-more');
			 	 	_target.parentNode.getElementsByTagName('ul')[0].setAttribute('class', 'f-hide');
		 	 		_icon[0].setAttribute('class', 'c-icon-down');
	 	 		});

	 	 		var _cancel_top = document.getElementById('cancel_top');
	 	 		EventUtil.addHandler(_cancel_top,'click',function () {
	 	 		 // 取消置顶 
	 	 		 // .... 
	 	 		});

		 	 	var _top = document.getElementsByClassName('c-top');
		 	 	EventUtil.addHandler(_top,'click',function () {
		 	 		 //置顶 
		 	 		 //修改blog it
		 	 	});

		 	 	var _delete = document.getElementsByClassName('c-delete');
		 	 	EventUtil.addHandler(_delete,'click',function () {
		 	 		 //删除 
		 	 		 //从blogList中删除项 重绘showBlogList()
		 	 	});

		 	 	EventUtil.preventDefault(event);
		 	 	EventUtil.stopPropagation(event);
	 	 	});
 	 	
	 	}

		 
	};

	/* switch the tab button... */
	var switchTab = function (n) {
		// var _tabCon = document.getElementById('tab_con');
		for(var i=0;i<n;i++)
		{
			var _tabBtn = document.getElementById('tab_'+i);
			_tabBtn.index = i;//add index property to binding
			
			EventUtil.addHandler(_tabBtn,'click',function () {
				 
				 this.setAttribute('class', 'c-selected');
				 var _nextNode = document.getElementById('tab_'+(this.index+1)%2);
				 _nextNode.removeAttribute('class');
				 
				 show(this.index);//show content

				EventUtil.preventDefault(event);
		 	 	EventUtil.stopPropagation(event);

			});
		}

		function show (index) {
			/* show this tab content. */
			var _next = (index+1)%2;
			var _nextCon = document.getElementById('con_'+_next);
			var _con = document.getElementById('con_'+index);
			_nextCon.setAttribute('class', 'f-hide');
			_con.setAttribute('class', 'm-tab-con-'+index);
		}
	};

	/* checkbox */
	var _all = document.getElementById('all_items');
	var _blog_list = document.getElementById('blog_list');
	EventUtil.addHandler(_all,'click',function () {
		 
		 if(this.checked == true)
		 	checkAll('history_item');
		 else
		 	clearAll('history_item');

	});

	function checkAll (name) {
		var _items = _blog_list.getElementsByTagName('input');
		var _len = _items.length;
		for(var i=0;i<_len-1;i++)
		{
			if(_items[i].type == "checkbox" && _items[i].name == name)
			{
				_items[i].checked = true;
			}
		}
	}

	function clearAll (name) {
		var _items = _blog_list.getElementsByTagName('input');
		var _len = _items.length;
		for(var i=0;i<_len-1;i++)
		{
			if(_items[i].type == "checkbox" && _items[i].name == name)
			{
				_items[i].checked = false;
			}
		}
	}

/* friend blog list scrolling... */
	render.showFridList = function () {
		  var _frid_list = getFridsBlogs();
		  var _items = _frid_list.getElementsByTagName('li');
		  var _len = _items.length;
		  for (var i = 0; i < _len; i++) {
		  	var _con = _items[i].getElementsByTagName('p')[0];
		  	//rolling the content
		  	scrollingBlog(_con,12,20,2000);
		  }
	};

	function getFridsBlogs () {
		// get friend list data from server and create the ul element....
		//....getData
		//....create id= frid_list element
		//test:
		return document.getElementById('frid_list');
	}

	function scrollingBlog (con,lh,speed,delay) {
		 // scrolling the blog...  
		var timer;
		var pause = false; 

		EventUtil.addHandler(con,'mouseover',function () {
		  /* stop */ 
		  pause = true;
		 });
		EventUtil.addHandler(con,'mouseout',function () {
		  /* restart */ 
		  pause = false;
		 });

		con.scrollTop = 0;

		function start() {
      timer = setInterval(scrolling, speed);//set timer
      if (!pause) {
        con.scrollTop += 1;
        }
      }

    function scrolling() {
      if (con.scrollTop % lh != 0) {
        con.scrollTop += 1;
        if (con.scrollTop + con.clientHeight === con.scrollHeight) //判断元素是否滚动到底 
        	con.scrollTop = 0;
      } else {
        clearInterval(timer);//finish once
        setTimeout(start, delay);//delay 2s to restart
      }
    }
        
    setTimeout(start, delay);
	}


 	render.init = function () {
 	 	 /* root */ 

 	 	this.getData();
 	 	this.showBlogList();
 	 	this.showFridList();
 	 	topDrop();
		moreDrop();
		switchTab(2);
 	 };

 	 render.init();
	
}());