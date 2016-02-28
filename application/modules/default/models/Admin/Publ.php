<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 03.02.2015
 * Time: 10:06
 */

class Model_Admin_Publ extends Source_Db_Table_Abstract
{
    protected $_name = 'publ';


    public static function getAllPubl()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))->order('id DESC');
        return $select;
    }

    public static function getAllPublEditor($id)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))
            ->where('publ.uid = ?', $id);
        return $select;
    }

    public static function getPublbyId($id)
    {
        $db = new Model_Admin_Publ();
        $select = $db->getAdapter()->select()->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))
            ->where('publ.id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getCategories()
    {
        $db = new Model_Admin_News();
        $select = $db->_Select('pu_pu');
        return $db->_selectMore($select);
    }

    public static function addPubl($data)
    {
        $db = new Model_Admin_Publ();
        $id = $db->insert($data);
        return $id;
    }
    public static function editPubl($id, $data)
    {
        $db = new Model_Admin_Publ();
        $db->_update('publ', $data, ('id = '.$id));
        return true;
    }


    public static function delPubl($id)
    {
        $db = new Model_Admin_Publ();
        $db->delete(('id = '.$id));
        return true;
    }
}