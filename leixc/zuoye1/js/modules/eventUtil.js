//Event Utilities :add remove 
var EventUtil = {
	addHandler: function (element, type, handler) {
		 /* add */
		 if(element.addEventListener) {
		 	element.addEventListener(type, handler, false);
		 }else if (element.attachEvent) {//IE 
		 	element.attachEvent('on'+type,handler);
		 }else {
		 	element['on'+type] = handler;
		 }
	},
	removeHandler: function (element, type, handler) {
		 /* remove */
		 if (element.removeEventListener) {
		 	element.removeEventListener(type, handler, false);
		 }else if (element.detachEvent) {
		 	element.detachEvent('on'+type, handler);
		 }else {
		 	element['on'+type] = null;
		 }
	},
	getEvent: function (event) {
		 /* get event object  */
		 return event ? event : window.event;
	},
	getTarget: function (event) {
		 /* get the target of a event... */ 
		 return event.target || event.srcElement;
	},
	preventDefault: function (event) {
		 /* prevent the default action of the browser... */
		 if(event.preventDefault){
		 	event.preventDefault();
		 }else {
		 	event.returnValue = false;
		 }
	},
	stopPropagation: function (event) {
		 /* stop the event propagation or event bubble... */ 
		 if(event.stopPropagation){
		 	event.stopPropagation();
		 }else {
		 	event.cancelBubble = true;
		 }
	}
};