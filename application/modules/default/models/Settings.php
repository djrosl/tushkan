<?php

class Model_Settings extends Zend_Db_Table_Abstract{

    protected $_name = 'settings';
    
    public static function getAllSettings(){
        $db = new Model_Settings();
        $select = $db->getAdapter()->select()->from($db->_name);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getSettingsById($id){
        $db = new Model_Settings();
        $select = $db->getAdapter()->select()->from($db->_name)->where($db->_name.'.id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getParamSettingsByKey($key){
        $db = new Model_Settings();
        $select = $db->getAdapter()->select()->from($db->_name)->where($db->_name.'.key = ?',$key);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public function getSettingsByKey($key = "top_film") {
        $arrToShow = array();
        $arr_films_ids = array();
        $countRecordsToShow = 7;

        $db = new Model_Settings();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.key = ?',$key)
            ->limit(1);
        $tmp = $db->getAdapter()->query($select)->fetchObject();
        $res = (array) $tmp;
        $arr_films_ids = explode(",",$res['value']);
        
        shuffle($arr_films_ids);
        //$countRecordsToShow = count($arr_films_ids);
        
        for ($i = 0; $i < count($arr_films_ids); $i++) {
            if ($countRecordsToShow == 0) {
                break;
            }
            array_push($arrToShow, $arr_films_ids[$i]);
            $countRecordsToShow--;
        }
        
        return $arrToShow;
    }
    

}