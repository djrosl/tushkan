<?php
class Model_Rating extends Zend_Db_Table_Abstract{

    protected $_name = 'rating_guests';
    protected $_name_users = 'rating_users';

    public function newRating($arr)
    {
        $db = new Model_Rating();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public function checkMaterialByIp($module_id,$material_id,$ip){
        $db = new Model_Rating();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('moduleID = ?',$module_id)
            ->where('materialID = ?',$material_id)
            ->where('user_ip = ?',$ip);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if($result) return true; else return false;
    }

}