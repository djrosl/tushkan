<?php
class Zend_View_Helper_CutTitle2 extends Zend_View_Helper_Abstract
{
    protected $_view;
    
    public function cutTitle2($title){
        mb_internal_encoding("UTF-8");
        $len = mb_strlen($title,'UTF-8');
        $pos_1 = mb_strpos($title,")");
        $part_1 = mb_substr($title,0,$pos_1 + 1,'UTF-8');
        return $part_1;
    }

}