<?php
class Zend_View_Helper_CutTitle extends Zend_View_Helper_Abstract
{
    protected $_view;
    
    public function cutTitle($title){
        mb_internal_encoding("UTF-8");
        $len = mb_strlen($title,'UTF-8');
        $pos_1 = mb_strpos($title,")");
        $part_1 = mb_substr($title,0,$pos_1 + 1,'UTF-8');
        $part_2 = mb_substr($title,$pos_1 + 1,$len,'UTF-8');
        //$pos_2 = mb_strpos($part_2,"серия");
        $matches = array();
        $pos_2 = preg_match('/([\d,\-\s]+|\d+|все)\s+(сери(я|и)|выпуск)/i', $part_2, $matches);
        if(!$pos_2){
            return $part_1; //.(FSDEBUG ? '!'.$part_2 : '');
        }else{
            //$pos_3 = mb_strpos($part_2,")");
            //$part_2_1 = mb_substr($part_2, $pos_2 + 1,$pos_3,'UTF-8');
            //$len2 = mb_strlen($part_2_1);
            //$part_3 = mb_substr($part_2_1,0,$len2-1,'UTF-8');
            return $part_1.' '.$matches[0];
        }
    }

}