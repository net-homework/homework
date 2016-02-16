(function () {
 	 /* main */
 	 if (!document.getElementById) return false;

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
	 	 		});

		 	 	var _top = document.getElementsByClassName('c-top');
		 	 	EventUtil.addHandler(_top,'click',function () {
		 	 		 //置顶 
		 	 	});

		 	 	var _delete = document.getElementsByClassName('c-delete');
		 	 	EventUtil.addHandler(_delete,'click',function () {
		 	 		 //删除 
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



	topDrop();
	moreDrop();
	switchTab(2);
}());