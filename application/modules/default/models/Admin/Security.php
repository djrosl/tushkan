<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 06.04.2015
 * Time: 12:08
 */

class Model_Admin_Security extends Source_Db_Table_Abstract
{
    protected $_name = 'security_ip';

    public static function getAllIp()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('security_ip');
        return $select;
    }

    public static function getIp($id)
    {
        $db = new Model_Admin_Security();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getIpByIp($ip)
    {
        $db = new Model_Admin_Security();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('value = ?', $ip)->where('status = ?', '1');
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function editIp($id, $data)
    {
        $db = new Model_Admin_Security();
        $db->update($data, ('id = '.$id));
        return true;
    }

    public static function addIp( $data)
    {
        $db = new Model_Admin_Security();
        $db->insert($data);
        return true;
    }

    public static function deleteIp($id)
    {
        $db  = new Model_Admin_Security();
        $db->delete(('id = '.$id));
        return true;
    }

    public static function getAllIps()
    {
        $db = new Model_Admin_Security();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('status = ?', '1');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getipFourStar($ip)
    {
        $db = new Model_Admin_Security();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('value = ?', $ip.'*')->where('status = ?', '1')->orwhere('value = ?', $ip.'**')->where('status = ?', '1')->orwhere('value = ?', $ip.'***')->where('status = ?', '1');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function verifyIp($ip)
    {
        $ipu = self::getIpByIp($ip);
        if(FSDEBUG || $ipu->value == $ip){
            return true;
        }
        $expIp = explode('.', $ip);
        // 192.168.1.* ** ***
        $ipu2 = self::getipFourStar($expIp[0].'.'.$expIp[1].'.'.$expIp[2].'.');
        if(count($ipu2) != 0)
            return true;
        //
        return false;
    }
}