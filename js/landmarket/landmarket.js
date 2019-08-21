

/** 搜索字段初始化 */
var title = "",
    region = "",
    type = "",
    pageNum = 0,
    pageSize = 25;


$(function () {
    getdata(
        {
            pageNum: pageNum,
            pageSize: pageSize,
        },
        function (res) {
            console.log("获取到的数据", res);
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
            type: stage,
            title: name,
            pageNum: i,
            pageSize: pageSize
        },
        function (res) {
            console.log("pageChange", res);
            render("", res.data, res.totalCount, i);
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
        url: baseurl + "/system/landMarket/list",
        data: opt,
        dataType: "json",
        success: function (res) {
            console.log("获取到的数据: ", res);
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
         
            data[i].id +
            " ' style='display: inline-block;width: 90%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;'> " +
            data[i].title +
            "</a></td>" +
            "<td>" +
            data[i].region +
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
    $("#land-market-list").html(html);
}

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
        $("#lm-region-list").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});


function search_database() {
    region = $("#database-region-list").val();
    name = $("#search_kuang").val();
    getdata(
        {
            region: region,
            name: name,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}


$.post(baseurl + "/system/landMarketType/list", {}, function (res) {
    console.log("接收到的数据: ", res);
    var result = ' <option value="">类别查询</option>';
    for (var i = 0, len = res.rows.length; i < len; i++) {
        result += ' <option value="' + res.rows[i].name + '">' + res.rows[i].name + '</option>';
    }
    $("#land-market-type-list").html(result);

});


function landmarketSearch() {
    // 类别
    type = $("#land-market-type-list").val();
    // 地区
    region = $("#lm-region-list").val();
    // 输入框
    input = $("#lm-input-search").val();

    getdata(
        {
            title: input,
            region: region,
            type: type,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}


function lmSearch(type) {
    // 类别


    getdata(
        {

            type: type,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}