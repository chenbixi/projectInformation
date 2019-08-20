

// 用户名接口
function checkusername() {
  var user = $("#user1").val();
  $.getJSON(baseurl + "/page/user/check?username=" + user + "", function(data) {
    console.log("yonghum: ", data);
    if (data > 0) {
      $(".ck_name").text("用户名重复");
      $(".ck_name").css("color", "red");
    } else {
      $(".ck_name").text("");
    }
  });
}

//验证邮箱
function checkemail() {
  check_email()
}
function check_email() {
  var temp = $("#email").val();
  //对电子邮件的验证
  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!myreg.test(temp)) {
    $(".ck_e").text("请输入正确的邮箱");
    $(".ck_e").css("color", "red");
  } else {
    $(".ck_e").text("");
  }
}

//  验证手机号
function checkphone() {
  check_phone();
}
function check_phone() {
  var temp = $("#phonenumber").val();
  //对电话的验证
  var myreg = /^1[3456789]\d{9}$/;
  if (!myreg.test(temp)) {
    $(".ck_phone").text("请输入正确的手机号");
    $(".ck_phone").css("color", "red");
  } else {
    $(".ck_phone").text("");
  }
}
function sss(that) {
  return new Promise((resolve, reject) => {
    console.log(that);
    
  var seconds = 60;
  $(that).attr("disabled", true);
  that.innerHTML = (seconds+'秒');
    let setTimer = setInterval(
        () => {
          seconds -= 1;
          // console.info('倒计时:' + seconds);
          that.innerHTML = seconds+'秒';
          if (seconds <= 0) {
            that.innerHTML = '获取验证码';
            resolve(setTimer)
          }
        }
        , 1000)
      })
}
//手机验证码
function aquire_code(that) {
 
  if($("#phonenumber").val()==""){
    $(".ck_phone").text("请输入正确的手机号");
    $(".ck_phone").css("color", "red");
    return

  }



 
  sss(that).then((setTimer) => {
    // console.info('清除');
    clearInterval(setTimer);
    $(that).attr("disabled", false);
  })


  /**/
  var temp = $("#phonenumber").val();
  //对电话的验证
  var myreg = /^1[3456789]\d{9}$/;
  if (!myreg.test(temp)) {
    $(".ck_phone").text("请输入正确的手机号");
    $(".ck_phone").css("color", "red");
  } else {
    $(".ck_phone").text("");
    console.log("2312312323123");
    $.getJSON(
      baseurl + "/page/user/send/message?type=1&phone=" + temp,
      function(data) {
        console.log("phone: ", data);
      }
    );
  }
}
//图片验证
function changepic() {
  $(".pic>img").attr(
    "src",
    "http://192.168.0.104:8081/captcha/captchaImage?type=char"
  );
}

