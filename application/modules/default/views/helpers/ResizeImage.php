<?php
class Zend_View_Helper_ResizeImage extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function resizeImage($old,$new,$new_w,$new_h){
        include(APPLICATION_PATH.'/../tushkan.net/img_resize.php');
        define('USE_RESAMPLE',true);
        ob_start();
        $res = send_thumbnail($old,$new_w,$new_h);
        $content = ob_get_contents();
        ob_end_clean();
        if ($res && (@$fp = fopen($new,'wb+')))
        {
            fputs($fp,$content);
            fclose($fp);
        }
        return true;
    }
    
}