$(document).ready(function () {
   let id = getUrlString("id");
   let obj = new Object();
   obj.m = "getMerchandiseListById";
   obj.id = id;
   $.ajax({
      async: true,
      type: "POST",
      url: basePath+"/api/merchandise",
      dataType: "json",
      data: obj,
      success: function (result) {
         initMerchandiseInfo(result);
      },
      error: function (e) {
         console.log(e.status);
         console.log(e.responseText);
      }
   });
});

function initMerchandiseInfo(result) {
   console.log(result);
   $(".detail").html("");
   let img = $("<img>").attr("src","/resources"+result.picture);
   let span1 = $("<span></span>").text("商品类别: "+result.category);
   let br1 = $("<br>");
   let span2 = $("<span></span>").text("商品名称: "+result.merName);
   let br2 = $("<br>");
   let span3 = $("<span></span>").text("市场价: ￥"+result.price);
   let br3 = $("<br>");
   let span4 = $("<span></span>").text("会员价: ￥"+result.sprice);
   let br4 = $("<br>");
   let span5 = null;
   let br5 = null;
   let span6 = $("<span></span>").text("生产厂家: "+result.manufacturer);
   let br6= $("<br>");
   let span7 = $("<span></span>").text("出厂日期: "+result.leaveFactoryDate);
   let br7 = $("<br>");
   let span8 = $("<span></span>").text("商品描述: "+result.merDesc);
   if (result.special==1) {
      span5 = $("<span></span>").text("会员价: ￥"+result.sprice);
      br5 = $("<br>");
   }
   $(".detail").append(img,span1,br1,span2,br2,span3,br3,span4,br4,span5,br5,span6,br6,span7,br7,span8);
}