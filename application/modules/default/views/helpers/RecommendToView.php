<?php
class Zend_View_Helper_RecommendToView extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function recommendToView($excludeId = 0, $tags = ''){
        $memcache = Zend_Registry::get("memcache");
        $key = 'recommendtoview_'.$excludeId;
        if(($result = $memcache->get($key)) === false ) {
            $last_films = Model_News::getLastFilms($excludeId, explode(',', $tags));
            $html = $this->_renderHTML($last_films);
            $memcache->set($key, $html, false, 10800);
        } else {
            $html = $result;
        }
        return $html;
    }
    
    protected function _renderHTML($last_films){
        ob_start();
        ?>
        <div id="menu-cont2" style="width: 630px;">
            <? foreach($last_films as $item){
            $str = str_replace('Смотреть онлайн бесплатно в хорошем качестве', '', $item['title']);
            $str = str_replace('Смотреть онлайн полностью бесплатно фильм', '', $str);
            $str = str_replace('Смотреть фильм онлайн', '', $str);
            $str = str_replace('Смотреть мультфильм онлайн', '', $str);
            $str = str_replace('Смотреть сериал онлайн', '', $str);
            $str = str_replace('Смотреть сериал онлайн', '', $str);
            $str = str_replace('  ', '', $str);
            for($y = 2010; $y <= (int)date('Y'); ++$y) {
                $str = str_replace('('.$y.')', '', $str);
            }
            $str = trim($str);
            ?>
            <div class="filmsbottom">
                <ul>
                    <li>
                        <div class="filmsbottom_img">
                            <div class="filmsbottom_text">
                                <a href="/news/<? echo $item['sbscr']; ?>/<? echo date('Y-m-d', $item['addtime'])?>-<? echo $item['id']; ?>" title="<?php echo $item['title']; ?>">
                                    <?php echo $str; ?>
                                </a>
                            </div>
                            <a href="/news/<? echo $item['sbscr']; ?>/<? echo date('Y-m-d', $item['addtime'])?>-<? echo $item['id']; ?>">
                                <img src="<? echo $item['other1']; ?>" alt="<? echo $item['title']; ?>">
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <?}?>
        </div>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}