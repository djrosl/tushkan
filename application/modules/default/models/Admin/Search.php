<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 09.02.2015
 * Time: 12:25
 */

class Model_Admin_Search extends  Source_Db_Table_Abstract
{


    public static function searchNews($text, $type = 0)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('news')
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'));

        if($type == 0){
            $select->orWhere('news.title LIKE ?', '%'.$text.'%')
                    ->orWhere('news.message LIKE ?', '%'.$text.'%')
                    ->orWhere('news.author LIKE ?', '%'.$text.'%');
        }elseif($type == 1){
            $select->Where('news.title LIKE ?', '%'.$text.'%');
        }elseif($type == 2){
            $select->Where('news.message LIKE ?', '%'.$text.'%');
        }elseif($type == 3){
            $select->Where('news.author LIKE ?', '%'.$text.'%');
        }elseif($type == 4){
            $select->Where('news.hide_on_site = 1');
        }
        //-------------------------------------------------
        $select->group('news.id')->order('id DESC');
        $z=serialize($select);
        
        file_put_contents('/var/www/user/data/www/logz.txt',$z,FILE_APPEND);
        return $select;
    }

    public static function searchPubl($text, $type = 0)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'));
        if($type == 0) {
            $select->orWhere('publ.title LIKE ?', '%' . $text . '%')
                ->orWhere('publ.message LIKE ?', '%' . $text . '%')
                ->orWhere('publ.user LIKE ?', '%' . $text . '%')
                ->orWhere('publ.brief LIKE ?', '%' . $text . '%');
        }elseif($type == 1){
            $select->Where('publ.title LIKE ?', '%' . $text . '%');
        }elseif($type == 2){
            $select->Where('publ.brief LIKE ?', '%' . $text . '%');
        }elseif($type == 3){
            $select->Where('publ.message LIKE ?', '%' . $text . '%');
        }elseif($type == 4){
            $select->Where('publ.user LIKE ?', '%' . $text . '%');
        }

            $select->group('publ.id')->order('id DESC');
        return $select;
    }

    public static function searchComments($text, $type = 0)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('comments')->order('commentID DESC')
            ->joinLeft('news', 'news.id = comments.materialID ', array('news_url'=>'sbscr','news_time'=>'addtime'))
            ->joinLeft('publ', 'publ.id = comments.materialID ', array('publ_catID'=>'catID', 'publ_url'=>'url','publ_time'=>'addtime'))
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID ', array('publ_password'=>'password'));
            if($type == 0){
                $select->orWhere('comments.user LIKE ?', '%'.$text.'%')
                    ->orWhere('comments.name LIKE ?', '%'.$text.'%')
                    ->orWhere('comments.message LIKE ?', '%'.$text.'%')
                    ->orWhere('comments.ip LIKE ?', '%'.$text.'%');
            }elseif($type == 1){
                $select->Where('comments.user LIKE ?', '%'.$text.'%');
            }elseif($type == 2){
                $select->Where('comments.name LIKE ?', '%'.$text.'%');
            }elseif($type == 3){
                $select->Where('comments.message LIKE ?', '%'.$text.'%');
            }elseif($type == 4){
                $select->Where('comments.ip LIKE ?', '%'.$text.'%');
            }

        $select->group('comments.commentID')->order('commentID DESC');

        return $select;
    }

    public static function searchComments2($text, $type = 0)
    {
        $db = new Model_Admin_Comments();
        $select = $db->getAdapter()->select()->from('comments', array('cid'=>'commentID'));
        if($type == 0){
            $select->orWhere('comments.user LIKE ?', '%'.$text.'%')
                ->orWhere('comments.name LIKE ?', '%'.$text.'%')
                ->orWhere('comments.message LIKE ?', '%'.$text.'%')
                ->orWhere('comments.ip LIKE ?', '%'.$text.'%');
        }elseif($type == 1){
            $select->Where('comments.user LIKE ?', '%'.$text.'%');
        }elseif($type == 2){
            $select->Where('comments.name LIKE ?', '%'.$text.'%');
        }elseif($type == 3){
            $select->Where('comments.message LIKE ?', '%'.$text.'%');
        }elseif($type == 4){
            $select->Where('comments.ip LIKE ?', '%'.$text.'%');
        }


        $select->group('comments.commentID')->order('commentID DESC');

        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function searchUsers($text, $role = 5, $type = 0)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('phpbb3_users')
            ->joinLeft('phpbb3_groups', 'phpbb3_groups.group_id = phpbb3_users.group_id', array('role'=>'group_name'));
        if($role) {
            if($type == 0){
                $select->orWhere('phpbb3_users.username LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role)
                    ->orWhere('phpbb3_users.username_clean LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role)
                    ->orWhere('phpbb3_users.user_email LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role)
                    ->orWhere('phpbb3_users.user_ip LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role);
            }elseif($type == 1){//Login
                $select->Where('phpbb3_users.username LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role);
            }elseif($type == 2){//Name
                $select->Where('phpbb3_users.username_clean LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role);
            }elseif($type == 3){//Email
                $select->Where('phpbb3_users.user_email LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role);
            }elseif($type == 4){//Ip
                $select->Where('phpbb3_users.user_ip LIKE ?', '%' . $text . '%')->where('phpbb3_users.group_id = ?', $role);
            }
        }else{
            if($type == 0) {
                $select->orWhere('phpbb3_users.username LIKE ?', '%' . $text . '%')
                    ->orWhere('phpbb3_users.username_clean LIKE ?', '%' . $text . '%')
                    ->orWhere('phpbb3_users.user_email LIKE ?', '%' . $text . '%')
                    ->orWhere('phpbb3_users.user_ip LIKE ?', '%' . $text . '%');
            }elseif($type == 1){//Login
                $select->Where('phpbb3_users.username LIKE ?', '%' . $text . '%');
            }elseif($type == 2){//Name
                $select->Where('phpbb3_users.username_clean LIKE ?', '%' . $text . '%');
            }elseif($type == 3){//Email
                $select->Where('phpbb3_users.user_email LIKE ?', '%' . $text . '%');
            }elseif($type == 4){//Ip
                $select->Where('phpbb3_users.user_ip LIKE ?', '%' . $text . '%');
            }
        }
        $select->group('phpbb3_users.user_id')->order('user_id DESC');
        return $select;
    }
}