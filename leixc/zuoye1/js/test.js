/**
 * 
 * Main 
 * 
 */

(function() {
    if (!document.getElementById) return false;

    var render = {
        getBlogList: function() {},
        showBlogList: function() {},
        showFridList: function() {},
        init: function() {}
    }; //render object

    var myBlogList = []; //日志列表：全局变量
    var friBlogList = []; //朋友列表：全局变量

    /**
     * 获取日志数据
     */
    render.getBlogList = function() {
        //发送ajax请求 获取日志列表
        var _response = [];
        service.get_blogs(function(_response) {
            /* 获取成功的回调函数 */
            console.log(_response)
            myBlogList = _response;
        });
        //发送ajax请求 获取好友列表
        service.get_friends_latest_blog('126770605', function(_response) {
            /* 获取成功回调函数 */
            console.log(_response)
            friBlogList = _response;
        });
    };

    /**
     * 渲染日志列表
     */
    var _top_item; //置顶日志:全局变量 

    render.showBlogList = function() {
        /* 渲染HTML页面 */
        //创建html元素字符串 
        var _blog_list_ele = document.getElementById('blog_list');
        var _blog_list_str = "";

        var _len = myBlogList.length;
        if (_len > 0) {
            //构成日志列表:日志默认按照modifyTime字段（降序）排序显示 (rank = 5 表示置顶）
            myBlogList.sort(sortByModifyTime);

            function sortByModifyTime(i, j) {
                /* 按 modifyTime降序 排列数组： 最近的更新越靠前 */
                a = parseInt(i.modifyTime);
                b = parseInt(j.modifyTime);
                if (a > b) {
                    return -1;
                } else if (a < b) {
                    return 1;
                } else {
                    return 0;
                }
            }
            //rendering 日志列表	
            _top_item = myBlogList[0]; //置顶日志初始值为排序后的日志列表第一个元素
            //更新置顶元素
            for (var i = 0; i < _len; i++) {
                if (myBlogList[i].rank === "5") {
                    _top_item = myBlogList.splice(i, 1)[0]; //从myBlogList数组中删除置顶元素（位置是i），并将删除的置顶元素赋值给_top_item
                    break;
                }
            }
            if (myBlogList.length < _len) {
                //myBlogList元素变少
                myBlogList.unshift(_top_item); //把置顶元素放在列表头
            }

            //首先构造置顶日志
            var _top_blog_str_1 = "<li id='top_blog'>" +
                "<input type='checkbox' name='history_item' value='0' /><a href='#' class='c-logtitle' id='bcon_0'>";
            var _top_blog_str_2 = _top_item.title + "</a>" +
                "<div class='c-action'>" +
                "<a href='#edit'	class='c-edit' id='edit_0'>编辑" +
                "</a>" +
                "<div class='c-more'>" +
                "<a id='more_0' href='#'>更多<span class='c-icon-down' id='icon0'></span>" +
                "</a>" +
                "<ul class='f-hide'><li class='c-delete' id='delete_0'><a href='#'>删除</a></li><li id='cancel_top'><a href='#'>取消置顶</a></li></ul>" +
                "</div>" +
                "</div>" +
                "<p class='c-idetail'><span class='c-time'>" +
                _top_item.shortPublishDateStr + ' ' + _top_item.publishTimeStr +
                "</span><span>" + "阅读" +
                _top_item.accessCount +
                "</span><span>" + "评论" +
                _top_item.commentCount +
                "</span></p></li>";
            var _private_icon = " <span class='c-icon-private'></span>";
            var _top_blog_str = "";
            if (_top_item.allowView === "10000") {
                //私有日志
                _top_blog_str = _top_blog_str_1 + _private_icon + _top_blog_str_2;
            } else {
                _top_blog_str = _top_blog_str_1 + _top_blog_str_2;
            }
            //构造日志列表
            _blog_list_str = "<ol>" + _top_blog_str;

            for (var i = 1; i < myBlogList.length; i++) {
                _blog_list_str = _blog_list_str + showBlog(myBlogList[i], i); //除去列表第一个日志，日志从1开始编号
            }
        } else {
            console.log('No blog to list.');
        }

        //rendering html element 
        _blog_list_str = _blog_list_str +
            "<li><input type='checkbox' name='all_items' value='all' id='all_items' /> 全选" +
            "<input type='button' name='delete' id='delete' class='c-btn-del' value='删除' /></li></ol>";
        _blog_list_ele.innerHTML = _blog_list_str;

        function showBlog(item, index) {
            // 区别私有日志和默认日志
            var _myblog_str_1 = "<li>" + "<input type='checkbox' name='history_item' value='" + index + "'/>";
            var _myblog_str_2 = "<a href='#' class='c-logtitle' id='bcon_" + index + "'>" +
                item.title + "</a>" +
                "<div class='c-action'>" +
                "<a href='#edit'	class='c-edit' id='edit_" + index + "'>编辑" +
                "</a>" +
                "<div class='c-more'>" +
                "<a id='more_" + index + "' href='#'>更多<span class='c-icon-down' id='icon" + index + "'></span>" +
                "</a>" +
                "<ul class='f-hide'><li class='c-delete' id='delete_" + index + "'><a href='#'>删除</a></li><li class='c-top' id='top_" + index + "'><a href='#top_blog'>置顶</a></li></ul>" +
                "</div>" +
                "</div>" +
                "<p class='c-idetail'><span class='c-time'>" +
                item.shortPublishDateStr + ' ' + item.publishTimeStr +
                "</span><span>" + "阅读" +
                item.accessCount +
                "</span><span>" + "评论" +
                item.commentCount +
                "</span></p></li>";
            var _myblog_str = "";

            if (item.allowView === "10000") {
                // 私有日志
                _myblog_str = _myblog_str_1 + _private_icon + _myblog_str_2;
            } else {
                //默认日志
                _myblog_str = _myblog_str_1 + _myblog_str_2;
            }
            return _myblog_str;
        }
        /* 渲染完元素 绑定事件	*/
        edit_moreEvent();
        multipleDelete();

    };

    /* 渲染完继续循环绑定DOM事件 */
    var cur_blog = document.getElementById('log');
    var inputs = cur_blog.getElementsByTagName('input');
    var content = cur_blog.getElementsByTagName('textarea')[0];

    /* 绑定清空button */
    EventUtil.addHandler(inputs[1], 'click', function() {
        clearBlog();
    });

    var tag = -1; //全局变量：表示发布已有日志或新增日志(-1 表示未发表日志，否则表示已发表) 初始值 －1
    var blog_pub = {
        title: 'xxxxx', //日志标题
        blogContent: 'xxxxxxxx', //日志内容
        modifyTime: '', //日志创建时间
        accessCount: 0, //阅读数
        allowView: -100, //阅读权限
        classId: 'xxxxxxxxx', //日志分类
        commentCount: 0, //日志评论数
        id: 'xxxxxxxxxxx', //日志ID,客户端随机生成
        userId: 126770605, //用户ID
        userName: 'testblog1', //用户名
        userNickname: 'testblog' //用户昵称
    }; //要发布的新日志

    EventUtil.addHandler(inputs[0], 'change', function() {
        /* 改变已发表日志 */
        blog_pub.title = inputs[0].value; //修改带发表日志的标题
    });
    EventUtil.addHandler(content, 'change', function() {
        /* 改变已发表日志内容 */
        blog_pub.blogContent = content.value;
    });

    /* 绑定发布submit */
    EventUtil.addHandler(inputs[2], 'click', function() {
        publishBlog(tag, blog_pub);
        render.showBlogList();
    });

    /**
     * 列表项 "更多"" 按钮事件
     */
    function edit_moreEvent() {
        var _blog_list_ele = document.getElementById('blog_list');
        var _items = _blog_list_ele.getElementsByTagName('ul');
        var _len = _items.length;

        for (var i = 0; i < _len; i++) {
            /*编辑事件绑定*/
            var _edit = document.getElementById('edit_' + i);

            EventUtil.addHandler(_edit, 'click', function() {
                //先清空之前的内容
                clearBlog();

                event = EventUtil.getEvent(event);
                // EventUtil.preventDefault(event);
                EventUtil.stopPropagation(event);

                var _target = EventUtil.getTarget(event); //id=edit_x
                if (_target.getAttribute('class') === 'c-edit') {
                    var index = _target.getAttribute('id').split('_')[1];
                    editBlog(myBlogList[index], index);
                }
            });

            /*更多下拉列表事件绑定*/
            var _icon = document.getElementById('icon' + i);
            var _more = document.getElementById('more_' + i);

            /* show list */
            EventUtil.addHandler(_more, 'click', function() {
                event = EventUtil.getEvent(event);
                EventUtil.preventDefault(event);
                EventUtil.stopPropagation(event);

                var _target = EventUtil.getTarget(event);

                if (_target.tagName === 'A') {
                    _target.parentNode.setAttribute('class', 'c-more f-show-all');
                    _target.parentNode.getElementsByTagName('ul')[0].setAttribute('class', 'f-show');
                }
                //var _icon = _target.getElementsByTagName('span');
                // _icon[0].setAttribute('class', 'c-icon-up');
                /* hide list */
                EventUtil.addHandler(body, 'click', function() {
                    //点击页面其他地方 隐藏下拉列表
                    event = EventUtil.getEvent(event);
                    EventUtil.stopPropagation(event);
                    var _cur_target = EventUtil.getTarget(event);
                    if (_cur_target.tagName != _target.tagName) {
                        _target.parentNode.setAttribute('class', 'c-more');
                        _target.parentNode.getElementsByTagName('ul')[0].setAttribute('class', 'f-hide');
                        // _icon[0].setAttribute('class', 'c-icon-down');
                    }
                });

                var _cancel_top = document.getElementById('cancel_top');
                if (_cancel_top) {
                    EventUtil.addHandler(_cancel_top, 'click', function() {
                        event = EventUtil.getEvent(event);
                        EventUtil.stopPropagation(event);
                        // 取消置顶
                        // 发送ajax取消置顶请求 成功时执行下面操作
                        service.untop_blog(myBlogList[0].id, function(o) {
                            if (o == 1) {
                                if (myBlogList[0].rank === "5") {
                                    myBlogList[0].rank = "0"; //取消置顶标志
                                }
                                render.showBlogList(); //重新渲染
                            } else {
                                console.log('Untop Failed');
                            }
                        });
                    });
                }

                var _top = document.getElementsByClassName('c-top');
                if (_top) {
                    for (var i = 0; i < _top.length; i++) {
                        EventUtil.addHandler(_top[i], 'click', function() {
                            //置顶 (非第一行元素 index >= 1 )
                            //发送ajax置顶请求 成功时执行下面操作
                            event = EventUtil.getEvent(event);
                            EventUtil.stopPropagation(event);
                            var _cur_click = EventUtil.getTarget(event);
                            var _parents = (_cur_click.tagName === "LI") ? _cur_click : _cur_click.parentElement;
                            var index = _parents.getAttribute('id').split('_')[1]; //获取日志在原myBlogList中index

                            service.top_blog(myBlogList[index].id, function(o) {
                                if (o == 1) {
                                    if (myBlogList[0].rank === "5") {
                                        //取消原置顶日志
                                        myBlogList[0].rank = "0"; //取消原有置顶日志，避免两个置顶标志	 		  	
                                    }
                                    myBlogList[index].rank = "5"; //设置置顶标记
                                    render.showBlogList(); //重新渲染
                                } else {
                                    console.log('Top Failed.');
                                }
                            });
                        });
                    }
                }

                var _delete_1 = document.getElementsByClassName('c-delete');
                if (_delete_1) {
                    for (var i = 0; i < _delete_1.length; i++) {
                        EventUtil.addHandler(_delete_1[i], 'click', function() {
                            //删除单篇日志
                            //发送ajax删除单篇日志请求 成功时执行下面操作
                            event = EventUtil.getEvent(event);
                            EventUtil.stopPropagation(event);
                            var _cur_click = EventUtil.getTarget(event);
                            var _parents = (_cur_click.tagName === "LI") ? _cur_click : _cur_click.parentElement;
                            var index = _parents.getAttribute('id').split('_')[1]; //id=delete_x

                            service.delete_blogs(myBlogList[index].id, function(o) {
                                if (o == 1) {
                                    myBlogList.splice(index, 1);
                                    render.showBlogList();
                                } else {
                                    console.log('Delete this Failed.');
                                }
                            });
                        });
                    }
                }
            });
        }
    }

    function editBlog(item, index) {
        inputs[0].value = item.title;
        content.value = item.blogContent;
        tag = index; //编辑已发表的博客,修改tag
    }

    function clearBlog() {
        //清空
        inputs[0].value = '';
        content.value = '';
    }

    function publishBlog(tag, blog) {
        // 发布
        var _new_blog = blog;
        if (tag === -1) {
            //未发布,添加新日志
            //ajax添加日志请求发送到服务器 回调成功时执行下面操作
            var _cur_date = new Date();
            _new_blog.modifyTime = Date.parse(_cur_date); //转换为整型毫秒
            var _year = _cur_date.getFullYear();
            var _month = _cur_date.getMonth();
            var _day = _cur_date.getDay();
            if (_month < 10) {
                _month = "0" + _month;
            }
            if (_day < 10) {
                _day = "0" + _day;
            }
            _new_blog.shortPublishDateStr = _year + "-" + _month + "-" + _day;
            var _time = _cur_date.toLocaleTimeString();
            _new_blog.publishTimeStr = _time.slice(2);
            _new_blog.rank = "0";
            //ajax
            service.add_blog(_new_blog, function(o) {
                if (o == 1) {
                    // 添加成功
                    myBlogList.push(_new_blog);
                } else {
                    console.log('Add new blog Failed.');
                }
            });
        } else {
            // 已发布,修改日志
            //发送ajax 修改日志请求 回调成功时
            service.edit_blog(myBlogList[tag], function(o) {
                if (o == 1) {
                    // 修改成功
                    console.log(myBlogList[tag].title)
                    myBlogList[tag].title = blog.title;
                    myBlogList[tag].blogContent = blog.blogContent;
                    var _cur_date = new Date();
                    myBlogList[tag].modifyTime = Date.parse(_cur_date); //转换为整型毫秒
                    var _year = _cur_date.getFullYear();
                    var _month = _cur_date.getMonth();
                    var _day = _cur_date.getDay();
                    if (_month < 10) {
                        _month = "0" + _month;
                    }
                    if (_day < 10) {
                        _day = "0" + _day;
                    }
                    myBlogList[tag].shortPublishDateStr = _year + "-" + _month + "-" + _day;
                    var _time = _cur_date.toLocaleTimeString();
                    myBlogList[tag].publishTimeStr = _time.slice(2);
                    myBlogList.push(_new_blog);
                } else {
                    console.log('Edit this blog Failed');
                }
            });
        }
        //恢复默认值
        blog_pub = {
            title: 'xxxxx', //日志标题
            blogContent: 'xxxxxxxx', //日志内容
            modifyTime: '', //日志创建时间
            accessCount: 0, //阅读数
            allowView: -100, //阅读权限
            classId: 'xxxxxxxxx', //日志分类
            commentCount: 0, //日志评论数
            id: 'xxxxxxxxxxx', //日志ID,客户端随机生成
            userId: 126770605, //用户ID
            userName: 'testblog1', //用户名
            userNickname: 'testblog' //用户昵称
        }; //要发布的新日志
    }

    var body = document.getElementsByTagName('body')[0];

    /**
     * 左上的下拉菜单效果
     */
    var topDrop = function() {
        var _topEle = document.getElementById('select_pop');
        var _popL = document.getElementById('pop');
        var _icon = document.getElementById('top_icon');
        var _top_menu = document.getElementById('top_menu');
        EventUtil.addHandler(_topEle, 'mouseover', function() {
            /* show list */
            _icon.setAttribute('class', 'c-icon-up');
            _popL.setAttribute('class', 'f-show f-drop');
            _top_menu.setAttribute('class', 'f-drop');
        });
        EventUtil.addHandler(_topEle, 'mouseout', function() {
            /* hide list */
            _icon.setAttribute('class', 'c-icon-down');
            _popL.setAttribute('class', 'f-hide');
            _top_menu.removeAttribute('class');
        });
    };

    /**
     * 切换tab标签
     */
    var switchTab = function(n) {
        // var _tabCon = document.getElementById('tab_con');
        for (var i = 0; i < n; i++) {
            var _tabBtn = document.getElementById('tab_' + i);
            _tabBtn.index = i; //add index property to binding

            EventUtil.addHandler(_tabBtn, 'click', function() {

                this.setAttribute('class', 'c-selected');
                var _nextNode = document.getElementById('tab_' + (this.index + 1) % 2);
                _nextNode.removeAttribute('class');

                show(this.index); //show content

                EventUtil.preventDefault(event);
                EventUtil.stopPropagation(event);

            });
        }

        function show(index) {
            /* show this tab content. */
            var _next = (index + 1) % 2;
            var _nextCon = document.getElementById('con_' + _next);
            var _con = document.getElementById('con_' + index);
            _nextCon.setAttribute('class', 'f-hide');
            _con.setAttribute('class', 'm-tab-con-' + index);
        }
    };

    /**
     * multiple checkbox
     */
    var multipleDelete = function() {
        var _all = document.getElementById('all_items');
        var _blog_list = document.getElementById('blog_list');
        var _inputs = _blog_list.getElementsByTagName('input'); //列表中所有表单元素 包括全选和删除
        var _delete = document.getElementById('delete'); //删除按钮
        var _lens = _inputs.length - 2; //所有checkbox
        var _count = 0; //已选数

        //给每个checkbox绑定计数器
        for (var i = 0; i < _lens; i++) {
            if (_inputs[i].type === "checkbox" && _inputs[i].name === "history_item") {
                EventUtil.addHandler(_inputs[i], 'click', function() {
                    if (this.checked == true)
                        _count++;
                    else if (this.checked == false)
                        _count--;
                });
            }
        }

        EventUtil.addHandler(_delete, 'click', function() {
            deleteBlog();
            render.showBlogList();
        });

        function deleteBlog() {
            var _ids = [];
            var _nochecks = []; //存放未被选中的元素
            for (var i = 0; i < _lens; i++) {
                if (_inputs[i].type === "checkbox" && _inputs[i].name === "history_item" && _inputs[i].checked == false) { //选中的全删除 未选中checked == false的留下显示
                    _nochecks.push(myBlogList[i]); //inputs与myBlogList一一对应
                } else if (_inputs[i].checked == true) {
                    _ids.push(myBlogList[i].id);
                }
            }
            // 发送ajax删除请求
            service.delete_blogs(_ids, function(o) {
                if (o == 1) {
                    myBlogList = _nochecks;
                } else {
                    console.log('Delete Failed.');
                }
            });
        }

        EventUtil.addHandler(_all, 'click', function() {
            if (this.checked == true)
                checkAll('history_item');
            else
                clearAll('history_item');
        });

        function checkAll(name) {

            for (var i = 0; i < _lens; i++) {
                if (_inputs[i].type === "checkbox" && _inputs[i].name === name) {
                    _inputs[i].checked = true;
                    _count = _lens;
                }
            }
        }

        function clearAll(name) {
            for (var i = 0; i < _lens; i++) {
                if (_inputs[i].type === "checkbox" && _inputs[i].name === name) {
                    _inputs[i].checked = false;
                    _count = 0;
                }
            }
        }
    }

    /**
     * 渲染朋友日志列表
     */
    render.showFridList = function() {
        var _friend_blog = document.getElementById('friend_blog'); //<div>DOM
        var _fri_list_str = "<p><strong>好友最新日志</strong></p>";

        if (friBlogList.length > 0) {
            _fri_list_str = _fri_list_str + "<ul class='m-flist' id='frid_list'>";
            var _len = friBlogList.length;
            for (var i = 0; i < _len; i++) {
                var _fri_blog = friBlogList[i];
                _fri_list_str += showFriBlog(_fri_blog, i);
            }

            _fri_list_str += "</ul>";

        } else {
            _fri_list_str += "<p>没有最新的好友日志。</p>";
        }

        _friend_blog.innerHTML = _fri_list_str;

        function showFriBlog(item, index) {
            // 渲染朋友日志  
            var _fri_blog_str = "<li><img class='c-pic-fri f-lf' src='http://os.blog.163.com/common/ava.s?host=testblog1&b=0&r=-1'><em class='c-fn' id='userName_" +
                index + "'>" + item.userNickname + "</em><p id='fri_con_" +
                index + "'>" + item.title + ":" + item.blogContent + "</p></li>";
            return _fri_blog_str;
        }

        //添加滚动效果
        var _fri_list = document.getElementById('frid_list');
        if (_fri_list) {
            var _items = _fri_list.getElementsByTagName('li');
            for (var i = 0; i < _len; i++) {
                var _con = _items[i].getElementsByTagName('p')[0];
                //rolling the content
                scrollingBlog(_con, 12, 20, 2000);
            }
        }
    };

    /**
     * 滑动显示朋友日志列表
     */
    function scrollingBlog(con, lh, speed, delay) {
        // scrolling the blog...  
        var timer;
        var pause = false;

        EventUtil.addHandler(con, 'mouseover', function() {
            /* stop */
            pause = true;
        });
        EventUtil.addHandler(con, 'mouseout', function() {
            /* restart */
            pause = false;
        });

        con.scrollTop = 0;

        function start() {
            timer = setInterval(scrolling, speed); //set timer
            if (!pause) {
                con.scrollTop += 1;
            }
        }

        function scrolling() {
            if (con.scrollTop % lh != 0) {
                con.scrollTop += 1;
                if (con.scrollTop + con.clientHeight === con.scrollHeight) //判断元素是否滚动到底 
                    con.scrollTop = 0;
            } else {
                clearInterval(timer); //finish once
                setTimeout(start, delay); //delay 2s to restart
            }
        }
        setTimeout(start, delay);
    }

    /**
     * 页面初始化
     */
    render.init = function() {
        /* initialize */
        this.getBlogList();
        this.showBlogList();
        this.showFridList();
        topDrop();
        switchTab(2);
    };

    render.init();

}());
