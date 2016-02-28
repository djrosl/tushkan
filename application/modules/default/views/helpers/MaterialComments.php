<?php
class Zend_View_Helper_MaterialComments extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function materialComments($comments,$material_id,$module_id,$comments_keys,$page_number){
        $memcache = Zend_Registry::get("memcache");
        $user_online = Zend_Registry::get("user");
        $user_id = $user_online->data['user_id'];
        $role = 'guest';
        if($user_online->data['is_registered']){
            $role = GetRole($user_online->data['group_id']);
        }
        $key = 'comments_'.$user_id.'_'.$material_id.'_'.$module_id.'_'.$page_number.'_'.$role;
        if(($result = $memcache->get($key)) !== false){
            return $result;
        }
        $html = $this->_renderHTML($comments,$material_id,$module_id,$role,$user_id,$comments_keys,$page_number);
        $memcache->set($key, $html, false, 1800);
        return $html;
    }
    
    protected function _renderHTML($comments,$material_id,$module_id,$role,$user_id,$comments_keys,$page_number){
        ob_start();
        ?>
        <div id="allEntries">
        <?php if(count($comments) > 0 ) {
           foreach($comments as $comment){
                $subcomments = $comment['answerCount'] > 0
                    ? $this->view->commentsSubTree($comment['commentID'],$material_id,$module_id,$role,$user_id,$comments_keys)
                    : '';
        ?>
        <div class="comEnt report-spam-target<? // if($this->comments_keys[$comment['commentID']]['spam'] == true){echo " report-spam-hidden";}?>" id="comEnt<? echo $comment['commentID'];?>" comment_id="<? echo $comment['commentID'];?>">
        <table itemtype="http://schema.org/UserComments" itemscope border="0" cellpadding="0" cellspacing="0" width="100%" class="cBlock1">
        <tbody>
        <tr>
        <td style="padding:3px;">
        <div style="float:right;font-size:11px;font-family:Arial,sans-serif;">
        <span id="report-spam-wrap-<? echo $comment['commentID'];?>" class="report-spam-wrap">
        <?php
        if($role == 'admin' || ($comment['userID'] == $user_id && $role != 'banned')){
            echo '<a class="editcomment" comment_id="'.$comment['commentID'].'" style="cursor:pointer;color:red;float:left;" title="Редактировать"><span class="editcomment_img"></span></a>';
        }
        if($role == 'admin' || ($role == 'certified' && $comment['userID'] == $user_id)){
            echo '<a class="deletecomment" comment_id="'.$comment['commentID'].'" style="cursor:pointer;color:red;float:left;">Удалить</a>';
        }
        ?>
        </span>
        <span class="ratio<?php if($comment['rate'] != 0) { echo $comment['rate'] > 0 ? ' myWinSuccess' : ' myWinError'; } else echo '" style="color:gray'; ?>">
            <b><? if($comment['rate'] > 0){ echo "+";} echo $comment['rate'];?></b>
        </span>
        <? if($role != 'guest'){ ?>
        <span class="finger_up_green comment_rate" rate="up" comment_id="<? echo $comment['commentID'];?>" module_id="<? echo $module_id; ?>" title="Хороший пост" style="cursor: pointer;"></span>
        <span class="finger_down_green comment_rate" rate="down" comment_id="<? echo $comment['commentID'];?>" module_id="<? echo $module_id; ?>" title="Плохой пост" style="cursor: pointer;" ></span>
        <?}else{?>
        <span class="finger_up_white" title="Хороший пост"></span>
        <span class="finger_down_white" title="Плохой пост"></span>
        <?}?>
        </div>
        <div class="cTop" style="text-align:left;">
        <a href="#ent<? echo $comment['commentID'];?>" name="ent<? echo $comment['commentID'];?>">
        <b><? echo $comments_keys[$comment['commentID']]; ?></b>
        </a>
        <a href="javascript://" class="open_user_page" user_id="<? echo $comment['userID']; ?>" rel="nofollow" >
        <b itemprop="name"><? echo $comment['username']; ?></b>
        </a> &nbsp;<span style="font-size:7pt;unicode-bidi:embed;">(<span class="cdt"><?
            $date_now = time();
            $date_time_array = getdate($date_now);
            $month = $date_time_array['mon'];
            $day = $date_time_array['mday'];
            $year = $date_time_array['year'];
            $date_time_array = getdate($comment['addTime']);
            $month_2 = $date_time_array['mon'];
            $day_2 = $date_time_array['mday'];
            $year_2 = $date_time_array['year'];
            $date_1 = mktime(0,0,0,$month,$day,$year);
            $date_2 = mktime(0,0,0,$month_2,$day_2,$year_2);
            $date_3 = mktime(0,0,0,$month,$day-1,$year);
            if($date_1 == $date_2){
                $date_comm = "Сегодня ".date('H:i', $comment['addTime']);
            }elseif($date_2 == $date_3){
                $date_comm = "Вчера ".date('H:i', $comment['addTime']);
            }else{
                $date_comm = date('d-m-Y, H:i', $comment['addTime']);
            }
            echo $date_comm;
            ?></span>)</span>
            <div style="display:none;" itemprop="commentTime"><?php echo date('Y-m-d\TH:i:s', strtotime($comment['addTime'])); ?></div>
        </div>
        <div class="cMessage" style="text-align:left;clear:both;padding:2px 0;max-width: 650px;overflow: hidden;">
        
        <a href="javascript://" class="open_user_page" user_id="<? echo $comment['userID']; ?>" rel="nofollow" title="<? echo $comment['username']; ?>" style="padding-right:4px;">
        <img style="<?php echo $comment['user_avatar'] != "" ? '' : 'display:none'; ?>" alt="" align="left" src="<? if($comment['user_avatar_type'] == "1"){echo "/forum/images/avatars/upload/3fd64ac252fd45cbb865c0e38dfe125f_";} echo $comment['user_avatar']; ?>" width="30" border="0">
        </a><span itemprop="commentText">
        <? echo $comment['message'];?></span>
        </div>
        <? if($role != 'guest'){ ?>
        <div style="clear:both;padding:4px 0;font-size:7pt;">
        [<a href="javascript://" rel="nofollow" class="answer_com" c_comment_id="<? echo $comment['commentID'];?>" username="<? echo $comment['username']; ?>" date="<? echo $date_comm; ?>">Ответить</a>]
        </div>
        <? } ?>
        </td>
        </tr>
        </tbody>
        </table>
        <br>
        </div>
        <div style="width:auto;margin-left:20px;" id="appEntry<? echo $comment['commentID'];?>"><b></b></div>
        <?php
        echo $subcomments;
        ?>
        <?}?>
        <?}?> 
        </div>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;
        //return '';
    }
}