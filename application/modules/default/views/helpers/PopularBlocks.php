<?php
class Zend_View_Helper_PopularBlocks extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function popularBlocks($param, $time = 10800){
        include(APPLICATION_PATH.'/../tushkan.net/img_resize.php');
        $memcache = Zend_Registry::get("memcache");
        $key = 'popular_blocks_'.$param;
        if(($result = $memcache->get($key)) === false){
            $popularInterval = '-7 days';
            switch($param){
                case 'films': $top_news = Model_News::getTopFilms($popularInterval); break;
                case 'serials': $top_news = Model_News::getTopNewsByCatId(7, $popularInterval); break;
                case 'mults': $top_news = Model_News::getTopNewsByCatId(20, $popularInterval); break;
                case 'casts': $top_news = Model_News::getTopNewsByCatId(3, $popularInterval); break;
            }
            $this->_resize_images($top_news);
            $html = $this->_renderHTML($top_news);
            $memcache->set($key, $html, false, $time);
        }else{
            //$html = $result;
            $popularInterval = '-7 days';
            switch($param){
                case 'films': $top_news = Model_News::getTopFilms($popularInterval); break;
                case 'serials': $top_news = Model_News::getTopNewsByCatId(7, $popularInterval); break;
                case 'mults': $top_news = Model_News::getTopNewsByCatId(20, $popularInterval); break;
                case 'casts': $top_news = Model_News::getTopNewsByCatId(3, $popularInterval); break;
            }
            $this->_resize_images($top_news);
            $html = $this->_renderHTML($top_news);
        }
        
        return $html;
    }
    
    protected function _resize_images($top_news){
        if(!defined('USE_RESAMPLE')) define('USE_RESAMPLE',true);
        foreach($top_news as $one_news){
            $image = $one_news['other1'];
            $is_admins = strpos($image,'/_nw/');
            if($is_admins !== false){
                $image = $one_news['other1']; //'http://tushkan.net'.
            }
            $name = CACHE_DIR.'/popular/'.$one_news['id'].'.jpg';
            /*echo '<div style="display:none;">'; //ну а по другому никак :)))
            ob_start();
            $res = send_thumbnail($image,75,100);
            $content = ob_get_contents();
            echo '</div>';*/
            if ($res && (@$fp = fopen($name,'wb+')))
            {
                fputs($fp,$content);
                fclose($fp);
            }
        }
    }
    
    protected function _renderHTML($top_news){
        $settings = (array) Model_Settings::getParamSettingsByKey("sort_popular_films");
        $order_param = $settings['value'];
        ob_start();
        ?>
                    <? foreach($top_news as $item){
                    $str = str_replace('Смотреть онлайн бесплатно в хорошем качестве', '', $item['title']);
                    $str = str_replace('Смотреть онлайн полностью бесплатно фильм', '', $str);
                    $str = str_replace('Смотреть фильм онлайн', '', $str);
                    $str = str_replace('Смотреть мультфильм онлайн', '', $str);
                    $str = str_replace('Смотреть сериал онлайн', '', $str);
                    $str = str_replace('Смотреть сериал онлайн', '', $str);
                    $str = str_replace('  ', '', $str);
                    for($y = 2010; $y <= 2015; ++$y) {
                        $str = str_replace('('.$y.')', '', $str);
                    }
                    $str = trim($str);
                    ?>

                    <div class="film-card">
                        <a title="<?php echo $item['title']; ?>" href="/news/<? echo $item['sbscr']; ?>/<? echo date('Y-m-d', $item['urltime']); ?>-<? echo $item['id']; ?>">
                            <img src="<? echo file_exists(CACHE_DIR.'/popular/'.$item['id'].'.jpg') ? "/images_cached/popular/".$item['id'].".jpg" : $item['other1']; ?>" alt="<?php echo $str; ?>">
                            <p><?=$str;?><br><span>/Levitan</span></p>  
                        </a>
                    </div>
      
                <? } ?>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}