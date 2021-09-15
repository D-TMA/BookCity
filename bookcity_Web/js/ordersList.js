$(document).ready(function () {
   getOrdersList();
});

function getOrdersList() {
    let obj = new Object();
    obj.m = "list";
    //初始化商品类型列表
    $.ajax({
        //请求方式  同步 false  异步true
        async: true,
        // Ajax请求设置xhrFields的withCredentials为true实现跨域访问
        xhrFields: {
            withCredentials: true
        },
        //请求方式
        type: "POST",
        //请求地址
        url: basePath + "/api/auth/orders",
        //数据，json字符串,
        //返回值的类型
        dataType: "json",
        data: obj,
        //请求成功
        success: function (result) {
            console.log(result);
            if (result.code==200) {
                initView(result.data);
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function initView(result) {
    console.log("页面开始渲染");
    $("table").html("");
    // 设计表头
    let tr_header = $("<tr></tr>").addClass("bg");
    let tr_header_th1 = $("<th></th>").text("订单编号");
    let tr_header_th2 = $("<th></th>").text("金额");
    let tr_header_th3 = $("<th></th>").text("下单日期");
    let tr_header_th4 = $("<th></th>").text("订单状态");
    let tr_header_th5 = $("<th></th>").text("编辑");
    tr_header.append(tr_header_th1,tr_header_th2,tr_header_th3,tr_header_th4,tr_header_th5);
    $("table").append(tr_header);
    $.each(result, function (index, element) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").text(element.orderNO);
        let td2 = $("<td></td>").html("￥"+element.totalMoney).addClass("font-red");
        let td3 = $("<td></td>").html(element.orderDate);
        let orderStatus = element.orderStatus;
        let orderText = "";
        // 1-未付款 2-已付款 未发货 3-已发货 未签收 4-已签收 未评价 5-已评价
        if(orderStatus==1){
            orderText = "未付款";
        }else if(orderStatus==2){
            orderText = "已付款 未发货";
        }else if(orderStatus==3){
            orderText = "已发货 未签收";
        }else if(orderStatus==4){
            orderText = "已签收 未评价";
        }else if(orderStatus==5){
            orderText = "已评价";
        }
        let td4 = $("<td></td>").text(orderText);
        let td5 = $("<td></td>");
        let td5_a_find = $("<a></a>").addClass("checkOrder font-red").text("查看订单").attr("href","#");
        let td5_a_delete = $("<a></a>").addClass("deleteOrder").text("删除订单").attr("href","#");
        td5_a_delete.bind("click",element.id,deleteOrderById)
        td5_a_find.bind("click",element.id,goOrderDetail)
        td5.append(td5_a_find,td5_a_delete);
        tr.append(td1,td2,td3,td4,td5);
        $("table").append(tr);
    });
}

//跳转到订单详情
function goOrderDetail(event) {
    let id = event.data;
    location.href="/html/orderDetail.html?id="+id;
}

//删除订单
function deleteOrderById(event) {
    let id = event.data;
    console.log("删除的订单id="+id);
    // 初始化
    let obj = new Object();
    obj.m = "delete";
    obj.id = id;
    $.ajax({
        //请求方式  同步 false  异步true
        async: true,
        // Ajax请求设置xhrFields的withCredentials为true实现跨域访问
        xhrFields: {
            withCredentials: true
        },
        //请求方式
        type: "POST",
        //请求地址
        url: basePath + "/api/auth/orders",
        //数据，json字符串,
        //返回值的类型
        dataType: "json",
        data: obj,
        //请求成功
        success: function (result) {
            console.log(result);
            if(result.code==200){
                getOrdersList();
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}