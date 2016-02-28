<?php

class UserController extends Zend_Controller_Action
{
    public function playlistAction(){
        $this->_generateFilmoteka('Плейлист', array(2));
        $this->view->filmoteka = 'playlist';
    }

    public function watchedAction(){
        $this->_generateFilmoteka('Просмотренные фильмы', array(3));
        $this->view->filmoteka = 'watched';
    }

    private function _generateFilmoteka($title, $type)
    {
        $server_uri = explode('/', $_SERVER["REQUEST_URI"]);
        $userId = str_replace(array('%20'), array(' '), $server_uri[count($server_uri) - 2]);
        $page = $server_uri[count($server_uri) - 1];

        //$this->_getParam("type")
        if(!is_array($type) || count($type) == 0) $type = array(0);

        //$user = Zend_Registry::get("user");
        //$user = $user->data['is_registered'] ? $user->data['user_id'] : 0;
        $user = Model_User::getUserById($userId);
        if(!$user) {
           //die($userName);
           $this->_redirect('/error404');
        }
        $userName = $user->username;
        $user = $user->user_id;

        if(!$page || !is_numeric($page) || $page < 1) $page = 1;

        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()->from('news')
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
            ->where('`news`.`id` IN (SELECT id_film FROM filmoteka WHERE id_user = "'.$user.'" AND type IN ('.implode(',', $type).'))')
            ->order('ontop DESC')->order('addtime DESC');
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
        $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
        $paginator->setPageRange(5);
        $paginator->setCurrentPageNumber($page);

        $this->view->title = $title.' пользователя '.$userName;
        $this->view->user = $userName;
        $this->view->userId = $user;
        $this->view->news = $paginator;
        $this->view->page_number = $page;
        $this->view->types = $type;
    }

    public function loginAction(){
        $status = $this->_getParam("status");
        if (isset($status)){
            if($status == "fail"){
                $this->view->info = "Ошибка регистрации";
            }elseif($status == "success"){
                $this->view->info = "Вы успешно зарегистрировались";
            }
        }
    }
    
    public function successAction(){
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $server_name = $servParam['SERVER_NAME'];
        $username = $this->_getParam("login");
        $password = base64_decode($this->_getParam("pswd"));
        $email = base64_decode($this->_getParam("email"));
        $registered_user = Model_User::getUserByLogin($username);
        if($registered_user != false){
            $registered_user = (array) $registered_user;
            if($registered_user['user_email'] == $email){
                if($registered_user['group_id'] == "11"){
                    Model_User::updateUserData($registered_user['user_id'],array("group_id" => 7));
                    $headers = "MIME-Version: 1.0\r\n";
                    $headers .= "From:$server_name <tushkan@$server_name>\r\nContent-type: text/html; charset=utf-8 \r\n";
                    $headers .= "Reply-To: <tushkan@$server_name>\r\n";
                    $p = "
                    Здравствуйте, $fullname.<br/>
                    <br/>
                    Вы успешно подтвердили регистрацию<br/>
                    Адрес сайта: http://$server_name/<br/>
                    <br/>
                    Всего наилучшего,<br/>
                    Смотреть онлайн фильмы бесплатно и без регистрации (http://$server_name/)";
                    mail($email, "Подтверждение регистрации",$p,$headers);
                    $this->_redirect('/user/login?status=success');
                }else{
                    $this->view->info = "E-mail уже подтвержден";
                }
            }else{
                $this->view->info = "Ссылка неверная";
            }
        }else{
            $this->view->info = "Пользователь не найден";
        }
    }
    
    public function sendprivmsgAction(){
        $this->view->layout()->disableLayout();
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_redirect('/');
        }
        
        $user = (array) Model_User::getUserById($user_online->data['user_id']);
        
        include_once("Zend/Captcha/image.php");
        include_once("Zend/loader.php");
        
        $captcha=new Zend_Captcha_Image();
        $captcha->setWordLen("5")
                ->setHeight("45")
                ->setWidth("150")
                ->setFont("fonts/arial.ttf")
                ->setImgDir("captcha")
                ->setDotNoiseLevel("5") 
                ->setLineNoiseLevel("5");
        
        $user_to_id = $this->_getParam("id");
        if($user_to_id){
            $this->view->user_to_id = $user_to_id;
        }
        $to = $this->_getParam("to");
        $subject = $this->_getParam("subject") ? $this->_getParam("subject") : "";
        $text = $this->_getParam("message");
        
        $incoming_messages = Model_Messenger::getIncomingMessages($user_online->data['user_id']);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user_online->data['user_id']);
        $this->view->outgoing_messages = $outgoing_messages;
        
