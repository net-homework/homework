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

