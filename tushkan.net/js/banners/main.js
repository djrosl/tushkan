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
