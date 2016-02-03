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
VM.prototype.data = function(key, value) {

};
VM.prototype.render = function(id, template) {

};
VM.prototype.create = function(fn) {

};
VM.prototype.watch = function(obj, fn) {

};
VM._init = function() {

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
/*
<div class="m-cont f-cfb">
<input type="text" name="title" class="c-title" value="日志标题" />
<textarea name="content" class="c-bcon">这里可以写日志哦～</textarea>
<input type="button" name="clear" value="清空" class="c-clr f-rf" />
<input type="submit" name="submit" value="发布" class="c-sbt f-rf" />
</div>
<div class="m-bhist">
<ul>
<li><input type="checkbox" name="history_item" value="1" /><a href="#" title="" class="c-iname">dwr+struts+spring+hibemate简单配置</a><div class="c-action f-rf"><a href="#edit"	class="c-edit">编辑</a><a href="#more" class="c-more">更多<span class="c-icon-down"></span></a></div>
<p class="c-idetail"><span class="c-time">2010-06-09 13:44:38 </span><span>阅读23</span><span>评论0</span></p></li>

<li><input type="checkbox" name="history_item" value="2" /><a href="#" title="" class="c-iname">dwr+struts+spring的简单配置</a><div class="c-action f-rf"><a href="#edit" class="c-edit">编辑</a><a href="#more" class="c-more">更多<span class="c-icon-down"></span></a></div>
<p class="c-idetail"><span class="c-time">2010-06-07 18:12 </span><span>阅读56</span><span>评论0</span></p>
</li>
<li><input type="checkbox" name="history_item" value="3" /><a href="#" title="" class="c-iname">js高性能原则（转载)</a><div class="c-action f-rf"><a href="#edit" class="c-edit">编辑</a><a href="#more" class="c-more">更多<span class="c-icon-down"></span></a></div>
<p class="c-idetail"><span class="c-time">2010-06-23 11:36:00 </span><span>阅读11</span><span>评论0</span></p>
</li>
<li><input type="checkbox" name="history_item" value="4" /><a href="#" title="" class="c-iname">dwr+spring+hibemate简单配置</a><div class="c-action f-rf"><a href="#edit" class="c-edit">编辑</a><a href="#more" class="c-more">更多<span class="c-icon-down"></span></a></div>
<p class="c-idetail"><span class="c-time">2010-06-07 19:20:00 </span><span>阅读48</span><span>评论0</span></p>
</li>
<li><input type="checkbox" name="history_item" value="5" /><a href="#" title="" class="c-iname">dwr的简单配置</a><div class="c-action f-rf"><a href="#edit" class="c-edit">编辑</a><a href="#more" class="c-more">更多<span class="c-icon-down"></span></a></div>
<p class="c-idetail"><span class="c-time">2010-06-07 14:57:21 </span><span>阅读48</span><span>评论0</span></p>
</li>
<li><input type="checkbox" name="all_items" value="a" id="all_items" />全选<input type="button" name="delete" id="delete" class="c-btn-del" value="删除" /></li>
</ul>
    <!-- ‘更多’下拉菜单 -->
<ul class="c-more-actions f-hide">
<li>删除</li>
<li>置顶</li>
</ul>
</div>*/
