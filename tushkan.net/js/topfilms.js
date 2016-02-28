$.ajax({
    type : 'GET',
    data : {p:'films'},
    dataType : 'json',
    contentType: "application/json",
    url : '/index/gettopfilms',
    async: false,
    success : function (res) {
        if(res.status == "success"){
            var top_films = res.top_films;
            var res = '';
            var count_top_films = top_films.length;
            i=0;
            while(i < count_top_films){
                var a = new Date(top_films[i].addtime*1000);
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
                
                var str = top_films[i].title;
                str = str.replace(/Смотреть онлайн бесплатно в хорошем качестве/,"");
                str = str.replace(/Смотреть фильм онлайн/,"");
                str = str.replace(/(\(2015\))/,"");
                str = str.replace(/(\(2014\))/,"");
                str = str.replace(/(\(2013\))/,"");
                str = str.replace(/(\(2012\))/,"");
                str = str.replace(/(\(2011\))/,"");
                str = str.replace(/(\(2010\))/,"");
                length_str = str.length;
                str = str.substr(0,length_str-2);
                
                res +=
                '<td class="infTd" width="14%">'+
                    '<div class="filmsmenu">'+
                        '<ul>'+
                            '<li>'+
                                '<div class="filmmenu_img">'+
                                    '<div class="filmmenu_text">'+
                                        '<a href="/news/'+top_films[i].sbscr+'/'+time+'-'+top_films[i].id+'" title="">'+
                                            str+
                                        '</a>'+
                                    '</div>'+
                                    '<a href="/news/'+top_films[i].sbscr+'/'+time+'-'+top_films[i].id+'">'+
                                        '<img src="'+top_films[i].other1+'" alt="'+top_films[i].title+'">'+
                                    '</a>'+
                                '</div>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</td>';
                
                i++;
            };
            
            $("#top_films").append(res);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Error : "+textStatus+" / "+errorThrown);
    }
});
