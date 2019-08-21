$(function(){
    // 1.获取到类型
    var url = window.location.href;
    type = url.substring(url.lastIndexOf("=") + 1);
    // 2.根据类型执行相对应
    handlerContent(type);

})

function handlerContent(type){
    switch(type){
        case "1":
                aboutMeHandler();
        break;
        case "2":
                $("#content").html('gaibian hou  de wenzi ');
        break;
        case "4":
            memberServiceHandler();
            break;
        case "6":
            onlinechat();
            break;
           
    }
}

/**
 * 处理关于我们
 */
function aboutMeHandler(){
 
    $.post(baseurl+"/system/memberService/aboutMe",{'pageNum':1,'pageSize':1},function(data){
           
        var content = data.rows[0].detail;
        console.log(content)
        $("#content").html(content);
        $("#member_title").text("关于我们");
    });    
}


/**
 * 处理会员服务
 */
function memberServiceHandler(){
    $.post(baseurl+"/system/memberService/list",{'pageNum':1,'pageSize':1},function(data){
           
        var content = data.rows[0].detail;
        console.log(content)
        $("#content").html(content);
        $("#member_title").text("会员服务");
    });    
}

// 在线联系
function onlinechat(){
   
           
        var content =  `
        <form action="" id="onlinechatid">
            <table style="margin: 0 auto;">
                <tbody>
                    <tr style="margin:10px 0;">
                        <td>姓名:</td>
                        <td style="text-align: left;">
                            <input type="text" required maxlength="6" style="height: 35px;width: 80%;" name="name"> 
                        </td>
                    </tr>
                    <tr>
                        <td>手机:</td>
                        <td style="text-align: left;">
                            <input type="tel" maxlength="11" style="height: 35px;width: 80%;" name="telphone">
                        </td>
                    </tr>
                    <tr>
                        <td>公司:</td>
                        <td style="text-align: left;">
                            <input type="text" style="height: 35px;width: 80%;" name="company">
                        </td>
                    </tr>
                    <tr>
                        <td>职务:</td>
                        <td style="text-align: left;">
                            <input type="text" style="height: 35px;width: 80%;" name="post">
                        </td>
                    </tr>
                    <tr>
                        <td>留言:</td>
                        <td>
                            <textarea name="detail" id="" cols="50" rows="5"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <button style="height: 35px;width:55px;margin-bottom: 20px;background: #1D8CE0;color: white;font-size: 12px;border: none" onclick="onlinebutton()">提交</button>`
    
        $("#content").html(content);
        $("#member_title").text("在线联系");
   
}

// 在线联系的提交表单
function onlinebutton(){
    $.post(baseurl + "/system/onlineContact/add", $("#onlinechatid").serialize(), function(
        data
      ) {
        if (data.code == 0) {
          alert(data.msg);
          window.open("aboutme.html?type=6");
        }
      });
}