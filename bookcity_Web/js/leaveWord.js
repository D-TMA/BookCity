$(document).ready(function () {
    getLeaveWord();
});

function getLeaveWord() {
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
        url: basePath + "/api/leaveWord",
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

/*
<div className="leaveWord-info">
    <div className="left">
        <b>留言标题: </b>ccut
    </div>
    <div className="right">
        <b>顾客姓名: </b> <span id="memberName">KK</span> <b>留言时间: </b><span id="leaveDate">2021年9月1日</span>
    </div>
</div>
<div className="leaveWord-content">
    <span id="content">书不错</span>
</div>
<div className="reply-info">
    <b>管理员回复: </b>
</div>
<div className="reply-content">
    <span id="answerContent">我们会更努力的！</span>
</div>
*/
function initView(result) {
    console.log("页面开始渲染");
    $(".leaveWord").html("");
    $.each(result, function (index, element) {
        let div_info = $("<div></div>").addClass("leaveWord-info");
        let div_left = $("<div></div>").addClass("left");
        let b1 =  $("<b></b>").text("留言标题: ");
        let span1 = $("<span></span>").text(element.title);
        div_left.append(b1,span1);
        let div_right = $("<div></div>").addClass("right");
        let b2 =  $("<b></b>").text("顾客姓名: ");
        let span2 = $("<span></span>").text(element.memberName+"  ");
        let b3 =  $("<b></b>").text("留言时间: ");
        let span3 = $("<span></span>").text(element.leaveDate);
        div_right.append(b2,span2,b3,span3);
        div_info.append(div_left,div_right);
        let div_content = $("<div></div>").addClass("leaveWord-content");
        let span4 = $("<span></span>").text(element.content);
        div_content.append(span4);
        let div_rInfo = $("<div></div>").addClass("reply-info");
        let b4 =  $("<b></b>").text("管理员回复: ");
        div_rInfo.append(b4);
        let div_rContent = $("<div></div>").addClass("reply-content");
        let span5 = $("<span></span>").text(element.answerContent);
        div_rContent.append(span5);
        $(".leaveWord").append(div_info,div_content,div_rInfo,div_rContent);
    });
}