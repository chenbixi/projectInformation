
$(function(){
    
    getUserInfo()
})
// 登陆后的界面
function getUserInfo() {
    $.getJSON(baseurl + "/page/user/user/info/permission", function (data) {
        console.log("获取用户信息", data);
        if (data.code == 500) {
            $("#userlogin").html(
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
          $("#userlogin").html(
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
"               </div>"+
"               </div>"+
"               </div>"+
"               </div>"
            )
        }
    });
}
