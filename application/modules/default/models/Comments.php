<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 21.01.15
 * Time: 11:13
 */
class Model_Comments extends Zend_Db_Table_Abstract{

    protected $_name = 'comments';
    protected $_name_spam = 'comments_spam';
    protected $_ids = array();

    public function newComment($arr)
    {
        $db = new Model_Comments();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public static function updateCommentAnswerCount($commentId, $moduleId, $action)
    {
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.commentID = ?', $commentId)->where($db->_name.'.moduleID = ?',$moduleId);
        $c = (array)$db->getAdapter()->query($select)->fetchObject();
        if($c) {
            $db->update(array('answerCount' => $c['answerCount'] + $action),
                ($db->_name.'.commentID = '.$commentId.' AND '.$db->_name.'.moduleID = '.$moduleId));
        }
    }

    public function getAllComments(){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from('comments');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getCommentById($commentID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from('comments')
            ->where('comments.commentID = ?',$commentID);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getCommentByIds($commentID,$moduleID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.commentID = ?',$commentID)
            ->where($db->_name.'.moduleID = ?',$moduleID);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function updateCommentRate($commentID,$moduleID,$data)
    {
        $db = new Model_Comments();
        $db->update($data, ($db->_name.'.commentID = '.$commentID.' AND '.$db->_name.'.moduleID = '.$moduleID));
        return true;
    }
    
    public static function getAllSubComments($materialID,$moduleID){
        $memcache = Zend_Registry::get("memcache");
        $key = 'subcomments_material_'.$materialID.'_module_'.$moduleID;
        if(($result = $memcache->get($key)) === false){
            $db = new Model_Comments();
            $select = $db->getAdapter()->select()
                ->from($db->_name)
                ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                ->where($db->_name.'.moduleID = ?',$moduleID)
                ->where($db->_name.'.parentID <> 0')
                ->where($db->_name.'.materialID = ?',$materialID)
                ->order('addTime ASC');
            $res = $db->getAdapter()->query($select)->fetchAll();
            //try { $memcache->set($key, $res, false, 3600); } catch($e) { }
        }else{
            $res = $result;
        }
        return $res;
        
    }
    
    public static function getSubCommentsByCommentId($comment_id){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.moduleID = 2')
            ->where($db->_name.'.parentID = ?',$comment_id)
            ->order('addTime DESC');
        $result = $db->getAdapter()->query($select)->fetchAll();
        if(!$result) return false; else return $result;
    }
    
    public static function getCommentsByMaterialID($materialID,$moduleID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.moduleID = ?',$moduleID)
            ->where($db->_name.'.materialID = ?',$materialID)
            ->order('addTime ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getCountCommentsByMaterialID($materialID,$moduleID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.moduleID = ?',$moduleID)
            ->where($db->_name.'.materialID = ?',$materialID)
            ->order('addTime ASC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return count($res);
        }else{
            return 0;
        }
    }
    
    public static function getCommentsIdsByMaterialID($materialID,$moduleID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.commentID','p.moduleID','p.materialID'))
            ->where('p.moduleID = ?',$moduleID)
            ->where('p.materialID = ?',$materialID)
            ->order('addTime ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getLastComments(){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->order('addTime DESC')
            ->limit(8);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function checkCommentIsSpam($user_ip,$moduleID,$commentID){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name_spam)
            ->where($db->_name_spam.'.moduleID = ?',$moduleID)
            ->where($db->_name_spam.'.user_ip = ?',$user_ip)
            ->where($db->_name_spam.'.commentID = ?',$commentID);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if($result) return true; else return false;
    }
    
    public function addSpamComment($arr)
    {
        $db = new Model_Comments();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_spam,$arr);
        return $last_inserted_id;
    }
    
    public function deleteSpamComment($user_ip,$moduleID,$commentID) {
        $db = new Model_Comments();
        $where = array(
            'user_ip = ?' => $user_ip,
            'moduleID = ?' => $moduleID,
            'commentID = ?' => $commentID
        );
        $db->getAdapter()->delete($db->_name_spam,$where);
    }
    
    public static function getCommentsByUserId($user_id){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.userID = ?',$user_id)
            ->order('addTime ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public function delCommentById($id)
    {
        $db = new Model_Comments();
        $db->delete('commentID = '.$id);
        return true;
    }
    
    public static function getNodeSubcomments($id){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()
            ->from($db->_name)
            ->where($db->_name.'.parentID = ?',$id);
        $comments = $db->getAdapter()->query($select)->fetchAll();
        if($comments){
            return $comments;
        }else{
            return false;
        }
    }
    
    public static function searchComments($text){
        $db = new Model_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.message LIKE ?', '%'.$text.'%');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function updateComment($commentID,$moduleID,$data)
    {
        $db = new Model_Comments();
        $db->update($data, ($db->_name.'.commentID = '.$commentID.' AND '.$db->_name.'.moduleID = '.$moduleID));
        return true;
    }

}