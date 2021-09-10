$(document).ready(function () {
    initList();
});

function initList() {
    //获得地址栏special的值
    let special = getUrlString("special");
    console.log("special: "+special);
    let query = 'all';
    let obj = new Object();
    obj.special = special;
    obj.query = query;
    obj.m = "getMerchandiseListBySpecial";
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/merchandise",
        dataType: "json",
        data: obj,
        success: function (result) {
            console.log(result);
            createLoginView(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function createLoginView(result) {
    let special = getUrlString("special");
    $("table").html("");
    let tr_header = $("<tr></tr>").addClass("bg");
    let tr_header_th1 = $("<th></th>").addClass("img").text("商品图片");
    let tr_header_th2 = $("<th></th>").text("商品基本信息");
    let tr_header_th3 = $("<th></th>").addClass("description").text("商品描述");
    let tr_header_th4 = $("<th></th>").text("商品操作");
    tr_header.append(tr_header_th1,tr_header_th2,tr_header_th3,tr_header_th4);
    $("table").append(tr_header);
    $.each(result,function (index, element) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").html("<img width=\"200px\" height=\"200px\" src=\"/resources"+element.picture+"\">");
        let td2 = $("<td></td>");
        let td2_p1 = $("<p></p>").html("<a href='#id'"+element.id+">"+element.merName+"</a>");
        let td2_p2 = $("<p></p>").html("市场价: ￥"+element.price);
        let td2_p3 = null;
        if (special==1) {
            td2_p3 = $("<p></p>").html("特价: ￥"+element.sprice);
        }
        let td2_p4 = $("<p></p>").html("生产厂家: "+element.manufacturer);
        td2.append(td2_p1,td2_p2,td2_p3,td2_p4);
        let td3 = $("<td></td>").text(element.merDesc);
        let td4 = $("<td></td>");
        let td4_img1 = $("<img>").attr("src","/resources/images/icon_car.gif");
        td4_img1.click(detail(element.id));
        let td4_br = $("<br>");
        let td4_img2 = $("<img>").attr("src","/resources/images/icon_buy.gif");
        td4_img2.click(buy(element.id));
        td4.append(td4_img1,td4_br,td4_img2);
        tr.append(td1,td2,td3,td4);
        $("table").append(tr);
        let tr_footer = $("<tr></tr>").addClass("divide");
        let td_footer = $("<td></td>").attr("colspan",4);
        tr_footer.append(td_footer);
        $("table").append(tr_footer);
    });
}

function detail(id) {

}

function buy(id) {

}