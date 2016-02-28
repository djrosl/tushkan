function test_banner(){
    //$("#banner_left_top").append('<div id=\'bn_6b4ffe039a\'>загрузка...</div> <script type=\'text/javascript\' src=\'http://recreativ.ru/rcode.6b4ffe039a.js\'></script>');
    //$("#banner_left_center").append('<div id=\'bn_6b4ffe039a\'>загрузка...</div> <script type=\'text/javascript\' src=\'http://recreativ.ru/rcode.6b4ffe039a.js\'></script>');
    //$("#banner_right_big").append('<div id=\'bn_6b4ffe039a\'>загрузка...</div> <script type=\'text/javascript\' src=\'http://recreativ.ru/rcode.6b4ffe039a.js\'></script>');
    //document.write('132');
    
    count_1 = test_banners.length;
    //console.log(test_banners);
    i = 0;
    while(i < count_1){
        $("#"+test_banners[i].el_id).append(test_banners[i].code);
        i++;
    }
}