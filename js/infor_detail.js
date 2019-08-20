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
   //判断信息是否收藏 收藏显示已收藏
 
  var url = window.location.href;
  id = url.substring(url.lastIndexOf("=") + 1);
  getData(id);
};
var collectiontype = "";
function getData(id) {
  $.getJSON(baseurl + "/system/projectInfo/" + id, function(data) {
    console.log(data);
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
        data: {infoType:"工程信息",title: data.data.name}, //请求的参数 = 给后台传的参数
        success: function(data) {
          collectiontype = data.data > 0 ? "已收藏" : "收藏信息";
          $('#collectiontype').text(collectiontype)

        }
        })  




      var finalData = `
                    <div class='title' style='margin: 15px 0;'>
    <div class="row" style="margin: 15px 0">
        <div class="col-md-12 text-center" style="font-size:25px;"> ${
          data.data.name
        }
    </div>
</div>
<div class="row" style="margin: 8px 0">
    <div class="col-md-12 text-center">
        发布者：
        <span>admin</span> 
        发布时间：
        <span>${data.data.releaseTime}</span>
         所属地区：
        <span><a href=""> ${data.data.region} </a></span> 
        点击次数：
            <span>33</span>
    </div>
</div>
<div class="row" style="margin: 8px 0">
    <div class="col-md-12 text-center">
        <button class="back_btn" onclick="collectproject('工程信息', '${
          data.data.region
        }','${data.data.name}','${
        data.data.id
      }')" id="collectproject">${collectiontype}</button>
        <button class="back_btn">下载工程</button>
        <button class="back_btn" onclick="onprint()" id="onprint">打印工程</button>
    </div>
</div>
</div>
<div style="height: 15px"></div>
<!-- 信息详情的标题结束 -->
<!-- 正文 -->
<div class="main_body" style="height: 77%">
    <div class="body_page" style=" overflow-y:auto" id="printArea">
    <table id="process-demo-2" class="tb tb-b c-1" style="margin: 0 auto;width: 80%;">
        <thead>
        </thead>
        <tbody>
        <tr>
            <td class="titla_name">标题：</td>
            <td colspan='3' style="text-align: left;"> ${data.data.name}</td>
        </tr>
        <tr>
            <td class="titla_name">是否优质</td>
            <td style="width: 200px"> ${data.data.highQuality}</td>
            <td class="titla_name">地区</td>
            <td></td>
        </tr>
        <tr>
            <td class="titla_name">占地面积</td>
            <td>${data.data.floorArea}</td>
            <td class="titla_name">建筑面积</td>
            <td>${data.data.coversArea}</td>
        </tr>
        <tr>
            <td class="titla_name">工程编号</td>
            <td>${data.data.id}</td>
            <td class="titla_name">工程阶段</td>
            <td> ${data.data.stage}</td>
        </tr>
        <tr>
            <td class="titla_name">工程类别</td>
            <td>${data.data.category}</td>
            <td class="titla_name">工程造价</td>
            <td> ${data.data.projectCost}</td>
        </tr>
        <tr>
            <td class="titla_name">项目类型</td>
            <td colspan=3>${data.data.type}</td>
            
        </tr>
        <tr>
            <td class="titla_name">开工日期</td>
            <td>${data.data.startDate}</td>
            <td class="titla_name">结束日期</td>
            <td>${data.data.endDate}</td>
        </tr>
        <tr>
            <td class="titla_name">发布时间</td>
            <td> ${data.data.releaseTime}</td>
            <td>更新时间</td>
            <td class="titla_name"> ${data.data.updateDate}</td>
        </tr>
        <tr>
            <td class="titla_name">承建商</td>
            <td>${data.data.contractors}</td>
            <td>设计师</td>
            <td class="titla_name"> ${data.data.designer}</td>
        </tr>
        <tr>
            <td class="titla_name">工程地址</td>
            <td colspan=3> ${data.data.address}</td>
        </tr>
        <tr>
            <td class="titla_name">工程概况</td>
            <td colspan=3>
                <p style="word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;padding: 10px 20px;"> ${
                  data.data.projectSummary
                } </p>
            </td>
        </tr>
        <tr>
            <td class="titla_name">跟进记录</td>
            <td colspan=3>
                <p style="word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;padding: 10px 20px;">${
                  data.data.followUpRecords
                } </p>
            </td>
        </tr>
        <tr>
            <td class="titla_name">甲方</td>
            <td colspan=3>
                <p style="word-wrap: break-word;
                   word-break: break-all;
                   overflow: hidden;text-align: left;padding: 10px 20px;">${
                     data.data.partya
                   }</p>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</div>
            
            `;
      $("#projctinfo-content").html(finalData);
      // document.getElementById("projctinfo-content").innerHTML = finalData;
    } else if ((data.code = -102)) {
      // alert(data.msg);
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
  obj = collectiontype == "已收藏"?{id:infoId,infoType:'工程信息'}: {
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
