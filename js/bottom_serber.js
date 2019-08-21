// 底部会员服务
function member_server(res){
    $.post(baseUrl+"system/memberService/list",{},function(data){

        // 将此数据渲染到页面
        var 最终数据 = data.rows[0].detail;
    
    });
}