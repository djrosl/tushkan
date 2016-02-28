<?php
class Zend_View_Helper_LastComments extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function lastComments(){
        $memcache = Zend_Registry::get("memcache");
        $key = 'last_comments';
        if(($result = $memcache->get($key)) === false){
            $last_comments = Model_Comments::getLastComments();
            $html = $this->_renderHTML($last_comments);
            $memcache->set($key, $html, false, 900);
        }else{
            //$html = $result;
            $last_comments = Model_Comments::getLastComments();
            $html = $this->_renderHTML($last_comments);
        }
        
        return $html;
    }

    public function words_limit($input_text, $limit = 20, $end_str = '...') {
        $input_text = strip_tags($input_text);
        $words = explode(' ', $input_text);
        if ($limit < 1 || sizeof($words) <= $limit) {
            return $input_text;
        }
        $words = array_slice($words, 0, $limit);
        $out = implode(' ', $words);
        return $out.$end_str;
    }
    
    protected function _renderHTML($last_comments){
        ob_start(); ?>
            <? foreach($last_comments as $item){ ?>
                <div class="last-comment">
            <? if($item['moduleID'] == "3"){
                $material = (array) Model_Publ::getOnePublById($item['materialID']);
                ?>
                <a href="/publ/<?if($material['cat_pass'] != ""){ echo $material['cat_pass']."/";}?><? echo $material['url']; ?>/<? echo $material['catID']; ?>-1-0-<? echo $material['id']; ?>"><?php
                    $title = str_replace(array(
                        'Смотреть мультфильм онлайн',
                        'Смотреть фильм онлайн',
                        'Смотреть передачу онлайн',
                        'Смотреть сериал онлайн',
                        'Смотреть онлайн'
                    ), '', $material['title']); 
                    echo '«'.trim($title).'»'; ?></a>
                <? } else if($item['moduleID'] == "2") {
                    $material = (array) Model_News::getOneNewsById($item['materialID']);
                    ?>
                        <a href="/news/<? echo $material['sbscr']; ?>/<? echo date('Y-m-d', $material['urltime']); ?>-<? echo $material['id']; ?>"><?php
                        $title = str_replace(array(
                            'Смотреть мультфильм онлайн',
                            'Смотреть фильм онлайн',
                            'Смотреть передачу онлайн',
                            'Смотреть сериал онлайн',
                            'Смотреть онлайн'
                        ), '', $material['title']); 
                        echo '«'.trim($title).'»'; ?></a>
                <?php }
                $str = $item['message'];
                ?><p><? echo words_limit($str, 15); ?></p>
                </div>
            <?
        }
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}