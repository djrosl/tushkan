<?php
class Zend_View_Helper_ChangeSmiles extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function changeSmiles($text){
        $smiles = array(">(", ":D", "B)", ":'(", ">_>", "^_^", ":(", ":)", ":o", ":p", "%)", ";)");
        $smiles_change = array("angry", "biggrin", "cool", "cry", "dry", "happy", "sad", "smile", "surprised", "tongue", "wacko", "wink");
        foreach($smiles as $key=>$smile){
            $text = str_replace($smile, '<img src="/sml/'.$smiles_change[$key].'.gif" />', $text);
        }
        return $text;
    }

}