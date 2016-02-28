<?php
/**
 * Created by FooLSoft.  http://foolsoft.ru
 * User: v
 * Date: 02.02.2015
 * Time: 13:55
 */

class Model_Admin_NewsTags extends Source_Db_Table_Abstract {

    protected  $_name = 'news_tags';

    public static function deleteTag($name, $type)
    {
        $db = new Model_Admin_NewsTags();
        $db->_delete($db->_name, ('name = "'.$name.'" AND type = "'.$type.'"'));
        return true;
    }

    public static function updateTag($name, $field, $value)
    {
        $db = new Model_Admin_NewsTags();
        $db->_update($db->_name, array($field => $value), ('name = "'.$name.'"'));
        return true;
    }

    public static function addTag($data)
    {
        $db = new Model_Admin_NewsTags();
        $id = $db->insert($data);
        return $id;
    }

    public static function findTag($name)
    {
        $db = new Model_Admin_NewsTags();
        $select = $db->getAdapter()->select()->from($db->_name)->where('name = ?', $name);
        if($o = $db->getAdapter()->query($select)->fetchObject()) {
            return $o;
        }
        return null;
    }
}