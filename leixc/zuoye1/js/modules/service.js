/**
 * Created by body7 on 16/2/24.
 */
//参数
var setting = {
    base_url:'https://192.168.144.11',
    get_blog_url : '/api/getblogs',
    delete_blog_url:'/api/deleteBlogs?id=',    //delete_blog_url + blog1_id&blog2_id
    add_blog_url:'/api/addBlog?blog=',
    edit_blog_url:'/api/editBlog?blog=',
    top_blog_url : '/api/topBlog?id=',
    untop_blog_url:"/api/untopBlog",
    get_friends_latest_blog_url:'/api/getFriendsLatestBlogs?userid='
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
    get_blog : function(){
        var url = setting.base_url + setting.get_blog_url;
        var data = {};
        util.$post(url,data,callback);

    },
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