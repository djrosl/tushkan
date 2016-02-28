window.ulb = {photoPage: "Перейти на страницу с фотографией.",closeBtn: "Закрыть", error: "Запрошенный контент не может быть загружен. Пожалуйста, попробуйте позже.", next: "Вперед", prev: "Предыдущий", btnPlay: "Начать слайдшоу", btnToggle: "Изменить размер"}
new Image().src = "http://counter.yadro.ru/hit;noadsru?r"+escape(document.referrer)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();

$(document).ready(function(){
    var link_1 = $("div.breadcrumbs a:last");
    link_1.parent().append('<b style="font-weight:normal;">'+link_1.html()+'</b>');
    link_1.remove();
    $('body div[itemtype="http://schema.org/Movie"]').hide();
    $("div.report-spam-hidden").each(function(){
        $(this).hide();
        var comment_id = $(this).attr("comment_id");
        $('<div id="report-spam-toggle-wrapper-'+comment_id+'" class="report-spam-toggle-wrapper" style="margin-left: 0px;"><span class="report-spam-toggle-text">Спам-сообщение скрыто.</span> <a class="report-spam-toggle-button report-spam-handled" data-target="#comEnt'+comment_id+'" href="javascript://">Показать</a></div>').insertBefore($("#comEnt"+comment_id));
    });
    $("#chat_frame").append('<iframe id="mchatIfm2" name="mchat" style="width:100%;height:600px;" frameborder="0" scrolling="auto" hspace="0" vspace="0" allowtransparency="true" src="/index/mchat/"></iframe>');
});

$('.refresh_captcha').live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/refreshcaptcha',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var captcha_id = res.captcha_id;
                $(".captcha_id").val(captcha_id);
                $("#secImg").attr('src','/captcha/'+captcha_id+'.png');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$('.deletecomment').live("click",function(){
    if(confirm('Вы точно хотите удалить этот комментарий?')){
        $.post('/user/deletecomment/id/'+$(this).attr('comment_id'), {}, function(e){
            location.reload();
        })
    }
    return false;
});

