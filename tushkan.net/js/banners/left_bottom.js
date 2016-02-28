/*
$.ajax({
    type : 'GET',
    data : {p:'left_bottom'},
    dataType : 'json',
    contentType: "application/json",
    url : '/index/getbanner',
    async: false,
    success : function (res) {
        if(res.status == "success"){
            var banner = res.banner;
            $("#banner_left_bottom").append(banner.code);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Error : "+textStatus+" / "+errorThrown);
    }
});
*/