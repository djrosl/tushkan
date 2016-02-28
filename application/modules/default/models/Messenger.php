<?php

class Model_Messenger extends Zend_Db_Table_Abstract{

    protected $_name = 'phpbb3_privmsgs';
    protected $_name_to = 'phpbb3_privmsgs_to';
    
    public function newMessage($arr)
    {
        $db = new Model_Messenger();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public function newMessageDataTo($arr)
    {
        $db = new Model_Messenger();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_to,$arr);
        return $last_inserted_id;
    }
    
    public static function getAllMessages(){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getMessageById($id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.id = ?',$id)
            ->joinLeft('phpbb3_users','phpbb3_users.user_id = chat.user_id', array('username'));
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function deleteMessage($id)
    {
        $db = new Model_Messenger();
        $db->getAdapter()->delete($db->_name, ($db->_name.'.id = '.$id));
        return true;
    }
    
    public static function getIncomingMessages($user_id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name_to)
            ->joinLeft('phpbb3_privmsgs','phpbb3_privmsgs_to.msg_id = phpbb3_privmsgs.msg_id')
            ->where('phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id <> ".$user_id)
            ->order('message_time DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getIncomingMessagesUnread($user_id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name_to)
            ->joinLeft('phpbb3_privmsgs','phpbb3_privmsgs_to.msg_id = phpbb3_privmsgs.msg_id')
            ->where('phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id <> ".$user_id)
            ->where('phpbb3_privmsgs_to.pm_unread = 1')
            ->order('message_time DESC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getOutgoingMessages($user_id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name_to)
            ->joinLeft('phpbb3_privmsgs','phpbb3_privmsgs_to.msg_id = phpbb3_privmsgs.msg_id')
            ->where('phpbb3_privmsgs_to.user_id <> '.$user_id." AND phpbb3_privmsgs_to.author_id = ".$user_id)
            ->order('message_time DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getOneIncomingMessage($user_id,$message_id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name_to)
            ->joinLeft('phpbb3_privmsgs','phpbb3_privmsgs_to.msg_id = phpbb3_privmsgs.msg_id')
            ->where('phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id <> ".$user_id)
            ->where('phpbb3_privmsgs_to.msg_id = ?', $message_id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getOneOutgoingMessage($user_id,$message_id){
        $db = new Model_Messenger();
        $select = $db->getAdapter()->select()->from($db->_name_to)
            ->joinLeft('phpbb3_privmsgs','phpbb3_privmsgs_to.msg_id = phpbb3_privmsgs.msg_id')
            ->where('phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id = ".$user_id)
            ->where('phpbb3_privmsgs_to.msg_id = ?', $message_id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function deleteIncomingMessage($user_id,$message_id)
    {
        $db = new Model_Messenger();
        $db->getAdapter()->delete($db->_name_to, ('phpbb3_privmsgs_to.msg_id='.$message_id.' AND phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id <> ".$user_id));
        return true;
    }
    
    public static function deleteOutgoingMessage($user_id,$message_id)
    {
        $db = new Model_Messenger();
        $db->getAdapter()->delete($db->_name_to, ('phpbb3_privmsgs_to.msg_id='.$message_id.' AND phpbb3_privmsgs_to.user_id = '.$user_id." AND phpbb3_privmsgs_to.author_id = ".$user_id));
        return true;
    }
    
    public static function viewMessage($message_id)
    {
        $db = new Model_Messenger();
        $data = array("pm_new" => 0, "pm_unread" => 0);
        $res = $db->getAdapter()->update('phpbb3_privmsgs_to',$data, ('phpbb3_privmsgs_to.msg_id = '.$message_id));
        return true;
    }

}