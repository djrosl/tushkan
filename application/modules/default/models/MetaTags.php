<?php

class Model_MetaTags extends Zend_Db_Table_Abstract{

    protected $_name = 'meta_tags';

    public function newMetaTag($arr)
    {
        $db = new Model_MetaTags();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public static function getMetaTagsByLocation($location_name){
        $db = new Model_MetaTags();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('location = ?',$location_name)
            ->order('name ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }

}