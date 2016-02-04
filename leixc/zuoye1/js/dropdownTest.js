(function () {
 	 /* main */
 	 if (!document.getElementById) return false;

 	 //add top dropdown list
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

	// //add more dropdown
	 var moreDrop = function () {
	 	var _blog_list = document.getElementById('blog_list');
	 	var _items = _blog_list.getElementsByTagName('ul');
	 	var _len = _items.length;
	 	for (var i=0;i<_len;i++) {
	 	 	var _icon = document.getElementById('icon'+i);
	 	 	EventUtil.addHandler(document.getElementById('more_'+i),'click',function () {
	// 	 	 /* show list... */
	 	 	 var _target = EventUtil.getTarget(event);
	 	 	 _target.parentNode.setAttribute('class', 'f-show-all');
	 	 	 var _icon = _target.getElementsByTagName('span');
	 	 	 _icon[0].setAttribute('class', 'c-icon-up');
	 	 	});
	 	 }
	 };


	topDrop();
	moreDrop();
}());