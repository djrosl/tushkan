<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 02.02.2015
 * Time: 11:50
 */

class Model_Admin_Users extends Source_Db_Table_Abstract
{
    protected $_name ='phpbb3_users';


    public static function authorized($result_authorized, $authAdapter)
    {
        if ($result_authorized) {
            $identity = $authAdapter->getResultRowObject();
            $authStorage = Zend_Auth::getInstance()->getStorage();
            $authStorage->write($identity);
            if (!self::isAdmin(Zend_Auth::getInstance()->getIdentity()->role) && !self::isManager(Zend_Auth::getInstance()->getIdentity()->role)) {
                if(!self::isUser(Zend_Auth::getInstance()->getIdentity()->role)){
                    Zend_Auth::getInstance()->clearIdentity();
                    return false;
                }
                return true;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public static function isAdmin($role){
        if($role != 5) {
            if (!self::isModer($role)) {
                return false;
            }
        }
        return true;
    }

    public static function isModer($role)
    {
        if($role != 8 && $role != 4){
            if(!self::isEditor($role)){
                return false;
            }
        }
        return true;
    }

    public static function isEditor($role)
    {
        if($role != 9)
            return false;
        return true;
    }


    public static function getAllUsers()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('phpbb3_users')
            ->joinLeft('phpbb3_groups', 'phpbb3_groups.group_id = phpbb3_users.group_id', array('role'=>'group_name'))->order('user_id ASC');
        return $select;
    }

    public static function getAllGruopUser()
    {
        $db = new Model_Admin_Users();
        $select = $db->getAdapter()->select()->from('phpbb3_groups');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getUserbyID($id)
    {
        $db = new Model_Admin_Users();
        $select = $db->getAdapter()->select()->from('phpbb3_users')
            ->joinLeft('phpbb3_groups', 'phpbb3_groups.group_id = phpbb3_users.group_id', array('role'=>'group_name'))
            ->joinLeft('phpbb3_profile_fields_data', 'phpbb3_profile_fields_data.user_id = phpbb3_users.user_id', array('full_name'=>'pf_real_name_n'))
            ->where('phpbb3_users.user_id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getUserbyLogin($login)
    {
        $db = new Model_Admin_Users();
        $select = $db->getAdapter()->select()->from('phpbb3_users')->where('username = ?', $login);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function editUser($id, $data)
    {
        $db = new Model_Admin_Users();
        $db->update($data, ('user_id = '.$id));
        return true;
    }

    public static function editUserFildData($id, $data)
    {
        $db = new Model_Admin_Users();
        $db->getAdapter()->update('phpbb3_profile_fields_data', $data, ('user_id = '.$id));
        return true;
    }

    public static function deleteUser($id)
    {
        $db = new Model_Admin_Users();
        $db->delete('user_id = '.$id);
        return true;
    }

    public static function getUserByGroup($id)
    {
        $db = new Model_Admin_Users();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('group_id = ?', $id)->limit(90000);
        return $db->getAdapter()->query($select)->fetchAll();
    }
}