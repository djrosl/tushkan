/*
$.ajax({
    type : 'GET',
    data : {p:'right_big'},
    dataType : 'json',
    contentType: "application/json",
    url : '/index/getbanner',
    async: false,
    success : function (res) {
        if(res.status == "success"){
            var banner = res.banner;
            $("#banner_right_big").append(banner.code);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Error : "+textStatus+" / "+errorThrown);
    }
});
*/
document.write("<div id='bn_a84352d028'>загрузка...</div> <script type='text/javascript' src='http://recreativ.ru/rcode.a84352d028.js'></script>");