<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 02.02.2015
 * Time: 13:55
 */

class Model_Admin_News extends Source_Db_Table_Abstract{

    protected  $_name = 'news';

    public static function deleteEmptyKey($array)
    {
        foreach ($array as $key => $value) {
            if (empty($value) && !is_numeric($value))
                unset($array[$key]);
        }
        return $array;
    }

    public static function getAllNews($hiddenOnly = 0)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('news')
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'))
            ->where('news.hide_on_site IN(?)', $hiddenOnly  == 1 ? '0' : '0,1')
            ->order('id DESC');
        return $select;
    }

    public static function getAllNewsByEditorId($id)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('news')
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'))->order('id DESC')
            ->where('news.other6 = ?', $id);
        return $select;
    }

    public static function getNewsById($id)
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'))
            ->where('news.id = ?', $id)
            ->order('id DESC');
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getCategories()
    {
        $db = new Model_Admin_News();
        $select = $db->_Select('nw_nw');
        return $db->_selectMore($select);
    }

    public static function addNews($data)
    {
        $db = new Model_Admin_News();
        $id = $db->insert($data);
        return $id;
    }

    public static function editNews($id , $data){

        $db = new Model_Admin_News();
        $db->_update('news', $data, ('id = '.$id));
        return true;
    }

    public static function deleteNews($id)
    {
        $db = new Model_Admin_News();
        $db->_delete($db->_name, ('id = '.$id));
        return true;
    }
}