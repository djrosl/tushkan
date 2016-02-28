$.ajax({
    type : 'GET',
    data : {p:'films'},
    dataType : 'json',
    contentType: "application/json",
    url : '/index/getrectoview',
    async: false,
    success : function (res) {
        if(res.status == "success"){
            var last_films = res.last_films;
            var res = '<div id="menu-cont2" style="width: 630px;">';
            var count_rectoview = last_films.length;
            i=0;
            while(i < count_rectoview){
                var a = new Date(last_films[i].addtime*1000);
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
                
                var str = last_films[i].title;
                str = str.replace(/Смотреть онлайн бесплатно в хорошем качестве/,"");
                str = str.replace(/Смотреть фильм онлайн/,"");
                str = str.replace(/(\(2015\))/,"");
                str = str.replace(/(\(2014\))/,"");
                str = str.replace(/(\(2013\))/,"");
                str = str.replace(/(\(2012\))/,"");
                str = str.replace(/(\(2011\))/,"");
                str = str.replace(/(\(2010\))/,"");
                str = str.replace("  "," ");
                
                res +=
                '<div class="filmsmenu">'+
                    '<ul>'+
                        '<li>'+
                            '<div class="filmmenu_img">'+
                                '<div class="filmmenu_text">'+
                                    '<a href="/news/'+last_films[i].sbscr+'/'+time+'-'+last_films[i].id+'" title="">'+
                                        str+
                                    '</a>'+
                                '</div>'+
                                '<a href="/news/'+last_films[i].sbscr+'/'+time+'-'+last_films[i].id+'">'+
                                    '<img src="'+last_films[i].other1+'" alt="'+last_films[i].title+'">'+
                                '</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                '</div>';
                
                i++;
            }
            res += '</div>';
            $("#recommend_to_view").append(res);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Error : "+textStatus+" / "+errorThrown);
    }
});
