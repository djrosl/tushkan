<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 13.02.2015
 * Time: 11:32
 */

class Model_Admin_Settings extends  Source_Db_Table_Abstract
{
    protected $_name = 'settings';

    public static function getAllSettings()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('settings');
        return $select;
    }

    public static function getSett($id)
    {
        $db = new Model_Admin_Settings();
        $select = $db->getAdapter()->select()->from('settings')
            ->where('id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function newField($data)
    {
        $db = new Model_Admin_Settings();
        $db->insert($data);
        return true;
    }

    public static function editField($id, $data)
    {
        $db = new Model_Admin_Settings();
        $db->update($data, ('id = '.$id));
        return true;
    }

    public static function deleteField($id)
    {
        $db = new Model_Admin_Settings();
        $db->delete(('id = '.$id));
        return true;
    }
}