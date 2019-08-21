/** 搜索字段初始化 */
    // 地区
var region = "",
    // 信息类别
    folderType = "中标信息",
    // 标题
    title = "",
    pageNum = 0,
    pageSize = 25;


$(function () {
    getCollectionData(
        {
            folderType: folderType,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            renderCollect("", res.data, res.totalCount, 0);
        }
    )
    Pagination.init($(".ht-page"), pageChange);
})

/**
 * 获取到结果对象
 */
function getCollectionData(obj, callback) {
    $.ajax({
        type: "post",
        url: baseurl + "/system/collection/list",
        data: obj,
        dataType: "json",
        success: function (res) {
            callback && callback(res);
        }
    });
}


/*
 * 定义回掉函数
 * @param  number:跳转页
 * */
function pageChange(i) {
    getCollectionData({
            folderType: folderType,
            title: title,
            region: region,
            pageNum: i,
            pageSize: pageSize,
        },
        function (res) {
            console.log("pageChange", res);
            renderCollect("", res.data, res.totalCount, i);
        }
    );

}

/**
 * 渲染表格
 */
function renderCollect(element, data, total, index) {
    Pagination.Page($(".ht-page"), index, total, 25);
    var htmlStr = ' <thead><tr class=\"success\"><th></th><th>标题</th><th>地区</th><th>收藏时间</th></tr></thead><tbody id=\"projectinforlist\">';
    $("#collection-list").html(htmlStr);
    var html = '';
    for (var i = 0, length = data.length; i < length; i++) {

        html +=
            "<tr data-id=" +
            data[i].id +
            ">" +
            "<td><input type='checkbox' name='checkItem'></td>" +
          
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

    $("#projectinforlist").append(html + ' </tbody>');

}

/**
 * 获得所有信息类别
 */
$.getJSON(baseurl+"/index/info/type",function(data){
    $("#infor").html("<option>信息类别</option>");
    for(var  i=0;i<data.data.length;i++){
        $("#infor").append("<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>");
    }
})

/**
 * 获得所有区域
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
        $("#project_collection_list").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});


/**
 * 条件搜索
 */
function search_project_collection(){
    region = $("#project_collection_list").val();
    name = $("#search_collection_title").val();
    getCollectionData(
        {
            region: region,
            title: name,
            folderType:folderType,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            renderCollect("", res.data, res.totalCount, 0);
        }
    );
}