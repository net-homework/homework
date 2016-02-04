/**
 * a simple client to create a ajax request, using the promise like method to configure
 * the settings of a request.
 * e.g.:
 * new Request({
 * method:'GET',
 * data: {key:value},
 * url: 'baidu.com'
 * ....
 * }).end(function(err, result){});
 *
 * you can also use it like this:
 *
 * new Request()
 *     .get('baidu.com')
 *     .data({key:value})
 *     .setHeader({content-type:"aaa"})
 *     .end(callback(err,result));
 */


/**
 * get the root, can just run in browser
 */
var root;
if(typeof window !== 'undefined') {
    root = window;
}else if(typeof self !== 'undefined'){
    root = self;
}else{
    root = this;
    console.log('need work in browser');
}


function Request(opts) {
    if(opts){
        this.opts = opts;
    }else{
        this.opts = {};
    }
}
/**
 * get the XMLHttpRequest object in different
 * runtime environment
 * @returns {*}
 */
Request.prototype.getXhr = function() {
    if (root.XMLHttpRequest
        && (!root.location || 'file:' != root.location.protocol
        || !root.ActiveXObject)) {
        return new XMLHttpRequest;
    } else {
        try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
    }
    return false;
};
Request.prototype.get = function(url) {
    this.opts.method = 'GET';
    this.opts.url = url;
    return this;
};
Request.prototype.post = function(url) {
    this.opts.method = 'POST';
    this.opts.url = url;
    return this;
};

Request.prototype.setHeader = function(key, value) {
    var headers = this.opts.headers || {};
    if(arguments.length === 2) {
        headers[key] = value;
    }else{
        if(typeof key === 'object') {
            for(var item in key) {
                headers[item] = key[item];
            }
        }
    }
    this.opts.headers = headers;
    return this;
};
/**
 * need encode the send data
 * @param key:the key of the sent data, can be a object
 * @param value:the value of the key
 */
Request.prototype.send = function(key, value) {
    var data = this.opts.data || "";
    var url = this.opts.url;
    if(arguments.length === 2) {
        data[key] = value;
    }else{
        if(typeof key === 'object') {
            for(var item in key) {
                data[item] = key[item];
            }
        }
    }
    if(typeof this.opts.method === 'GET') {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        for(var name in data) {
            url += encodeURIComponent(name) + '&' + encodeURIComponent(data[name]);
        }
        data = null;
    }else if(typeof this.opts.method === 'POST'){
        this.setHeader('Content-type', 'application/x-www-form-urlencoded');    //only deal with the simple form
        for(var i in data) {
            data += '&' + i + '=' + data[i];
        }
    }
    return this;
};
Request.prototype.end = function(callback) {
    var xhr = this.getXhr();
    var opts = this.opts;
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) return;
        var status;
        var res = {};
        try{status = xhr.status}catch(e){status = 0}
        if(status>=200 && status<300) {
            res = xhr.responseText();
            callback(null, res);
        }else{
            var err = "the server return the error code" + status;
            callback(err, res);
        }
    };

    xhr.open(opts.method, opts.url);
    for(var item in opts.headers) {
        xhr.setRequestHeader(item.toString(), opts.headers[item]);
    }
    xhr.send(opts.data);
};

/******************************the render of the views**********************************/
function VM(opts) {
    this.opts = opts;
}
/**
 * set the data of this vm
 * @param key
 * @param value
 */
VM.prototype.data = function(key, value) {

};
/**
 * render the page according to the data and teh view
 * @param id
 * @param template
 */
VM.prototype.render = function(id, template) {

};
VM.prototype.create = function(fn) {

};
/**
 * the directives of the View model
 * @param name：the name of this directive, like ng-repeat
 * @param el: the dom element contains this directive
 * @param fn: the function deal with the dom element
 * @param arg: arguments of this directives, like ng-repeat="key in object"
 */
