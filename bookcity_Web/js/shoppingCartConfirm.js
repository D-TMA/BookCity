$(document).ready(function () {
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
            createMemberInfoView(result);
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createMemberInfoView(result) {
    console.log(result);
    let member = result.data;
    $("#levelName").text(member.levelName);
    $("#favourable").text(member.favourable);
    $("#memberName").val(member.memberName);
    $("#phone").val(member.phone);
    $("#zip").val(member.zip);
    $("#address").val(member.address);
}