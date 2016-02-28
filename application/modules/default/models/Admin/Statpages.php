<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 04.02.2015
 * Time: 16:06
 */

class Model_Admin_Statpages extends Source_Db_Table_Abstract
{
    protected $_name = 'static_pages';

    public static function getAllStatPages()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('static_pages');
            //->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))->order('id DESC');
        return $select;
    }

    public static function getStatPage($id)
    {
        $db = new Model_Admin_Statpages();
        $select = $db->getAdapter()->select()->from('static_pages');
        $select->where('id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function newPage($data)
    {
        $db = new Model_Admin_Statpages();
        $id = $db->insert($data);
        return $id;
    }

    public static function editPage($id, $data)
    {
        $db = new Model_Admin_Statpages();
        $db->update($data, ('id = '.$id));
        return true;
    }

    public static function deletePage($id)
    {
        $db = new Model_Admin_Statpages();
        $db->delete(('id = '.$id));
        return true;
    }
}