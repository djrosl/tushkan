<?php

class Model_Banners extends Zend_Db_Table_Abstract{

    protected $_name = 'banners';
    
    public static function getAllBanners(){
        $db = new Model_Banners();
        $select = $db->getAdapter()->select()->from($db->_name);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getBannerById($id){
        $db = new Model_Banners();
        $select = $db->getAdapter()->select()->from($db->_name)->where($db->_name.'.id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public function getBannerByCat($category) {
        $status = "active";
        $arrIds = array();
        $arrToShow = array();
        $arr_banners = array();
        $countRecordsToShow = 1;

        $db = new Model_Banners();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.category = ?',$category)
            ->where($db->_name.'.status = ?',$status);
        $res = $db->getAdapter()->query($select)->fetchAll();

        foreach ($res as $t) {
            for($k=0; $k < $t['priority']; $k++){
                array_push($arr_banners, $t);
            }
        }
        //var_dump($arr_banners);die;
        foreach ($arr_banners as $item) {
            array_push($arrIds, $item['id']);
        }

        shuffle($arrIds);

        for ($i = 0; $i < count($arrIds); $i++) {
            if ($countRecordsToShow == 0) {
                break;
            }
            foreach ($arr_banners as $t) {
                if ($arrIds[$i] == $t['id']) {
                    array_push($arrToShow, $t);
                }
            }
            $countRecordsToShow--;
        }
        return $arrToShow[0];
    }

}