        if($user['group_id'] != "11"){
            if($to != "" && $subject != "" && $text != ""){
                if (isset($_POST["captcha"]))
                {
                    //
                    if($user_online->data['group_id'] == "5" || $user_online->data['group_id'] == "8" || $user_online->data['group_id'] == "9"){
                        $to_user = (array) Model_User::getUserByLogin(strtolower($to));
                        $text = $this->view->changeSmiles($text);
                        $text = $this->view->parseBBCodes($text);
                        $arr = array(
                            "author_id" => $user_online->data['user_id'],
                            "author_ip" => $user_ip,
                            "message_time" => time(),
                            "message_subject" => $subject,
                            "message_text" => $text,
                            "to_address" => "u_".$to_user['user_id']
                        );
                        $res = Model_Messenger::newMessage($arr);
                        
                        $arr2 = array(
                            "msg_id" => $res,
                            "user_id" => $to_user['user_id'],
                            "author_id" => $user_online->data['user_id'],
                            "pm_new" => 1,
                            "pm_unread" => 1,
                            "folder_id" => -3
                        );
                        $res2 = Model_Messenger::newMessageDataTo($arr2);
                        
                        $arr3 = array(
                            "msg_id" => $res,
                            "user_id" => $user_online->data['user_id'],
                            "author_id" => $user_online->data['user_id'],
                            "pm_new" => 0,
                            "pm_unread" => 0,
                            "folder_id" => -2
                        );
                        $res3 = Model_Messenger::newMessageDataTo($arr3);
                        
                        if($res == true && $res2 == true && $res3 == true){
                            $this->view->info = "Успешно отправлено";
                        }
                    }else{
                        if($captcha->isValid($_POST["captcha"])){
                            $to_user = (array) Model_User::getUserByLogin(strtolower($to));
                            $text = $this->view->changeSmiles($text);
                            $text = $this->view->parseBBCodes($text);
                            $arr = array(
                                "author_id" => $user_online->data['user_id'],
                                "author_ip" => $user_ip,
                                "message_time" => time(),
                                "message_subject" => $subject,
                                "message_text" => $text,
                                "to_address" => "u_".$to_user['user_id']
                            );
                            $res = Model_Messenger::newMessage($arr);
                            
                            $arr2 = array(
                                "msg_id" => $res,
                                "user_id" => $to_user['user_id'],
                                "author_id" => $user_online->data['user_id'],
                                "pm_new" => 1,
                                "pm_unread" => 1,
                                "folder_id" => -3
                            );
                            $res2 = Model_Messenger::newMessageDataTo($arr2);
                            
                            $arr3 = array(
                                "msg_id" => $res,
                                "user_id" => $user_online->data['user_id'],
                                "author_id" => $user_online->data['user_id'],
                                "pm_new" => 0,
                                "pm_unread" => 0,
                                "folder_id" => -2
                            );
                            $res3 = Model_Messenger::newMessageDataTo($arr3);
                            
                            if($res == true && $res2 == true && $res3 == true){
                                $this->view->info = "Успешно отправлено";
                            }
                        }else
                        {
                            $this->view->info = "Неправильный код безопасности";
                        }
                    }
                    
                }
            }else{
                if (isset($_POST["captcha"])){
                    $this->view->info = "Не заполнены все необходимые поля";
                }
            }
        }else{
            $this->view->info = "Для вашего аккаунта любая активность временно заблокирована";
        }
        
