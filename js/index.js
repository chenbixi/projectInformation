

// 登陆后的界面
function getUserInfo() {
    $.getJSON(baseurl + "/page/user/user/info/permission", function (data) {
        console.log("获取用户信息", data);
        if (data.code == 500) {
            $("#login-or-userinfo").html(
                "  <div> " +
                "  <div class='index-zhuanxian-top'> " +
                "     <div class='word2'>用户登陆</div> " +
                "</div>" +
                "   <div class='use_log'>" +
                "  <div class='input-group'>" +
                "   <span class='input-group-addon glyphicon glyphicon-user' id='basic-addon1' ></span>" +
                "   <input id='login-username'  type='text'   class='form-control'   placeholder='会员名/邮箱/手机号'  aria-describedby='basic-addon1'/>" +
                "   </div>" +
                "   <div class='input-group'>" +
                "   <span class='input-group-addon glyphicon glyphicon-lock' id='basic-addon1'></span>" +
                "   <input id='login-password' type='text' class='form-control'   placeholder='登陆密码' aria-describedby='basic-addon1' />" +
                "</div> </div> " +
                " <div class='use_check' style='display:flex'>" +
                "  <input type='checkbox' id='boy' name='gender'/>" +
                "    <label for=''>记住用户名 </label>" +
                "               </div>" +
                "               <div class='use_check' style='display:flex'>" +
                "               <input type='checkbox' id='boy'' name='gender'/>" +
                "               <label for=''>记住密码 </label>" +
                "               </div>" +
                "               <div class='use_check' style='display:flex'> " +
                "       <input type='checkbox' id='boy' name='gender' id=''/>" +
                "               <label for=''>自动登陆</label>" +
                "               </div>" +
                "               <div class='anniu'>" +
                "               <button class='log' onclick='login(\"index.html\",$(\"#login-username\").val(),$(\"#login-password\").val(),\"true\")' >  登陆  </button>" +
                "               " +
                "               <a href=''>忘记密码?</a>" +
                "           </div>" +
                "           <div class='anniu'>" +
                "               <a href=''>还没账号?</a>" +
                "           <button class='zc'>点击注册</button>" +
                "               </div>" +
                "               </div>"
            )
            ;
        }else if(data.code == 0){
          $("#login-or-userinfo").html(
"           <div>"+
"           <div class='index-zhuanxian-top'>"+
"               <div class='word2'>用户信息</div>"+
"               <div class='user-info-basic'>"+
"               <div class='user-info-backgrund'>"+
"               <div class='head-pic fl' onclick='personcenter()'>"+
"      <img src='"+data.data.headUrl+"'>"+
"               </div>"+
"               <div class='user-name-background fl'>"+
"               <p class='user-name-text'>用户名: "+data.data.name+"</p>"+
"           <p class='user-name-text'>会员等级: <strong class='text-red'>"+data.data.level+"</strong></p>"+
"           <p class='vip-date-text'>到期时间: "+data.data.vipDate+"</p>"+
"           </div>"+
"           </div>"+
"           </div>"+
"           <div class='user-info-basic'>"+
"               <div class='user-info-backgrund '>"+

"               <table>"+
"               <tr>"+
"               <td class='table-title'  >每天浏览数量</td>"+
"               <td>1</td>"+
"               </tr>"+
"               <tr>"+
"               <td class='table-title'>每天浏览数量</td>"+
"               <td>1</td>"+
"               </tr>"+
"               <tr>"+
"               <td class='table-title'>每天浏览数量</td>"+
"               <td>1</td>"+
"               </tr>"+
"               </table>"+
"               <button  class='more-a' onmouseenter='lookmore()' onmouseout='closemore()'>查看更多</button>"+
"               </div>"+
"               </div>"+
"               </div>"+
"               </div>"
            )
        }
    });
}

// 查看更多
function lookmore(){
    $('#lookmorelist').css('display','block');
}
function closemore(){
    $('#lookmorelist').css('display','none');
}
// 点击头像出现个人中心
function personcenter(){

}
/**
 * 轮播图
 */
$.getJSON(baseurl+"/index/rotry/planting/map/list",function(data){
         for(var i=0;i<data.rows.length;i++){
             $("#banner").append("<a href="+data.rows[i].clickUrl+" target='_blank'><img src="+data.rows[i].displayImage+"></a>")
         }
         
    /**
     * 1. 轮播图的每张图片需要可以点击
     * 2. 需要绑定的参数是
     *      var 图片显示地址 = data.rows[i].displayImage
     *      var 图片点击地址 = data.rows[i].clickUrl
     */
})

