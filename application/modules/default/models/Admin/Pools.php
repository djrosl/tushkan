<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 10.02.2015
 * Time: 10:40
 */

class Model_Admin_Pools extends  Source_Db_Table_Abstract
{
    protected $_name = 'po_po';

    public static function getAllPools()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('po_po');
        return $select;
    }

    public static function getAllPool($id)
    {
        $db = new Model_Admin_Pools();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('po_po.1 = ?', $id);
        return (array)$db->getAdapter()->query($select)->fetchObject();
    }

    public static function delPool($id)
    {
        $db = new Model_Admin_Pools();
        $db->delete(('po_po.1 = '.$id));
        return true;
    }

    public static function newPool($data)
    {
        $db = new Model_Admin_Pools();
        $db->insert($data);
        return true;
    }
    public static function editPool($id , $data)
    {
        $db = new Model_Admin_Pools();
        $db->update($data, ('po_po.1 = '.$id));
        return true;
    }


}