<?php
class Zend_View_Helper_CommentsSubTree extends Zend_View_Helper_Abstract
{
    public $view;
    protected $_data = null;
    protected $_index;
    protected $_subTree;
    
    public function commentsSubTree($parent_id,$materialID,$moduleID,$role,$user_id,$comments_keys){
        $this->_getData($materialID,$moduleID);
        $_subTree = array();
        $subTree = $this->display_child_nodes($parent_id);
        $html = '';
        foreach($subTree as $node){
            $html .= $this->_renderHTML($node,$tpl='item',$moduleID,$role,$user_id,$comments_keys,$parent_id);
        }
        return $html;
    }
    
    protected function _getData($materialID,$moduleID){
        
        if(!$this->_data){
            $data = array();
            $index = array();
            $tpl = new Model_Comments();
            $list = $tpl->getAllSubComments($materialID,$moduleID); // get list with joines and oter data.
            foreach($list as $row){
            $id = $row["commentID"];
                $parent_id = $row["parentID"] === '0' ? 0 : $row["parentID"];
                $data[$id] = $row;
                $index[$parent_id][] = $id;
            } 
            $this->_data = $data;
            $this->_index = $index;
        }
    }

    private function _getChilds($commentId){
        $tmp = array();
        foreach($this->_data as $r){
            if($r['parentID'] == $commentId){
                $tmp[] = $r;
            }
        }
        return $tmp;
    }
    private function display_child_nodes($commentId,&$subTree= array()){
        $res = array();
        $childs = $this->_getChilds($commentId);
        //Zend_Debug::dump($childs);
        if(  empty($childs) ){                              //no childs , go out
            
            return array();
        }else{                                              // go through            
            foreach($childs as $c){
                $res[] = array(
                    'child_data' =>$c,
                    'child_item' => $this->display_child_nodes($c['commentID'])
                );    
            }
            return $res;            
        }                
    }
    
    protected function _renderHTML($subTree,$tpl,$moduleID,$role,$user_id,$comments_keys,$idParent){
        if(  !empty($subTree) ){                                              // go through            
            $res = '<div class="comment-wrp comment-wrp-'.$idParent.'">';
            $f = '_tpl_'.$tpl;
            $this->$f($param);
            $item = $this->_tpl_item($subTree['child_data'],$moduleID,$role,$user_id,$comments_keys);
            $res .= '<div id="comAns'.$idParent.'" class="data">'.$item.'</div>';
            foreach($subTree['child_item'] as $c){
                $child = $this->_renderHTML($c,$tpl,$moduleID,$role,$user_id,$comments_keys);
                $res .= '<div id="childs'.$idParent.'" class="child">'.$child.'</div>';
            }
            $res .= '</div>';
            return $res;                        
        }        
        return null;
    }
    