// 顶部信息滚动
var box=document.getElementById("information_box");
var l1=document.getElementById("information_list1");
var l2=document.getElementById("information_list2");
 l2.innerHTML=l1.innerHTML;  //克隆list1的数据，使得list2和list1的数据一样
function scrollup(){
    if(box.scrollTop>=l1.offsetHeight){ //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
        box.scrollTop=0;
    }else{
        box.scrollTop++;
    }
}

 var scrollMove=setInterval(scrollup,200);//数值越大，滚动速度越慢

// //鼠标经过时，滚动停止
box.onmouseover=function(){
    clearInterval(scrollMove)
}

// //鼠标离开时，滚动继续
box.onmouseout=function(){
    scrollMove=setInterval(scrollup,200);
}
// 顶部信息滚动结束

///轮播
$(function() {
    //$("#toright").hide();
    //$("#toleft").hide();
    $('#toright').hover(function() {
        $("#toleft").hide()
    }, function() {
        $("#toleft").show()
    })
    $('#toleft').hover(function() {
        $("#toright").hide()
    }, function() {
        $("#toright").show()
    })
})

var t;
var index = 0;
/////自动播放
t = setInterval(play, 3000)

function play() {
    index++;
    if (index > 4) {
        index = 0
    }
    // console.log(index)
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc",
        "border": ""
    })

    $(".lunbo a").eq(index).fadeIn(1000).siblings().fadeOut(1000);
};

///点击鼠标 图片切换
$("#lunbobox ul li").click(function() {

    //添加 移除样式
    //$(this).addClass("lito").siblings().removeClass("lito"); //给当前鼠标移动到的li增加样式 且其余兄弟元素移除样式   可以在样式中 用hover 来对li 实现
    $(this).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })
    var index = $(this).index(); //获取索引 图片索引与按钮的索引是一一对应的
    // console.log(index);

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});

/////////////上一张、下一张切换
$("#toleft").click(function() {
    index--;
    if (index <= 0) //判断index<0的情况为：开始点击#toright  index=0时  再点击 #toleft 为负数了 会出错
    {
        index = 4
    }
    console.log(index);
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）必须要写
}); // $("#imgbox a ")获取到的是一个数组集合 。所以可以用index来控制切换

$("#toright").click(function() {
    index++;
    if (index > 4) {
        index = 0
    }
    console.log(index);
    $(this).css({
        "opacity": "0.5"
    })
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});
$("#toleft,#toright").hover(function() {
        $(this).css({
            "color": "white"
        })
    },
    function() {
        $(this).css({
            "opacity": "0.3",
            "color": ""
        })
    })
///

///////鼠标移进  移出
$("#lunbobox ul li,.lunbo a img,#toright,#toleft ").hover(
    ////////鼠标移进
    function() {
        $('#toright,#toleft').show()
        clearInterval(t);

    },
    ///////鼠标移开
    function() {
        //$('#toright,#toleft').hide()
        //alert('aaa')
        t = setInterval(play, 3000)

        function play() {
            index++;
            if (index > 4) {
                index = 0
            }
            $("#lunbobox ul li").eq(index).css({
                "background": "#999",
                "border": "1px solid #ffffff"
            }).siblings().css({
                "background": "#cccccc"
            })
            $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }
    })



// 轮播结束



/**
 * 相关链接 - 政府部门
 * todo
 */
$.getJSON(baseurl+"/index/about/link/list?type=1",function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#link_list").append("<option  value="+data.data[i].url+">"+data.data[i].name+"</option>");
        /**
         * 参数
         * var 名称(下拉框的name) = data.data[i].name
         * var url (下拉框点击后跳转的地址) = data.data[i].url
         */
    }
})

$('#link_list').change(function(){
    var link=$("option:selected",this).attr('linkto');
    link && (window.location=link);
})
function show(that) {
    console.log( $(that).val());
    window.open($(that).val());
}





/**
 * 相关链接 - 行业协会
 * todo
 */
$.getJSON(baseurl+"/index/about/link/list?type=2",function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#industy_list").append("<option  value="+data.data[i].url+">"+data.data[i].name+"</option>");
    }
})
function show1(that) {
    console.log( $(that).val());
    window.open($(that).val());
}
/**
 * 相关链接 - 新闻媒体
 * todo
 */
$.getJSON(baseurl+"/index/about/link/list?type=3",function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#media_list").append("<option value="+data.data[i].url+">"+data.data[i].name+"</option>");
    }
})
function show2(that) {
    console.log( $(that).val());
    window.open($(that).val());
}


/**
 * 获得所有信息类别
 */
$.getJSON(baseurl+"/index/info/type",function(data){
    $("#infor").html("<option>信息类别</option>");
    for(var  i=0;i<data.data.length;i++){
        $("#infor").append("<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>");
    }
})
/**
 * 获得所有区域
 */
