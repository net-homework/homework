/**
 * Created by ptrdu on 2016/2/1.
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

/**
 * a http request handle, like a middleware to config
 * a request
 * @param method
 * @param url
 */
var requestHandle = function(method, url) {
    this.method = method;
    this.url = url;
    this.headers = {};
    this.data = null;
};
/**
 * get the XMLHttpRequest object in different
 * runtime environment
 * @returns {*}
 */
Request.getXhr = function() {
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

/**
 * the final function to send a http request,
 * configure all the settings according the Request
 * object's handle property
 * @param fn :the callback function.
 */
Request.prototype.end = function(fn) {
    var xhr = this.xhr = this.getXhr();
    var handle = this.handle;
    if(typeof handle === 'undefined') {
        console.log("need some basic information");
        return;
    }
    var data = handle.data;
    var header = handle.headers;

    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) return;
        var status;
        var res = {};
        try{status = xhr.status}catch(e){status = 0}
        if(status>=200 && status<300) {
            res = xhr.responseText();
            fn(res);
        }else{
            var err = "the server return the error code" + status;
            fn(err, res);
        }
    };

    xhr.open(handle.method, handle.url);
    xhr.send(handle.data);
};

/**
 * the basic http function
 * @param url
 * @returns {requestHandle|*}
 */
Request.prototype.get = function(url) {
    this.handle = new requestHandle('GET', url);
    return this.handle;
};
Request.prototype.post = function(url) {
    this.handle = new requestHandle('POST', url);
    return this.handle;
};
Request.prototype.put = function(url) {
    this.handle = new requestHandle('PUT', url);
    return this.handle;
};
Request.prototype.delete = function(url) {
    this.handle = new requestHandle('DELETE', url);
    return this.handle;
};
Request.prototype.setHeader = function(name, value){
    if(arguments.length === 1) {
        this.handle.headers = name;
    }else{
        this.handle[name] = value;
    }
    return this.handle;
};
Request.data = function(data) {
    var handle = this.handle;
    if(handle.method === 'GET') {

    }
};
module.exports = Request;

