const basePath = "http://localhost:8081/bookcity_Java";
$(document).ready(function () {
    initPage();
    shoppingCartJumpLink();
});

function initPage() {
    $(".header").load("/html/common/header.html");
    $(".menu").load("/html/common/menu.html");
    $(".footer").load("/html/common/footer.html");
}

function shoppingCartJumpLink() {
    $(".next_step").click(function () {
        //window.location.href = "html/shoppingCartConfirmation.html";
        $(location).attr("href","shoppingCartConfirmation.html");
    });
    $(".keep_shopping").click(function () {
        $(location).attr("href","../index.html");
    })
    $(".return").click(function () {
        $(location).attr("href","shoppingCartList.html");
    });
    $(".submit").click(function () {
        $(location).attr("href","shoppingCartSubmit.html");
    });
}

//获得地址栏的参数值
function getUrlString(name) {
    /*
        reg = /(^|&)id=([^&]*)(&|$)/
        r = (4)["id=1", "", "1", "", index: 0, input: "id=1", groups: undefined]
    */
    //                           (^匹配输入字符串开始的位置 或者 &)name参数=(^&匹配除&任意字符串 *匹配前面的子表达式0次或多次)(&或者$匹配输入字符串结尾的位置)
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function linkToShoppingCart() {
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
        url: basePath + "/api/auth/cart",
        //数据，json字符串,
        //返回值的类型
        dataType: "json",
        data: obj,
        //请求成功
        success: function (result) {
            console.log('success......');
            console.log(result);
            if(result.code==505 || result.code==506){
                // 跳转到请先进行登录页面
                location.href="/html/notLoginView.html";
            }else if(result.code==200){
                // 登录成功
                location.href="/html/shoppingCartList.html";
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log('error......');
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}