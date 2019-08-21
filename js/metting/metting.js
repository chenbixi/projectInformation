
/** 搜索字段初始化 */
var region = "",
    stage = "",
    jobs = "",
    name = "",
    pageNum = 0,
    pageSize = 25;



$(function() {
    getdata(
        {
            pageNum: pageNum,
            pageSize: pageSize,
        },
        function(res) {
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

/**
 * 获取列表数据
 * @param {object} opt
 * @param {func} callback
 */
function getdata(opt, callback) {
    $.ajax({
        type: "post",
        url: baseurl + "/system/conferenceInformation/list",
        data: opt,
        success: function(res) {
            console.log("获取到的数据: ",res);
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
            "<td style='width:29%'>" +
            data[i].stage +
            "</td>" +
            "<td>" +
            data[i].createDate +
            "</td>" +
            "</tr>";
    }

    // $(element).html(html);
    $("#metting-list").html(html);
}

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
        $("#database-region-list").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});


function searchMetting() {
    // 1.获取到地区
    region = $("#mt-region-list").val();
    // 2.获取到行业
    industry = $("#mt-industry-list").val();
    // 3.获取到类别
    type = $("#metting-type-list").val();
    // 4.获取到输入框
    title = $("#mt-input").val();
    getdata(
        {
            title: title,
            region: region,
            industry: industry,
            type: type,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function(res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}

/**
 * 查询所有地区
 */
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
        $("#mt-region-list").append(
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
            html += `<option value="${list[i].name}">${list[i].name}</option>`;
        }
        $("#mt-industry-list").append(html);
    }
});

function leftsearch(name){
    getdata(
        {
            type: name,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function(res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}