$.getJSON(baseurl+"/index/region",function(data){
    $("#region").html("<option>地区 </option>");
    for(var i=0;i<data.data.length;i++){
        $("#region").append("<option value='"+data.data[i].regionName+"'>"+data.data[i].regionName+"</option>");
    }
})




/**
 * 查询工程信息
 */
$.post(baseurl+"/index/projectinfo/show",{"pageNum":1,"pageSize":10},function(data){
    var html = ''
    if(data.code === 0){
        // console.log(data)
        var list = data.rows
       
        for (let i = 0,l= list.length; i < l; i++) {
            html+= `<li>
                      
                        <span class="pull-right" id="date">${list[i].date}</span>
                    </li>`
        }
        $('#project_info').html(html)
    }

})

/**
 * 查询工程所有类别
 */
$.post(baseurl+"/index/proejctinfo/type",{},function(data){
    var html = ''
    // console.log(data)
    if(data.code === 0){
        var list = data.data
        for (let i = 0,l=list.length;i < l; i++) {
            html+= ` <span><a href="project_inforomation.html#type=1&value=${list[i].name}">${list[i].name}</a>&nbsp;&nbsp;|&nbsp;</span>`
        }
        $('#kinds').html(html)
    }

})

/**
 * 查询所有工程阶段
 */
$.post(baseurl+"/index/projectinfo/stage",{},function(data){
    var html = ''
    // console.log(data)
    if(data.code === 0){
        var list = data.data
        for (let i = 0,l=list.length;i < l; i++) {
            html+= ` <span><a href="project_inforomation.html#type=2&value=${list[i].name}">${list[i].name}</a>&nbsp;&nbsp;|&nbsp;</span>`
        }
        $('#pre_project').html(html)
    }

})


/**
 * 招标信息的热门搜素
 */
$.getJSON(baseurl+"/index/hotsearch?type=1",function(data){
    for(var  i=0;i<data.data.length;i++){
        $("#search_kind").append("<a value='"+data.data[i].name+"'>"+data.data[i].name+"</a>");
    }
})

/**
 * 获得招标公告
 */
$.getJSON(baseurl+"/index/tendering/all?pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.rows.length;i++){
        $("#zb_list").append(
            " <li >" +
            "     <a href='bidding_information_detail.html?id="+data.rows[i].id+"'>"+data.rows[i].name+"</a>" +
            "     <span class='pull-right' >"+data.rows[i].date+"</span> " +
            " </li>"
        );
    }
})

/**
 * 获得中标公告
 */
$.getJSON(baseurl+"/index/tendering/wining/all?pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.rows.length;i++){
        $("#tendering-win-list").append(
            " <li >" +
            "     <a href='bidding_information_detail.html?id="+data.rows[i].id+"'>"+data.rows[i].name+"</a>" +
            "     <span class='pull-right' >"+data.rows[i].date+"</span> " +
            " </li>"
        );
    }
})



/**
 * 采购 - 中央采购
 */
$.getJSON(baseurl+"/index/local/procurement?pageNum="+1+"&pageSize="+10+"&type=1",function(data){
    for(var i=0;i<data.rows.length;i++){
        $("#local-procurement-center-list").append(
            " <li >" +
            "     <a href='#'>"+data.rows[i].name+"</a>" +
            "     <span class='pull-right' >"+data.rows[i].date+"</span> " +
            " </li>"
        );
    }
})

/**
 * 采购 - 地方采购
 */
$.getJSON(baseurl+"/index/local/procurement?pageNum="+1+"&pageSize="+10+"&type=2",function(data){
    for(var i=0;i<data.rows.length;i++){
        $("#local-procurement-list").append(
            " <li >" +
            "     <a href='#'>"+data.rows[i].name+"</a>" +
            "     <span class='pull-right' >"+data.rows[i].date+"</span> " +
            " </li>"
        );
    }
})


/**
 * 查询广告位 - 首页第一行
 */
$.getJSON(baseurl+"/index/ad/list?adPosition=1",function(data){
        $("#index-ad-1").append(
          "<a href='"+data.rows[0].clickUrl+"' target='_blank'><img src='"+data.rows[0].displayImage +"' width='100%' height='100%' /></a>"
        );
})
/**
 * 查询广告位 - 首页中间
 */
$.getJSON(baseurl+"/index/ad/list?adPosition=2",function(data){
    for(var i=0;i<data.rows.length;i++){
        var style = (i==0?
             'pull-left" style="margin-right:5px; padding:0" ':
             'pull-right" style ="margin-left:5px; padding:0"')
        console.log(style);
        $("#index-ad-center").append(
            '<div class="col-md-6 '+style+'>'+
            '<a href="'+data.rows[i].clickUrl+'" target="_blank">' +
            '<img src="'+data.rows[i].displayImage+'" width="100%" height="100%" />' +
            '</a> ' +
            '</div>'

        );
    }
})
/**
 * 查询广告位 - 首页末尾 index-ad-floor
 */