//密码验证
function showpassword() {
  var psd = $("#psw").val();
  // console.log(psd)
  if (psd.length == 0) {
    $(".check_psd").text("密码不能为空");
    $(".check_psd").css("color", "red");
    document.getElementById("lv1").style.borderTopColor = "darkgrey";
    document.getElementById("lv2").style.borderTopColor = "darkgrey";
    document.getElementById("lv3").style.borderTopColor = "darkgrey";
  } else if (psd.length < 6) {
    $(".check_psd").text("密码小于六位");
    $(".check_psd").css("color", "red");
  } else if (psd.length >= 6 && psd.length <= 16) {
    $(".check_psd").text("");
    var reg = /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/; //全是数字或全是字母     6-16个字符
    var reg1 = /^[A-Za-z0-9]{6,16}$/; //数字、26个英文字母      6-16个字符
    var reg2 = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/;
    // 由数字、26个英文字母或者下划线组成的字符串    6-16个字符
    if (psd.match(reg)) {
      document.getElementById("lv1").style.borderTopColor = "red";
      document.getElementById("lv2").style.borderTopColor = "darkgrey";
      document.getElementById("lv3").style.borderTopColor = "darkgrey";
    } else if (psd.match(reg1)) {
      document.getElementById("lv1").style.borderTopColor = "red";
      document.getElementById("lv2").style.borderTopColor = "yellow";
      document.getElementById("lv3").style.borderTopColor = "darkgrey";
    } else if (psd.match(reg2)) {
      document.getElementById("lv1").style.borderTopColor = "red";
      document.getElementById("lv2").style.borderTopColor = "yellow";
      document.getElementById("lv3").style.borderTopColor = "green";
    }
  } else if (psd.length > 16) {
    $(".check_psd").text("密码长度大于16个字符!");
    $(".check_psd").css("color", "red");
    document.getElementById("lv1").style.borderTopColor = "gainsboro";
    document.getElementById("lv2").style.borderTopColor = "gainsboro";
    document.getElementById("lv3").style.borderTopColor = "gainsboro";
  }
}
/*
$.post(baseurl + "/index/projectinfo/stage", {}, function(data) {
  var html = "";
  // console.log(data)
  if (data.code === 0) {
    var list = data.data;
    for (let i = 0, l = list.length; i < l; i++) {
      html += ` <span><a href="">${list[i].name}</a>&nbsp;&nbsp;|&nbsp;</span>`;
    }
    $("#pre_project").html(html);
  }
});*/

var a = true;

function showpsd() {
  var showpsd = $("#psw");
  console.log(showpsd.attr("type"));

  if (a) {
    showpsd.attr("type", "password");
    a = false;
  } else {
    showpsd.attr("type", "text");
    a = true;
  }

  console.log("a点击后的值： ", showpsd.attr("type"));
}

//确认密码
function check_pwd() {
  var psd = $("#psw").val();
  var conpsd = $("#confirmpwd").val();
  if (conpsd == "") {
    $(".con_pwd").text("请先输入密码再确认密码");
  } else if (psd === conpsd) {
    $(".con_pwd").text("");
  } else {
    $(".con_pwd").text("两次密码不一致");
    $(".con_pwd").css("color", "red");
  }
}

// 固定电话验证
function check_tele() {
  checktele();
}

function checktele() {
  var temp = $("#telephone").val();
  //对固话的验证
  var myreg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;
  if (!myreg.test(temp)) {
    $(".check_tele").text("请注意格式 区号-固话");
    $(".check_tele").css("color", "red");
  } else {
    $(".check_tele").text("");
  }
}

//点击注册接口

/*$.post(baseurl + "/page/user/regist", {}, function(data) {
  var html = "";
  // console.log(data)
  if (data.code === 0) {
    var list = data.data;
    for (let i = 0, l = list.length; i < l; i++) {
      html += ` <span><a href="">${list[i].name}</a>&nbsp;&nbsp;|&nbsp;</span>`;
    }
    $("#pre_project").html(html);
  }
});*/

function regist() {
  $("#hide_information").val($("#province").val() + "," + $("#city").val());
  console.log("地方的值 ", $("#hide_information").val());

  $.post(baseurl + "/page/user/regist", $("#registFrom").serialize(), function(
    data
  ) {
    console.log("返回的数据 ", data);
    if (data.code == 500) {
      alert(data.msg);
    } else if (data.code == 0) {
      alert(data.msg);
    }
  });
}

function changePasswordStatus() {
  // 1.获取到当前值
  var currentValue = $("#remember").val();
  $("#remember").val(currentValue == "on" ? "off" : "on");
}

// 登陆
function login() {
  $("#rememberText").val($("#remember").val() == "on" ? "false" : "true");
  console.log($("#rememberText").val());

  var data = new Object();
  data.username = $("#user").val();
  data.password = $("#pswd").val();
  data.rememberMe = $("#rememberText").val();
  $.post(baseurl + "/login ", data, function(data) {
    console.log("返回的数据 ", data);
    // code == 500 错误 错误信息展示给用户
    //    code == 0 操作成功
  });
}
