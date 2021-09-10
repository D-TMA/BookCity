$(document).ready(function () {
    let obj = new Object();
    obj.m = "list";
   $.ajax({
       async: true,
       type: "GET",
       url: basePath+"/api/category",
       dataType: "json",
       data: obj,
       success: function (result) {
            console.log(result);
            initCategory(result);
       },
       error: function (e) {
           console.log(e.status);
           console.log(e.responseText);
       }
   });
});

//初始化商品列表
function initCategory(result) {
    $(".search-content").html("");  //先清空内容
    let header_option = $("<option></option>");
    header_option.text("所有商品");
    header_option.attr("value","-1");
    //加入到$(".search-content")
    $(".search-content").append(header_option);
    $.each(result,function (index,element) {
       console.log(element);
       let option = $("<option></option>").text(element.cateName);
       option.attr("value",element.id);
       $(".search-content").append(option);
    });
}