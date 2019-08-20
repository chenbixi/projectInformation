$(function(){
    /**
 * 获得所有区域
 */
$.getJSON(baseurl+"/index/region",function(data){
    $("#region").html("<option>地区 </option>");
    $("#region2").html("<option>地区 </option>");
    for(var i=0;i<data.data.length;i++){
        $("#region").append("<option value='"+data.data[i].regionName+"'>"+data.data[i].regionName+"</option>");
    }
    for(var i=0;i<data.data.length;i++){
        $("#region2").append("<option value='"+data.data[i].regionName+"'>"+data.data[i].regionName+"</option>");
    }
})


})

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


