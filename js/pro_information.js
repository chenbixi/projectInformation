/** 搜索字段初始化 */
var region = "",
    stage = "",
    type = "",
    name = "",
    pageNum = 0,
    pageSize = 31;


/**
 * 获得所有信息类别
 */
$.getJSON(baseurl + "/index/info/type", function (data) {
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
$.getJSON(baseurl + "/index/region", function (data) {
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
 * 查询工程所有类别
 */
$.post(baseurl + "/index/proejctinfo/type", {}, function (data) {
    var html = "";
    // console.log(data)
    if (data.code === 0) {
        var list = data.data;
        for (let i = 0, l = list.length; i < l; i++) {
            html += `<option>${list[i].name}</option>`;
        }
        $("#right_kinds").append(html);
    }
});

/**
 * 查询所有工程阶段
 */
$.post(baseurl + "/index/projectinfo/stage", {}, function (data) {
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

$(function () {
    getdata(
        {
            region: region,
            stage: stage,
            type: type,
            name: name,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
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
            stage: stage,
            type: type,
            name: name,
            pageNum: i,
            pageSize: pageSize
        },
        function (res) {
            console.log("pageChange", res);
            render("", res.data, res.totalCount, i);
        }
    );

}





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

function search_project_information() {
    region = $("#project_information_list").val();
    stage = $("#ringht_stage").val();
    type = $("#right_kinds").val();
    name = $("#search_kuang").val();
    getdata(
        {
            region: region,
            stage: stage,
            type: type,
            name: name,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
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
        function (res) {
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
        url: baseurl + "/system/projectInfo/list2",
        data: opt,
        dataType: "json",
        success: function (res) {
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
    Pagination.Page($(".ht-page"), index, total, 31);
    var htmlStr = ' <thead><tr class=\"success\"><th><input type="checkbox" id="checkAll" name="checkAll"></th><th>标题</th><th>地区</th><th>阶段</<th><th>类别</th><th>添加时间</th></tr></thead><tbody id=\"projectinforlist\">';

    $("#collection-list").html(htmlStr);
    var html = "";
    for (var i = 0, length = data.length; i < length; i++) {
        html +=
            "<tr data-id=" +
            data[i].id +
            ">" +
            "<td><input type='checkbox' name='checkItem'></td>" +
            "<td  ><a  style='display: inline-block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 377px;' target='_blank' href='../jgw/infor_detail.html?id=" + data[i].id + " '> " +
            data[i].title +
            "</a></td>" +
            "<td style=''>" +
            data[i].region +
            "</td>" +
            "<td style=''>" +
            data[i].stage +
            "</td>" +
            "<td style=''>" +
            data[i].type +
            "</td>" +
            "<td style=''>" +
            data[i].createDate +
            "</td>" +
            "</tr>";
    }

    // $(element).html(html);
    $("#projectinforlist").html(html + "' </tbody>'");
}

// 左侧导航栏点击事件
function left_click(type, name) {
    var typeStr = type == 1 ? "stage" : "category";
    getdata(
        {
            pageNum: 0,
            pageSize: pageSize,
            [typeStr]: name
        },
        function (res) {
            console.log(res);
            render("", res.data, res.totalCount, 0);
        }
    );
}

//点击变背景颜色
window.onload = function () {
    var lis1 = $('#type1 li')
    var len = lis1.length;
    for (var i = 0; i < len; i++) {
        lis1[i].onclick = function () {
            for (var j = 0; j < len; j++) {
                lis1[j].style.backgroundColor = "";
            }
            this.style.backgroundColor = "#0093ff94";
        };
    }
    var lis2 = $('#type2 li')
    var en = lis2.length;
    for (var i = 0; i < en; i++) {
        lis2[i].onclick = function () {
            for (var j = 0; j < en; j++) {
                lis2[j].style.backgroundColor = "";
            }
            this.style.backgroundColor = "#0093ff94";
        };
    }


};

// // 我的收藏列表
// function mycollection(){
//   getdata(
//     {
//       region: region,
//       stage: stage,
//       type: type,
//       name: name,
//       pageNum: i,
//       pageSize: pageSize
//     },
//     function(res) {
//       console.log("pageChange", res);
//       render("", res.data, res.totalCount, i);
//     }
//   );


//   $.post(baseurl + "/system/collection/list", {folderType:"工程信息"}, function(data) {


//   });


// }


/************************* 以下是收藏信息的代码 **********************/

function getCollectionData(callback) {
    $.ajax({
        type: "post",
        url: baseurl + "/system/collection/list",
        data: {folderType: '工程信息'},
        dataType: "json",
        success: function (res) {
            callback && callback(res);
        }
    });
}


function mycollection() {
    getCollectionData(
        function (res) {
            renderCollect("", res.rows, res.total, 0);
        }
    )
}

function renderCollect(element, data, total, index) {

    // todo 原来是31
    Pagination.Page($(".ht-page"), index, total, 2);
    var htmlStr = ' <thead><tr class=\"success\"><th></th><th>标题</th><th>地区</th><th>收藏时间</th></tr></thead><tbody id=\"projectinforlist\">';
    $("#collection-list").html(htmlStr);
    var html = '';
    for (var i = 0, length = data.length; i < length; i++) {

        html +=
            "<tr data-id=" +
            data[i].id +
            ">" +
            "<td><input type='checkbox' name='checkItem'></td>" +
            "<td  ><a  style='display: inline-block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 377px;' target='_blank' href='../jgw/infor_detail.html?id=" + data[i].infoId + " '> " +
            data[i].title +
            "</a></td>" +
            "<td style=''>" +
            data[i].region +
            "</td>" +
            "<td style=''>" +
            data[i].createDate +
            "</td>" +
            "</tr>";
    }

    $("#projectinforlist").append(html);
    $("#projectinforlist").append(' </tbody>');

}


// 
//   右侧信息列表
$(function() {
    function initTableCheckbox() {
      var $thr = $("table thead tr");
      var $checkAllTh = $(
        '<th><input type="checkbox" id="checkAll" name="checkAll" /></th>'
      );
      /*将全选/反选复选框添加到表头最前，即增加一列*/
      $thr.prepend($checkAllTh);
      /*“全选/反选”复选框*/
      var $checkAll = $thr.find("input");
      $checkAll.click(function(event) {
        /*将所有行的选中状态设成全选框的选中状态*/
        $tbr.find("input").prop("checked", $(this).prop("checked"));
        /*并调整所有选中行的CSS样式*/
        if ($(this).prop("checked")) {
          $tbr
            .find("input")
            .parent()
            .parent()
            .addClass("warning");
        } else {
          $tbr
            .find("input")
            .parent()
            .parent()
            .removeClass("warning");
        }
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
      });
      /*点击全选框所在单元格时也触发全选框的点击操作*/
      $checkAllTh.click(function() {
        $(this)
          .find("input")
          .click();
      });
      var $tbr = $("table tbody tr");
      var $checkItemTd = $(
        '<td><input type="checkbox" name="checkItem" /></td>'
      );
      /*每一行都在最前面插入一个选中复选框的单元格*/
      $tbr.prepend($checkItemTd);
      /*点击每一行的选中复选框时*/
      $tbr.find("input").click(function(event) {
        /*调整选中行的CSS样式*/
        $(this)
          .parent()
          .parent()
          .toggleClass("warning");
        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/
        $checkAll.prop(
          "checked",
          $tbr.find("input:checked").length == $tbr.length ? true : false
        );
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
      });
      /*点击每一行时也触发该行的选中操作*/
      $tbr.click(function() {
        $(this)
          .find("input")
          .click();
      });
    }
    initTableCheckbox();
  });