        $captchaId = $captcha->generate();
        $this->view->captcha_id = $captchaId;
        
    }
    
    public function incomingmessagesAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $incoming_messages = Model_Messenger::getIncomingMessages($user->data['user_id']);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user->data['user_id']);
        $this->view->outgoing_messages = $outgoing_messages;
    }
    
    public function outgoingmessagesAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $incoming_messages = Model_Messenger::getIncomingMessages($user->data['user_id']);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user->data['user_id']);
        $this->view->outgoing_messages = $outgoing_messages;
    }
    
    public function viewmessageAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_redirect('/');
        }
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        
        $user = (array) Model_User::getUserById($user_online->data['user_id']);
        
        $message_id = $this->_getParam("id");
        $incoming_messages = Model_Messenger::getIncomingMessages($user_online->data['user_id']);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user_online->data['user_id']);
        $this->view->outgoing_messages = $outgoing_messages;
        
        $one_message = (array) Model_Messenger::getOneIncomingMessage($user_online->data['user_id'],$message_id);
        $tmp = Model_Messenger::viewMessage($message_id);
        //var_dump($tmp);die;
        $this->view->one_message = $one_message;
        
        //////////
        $user_to_id = $this->_getParam("to_id");
        $subject = $this->_getParam("subject") ? $this->_getParam("subject") : "";
        $text = $this->_getParam("message");
        
        if(isset($user_to_id) && $subject != "" && $text != ""){
            if($user['group_id'] != "11"){
                if($text != ""){
                    $text = $this->view->changeSmiles($text);
                    $text = $this->view->parseBBCodes($text);
                    $arr = array(
                        "author_id" => $user_online->data['user_id'],
                        "author_ip" => $user_ip,
                        "message_time" => time(),
                        "message_subject" => $subject,
                        "message_text" => $text,
                        "to_address" => "u_".$user_to_id
                    );
                    $res = Model_Messenger::newMessage($arr);
                    
                    $arr2 = array(
                        "msg_id" => $res,
                        "user_id" => $user_to_id,
                        "author_id" => $user_online->data['user_id'],
                        "pm_new" => 1,
                        "pm_unread" => 1,
                        "folder_id" => -3
                    );
                    $res2 = Model_Messenger::newMessageDataTo($arr2);
                    
                    $arr3 = array(
                        "msg_id" => $res,
                        "user_id" => $user_online->data['user_id'],
                        "author_id" => $user_online->data['user_id'],
                        "pm_new" => 0,
                        "pm_unread" => 0,
                        "folder_id" => -2
                    );
                    $res3 = Model_Messenger::newMessageDataTo($arr3);
                    
                    if($res == true && $res2 == true && $res3 == true){
                        $this->view->info = "Успешно отправлено";
                    }
                }else{
                    $this->view->info = "Не заполнены все необходимые поля";
                }
            }else{
                $this->view->info = "Для вашего аккаунта любая активность временно заблокирована";
            }
            
        }
        
    }
    
    public function viewomessageAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $message_id = $this->_getParam("id");
        $incoming_messages = Model_Messenger::getIncomingMessages($user->data['user_id']);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user->data['user_id']);
        $this->view->outgoing_messages = $outgoing_messages;
        
        $one_message = (array) Model_Messenger::getOneOutgoingMessage($user->data['user_id'],$message_id);
        $this->view->one_message = $one_message;
    }
    
    public function delinmsgAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $message_id = $this->_getParam("id");
        $res = Model_Messenger::deleteIncomingMessage($user->data['user_id'],$message_id);
        if($res == true){
            $this->_helper->json(array("status" => "deleted"));die;
        }
    }
    
    public function deloutmsgAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $message_id = $this->_getParam("id");
        $res = Model_Messenger::deleteOutgoingMessage($user->data['user_id'],$message_id);
        if($res == true){
            $this->_helper->json(array("status" => "deleted"));die;
        }
    }
    
    public function delinmsggrAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $items = explode(",",$this->_getParam("items"));
        unset($items[count($items)-1]);
        foreach($items as $item){
            Model_Messenger::deleteIncomingMessage($user->data['user_id'],$item);
        }
        $this->_helper->json(array("status" => "deleted"));die;
    }
    
    public function deloutmsggrAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
        $items = explode(",",$this->_getParam("items"));
        unset($items[count($items)-1]);
        foreach($items as $item){
            Model_Messenger::deleteOutgoingMessage($user->data['user_id'],$item);
        }
        $this->_helper->json(array("status" => "deleted"));die;
    }
    
    public function getreputeAction(){
        $this->view->layout()->disableLayout();
        $user_id = $this->_getParam("user_id");
        $repute = Model_User::getReputeByUserId($user_id);
        $user = (array) Model_User::getUserById($user_id);
        $username = $user['username'];
        $user_online = Zend_Registry::get("user");
        $admin = ($user_online->data['group_id'] == "5") ? true : false;
        $repute_value = $user['user_rating_positive'] - $user['user_rating_negative'];
        $user_id = $user['user_id'];
        $user_rep_hide = Model_User::checkUserReputeIsHide($user_id);
        $this->_helper->json(array("status" => "ok", "repute" => $repute, "username" => $username, "admin" => $admin, "repute_value" => $repute_value, "user_id" => $user_id, "user_rep_hide" => $user_rep_hide));die;
    }
    
    public function rephideAction(){
        $this->view->layout()->disableLayout();
        $user_id = $this->_getParam("id");
        $res = Model_User::addUserReputeToHideList(array("user_id" => $user_id));
        
        $this->_helper->json(array("status" => "ok"));die;
    }
    
    public function repshowAction(){
        $this->view->layout()->disableLayout();
        $user_id = $this->_getParam("id");
        Model_User::removeUserReputeFromHideList($user_id);
        $this->_helper->json(array("status" => "ok"));die;
    }
    
    public function addreputeAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $user_from_id = $user_online->data['user_id'];
        $user_to_id = $this->_getParam("user_id");
        $change = $this->_getParam("change");
        $comment = $this->_getParam("comment");
        
        $user_from = (array) Model_User::getUserById($user_from_id);
        
        if($user_from['group_id'] != "11"){
            $user_to = (array) Model_User::getUserById($user_to_id);
            $curr_user_repute = $user_from['user_rating_positive'] - $user_from['user_rating_negative'];
            if($curr_user_repute > 5000){
                $repute_count = 20;
            }elseif($curr_user_repute > 2500){
                $repute_count = 15;
            }elseif($curr_user_repute > 1000){
                $repute_count = 10;
            }elseif($curr_user_repute > 900){
                $repute_count = 9;
            }elseif($curr_user_repute > 700){
                $repute_count = 8;
            }elseif($curr_user_repute > 500){
                $repute_count = 7;
            }elseif($curr_user_repute > 300){
                $repute_count = 6;
            }elseif($curr_user_repute > 200){
                $repute_count = 5;
            }elseif($curr_user_repute > 100){
                $repute_count = 4;
            }elseif($curr_user_repute > 50){
                $repute_count = 3;
            }elseif($curr_user_repute > 10){
                $repute_count = 2;
            }else{
                $repute_count = 1;
            }
            
            $user_to_rating_positive = (int) $user_to['user_rating_positive'];
            $user_to_rating_negative = (int) $user_to['user_rating_negative'];
            if($change == "plus"){
                $user_to_rating_positive = $user_to_rating_positive + $repute_count;
                $repute_value = $repute_count;
            }elseif($change == "minus"){
                $user_to_rating_negative = $user_to_rating_negative + $repute_count;
                $repute_value = "-".$repute_count;
            }elseif($change == "none"){
                $repute_value = "0";
            }
            
            $arr = array(
                "id_to" => $user_to_id,
                "id_from" => $user_from_id,
                "value" => $repute_value,
                "addtime" => time(),
                "message" => $comment
            );
            $last_id = Model_User::addRepute($arr);
            $res = Model_User::updateUserData($user_to_id,array("user_rating_positive" => $user_to_rating_positive,"user_rating_negative" => $user_to_rating_negative));
            if($last_id > 0 && $res == true){
                $this->_helper->json(array("status" => "ok"));die;
            }
        }else{
            $this->_helper->json(array("status" => "banned_user"));die;
        }
    }
    
    public function editreputeAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $repute_id = $this->_getParam("id");
        $text = $this->_getParam("text");
        
        $res = Model_User::updateUserRepute($repute_id,array("message" => $text));
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function meditreputeAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $user_id = $this->_getParam("id");
        $text = $this->_getParam("text");
        
        $res = Model_User::updateUserData($user_id,array("user_rating_positive" => $text,"user_rating_negative" => "0"));
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function mclearreputeAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $user_id = $this->_getParam("id");
        
        $res1 = Model_User::updateUserData($user_id,array("user_rating_positive" => "0","user_rating_negative" => "0"));
        $res2 = Model_User::removeReputesByUserId($user_id);
        if($res1 == true && $res2 == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function deletereputeAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $repute_id = $this->_getParam("id");
        $repute = (array) Model_User::getReputeById($repute_id);
        $user_rating_positive = (int) $repute['user_rating_positive'];
        $user_rating_negative = (int) $repute['user_rating_negative'];
        if($repute['value'] > 0){
            $user_rating_positive = $user_rating_positive - $repute['value'];
        }elseif($repute['value'] < 0){
            $user_rating_negative = $user_rating_negative + $repute['value'];
        }
        $res1 = Model_User::updateUserData($repute['id_to'],array("user_rating_positive" => $user_rating_positive,"user_rating_negative" => $user_rating_negative));
        
        $res2 = Model_User::deleteReputeById($repute_id);
        if($res1 == true && $res2 == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function getallawardsAction(){
        $this->view->layout()->disableLayout();
        $user_id = $this->_getParam("user_id");
        $awards = Model_User::getAllAwardsByUserId($user_id);
        $user = (array) Model_User::getUserById($user_id);
        $username = $user['username'];
        $this->_helper->json(array("status" => "ok", "awards" => $awards, "username" => $username));die;
    }
    
    public function getsomeawardsAction(){
        $this->view->layout()->disableLayout();
        $user_id = $this->_getParam("user_id");
        $award = $this->_getParam("award");
        $awards = Model_User::getSomeAwards($user_id,$award);
        $user = (array) Model_User::getUserById($user_id);
        $username = $user['username'];
        $user_online = Zend_Registry::get("user");
        $admin = ($user_online->data['group_id'] == "5") ? true : false;
        $this->_helper->json(array("status" => "ok", "awards" => $awards, "admin" => $admin));die;
    }
    
    public function addawardAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        $user_id = $this->_getParam("user_id");
        $award = $this->_getParam("award");
        $comment = $this->_getParam("comment");
        
        $user = (array) Model_User::getUserById($user_online->data['user_id']);
        if($user['group_id'] != "11"){
            $arr = array(
                "award" => $award,
                "id_to" => $user_id,
                "id_from" => $user_online->data['user_id'],
                "addtime" => time(),
                "text" => $comment
            );
            
            $last_id = Model_User::addAward($arr);
            if($last_id > 0){
                $this->_helper->json(array("status" => "ok"));die;
            }
        }else{
            $this->_helper->json(array("status" => "banned_user"));die;
        }
    }
    
    public function editawardAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $award_id = $this->_getParam("id");
        $text = $this->_getParam("text");
        
        $res = Model_User::updateUserAward($award_id,array("text" => $text));
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function deleteawardAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $award_id = $this->_getParam("id");
        
        $res = Model_User::deleteAwardById($award_id);
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function changeremarkAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        
        $user_id = $this->_getParam("user_id");
        $change = $this->_getParam("change");
        $comment = $this->_getParam("comment");
        $time = $this->_getParam("time");
        $period = $this->_getParam("period");
        $ever = $this->_getParam("ever");
        $privmsg = $this->_getParam("privmsg");
        $emailmsg = $this->_getParam("emailmsg");
        
        $user_to = (array) Model_User::getUserById($user_id);
        
        if($ever == "1"){
            // бан навсегда
            $ban_date = time();
            $user_to_group_id = (int) $user_to['group_id'];
            $arr = array(
                "ban_userid" => $user_id,
                "ban_start" => $ban_date,
                "ban_end" => 0,
                "old_group_id" => $user_to_group_id
            );
            $banned_id = Model_User::addUserToBanlist($arr);
            Model_User::updateUserData($user_id,array("group_id" => "11"));
        }else{
            if($time != "0"){
                //установлено время бана, забанить на время
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                $minutes = $date_time_array['minutes'];
                $seconds = $date_time_array['seconds'];
                $month = $date_time_array['mon'];
                $day = $date_time_array['mday'];
                $year = $date_time_array['year'];
                $date_from = mktime($hours,$minutes,$seconds,$month,$day,$year);
                $ban_date = $date_from;
                if($period == "1"){
                    $day = $day + $time;
                }elseif($period == "2"){
                    $hours = $hours + $time;
                }
                $date_to = mktime($hours,$minutes,$seconds,$month,$day,$year);
                $ban_date_end = $date_to;
                $user_to_group_id = (int) $user_to['group_id'];
                $arr = array(
                    "ban_userid" => $user_id,
                    "ban_start" => $date_from,
                    "ban_end" => $date_to,
                    "old_group_id" => (int) $user_to_group_id
                );
                $banned_id = Model_User::addUserToBanlist($arr);
                Model_User::updateUserData($user_id,array("group_id" => "11"));
            }
        }
        
        if($change != "none"){
            // изменяем уровень замечаний
            $user_remark = Model_User::getRemarkByUserId($user_id);
            if($user_remark == false){
                // у пользователя еще нет замечаний
                if($change == "plus"){
                    // повышаем уровень замечаний
                    $remark = 20;
                }elseif($change == "minus"){
                    // понижаем уровень замечаний
                    $remark = 0;
                }
                $data = array(
                    "user_id" => $user_id,
                    "remark" => $remark
                );
                Model_User::addRemark($data);
                $date_change = time();
                $data2 = array(
                    "user_id" => $user_id,
                    "from_id" => $user->data['user_id'],
                    "type" => $change,
                    "addtime" => $date_change,
                    "comment" => $comment
                );
                Model_User::addRemarkMessage($data2);
            }else{
                $user_remark = (array) $user_remark;
                $remark = (int) $user_remark['remark'];
                if($change == "plus"){
                    // повышаем уровень замечаний
                    $remark = $remark + 20;
                    if($remark > 100){
                        $remark = 100;
                    }
                }elseif($change == "minus"){
                    // понижаем уровень замечаний
                    if($remark == 100){
                        $banned_user = (array) Model_User::getBannedUserById($user_id);
                        Model_User::updateUserData($user_id,array("group_id" => $banned_user['old_group_id']));
                        $unban_after_remark_change = Model_User::removeUserFromBanlist($user_id);
                    }
                    $remark = $remark - 20;
                    if($remark < 0){
                        $remark = 0;
                    }
                }
                $data = array(
                    "remark" => $remark
                );
                Model_User::updateUserRemark($user_id,$data);
                $date_change = time();
                $data2 = array(
                    "user_id" => $user_id,
                    "from_id" => $user->data['user_id'],
                    "type" => $change,
                    "addtime" => $date_change,
                    "comment" => $comment
                );
                Model_User::addRemarkMessage($data2);
                if($remark == 100){
                    // бан навсегда
                    $ban_date = time();
                    $user_to_group_id = (int) $user_to['group_id'];
                    $arr = array(
                        "ban_userid" => $user_id,
                        "ban_start" => $ban_date,
                        "ban_end" => 0,
                        "old_group_id" => $user_to_group_id
                    );
                    $banned_id = Model_User::addUserToBanlist($arr);
                    Model_User::updateUserData($user_id,array("group_id" => "11"));
                    $ban_after_remark_change = true;
                }
            }
        }
        
        // уведомления
        $fullname_to = $user_to['pf_real_name_n'];
        $fullname_from = $user->data['username'];
        if($privmsg == "1"){
            if($ever == "1"){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $comment = $this->view->changeSmiles($comment);
                $comment = $this->view->parseBBCodes($comment);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены навсегда.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
                
                $arr = array(
                    "author_id" => $user->data['user_id'],
                    "author_ip" => $user_ip,
                    "message_time" => time(),
                    "message_subject" => "Вы были забанены",
                    "message_text" => $message_text,
                    "to_address" => "u_".$user_id
                );
                $res = Model_Messenger::newMessage($arr);
            }elseif($time != "0"){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $date_2 = date("d.m.Y, H:i",$ban_date_end);
                $comment = $this->view->changeSmiles($comment);
                $comment = $this->view->parseBBCodes($comment);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Активность блокирована до: $date_2<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
                
                $arr = array(
                    "author_id" => $user->data['user_id'],
                    "author_ip" => $user_ip,
                    "message_time" => time(),
                    "message_subject" => "Вы были забанены",
                    "message_text" => $message_text,
                    "to_address" => "u_".$user_id
                );
                $res = Model_Messenger::newMessage($arr);
            }else{
                $date_1 = date("d.m.Y, H:i",$date_change);
                if($change == "plus"){
                    $str_change = "[+]повышен";
                }elseif($change == "minus"){
                    $str_change = "[-]понижен";
                }
                $comment = $this->view->changeSmiles($comment);
                $comment = $this->view->parseBBCodes($comment);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Ваш уровень замечаний был $str_change.<br/>
                <br/>
                Уровень изменил: $fullname_from<br/>
                Дата изменения: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
                
                $arr = array(
                    "author_id" => $user->data['user_id'],
                    "author_ip" => $user_ip,
                    "message_time" => time(),
                    "message_subject" => "Изменен уровень замечаний",
                    "message_text" => $message_text,
                    "to_address" => "u_".$user_id
                );
                $res = Model_Messenger::newMessage($arr);
            }
            
            
            $arr2 = array(
                "msg_id" => $res,
                "user_id" => $user_id,
                "author_id" => $user->data['user_id'],
                "pm_new" => 1,
                "pm_unread" => 1,
                "folder_id" => -3
            );
            $res2 = Model_Messenger::newMessageDataTo($arr2);
            
            $arr3 = array(
                "msg_id" => $res,
                "user_id" => $user->data['user_id'],
                "author_id" => $user->data['user_id'],
                "pm_new" => 0,
                "pm_unread" => 0,
                "folder_id" => -2
            );
            $res3 = Model_Messenger::newMessageDataTo($arr3);
            
            if($ban_after_remark_change == true){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $comment = $this->view->changeSmiles($comment);
                $comment = $this->view->parseBBCodes($comment);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены навсегда.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
                
                $arr = array(
                    "author_id" => $user->data['user_id'],
                    "author_ip" => $user_ip,
                    "message_time" => time(),
                    "message_subject" => "Вы были забанены",
                    "message_text" => $message_text,
                    "to_address" => "u_".$user_id
                );
                $res = Model_Messenger::newMessage($arr);
                
                $arr2 = array(
                    "msg_id" => $res,
                    "user_id" => $user_id,
                    "author_id" => $user->data['user_id'],
                    "pm_new" => 1,
                    "pm_unread" => 1,
                    "folder_id" => -3
                );
                $res2 = Model_Messenger::newMessageDataTo($arr2);
                
                $arr3 = array(
                    "msg_id" => $res,
                    "user_id" => $user->data['user_id'],
                    "author_id" => $user->data['user_id'],
                    "pm_new" => 0,
                    "pm_unread" => 0,
                    "folder_id" => -2
                );
                $res3 = Model_Messenger::newMessageDataTo($arr3);
            }
        }
        if($emailmsg == "1"){
            if($ever == "1"){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены навсегда.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
            }elseif($time != "0"){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $date_2 = date("d.m.Y, H:i",$ban_date_end);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Активность блокирована до: $date_2<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
            }else{
                $date_1 = date("d.m.Y, H:i",$date_change);
                if($change == "plus"){
                    $str_change = "[+]повышен";
                }elseif($change == "minus"){
                    $str_change = "[-]понижен";
                }
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Ваш уровень замечаний был $str_change.<br/>
                <br/>
                Уровень изменил: $fullname_from<br/>
                Дата изменения: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
            }
            
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "From:tushkan.net <tushkan@tushkan.net>\r\nContent-type: text/html; charset=utf-8 \r\n";
            $headers .= "Reply-To: <tushkan@tushkan.net>\r\n";
            
            mail($user_to['user_email'], "Уведомление",$message_text,$headers);
            
            if($ban_after_remark_change == true){
                $date_1 = date("d.m.Y, H:i",$ban_date);
                $message_text = "
                Здравствуйте, $fullname_to.<br/>
                <br/>
                Вы были забанены навсегда.<br/>
                <br/>
                Вас забанил: $fullname_from<br/>
                Дата бана: $date_1<br/>
                Причина: $comment<br/>
                <br/>
                Всего наилучшего.";
                
                mail($user_to['user_email'], "Уведомление",$message_text,$headers);
            }
            
        }
        
        $this->_helper->json(array("status" => "ok"));die;        
    }
    
    public function getremarkshistoryAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        $user_id = $this->_getParam("user_id");
        $user_data = (array) Model_User::getUserById($user_id);
        $remarks = Model_User::getRemarksHistoryByUserId($user_id);
        $admin = ($user_online->data['group_id'] == "5") ? true : false;
        if($remarks){
            $this->_helper->json(array("status" => "ok", "remarks" => $remarks, "user" => $user_data, "admin" => $admin));die;
        }else{
            $this->_helper->json(array("status" => "no_history"));die;
        }
    }
    
    public function editremarkAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $remark_id = $this->_getParam("id");
        $text = $this->_getParam("text");
        
        $res = Model_User::updateUserRemarkMsg($remark_id,array("comment" => $text));
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function deleteremarkAction(){
        $this->view->layout()->disableLayout();
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        
        $remark_id = $this->_getParam("id");
        
        $res = Model_User::deleteRemarkMsgById($remark_id);
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function editcommentAction()
    {
        
        $user_online = Zend_Registry::get("user");
        $idc = $this->_getParam('id');
        $idm = $this->_getParam('idm');
        $role = 'guest';
        if($user_online->data['is_registered']){
            $role = GetRole($user_online->data['group_id']);
        }
        $comment = (array) Model_Comments::getCommentByIds($idc,$idm);
        if($user_online->data['group_id'] == "5" || $user_online->data['group_id'] == "8" || $user_online->data['group_id'] == "9" || $user_online->data['group_id'] == "10" || ($comment['userID'] == $user_online->data['user_id'])){
            $message = $this->_getParam('message');
            //$message = strip_tags($message);
            //var_dump($message);die;
            if($user_online->data['group_id'] == "5" || $user_online->data['group_id'] == "8" || $user_online->data['group_id'] == "9" || $user_online->data['group_id'] == "10"){
                $message = $this->view->parseBBCodes($message);
            }
            $message = $this->view->changeSmiles($message);
            
            $text = explode(PHP_EOL,$message);
            foreach($text as $key=>$item){
                if($key != 0){
                    $texts .= '<p>'.$text[$key].'</p>';
                }else{
                    $texts .= $text[$key];
                }
            }
            $message = $texts;
            
            $params['message'] = $message;
            
            $spam = (array) Model_Settings::getParamSettingsByKey('spam');
            $arr_spam = explode(PHP_EOL,$spam['value']);
            foreach($arr_spam as $spam_word){
                $spam_word = mb_strtolower(urldecode($spam_word));
                $spam_word = utf8_clean_string($spam_word);
                $text = mb_strtolower(urldecode($params['message']));
                $text = utf8_clean_string($text);
                if(strpos($text,$spam_word) !== false){
                    $this->_helper->json(array("status" => "spam"));die;
                }
            }
            
            Model_Admin_Comments::editComment($idc, Model_Admin_News::deleteEmptyKey($params));
            $memcache = Zend_Registry::get("memcache");
            for($i = 0; $i < 100; ++$i) {
                $memcache->delete('comments_'.$user_online->data['user_id'].'_'.$comment['materialID'].'_'.$comment['moduleID'].'_'.$i.'_'.$role);
            }
            if($comment['moduleID'] == "2"){
                $memcache->delete('news_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('news_comments_material_'.$comment['materialID'].'_order_desc');
            }elseif($comment['moduleID'] == "3"){
                $memcache->delete('publ_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('publ_comments_material_'.$comment['materialID'].'_order_desc');
            }elseif($comment['moduleID'] == "8"){
                $memcache->delete('tv_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('tv_comments_material_'.$comment['materialID'].'_order_desc');
            }
            $memcache->delete('count_comments_item_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            $memcache->delete('subcomments_material_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            $memcache->delete('comments_keys_material_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$comment['moduleID'].'_role_admin');
            //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$comment['moduleID'].'_role_user');
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function deletecommentAction()
    {
        $user_online = Zend_Registry::get("user");
        $role = 'guest';
        if($user_online->data['is_registered']){
            $role = GetRole($user_online->data['group_id']);
        }
        if($user_online->data['group_id'] == "5" || $user_online->data['group_id'] == "8" || $user_online->data['group_id'] == "9" || $user_online->data['group_id'] == "10" || ($comment['userID'] == $user_online->data['user_id'])){
            $id = $this->_getParam('id');
            $comment = (array) Model_Comments::getCommentById($id);
            Zend_Registry::set("ids_node_del",array());
            $this->pushCommentsIds($id);
            $ids_node_del = Zend_Registry::get("ids_node_del");
            foreach($ids_node_del as $id_to_del){
                Model_Comments::delCommentById($id_to_del);
            }
            $count_comments = Model_Comments::getCountCommentsByMaterialID($comment['materialID'],$comment['moduleID']);
            $data = array("num_com" => $count_comments);
            $memcache = Zend_Registry::get("memcache");

            if($comment['parentID'] > 0) {
                Model_Comments::updateCommentAnswerCount($comment['parentID'], $comment['moduleID'], -1);
            }

            for($i = 0; $i < 100; ++$i) {
                $memcache->delete('comments_'.$user_online->data['user_id'].'_'.$comment['materialID'].'_'.$comment['moduleID'].'_'.$i.'_'.$role);
            }

            if($comment['moduleID'] == "2"){
                Model_News::updateNewsData($comment['materialID'],$data);
                $memcache->delete('news_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('news_comments_material_'.$comment['materialID'].'_order_desc');
            }elseif($comment['moduleID'] == "3"){
                Model_Publ::updatePublData($comment['materialID'],$data);
                $memcache->delete('publ_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('publ_comments_material_'.$comment['materialID'].'_order_desc');
            }elseif($comment['moduleID'] == "8"){
                Model_StaticPages::updatePageData($comment['materialID'],$data);
                $memcache->delete('tv_comments_material_'.$comment['materialID'].'_order_asc');
                $memcache->delete('tv_comments_material_'.$comment['materialID'].'_order_desc');
            }
            $memcache->delete('count_comments_item_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            $memcache->delete('subcomments_material_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            $memcache->delete('comments_keys_material_'.$comment['materialID'].'_module_'.$comment['moduleID']);
            //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$comment['moduleID'].'_role_admin');
            //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$comment['moduleID'].'_role_user');
            $this->_helper->json('1');
        }
    }
    
    function pushCommentsIds($id){
        $ids_node_del = Zend_Registry::get("ids_node_del");
        array_push($ids_node_del,$id);
        Zend_Registry::set("ids_node_del",$ids_node_del);
        $comments = Model_Comments::getNodeSubcomments($id);
        if($comments != false){
            foreach($comments as $comment){
                $this->pushCommentsIds($comment['commentID']);
            }
        }
    }
    
}
