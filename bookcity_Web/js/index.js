$(document).ready(function () {
    let obj = new Object();
    obj.m = "list";
    //初始化商品类型列表
    $.ajax({
        async: true,
        type: "GET",
        url: basePath+"/api/category",
        dataType: "json",
        data: obj,
        success: function (result) {
            initCategoryList(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    let merchObj = new Object();
    merchObj.m = "getMerchandiseListBySpecial";
    merchObj.special = 0;
    //初始化商品
    $.ajax({
        async: true,
        type: "POST",
        url: basePath+"/api/merchandise",
        dataType: "json",
        data: merchObj,
        success: function (result) {
            initMerchandiseList(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    let specialmerchObj = new Object();
    specialmerchObj.m = "getMerchandiseListBySpecial";
    specialmerchObj.special = 1;
    //初始化商品
    $.ajax({
        async: true,
        type: "POST",
        url: basePath+"/api/merchandise",
        dataType: "json",
        data: specialmerchObj,
        success: function (result) {
            initSpecialMerchandiseList(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    //绑定登录按钮事件
    $(".btn-login").click(login);
    $(".btn-register").click(register);
    //初始化登录界面
    initLoginView();

    $("#more-special").click(function () {
        location.href="/html/merchandiseList.html?special=1";
    });

    $("#more-news").click(function () {
        location.href="/html/merchandiseList.html?special=0";
    });
});

/**
 * 初始化新品信息
 * @param result
 */
function initMerchandiseList(result) {
    $("#new-merchandise").html("");
    $.each(result,function (index,element) {
        let div = $("<div></div>");
        div.addClass("merchandise");
        let img1 = $("<img>");
        img1.attr("src","/resources"+element.picture);
        let br1 = $("<br>");
        let a = $("<a></a>").text(element.merName);
        a.attr("href","#"+element.id);
        let br2 = $("<br>");
        let span1 = $("<span></span>").text("市场价：￥"+element.price);
        let br3 = $("<br>");
        let span2 = $("<span></span>").text("会员价：￥"+element.sprice);
        let br4 = $("<br>");
        let img2 = $("<img>").attr("src","/resources/images/icon_car.gif");
        let img3 = $("<img>").attr("src","/resources/images/icon_buy.gif");
        img2.bind("click",element.id,getMerchandiseDetail);
        img3.bind("click",element.id,addShoppingCart);
        img3.addClass("nm-img");
        div.append(img1,br1,a,br2,span1,br3,img2,img3);
        $("#new-merchandise").append(div);
    });
}

//初始化商品列表
function initCategoryList(result) {
    $(".category-ul").html("");  //先清空内容
    //加入到$(".search-content")
    $.each(result,function (index,element) {
        let li = $("<li></li>");
        let a = $("<a></a>").text(element.cateName)
        a.attr("href","#"+element.id);
        li.append(a);
        $(".category-ul").append(li);
    });
}

/**
 * 初始化特价商品
 * @param result
 */
function initSpecialMerchandiseList(result) {
    $("#special-merchandise").html("");
    $.each(result,function (index,element) {
        let div = $("<div></div>");
        div.addClass("merchandise");
        let img1 = $("<img>");
        img1.attr("src","/resources"+element.picture);
        let br1 = $("<br>");
        let a = $("<a></a>").text(element.merName);
        a.attr("href","#"+element.id);
        let br2 = $("<br>");
        let span1 = $("<span></span>").text("市场价：￥"+element.price);
        let br3 = $("<br>");
        let span2 = $("<span></span>").text("会员价：￥"+element.sprice);
        let br4 = $("<br>");
        let img2 = $("<img>").attr("src","/resources/images/icon_car.gif");
        let img3 = $("<img>").attr("src","/resources/images/icon_buy.gif");
        img3.addClass("nm-img");
        img2.bind("click",element.id,getMerchandiseDetail);
        img3.bind("click",element.id,addShoppingCart);
        div.append(img1,br1,a,br2,span1,br3,span2,br4,img2,img3);
        $("#special-merchandise").append(div);
    });
}

/**
 * 获得商品详情
 * @param event
 */
function getMerchandiseDetail(event) {
    let id = event.data;
    location.href = "/html/merchandiseDetail.html?id="+id;
}

/**
 * 添加购物车
 * @param event
 */
function addShoppingCart(event) {
    let id = event.data;
    let obj = new Object();
    obj.m = "add";
    obj.merId = id;
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
            if(result.code==505 || result.code==506){
                // 跳转到请先进行登录页面
                location.href="/html/notLoginView.html";
            }else if(result.code==200){
                // 登录成功
                location.href="/html/shoppingCartList.html";
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

//登录
function login() {
    //用户名
    let loginName = $("#loginName").val();
    //密码
    let loginPwd = $("#loginPwd").val();
    let obj = new Object();
    obj.m = "login";
    obj.loginName = loginName;
    obj.loginPwd = loginPwd;
    //ajax请求
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/member",
        dataType: "json",
        data: obj,
        success: function (result) {
            console.log(result);
            loginSuccess(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function loginSuccess(result) {
    if (result.code==200) {
        console.log(result.msg);
        createLoginView(result);
    } else {
        console.log(result.msg);
        $("#errLogin").show();
    }
}

function register() {
    let obj = new Object();
    obj.m = "getLoginMember";
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/member",
        dataType: "json",
        data: obj,
        success: function (result) {
            console.log(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function initLoginView() {
    let obj = new Object();
    obj.m = "getLoginMember";
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/member",
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

//展示登录窗口信息
function createLoginView(result) {
    if (result.code==200) {
        let member = result.data;
        $(".login-wrap").html("");
        let txt = '';
        txt += "<br>";
        txt += "<span style='font-size: 30px;color: green'>欢迎："+member.memberName+"</span>";
        txt += "<br>";
        txt += "<span style='font-size: 30px;color: green'>会员级别："+member.levelName+"</span>";
        txt += "<p align='center'><button style=\"width:100px;background-color:#6F98E7;border-radius:10px;color:white;border:none\" onclick='Logout()'>安全退出</button></p>";
        $(".login-wrap").html(txt);
    }
}

function Logout() {
    let obj = new Object();
    obj.m = "logout";
    $.ajax({
        async: true,
        xhrFields: {
            withCredentials: true
        },
        type: "POST",
        url: basePath+"/api/member",
        dataType: "json",
        data: obj,
        success: function (result) {
            location.href="/index.html";
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}