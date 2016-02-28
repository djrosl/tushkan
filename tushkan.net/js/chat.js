$(".open_user_page").live("click",function(){
    var user_id = $(this).attr("user_id");
    window.open('/index/8-'+user_id,'up'+user_id,'scrollbars=1,top=0,left=0,resizable=1,width=680,height=350'); 
});

$("#mchatRSel").live("change",function(){
    var param = $("#mchatRSel option:selected").val();
    var func_id = $(this).attr("func_id");
    clearInterval(func_id);
    if(param != 0){
        func_id = setInterval(function(){ refreshChat(); }, param+'000');
        $(this).attr("func_id",func_id);
    }
    $.post('/index/setreftime/time/'+param, function(e){
        
    });
});

$('#mchatMsgF').live("keydown",function(e){
    if(e.keyCode == 13){
        chat_send();
    }
});

$('#mchatBtn').live("click",function(){
    chat_send();
});

function chat_send(){
    var message = $("#mchatMsgF").val();
    $('#mchatBtn').hide();
    $("#mchatAjax").show();
    if(message == ""){
        afterRatingBlock2('Не заполнено поле "Сообщение"');
        setTimeout(function(){
            killBlock();
            $("#mchatAjax").hide();
            $('#mchatBtn').show();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {message:message},
            dataType : 'json',
            contentType: "application/json",
            url : '/index/chat',
            async: false,
            success : function (res) {
                if(res.status == "added"){
                    setTimeout(function(){
                        $("#mchatMsgF").val('');
                        $("#mchatAjax").hide();
                        $('#mchatBtn').show();
                        refreshChat();
                    }, 1000);
                }
                if(res.status == "user_banned"){
                    popupBannedUser();
                    setTimeout(function(){
                        $("#mchatAjax").hide();
                        $('#mchatBtn').show();
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
}

$("#chat_smiles").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getsmiles',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var smiles = res.smiles;
                $("#popupSmiles").remove();
                popupSmiles(smiles);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
})

$("#chat_bb_codes").live("click",function(){
    window.open('/index/showbbcodes','subwindow','HEIGHT=550,WIDTH=550') 
});

$("#chat_settings").live("click",function(){
    window.open('/index/chatsettings','subwindow','HEIGHT=550,WIDTH=750') 
});

