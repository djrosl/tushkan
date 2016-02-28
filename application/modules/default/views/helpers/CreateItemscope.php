<?php
class Zend_View_Helper_CreateItemscope extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function createItemscope($one_news){
        $memcache = Zend_Registry::get("memcache");
        $key = 'itemscope_one_news_'.$one_news['id'];
        if(($result = $memcache->get($key)) === false){
        $str = $one_news['message'];
        $res = '
<div itemscope itemtype="http://schema.org/Movie">';
        
        $pos_1 = strpos($str,"<b>Оригинальное название:</b>");
        $pos_count_str_1 = 150;
        $pos_count_str_2 = 200;
        $pos_count_symb = 50;
        $pos_2 = $pos_1 + $pos_count_str_1 + $pos_count_symb;
        $str_1 = substr($str,$pos_1+$pos_count_symb,$pos_count_str_2);
        $pos_space = strpos($str_1,"<");
        $str_3 = substr($str,$pos_1+$pos_count_symb,$pos_space-1);
        $res .= "
<meta itemprop=\"name\" content=\"".$str_3."\">";
        
        $pos_1 = strpos($str,"<b>В ролях:</b>");
        $pos_count_str_1 = 250;
        $pos_count_str_2 = 300;
        $pos_count_symb = 22;
        $pos_2 = $pos_1 + $pos_count_str_1 + $pos_count_symb;
        $str_1 = substr($str,$pos_1+$pos_count_symb,$pos_count_str_2);
        $pos_space = strpos($str_1,"<");
        $str_3 = substr($str,$pos_1+$pos_count_symb,$pos_space-1);
        $str_3 = strip_tags($str_3);
        $res .= "
<meta itemprop=\"actor\" content=\"".$str_3."\">";
        
        $pos_1 = strpos($str,"<b>Режиссер:</b>");
        $pos_count_str_1 = 80;
        $pos_count_str_2 = 130;
        $pos_count_symb = 25;
        $pos_2 = $pos_1 + $pos_count_str_1 + $pos_count_symb;
        $str_1 = substr($str,$pos_1+$pos_count_symb,$pos_count_str_2);
        $pos_space = strpos($str_1,"<");
        $str_3 = substr($str,$pos_1+$pos_count_symb,$pos_space-1);
        $res .= "
<meta itemprop=\"director\" content=\"".$str_3."\">";
        
        $pos_1 = strpos($str,"<b>Жанр:</b>");
        $pos_count_str_1 = 50;
        $pos_count_str_2 = 100;
        $pos_count_symb = 17;
        $pos_2 = $pos_1 + $pos_count_str_1 + $pos_count_symb;
        $str_1 = substr($str,$pos_1+$pos_count_symb,$pos_count_str_2);
        $pos_space = strpos($str_1,"<");
        $str_3 = substr($str,$pos_1+$pos_count_symb,$pos_space-1);
        $res .= "
<meta itemprop=\"genre\" content=\"".$str_3."\">";
        
        $str = str_replace("\$CUT$", "", $str);
        $str = str_replace('"', '', $str);
        $pos_1 = strpos($str,"<b>Описание:</b>");
        $ccc = 24;
        if(!$pos_1){
            $pos_1 = strpos($str,"<b>Описание: </b>");
            $ccc = 25;
        }
        if(!$pos_1){
            $ccc = 0;
        }
        $pos_2 = $pos_1 + 175;
        $str_1 = substr($str,$pos_1+$ccc,320);
        $str_2 = substr($str_1,270);
        $pos_space = strpos($str_2," ");
        $str_3 = substr($str,$pos_1+$ccc);
        $pos_tag = strpos($str_3,"<center>");
        $str_3 = substr($str_3,0,$pos_tag);
        $str_3 = strip_tags($str_3);
$str_3 = str_replace('
', ' ', $str_3);
        $res .= "
<meta itemprop=\"description\" content=\"".$str_3."\">
</div>
        ";
        
        $memcache->set($key, $res, false, 3600);
        }else{
            $res = $result;
        }
        
        return $res;
    }
    
}