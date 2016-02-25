/**
 * Created by body7 on 16/2/24.
 */
//参数
var setting = {
    base_url:'https://192.168.144.11',
    get_blogs_url : '/api/getblogs',
    delete_blogs_url:'/api/deleteBlogs',    //delete_blog_url + blog1_id&blog2_id
    add_blog_url:'/api/addBlog',
    edit_blog_url:'/api/editBlog',
    top_blog_url : '/api/topBlog',
    untop_blog_url:"/api/untopBlog",
    get_friends_latest_blog_url:'/api/getFriendsLatestBlogs'
};

var util = {
    $post : function(url, data, callback){
        util.$ajax(url, data, "POST", callback);
    },
    $get : function(url, params, callback){
        util.$ajax(url, params, "GET", callback);
    },
    $ajax : function(url, data, type, callback){
        $.ajax({
            url : url,
            type : type,
            data : data || {},
            dataType : "json",
            async : true,
            cache : false,
            success : function(rtn){
                callback && callback(rtn);
            },
            error : function(o, r, m){
                callback && callback(r);
            }
        });
    },
    code_on_off : true
};

var server = {
    get_blogs : function(callback){
        var url = setting.base_url + setting.get_blogs_url;
        var data = {};
        util.$get(url,data,callback);
    },
    delete_blogs : function(ids, callback){
        var url = setting.base_url + setting.delete_blogs_url
        var ids_string = ids.join('&');
        var data = {
            id:ids_string
        };
        util.$get(url,data,callback);
    },
    add_blog : function(blog, callback){
        var url = setting.base_url + setting.add_blog_url;
        var data = {
            blog:blog
        };
        util.$get(url,data,callback);
    },
    edit_blog : function(blog, callback){
        var url = setting.base_url + setting.edit_blog_url;
        var data = {
            blog:blog
        };
        util.$get(url,data,callback);
    },
    top_blog : function(id, callback){
        var url = setting.base_url + setting.top_blog_url;
        var data = {
            id:id
        };
        util.$get(url,data,callback);
    },
    untop_blog : function(id, callback){
        var url = setting.base_url + setting.untop_blog_url;
        var data = {
            id:id
        };
        util.$get(url,data,callback);
    },
    get_friends_latest_blog : function(userid, callback){
        var url = setting.base_url + setting.untop_blog_url;
        var data = {
            userid:userid
        };
        util.$get(url,data,callback);
    }
};

var $obj = {
    //bind object with element
    sign_in_btn : $('#sign_in_btn'),
};

var myEvent = {
    //bind object with event handler
    bind : function(){

        $obj.sign_in_btn.on('click',handler.sign_in_btn_click);

    }
}

var handler = {

    sign_in_btn_click : function(){
    }
}

$(myEvent.bind);