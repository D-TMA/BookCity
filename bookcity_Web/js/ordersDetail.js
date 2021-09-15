$(document).ready(function () {
    initView();
});

function initView() {
    let id = getUrlString("id");
    //初始化订单
    let obj = new Object();
    obj.m = "detail";
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
                initOrderInfo(result.data);
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    //初始化用户
    let member = new Object();
    member.m = "getLoginMember";
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
        url: basePath + "/api/member",
        //数据，json字符串,
        //返回值的类型
        dataType: "json",
        data: member,
        //请求成功
        success: function (result) {
            console.log(result);
            if(result.code==200){
                initUserInfo(result.data);
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    //初始化商品
    let merchandise = new Object();
    merchandise.m = "merchandiseList";
    merchandise.id = id;
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
        data: merchandise,
        //请求成功
        success: function (result) {
            console.log(result);
            if(result.code==200){
                initMerchandiseInfo(result.data);
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function initOrderInfo(result) {
    console.log("初始化订单信息...");
    $("#orderNO").text(result.orderNO);
    $("#money").text("￥"+result.totalMoney);
    $("#orderDate").text(result.orderDate);
}

function initUserInfo(result) {
    console.log("初始化用户信息...");
    $("#levelName").text(result.levelName);
    $("#favourable").text(result.favourable+"折");
    $("#memberName").text(result.memberName);
    $("#phone").text(result.phone);
    $("#zip").text(result.zip);
    $("#address").text(result.address);
}

function initMerchandiseInfo(result) {
    console.log("初始化购物车中得商品信息...");
    $("#detailTable").html("");
    let caption = $("<caption></caption>").html("订单购物明细");
    $("#detailTable").append(caption);
    let tr_head = $("<tr></tr>").addClass("bg");
    let th1 = $("<th></th>").text("商品名称");
    let th2 = $("<th></th>").text("市场价");
    let th3 = $("<th></th>").text("会员价");
    let th4 = $("<th></th>").text("数量");
    let th5 = $("<th></th>").text("金额");
    tr_head.append(th1,th2,th3,th4,th5);
    $("#detailTable").append(tr_head);
    $.each(result, function (index, element) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").text(element.merName);
        let td2 = $("<td></td>").html("￥"+element.merPrice);
        let td3 = $("<td></td>").html("￥"+element.price);
        let td4 = $("<td></td>").text(element.number);
        let td5 = $("<td></td>").text("￥"+element.money);
        tr.append(td1,td2,td3,td4,td5);
        $("#detailTable").append(tr);
    });
}