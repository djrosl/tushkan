<?php
class Zend_View_Helper_LastPubls extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function lastPubls(){
        include(APPLICATION_PATH.'/../tushkan.net/img_resize.php');
        $memcache = Zend_Registry::get("memcache");
        $key = 'last_publs';
        if(($result = $memcache->get($key)) === false){
            $last_publs = Model_Publ::getLastPubls();
            $this->_resize_images($last_publs);
            $html = $this->_renderHTML($last_publs);
            $memcache->set($key, $html, false, 10800);
        }else{
            //$html = $result;
            $last_publs = Model_Publ::getLastPubls();
            $this->_resize_images($last_publs);
            $html = $this->_renderHTML($last_publs);
        }
        
        return $html;
    }
    
    protected function _resize_images($last_publs){
        define('USE_RESAMPLE',true);
        foreach($last_publs as $item){
            $image = $item['asite'];
            $is_admins = strpos($image,'/_pu/');
            if($is_admins !== false){
                $image = 'http://tushkan.net'.$item['asite'];
            }
            $name = CACHE_DIR.'/last_publ/'.$item['id'].'.jpg';
            if(!is_dir(CACHE_DIR.'/last_publ/')) {
                mkdir(CACHE_DIR.'/last_publ/', 0755);
            }
            /*echo '<div style="display:none;">';
            ob_start();
            $res = send_thumbnail($image,250,250);
            $content = ob_get_contents();
            echo '</div>';*/
            if ($res && (@$fp = fopen($name,'wb+'))) {
                fputs($fp,$content);
                fclose($fp);
            }
        }
    }
    
    protected function _renderHTML($last_publs){
        ob_start();
        ?>
            <? foreach($last_publs as $item){?>
            <div class="news-card">
                <a href="/publ/<? if($item['password'] != ""){ echo $item['password']."/";} ?><? echo $item['url'].'/'.$item['catID'].'-1-0-'.$item['id']; ?>">
                    <button>Читать подробнее</button>
                    <img src="<? echo file_exists(CACHE_DIR.'/last_publ_'.$item['id'].'.jpg') ? "/images_cached/last_publ_".$item['id'].".jpg" : $item['asite']; ?>" alt="<?php echo str_replace('"', "'", $item['title']); ?>" title="<?php echo str_replace('"', "'", $item['title']); ?>">
                    <p><?php echo str_replace('"', "'", $item['title']); ?></p>
                </a>
            </div>
            <? } ?>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}