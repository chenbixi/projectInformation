/** 搜索字段初始化 */
var title = "",
    tenderingInfoType = "",
    region = "",
    industry = "",
    pageNum = 0,
    pageSize = 25;


$(function () {
    getdata(
        {
            type: 1,
            pageNum: pageNum,
            pageSize: pageSize,
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
            type:1,
            region: region,
            tenderingInfoType: tenderingInfoType,
            industry:industry,
            title: title,
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
        url: baseurl + "/system/tenderingInfo/searchlist",
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
    var html = "";
    for (var i = 0, length = data.length; i < length; i++) {
        html +=
            "<tr data-id=" +
            data[i].id +
            ">" +
            "<td><input type='checkbox' name='checkItem'></td>" +
            "<td  ><a  style='display: inline-block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 377px;' target='_blank' href='../jgw/bidding_information_detail.html?id="+data[i].id +" '> " +
            data[i].title +
            "</a></td>" +
            "<td style=''>" +
            data[i].type +
            "</td>" +
            "<td style=''>" +
            data[i].region +
            "</td>" +
            "<td style='width:156px'>" +
            data[i].stage +
            "</td>" +
            "<td style=''>" +
            data[i].createDate +
            "</td>" +
            "</tr>";
    }
    $("#bidding-list").html(html);
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
        $("#database-region-list").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});

/**
 * todo
 */
/*function search_bidding() {
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
}*/

/*
$.post(baseurl + "/system/tenderingInfoType/list", {}, function (res) {
    var result = ' <option value="">招标类别查询</option>';
    for (var i = 0, len = res.rows.length; i < len; i++) {
        result += ' <option value="' + res.rows[i].name + '">' + res.rows[i].name + '</option>';
    }
    $("#bidding-info-list").html(result);

});
*/


/**
 * 最顶部地区
 */
$.getJSON(baseurl + "/index/region", function (data) {
    $("#region").html("<option value=''>地区</option>");
    $("#bidding-region").html("<option value=''>招标地区查询</option>");
    for (var i = 0; i < data.data.length; i++) {
        $("#region").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
        $("#bidding-region").append(
            "<option value='" +
            data.data[i].regionName +
            "'>" +
            data.data[i].regionName +
            "</option>"
        );
    }
});
$.post(baseurl + "/system/industry/list", {}, function(data) {
    $("#bidding-info-industry-list").html("<option value=''>行业查询</option>");
    var html = "";
    if (data.code === 0) {
        var list = data.rows;
        for (let i = 0, l = list.length; i < l; i++) {
            html += `<option>${list[i].name}</option>`;
        }
        $("#bidding-info-industry-list").append(html);
    }
});
// 招标查询
function biddingSearch() {
    // 行业
    industry = $("#bidding-info-industry-list").val();
    // 地区
    region = $("#bidding-region").val();
    // 类别
    type = $("#bidding-info-list").val();
    // 输入框
    input = $("#bidding-input-value").val();

    getdata(
        {
            title: input,
            region: region,
            tenderingInfoType: type,
            industry: industry,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}

/**
 * 左侧搜索
 * @param type
 * @param name
 */
function leftsearch(type,name) {

    // 搜索类型
    var typeStr = type == 1?"tenderingInfoType":"industry";
    // 类别

    getdata(
        {
            [typeStr]: name,
            pageNum: pageNum,
            pageSize: pageSize
        },
        function (res) {
            render("", res.data, res.totalCount, 0);
        }
    );
}



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