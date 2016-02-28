<?php

class Model_Chat extends Zend_Db_Table_Abstract{

    protected $_name = 'chat';
    protected $_name_refresh = 'chat_refresh';
    protected $_name_smiles = 'sml';
    
    public function newMessage($arr)
    {
        $db = new Model_Chat();
        $last_inserted_id = $db->insert($arr);
       $memcache = Zend_Registry::get("memcache");
        $memcache->delete('mini_chat');
        return $last_inserted_id;
    }
    
    public static function getAllMessages(){
        $db = new Model_Chat();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('phpbb3_users','phpbb3_users.user_id = chat.user_id', array('username'))
            ->order('addtime DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getMessageById($id){
        $db = new Model_Chat();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.id = ?',$id)
            ->joinLeft('phpbb3_users','phpbb3_users.user_id = chat.user_id', array('username'));
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getLastMessages(){
        $memcache = Zend_Registry::get("memcache");
        $key = 'mini_chat';
        if(CHAT_CACHE_OFF || ($result = $memcache->get($key)) === false ){
            $count = 40;
            $db = new Model_Chat();
            $select = $db->getAdapter()->select()->from($db->_name)
                ->joinLeft('phpbb3_users','phpbb3_users.user_id = chat.user_id', array('username'))
                ->order('addtime DESC')
                ->limit($count);
            $res = $db->getAdapter()->query($select)->fetchAll();
            $memcache->set($key, $res, false, 0);
        } else {
            $res = $result;
        }
        return $res;
    }
    
    public static function updateMessage($message_id,$data)
    {
        $db = new Model_Chat();
        $db->update($data, ($db->_name.'.id = '.$message_id));
        $memcache = Zend_Registry::get("memcache");
        $memcache->delete('mini_chat');
        return true;
    }
    
    public static function deleteMessage($id)
    {
        $db = new Model_Chat();
        $db->getAdapter()->delete($db->_name, ($db->_name.'.id = '.$id));
       $memcache = Zend_Registry::get("memcache");
        $memcache->delete('mini_chat');
        return true;
    }
    
    public function newRefreshTime($arr)
    {
        $db = new Model_Chat();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_refresh,$arr);
        return $last_inserted_id;
    }
    
    public static function getRefreshTimeById($user_id){
        $db = new Model_Chat();
        $select = $db->getAdapter()->select()->from($db->_name_refresh)
            ->where($db->_name_refresh.'.user_id = ?',$user_id)
            ->limit(1);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function updateRefreshTimeById($user_id,$data){
        $db = new Model_Chat();
        $db->getAdapter()->update($db->_name_refresh,$data, ($db->_name_refresh.'.user_id = '.$user_id));
        return true;
    }
    
    public static function getAllSmiles(){
        $db = new Model_Chat();
        $select = $db->getAdapter()->select()->from($db->_name_smiles);
        return $db->getAdapter()->query($select)->fetchAll();
    }

}