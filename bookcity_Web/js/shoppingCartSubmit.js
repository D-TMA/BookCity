$(document).ready(function () {
    let obj = new Object();
    obj.m = "submit";
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/auth/cart",
        dataType: "json",
        data: obj,
        success: function (result) {
            console.log(result);
            initOrderInfo(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function initOrderInfo(result) {
    $("#orderNO").text(result.data.orderNO);
    $("#money").text(result.data.totalMoney);
    $("#orderDate").text(result.data.orderDate);

}