/**
 * 
 * Request Module
 * 
 */
var setting = {
    base_url: 'https://192.168.144.11',
    get_blogs_url: '/api/getblogs',
    delete_blogs_url: '/api/deleteBlogs', //delete_blog_url + blog1_id&blog2_id
    add_blog_url: '/api/addBlog',
    edit_blog_url: '/api/editBlog',
    top_blog_url: '/api/topBlog',
    untop_blog_url: "/api/untopBlog",
    get_friends_latest_blog_url: '/api/getFriendsLatestBlogs'
};

var requestUtil = {
    postR: function(url, data, callback) {
        this.ajaxR(url, data, "POST", callback);
    },
    getR: function(url, params, callback) {
        this.ajaxR(url, params, "GET", callback);
    },
    ajaxR: function(url, data, type, callback) {
        ajax({
            url: url,
            type: type,
            data: data || {},
            dataType: "json",
            async: true,
            cache: false,
            success: function(response) {
                callback && callback(response);
            },
            fail: function() {
                alert('Ajax Request Failed!');
            }//param
        });
    },
    code_on_off: true
};

function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            // var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            try{var xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            	catch(e){}
            try {var xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            	catch(e) {}
            try {var xhr = new ActiveXObject("Msxml2.XMLHTTP");}
              catch(e) {}
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    if (xhr.responseType === "json") {
                        // 直接返回JSON对象
                        options.success && options.success(xhr.response);//返回内容作为参数传递
                    } else {
                        //将字符串转换为JSON对象
                        options.success && options.success(JSON.parse(xhr.responseText));
                    }
                } else {
                    options.fail && options.fail();
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }

var service = {
    get_blogs : function(callback){
        var url = setting.base_url + setting.get_blogs_url;
        var data = {};
        requestUtil.getR(url,data,callback);
    },
    delete_blogs : function(ids, callback){
        var url = setting.base_url + setting.delete_blogs_url
        var ids_string = ids.join('&');
        var data = {
            id:ids_string
        };
        requestUtil.getR(url,data,callback);
    },
    add_blog : function(blog, callback){
        var url = setting.base_url + setting.add_blog_url;
        var data = {
            blog:blog
        };
        requestUtil.getR(url,data,callback);
    },
    edit_blog : function(blog, callback){
        var url = setting.base_url + setting.edit_blog_url;
        var data = {
            blog:blog
        };
        requestUtil.getR(url,data,callback);
    },
    top_blog : function(id, callback){
        var url = setting.base_url + setting.top_blog_url;
        var data = {
            id:id
        };
        requestUtil.getR(url,data,callback);
    },
    untop_blog : function(id, callback){
        var url = setting.base_url + setting.untop_blog_url;
        var data = {
            id:id
        };
        requestUtil.getR(url,data,callback);
    },
    get_friends_latest_blog : function(userid, callback){
        var url = setting.base_url + setting.get_friends_latest_blog_url;
        var data = {
            userid:userid
        };
        requestUtil.getR(url,data,callback);
    }
}