    protected function _tpl_item($leaf,$moduleID,$role,$user_id,$comments_keys){
        ob_start();
        ?>
        <div class="comEnt report-spam-target<? // if($comments_keys[$leaf['commentID']]['spam'] == true){echo " report-spam-hidden";}?>" id="comEnt<? echo $leaf['commentID'];?>" comment_id="<? echo $leaf['commentID'];?>">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="cBlock1">
        <tbody>
        <tr>
        <td style="padding:3px;">
        <div style="float:right;font-size:11px;font-family:Arial,sans-serif;">

        <span id="report-spam-wrap-<? echo $leaf['id'];?>" class="report-spam-wrap">
        <?
        if($role == 'admin' || ($leaf['userID'] == $user_id && $role != 'banned')){
            echo '<a class="editcomment" comment_id="'.$leaf['commentID'].'" style="cursor:pointer;color:red;float:left;" title="Редактировать"><span class="editcomment_img"></span></a>';
        }
        if($role == 'admin' || ($role == 'certified' && $leaf['userID'] == $user_id)){
            echo '<a class="deletecomment" comment_id="'.$leaf['commentID'].'" style="cursor:pointer;color:red;float:left;">Удалить</a>';
        }
        ?>
        </span>
        <span <? if($leaf['rate'] > 0){ echo 'class="myWinSuccess"';}elseif($leaf['rate'] < 0){ echo 'class="myWinError"';}else{ echo 'style="color:gray;"';} ?> ><b><? if($leaf['rate'] > 0){ echo "+";} echo $leaf['rate'];?></b></span>
        <? if($role != 'guest'){ ?>
        <span class="finger_up_green comment_rate" rate="up" comment_id="<? echo $leaf['commentID'];?>" module_id="<? echo $moduleID; ?>" title="Хороший пост" style="cursor: pointer;"></span>
        <span class="finger_down_green comment_rate" rate="down" comment_id="<? echo $leaf['commentID'];?>" module_id="<? echo $moduleID; ?>" title="Плохой пост" style="cursor: pointer;" ></span>
        <?}else{?>
        <span class="finger_up_white" title="Хороший пост"></span>
        <span class="finger_down_white" title="Плохой пост"></span>
        <?}?>
        </div>
        <div class="cTop" style="text-align:left;">
        <a href="#ent<? echo $leaf['commentID'];?>" name="ent<? echo $leaf['commentID'];?>">
        <b><? echo $comments_keys[$leaf['commentID']]; ?></b>
        </a>
        <a href="javascript://" class="open_user_page" user_id="<? echo $leaf['userID']; ?>" rel="nofollow" >
        <b><? echo $leaf['username']; ?></b>
        </a> &nbsp;<span style="font-size:7pt;unicode-bidi:embed;">(<?
            $date_now = time();
            $date_time_array = getdate($date_now);
            $month = $date_time_array['mon'];
            $day = $date_time_array['mday'];
            $year = $date_time_array['year'];
            $date_time_array = getdate($leaf['addTime']);
            $month_2 = $date_time_array['mon'];
            $day_2 = $date_time_array['mday'];
            $year_2 = $date_time_array['year'];
            $date_1 = mktime(0,0,0,$month,$day,$year);
            $date_2 = mktime(0,0,0,$month_2,$day_2,$year_2);
            $date_3 = mktime(0,0,0,$month,$day-1,$year);
            if($date_1 == $date_2){
                $date_comm = "Сегодня ".date('H:i', $leaf['addTime']);
            }elseif($date_2 == $date_3){
                $date_comm = "Вчера ".date('H:i', $leaf['addTime']);
            }else{
                $date_comm = date('d-m-Y, H:i', $leaf['addTime']);
            }
            echo $date_comm;
            ?>)</span>
        </div>
        <div class="cMessage" style="text-align:left;clear:both;padding:2px 0;">
        
        <a href="javascript://" class="open_user_page" user_id="<? echo $leaf['userID']; ?>" rel="nofollow" title="<? echo $leaf['username']; ?>" style="padding-right:4px;">
        <? if($leaf['user_avatar'] != "") {?>
        <img alt="" align="left" src="<? if($leaf['user_avatar_type'] == "1"){echo "/forum/images/avatars/upload/3fd64ac252fd45cbb865c0e38dfe125f_";} echo $leaf['user_avatar']; ?>" width="30" border="0">
        <? } ?>
        </a> 
        <? echo $leaf['message'];?>
        </div>
        <? if($role != 'guest'){ ?>
        <div style="clear:both;padding:4px 0;font-size:7pt;">
        [<a href="javascript://" rel="nofollow" class="answer_com" c_comment_id="<? echo $leaf['commentID'];?>" username="<? echo $leaf['username']; ?>" date="<? echo $date_comm; ?>">Ответить</a>]
        </div>
        <? } ?>
        </td>
        </tr>
        </tbody>
        </table>
        <br>
        </div>
        <div style="width:auto;margin-left:20px;" id="appEntry<? echo $leaf['commentID'];?>"><b></b></div>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;
    }

}