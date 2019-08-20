
/**
 * 获得所有信息类别
 */
$.getJSON(baseurl + "/index/info/type", function(data) {
    $("#infor").html("<option>信息类别</option>");
    for (var i = 0; i < data.data.length; i++) {
        $("#infor").append(
            "<option value='" +
            data.data[i].id +
            "'>" +
            data.data[i].name +
            "</option>"
        );
    }
});
/**
 * 获得所有区域
 */
//project_information_list
$.getJSON(baseurl + "/index/region", function(data) {
    $("#region").html("<option>地区 </option>");
    for (var i = 0; i < data.data.length; i++) {
        $("#region").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
        $("#project_information_list").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});
//点击获取详情 判断是否登陆 登陆显示 未登陆提示注册
var id;
window.onload = function() {
    var url = window.location.href;
    id = url.substring(url.lastIndexOf("=") + 1);
    getData(id);
};
var collectiontype = "";

function getData(id) {
    $.getJSON(baseurl + "/system/tenderingInfo/win/" + id, function(data) {
        console.log('中标信息的公告',data);
        $("#projctinfo-content").empty();
        if (data.code == -100) {
            alert("您还未登录");
        } else if (data.code == 0) {
             /**
       * 获取收藏状态： 已收藏 未收藏
       */
      $.ajax({
        url: baseurl + "/system/collection/collection/yes",
        type: "get",
        async: false, //使用同步的方式,true为异步方式
        data: {infoType:"中标信息",title: data.data.name}, //请求的参数 = 给后台传的参数
        success: function(data) {
          collectiontype = data.data > 0 ? "已收藏" : "收藏信息";
          $('#collectiontype').text(collectiontype)

        }
        })  







            var finalData = `
                    <div class='title' style='margin: 15px 0;'>
    <div class="row" style="margin: 15px 0">
        <div class="col-md-12 text-center" style="font-size:25px;"> ${
                data.data.title
                }
    </div>
</div>
<div class="row" style="margin: 8px 0">
    <div class="col-md-12 text-center">
        发布者：
        <span>admin</span> 
        发布时间：
        <span>${data.data.createDate}</span>
         所属地区：
        <span><a href=""> ${data.data.region} </a></span> 
        点击次数：
            <span>33</span>
    </div>
</div>
<div class="row" style="margin: 8px 0">
    <div class="col-md-12 text-center">
        <button class="back_btn"
        onclick="collectproject('中标信息', '${
            data.data.region
          }','${data.data.title}','${
          data.data.id
        }')" id="collectproject">${collectiontype}</button>
        <button class="back_btn">下载工程</button>
        <button class="back_btn onclick="onprint()" id="onprint"">打印工程</button>
    </div>
</div>
</div>
<div style="height: 15px"></div>
<!-- 信息详情的标题结束 -->
<!-- 正文 -->
<div class="main_body" style="height: 77%；overflow-y:scroll; overflow-x:auto;height:700px;"">
    <div class="body_page" style=" overflow-y:auto">
    <table id="process-demo-2" class="tb tb-b c-1" style="margin: 0 auto;width: 80%;">
        <thead>
        </thead>
        <tbody>
        <tr>
            <td class="titla_name">标题：</td>
            <td colspan='3' style="text-align: left;"> ${
                data.data.title
                }</td>
        </tr>
        <tr>
            <td class="titla_name">地区</td>
            <td style="width: 200px"> ${data.data.region}</td>
            <td class="titla_name">中标类别</td>
            <td>${data.data.tenderingInfoType}</td>
        </tr>
        <tr>
            <td class="titla_name">行业</td>
            <td>${data.data.industry}</td>
            <td class="titla_name">发布日期</td>
            <td>${data.data.createDate}</td>
        </tr>
  
        <tr>
            <td class="titla_name">详情</td>
            <td colspan=3>
                <p style="word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;padding: 10px 20px;">${
                data.data.detail
                } </p>
            </td>
        </tr>
        
 
        </tbody>
    </table>
</div>
</div>
            
            `;
            $("#bidding-content").html(finalData);
            // document.getElementById("projctinfo-content").innerHTML = finalData;
        } else if ((data.code = -102)) {
            $("#textchange").text(data.msg);
            $("#erralert").css("display", "block");
        }
    });
}


// 打印预览
function printHtml(html) {
    var bodyHtml = document.body.innerHTML;
    document.body.innerHTML = html;
    window.print();
    document.body.innerHTML = bodyHtml;
  }
  function onprint() {
    var html = $("#printArea").html();
    printHtml(html);
  }
  
  //collectproject
  
  /**
   * 收藏 取消收藏
   * @param {*} infoType  信息类别
   * @param {*} location  信息地址
   * @param {*} title  信息标题
   * @param {*} infoId  信息ID
   */
  function collectproject(infoType, location, title, infoId) {
    var obj;
    // 1.判断信息的类型
  
    var url = collectiontype == "已收藏"?"/system/collection/remove":"/system/collection/add"
    obj = collectiontype == "已收藏"?{id:infoId,infoType:'中标信息'}: {
      folderType: infoType,
      region: location,
      title: title,
      infoId: infoId
    }
    
    // 2.对信息进行操作
    $.post(baseurl + url,obj,function(data) { 
        if (data.code == 0) { 
          console.log('收藏的类型',collectiontype)
          collectiontype =  collectiontype == "收藏信息"?"已收藏":"收藏信息";
         console.log('修改过后的',collectiontype)
          $("#collectproject").text(collectiontype);  
        }
        // code == 500 错误 错误信息展示给用户
        //    code == 0 操作成功
      }
    );
  }
  