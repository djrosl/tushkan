<?php
class Model_User extends Zend_Db_Table_Abstract{

    protected $_name = 'phpbb3_users';
    protected $_name_posts = 'phpbb3_posts';
    protected $_name_repute = 'repute';
    protected $_name_repute_hide_u = 'repute_hide_users';
    protected $_name_awards = 'awards';
    protected $_name_remarks = 'remarks';
    protected $_name_remarks_history = 'remarks_history';
    protected $_name_banlist = 'site_banlist';
    protected $_name_sess = 'phpbb3_sessions';
    protected $_name_chat_refresh = 'chat_refresh';
        
    public static function getUserById($id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('phpbb3_groups','phpbb3_groups.group_id = phpbb3_users.group_id', array('group_name'))
            ->joinLeft('phpbb3_profile_fields_data','phpbb3_profile_fields_data.user_id = phpbb3_users.user_id', array('pf_real_name_n'))
            ->joinLeft('remarks','remarks.user_id = phpbb3_users.user_id', array('remark'))
            ->joinLeft('chat_refresh','chat_refresh.user_id = phpbb3_users.user_id', array('refresh_time'))
            ->where('phpbb3_users.user_id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getUsersByIds($ids){
error_reporting(0);
        $db = new Model_User();
ini_set('display_errors',0);
        $select = $db->getAdapter()->select()->from($db->_name);
error_reporting(0);

        foreach($ids as $id){
            if($first == true){
                $select->Orwhere('phpbb3_users.user_id = ?',$id);
            }else{
                $select->where('phpbb3_users.user_id = ?',$id);
                $first = true;
            }
        }
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }

    public static function getCountFilmoteka($userId, $filmotekaType) {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()->from('filmoteka', array("c" => "COUNT(id_film)"))
            ->where('id_user = ?', $userId)
            ->where('type = ?', $filmotekaType);
        $checkrequest = $db->fetchRow($select);
        return $checkrequest["c"];
    }

    public static function getUserByLogin($login){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('phpbb3_groups','phpbb3_groups.group_id = phpbb3_users.group_id', array('group_name'))
            ->joinLeft('phpbb3_profile_fields_data','phpbb3_profile_fields_data.user_id = phpbb3_users.user_id', array('pf_real_name_n'))
            ->where('phpbb3_users.username_clean = ?',$login);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    function checkUnique($val,$field = 'login'){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name)->where($field.'=?',$val);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if(!$result){
            return true; // object not found
        }
        return false;
    }
    
    public static function updateUserData($user_id,$data){
        $db = new Model_User();
        $db->update($data, ($db->_name.'.user_id = '.$user_id));
        return true;
    }
    
    public static function updateUserProfileData($user_id,$data){
        $db = new Model_User();
        $db->getAdapter()->update('phpbb3_profile_fields_data',$data, ('phpbb3_profile_fields_data.user_id = '.$user_id));
        return true;
    }
    
    public static function addUserProfileData($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert('phpbb3_profile_fields_data',$arr);
        return $last_inserted_id;
    }
    
    public static function getCountUserPostsByUserId($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_posts)
            ->where($db->_name_posts.'.poster_id = ?',$user_id);
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return count($res);
        }else{
            return false;
        }
    }
    
    public static function getReputeById($id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_repute)
            ->joinLeft('phpbb3_users','repute.id_to = phpbb3_users.user_id', array('user_rating_positive','user_rating_negative'))
            ->where($db->_name_repute.'.id = ?',$id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getReputeByUserId($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_repute)
            ->joinLeft('phpbb3_users','repute.id_from = phpbb3_users.user_id', array('username'))
            ->where($db->_name_repute.'.id_to = ?',$user_id)
            ->order('addtime DESC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function addRepute($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_repute,$arr);
        return $last_inserted_id;
    }
    
    public static function addUserReputeToHideList($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_repute_hide_u,$arr);
        return $last_inserted_id;
    }
    
    public static function removeUserReputeFromHideList($user_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_repute_hide_u, ($db->_name_repute_hide_u.'.user_id = '.$user_id));
        return true;
    }
    
    public static function checkUserReputeIsHide($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_repute_hide_u)
            ->where($db->_name_repute_hide_u.'.user_id = ?',$user_id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return true;
        }else{
            return false;
        }
    }
    
    public static function removeReputesByUserId($user_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_repute, ($db->_name_repute.'.id_to = '.$user_id));
        return true;
    }
    
    public static function getAllAwardsByUserId($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_awards)
            ->where($db->_name_awards.'.id_to = ?',$user_id)
            ->order('award ASC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getSomeAwards($user_id,$award){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_awards)
            ->joinLeft('phpbb3_users','awards.id_from = phpbb3_users.user_id', array('username','group_id'))
            ->joinLeft('phpbb3_groups','phpbb3_groups.group_id = phpbb3_users.group_id', array('group_name'))
            ->where($db->_name_awards.'.id_to = ?',$user_id)
            ->where($db->_name_awards.'.award = ?',$award)
            ->order('addtime DESC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function addAward($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_awards,$arr);
        return $last_inserted_id;
    }
    
    public static function addRemark($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_remarks,$arr);
        return $last_inserted_id;
    }
    
    public static function addRemarkMessage($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_remarks_history,$arr);
        return $last_inserted_id;
    }
    
    public static function getRemarkByUserId($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_remarks)
            ->where($db->_name_remarks.'.user_id = ?',$user_id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function updateUserRemark($user_id,$data){
        $db = new Model_User();
        $db->getAdapter()->update('remarks',$data, ('remarks.user_id = '.$user_id));
        return true;
    }
    
    public static function getRemarksHistoryByUserId($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_remarks_history)
            ->joinLeft('phpbb3_users','remarks_history.from_id = phpbb3_users.user_id', array('username'))
            ->where($db->_name_remarks_history.'.user_id = ?',$user_id)
            ->order('addtime DESC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function addUserToBanlist($arr){
        $db = new Model_User();
        $last_inserted_id = $db->getAdapter()->insert($db->_name_banlist,$arr);
        return $last_inserted_id;
    }
    
    public static function removeUserFromBanlist($user_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_banlist, ($db->_name_banlist.'.ban_userid = '.$user_id));
        return true;
    }
    
    public static function getAllBannedUsersByTime(){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_banlist)
            ->where($db->_name_banlist.'.ban_end <> 0');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getBannedUserById($user_id){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name_banlist)
            ->where($db->_name_banlist.'.ban_userid = ?',$user_id)
            ->limit(1);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function updateUserRepute($repute_id,$data){
        $db = new Model_User();
        $db->getAdapter()->update('repute',$data, ('repute.id = '.$repute_id));
        return true;
    }
    
    public static function updateUserAward($award_id,$data){
        $db = new Model_User();
        $db->getAdapter()->update('awards',$data, ('awards.id = '.$award_id));
        return true;
    }
    
    public static function updateUserRemarkMsg($remark_id,$data){
        $db = new Model_User();
        $db->getAdapter()->update('remarks_history',$data, ('remarks_history.id = '.$remark_id));
        return true;
    }
    
    public static function deleteReputeById($repute_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_repute, ($db->_name_repute.'.id = '.$repute_id));
        return true;
    }
    
    public static function deleteAwardById($award_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_awards, ($db->_name_awards.'.id = '.$award_id));
        return true;
    }
    
    public static function deleteRemarkMsgById($remark_id){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_remarks_history, ($db->_name_remarks_history.'.id = '.$remark_id));
        return true;
    }
    
    public static function getUsersByParam($text){
        $db = new Model_User();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('phpbb3_users.user_avatar LIKE ?', '%'.$text.'%');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getTotal() {
        $db = Zend_Db_Table::getDefaultAdapter();
        $query = $db->query('SELECT COUNT(*) as c FROM `phpbb3_users`');
        $results = $query->fetchObject();
        return !$results ? 0 : $results->c;
    }
    
    public static function cleanStat($guest_id = 900018){
        $db = new Model_User();
        $db->getAdapter()->delete($db->_name_sess, ($db->_name_sess.'.session_user_id = '.$guest_id));
        return true;
    }
    
}