$.getJSON(baseurl+"/index/ad/list?adPosition=3",function(data){
        $("#index-ad-floor").append(
            "<a href='"+data.rows[0].clickUrl+"' target='_blank'><img src='"+data.rows[0].displayImage +"' width='100%' height='100%' /></a>"
        );
})


/**
 * 查询PPP项目
 */
$.getJSON(baseurl+"/index/iteminfo/list?pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.rows.length;i++) {
        $("#index-iteminfo-ppp").append(
            "<li>" +
            "   <a href=''>"+data.rows[i].name+"</a>" +
            "   <span class='pull-right'>"+data.rows[i].date+"</span>" +
            "</li>"
        );
    }
})

/**
 * 友情链接
 */
$.getJSON(baseurl+"/index/firend/ship/map/links/list",function(data){
    var length = data.data.length;
    for(var i=0;i<4;i++) {
        $("#firend-ship-link1").append(
`
    <a style="margin-right:10px" href="${data.data[i].clickUrl}" target="_blank">
        <img src="${data.data[i].displayUrl}" width="100px" height="35px" />
    </a>
`
        );
    }
    for(var i=0;i<4;i++) {
        $("#firend-ship-link1").append(
`
    <a style="margin-right:10px" href="${data.data[i].clickUrl}" target="_blank">
        <img src="${data.data[i].displayUrl}" width="100px" height="35px" />
    </a>
`
        );
    }
    for(var i=0;i<4;i++) {
        $("#firend-ship-link1").append(
`
    <a style="margin-right:10px" href="${data.data[i].clickUrl}" target="_blank">
        <img src="${data.data[i].displayUrl}" width="100px" height="35px" />
    </a>
`
        );
    }
     $('.link').liMarquee();
    })


/**
 * 供地计划
 */
$.getJSON(baseurl+"/index/land/plan/list?pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.data.length;i++) {
        console.log(data)
        $("#land-plan-list").append(
           "<li style='list-style:none'>" +
            "    <a href='' target='_blank'  style='display:inline-block;width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap'  >" +
                    data.data[i].name +
            "    <span>"+data.data[i].date+"</span>\n" +
            "</a>\n" +
            "</li>"
        );
    }
})
/**
 * 土地交易 - 出让公告
 */
$.getJSON(baseurl+"/index/land/trading/list?type=1&pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#giving-notice-list").append(
          " <li>\n" +
            "                <a href=\"\">"+data.data[i].name+"</a>\n" +
            "                <span class=\"pull-right\">"+data.data[i].date+"</span>\n" +
            "              </li>"
        );
    }
})

/**
 * 土地交易 - 地块公示
 */
$.getJSON(baseurl+"/index/land/trading/list?type=2&pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#plot-public-list").append(
            " <li>\n" +
            "                <a href=\"\">"+data.data[i].name+"</a>\n" +
            "                <span class=\"pull-right\">"+data.data[i].date+"</span>\n" +
            "              </li>"
        );
    }
})


/**
 * 土地交易 - 结构公告
 */
$.getJSON(baseurl+"/index/land/trading/list?type=3&pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#structure-announcement-list").append(
            " <li>\n" +
            "                <a href=\"\">"+data.data[i].name+"</a>\n" +
            "                <span class=\"pull-right\">"+data.data[i].date+"</span>\n" +
            "              </li>"
        );
    }
})


/**
 * 会议信息
 */
$.getJSON(baseurl+"/index/metting/info/list?pageNum="+1+"&pageSize="+10,function(data){
    for(var i=0;i<data.data.length;i++) {
        $("#meeting-nformation-list").append(
           "<li>\n" +
            "                <a href=\"\">"+data.data[i].name+"</a>\n" +
            "                <span class=\"pull-right\">"+data.data[i].date+"</span>\n" +
            "              </li>"
        );
    }
})


// 友情链接轮播


// 登陆
function login(redicetUrl,username,password,rememberMe){
    var obj = new Object();
    obj.username = username;
    obj.password = password;
    obj.rememberMe = rememberMe;
    // $.post(baseurl+"/",data,function(data){

    // });
    $.ajax({
        url: baseurl + "/login",
        type: "post",
        async: false,
        data: obj, 
        success: function(data) {
            if(data.code == 0){

                window.location.href=redicetUrl;
            }else{
                alert('登陆成功')
            }

        }
    });

}




