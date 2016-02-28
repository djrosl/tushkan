<?php
class Zend_View_Helper_TopFilms extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function topFilms(){
        include(APPLICATION_PATH.'/../tushkan.net/img_resize.php');
        $memcache = Zend_Registry::get("memcache");
        $key = 'top_films';
        if(($result = $memcache->get($key)) === false){
            $rand_films_ids = Model_Settings::getSettingsByKey("top_film");
            $this->_resize_images($rand_films_ids);
            $html = $this->_renderHTML($rand_films_ids);
            $memcache->set($key, $html, false, 3600);
        }else{
            //$html = $result;
            $rand_films_ids = Model_Settings::getSettingsByKey("top_film");
            $this->_resize_images($rand_films_ids);
            $html = $this->_renderHTML($rand_films_ids);
        }
        
        return $html;
    }
    
    protected function _resize_images($rand_films_ids){
        define('USE_RESAMPLE',true);
        foreach($rand_films_ids as $key=>$film_id){
            $one_film = (array) Model_News::getOneNewsSomeFieldsById($film_id);
            $image = $one_film['other1'];
            $is_admins = strpos($image,'/_nw/');
            if($is_admins !== false){
                $image = $one_film['other1']; //'http://tushkan.net'.
            }
            $name = CACHE_DIR.'/top/'.$one_film['id'].'.jpg';
            echo '<div style="display:none;">'; //ну а по другому никак :)))
            ob_start();
            $res = send_thumbnail($image, 182, 260);
            $content = ob_get_contents();
            echo $name.'</div>';
            if ($res && (@$fp = fopen($name, 'wb+'))) {
                fputs($fp,$content);
                fclose($fp);
            }
        }
    }
    
    protected function _renderHTML($rand_films_ids){
        ob_start();
        foreach(array_slice($rand_films_ids, 0, 5) as $film_id){
            $one_film = (array) Model_News::getOneNewsSomeFieldsById($film_id);
        ?>
                            
                            <div class="film-banner">
                                    <?php
                                    $str = str_replace('Смотреть онлайн бесплатно в хорошем качестве', '', $one_film['title']);
                                    $str = str_replace('Смотреть онлайн полностью бесплатно фильм', '', $str);
                                    $str = str_replace('Смотреть фильм онлайн', '', $str);
                                    $str = str_replace('Смотреть мультфильм онлайн', '', $str);
                                    $str = str_replace('Смотреть сериал онлайн', '', $str);
                                    $str = str_replace('Смотреть сериал онлайн', '', $str);
                                    for($y = 2010; $y <= ((int)date('Y')) - 2; ++$y) {
                                        $str = str_replace('('.$y.')', '', $str);
                                    }
                                    $titleStr = getTitleTagText($one_film['title'], $one_film['catID']);
                                    ?>
                                <a title="<?php echo $titleStr; ?>" href="/news/<? echo $one_film['sbscr'] ?>/<? echo date('Y-m-d', $one_film['addtime']); ?>-<? echo $one_film['id'] ?>">
                                    <img src="<? echo file_exists(CACHE_DIR.'/top/'.$one_film['id'].'.jpg') ? "/images_cached/top/".$one_film['id'].".jpg" : $one_film['other1']; ?>" alt="<? echo $titleStr; ?>"></a>
                            </div>
        <? }
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}