<?php

class Model_StaticPages extends Zend_Db_Table_Abstract{

    protected $_name = 'static_pages';

    public function newPage($arr)
    {
        $db = new Model_StaticPages();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public static function getPageById($id){
        $db = new Model_StaticPages();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function updatePageData($page_id,$data){
        $db = new Model_StaticPages();
        $db->getAdapter()->update('static_pages',$data, ('static_pages.id = '.$page_id));
        return true;
    }

}