$('.editcomment').live("click",function(){
    var comment_id = $(this).attr('comment_id');
    $.ajax({
        type : 'GET',
        data : {comment_id:comment_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getcomment',
        async: false,
        success : function (res) {
            if(res.status == "comment"){
                var comment = res.comment;
                $("#popup_comment_edit").remove();
                showPopupCommentEdit(comment);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$('.save_commentt').live("click",function(){
    var idc = $(this).attr('idc');
    var idm = $(this).attr('idm');
    var text = $('#mess').val();
    if(idc && text){
        $.post('/user/editcomment/id/'+idc+'/idm/'+idm, {message:text}, function(e){
            window.location.href = window.location.href;
            window.location.reload();
        });
    }
});

$('.save_chat_message').live("click",function(){
    var idm = $(this).attr('idm');
    var text = $('#mess').val();
    if(idm && text){
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data: {message:text},
            contentType: "application/json",
            url : '/index/editchatmessage/id/'+idm,
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#comEntT"+idm).find(".message_text").html(text);
                    $("#popup_chat_message_edit").remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
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

function refreshChat(){
    document.getElementById('mchatIfm2').src='/index/mchat/?'+Math.random();return false;
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

$(".open_mini_chat").live("click",function(){
    window.open('/index/minichat','subwindow','HEIGHT=700,WIDTH=300') 
});

$("#chat_settings").live("click",function(){
    window.open('/index/chatsettings','subwindow','HEIGHT=550,WIDTH=750') 
});

$("#chat_bb_codes").live("click",function(){
    window.open('/index/showbbcodes','subwindow','HEIGHT=550,WIDTH=550') 
});

$(".open_user_page").live("click",function(){
    var user_id = $(this).attr("user_id");
    //window.open('/index/8-'+user_id,'up'+user_id,'scrollbars=1,top=0,left=0,resizable=1,width=680,height=350'); 
    window.open('/index/8-'+user_id,'_blank');
});

$(".chat_delete_message").live("click",function(){
    var message_id = $(this).attr("message_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/chatdeletemessage/id/'+message_id,
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#comEntT"+message_id).remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".chat_edit_message").live("click",function(){
    var message_id = $(this).attr("message_id");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getmessage/id/'+message_id,
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var message = res.message;
                showPopupChatMessageEdit(message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".smile_to_add").live("click",function(){
    var message = $("#mchatMsgF").val();
    var smile = $(this).attr("smile");
    $("#mchatMsgF").val(message+' [img]/sml/'+smile+'[/img] ').focus();
});

$(".chat_to_user").live("click",function(){
    var username = $(this).attr("username");
    $("#mchatMsgF").val('[i]'+username+'[/i], ').focus();
});

//------------ Repute
$('.repHistory').live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var repute = res.repute;
                var username = res.username;
                var admin = res.admin;
                var repute_value = res.repute_value;
                var user_id = res.user_id;
                var user_rep_hide = res.user_rep_hide;
                $("#popup_repute_user").remove();
                showPopupReputeUser(repute,username,admin,repute_value,user_id,user_rep_hide);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".m_edit_rep_val").live("click",function(){
    var user_id = $(this).attr("user_id");
    var text = $('#kdfjeu2').html();
    $('#kdfjeu2').html('<input user_id="'+user_id+'" class="m_repute_text" value="'+text+'"/>');
    $(this).hide();
    $('.m_repute_text').focus();
});

$(".m_repute_text").live("focusout",function(){
    var user_id = $(this).attr("user_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:user_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/meditrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.m_edit_rep_val').show();
                $('.m_repute_text').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".m_clear_repute").live("click",function(){
    var user_id = $(this).attr("user_id");
    if(confirm('Вы подтверждаете данное действие?')){
        $.ajax({
            type : 'GET',
            data : {id:user_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/mclearrepute',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#popupReputeDiv .ljdj3uur").remove();
                    $("#kdfjeu2").html("");
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".user_rep_hide").live("click",function(){
    var user_id = $(this).attr("user_id");
    var item = $(this);
    $.ajax({
        type : 'GET',
        data : {id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/rephide',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $("#ljdemcla").attr("src","/img/icon/add.png");
                $("#ljdemcla").attr("title","Включить репутацию");
                item.attr("class","user_rep_show");
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".user_rep_show").live("click",function(){
    var user_id = $(this).attr("user_id");
    var item = $(this);
    $.ajax({
        type : 'GET',
        data : {id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/repshow',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $("#ljdemcla").attr("src","/img/icon/ban.png");
                $("#ljdemcla").attr("title","Отключить репутацию");
                item.attr("class","user_rep_hide");
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupReputeUser(repute,username,admin,repute_value,user_id,user_rep_hide){
    var count_reputes = repute.length;
    
    var str_manage = '';
    
    if(user_rep_hide == true){
        var str_rep_hide_class = "user_rep_show";
        var str_rep_hide_title = "Включить репутацию";
        var str_rep_hide_img_src = "/img/icon/add.png";
    }else{
        var str_rep_hide_class = "user_rep_hide";
        var str_rep_hide_title = "Отключить репутацию";
        var str_rep_hide_img_src = "/img/icon/ban.png";
    }
    
    if(admin == true){
        str_manage = '<div style="padding:0 5px;">'+
        '<a href="javascript://" rel="nofollow" id="lksdfkjd" class="m_edit_rep_val" user_id="'+user_id+'" title="Изменить репутацию"><img alt="" src="/img/icon/edt.png" width="16" height="16" border="0"></a> '+
        '<a href="javascript://" rel="nofollow" class="'+str_rep_hide_class+'" user_id="'+user_id+'"><img alt="" id="ljdemcla" title="'+str_rep_hide_title+'" src="'+str_rep_hide_img_src+'" width="16" height="16" border="0"></a> '+
        '<a href="javascript://" rel="nofollow" title="Очистить репутацию" class="m_clear_repute" user_id="'+user_id+'"><img alt="" src="/img/icon/clear.png" width="16" height="16" border="0"></a>'+
        '</div>';
    }
    
    var res = '<div id="popup_repute_user" style="position: fixed; z-index: 10012; overflow: visible; left: 50%;top: 50%;margin-left: -204px;margin-top: -170px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 415px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 425px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr">'+
    '<div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 417px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 417px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_repute_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div>'+
    '<div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">История репутации</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div>'+
    '<div class="myWinCont" id="popupReputeDiv" style="overflow: auto; width: 395px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr><td width="25%" nowrap="nowrap">Репутация "'+username+'":</td>'+
    '<td><b><span id="kdfjeu2">'+repute_value+'</span></b></td>'+
    '<td width="10%" nowrap="nowrap">'+str_manage+'</td>'+
    '</tr></tbody></table><hr>'+
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    while(i < count_reputes){
        var a = new Date(repute[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(date.length == 1){
            date = '0'+date;
        }
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        if(repute[i].value > 0){
            var class_image = "popup_repute_plus";
        }
        if(repute[i].value < 0){
            var class_image = "popup_repute_minus";
        }
        if(repute[i].value == 0){
            var class_image = "popup_repute_none";
        }
        if(repute[i].forum_url != ''){
            var ist = '[<a href="'+repute[i].forum_url+'" target="_blank">Источник</a>]';
        }else{
            var ist = '';
        }
        
        var str_answer = '<a href="javascript://" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnA.gif" width="15" height="15" title="Ответить"></a>';
        var str_edit_repute = '';
        var str_delete_repute = '';
        if(admin == true){
            str_edit_repute = '<a href="javascript://" class="edit_repute" repute_id="'+repute[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_repute = '<a href="javascript://" class="delete_repute" repute_id="'+repute[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#popupReputeDiv").append('<div class="ljdj3uur"><div id="blr'+repute[i].id+'"><table border="0" cellpadding="1" cellspacing="1" width="100%">'+
        '<tbody><tr><td width="70%"><div title="Уровень повышен [+20]" class="'+class_image+'" style="width:16px;height:17px;float:left;"></div> &nbsp; <a class="banHUser" href="/index/8-'+repute[i].id_from+'" target="_blank"><b>'+repute[i].username+'</b></a> &nbsp; <span style="font-size:7pt">'+ist+'</span></td><td align="right" style="white-space: nowrap;font-size:7pt">'+time+' &nbsp;'+
        
        str_edit_repute+
        str_delete_repute+
        
        '</td></tr>'+
        '<tr><td colspan="2"><div id="mmtx'+repute[i].id+'">'+repute[i].message+'</div><div><span id="mmaxt'+repute[i].id+'"></span><i><span id="mmax2370"></span></i></div></td></tr></tbody></table><hr></div></div>');
        i++;
    }
}

$(".close_popup_repute_user").live("click",function(){
    $("#popup_repute_user").remove();
});

$(".repute_show_add_popup").live("click",function(){
    var user_id = $(this).attr('user_id');
    $('body').append('<div id="repute_add_popup" style="position: fixed; z-index: 10008; overflow: visible; left: 158px; top: 61px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 227px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 227px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 227px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 229px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_repute_add_popup" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Репутация пользователя</span></div></div></div></div>'+
    '<div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 188px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><fieldset><legend><b>Действие</b></legend>'+
    '<div class="popup_repute_none" style="width:16px;height:17px;float:left;"></div><input id="a0" type="radio" name="act" value="0" checked=""><label for="a0">не изменять репутацию</label><div style="clear:both"></div>'+
    '<div class="popup_repute_plus" style="width:16px;height:17px;float:left;"></div><input id="a2" type="radio" name="act" value="2"><label for="a2">повысить репутацию</label><div style="clear:both"></div>'+
    '<div class="popup_repute_minus" style="width:16px;height:17px;float:left;"></div><input id="a1" type="radio" name="act" value="1"><label for="a1">понизить репутацию</label></fieldset>'+
    '<fieldset><legend><b>Комментарий</b></legend><textarea name="reason" id="repute_comment" style="height:50px;width:99%;"></textarea></fieldset>'+
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td id="msg'+user_id+'"></td><td width="10%">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="outBtn">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter">'+
    '<div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm'+user_id+'">'+
    '<a href="javascript://" class="repute_add_confirm" user_id="'+user_id+'">Применить</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm'+user_id+'" id="submfrm'+user_id+'"></td>'+
    '</tr></tbody></table></td></tr></tbody></table></fieldset>'+
    '<input type="hidden" name="a" value="23"><input type="hidden" name="s" value="106546"><input type="hidden" name="t" value="1">'+
    '<input type="hidden" name="ssid" value="q61u1Lkj"><input type="hidden" name="ref" value=""></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
});

$(".close_repute_add_popup").live("click",function(){
    $("#repute_add_popup").remove();
});
$(".repute_add_confirm").live("click",function(){
    var user_id = $(this).attr('user_id');
    var repute_comment = $("#repute_comment").val();
    var a1 = $("#a1").prop('checked'); // minus
    var a2 = $("#a2").prop('checked'); // plus
    var repute_change = "none";
    if(a1 == true){
        repute_change = "minus";
    }
    if(a2 == true){
        repute_change = "plus";
    }
    $.ajax({
        type : 'GET',
        data : {user_id:user_id,change:repute_change,comment:repute_comment},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/addrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                afterRatingBlock2("Репутация изменена");
                setTimeout(function(){
                    $("#repute_add_popup").remove();
                    killBlock();
                }, 2000);
            }
            if(res.status == "banned_user"){
                popupBannedUser();
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".edit_repute").live("click",function(){
    var repute_id = $(this).attr("repute_id");
    var text = $('#mmtx'+repute_id).html();
    $('#mmtx'+repute_id).html('<textarea repute_id="'+repute_id+'" class="repute_text">'+text+'</textarea>');
    $(this).hide();
    $('.repute_text[repute_id="'+repute_id+'"]').focus();
});

$(".repute_text").live("focusout",function(){
    var repute_id = $(this).attr("repute_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:repute_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_repute[repute_id="'+repute_id+'"]').show();
                $('.repute_text[repute_id="'+repute_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_repute").live("click",function(){
    var repute_id = $(this).attr("repute_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:repute_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleterepute',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blr'+repute_id).parent().remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Repute end

//------------ Awards
$('.awardsHistory').live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getallawards',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var awards = res.awards;
                var username = res.username;
                $("#popup_some_awards_user").remove();
                $("#popup_awards_user").remove();
                showPopupAwardsUser(awards,username);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupAwardsUser(awards,username){
    var count_awards_all = awards.length;
    var res = '<div id="popup_awards_user" style="position: fixed; z-index: 10008; overflow: visible;left: 50%;top: 50%;margin-left: -250px;margin-top: -170px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 497px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 507px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 499px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 499px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_awards_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Список наград - '+username+' ('+count_awards_all+')</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 477px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<fieldset class="awards_marks"><legend><b>Знаки отличия</b></legend></fieldset>'+
    '<fieldset class="awards_love"><legend><b>Любовь</b></legend></fieldset>'+
    '<fieldset class="awards_food"><legend><b>Еда</b></legend></fieldset>'+
    '<fieldset class="awards_positive"><legend><b>Позитив</b></legend></fieldset>'+
    '<fieldset class="awards_animals"><legend><b>Животные</b></legend></fieldset>'+
    '<fieldset class="awards_subjects"><legend><b>Предметы</b></legend></fieldset>'+
    '<fieldset class="awards_negative"><legend><b>Негатив</b></legend></fieldset>'+
    '<fieldset class="awards_rich"><legend><b>Богатство</b></legend></fieldset>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 499px; height: 316px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    var awards_marks = '';var awards_love = '';var awards_food = '';var awards_positive = '';var awards_animals = '';var awards_subjects = '';var awards_negative = '';awards_rich = '';
    
    var count_awards = [];
    
    k=1;
    kk=1;
    while(kk < 56){
        count_awards[kk] = 1;
        kk++;
    }
    while(i < count_awards_all){
        if(awards[i].award < 11){
            if(awards_marks.indexOf('item_award_'+awards[i].award) == -1){
                awards_marks += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 16){
            if(awards_love.indexOf('item_award_'+awards[i].award) == -1){
                awards_love += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 26){
            if(awards_food.indexOf('item_award_'+awards[i].award) == -1){
                awards_food += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 31){
            if(awards_positive.indexOf('item_award_'+awards[i].award) == -1){
                awards_positive += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 36){
            if(awards_animals.indexOf('item_award_'+awards[i].award) == -1){
                awards_animals += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 46){
            if(awards_subjects.indexOf('item_award_'+awards[i].award) == -1){
                awards_subjects += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 51){
            if(awards_negative.indexOf('item_award_'+awards[i].award) == -1){
                awards_negative += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 56){
            if(awards_rich.indexOf('item_award_'+awards[i].award) == -1){
                awards_rich += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }
        i++;
    }
    
    if(awards_marks != ""){
        $(".awards_marks").append(awards_marks);
    }else{
        $(".awards_marks").hide();
    }
    
    if(awards_love != ""){
        $(".awards_love").append(awards_love);
    }else{
        $(".awards_love").hide();
    }
    
    if(awards_food != ""){
        $(".awards_food").append(awards_food);
    }else{
        $(".awards_food").hide();
    }
    
    if(awards_positive != ""){
        $(".awards_positive").append(awards_positive);
    }else{
        $(".awards_positive").hide();
    }
    
    if(awards_animals != ""){
        $(".awards_animals").append(awards_animals);
    }else{
        $(".awards_animals").hide();
    }
    
    if(awards_subjects != ""){
        $(".awards_subjects").append(awards_subjects);
    }else{
        $(".awards_subjects").hide();
    }
    
    if(awards_negative != ""){
        $(".awards_negative").append(awards_negative);
    }else{
        $(".awards_negative").hide();
    }
    
    if(awards_rich != ""){
        $(".awards_rich").append(awards_rich);
    }else{
        $(".awards_rich").hide();
    }
    
    kk=1;
    while(kk < 56){
        $(".count_awards_"+kk).html(count_awards[kk]);
        kk++;
    }
}

$(".close_popup_awards_user").live("click",function(){
    $("#popup_awards_user").remove();
});

$('.item_award').live("click",function(){
    var user_id = $(this).attr('user_id');
    var award = $(this).attr('award');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id,award:award},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getsomeawards',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var awards = res.awards;
                var admin = res.admin;
                $("#popup_awards_user").remove();
                showPopupSomeAwardsUser(awards,admin);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupSomeAwardsUser(awards,admin){
    var count_awards = awards.length;
    var res = '<div id="popup_some_awards_user" style="position: fixed; z-index: 10012; overflow: visible;left: 50%;top: 50%;margin-left: -199px;margin-top: -125px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 247px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 247px; left: 395px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 405px; top: 247px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 397px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 397px; height: 249px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_some_awards_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Список наград - Детали</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 208px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 375px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div id="some_awards_content" align="left"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr>'+
    '<td width="10%"><img alt="" src="/img/awards/'+awards[0].award+'.png" border="0"></td>'+
    '<td style="padding-left:6px;"><b>'+count_awards+'</b></td>'+
    '<td align="right" valign="top">[<a href="javascript://" class="awardsHistory" user_id="'+awards[0].id_to+'" rel="nofollow">Все награды</a>]</td></tr></tbody></table>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 397px; height: 224px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    while(i < count_awards){
        var a = new Date(awards[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(date.length == 1){
            date = '0'+date;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        
        switch(awards[i].group_name){
            case 'GUESTS' : group = "Гости"; break;
            case 'REGISTERED' : group = "Пользователи"; break;
            case 'REGISTERED_COPPA' : group = "Зарегистрированные COPPA"; break;
            case 'GLOBAL_MODERATORS' : group = "Глобальные модераторы"; break;
            case 'ADMINISTRATORS' : group = "Администраторы"; break;
            case 'BOTS' : group = "Боты"; break;
            case 'NEWLY_REGISTERED' : group = "Недавно зарегистрированные"; break;
            case 'MODERATORS' : group = "Модераторы"; break;
            case 'EDITORS' : group = "Редакторы"; break;
            case 'CERTIFIED' : group = "Проверенные"; break;
            case 'BANNED' : group = "Забаненные"; break;
            default : group = "Не найдено"; break;
        }
        
        var str_edit_award = '';
        var str_delete_award = '';
        if(admin == true){
            str_edit_award = '<a href="javascript://" class="edit_award" award_id="'+awards[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_award = '<a href="javascript://" class="delete_award" award_id="'+awards[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#some_awards_content").append('<fieldset id="blk'+awards[i].id+'"><legend><b><a href="/index/8-'+awards[i].id_from+'" target="_blank">'+awards[i].username+'</a></b> ('+group+')</legend><div style="text-align:justify;" id="mtx'+awards[i].id+'">'+awards[i].text+'</div><div style="padding:3px 0;font-size:7pt;text-align:right;">'+time+' &nbsp;'+
        
        str_edit_award+
        str_delete_award+
        '</div></fieldset>');
        i++;
    }
}

$(".close_popup_some_awards_user").live("click",function(){
    $("#popup_some_awards_user").remove();
});


$(".awards_show_add_popup").live("click",function(){
    var user_id = $(this).attr('user_id');
    var username = $(this).attr("username");
    $("#popup_item_add_award").remove();
    $("#popup_add_award_user").remove();
    showPopupAddAwardUser(user_id,username);
});

function showPopupAddAwardUser(user_id,username){
    var res = '<div id="popup_add_award_user" style="position: fixed; z-index: 10008; overflow: visible;left: 50%;top: 50%;margin-left: -250px;margin-top: -170px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 497px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 507px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 499px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 499px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_add_award_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Вручить награду</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 477px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<fieldset class="awards_marks"><legend><b>Знаки отличия</b></legend></fieldset>'+
    '<fieldset class="awards_love"><legend><b>Любовь</b></legend></fieldset>'+
    '<fieldset class="awards_food"><legend><b>Еда</b></legend></fieldset>'+
    '<fieldset class="awards_positive"><legend><b>Позитив</b></legend></fieldset>'+
    '<fieldset class="awards_animals"><legend><b>Животные</b></legend></fieldset>'+
    '<fieldset class="awards_subjects"><legend><b>Предметы</b></legend></fieldset>'+
    '<fieldset class="awards_negative"><legend><b>Негатив</b></legend></fieldset>'+
    '<fieldset class="awards_rich"><legend><b>Богатство</b></legend></fieldset>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 499px; height: 316px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=1;
    var awards_marks = '';var awards_love = '';var awards_food = '';var awards_positive = '';var awards_animals = '';var awards_subjects = '';var awards_negative = '';awards_rich = '';
    
    while(i < 56){
        if(i < 11){
            awards_marks += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i< 16){
            awards_love += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 26){
            awards_food += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 31){
            awards_positive += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 36){
            awards_animals += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 46){
            awards_subjects += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 51){
            awards_negative += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 56){
            awards_rich += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }
        i++;
    }
    
    $(".awards_marks").append(awards_marks);
    $(".awards_love").append(awards_love);
    $(".awards_food").append(awards_food);
    $(".awards_positive").append(awards_positive);
    $(".awards_animals").append(awards_animals);
    $(".awards_subjects").append(awards_subjects);
    $(".awards_negative").append(awards_negative);
    $(".awards_rich").append(awards_rich);
    
}

$(".close_popup_add_award_user").live("click",function(){
    $("#popup_add_award_user").remove();
});


$(".item_add_award").live("click",function(){
    var user_id = $(this).attr('user_id');
    var username = $(this).attr('username');
    var award = $(this).attr('award');
    var res ='<div id="popup_item_add_award" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 397px; z-index: 2; overflow: visible;left: 50%;top: 50%;margin-left: -198px;margin-top: -127px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 397px; height: 155px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_item_add_award" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Вручить награду</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 114px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 375px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr>'+
    '<td width="1%"><img alt="" src="/img/awards/'+award+'.png" border="0"></td>'+
    '<td style="padding-left:5px"><b>'+username+'</b></td>'+
    '<td width="5%" nowrap="nowrap" align="right" valign="top">[<a class="awards_show_add_popup" user_id="'+user_id+'" username="'+username+'" href="javascript://" rel="nofollow">Все награды</a>]</td>'+
    '</tr></tbody></table>'+
    
    '<fieldset><legend><b>Комментарий</b></legend><input type="text" id="item_add_award_comment" name="comment" style="width:99%;" maxlength="180"></fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td id="msg735">&nbsp;</td><td width="5%" nowrap="nowrap"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on">'+
    
    '<a href="javascript://" class="add_award_user_confirm" user_id="'+user_id+'" award="'+award+'">Добавить</a>'+
    
    '</div></td><td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td><td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm"></td></tr></tbody></table></td></tr></tbody></table></fieldset></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>';
    $("#popup_add_award_user").remove();
    $('body').append(res);
});

$(".close_popup_item_add_award").live("click",function(){
    $("#popup_item_add_award").remove();
});

$(".add_award_user_confirm").live("click",function(){
    var user_id = $(this).attr('user_id');
    var award = $(this).attr('award');
    var comment = $("#item_add_award_comment").val();
    if(comment == ''){
        afterRatingBlock2("Введите комментарий");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {user_id:user_id,award:award,comment:comment},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/addaward',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#popup_item_add_award").remove();
                    afterRatingBlock2("Награда добавлена");
                    setTimeout(function(){
                        killBlock();
                    }, 2000);
                }
                if(res.status == "banned_user"){
                    popupBannedUser();
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".edit_award").live("click",function(){
    var award_id = $(this).attr("award_id");
    var text = $('#mtx'+award_id).html();
    $('#mtx'+award_id).html('<textarea award_id="'+award_id+'" class="award_text">'+text+'</textarea>');
    $(this).hide();
    $('.award_text[award_id="'+award_id+'"]').focus();
});

$(".award_text").live("focusout",function(){
    var award_id = $(this).attr("award_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:award_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editaward',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_award[award_id="'+award_id+'"]').show();
                $('.award_text[award_id="'+award_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_award").live("click",function(){
    var award_id = $(this).attr("award_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:award_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleteaward',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blk'+award_id).remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Awards end 

//------------ Remarks
$(".show_popup_user_remarks").live("click",function(){
    var user_id = $(this).attr('user_id');
    $("#popup_user_remarks").remove();
    $('body').append('<div id="popup_user_remarks" style="position: fixed; z-index: 10080; overflow: visible; left: 50%;top: 50%;margin-left: -200px;margin-top: -146px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 290px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 290px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 290px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd10" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 292px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_user_remarks" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Центр замечаний пользователя</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 251px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    
    '<fieldset><legend><b>Действие</b></legend>'+
    '<input id="remark_a1" type="radio" name="act" value="1"><label for="remark_a1">[–] понизить уровень замечаний (снять бан)</label><br>'+
    '<input id="remark_a2" type="radio" name="act" value="2"><label for="remark_a2">[+] повысить уровень замечаний</label><br>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Введите причину</b></legend>'+
    '<textarea rows="3" name="reason" id="remark_comment" style="height:50px;width:99%;"></textarea>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Блокировать активность</b></legend>'+
    '<input type="text" name="time" id="remark_time" size="3" value="0" maxlength="3">'+
    '<select size="1" name="period" id="remark_period"><option value="1">дней</option><option value="2">часов</option></select> &nbsp; '+
    '<input type="checkbox" id="remark_ever" name="ever" value="1"><label for="ever">Блокировать навсегда</label>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Отправить уведомление</b></legend>'+
    '<input type="checkbox" id="sendto1" name="sendto" value="1" checked=""><label for="sendto1">Личные сообщения</label> &nbsp; '+
    '<input type="checkbox" id="sendto2" name="sendto" value="2"><label for="sendto2">E-mail</label>'+
    '</fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td id="msg982"></td><td width="10%"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on">'+
    '<a href="javascript://" class="send_remark" user_id="'+user_id+'">Применить</a>'+
    '</div></td><td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td><td style="visibility:hidden;"><input type="image" src="/img/1px.gif" style="width:1px;" name="submfrm"></td></tr></tbody></table></td></tr></tbody></table>'+
    '</fieldset>'+
    
    '</div>'+
	'</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
});

$(".close_popup_user_remarks").live("click",function(){
    $("#popup_user_remarks").remove();
});

$(".send_remark").live("click",function(){
    var user_id = $(this).attr('user_id');
    var a1 = $("#remark_a1").prop('checked'); // minus
    var a2 = $("#remark_a2").prop('checked'); // plus
    var remark_change = "none";
    if(a1 == true){
        remark_change = "minus";
    }
    if(a2 == true){
        remark_change = "plus";
    }
    var remark_comment = $("#remark_comment").val();
    var remark_time = $("#remark_time").val();
    var remark_period = $("#remark_period").val();
    var remark_ever_prop = $("#remark_ever").prop('checked');
    var sendto1_prop = $("#sendto1").prop('checked');
    var sendto2_prop = $("#sendto2").prop('checked');
    if(remark_ever_prop == true){ remark_ever = 1; }else{ remark_ever = 0; }
    if(sendto1_prop == true){ sendto1 = 1; }else{ sendto1 = 0; }
    if(sendto2_prop == true){ sendto2 = 1; }else{ sendto2 = 0; }
    
    if(remark_comment == ''){
        afterRatingBlock2("Форма заполнена неверно");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else if(remark_change == "none" && remark_ever == "0" && remark_time == "0"){
        afterRatingBlock2("Форма заполнена неверно");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {user_id:user_id,change:remark_change,comment:remark_comment,time:remark_time,period:remark_period,ever:remark_ever,privmsg:sendto1,emailmsg:sendto2},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/changeremark',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    afterRatingBlock2("Замечание добавлено");
                    setTimeout(function(){
                        killBlock();
                        $("#popup_user_remarks").remove();
                    }, 2000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".show_remark_history").live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getremarkshistory',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var remarks = res.remarks;
                var user = res.user;
                var admin = res.admin;
                $("#popup_remark_history").remove();
                showPopupRemarkHistory(remarks,user,admin);
            }else if(res.status == "no_history"){
                alert("Нет истории");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupRemarkHistory(remarks,user,admin){
    switch(user.remark){
        case '20' : remark_str = "1"; break;
        case '40' : remark_str = "2"; break;
        case '60' : remark_str = "3"; break;
        case '80' : remark_str = "4"; break;
        case '100' : remark_str = "5"; break;
        default : remark_str = "0"; break;
    }
    var res = '<div id="popup_remark_history" style="position: fixed; z-index: 10008; overflow: visible; left: 50%;top: 50%;margin-left: -200px;margin-top: -133px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 264px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 264px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 264px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 266px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_remark_history" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">История замечаний</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 225px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div>'+
    '<div class="myWinCont" id="remarks_history_content" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div align="left">Уровень замечаний пользователя: <b>'+remark_str+'</b> [ '+user.remark+'% ]</div><hr>'+
    
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 400px; height: 241px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    count_remarks = remarks.length;
    i=0;
    while(i < count_remarks){
        var a = new Date(remarks[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(date.length == 1){
            date = '0'+date;
        }
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        
        if(remarks[i].type == "plus"){
            var class_image = "popup_repute_plus";
            var text = "Уровень повышен";
        }
        if(remarks[i].type == "minus"){
            var class_image = "popup_repute_minus";
            var text = "Уровень понижен";
        }
        
        var str_edit_remark = '';
        var str_delete_remark = '';
        if(admin == true){
            str_edit_remark = '<a href="javascript://" class="edit_remark" remark_id="'+remarks[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_remark = '<a href="javascript://" class="delete_remark" remark_id="'+remarks[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#remarks_history_content").append(
        '<div id="blk'+remarks[i].id+'"><table border="0" cellpadding="1" cellspacing="1" width="100%">'+
        '<tbody><tr><td width="70%"><div title="'+text+'" class="'+class_image+'" style="width:16px;height:17px;float:left;"></div>&nbsp;'+
        '<a class="banHUser" href="/index/8-'+remarks[i].from_id+'" target="_blank"><b>'+remarks[i].username+'</b></a></td>'+
        '<td align="right" style="white-space: nowrap;font-size:7pt">'+time+' &nbsp;'+
        
        str_edit_remark+
        str_delete_remark+
        
        '</td></tr><tr><td colspan="2" id="mtx'+remarks[i].id+'">'+remarks[i].comment+'</td>'+
        '</tr></tbody></table><hr></div>');
        i++;
    }    
}

$(".close_popup_remark_history").live("click",function(){
    $("#popup_remark_history").remove();
});

$(".edit_remark").live("click",function(){
    var remark_id = $(this).attr("remark_id");
    var text = $('#mtx'+remark_id).html();
    $('#mtx'+remark_id).html('<textarea remark_id="'+remark_id+'" class="remark_text">'+text+'</textarea>');
    $(this).hide();
    $('.remark_text[remark_id="'+remark_id+'"]').focus();
});

$(".remark_text").live("focusout",function(){
    var remark_id = $(this).attr("remark_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:remark_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editremark',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_remark[remark_id="'+remark_id+'"]').show();
                $('.remark_text[remark_id="'+remark_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_remark").live("click",function(){
    var remark_id = $(this).attr("remark_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:remark_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleteremark',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blk'+remark_id).remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Remarks end

$("#film_dont_work").live("click",function(){
    var one_news_id = $(this).attr("one_news_id");
    showFilmDontWork(one_news_id);
});

$(".xt-close2").live("click",function(){
    $('#_uwndTop1').remove();
});

$('input.loginField[name="password"]').live("keydown",function(e){
    if(e.keyCode == 13){
        login1();
    }
});

$(".loginButton").live("click",function(){
    login1();
});

function login1(){
    var username = $('input.loginField[name="username"]').val();
    var password = $('input.loginField[name="password"]').val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/arrow_login.jpg) 10px 15px no-repeat;");
                setTimeout(function(){
                    window.location.href = window.location.href;
                    window.location.reload();
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                    $("#login_block input").attr("disabled","disabled");
                    afterRatingBlock2("Неправильный логин!");
                    setTimeout(function(){
                        $("#login_block").removeAttr("style");
                        $("#login_block input").removeAttr("disabled");
                        killBlock();
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                        $("#login_block input").attr("disabled","disabled");
                        afterRatingBlock2("Неправильный пароль!");
                        setTimeout(function(){
                            $("#login_block").removeAttr("style");
                            $("#login_block input").removeAttr("disabled");
                            killBlock();
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                            $("#login_block input").attr("disabled","disabled");
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            setTimeout(function(){
                                $("#login_block").removeAttr("style");
                                $("#login_block input").removeAttr("disabled");
                                killBlock();
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
}

$(".loginButton2").live("click",function(){
    var username = $('input.loginField2[name="username"]').val();
    var password = $('input.loginField2[name="password"]').val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/arrow_login.jpg) 10px 15px no-repeat;");
                setTimeout(function(){
                    window.location = '/';
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                    $("#login_block2 input").attr("disabled","disabled");
                    afterRatingBlock2("Неправильный логин!");
                    setTimeout(function(){
                        $("#login_block2").removeAttr("style");
                        $("#login_block2").attr("style","width: 656px;float: left;");
                        $("#login_block2 input").removeAttr("disabled");
                        killBlock();
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                        $("#login_block2 input").attr("disabled","disabled");
                        afterRatingBlock2("Неправильный пароль!");
                        setTimeout(function(){
                            $("#login_block2").removeAttr("style");
                            $("#login_block2").attr("style","width: 656px;float: left;");
                            $("#login_block2 input").removeAttr("disabled");
                            killBlock();
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                            $("#login_block2 input").attr("disabled","disabled");
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            setTimeout(function(){
                                $("#login_block2").removeAttr("style");
                                $("#login_block2").attr("style","width: 656px;float: left;");
                                $("#login_block2 input").removeAttr("disabled");
                                killBlock();
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".login_popup").live("click",function(){
    $("#popup_login").remove();
    showLoginPopup();
});

function showLoginPopup(){
    $('body').append('<div id="popup_login" style="position: fixed; z-index: 10020; overflow: visible; left: 50%;top: 50%;margin-left: -136px;margin-top: -75px;">'+
    '<div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 149px; display: block;"><div class="xstl"><div class="xsml"></div></div></div>'+
    '<div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 149px; left: 270px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div>'+
    '<div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 280px; top: 149px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
    
    '<div id="_uwndWnd3" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 272px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 272px; height: 151px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_login" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Вход на сайт</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 110px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 250px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div align="left">'+
    
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr>'+
    '<td width="35%" nowrap="nowrap">Логин:</td>'+
    '<td><input type="text" name="user" style="width:95%" maxlength="50"></td></tr><tr>'+
    '<td>Пароль:</td>'+
    '<td><input type="password" name="p_password" style="width:95%" maxlength="15"></td>'+
    '</tr>'+
    
    '<tr><td nowrap="nowrap"><input id="rem" type="checkbox" name="rem" value="1" checked=""><label for="rem">запомнить</label><br><input id="hid555" type="checkbox" name="hidden" value="1"><label for="hid555">скрытый</label></td>'+
    '<td valign="top">'+
    '<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="outBtn">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrmLg">'+
    
    '<a href="javascript://" class="login_from_popup">Вход</a></div></td>'+
    
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;" id="for_img"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrmLg" id="submfrmLg"></td>'+
    '</tr></tbody></table></td><td style="padding-left:4px" id="msgL"></td></tr></tbody></table></td></tr><tr><td style="font-size:7pt;text-align:center;padding-top:5px;" colspan="2"><a href="javascript://" rel="nofollow" class="remind_password">Забыл пароль</a> · <a href="/index/registration">Регистрация</a></td></tr></tbody></table>'+
    
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
}

$(".close_popup_login").live("click",function(){
    $("#popup_login").remove();
});

$(".login_from_popup").live("click",function(){
    var username = $('input[name="user"]').val();
    var password = $('input[name="p_password"]').val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#for_img").html('<img src="/img/arrow_login.jpg" alt="" />');
                $("#for_img").removeAttr("style");
                $(".login_from_popup").attr("class","login_from_popup_2");
                setTimeout(function(){
                    window.location.href = window.location.href;
                    window.location.reload();
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    afterRatingBlock2("Неправильный логин!");
                    $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                    $("#for_img").removeAttr("style");
                    $(".login_from_popup").attr("class","login_from_popup_2");
                    setTimeout(function(){
                        $("#for_img").attr("style","visibility:hidden;");
                        killBlock();
                        $(".login_from_popup_2").attr("class","login_from_popup");
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        afterRatingBlock2("Неправильный пароль!");
                        $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                        $("#for_img").removeAttr("style");
                        $(".login_from_popup").attr("class","login_from_popup_2");
                        setTimeout(function(){
                            $("#for_img").attr("style","visibility:hidden;");
                            killBlock();
                            $(".login_from_popup_2").attr("class","login_from_popup");
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                            $("#for_img").removeAttr("style");
                            $(".login_from_popup").attr("class","login_from_popup_2");
                            setTimeout(function(){
                                $("#for_img").attr("style","visibility:hidden;");
                                killBlock();
                                $(".login_from_popup_2").attr("class","login_from_popup");
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

/*$("#logout").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/logout',
        async: false,
        success : function (res) {
            if(res == "logout_success"){
                setTimeout(function(){
                    window.location.href = window.location.href + '?nocache';
                    window.location.reload();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
}); */

$('.remind_password').live("click",function(){
    $("#popup_login").remove();
    $("#popupRemindPass").remove();
    showPopupRemindPassword();
});

function showPopupRemindPassword(){
    $('body').append('<div id="popupRemindPass" style="position: fixed; z-index: 10012; overflow: visible; left: 50%;top: 50%;margin-left: -150px;margin-top: -60px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 118px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 118px; left: 298px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 308px; top: 118px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd4" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 300px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 300px; height: 120px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_remind_pass" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Напоминание пароля</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 79px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 278px; display: block; height: 100%;" align="center" unselectable="on"><div style="padding:15px 0">'+
    
    '<table border="0" width="100%">'+
    '<tbody><tr><td width="35%" align="right">Логин:</td><td>'+
    '<input style="width:140px" maxlength="50" id="txtF774" type="text" name="s" size="20"></td></tr>'+
    '<tr><td align="right" id="eMsg831"></td><td>'+
    '<table border="0" cellpadding="0" cellspacing="0">'+
    '<tbody><tr>'+
    '<td class="myBtnLeftA"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenterA"><div class="myBtnCont x-unselectable" unselectable="on">'+
    '<a href="javascript://" onclick="return false;" class="remind_pass_ok">Применить</a></div></td>'+
    '<td class="myBtnRightA"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submPrm348"></td></tr></tbody></table></td></tr></tbody></table></div>'+
    
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
}

$(".close_popup_remind_pass").live("click",function(){
    $("#popupRemindPass").remove();
});

$(".remind_pass_ok").live("click",function(){
    var login = $("#txtF774").val();
    $.ajax({
        type : 'GET',
        data : {login:login},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/remindpass',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                $("#eMsg831").html('<div class="myWinLoadSD"></div>');
                afterRemindBlock("На ваш E-Mail адрес, указанный при регистрации, было отправлено уведомление для генерации нового пароля для Вас.");
                $("#popupRemindPass").remove();
            }else if(res.status == "not_found"){
                $("#eMsg831").html('<div class="myWinLoadSF" title="Пользователь не найден"></div>');
                afterRatingBlock2("Пользователь не найден");
                setTimeout(function(){
                    killBlock();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".pollBut").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    var list = $('div.answer input[type="radio"]');
    var count_elem = list.length;
    if(count_elem == 0){
        list = $('div.answer input[type="checkbox"]');
        count_elem = list.length;
    }
    var i=1;
    var answers = [];
    while(i < count_elem+1){
        var elem = $('#a'+id_pool+i).prop('checked');
        if(elem == true){
            answers[i] = $('#a'+id_pool+i).val();
        }
        i++;
    }
    console.log(answers);
    var params = {id_pool:id_pool,answers:answers}
    //----------
    $.ajax({
        type : 'GET',
        data : {params:params},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/pool',
        async: false,
        success : function (res) {
            if(res.rated == "success"){
                var new_pool = res.new_pool;
                $("div.answer input").remove();
                $("div.answer label").remove();
                var i = 1;
                var i_answer = 8;
                var i_result = 23;
                var all_votes = parseInt(new_pool[38]);
                var colours = res.colours;
                $("div.answer").each(function(){
                    var percent = Math.round((new_pool[i_result] * 100) / all_votes);
                    $(this).attr("votes",new_pool[i_result]).append('<span title="Голосов: '+new_pool[i_result]+'('+percent+'%)">'+new_pool[i_answer]+'</span><div style="padding-top:3px;width: 100%;"><div style="width: '+percent+'%;background:'+colours[i-1]+';height:3px"></div></div>');
                    i++;i_answer++;i_result++;
                });
                var wrapper = $('.pollAns');
                wrapper.find('div.answer').sort(function (a, b) {
                    return +b.getAttribute('votes') - +a.getAttribute('votes');
                }).prependTo( wrapper );
                $(".pollTot b").html(all_votes);
                var ii = 1;
                $("div.answer").each(function(){
                    $(this).prepend(ii+'. ');
                    ii++;
                });
                $(".pollBut").hide();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".link_pool_archive").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    //----------
    $.ajax({
        type : 'GET',
        data : {id_pool:id_pool},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getpool',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var pool = res.pool;
                var colours = res.colours;
                //--------------голосование в архиве--------------
                $("#popupPoolArchive").remove();
                popupPoolArchive(pool);
                //------------------------------------------------
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".pool_archive").live("click", function(){
    var id_pool = $(this).attr("id_pool");
    var list = $('#popupPoolArchive input[type="radio"]');
    var count_elem = list.length;
    if(count_elem == 0){
        list = $('#popupPoolArchive input[type="checkbox"]');
        count_elem = list.length;
    }
    var i=1;
    var answers = [];
    while(i < count_elem+1){
        var elem = $('#a'+id_pool+i).prop('checked');
        if(elem == true){
            answers[i] = $('#a'+id_pool+i).val();
        }
        i++;
    }
    var params = {id_pool:id_pool,answers:answers}
    //----------
    $.ajax({
        type : 'GET',
        data : {params:params},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/pool',
        async: false,
        success : function (res) {
            if(res.rated == "success"){
                var new_pool = res.new_pool;
                $(".img_after_result").append('<div class="myWinLoadSD" style="background:url(\'/s.s/img/icon/ok.png\') no-repeat 0 0!important; background-attachment: initial;"></div>');
                setTimeout(function(){
                    $("#popupArchivePools .link_pool_archive").each(function(){
                        if( $(this).attr("id_pool") == id_pool){
                            $(this).parent().parent().parent().parent().parent().hide();
                            var wrap = $(this).parent().parent().parent().parent().parent().parent();
                            var el_votes = wrap.find(".myWinPollTd b");
                            var count_votes = wrap.find(".myWinPollTd b").html();
                            el_votes.html(parseInt(el_votes.html())+1);
                        }
                    });
                    $("#popupPoolArchive").remove();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".pollLnk-all").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    //----------
    $.ajax({
        type : 'GET',
        data : {id_pool:id_pool},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getpool',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var pool = res.pool;
                var colours = res.colours;
                $('#popupPoolResults').remove();
                popupPoolResults(pool,colours);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".closePopupPoolResults").live("click",function(){
    $('#popupPoolResults').remove();
});

$(".closePopupPoolArchive").live("click",function(){
    $('#popupPoolArchive').remove();
});

$(".pollLnk-archive").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getallpools',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var all_pools = res.all_pools;
                var colours = res.colours;
                $('#popupArchivePools').remove();
                popupArchivePools(all_pools,colours);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".xt-close-opros").live("click",function(){
    $('#popupArchivePools').remove();
});

$("#filmdontwork_button").live("click",function(){
    var fr51 = $('#fr51').prop('checked');
    var fr71 = $('#fr71').prop('checked');
    var fr61 = $('#fr61').prop('checked');
    var fr81 = $('#fr81').prop('checked');
    var param1 = 0;
    var param2 = 0;
    var param3 = 0;
    var param4 = 0;
    if(fr51 == true){param1 = 1;}
    if(fr71 == true){param2 = 1;}
    if(fr61 == true){param3 = 1;}
    if(fr81 == true){param4 = 1;}
    var text_f3 = $('#f3').val();
    var one_news_id = $("#one_news_id").val();
    
    $.post('/index/filmdontwork',{one_news_id:one_news_id,param1:param1,param2:param2,param3:param3,param4:param4,text_f3:text_f3}, function(e){
        afterSendMailBlock('Ваше сообщение было успешно отправлено.');
    });
});

$(".report-spam-btn").live("click",function(){
    var this_link = $(this);
    var module_id = $(this).attr("module_id");
    var user_ip = $(this).attr("ip");
    var comment_id = $(this).attr("data-message-id");
    var spam = $(this).attr("data-not-spam");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/spamcomment/spam/'+spam+'/module_id/'+module_id+'/user_ip/'+user_ip+'/comment_id/'+comment_id,
        async: false,
        success : function (res) {
            if(res == "added"){
                $("#comEnt"+comment_id).addClass("report-spam-hidden").hide();
                $('<div id="report-spam-toggle-wrapper-'+comment_id+'" class="report-spam-toggle-wrapper" style="margin-left: 0px;"><span class="report-spam-toggle-text">Спам-сообщение скрыто.</span> <a class="report-spam-toggle-button report-spam-handled" data-target="#comEnt'+comment_id+'" href="javascript://">Показать</a></div>').insertBefore($("#comEnt"+comment_id));
                this_link.attr("data-not-spam",1);
                this_link.html("Не спам");
            }
            if(res == "deleted"){
                $("#comEnt"+comment_id).removeClass("report-spam-hidden").show();
                $("#report-spam-toggle-wrapper-"+comment_id).remove();
                this_link.attr("data-not-spam",0);
                this_link.html("Спам");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".report-spam-toggle-button").live("click",function(){
    var data_target = $(this).attr("data-target");
    var is_visible = $(data_target).is(":visible");
    if(is_visible){
        $(data_target).hide();
        $(this).html("Показать");
        $(this).parent().find("span.report-spam-toggle-text").html("Спам-сообщение скрыто.");
    }else{
        $(data_target).show();
        $(this).html("Скрыть");
        $(this).parent().find("span.report-spam-toggle-text").html("Спам-сообщение показано.");
    }
});

//------- comments rate
$(".comment_rate").live("click",function(){
    var this_item = $(this);
    var comment_id = $(this).attr("comment_id");
    var module_id = $(this).attr("module_id");
    //var user_id = $(this).attr("user_id");
    var rate = $(this).attr("rate");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/commentrate/rate/'+rate+'/module_id/'+module_id+'/comment_id/'+comment_id,
        async: false,
        success : function (res) {
            if(res.status == "rated"){
                var new_rate = res.new_rate;
                var colour = "";
                if(new_rate == 0){
                    colour = "gray";
                }
                if(new_rate < 0){
                    colour = "red";
                }
                if(new_rate > 0){
                    new_rate = '+'+new_rate;
                    colour = "blue";
                }
                this_item.parent().find("b").html(new_rate).attr("style","color:"+colour+";");
                afterRatingBlock2('Оценка комментария: '+new_rate);
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
            if(res.status == "already_rated"){
                afterRatingBlock2('Вы уже оценивали этот комментарий');
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

//------- comments rate end



$(".com-order-select").live("change",function(){
    var url = $(this).attr("url");
    var param = $(".com-order-select option:selected").val();
    is_param = url.indexOf("?comments_order");
    if(is_param == -1){
        window.location = url+"?comments_order="+param;
    }else{
        window.location = url.substr(0,is_param)+"?comments_order="+param;
    }
});

var usrarids={};
function ustarrating(module_id,id,mark){
    if (!usrarids[id]){
        usrarids[id]=1;
        $(".u-star-li-"+id).hide();
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/starrating/module_id/'+module_id+'/material_id/'+id+'/mark/'+mark,
            async: false,
            success : function (res) {
                if(res == "failed"){
                    afterRatingBlock2('Вы уже голосовали!');
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }else{
                    rating = res['rating'];
                    rate_num = res['rate_num'];
                    $("#entRating"+id).html(rating);
                    $("#entRated"+id).html(rate_num);
                    percent = (rating*100)/5;
                    $("#uCurStarRating"+id).attr("style","width: "+percent+"%;");
                    $("#uStarRating"+id).attr("title","Рейтинг: "+rating+"/"+rate_num);
                    afterRatingBlock('Оценка засчитана',rating,rate_num);
                    setTimeout(function(){
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

function uplusminusrating(module_id,id,mark){
    if (!usrarids[id]){
        usrarids[id]=1;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/starrating/module_id/'+module_id+'/material_id/'+id+'/mark/'+mark,
            async: false,
            success : function (res) {
                if(res == "failed"){
                    afterRatingBlock2('Вы уже голосовали!');
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }else{
                    rating = res['rating'];
                    rate_num = res['rate_num'];
                    tmp_1 = Math.round(rating*rate_num);
                    tmp_2 = 2*rate_num;
                    tmp_3 = tmp_1 - tmp_2;                
                    $("span#rate_"+id).html(tmp_3).attr("title","Голосов: "+tmp_3);
                    afterRatingBlock2('Оценка засчитана');
                    setTimeout(function(){
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

function afterRatingBlock(text,rating,rate_num){
    $('body').append('<div id="after_rating_block" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;"><b>'+text+'</b></p>'+
                            '<p style="text-align: center;">Рейтинг: <b>'+rating+'</b>/'+rate_num+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function afterRatingBlock2(text){
    $('body').append('<div id="after_rating_block" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;"><b>'+text+'</b></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function popupPoolResults(pool,colours){
    var i_answer = 8;
    var i_result = 23;
    var ii = 0;
    var res_1 = '';
    var res_2 = '';
    for (i = 8; i < 23; i++) {
        if(pool[i] != ""){
            var percent = Math.round((pool[i+15] * 100) / pool[38]);
            res_1 += '<tr class="item_to_sort" sort_param="'+pool[i+15]+'"><td class="myWinPollTd"><table width="100%" cellspacing="0" cellpadding="3" border="0"><tbody><tr><td width="18" class="number" align="right"></td><td width="5%" align="center"><table cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td><div class="need_colour" style="height:10px;width:10px;background:'+colours[ii]+'"><img width="10" src="/img/1px.gif" alt=""></div></td></tr></tbody></table></td><td>'+pool[i]+'</td></tr></tbody></table></td><td width="10%" align="center" class="myWinPollTd"><b>'+pool[i+15]+'</b></td><td width="10%" align="center" class="myWinPollTd">'+percent+'%</td></tr>';
            ii++;
        }
    }
    var need_count = ii+1;
    ii = 0;
    var iii = 1;
    for (i = 23; i < 38; i++) {
        if(iii < need_count){
            var percent = Math.round((pool[i] * 100) / pool[38]);
            res_2 += '<td class="item_to_sort" sort_param="'+pool[i]+'" valign="bottom" align="center"><table width="80%" cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td class="need_colour" style="font-size:0;background:'+colours[ii]+'"><img width="1" height="'+percent+'" src="/img/1px.gif" alt=""></td></tr></tbody></table></td>';
            ii++;
            iii++;
        }
    }
    var res = '<div id="popupPoolResults" style="width: 677px;z-index: 2;left: 50%;position: fixed;margin: 0px auto;top: 50%;overflow: visible;display: block;margin-top: -85px;margin-left: -339px;" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on">'+
        '<div style="overflow: hidden; position: absolute; z-index: 30010; width: 660px; height: 207px; display: none;" class="xw-disabled" unselectable="on"></div>'+
        '<div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 closePopupPoolResults" unselectable="on"></div>'+
        '<div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Результаты опроса</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div align="center" style="display: none; overflow: hidden;" class="myWinCont" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div align="center" style="overflow: auto; width: 638px; display: block; height: 100%;" class="myWinCont" unselectable="on">'+
        '<table cellpadding="0" border="0"><tbody><tr><td width="80%" valign="top"><table width="100%" cellspacing="1" cellpadding="1" border="0" class="myWinPollT"><tbody>'+
            res_1+
        '</tbody></table>'+
        '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="50%">&nbsp;</td><td align="right">'+
        '<table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody><tr><td class="myWinPollTd">Всего ответов: <b>'+pool[38]+'</b></td></tr></tbody></table>'+
        '</td></tr></tbody></table>'+
        '</td><td valign="top" align="right"><div class="myWinPollG"><table width="195" height="131" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
            res_2+
        '</tr></tbody></table></div></td></tr></tbody></table></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div style="display:none" class="xw-blank" unselectable="on"></div>'+
        '</div>';
    $('body').append(res);
    var height_div = $('#popupPoolResults').css("height");
    height_div = Math.round(parseInt(height_div) / 2);
    $('#popupPoolResults').css("margin-top", "-"+height_div+"px");
}


function popupArchivePools(all_pools,colours){
    var res_begin = '<div id="popupArchivePools" style="width: 677px;z-index: 2;left: 50%;position: fixed;margin: 0px auto;top: 50%;overflow: visible;display: block;margin-top: -220px;margin-left: -339px;" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on"><div style="overflow: hidden; position: absolute; z-index: 30010; width: 677px; height: 441px; display: none;" class="xw-disabled" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close-opros" unselectable="on"></div><div class="xt xt-maxi" unselectable="on"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on"></div><span class="xw-hdr-text" unselectable="on" title="">Архив опросов</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 400px;" unselectable="on"><div align="center" style="display: none; overflow: hidden;" class="myWinCont" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div align="center" style="overflow: auto; width: 655px; display: block; height: 100%;" class="myWinCont" id="all_items" unselectable="on">';
    var res_end = '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div style="display:none" class="xw-blank" unselectable="on"></div></div>';
    var full_res = res_begin+res_end;
    $('body').append(full_res);
    var count_pools = all_pools.length;
    k = 0;
    while(k < count_pools){
        var i_answer = 8;
        var i_result = 23;
        var ii = 0;
        var res_1 = '';
        var res_2 = '';
        var pool = all_pools[k];
        for (i = 8; i < 23; i++) {
            if(pool[i] != ""){
                var percent = Math.round((pool[i+15] * 100) / pool[38]);
                res_1 += '<tr class="item_to_sort" sort_param="'+pool[i+15]+'"><td class="myWinPollTd"><table width="100%" cellspacing="0" cellpadding="3" border="0"><tbody><tr><td width="18" class="number" align="right">'+(ii+1)+'.'+'</td><td width="5%" align="center"><table cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td><div class="need_colour" style="height:10px;width:10px;background:'+colours[ii]+'"><img width="10" src="/img/1px.gif" alt=""></div></td></tr></tbody></table></td><td>'+pool[i]+'</td></tr></tbody></table></td><td width="10%" align="center" class="myWinPollTd"><b>'+pool[i+15]+'</b></td><td width="10%" align="center" class="myWinPollTd">'+percent+'%</td></tr>';
                ii++;
            }
        }
        var need_count = ii+1;
        ii = 0;
        var iii = 1;
        for (i = 23; i < 38; i++) {
            if(iii < need_count){
                var percent = Math.round((pool[i] * 100) / pool[38]);
                res_2 += '<td class="item_to_sort" sort_param="'+pool[i]+'" valign="bottom" align="center"><table width="80%" cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td class="need_colour" style="font-size:0;background:'+colours[ii]+'"><img width="1" height="'+percent+'" src="/img/1px.gif" alt=""></td></tr></tbody></table></td>';
                ii++;
                iii++;
            }
        }
        //add item to result
        
        var item = '<fieldset><legend><b>'+pool[7]+'</b></legend>'+
            '<table cellpadding="0" border="0"><tbody><tr><td width="80%" valign="top"><table width="100%" cellspacing="1" cellpadding="1" border="0" class="myWinPollT"><tbody>'+
            res_1+
            '</tbody></table><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="50%"><table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody><tr><td class="myWinPollTd">'+
                '<a style="text-decoration:none;" class="link_pool_archive" id_pool="'+pool[1]+'"  href="javascript://">Проголосовать</a></td></tr></tbody></table></td><td align="right"><table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody>'+
                '<tr><td class="myWinPollTd">Всего ответов: <b>'+pool[38]+'</b></td></tr></tbody></table></td></tr></tbody></table></td><td valign="top" align="right"><div class="myWinPollG"><table width="195" height="131" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
            res_2+
            '</tr></tbody></table></div></td></tr></tbody></table></fieldset>';
        $("#popupArchivePools #all_items").append(item);
        k++;
    } // end while
    
}


function popupPoolArchive(pool){
    var type = pool[2];
    if(type == 1){
        var type_str = "radio";
    }
    if(type == 2){
        var type_str = "checkbox";
    }
    var res = '<div id="popupPoolArchive" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed; width: 280px; z-index: 2; left: 50%; overflow: visible;top: 50%;margin-left: -140px;margin-top: -75px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 280px; height: 157px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 closePopupPoolArchive" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">'+pool[7]+'</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; " unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 258px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><form id="plF31" onsubmit="sendPlF1();return false;">';
    var ii = 1;
    for (i = 8; i < 23; i++) {
        if(pool[i] != ""){
            res += '<div style="padding-bottom:1px;"><input id="a'+pool[1]+ii+'" type="'+type_str+'" name="answer" value="'+ii+'"> <label for="a'+pool[1]+ii+'">'+pool[i]+'</label></div>';
            ii++;
        }
    }
    res += '<table border="0"><tbody><tr><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr class="img_after_result"><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm942">'+
    '<a href="javascript://" class="pool_archive" id_pool="'+pool[1]+'">'+pool[6]+'</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/1px.gif" style="width:1px;" name="submfrm942" id="submfrm942"></td></tr></tbody></table>'+
	'</td><td id="eMsgPl1"></td></tr></tbody></table><input type="hidden" name="id" value="1"><input type="hidden" name="a" value="1"><input type="hidden" name="t" value="1"><input type="hidden" name="ssid" value=""></form></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>';
    $('body').append(res);
}

function killBlock()
{
    $('#after_rating_block').remove();
    $('#popup_banned_user').remove();
}

function showFilmDontWork(one_news_id){
    $('body').append('<div id="_uwndTop1" style="display: block; position: fixed; z-index: 10004; overflow: visible; left: 50%;top: 50%;margin-left: -225px;margin-top: -150px;">'+
        '<div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 298px; display: block;"><div class="xstl"><div class="xsml"></div></div></div>'+
        '<div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 298px; left: 448px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div>'+
        '<div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 458px; top: 298px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
        '<div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 450px; z-index: 2; left: 0px; overflow: visible;">'+
            '<div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 450px; height: 300px; display: none;" unselectable="on"></div>'+
            '<div class="xw-tl" unselectable="on">'+
                '<div class="xw-tr" unselectable="on">'+
                    '<div class="xw-tc" unselectable="on">'+
                        '<div class="xw-sps" unselectable="on"></div>'+
                        '<div class="xw-hdr xw-draggable" unselectable="on">'+
                            '<div class="xt xt-close xt-close2" unselectable="on"></div>'+
                            '<div class="xt xt-maxi" unselectable="on" style="display: none;"></div>'+
                            '<div class="xt xt-rest" unselectable="on" style="display: none;"></div>'+
                            '<div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
                            '<span class="xw-hdr-text" unselectable="on" title="">Сообщение об ошибке</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-ml" unselectable="on">'+
                '<div class="xw-mr" unselectable="on">'+
                    '<div class="xw-mc" unselectable="on">'+
                        '<div class="xw-body" unselectable="on">'+
                            '<div style="overflow: hidden; height: 259px;" unselectable="on">'+
                                '<div class="myWinCont" style="display: none; overflow: hidden;" align="left" unselectable="on">'+
                                    '<div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div>'+
                                '</div>'+
                                    '<div class="myWinCont" style="overflow: auto; width: 428px; display: block; height: 100%;" align="left" unselectable="on">'+
                                        '<form method="post" name="badlink" id="f6F9kL" style="margin: 0pt;">'+
                                            '<table border="0" width="100%" id="table1" cellspacing="1" cellpadding="2">'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<input type="hidden" name="f1" id="one_news_id" value="'+one_news_id+'" size="30" style="width:95%;" maxlength="70">'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>Причина: </td>'+
                                                    '<td><input id="fr51" type="radio" name="f5" value="Не работает видео"> <label for="fr51">Не работает видео</label><br></td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr71" type="radio" name="f7" value="Проблемы со звуковой дорожкой"> <label for="fr71">Проблемы со звуковой дорожкой</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr61" type="radio" name="f6" value="Видео не соответствует описанию"> <label for="fr61">Видео не соответствует описанию</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr81" type="radio" name="f8" value="Другое"> <label for="fr81">Другое</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>Описание:</td>'+
                                                    '<td>'+
                                                        '<textarea rows="7" name="f3" id="f3" cols="30" style="width:95%;"></textarea>'+
                                                    '</td>'+
                                                '</tr>'+
                                            '</tbody>'+
                                            '</table>'+
                                            '<input name="f4" size="30" value="http://tushkan.net/news/realnye_pacany_3_sezon_2011_smotret_serial_onlajn/2014-09-16-1143-0-3" type="hidden">'+
                                            '<input style="display: none;" name="sbm" type="submit">'+
                                            '<input name="id" value="2" type="hidden">'+
                                            '<input name="a" value="1" type="hidden">'+
                                            '<input name="o" value="1" type="hidden">'+
                                        '</form>'+
                                        '<br>'+
                                        '<div align="center">'+
                                            '<button id="filmdontwork_button" style="color:#515151;font-family:Tahoma,Arial;font-size:8pt;vertical-align:middle;">Отправить сообщение</button>'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-bl" unselectable="on">'+
                '<div class="xw-br" unselectable="on">'+
                    '<div class="xw-bc" unselectable="on"></div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
        '</div>'+
    '</div>');
}

function showPopupCommentEdit(comment){
    $('body').append('<div id="popup_comment_edit" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: fixed;width: 622px;z-index: 2;overflow: visible;top: 50%;left: 50%;margin-left: -311px;margin-top: -100px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 622px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
        '<div id="popup_comment_edit_dad" class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_comment_edit" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Редактирование комментария</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 600px; display: block; height: 100%;" align="center" unselectable="on"><table border="0" cellspacing="1" width="100%" cellpadding="2"><tbody><tr>'+
        '<td width="20%" align="right">Пользователь:</td><td><a><b>'+comment['user']+'</b></a> ('+comment['name']+')</td></tr>'+
        '<tr><td align="right" valign="top">Сообщение:</td><td><textarea rows="6" name="message" id="mess" cols="30" style="width:98%;">'+comment['message']+'</textarea></td></tr>'+
        '<tr><td id="eMsg835" align="right"></td><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutipd348">'+
        '<a href="javascript://" idc="'+comment['commentID']+'" idm="'+comment['moduleID']+'" class="save_commentt">Изменить</a>'+
        '</div></td><td class="myBtnRight"></td><td style="visibility:hidden;"></td></tr></tbody></table></td></tr></tbody></table>'+
        '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>'
    );
    ball = document.getElementById('popup_comment_edit');
    ball_dad = document.getElementById('popup_comment_edit_dad');
    ball_dad.onmousedown = function(e) {
    
      var coords = getCoords(ball);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
    
      ball.style.position = 'absolute';
      ball.style.margin = '0px';
      moveAt(e);
      
      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
      }
    
      document.onmousemove = function(e) {
        moveAt(e);
      };
    
      ball_dad.onmouseup = function() {
        document.onmousemove = null;
        ball_dad.onmouseup = null;
      };
    
    }
    
    ball_dad.ondragstart = function() {
      return false;
    };
}

$(".close_popup_comment_edit").live("click",function(){
    $("#popup_comment_edit").remove();
});

function afterSendMailBlock(text){
    $('body').append('<div id="_uwndTop2" class="" style="position: fixed; z-index: 21004; overflow: visible; left: 50%;top: 50%;margin-left: -175px;margin-top: -75px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 148px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 148px; left: 348px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 358px; top: 148px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 350px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="display: none; overflow: hidden; position: absolute; z-index: 30010; width: 350px; height: 150px;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on">'+
    '<div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2" onclick="close_after_mail();" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Сообщение отправлено</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 109px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 328px; display: block; height: 100%;" align="center" unselectable="on"><b>Спасибо.</b><br><br>'+text+'<br><br><br>[ <a href="javascript://" onclick="close_after_mail();"><b>Закрыть окно</b></a> ]</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 350px; height: 125px; display: none;" unselectable="on"></div></div></div>');
}

function close_after_mail(){
    $("#_uwndTop2").remove();
    $('#_uwndTop1').remove();
}

$(".answer_com").live("click",function(){
    var parent_id = $(this).attr("c_comment_id");
    var username = $(this).attr("username");
    var date = $(this).attr("date");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/checkuser',
        async: false,
        success : function (res) {
            if(res.status_user == "banned"){
                popupBannedUser();
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }else{
                $("#popup_answer_comment").remove();
                popupAnswerComment(parent_id,username,date);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".answer_com_add").live("click",function(){
    var message = $("#message2").val();
    var user_id = $("#c_user_id").val();
    var material_id = $("#c_material_id").val();
    var module_id = $("#c_module_id").val();
    var parent_id = $(this).attr("c_comment_id");
    $.post('/index/newcomment/', {user_id:user_id,material_id:material_id,module_id:module_id,message:message,parent_id:parent_id}, function(e){
        location.reload();
    })
    
});

function popupAnswerComment(parent_id,username,date){
    $('body').append('<div id="popup_answer_comment" style="position: fixed; z-index: 10012; overflow: visible;   left: 50%;top: 50%;margin-left: -286px;margin-top: -141px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 281px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 281px; left: 570px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 580px; top: 281px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
    '<div id="_uwndWnd2" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: absolute; width: 572px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 572px; height: 283px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
    '<div id="popup_answer_comment_dad" class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_answer_comment" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Добавить комментарий</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 242px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 550px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<form id="frm235" onsubmit="sendFrm235();  return false;">'+
    '<fieldset><legend><b>Комментарий от:</b></legend><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td width="50%"><b>'+username+'</b> &nbsp; <span style="unicode-bidi:embed;">['+date+']</span></td><td align="right"><select name="subs"><option value="0">Без подписки</option><option value="1">Все комментарии к материалу</option><option value="2" selected="">Ответы на мой комментарий</option></select></td></tr></tbody></table></fieldset>'+
    '<fieldset><legend><b>Сообщение</b></legend><span style="padding-right:1px;" id="bc1"><input type="button" title="Bold" value="b" class="codeButtons" id="b3" style="width:20px;font-weight:bold"></span><span style="padding-right:1px;" id="bc2"><input type="button" title="Italic" value="i" class="codeButtons" id="i3" style="width:20px;font-style:italic"></span><span style="padding-right:1px;" id="bc3"><input type="button" title="Underline" value="u" class="codeButtons" id="u3" style="width:20px;text-decoration:underline"></span><span style="padding-right:1px;" id="bc4"><select id="fsize3" class="codeButtons"><option value="0">SIZE</option><option value="6">6 pt</option><option value="7">7 pt</option><option value="8">8 pt</option><option value="9">9 pt</option><option value="10">10 pt</option><option value="11">11 pt</option><option value="12">12 pt</option><option value="13">13 pt</option><option value="14">14 pt</option><option value="15">15 pt</option><option value="16">16 pt</option><option value="17">17 pt</option><option value="18">18 pt</option><option value="19">19 pt</option><option value="20">20 pt</option><option value="21">21 pt</option><option value="22">22 pt</option></select></span><span style="padding-right:1px;" id="bc6"><select id="fcolor3" class="codeButtons"><option value="0">COLOR</option><option value="blue" style="color:blue">Blue</option><option value="red" style="color:red">Red</option><option value="purple" style="color:purple">Purple</option><option value="orange" style="color:orange">Orange</option><option value="yellow" style="color:yellow">Yellow</option><option value="gray" style="color:gray">Gray</option><option value="green" style="color:green">Green</option></select></span>'+
    '<span style="padding-right:1px;" id="bc7"><input type="button" title="URL" value="http://" class="codeButtons" style="direction:ltr;width:45px;" id="url3"></span>'+
    '<span style="padding-right:1px;" id="bc8"><input type="button" title="E-mail" value="@" class="codeButtons" style="width:30px;" id="email3"></span>'+
    '<span style="padding-right:1px;" id="bc9"><input type="button" title="Image" value="img" class="codeButtons" style="width:35px;" id="img3"></span><span style="padding-right:1px;" id="bc18"><input type="button" title="Hide from Guest" value="hide" class="codeButtons" style="width:40px;" id="hide3"></span><span style="padding-right:1px;" id="bc12"><input type="button" title="List" value="list" class="codeButtons" id="list3" style="width:30px;"></span><span style="padding-right:1px;" id="bc13"><input type="button" title="Left" style="width:20px;text-align:left;" value="···" class="codeButtons" id="cdl3"></span><span style="padding-right:1px;" id="bc14"><input type="button" title="Center" style="width:20px;text-align:center;" value="···" class="codeButtons" id="cdc3"></span><span style="padding-right:1px;" id="bc15"><input type="button" title="Right" style="width:20px;text-align:right;" value="···" class="codeButtons" id="cdr3"></span><span style="padding-right:1px;" id="bc16"><input type="button" title="All codes" style="width:60px;" value="All codes" class="codeButtons"></span><span style="padding-right:1px;" id="bc17"><input style="font-weight:bold;width:20px" type="button" value="/" class="codeButtons codeCloseAll" title="Close all opened codes"></span><input type="hidden" id="tagcount3" value="0">'+
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr><td valign="top"><textarea style="width:100%;height:115px;" id="message2" name="message2"></textarea></td><td valign="top" width="1%" nowrap="nowrap">'+
    
    '<table border="0" cellpadding="2" class="smiles"><tbody>'+
    '<tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'>(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/angry.gif" title="angry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':D\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/biggrin.gif" title="biggrin"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'B)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/cool.gif" title="cool"></a></td></tr><tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':\\\'(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/cry.gif" title="cry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'<_<\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/dry.gif" title="dry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'^_^\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/happy.gif" title="happy"></a></td></tr>'+
    '<tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/sad.gif" title="sad"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/smile.gif" title="smile"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':o\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/surprised.gif" title="surprised"></a></td></tr><tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':p\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/tongue.gif" title="tongue"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'%)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/wacko.gif" title="wacko"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\';)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/wink.gif" title="wink"></a></td></tr><tr id="asmltrSoVNa" style="display: none;">'+
    '<td colspan="3" align="center" id="allSmiles" nowrap=""><a href="javascript://" rel="nofollow">Все смайлы</a></td></tr></tbody></table>'+
    
    
    '</td></tr></tbody></table>'+
    '</fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td id="msg235">&nbsp;</td><td width="5%" nowrap="nowrap">'+
    '<table border="0" cellpadding="0" cellspacing="0">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm235">'+
    '<a href="javascript://" class="answer_com_add" c_comment_id="'+parent_id+'">Добавить</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm235" id="submfrm235"></td>'+
    '</tr>'+
    '</tbody></table>'+
    	'</td></tr></tbody></table></fieldset>'+
    '<input type="hidden" name="ssid" value="Htp7Wdkw"><input type="hidden" name="a" value="36"><input type="hidden" name="pid" value="286153"><input type="hidden" name="sos" value="4149968531" id="dkdjfi38">'+
    '<input id="csoc_type" type="hidden" name="soc_type" value="0"><input id="cdata" type="hidden" name="data" value="">'+
    '</form>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
    ball = document.getElementById('popup_answer_comment');
    ball_dad = document.getElementById('popup_answer_comment_dad');
    
    ball_dad.onmousedown = function(e) {
    
      var coords = getCoords(ball);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
    
      ball.style.position = 'absolute';
      ball.style.margin = '0px';
      moveAt(e);
      
      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
      }
    
      document.onmousemove = function(e) {
        moveAt(e);
      };
    
      ball_dad.onmouseup = function() {
        document.onmousemove = null;
        ball_dad.onmouseup = null;
      };
    
    }
    
    ball_dad.ondragstart = function() {
      return false;
    };
}

function getCoords(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

$(".close_popup_answer_comment").live("click",function(){
    $("#popup_answer_comment").remove();
});

function popupSmiles(smiles){
    $('body').append('<div id="popupSmiles" style="position: fixed; z-index: 10004; overflow: visible; left: 50%;top: 50%;margin-left: -136px;margin-top: -195px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 389px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 389px; left: 270px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 280px; top: 389px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: absolute; width: 272px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 272px; height: 391px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
    '<div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_smiles" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Полный список смайлов</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 350px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow-y: auto; width: 250px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<table id="popupSmilesTable" border="0" cellspacing="0" style="width:100%" cellpadding="2">'+
    '</table></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
    i=0;
    while(i<smiles.length){
        $("#popupSmilesTable").append('<tr class="smile_to_add" smile="'+smiles[i].name_file+'" style="cursor:pointer;"><td class="myWinTD1" width="40%" align="center" style="max-width:80px;">'+smiles[i].name_sml+'</td><td class="myWinTD1" align="center"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/'+smiles[i].name_file+'" title="wacko"></td></tr>');
        i++;
    }
}
$(".close_popup_smiles").live("click",function(){
    $("#popupSmiles").remove();
});

function showPopupChatMessageEdit(message){
    $('body').append('<div id="popup_chat_message_edit" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: fixed;width: 622px;z-index: 2;overflow: visible;top: 50%;left: 50%;margin-left: -311px;margin-top: -100px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 622px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_chat_message_edit" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Редактирование комментария</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 600px; display: block; height: 100%;" align="center" unselectable="on"><table border="0" cellspacing="1" width="100%" cellpadding="2"><tbody><tr>'+
        '<td width="20%" align="right">Пользователь:</td><td><a><b>'+message['username']+'</b></a> ('+message['username']+')</td></tr>'+
        '<tr><td align="right" valign="top">Сообщение:</td><td><textarea rows="6" name="message" id="mess" cols="30" style="width:98%;">'+message['message']+'</textarea></td></tr>'+
        '<tr><td id="eMsg835" align="right"></td><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutipd348">'+
        '<a href="javascript://" idm="'+message['id']+'" class="save_chat_message">Изменить</a>'+
        '</div></td><td class="myBtnRight"></td><td style="visibility:hidden;"></td></tr></tbody></table></td></tr></tbody></table>'+
        '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>'
    );
}

$(".close_popup_chat_message_edit").live("click",function(){
    $("#popup_chat_message_edit").remove();
});

function popupBannedUser(){
    var text = 'Для вашего аккаунта любая активность временно заблокирована';
    $('body').append('<div id="popup_banned_user" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;color:red;"><b>'+text+'</b></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function emoticon(code,nm){if (code != ""){var txtarea=document.getElementById(nm);code = ' ' + code + ' ';if (document.selection) {txtarea.focus();var txtContent = txtarea.value;var str = document.selection.createRange();if (str.text == ""){str.text = code;} else if (txtContent.indexOf(str.text) != -1){str.text = code + str.text;} else {txtarea.value = txtContent + code;}}else{txtarea.value = txtarea.value + code;}}}

function afterRemindBlock(text){
    $('body').append('<div id="after_remind_block" class="" style="position: fixed; z-index: 21004; overflow: visible; left: 50%;top: 50%;margin-left: -175px;margin-top: -75px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 148px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 148px; left: 348px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 358px; top: 148px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 350px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="display: none; overflow: hidden; position: absolute; z-index: 30010; width: 350px; height: 150px;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
        '<div class="xt xt-close xt-close2 close_after_remind_block" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
        '<span class="xw-hdr-text" unselectable="on" title="">Уведомление</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 109px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 328px; display: block; height: 100%;" align="center" unselectable="on">'+
        '<br><b>'+text+'</b><br><br>[ <a href="javascript://" class="close_after_remind_block"><b>Закрыть окно</b></a> ]</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 350px; height: 125px; display: none;" unselectable="on"></div></div></div>');
}

$('.close_after_remind_block').live("click",function(){
    $("#after_remind_block").remove();
})

// BANNERS

var banners = [];
//var test_banners = [];
//var counter = 0;
function getbanner(el_id){
    var arr_banners = [];
    count_banners = banners.length;
    i = 0;
    while(i < count_banners){
        for(k=0;k < banners[i].priority;k++){
            arr_banners.push(banners[i].code);
        }
        i++;
    }
    var item = arr_banners[Math.floor(Math.random()*arr_banners.length)];
    //test_banners[counter] = {"el_id" : el_id, "code": item};
    //counter++;
    //console.log(item);
    //document.write(item);
    if(el_id == 'banner_left_center'){
        document.write(item);
    }else{
        $(document).ready(function(){ $("#"+el_id).append(item); });
    }
    //$('body').live("load",function(){ $("#"+el_id).append(item); });
    //var el = document.getElementById('banner_left_top');
    //el.innerHTML = '<div id=\'bn_6b4ffe039a\'>загрузка...</div> <script type=\'text/javascript\' src=\'http://recreativ.ru/rcode.6b4ffe039a.js\'></script>';
}


// BANNERS end