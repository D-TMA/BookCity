$(document).ready(function () {
    getCartSelectedMerList();
});

//初始化购物车页面
function getCartSelectedMerList() {
    let obj = new Object();
    obj.m = "list";
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
            if (result.code==200) {
                initView(result.data);
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
//初始化页面
function initView(result) {
    console.log("初始化成功");
    $(".next_step").hide();
    $("table").html("");
    let tr_header = $("<tr></tr>").addClass("bg");
    let tr_header_th1 = $("<th></th>").text("商品名称");
    let tr_header_th2 = $("<th></th>").text("市场价");
    let tr_header_th3 = $("<th></th>").text("会员价");
    let tr_header_th4 = $("<th></th>").text("数量");
    let tr_header_th5 = $("<th></th>").text("金额");
    let tr_header_th6= $("<th></th>").text("删除");
    tr_header.append(tr_header_th1,tr_header_th2,tr_header_th3,tr_header_th4,tr_header_th5,tr_header_th6);
    $("table").append(tr_header);
    let totalMoney = 0;
    $.each(result,function (index, element) {
        let tr = $("<tr></tr>");
        let td1 = $("<td></td>").html("<a href=\"javaScript:goMerDetail("+element.merchandise+")\">"+element.merName+"</a>");
        let td2 = $("<td></td>").html("￥"+element.merPrice);
        let td3 = $("<td></td>").text("￥"+element.price);
        let td4 = $("<td></td>");
        let td4_input = $("<input>");
        //使输入框只能输入数字
        td4_input.attr("oninput","value=value.replace(/^(0+)|[^\\d]+/g,'')");
        //鼠标失去焦点
        td4_input.blur(function () {
            if ($(this).val()=='') {
                $(this).val(element.number);
            }
            let num = $(this).val();
            if (num!=element.number) {
                //修改数量
                let obj = new Object();
                obj.m = "updateNum";
                obj.id = element.id;
                obj.num = num;
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
                        if (result.code==200) {
                            getCartSelectedMerList();
                        }
                    },
                    error: function (e) {
                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
            }
        })
        td4_input.attr("value",element.number);
        td4_input.attr("name","num");
        td4.append(td4_input);
        let td5 = $("<td></td>").html("￥"+element.money);
        let td6 = $("<td></td>");
        let td6_img = $("<img>").attr("src","/resources/images/delete_01.gif");
        td6_img.bind("click",element.id,delMerItem);
        td6.append(td6_img)
        tr.append(td1,td2,td3,td4,td5,td6);
        $("table").append(tr);
        totalMoney+=element.money;
    });
    let tr_footer = $("<tr></tr>").addClass("bg");
    let tr_footer_td = $("<td></td>").attr("colspan",6);
    let tr_footer_td_html = "<div class=\"total-bill\">" +
                            "<img src=\"/resources/images/me03.gif\">" +
                            "<span>总金额：￥"+totalMoney+"</span> </div>";
    tr_footer_td.html(tr_footer_td_html);
    tr_footer.append(tr_footer_td);
    $("table").append(tr_footer);
    if(totalMoney>0){
        $(".next_step").show();
    }
}

function goMerDetail(mid) {
    console.log("查看书籍详情="+mid);
}

function delMerItem(event) {
    let id = event.data;
    console.log("删除商品信息的id="+id);
    let obj = new Object();
    obj.m = "delete";
    obj.id = id;
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
            if (result.code==200) {
                getCartSelectedMerList();   //初始化页面
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function clearShoppingCart() {
    let obj = new Object();
    obj.m = "clear";
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
            if (result.code==200) {
                getCartSelectedMerList();   //初始化页面
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}