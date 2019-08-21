
/** 搜索字段初始化 */
var region = "",
  stage = "",
  jobs = "",
  name = "",
  pageNum = 0,
  pageSize = 25;

/** 搜索字段初始化 */
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

/**
 * 查询所有行业
 */
$.post(baseurl + "/system/industry/list", {}, function(data) {
  var html = "";
  if (data.code === 0) {
    var list = data.rows;
    for (let i = 0, l = list.length; i < l; i++) {
      html += `<option>${list[i].name}</option>`;
    }
    $("#right_kinds").append(html);
  }
});

/**
 * 查询所有工程阶段
 */
$.post(baseurl + "/index/projectinfo/stage", {}, function(data) {
  var html = "";
  // console.log(data)
  if (data.code === 0) {
    var list = data.data;
    for (let i = 0, l = list.length; i < l; i++) {
      html += ` <option>${list[i].name}</option>`;
    }
    $("#ringht_stage").append(html);
  }
});

$(function() {
  getdata(
    {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    function(res) {
      console.log("ready", res);
      render("", res.data, res.totalCount, 0);
    }
  );
  Pagination.init($(".ht-page"), pageChange);
});

/*
 * 定义回掉函数
 * @param  number:跳转页
 * */
function pageChange(i) {
  getdata(
    {
      region: region,
      industry:jobs,
      type: stage,
      title: name,
      pageNum: i,
      pageSize: pageSize
    },
    function(res) {
      console.log("pageChange", res);
      render("", res.data, res.totalCount, i);
    }
  );
}

/*
 * 初始化插件
 * @param  object:翻页容器对象
 * @param  function:回调函数
 * */

/*
 * 首次调用
 * @param  object:翻页容器对象
 * @param  number:当前页
 * @param  number:总页数
 * @param  number:每页数据条数
 * */

// 点击标题事件
function viewdetail(obj) {
  console.log("data", obj);
  alert($(obj).attr("dataid"));

  //
  // 1. 获取到ID

  // 2. 发送ajax

  // 3.
}

//工程信息搜索

function search_purchase_information() {
  region = $("#project_information_list").val();
  stage = $("#kinds_check").val();
  jobs = $("#right_kinds").val();
  name = $("#search_kuang").val();
  getdata(
    {
      region: region,
      industry:jobs,
      type: stage,
      title: name,
      pageNum: pageNum,
      pageSize: pageSize
    },
    function(res) {
      render("", res.data, res.totalCount, 0);
    }
  );
}
// 优质项目
function high_quality() {
  getdata(
    {
      highQuality: "是"
    },
    function(res) {
      render("", res.data, res.totalCount, 0);
    }
  );
}
/**
 * 获取列表数据
 * @param {object} opt
 * @param {func} callback
 */
function getdata(opt, callback) {
  $.ajax({
    type: "post",
    url: baseurl + "/system/purchaseInfo/search/list",
    data: opt,
    dataType: "json",
    success: function(res) {
        console.log("采购",res);

      console.log("采购dx",opt);
      callback && callback(res);
    }
  });

}
/**
 * 渲染页面
 * @param {any} element
 * @param {Array} data
 * @param {number} total
 * @param {number} 当前页码
 */
function render(element, data, total, index) {
  Pagination.Page($(".ht-page"), index, total, 25);
  var html = "";
  for (var i = 0, length = data.length; i < length; i++) {
    html +=
      "<tr data-id=" +
      data[i].id +
      ">" +
      "<td><input type='checkbox' name='checkItem'></td>" +

      
        data[i].title +
        "</a></td>" +
      "<td>" +
      data[i].region +
      "</td>" +
 /*     "<td style='width:29%'>" +
      data[i].stage +
      "</td>" +*/
        "<td style='display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 190px;'  >" +
        data[i].stage  +
        "</td>" +
      "<td>" +
      data[i].type +
      "</td>" +
      "<td>" +
      data[i].createDate +
      "</td>" +
      "</tr>";
  }

  // $(element).html(html);
  $("#purchase_information").html(html);
}

// 左侧导航栏点击事件
function left_click(type, name) {
  var typeStr = type == 1 ? "type" : "industry";
  getdata(
    {
      pageNum: 0,
      pageSize: pageSize,
      [typeStr]: name
    },
    function(res) {
      console.log(res);
      render("", res.data, res.totalCount, 0);
    }
  );
}
//点击变背景颜色
window.onload = function(){
  var lis1 = $('#type1 li')
  console.log(lis1)
  var len = lis1.length;
  for(var i=0;i<len;i++){
      lis1[i].onclick = function(){
          for(var j=0;j<len;j++){
              lis1[j].style.backgroundColor = "";
          }
          this.style.backgroundColor = "#0093ff94";
      };
  }
  var lis2 = $('#type2 li')
  console.log(lis2)
  var en = lis2.length;
  for(var i=0;i<en;i++){
      lis2[i].onclick = function(){
          for(var j=0;j<en;j++){
              lis2[j].style.backgroundColor = "";
          }
          this.style.backgroundColor = "#0093ff94";
      };
  }


};
