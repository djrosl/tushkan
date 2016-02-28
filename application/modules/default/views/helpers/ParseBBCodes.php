<?php
class Zend_View_Helper_ParseBBCodes extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function parseBBCodes($text)	{
    	$text = preg_replace('/\[(\/?)(b|i|u|s)\s*\]/', "<$1$2>", $text);
    	
    	$text = preg_replace('/\[code\]/', '<pre><span style="font-size: 10px">Code</span><code style="border:1px solid #c0c0c0;padding: 2px;display: block">', $text);
    	$text = preg_replace('/\[\/code\]/', '</code></pre>', $text);
    	
    	$text = preg_replace('/\[(\/?)quote\]/', "<$1blockquote>Цитата:<br>", $text);
    	$text = preg_replace('/\[(\/?)quote(\s*=\s*([\'"]?)([^\'"]+)\3\s*)?\]/', "<$1blockquote>Цитата $4:<br>", $text);

        $text = preg_replace('/\[img\s*\]([^\]\[]+)\[\/img\]/', "<img src='$1'/>", $text);
        $text = preg_replace('/\[img\s*=\s*([\'"]?)([^\'"\]]+)\1\]/', "<img src='$2'/>", $text);
        
    	$text = preg_replace('/\[url\](?:http:\/\/)?([a-z0-9-.]+\.\w{2,4})\[\/url\]/', "<a target='_blank' href=\"http://$1\">$1</a>", $text);
    	$text = preg_replace('/\[url\s?=\s?([\'"]?)(?:http:\/\/)?([a-z0-9-.]+\.\w{2,4})\1\](.*?)\[\/url\]/', "<a target='_blank' href=\"http://$2\">$3</a>", $text);
        
        $text = preg_replace("#\[url=(.+?)\](.+?)\[\/url\]#is","<a target='_blank' href='\\1'>\\2</a>",$text);
        $text = preg_replace("#\[url\](.+?)\[\/url\]#is","<a target='_blank' href='\\1'>\\1</a>",$text);
        $text = preg_replace("#\[url[\s]*=[\s]*([\S]+)[\s]*\][\s]*([^\[]*)\[/url\]#isU",
                             '<a href="\\1" target="_blank">\\2</a>',$text);
        
        while( preg_match( "#\[color=([^\]]+)\](.+?)\[/color\]#ies", $text ) )
        { $text = preg_replace( "#\[color=([^\]]+)\](.+?)\[/color\]#is" , "<span style='color:\\1'>\\2</span>" , $text ); }
        $text = preg_replace( "#\[color\s*=\s*(\S+?)\s*\]|\[\/color\]#is" , "" , $text );
        
        while( preg_match( "#\[size=([^\]]+)\](.+?)\[/size\]#ies", $text ) )
        { $text = preg_replace( "#\[size=([^\]]+)\](.+?)\[/size\]#is" , "<span style='font-size:\\1pt'>\\2</span>" , $text ); }
        $text = preg_replace( "#\[size\s*=\s*(\S+?)\s*\]|\[\/size\]#is" , "" , $text );
        
        while( preg_match( "#\[font=([^\]]+)\](.+?)\[/font\]#ies", $text ) )
        { $text = preg_replace( "#\[font=([^\]]+)\](.+?)\[/font\]#is" , "<span style='font-family:\\1'>\\2</span>" , $text ); }
        $text = preg_replace( "#\[font\s*=\s*(\S+?)\s*\]|\[\/font\]#is" , "" , $text );
        
        $text = preg_replace("#\[list\](.+?)\[\/list\]#is", "<ul>\\1</ul>", $text);
        $text = preg_replace("#\[listn](.+?)\[\/listn\]#is", "<ol>\\1</ol>", $text);
        $text = preg_replace("#\[\*\](.+?)\[\/\*\]#", "<li>\\1</li>", $text);
        
        $text = str_replace("[spoiler]", "<div class='bb_tag_spoiler'> <div class='spoiler_title'><input style='margin-left:10px' type='button' onclick=\"$(this).parent('div').parent('div').find('.spoiler_body').slideToggle(); \" value='Спойлер'\"/> </div> <div class='spoiler_body' style='display:none'>", $text);
        $text = str_replace("[/spoiler]", "</div></div>", $text);
        
        $text = str_replace("[video]", '<iframe width="220" height="140" src="', $text);
        $text = str_replace("watch?v=", 'embed/', $text);
        $text = str_replace("[/video]", '" frameborder="0" allowfullscreen></iframe>', $text);
        
        $text = str_replace("[flash]", '<iframe width="220" src="', $text);
        $text = str_replace("[/flash]", '" frameborder="0" allowfullscreen></iframe>', $text);
        
        $text = str_replace("[audio]", '<div class="bb_tag_audio"><object type="application/x-shockwave-flash" data="/images/bbcode/dewplayer-vol.swf" width="220" height="20" id="dewplayer-vol> <param name="movie" value="/images/bbcode/dewplayer-vol.swf"></param> <param name="bgcolor" value="#5E9F6C"></param> <param name="FlashVars" value="mp3=', $text);
        $text = str_replace("[/audio]", '"></param> </object></div>', $text);
        
    	return $text;
    }

}