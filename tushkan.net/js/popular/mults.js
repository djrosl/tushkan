$.ajax({
    type : 'GET',
    data : {p:'mults'},
    dataType : 'json',
    contentType: "application/json",
    url : '/index/getpopular',
    async: false,
    success : function (res) {
        if(res.status == "success"){
            var popular = res.popular;
            var res = '<div class="box2"><div id="inf_2"><ul class="menu_inf">';
            var count_popular = popular.length;
            i=0;
            while(i < count_popular){
                var a = new Date(popular[i].addtime*1000);
                var hour = (a.getHours()+1).toString();
                var min = a.getMinutes().toString();
                var date = a.getDate().toString();
                var year = a.getFullYear().toString();
                var month = a.getMonth().toString();
                if(hour.length == 1){
                    hour = '0'+hour;
                }
                if(min.length == 1){
                    min = '0'+min;
                }
                if(month.length == 1){
                    month = '0'+month;
                }
                var time = year + '-' + month + '-' + date;
                var time2 = date + '.' + month + '.' + year;
                
                var str = popular[i].title;
                str = str.replace(/Смотреть онлайн бесплатно в хорошем качестве/,"");
                str = str.replace(/Смотреть фильм онлайн/,"");
                str = str.replace(/(\(2015\))/,"");
                str = str.replace(/(\(2014\))/,"");
                str = str.replace(/(\(2013\))/,"");
                str = str.replace(/(\(2012\))/,"");
                str = str.replace(/(\(2011\))/,"");
                str = str.replace(/(\(2010\))/,"");
                str = str.replace("  "," ");
                length_str = str.length;
                last_symb = str.substr(length_str-1);
                if(last_symb == " "){
                    str = str.substr(0,length_str-1);
                }
                
                res +=
                '<li> <a href="/news/'+popular[i].sbscr+'/'+time+'-'+popular[i].id+'">'+
                    '<img src="'+popular[i].other1+'" alt="" border="0" width="60" height="77" class="img_slaider"></a> <div class="menu_inf_info">'+
                    '<a href="/news/'+popular[i].sbscr+'/'+time+'-'+popular[i].id+'">'+
                    str+
                    '</a>'+
                    '<br> '+time2+
                    '<br>  Комментариев:'+
                    '<b>'+
                    '<a href="/news/'+popular[i].sbscr+'/'+time+'-'+popular[i].id+'#comments">'+popular[i].num_com+'</a>'+
                    '</b><br>  Рейтинг: <b> '+popular[i].rating+' / 5.0</b><br> </div>'+ 
                '</li>';
                
                i++;
            }
            res += '</ul></div></div>';
            $("#popular_mults").append(res);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Error : "+textStatus+" / "+errorThrown);
    }
});