VM.prototype.setDiretcvite = function(name, el, fn, arg){

};
VM.prototype.watch = function(obj, fn) {
    object.keys().forEach(function(key) {

    });
};
VM._transclude = function() {
    var opts = this.opts;
    var view = opts.view;
    var needAppend = document.createDocumentFragment();

};
VM._init = function() {

};
var viewToDocumentFragement = function(view) {

};
/******************************the router of the page***********************************/
function Router() {
    this.routeMap = {};
    this.vm = {};
}

Router.prototype.set = function(hash, vm) {
    this.routeMap[hash] = vm;
    return this;
};

Router._init = function() {
    var self = this;
    if(typeof window.location === 'undefined'){
        console.log('need work in browser');
        return;
    }else{
        if(typeof window.onhashchange !== 'undefined') {
            window.onhashchange = function() {
                if(self.routeMap[window.location.hash]) {
                    self.vm = self.routeMap[window.location.hash];
                }
            }
        }else{
            var oldHash = window.location.hash;
            var newHash;
            setInterval(function(){
                newHash = window.location.hash;
                oldHash = newHash;
                if(self.routeMap[newHash]) self.vm = self.routeMap[newHash];
                else console.log('please add the correct route');
            },100);
        }
    }
};
/*************************************************the start of the webapp******************************/

var logShowView =
    "<div class='m-bhist'>" +
    "<ul>" +
    "<li>" +
    "<input type='checkbox' name='history_item' value='1' />" +
    "<a href='#' title='' class='c-iname'>dwr+struts+spring+hibemate简单配置</a>" +
    "<div class='c-action f-rf'><a href='#edit'	class='c-edit'>编辑</a><a href='#more' class='c-more'>更多<span class='c-icon-down'></span></a></div>" +
    "<p class='c-idetail'><span class='c-time'>2010-06-09 13:44:38 </span><span>阅读23</span><span>评论0</span></p>" +
    "</li>" +
    "<li><input type='checkbox' name='all_items' value='a' id='all_items' />全选<input type='button' name='delete' id='delete' class='c-btn-del' value='删除' /></li>" +
    "</div>";
var logView = logCreateView + logShowView;

/***********************************************the simple implementation of the webapp****************************************/
/**
 * 还是写最简单的吧。。。。
 */

window.onhashchange = function() {
    if(window.location.hash === 'log') {
        //do something
        var url = ''; //the url get the data form the server
        var data;
        new Request()
            .get(url)
            .end(function(err, res) {
                if(err !== null) {
                    console.log(err);
                }else{
                    // var data = res.data; get the return data;
                    var data = []; //the example
                    var mainDom = document.getElementById('main'); //need to set a main block, all the elements are render in this block
                    var logCreateView =
                        "<div class='m-cont f-cfb'>" +
                        "<input type='text' name='title' class='c-title' value='日志标题' />" +
                        "<textarea name='content' class='c-bcon'>这里可以写日志哦～</textarea>" +
                        "<input type='button' name='clear' value='清空' class='c-clr f-rf' />" +
                        "<input type='submit' name='submit' value='发布' class='c-sbt f-rf' />" +
                        "</div>";
                    mainDom.innerHTML(logCreateView);
                    var liList = document.createDocumentFragment();
                    data.forEach(function(item) {
                        
                    });
                }
            });
    }else if (window.location.hash === 'label'){
        //do something
    }else{
        //do something
    }
};

/** 
 * function:add top dropdown list
 * author: lxc
 * date:2016-02-04
 */
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

/** 
 * function:add top more dropdown list
 * author: lxc
 * date:2016-02-04
 */
    var moreDrop = function () {
        var _blog_list = document.getElementById('blog_list');
        var _items = _blog_list.getElementsByTagName('ul');
        var _len = _items.length;
        for (var i=0;i<_len;i++) {
            var _icon = document.getElementById('icon'+i);
            EventUtil.addHandler(document.getElementById('more_'+i),'click',function () {
    //       /* show list... */
             var _target = EventUtil.getTarget(event);
             _target.parentNode.setAttribute('class', 'f-show-all');
             var _icon = _target.getElementsByTagName('span');
             _icon[0].setAttribute('class', 'c-icon-up');
            });
         }
     };
