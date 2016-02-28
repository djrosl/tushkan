<?php
class CronController extends Zend_Controller_Action
{
    public function checkbannedAction(){
        $this->view->layout()->disableLayout();
        $banned_list = Model_User::getAllBannedUsersByTime();
        if($banned_list != false){
            $date_now = time();
            foreach($banned_list as $banned_user){
                if($banned_user['ban_end'] < $date_now){
                    Model_User::updateUserData($banned_user['ban_userid'],array("group_id" => $banned_user['old_group_id']));
                    Model_User::removeUserFromBanlist($banned_user['ban_userid']);
                }
            }
        }
    }
    
    public function sitemapAction(){
        $this->view->layout()->disableLayout();
        include_once("sitemap.php");
    }
    
    public function rssAction(){
        $this->view->layout()->disableLayout();
        include_once("rss.php");
    }
    
    public function mapsiteAction(){
        $this->view->layout()->disableLayout();
        include_once("sitemap.php");
    }
    
}
