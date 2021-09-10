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