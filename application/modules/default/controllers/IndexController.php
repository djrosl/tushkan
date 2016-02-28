<?php
class IndexController extends Zend_Controller_Action
{
    public function init()
    {
        $uri = $this->_request->getPathInfo();
		$activeNav = $this->view->navigation()->findByUri($uri);
		$activeNav->active = true;
		//$activeNav->setClass("active");
    }
    
    private function _myip()
    {
        $ip = '0.0.0.0';
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
          $ip = $_SERVER['HTTP_CLIENT_IP'];
        } else if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
          $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
          $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    public function orderdescAction()
    {
        //$user = strip_tags($this->_getParam('user'));
        $page = $this->_getParam('page');
        if(!is_numeric($page) || $page < 1) { $page = 1; }
        $sortField = strip_tags($this->_getParam('field'));
        if(!$sortField) { $sortField = 'date'; }
        $status = strip_tags($this->_getParam('status'));
        $status = $status == 'true' ? true : ($status == 'false' ? false : null);
        $year = strip_tags($this->_getParam('year'));
        if(!is_numeric($year)) { $year = ''; }
        $sort = $this->_getParam('sort');
        $sort = in_array($sort, array('asc', 'desc')) ? $sort : 'desc';
        $category = strip_tags($this->_getParam('cat'));
        $category = in_array($category, array('Фильм', 'Сериал', 'Мультфильм')) ? $category : '';
        $memcache = Zend_Registry::get("memcache");
        $key = md5('orderdesc_'.$status.$user.$year.$sort.$sortField.$category);
        if(true || ($rows = $memcache->get($key)) === false ) {
            //Model_OrderDesc::selectNew('date', 'desc', $year = '', $user = '', $ready = null, $cat = '');
            $rows = Model_OrderDesc::selectDesc($page, $sortField, $sort, $year, '', $status, $category);
            $memcache->set($key, $rows, false, 300);
        }
        $this->view->rows = $rows;
    }

    public function ajaxorderdescAction()
    {
        $user = Zend_Registry::get("user");
        $userId = $user->data['user_id'];
        $id = trim(strip_tags($this->_getParam('id')));
        $action = trim(strip_tags($this->_getParam('act')));
        if(!$id) {
            die('Хватит слать всякую дрянь!');
        }
        $isAdmin = FSDEBUG || ADMIN_GROUP == $user->data['group_id'] || MODERATOR_GROUP == $user->data['group_id'];
        $response = '';
        switch($action) {
            case 'vote':
                $response = Model_OrderDesc::Vote($id, $userId);
                break;

            case 'edit':
                $response = $isAdmin
                    ? Model_OrderDesc::Edit($id, $this->_getParam('link'))
                    : 'Ошибка доступа';
                break;

            case 'remove':
                $response = $isAdmin ? Model_OrderDesc::Remove($id) : 'Ошибка доступа';
                break;

            default:
                $response = 'Неизвестная команда';
                break;
        }
        die($response);
    }

    public function addrequestAction()
    {
        $user = Zend_Registry::get("user");

        if(!$user->data['is_registered']){
            die('Необходма регистрация');
        }

        $title = trim(strip_tags($this->_getParam('title')));
        $otitle = trim(strip_tags($this->_getParam('title_orig')));
        $year = trim(strip_tags($this->_getParam('year')));
        $cat = trim(strip_tags($this->_getParam('cat')));

        if(empty($title) || empty($year) || empty($cat)) {
            die('Заполните все обязательные поля');
            $title = 'Test';
            $year = 2015;
            $cat = 'Фильмы';
            $otitle = 'Test film';
        }

        $data = array(
            'title' => $title,
            'title_orig' => $otitle,
            'year' => $year,
            'category' => $cat,
            'user' => $user->data['user_id'],
        );

        //print_r($data);  exit;

        if(!Model_OrderDesc::addNew($data)) {
            die('Ошибка сохранения заявки');
        }

        exit;
    }

    public function torrentAction()
    {
        $id = $this->_getParam('id');
        $user = Zend_Registry::get("user");

        if($id == '' || !$user->data['is_registered']){
            //$this->_redirect('/error404');
        }
        $one_news = Model_News::getOneNewsById($id);
        if(!$one_news) {
            //die('fail 1');
            $this->_redirect('/error404');
        }
        $one_news = (array)$one_news;

        $url = '';
        if($one_news['file'] == '') {
            //die('fail 2');
            $this->_redirect('/error404');
        } else {
            $url = $one_news['file'];
        }

        if(!file_exists(ROOT_FTP_PATH.$url)) {
            //die('fail 3');
            $this->_redirect('/error404');
        }
        $title = explode(')', $one_news['title']);
        $this->view->one_news = $one_news;
        $this->view->tfile = $url;
        $this->view->title = $title[0].')';
        $this->view->tsize = round(filesize(ROOT_FTP_PATH.$url) / 1024, 2);
        //header('Location: '.$url);
        /*include __DIR__.'/../../../plugins/Torrent.php';
        $torrent = new Torrent(array($url), 'udp://tracker.openbittorrent.com:80' );
        $torrent->announce('http://retracker.local/announce');
        $torrent->url_list(array($url));
        $torrent->name($title[0].')');
        if ($errors = $torrent->errors()) {
	       var_dump($errors);
           exit;
        }
        $torrent->send('tushkanFilm'.$id.'.torrent');*/
        //exit;
    }


    public function socialAction()
    {
        header('Content-type: text/html; charset=utf-8');
        header("Cache-Control: no-cache, must-revalidate");
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        include __DIR__.'/../../../../tushkan.net/fssocauth/libs/fsSocAuth.php';
        $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
        $phpEx = substr(strrchr(__FILE__, '.'), 1);
        include($phpbb_root_path . 'includes/functions_user.' . $phpEx);

        $config = array(
             'dbhost' => 'localhost',
             'dbuser' => 'egor',
             'dbpassword' => '6M1hsnH4',
             'dbname' => 'tushkan',
        );

        define('REDIRECT_URL', '/'); //Redirect url
        define('TABLE_USERS', 'phpbb3_users'); //Database table name for users
        define('TABLE_USERS_LOGIN', 'username'); //Login field name in users table
        define('TABLE_USERS_PASSWORD', 'user_password'); //Password field name in users table

        //Change config vars in next line using data from your DB config file
        $db = mysqli_connect($config['dbhost'], $config['dbuser'], $config['dbpassword'], $config['dbname']);

        if(!$db) {
            die('Can not connect to database...');
        }

        fsSocAuth::Steps($_REQUEST);

        $password = rand().time();

        /*$user = array(
            'other' => array(),
            'type' => 'vk',
            'login' => 'foolsoft',
            'type_login' => 'vk_foolsoft',
            'email' => 'test@test.ru',
            'token' => '123123',
            'expires' => strtotime('+3600 seconds'),
        );*/
        if(($user = fsSocAuth::Success($_REQUEST)) == null) {
            header('Location: '.REDIRECT_URL);
            exit;
        }

        //print_r($user); exit;

        $dbresult = $db->query(fsSocAuth::Format('SELECT * FROM `{0}` WHERE `{1}` = "{2}"', array(
            TABLE_USERS, TABLE_USERS_LOGIN, $user['type_login'],
        )));

        if(!($dbrow = $dbresult->fetch_assoc())) {
            $user_row = array();
            $user_row['username'] = $user['type_login'];
            $user_row['user_password'] = phpbb_hash($password); //$user['token'];
            $user_row['user_email'] = $user['email'];
            $user_row['group_id'] = 2;
            $user_row['user_type'] = 0;
            $user_row['user_birthday'] = '0-0-0';
            $user_row['user_ip'] = $this->_myip();
            $user_row['user_regdate'] = time();
            $user_row['user_lastpage'] = '../index.php';
            $user_row['user_login_attempts'] = 1;
            $user_row['user_avatar_type'] = 2;
            $user_row['user_permissions'] = '00000000006xv29o00
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000


qlctzq000000
qlctzq000000

qlctzq000000

qlctzq000000

qlctzq000000
qlctzq000000

qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000

qlctzq000000
qlctzq000000
qlctzq000000


qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000
qlctzq000000';

              user_add($user_row, array('pf_real_name_n' => $user['type_login']));
        } else {
            $db->query(fsSocAuth::Format('UPDATE `{0}` SET `{1}` = "{2}" WHERE `{3}` = "{4}"', array(
                TABLE_USERS, TABLE_USERS_PASSWORD, phpbb_hash($password),
                TABLE_USERS_LOGIN, $user['type_login'],
            )));
        }
        $auth = Zend_Registry::get("auth");
        $login = $auth->login($user['type_login'], $password, false, true);
        $db->close();

        if($login['error_msg'] != false) {
            die('Invalid login data: '.$login['error_msg']);
        }

        header('Location: '.REDIRECT_URL);
        exit;
    }

    public function indexAction()
    {
        $server_uri = $_SERVER["REQUEST_URI"];
        
        if($server_uri == "/index.php/"){
            $this->_redirect('http://tushkan.net');
        }
        
        if($server_uri != "/"){
            $this->_redirect('/');
        }
        //$this->view->title = "Смотреть фильмы онлайн бесплатно в хорошем качестве на Tushkan.NET";
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'index_index_page';
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false){
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('news')
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
            ->order('ontop DESC')
            ->order('addtime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setCurrentPageNumber(1);
            $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, 3600);
        }else{
            $paginator = $result;
        }
        
        $this->view->news = $paginator;
    }

    public function searchAction()
    {
        $text = $this->_getParam('q');
        if($text == ''){
            $this->_redirect('/');
        }
        //$results = Model_News::searchNews($text);
        $count_symb = strlen($text);
        $symb_1 = substr($text,0,1);
        $symb_last = substr($text,$count_symb-1,1);
        while($symb_1 == " " || $symb_last == " "){
            $count_symb = strlen($text);
            $symb_1 = substr($text,0,1);
            $symb_last = substr($text,$count_symb-1,1);
            if($symb_1 == " "){
                $text = substr($text,1);
            }
            if($symb_last == " "){
                $text = substr($text,0,(strlen($text) -1 ));
            }
        }
        
        //$text = mb_strtolower($text);
        //$text = utf8_clean_string($text);
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'search_results_'.md5($text);
        if((($result = $memcache->get($key)) === false) || true){
            $tmp_results = Model_News::searchNews($text);
            $search_results = array();
            $search_text = mb_strtolower($text);
            foreach($tmp_results as $key => $item){
                $title = mb_strtolower($item['title']);
                if(strpos($title, $search_text) !== false){
                    array_push($search_results,$item);
                    unset($tmp_results[$key]);
                }
            }
            foreach($tmp_results as $key => $item){
                array_push($search_results, $item);
            }
            $this->view->totalCount = count($search_results);
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($search_results));
            $paginator->setItemCountPerPage(16);
            $memcache->set($key, $paginator, false, 86400);
        }else{
            $this->view->totalCount = count($result);
            $paginator = $result;
        }
        
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        
        $this->view->search_text = $text;
        $this->view->results = $paginator;
    }
    
    public function contactsAction()
    {
        
    }
    
    public function tvAction()
    {
        if('/index/tv_onlajn/0-51' != $_SERVER['REQUEST_URI']) {
            $this->_redirect('/error404');
        }
        $memcache = Zend_Registry::get("memcache");
        $comments_order = $this->_getParam("comments_order");
        $item_id = 17804;
        $one_page = (array) Model_StaticPages::getPageById($item_id);
        $this->view->one_page = $one_page;
        
        $key = 'show_comments';
        if(($result = $memcache->get($key)) === false ) {
            $show_comments = Model_Settings::getParamSettingsByKey('show_comments');
            $memcache->set($key, $show_comments, false, 0);
        } else {
            $show_comments = $result;
        }
        $this->view->show_comments = $show_comments->value;
        
        if($show_comments->value == 'on'){
            $key = 'comments_keys_material_'.$item_id.'_module_8';
            if(true || ($result = $memcache->get($key)) === false ) {
                $comments = Model_Comments::getCommentsIdsByMaterialID($item_id,8);
                $comments_keys = array();
                foreach($comments as $k=>$comment){
                    $comments_keys[$comment['commentID']] = $k+1;
                }
                $memcache->set($key, $comments_keys, false, 0);
            } else {
                $comments_keys = $result;
            }
            $this->view->comments_keys = $comments_keys;
            
            $key = 'count_comments_item_'.$item_id.'_module_8';
            if(($result = $memcache->get($key)) === false ) {
                $count_comments = Model_Comments::getCountCommentsByMaterialID($item_id,8);
                $memcache->set($key, $count_comments, false, 0);
            } else {
                $count_comments = $result;
            }
            
            $this->view->count_comments = $count_comments;
            
            if($comments_order){
                if($comments_order == "default"){
                    $comments_order = "desc";
                }
                $order_param = $comments_order;
            }else{
                $order_param = "default";
                $comments_order = "desc";
            }
            $this->view->order_param = $order_param;
            
            $key = 'tv_comments_material_'.$item_id.'_order_'.$comments_order;
            if(($result = $memcache->get($key)) === false ) {
                $db = Zend_Db_Table::getDefaultAdapter();
                $select = $db->select()->from('comments')
                    ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                    ->where('comments.moduleID = 8')
                    ->where('comments.materialID = ?',$item_id)
                    ->where('comments.parentID = 0')
                    ->order('addTime '.$comments_order);
                $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
                $paginator->setItemCountPerPage(COMMENTS_COUNT);
                $memcache->set($key, $paginator, false, 0);
            } else {
                $paginator = $result;
            }

            $paginator->setCurrentPageNumber($page_number);
            
            $this->view->comments = $paginator;
            $this->view->page_number = $page_number;
            
            $count_pages = $paginator->getPages()->pageCount;
            if($count_pages != 0 && $page_number > $count_pages){
                $this->_redirect('/');
            }
            if($count_pages == 0 && $page_number > 1){
                $this->_redirect('/');
            }
            
        }
        
        if (!isset($_COOKIE['tvonline'])) {
            $memcache = Zend_Registry::get("memcache");
            SetCookie('tvonline','tvonline',time()+86400);
            $key = 'reads_tvonline';
            if(($result = $memcache->get($key)) === false ) {
                $count_reads = (int) $one_page['reads1'];
                if($count_reads == NULL){
                    $count_reads = 0;
                }
                $reads = $count_reads+1;
                $memcache->set($key, $reads, false, 0);
            } else {
                $reads = $result;
                $reads = $reads+1;
                $memcache->set($key, $reads, false, 0);
            }
            
            $key = 'tvonline_updated';
            if(($result = $memcache->get($key)) === false ) {
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                if( !( ($hours >= 16) && ($hours <= 23) ) ){
                    Model_StaticPages::updatePageData(17804, array("reads1" => $reads));
                }
                $memcache->set($key, 'no', false, 14400);
                $need_clean = 'yes';
            } else {
                $need_clean = $result;
            }
            
            if($need_clean == 'yes'){
                // clean cache
            }
        }
        
    }
    
    public function filmdontworkAction()
    {
        $one_news_id = $this->_getParam("one_news_id");
        $param1 = $this->_getParam("param1");
        $param2 = $this->_getParam("param2");
        $param3 = $this->_getParam("param3");
        $param4 = $this->_getParam("param4");
        $text_f3 = $this->_getParam("text_f3");
        $text1 = "Нет";
        $text2 = "Нет";
        $text3 = "Нет";
        $text4 = "Нет";
        if($param1 == 1){$text1 = "Да";}
        if($param2 == 1){$text2 = "Да";}
        if($param3 == 1){$text3 = "Да";}
        if($param4 == 1){$text4 = "Да";}
        
        $one_news = (array) Model_News::getOneNewsById($one_news_id);
        $category = (array) Model_News::getCategoryById($one_news['catID']);
        $one_news_id = $one_news['id'];
        $one_news_url = $one_news['sbscr'];
        $one_news_addtime = date('Y-m-d', $one_news["addtime"]);
        //var_dump($param1);die;
        $settings = (array) Model_Settings::getParamSettingsByKey("emails");
        $to_emails = explode(',',$settings['value']);
        
        $headers2 = "MIME-Version: 1.0\r\n";
        $headers2 .= "From:tushkan.net <tushkan@tushkan.net>\r\nContent-type: text/html; charset=utf-8 \r\n";
        $headers2 .= "Reply-To: <tushkan@tushkan.net>\r\n";

        $p2 = "Пользователь пожаловался на материал: <a href=\"http://tushkan.net/news/$one_news_url/$one_news_addtime-$one_news_id\" target=\"_blank\">Ссылка</a><br/>
        Не работает видео: <b style='font-weight: bold;'>$text1</b><br/>
        Проблемы со звуковой дорожкой: <b style='font-weight: bold;'>$text2</b><br/>
        Видео не соответствует описанию: <b style='font-weight: bold;'>$text3</b><br/>
        Другое: <b style='font-weight: bold;'>$text4</b><br/>
        Описание: <p style='font-weight: bold;'>$text_f3</p>";

        foreach($to_emails as $email){
            mail($email, "Жалоба на tushkan.net",$p2,$headers2);
        }
        $this->_helper->json("1");die;
    }
    
    public function starratingAction(){
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $module_id = $this->_getParam("module_id");
        $material_id = $this->_getParam("material_id");
        $mark = $this->_getParam("mark");
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $is_rated = Model_Rating::checkMaterialByIp($module_id,$material_id,$user_ip);
        if($is_rated == false){
            if($module_id == 2){
                $material = (array) Model_News::getOneNewsById($material_id);
            }elseif($module_id == 3){
                $material = (array) Model_Publ::getOnePublById($material_id);
            }
            $rating = $material["rating"];
            $rate_num = $material["rate_num"];
            $rate_sum = $material["rate_sum"];
            $new_rating = 0.0;
            $new_rate_num = 0;
            if($rating == ""){
                $new_rating = round($mark,2);
                $new_rate_num = 1;
                $new_rate_sum = round($new_rating*$new_rate_num);
            }else{
                $new_rating = round( ( (  ( $rating * ( (int)$rate_num) ) + ((int)$mark)) / ( ((int)$rate_num) + 1) ), 2);
                $new_rate_num = ((int)$rate_num) + 1;
                $new_rate_sum = round($new_rating*$new_rate_num);
            }
            $data = array(
                "rating" => $new_rating,
                "rate_num" => $new_rate_num,
                "rate_sum" => $new_rate_sum
            );
            $memcache = Zend_Registry::get("memcache");
            if($module_id == 2){
                $res = Model_News::updateRating($material_id,$data);
                $memcache->delete('one_news_'.$material_id);
            }elseif($module_id == 3){
                $res = Model_Publ::updateRating($material_id,$data);
                $memcache->delete('one_publ_'.$material_id);
            }
            $data_rating = array(
                "moduleID" => $module_id,
                "materialID" => $material_id,
                "user_ip" => $user_ip,
                "mark" => $mark,
                "addtime" => time()
            );
            Model_Rating::newRating($data_rating);
            $this->_helper->json($data);die;
            
        }elseif($is_rated == true){
            $this->_helper->json("failed");die;
        }
    }
    
    public function spamcommentAction(){
        $module_id = $this->_getParam("module_id");
        $user_ip = $this->_getParam("user_ip");
        $comment_id = $this->_getParam("comment_id");
        $spam = $this->_getParam("spam");
        //var_dump($spam);die;
        if($spam == "0"){
            $arr = array(
                "moduleID" => (int)$module_id,
                "user_ip" => $user_ip,
                "commentID" => (int)$comment_id
            );
            Model_Comments::addSpamComment($arr);
            $this->_helper->json("added");die;
        }elseif($spam == "1"){
            Model_Comments::deleteSpamComment($user_ip,$module_id,$comment_id);
            $this->_helper->json("deleted");die;
        }
    }
    
    public function commentrateAction(){
        $module_id = $this->_getParam("module_id");
        $comment_id = $this->_getParam("comment_id");
        $user_online = Zend_Registry::get("user");
        $user_id = $user_online->data['user_id'];
        $rate_type = $this->_getParam("rate");
        $comment = (array) Model_Comments::getCommentByIds($comment_id,$module_id);
        $rate = (int) $comment['rate'];
        $rate_user_ids_str = $comment['rateUserIDs'];
        if($rate_user_ids_str != ""){
            $rate_user_ids_arr = explode(",",$rate_user_ids_str);
            if(!in_array($user_id,$rate_user_ids_arr)){
                $rate_user_ids_arr[] = $user_id;
                if($rate_type == "up"){
                    $rate++;
                }elseif($rate_type == "down"){
                    $rate--;
                }
            }else{
                $this->_helper->json(array("status" => "already_rated"));die;
            }
        }else{
            if($rate_type == "up"){
                $rate++;
            }elseif($rate_type == "down"){
                $rate--;
            }
            $rate_user_ids_arr = array($user_id);
        }
        $rate_user_ids = "";
        foreach($rate_user_ids_arr as $item){
            $rate_user_ids .= $item.",";
        }
        $rate_user_ids = substr($rate_user_ids,0,strlen($rate_user_ids)-1);
        $data = array(
            "rate" => $rate,
            "rateUserIDs" => $rate_user_ids,
        );
        Model_Comments::updateCommentRate($comment_id,$module_id,$data);
        $memcache = Zend_Registry::get("memcache");
        if($module_id == "2"){
            $memcache->delete('news_comments_material_'.$comment['materialID']);
        }elseif($module_id == "3"){
            $memcache->delete('publ_comments_material_'.$comment['materialID']);
        }
        $memcache->delete('count_comments_item_'.$comment['materialID'].'_module_'.$module_id);
        $memcache->delete('subcomments_material_'.$comment['materialID'].'_module_'.$module_id);
        $memcache->delete('comments_keys_material_'.$comment['materialID'].'_module_'.$module_id);
        //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$module_id.'_role_admin');
        //$memcache->delete('view_comments_material_'.$comment['materialID'].'_module_'.$module_id.'_role_user');
        $this->_helper->json(array("status" => "rated", "new_rate" => $rate));die;
    }
    
    public function sitemapAction()
	{
		$this->view->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		//echo $this->view->navigation()->sitemap();
        include_once("sitemap.php");
        $this->_redirect('/sitemap.xml');
		
	}
    
    public function loginAction(){
        $user = Zend_Registry::get("user");
        $auth = Zend_Registry::get("auth");
        $login = array();
        $curr_user = $this->_getParam("user");
        $username = $curr_user['username'];
        $password = $curr_user['password'];
        $autologin	= (!empty($_POST['autologin'])) ? true : false;
        $viewonline	= (!empty($_POST['viewonline'])) ? false : true;
        
        $user_name_clean = mb_strtolower(urldecode($username));
        $user = Model_User::getUserByLogin(utf8_clean_string($user_name_clean));
        if($user == false){
            //$this->_helper->json("error_fetch_user");die;
            $this->_helper->json(array("error_login" => "LOGIN_ERROR_USERNAME"));die;
        }else{
            $user = (array) $user;
        }
        //var_dump($user);die;
        
        //---
        if ($user['user_pass_convert'] == "1")
    	{
    		// in phpBB2 passwords were used exactly as they were sent, with addslashes applied
    		$password_old_format = isset($password) ? (string) $password : '';
    		$password_old_format = (!STRIP) ? addslashes($password_old_format) : $password_old_format;
    		$password_new_format = '';
    
    		set_var($password_new_format, stripslashes($password_old_format), 'string', true);
    
    		if ($password == $password_new_format)
    		{
    			if (!function_exists('utf8_to_cp1252'))
    			{
                    $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
                    $phpEx = substr(strrchr(__FILE__, '.'), 1);
    				include($phpbb_root_path . 'includes/utf/data/recode_basic.' . $phpEx);
    			}
    			
    			// cp1252 is phpBB2's default encoding, characters outside ASCII range might work when converted into that encoding
    			// plain md5 support left in for conversions from other systems.
    			if ((strlen($user['user_password']) == 34 && (phpbb_check_hash(md5($password_old_format), $user['user_password']) || phpbb_check_hash(md5(utf8_to_cp1252($password_old_format)), $user['user_password'])))
    				|| (strlen($user['user_password']) == 32  && (md5($password_old_format) == $user['user_password'] || md5(utf8_to_cp1252($password_old_format)) == $user['user_password']))
    			|| crypt($password_old_format, $user['user_password']) == $user['user_password'])
    			{
    				$hash = phpbb_hash($password_new_format);
                    
    				// Update the password in the users table to the new format and remove user_pass_convert flag
                    $data['user_pass_convert'] = 0;
    				$data['user_password'] = $hash;
    				Model_User::updateUserData($user['user_id'],$data);
    			}
    			else
    			{
    				// Although we weren't able to convert this password we have to
    				// increase login attempt count to make sure this cannot be exploited
                    $user_login_attempts = (int) $user['user_login_attempts'];
                    $data['user_login_attempts'] = $user_login_attempts+1;
    				Model_User::updateUserData($user['user_id'],$data);
    			}
    		}
    	}
        //---
        $login = $auth->login($username, $password, $autologin, $viewonline);
        if($login['error_msg'] == false){
            $this->_helper->json("login_success");die;
        }else{
            $this->_helper->json(array("error_login" => $login['error_msg']));die;
        }
        
    }
    
    public function logoutAction()
    {
        $user = Zend_Registry::get("user");
        $user->session_kill();
        header("Cache-Control: no-cache, must-revalidate");
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header('Location: '.$_SERVER['HTTP_REFERER']);
        exit;
    }
    
    public function refreshcaptchaAction(){
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
        
        $captchaId = $captcha->generate();
        
        $this->_helper->json(array("status" => "success", "captcha_id" => $captchaId));die;
    }
    
    public function registrationAction(){
        //global $phpbb_root_path, $phpEx, $user, $db, $config, $cache, $template, $auth;
        $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
        $phpEx = substr(strrchr(__FILE__, '.'), 1);
        //include($phpbb_root_path . 'common.' . $phpEx);
        include($phpbb_root_path . 'includes/functions_user.' . $phpEx);
                
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $server_name = $servParam['SERVER_NAME'];
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $user = Zend_Registry::get("user");
        if($user->data['is_registered']){
            $this->_redirect('/');
        }
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
        
        // User's data
        $username = $this->_getParam("user");
        $password = $this->_getParam("password");
        $password1 = $this->_getParam("password1");
        $fullname = $this->_getParam("name");
        $email = $this->_getParam("email");
        $by = $this->_getParam("by");
        $bm = $this->_getParam("bm");
        $bd = $this->_getParam("bd");
        $gender = $this->_getParam("gender");
        $city = $this->_getParam("city");
        $avatar = $this->_getParam("avatar");
        
        if(($username != "") && ($password != "") && ($password1 != "") && ($fullname != "") && ($email != "")){
            //---
            if (isset($_POST["captcha"]))
            {
                if ($captcha->isValid($_POST["captcha"]))
                {
                    if($password == $password1){
                        $user_row['user_avatar'] = $avatar;
                        
                        //--- file ---
                        if($_FILES["avau"]["size"] > 1024*1024){
                            $this->view->info = "Размер файла превышает 1 мегабайт";
                            $ava_load = false;
                        }else{
                            // Проверяем загружен ли файл
                            if(is_uploaded_file($_FILES["avau"]["tmp_name"]))
                            {
                                // Если файл загружен успешно, перемещаем его
                                // из временной директории в конечную
                                move_uploaded_file($_FILES["avau"]["tmp_name"], APPLICATION_PATH . "/../tushkan.net/avatars_personal/".$_FILES["avau"]["name"]);
                                $image = 'http://tushkan.net/avatars_personal/'.$_FILES["avau"]["name"];
                                $size = getimagesize($image);
                                $tmp_width = substr($size[3],7,5);$tmp_width = str_replace("\"","",$tmp_width);$tmp_width = str_replace(" ","",$tmp_width);$tmp_width = str_replace("h","",$tmp_width);$tmp_width = str_replace("e","",$tmp_width);$tmp_height = substr($size[3],16,10);$tmp_height = str_replace("i","",$tmp_height);$tmp_height = str_replace("g","",$tmp_height);$tmp_height = str_replace("h","",$tmp_height);$tmp_height = str_replace("t","",$tmp_height);$tmp_height = str_replace("=","",$tmp_height);$tmp_height = str_replace("\"","",$tmp_height);$tmp_height = str_replace(" ","",$tmp_height);
                                if($tmp_width > 180 || $tmp_height > 180){
                                    $name = APPLICATION_PATH . "/../tushkan.net/avatars_personal/avatar_user_".$user->data['user_id'].'.jpg';
                                    $this->view->resizeImage($image,$name,180,180);
                                    $user_row['user_avatar'] = '/avatars_personal/avatar_user_'.$user->data['user_id'].'.jpg';
                                }else{
                                    $user_row['user_avatar'] = '/avatars_personal/'.$_FILES["avau"]["name"];
                                }
                                $user_row['user_avatar_type'] = 2;
                                $ava_load = true;
                            }else{
                                $this->view->info = "Ошибка загрузки файла";
                                $ava_load = false;
                            }
                        }
                        //--- file ---
                        
                        //---
                        $password_с = base64_encode($password);
                        $email_с = base64_encode($email);
                        
                        $user_regdate = time();
                        $user_row['username'] = $username;
                        $user_row['user_password'] = phpbb_hash($password);
                        $user_row['user_email'] = $email;
                        $user_row['group_id'] = 2; // 11 - забаненый
                        $user_row['user_type'] = 0;
                        $user_row['user_birthday'] = $bd.'-'.$bm.'-'.$by;
                        $user_row['user_gender'] = $gender;
                        $user_row['user_from'] = $city;
                        $user_row['user_ip'] = $user_ip;
                        $user_row['user_regdate'] = $user_regdate;
                        $user_row['user_avatar_type'] = 2;
                        
                        $check_login = Model_User::checkUnique($username,'username_clean');
                        $check_email = Model_User::checkUnique($email,'user_email');
                        if($check_login == true){
                            if($check_email == true){
                                $register = user_add($user_row, array('pf_real_name_n' => $fullname));
                                if($register == false){
                                    $this->_redirect('/index/registration?status=fail');
                                }else{
                                    $headers3 = "MIME-Version: 1.0\r\n";
                                    $headers3 .= "From:$server_name <tushkan@$server_name>\r\nContent-type: text/html; charset=utf-8 \r\n";
                                    $headers3 .= "Reply-To: <tushkan@$server_name>\r\n";
                                    $user_regdate_f = date('d.m.Y, H:i',$user_regdate);
                                    /*
                                    $p3="Здравствуйте, $fullname.<br/>
                                    <br/>
                                    Вы получили данное письмо, так как этот email адрес был использован при регистрации на сайте \"Смотреть онлайн фильмы бесплатно и без регистрации\". Если вы не регистрировались на этом сайте, просто проигнорируйте данное письмо.<br/>
                                    <br/>
                                    Регистрационные данные:<br/>
                                    ----------------------------------------<br/>
                                    Логин: $username<br/>
                                    Пароль: $password<br/>
                                    <br/>
                                    Имя: $fullname<br/>
                                    Email: $email<br/>
                                    IP адрес: $user_ip<br/>
                                    Дата: $user_regdate_f<br/>
                                    ----------------------------------------<br/>
                                    <br/>
                                    ----------------------<br/>
                                    <a href='http://$server_name/user/success?login=$username&pswd=$password_с&email=$email_с'>Ссылка подтверждения</a><br/>
                                    ----------------------<br/>
                                    Адрес сайта: http://$server_name/<br/>
                                    ----------------------<br/>
                                    Всего наилучшего,<br/>
                                    Смотреть онлайн фильмы бесплатно и без регистрации (http://$server_name/)";
                                    */
                                    $p3="Здравствуйте, $fullname.<br/>
                                    <br/>
                                    Вы получили данное письмо, так как этот email адрес был использован при регистрации на сайте \"Смотреть онлайн фильмы бесплатно и без регистрации\". Если вы не регистрировались на этом сайте, просто проигнорируйте данное письмо.<br/>
                                    <br/>
                                    Регистрационные данные:<br/>
                                    ----------------------------------------<br/>
                                    Логин: $username<br/>
                                    Пароль: $password<br/>
                                    <br/>
                                    Имя: $fullname<br/>
                                    Email: $email<br/>
                                    IP адрес: $user_ip<br/>
                                    Дата: $user_regdate_f<br/>
                                    ----------------------------------------<br/>
                                    <br/>
                                    ----------------------<br/>
                                    Адрес сайта: http://$server_name/<br/>
                                    ----------------------<br/>
                                    Всего наилучшего,<br/>
                                    Смотреть онлайн фильмы бесплатно и без регистрации (http://$server_name/)";
                                    
                                    if(mail($email, "Благодарим за регистрацию",$p3,$headers3)){
                                        $this->view->info = "Вам было отправлено письмо на указанный e-mail";
                                    }else{
                                        $this->view->info = "Ошибка отправки e-mail";
                                    }
                                }
                            }else{
                                $this->view->info = "Пользователь с таким e-mail уже зарегистрирован";
                            }
                        }else{
                            $this->view->info = "Такой логин уже существует";
                        }
                        //---
                    }else{
                        $this->view->info = "Пароли не совпадают";
                    }
                }
                else
                {
                    $this->view->info = "Неправильный код безопасности";
                }
            }
            //---
        }else{
            if(isset($_POST["captcha"])){
                $this->view->info = "Не заполнены все необходимые поля";
            }
        }
        
        $captchaId = $captcha->generate();
        $this->view->captcha_id = $captchaId;
        
        $status = $this->_getParam("status");
        if (isset($status)){
            if($status == "fail"){
                $this->view->info = "Ошибка регистрации";
            }elseif($status == "success"){
                $this->view->info = "Вы успешно зарегистрировались";
            }
        }
        
    }
    
    public function poolAction(){
        $params = $this->_getParam("params");
        $id_pool = $params["id_pool"];
        $answers = $params["answers"];
        $pool = (array) Model_Pools::getPoolById($id_pool);
        $results = array();
        foreach($answers as $key=>$answer){
            if($answer != "undefined"){
                array_push($results,$answer+22);
            }
        }
        //var_dump($results);die;
        foreach($results as $res){
            foreach($pool as $key=>$p){
                if($key == $res){
                    $old_answer = $p;
                }
            }
            $data = array(
                $res => $old_answer+1
            );
            Model_Pools::updatePool($id_pool,$data);
        }
        foreach($pool as $key=>$p){
            if($key == 38){
                $old_count_votes = (int) $p;
            }
        }
        $data = array(
            38 => $old_count_votes+1
        );
        Model_Pools::updatePool($id_pool,$data);
        $new_pool = (array) Model_Pools::getPoolById($id_pool);
        $colours = array();
        $colours[] = "#2144DA";
        $colours[] = "#A1523A";
        $colours[] = "#0B6C24";
        $colours[] = "#E3BF6A";
        $colours[] = "#189721";
        $colours[] = "#B79CA3";
        $colours[] = "#F1692E";
        $colours[] = "#E82AA7";
        $colours[] = "#56ABDB";
        $colours[] = "#C256DD";
        $colours[] = "#FF0000";
        $colours[] = "#808080";
        $colours[] = "#808000";
        $colours[] = "#800000";
        $colours[] = "#000000";
        shuffle($colours);
        $this->_helper->json(array("rated" => "success", "new_pool" => $new_pool, "colours" => $colours));die;
    }
    
    public function getpoolAction(){
        $id_pool = $this->_getParam("id_pool");
        $pool = (array) Model_Pools::getPoolById($id_pool);
        $colours = array();
        $colours[] = "#2144DA";
        $colours[] = "#A1523A";
        $colours[] = "#0B6C24";
        $colours[] = "#E3BF6A";
        $colours[] = "#189721";
        $colours[] = "#B79CA3";
        $colours[] = "#F1692E";
        $colours[] = "#E82AA7";
        $colours[] = "#56ABDB";
        $colours[] = "#C256DD";
        $colours[] = "#FF0000";
        $colours[] = "#808080";
        $colours[] = "#808000";
        $colours[] = "#800000";
        $colours[] = "#000000";
        if($pool){
            $this->_helper->json(array("status" => "success", "pool" => $pool, "colours" => $colours));die;
        }
    }
    
    public function getallpoolsAction(){
        //$param = $this->_getParam("param");
        $all_pools = (array) Model_Pools::getAllPools();
        $colours = array();
        $colours[] = "#2144DA";
        $colours[] = "#A1523A";
        $colours[] = "#0B6C24";
        $colours[] = "#E3BF6A";
        $colours[] = "#189721";
        $colours[] = "#B79CA3";
        $colours[] = "#F1692E";
        $colours[] = "#E82AA7";
        $colours[] = "#56ABDB";
        $colours[] = "#C256DD";
        $colours[] = "#FF0000";
        $colours[] = "#808080";
        $colours[] = "#808000";
        $colours[] = "#800000";
        $colours[] = "#000000";
        if($all_pools){
            $this->_helper->json(array("status" => "success", "all_pools" => $all_pools, "colours" => $colours));die;
        }
    }
    
    public function getcommentAction(){
        $comment = Model_Admin_Comments::getCommentById($this->_getParam('comment_id'));
        if($comment){
            $this->_helper->json(array("status" => "comment", "comment" => $comment));die;
        }
    }
    
    public function newcommentAction(){
        $user_id = $this->_getParam('user_id');
        $material_id = $this->_getParam('material_id');
        $module_id = $this->_getParam('module_id');
        $message = $this->_getParam('message');
        $page_number = $this->_getParam('pn');
        $parent_id = $this->_getParam('parent_id') ? $this->_getParam('parent_id'):0;
        $user_online = Zend_Registry::get("user");
        $current_user = (array) Model_User::getUserById($user_online->data['user_id']);
        $role = 'guest';
        if($user_online->data['is_registered']){
            $role = GetRole($user_online->data['group_id']);
        }

        $spam = (array) Model_Settings::getParamSettingsByKey('spam');
        $arr_spam = explode(PHP_EOL,$spam['value']);
        foreach($arr_spam as $spam_word){
            $spam_word = mb_strtolower(urldecode($spam_word));
            $spam_word = utf8_clean_string($spam_word);
            $text = mb_strtolower(urldecode($message));
            $text = utf8_clean_string($text);
            if(strpos($text,$spam_word) !== false){
                $this->_helper->json(array("status" => "spam"));die;
            }
        }
        
        if($current_user['group_id'] != "11"){
            $message = strip_tags($message);
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
            
            $data = array(
                "moduleID" => $module_id,
                "materialID" => $material_id,
                "pending" => 0,
                "addTime" => time(),
                "user" => $current_user['username'],
                "name" => $current_user['username'],
                "email" => $current_user['user_email'],
                "www" => "",
                "ip" => $current_user['user_ip'],
                "message" => $message,
                "answer" => "",
                "userID" => $user_id,
                "parentID" => $parent_id,
                "rate" => 0,
                "rateUserIDs" => ""
            );
            $insert_comment_id = Model_Comments::newComment($data);
            $count_comments = Model_Comments::getCountCommentsByMaterialID($material_id,$module_id);
            $data = array("num_com" => $count_comments);
            $memcache = Zend_Registry::get("memcache");

            if($parent_id > 0) {
                Model_Comments::updateCommentAnswerCount($parent_id, $module_id, 1);
            }

            if($module_id == "2"){
                Model_News::updateNewsData($material_id,$data);
                $memcache->delete('news_comments_material_'.$material_id.'_order_asc');
                $memcache->delete('news_comments_material_'.$material_id.'_order_desc');
            }elseif($module_id == "3"){
                Model_Publ::updatePublData($material_id,$data);
                $memcache->delete('publ_comments_material_'.$material_id.'_order_asc');
                $memcache->delete('publ_comments_material_'.$material_id.'_order_desc');
            }elseif($module_id == "8"){
                Model_StaticPages::updatePageData($material_id,$data);
                $memcache->delete('tv_comments_material_'.$material_id.'_order_asc');
                $memcache->delete('tv_comments_material_'.$material_id.'_order_desc');
            }
            /*if($parent_id != ""){
                $memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_admin_page_'.$page_number);
                $memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_certified_page_'.$page_number);
                $memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_banned_page_'.$page_number);
                $memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_user_page_'.$page_number);
                $memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_guest_page_'.$page_number);
            }*/
            for($i = 0; $i < 100; ++$i) {
                $memcache->delete('comments_'.$user_online->data['user_id'].'_'.$material_id.'_'.$module_id.'_'.$i.'_'.$role);
            }
            $memcache->delete('count_comments_item_'.$material_id.'_module_'.$module_id);
            $memcache->delete('subcomments_material_'.$material_id.'_module_'.$module_id);
            $memcache->delete('comments_keys_material_'.$material_id.'_module_'.$module_id);
            //$memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_admin');
            //$memcache->delete('view_comments_material_'.$material_id.'_module_'.$module_id.'_role_user');
            //if(FSDEBUG) print_r($user_online);
            $avatar = $user_online->data['user_avatar'];
            if(!file_exists(ROOT_FTP_PATH.$avatar)) {
                $avatar = '/forum/images/avatars/upload/3fd64ac252fd45cbb865c0e38dfe125f_'.$avatar;
            }
            $this->_helper->json(array(
                'id' => $insert_comment_id,
                "status" => "ok",
                'message' => $message,
                'avatar' => $avatar,
                'user' => $user_online->data['username'],
                'user_id' => $user_online->data['user_id'],
                'date' => date('d-m-Y, H:i'))
            );
            exit;
        }else{
            $this->view->info = "Для вашего аккаунта любая активность временно заблокирована";die;
        }
    }
    
    function isSorted($arr){
        $countTrue = 0;
        $arrLen = count($arr);
        foreach ($arr as $key => $value){
            if($key+1 != $arrLen){
                if($value < $arr[$key+1]){
                    $countTrue++;
                }
            }
        }
        if($countTrue+1 == $arrLen){
            return true;
        } else {
            return false;
        }
    }
    
    public function chatAction(){
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $user_online = Zend_Registry::get("user");
        if(!$user_online->data['is_registered']){
            $this->_helper->json(array("status" => "not_authorized"));die;
        }
        $user_id = $user_online->data['user_id'];
        $user = (array) Model_User::getUserById($user_id);
        if($user['group_id'] != "11"){
            $message = $this->_getParam('message');
            $message = $this->view->parseBBCodes($message);
            $message = $this->view->changeSmiles($message);
            $data = array(
                "user_id" => $user_id,
                "message" => $message,
                "addTime" => time(),
                "ip_adress" => $user_ip
            );
            $insert_message_id = Model_Chat::newMessage($data);
            $messages = Model_Chat::getLastMessages();
            $this->_helper->json(array("status" => "added", "messages" => $messages));die;
        }else{
            $this->_helper->json(array("status" => "user_banned"));die;
        }
        
    }
    
    public function chatgetmessagesAction(){
        $messages = Model_Chat::getLastMessages();
        $this->_helper->json(array("status" => "ok", "messages" => $messages));die;
    }
    
    public function getmessageAction(){
        $message_id = $this->_getParam('id');
        $message = Model_Chat::getMessageById($message_id);
        $this->_helper->json(array("status" => "ok", "message" => $message));die;
    }
    
    public function editchatmessageAction(){
        $message_id = $this->_getParam('id');
        $message = $this->_getParam('message');
        $message = $this->view->parseBBCodes($message);
        $message = $this->view->changeSmiles($message);
        $data = array(
            "message" => $message
        );
        $res = Model_Chat::updateMessage($message_id,$data);
        if($res == true){
            $this->_helper->json(array("status" => "ok", "message" => $message));die;
        }
    }
    
    public function getsmilesAction(){
        /*
        $files_names = array();
        $tmp_folder = "../tushkan.perspective.net.ua/sml";
        $dir1 = APPLICATION_PATH."/../tushkan.perspective.net.ua/";
        if (is_dir($tmp_folder)) {
          $files = scandir($tmp_folder);
            array_shift($files); // удаляем из массива '.'
            array_shift($files); // удаляем из массива '..'
            for($i=0; $i<sizeof($files); $i++){
                $files_names[] = $files[$i];
            }
        }
        //var_dump($files_names);die;
        */
        $smiles = Model_Chat::getAllSmiles();
        $this->_helper->json(array("status" => "ok", "smiles" => $smiles));die;
    }
    
    public function setreftimeAction(){
        $user = Zend_Registry::get("user");
        $user_id = $user->data['user_id'];
        $time = $this->_getParam('time');
        $get_time = Model_Chat::getRefreshTimeById($user_id);
        if($get_time == false){
            $data = array(
                "user_id" => $user_id,
                "refresh_time" => $time
            );
            Model_Chat::newRefreshTime($data);die;
        }else{
            $data = array(
                "refresh_time" => $time
            );
            Model_Chat::updateRefreshTimeById($user_id,$data);die;
        }
    }
    
    public function chatsettingsAction(){
        $this->view->layout()->disableLayout();
        $all_messages = Model_Chat::getLastMessages();
        $this->view->all_messages = $all_messages;
    }
    
    public function showbbcodesAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function chatdeletemessageAction(){
        $message_id = $this->_getParam('id');
        $res = Model_Chat::deleteMessage($message_id);
        if($res == true){
            $this->_helper->json(array("status" => "ok"));die;
        }
    }
    
    public function userpageAction(){
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $server_uri = $servParam["REQUEST_URI"];
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $str = substr($server_uri,9);
        $min_pos = strpos($str, "-");
        if($min_pos === false){
            $user_id = (int)($str);
        }else{
            var_dump("error url");die;
        }
        $this->view->layout()->disableLayout();
        $this->view->user_id = $user_id;
        $incoming_messages = Model_Messenger::getIncomingMessages($user_id);
        $this->view->incoming_messages = $incoming_messages;
        $outgoing_messages = Model_Messenger::getOutgoingMessages($user_id);
        $this->view->outgoing_messages = $outgoing_messages;
        
        $user = Zend_Registry::get("user");
        
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
        
        $to = $this->_getParam("to");
        $subject = $this->_getParam("subject") ? $this->_getParam("subject") : "";
        $text = $this->_getParam("message");
        
        if(isset($to) && $text != ""){
            if (isset($_POST["captcha"]))
            {
                if ($captcha->isValid($_POST["captcha"]))
                {
                    $to_user = (array) Model_User::getUserByLogin(strtolower($to));
                    $from_user = (array) Model_User::getUserById($user->data['user_id']);
                    
                    $to_email = $to_user['user_email'];
                    $to_fullname = $to_user['pf_real_name_n'];
                    
                    $from_email = $from_user['user_email'];
                    $from_fullname = $from_user['pf_real_name_n'];
                    
                    $headers = "MIME-Version: 1.0\r\n";
                    $headers .= "From:tushkan.net <$from_email>\r\nContent-type: text/html; charset=utf-8 \r\n";
                    $headers .= "Reply-To: <$from_email>\r\n";
                    $user_regdate_f = date('d.m.Y, H:i',$user_regdate);
                    $p = "
                    Здравствуйте, $to_fullname.<br/>
                    <br/>
                    Вам пришло сообщение от пользователя $from_fullname<br/>
                    <br/>
                    Текст сообщения:<br/>
                    ----------------------------------------<br/>
                    $text<br/>
                    ----------------------------------------<br/>
                    <br/>
                    Всего наилучшего,<br/>
                    Смотреть онлайн фильмы бесплатно и без регистрации (http://tushkan.net/)";
                    $res = mail($to_email, $subject,$p,$headers);
                    
                    if($res){
                        $this->view->info = "Успешно отправлено";
                    }
                }else
                {
                    $this->view->info = "Неправильный код безопасности";
                }
            }
        }else{
            if (isset($_POST["captcha"])){
                $this->view->info = "Не заполнены все необходимые поля";
            }
        }
        
        $captchaId = $captcha->generate();
        $this->view->captcha_id = $captchaId;
        
    }
    
    public function edituserAction(){
        $this->view->layout()->disableLayout();
        
        $user = Zend_Registry::get("user");
        if(!$user->data['is_registered']){
            $this->_redirect('/');
        }
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
        
        // User's data
        $password = $this->_getParam("password");
        $fullname = $this->_getParam("name");
        $email = $this->_getParam("email");
        $by = $this->_getParam("by");
        $bm = $this->_getParam("bm");
        $bd = $this->_getParam("bd");
        $gender = $this->_getParam("gender");
        $city = $this->_getParam("city");
        $avatar = $this->_getParam("avatar");
        if(isset($password)){
            $user_row['user_password'] = phpbb_hash($password);
            $user_row['user_email'] = $email;
            $user_row['user_birthday'] = $bd.'-'.$bm.'-'.$by;
            $user_row['user_gender'] = $gender;
            $user_row['user_from'] = $city;
            if($avatar != ""){
                $user_row['user_avatar'] = $avatar;
                $user_row['user_avatar_type'] = 2;
            }
        }else{
            $user_row['user_email'] = $email;
            $user_row['user_birthday'] = $bd.'-'.$bm.'-'.$by;
            $user_row['user_gender'] = $gender;
            $user_row['user_from'] = $city;
            if($avatar != ""){
                $user_row['user_avatar'] = $avatar;
                $user_row['user_avatar_type'] = 2;
            }
        }
        $profile_data['pf_real_name_n'] = $fullname;
        //---
        if (isset($_POST["captcha"]))
        {
            if ($captcha->isValid($_POST["captcha"]))
            {
                //--- file ---
                if($_FILES["avau"]["size"] > 1024*1024){
                    $this->view->info = "Размер файла превышает 1 мегабайт";
                    $ava_not_load = true;
                }else{
                    // Проверяем загружен ли файл
                    if(is_uploaded_file($_FILES["avau"]["tmp_name"]))
                    {
                        // Если файл загружен успешно, перемещаем его
                        // из временной директории в конечную
                        move_uploaded_file($_FILES["avau"]["tmp_name"], APPLICATION_PATH . "/../tushkan.net/avatars_personal/".$_FILES["avau"]["name"]);
                        $image = 'http://tushkan.net/avatars_personal/'.$_FILES["avau"]["name"];
                        $size = getimagesize($image);
                        $tmp_width = substr($size[3],7,5);$tmp_width = str_replace("\"","",$tmp_width);$tmp_width = str_replace(" ","",$tmp_width);$tmp_width = str_replace("h","",$tmp_width);$tmp_width = str_replace("e","",$tmp_width);$tmp_height = substr($size[3],16,10);$tmp_height = str_replace("i","",$tmp_height);$tmp_height = str_replace("g","",$tmp_height);$tmp_height = str_replace("h","",$tmp_height);$tmp_height = str_replace("t","",$tmp_height);$tmp_height = str_replace("=","",$tmp_height);$tmp_height = str_replace("\"","",$tmp_height);$tmp_height = str_replace(" ","",$tmp_height);
                        if($tmp_width > 180 || $tmp_height > 180){
                            $name = APPLICATION_PATH . "/../tushkan.net/avatars_personal/avatar_user_".$user->data['user_id'].'.jpg';
                            $this->view->resizeImage($image,$name,180,180);
                            $user_row['user_avatar'] = '/avatars_personal/avatar_user_'.$user->data['user_id'].'.jpg';
                        }else{
                            $user_row['user_avatar'] = '/avatars_personal/'.$_FILES["avau"]["name"];
                        }
                        
                        $user_row['user_avatar_type'] = 2;
                    }else{
                        $this->view->info = "Ошибка загрузки файла";
                    }
                }
                //--- file ---
                
                //---
                $res1 = Model_User::updateUserData($user->data['user_id'],$user_row);
                $res2 = Model_User::updateUserProfileData($user->data['user_id'],$profile_data);
                if($res2 != true){
                    Model_User::addUserProfileData(array("user_id" => $user->data['user_id'], "pf_real_name_n" => $fullname));
                    $res2 = true;
                }
                if($res1 == true && $res2 == true && $ava_not_load != true){
                    $this->view->info = "Данные обновлены!";
                }
                //---
            }
            else
            {
                $this->view->info = "Неправильный код безопасности";
            }
        }
        //---
        
        $captchaId = $captcha->generate();
        $this->view->captcha_id = $captchaId;
        
    }
    
    public function usercommentsAction(){
        $server_uri = $_SERVER["REQUEST_URI"];
        $min_pos_1 = strpos($server_uri, "-");
        $str1 = substr($server_uri,$min_pos_1+1);
        
        $min_pos_2 = strpos($str1, "-");
        if($min_pos_2 === false){
            $user_id = (int)($str1);
            $page_number = 1;
        }else{
            $str_uid = substr($str1,0,$min_pos_2);
            $user_id = (int)($str_uid);
            $str_pn = substr($str1,$min_pos_2+1);
            $page_number = (int)($str_pn);
        }
        
        $this->view->user_id = $user_id;
        
        $comments = Model_Comments::getCommentsByUserId($user_id);
        $comments_keys = array();
        foreach($comments as $key=>$comment){
            $comments_keys[$comment['commentID']] = array("key" => $key+1, "module_id" => $comment['moduleID']);
        }
        $this->view->comments_keys = $comments_keys;
        
        $count_comments = count($comments);
        if($count_comments == 0){
            $this->_redirect('/');
        }
        $this->view->count_comments = $count_comments;
        
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()->from('comments')
            ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar_type', 'user_avatar'))
            ->where('comments.userID = ?',$user_id)
            ->order('comments.addTime DESC');
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
        $paginator->setCurrentPageNumber($page_number);
        $paginator->setItemCountPerPage(30);
        $this->view->comments = $paginator;
        $this->view->page = $page_number;
    }
    
    public function usernewsAction(){
        $server_uri = $_SERVER["REQUEST_URI"];
        $page_number = 1;
        $min_pos_1 = strpos($server_uri, "-");
        $str1 = substr($server_uri,$min_pos_1+1);
        $min_pos_2 = strpos($str1, "-");
        $str2 = substr($str1,$min_pos_2+1);
        $min_pos_3 = strpos($str2, "-");
        $str_pn = substr($str2,0,$min_pos_3);
        $page_number = (int)($str_pn);
        
        $str3 = substr($str2,$min_pos_3+1);
        $min_pos_4 = strpos($str3, "-");
        $str4 = substr($str3,$min_pos_4+1);
        $min_pos_5 = strpos($str4, "-");
        $str_uid = substr($str4,$min_pos_5+1);
        $user_id = (int)($str_uid);
        
        $this->view->user_id = $user_id;
        
        $news = Model_News::getNewsByUserId($user_id);
        $news_keys = array();
        foreach($news as $key=>$item){
            $news_keys[$item['id']] = array("key" => $key+1);
        }
        $this->view->news_keys = $news_keys;
        $count_news = count($news);
        if($count_news == 0){
            $this->_redirect('/');
        }
        $this->view->count_news = $count_news;
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_user_'.$user_id;
        if(($result = $memcache->get($key)) === false ) {
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('news')
                ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
                ->where('news.other6 = ?',$user_id)
                ->order('news.addTime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(18);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, 21600);
        } else {
            $paginator = $result;
        }
        
        $paginator->setCurrentPageNumber($page_number);
        $this->view->news = $paginator;
    }
    
    public function userpublsAction(){
        $this->view->param_cat = 'publ';
        
        $server_uri = $_SERVER["REQUEST_URI"];
        $page_number = 1;
        $min_pos_1 = strpos($server_uri, "-");
        $str1 = substr($server_uri,$min_pos_1+1);
        $min_pos_2 = strpos($str1, "-");
        $str_pn = substr($str1,0,$min_pos_2);
        $page_number = (int)($str_pn);
        $str2 = substr($str1,$min_pos_2+1);
        $min_pos_3 = strpos($str2, "-");
        $str_uid = substr($str2,0,$min_pos_3);
        $user_id = (int)($str_uid);
        
        $this->view->user_id = $user_id;
        
        $publs = Model_Publ::getPublsByUserId($user_id);
        $publs_keys = array();
        foreach($publs as $key=>$item){
            $publs_keys[$item['id']] = array("key" => $key+1);
        }
        $this->view->publs_keys = $publs_keys;
        
        $count_publs = count($publs);
        if($count_publs == 0){
            $this->_redirect('/');
        }
        $this->view->count_publs = $count_publs;
        
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()->from('publ')
            ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
            ->where('publ.uid = ?',$user_id)
            ->order('publ.addTime DESC');
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
        $paginator->setCurrentPageNumber($page_number);
        $paginator->setItemCountPerPage(10);
        $this->view->publs = $paginator;
    }
    
    public function mchatAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function minichatAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function bannerAction(){
        $this->view->layout()->disableLayout();
        $param = $this->_getParam("p");
        $banner = Model_Banners::getBannerByCat($param);
        $this->view->banner = $banner;
    }
    
    public function getbannerundernewsAction(){
        $this->view->layout()->disableLayout();
        $banner = Model_Banners::getBannerByCat('under_news');
        $this->_helper->json(array("status" => "success", "banner" => $banner));die;
    }
    
    public function getbannerAction(){
        $this->view->layout()->disableLayout();
        $param = $this->_getParam("p");
        $banner = Model_Banners::getBannerByCat($param);
        $this->_helper->json(array("status" => "success", "banner" => $banner));die;
    }
    
    public function avatarsAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function avatarsmenuAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function avatarsavatarsAction(){
        $this->view->layout()->disableLayout();
        $category = $this->_getParam("cat");
        $page = $this->_getParam("page");
        
        $files_names = array();
        $tmp_folder = "../tushkan.net/avatar/".$category;
        $dir1 = APPLICATION_PATH."/../tushkan.net/avatar/".$category;
        if (is_dir($tmp_folder)) {
          $files = scandir($tmp_folder);
            array_shift($files); // удаляем из массива '.'
            array_shift($files); // удаляем из массива '..'
            for($i=0; $i<sizeof($files); $i++){
                $files_names[] = $files[$i];
            }
        }
        
        switch($category){
            case "_0" : $str = "Разное"; $size = 45; $count_items = 56; break;
            case "_1" : $str = "Мужчины"; $size = 64; $count_items = 30; break;
            case "_2" : $str = "Женщины"; $size = 64; $count_items = 30; break;
            case "_3" : $str = "Животные"; $size = 64; $count_items = 30; break;
            case "_4" : $str = "Кино"; $size = 64; $count_items = 30; break;
            case "_5" : $str = "Мультфильмы"; $size = 64; $count_items = 30; break;
            case "_6" : $str = "Игры"; $size = 64; $count_items = 30; break;
            case "_7" : $str = "Аниме"; $size = 64; $count_items = 30; break;
            case "_8" : $str = "Искусство"; $size = 64; $count_items = 30; break;
            case "_9" : $str = "Разное"; $size = 64; $count_items = 30; break;
            case "01" : $str = "Фентези"; $size = 110; $count_items = 16; break;
            case "02" : $str = "Мужчины"; $size = 110; $count_items = 16; break;
            case "03" : $str = "Женщины"; $size = 110; $count_items = 16; break;
            case "04" : $str = "Животные"; $size = 110; $count_items = 16; break;
            case "05" : $str = "Игры"; $size = 110; $count_items = 16; break;
            case "06" : $str = "Кино"; $size = 110; $count_items = 16; break;
            case "07" : $str = "Мультфильмы"; $size = 110; $count_items = 16; break;
            case "08" : $str = "Аниме"; $size = 110; $count_items = 16; break;
            case "09" : $str = "Цветы"; $size = 110; $count_items = 16; break;
            case "10" : $str = "Знаменитости"; $size = 110; $count_items = 16; break;
            case "11" : $str = "Вещи"; $size = 110; $count_items = 16; break;
            case "12" : $str = "Части тела"; $size = 110; $count_items = 16; break;
            case "13" : $str = "Искусство"; $size = 110; $count_items = 16; break;
            case "14" : $str = "Разное"; $size = 110; $count_items = 16; break;
            case "15" : $str = "Дети"; $size = 110; $count_items = 16; break;
        }
        
        $avatars = $files_names;
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($avatars));
        $paginator->setCurrentPageNumber($this->_getParam("page"),1);
        $paginator->setItemCountPerPage($count_items);
        $this->view->avatars = $paginator;
        $this->view->category = $category;
        $this->view->allcount = count($avatars);
        $this->view->cat_name = $str;
        $this->view->ava_size = $size;
    }
    
    public function popularAction(){
        $this->view->layout()->disableLayout();
        $param = $this->_getParam("p");
        if($param == "films"){
            $popular = Model_News::getTopFilms();
        }elseif($param == "serials"){
            $popular = Model_News::getTopNewsByCatId(7);
        }
        elseif($param == "mults"){
            $popular = Model_News::getTopNewsByCatId(20);
        }
        elseif($param == "casts"){
            $popular = Model_News::getTopNewsByCatId(3);
        }
        $this->view->popular = $popular;
    }
    
    public function getpopularAction(){
        $this->view->layout()->disableLayout();
        $param = $this->_getParam("p");
        if($param == "films"){
            $popular = Model_News::getTopFilms();
        }elseif($param == "serials"){
            $popular = Model_News::getTopNewsByCatId(7);
        }
        elseif($param == "mults"){
            $popular = Model_News::getTopNewsByCatId(20);
        }
        elseif($param == "casts"){
            $popular = Model_News::getTopNewsByCatId(3);
        }
        $this->_helper->json(array("status" => "success", "popular" => $popular));die;
    }
    
    public function rectoviewAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function getrectoviewAction(){
        $this->view->layout()->disableLayout();
        $last_films = Model_News::getLastFilms();
        $this->_helper->json(array("status" => "success", "last_films" => $last_films));die;
    }
    
    public function gettopfilmsAction(){
        $this->view->layout()->disableLayout();
        $rand_films_ids = Model_Settings::getSettingsByKey("top_film");
        $top_films = array();
        foreach($rand_films_ids as $film_id){
            $one_film = (array) Model_News::getOneNewsSomeFieldsById($film_id);
            array_push($top_films,$one_film);
        }
        $this->_helper->json(array("status" => "success", "top_films" => $top_films));die;
    }
    
    public function remindpassAction(){
        $this->view->layout()->disableLayout();
        $username = $this->_getParam("login");
        if($username == ""){
            $this->_helper->json(array("status" => "not_found"));die;
        }
        $user_name_clean = mb_strtolower(urldecode($username));
        $user = Model_User::getUserByLogin(utf8_clean_string($user_name_clean));
        if($user == false){
            $this->_helper->json(array("status" => "not_found"));die;
        }else{
            $request = Zend_Controller_Front::getInstance()->getRequest();
            $servParam = $request->getServer();
            $server_name = $servParam['SERVER_NAME'];
            $user_ip = $servParam["HTTP_X_REAL_IP"];
            $curr_date = date('d.m.Y, H:i',time());
            $user = (array) $user;
            $fullname = $user['pf_real_name_n'];
            $login = $user['username'];
            $email = $user['user_email'];
            
            $login_с = base64_encode($login);
            $email_с = base64_encode($email);
            
            $headers2 = "MIME-Version: 1.0\r\n";
            $headers2 .= "From:tushkan.net <tushkan@tushkan.net>\r\nContent-type: text/html; charset=utf-8 \r\n";
            $headers2 .= "Reply-To: <tushkan@tushkan.net>\r\n";
    
            $p2 = "Здравствуйте, $fullname.<br/>
            <br/>
            Для пользователя \"$login\" был сделан запрос на восстановление пароля входа на сайт \"Смотреть онлайн фильмы бесплатно и без регистрации\".<br/>
            <br/>
            Если вы не делали этого запроса, просто проигнорируйте это письмо.<br/>
            В противном случае нажмите на ссылку ниже для подтверждения запроса и получения нового пароля.<br/>
            <br/>
            ------------------------------------------------------------<br/>
            <a href=\"http://tushkan.net/index/rpconfirm?un=$login_с&ue=$email_с\">Ссылка</a><br/>
            ------------------------------------------------------------<br/>
            <br/>
            <br/>
            ----------------------------------------<br/>
            IP: $user_ip<br/>
            Дата: $curr_date<br/>
            ----------------------------------------<br/>
            <br/>
            Всего наилучшего,<br/>
            Смотреть онлайн фильмы бесплатно и без регистрации (http://tushkan.net/";
            
            mail($email, "Восстановление пароля (новый пароль)",$p2,$headers2);
            
            $this->_helper->json(array("status" => "success"));die;
        }
    }
    
    public function rpconfirmAction(){
        $this->view->layout()->disableLayout();
        $username = base64_decode($this->_getParam("un"));
        $email = base64_decode($this->_getParam("ue"));
        $user_name_clean = mb_strtolower(urldecode($username));
        $user = Model_User::getUserByLogin(utf8_clean_string($user_name_clean));
        if($user == false){
            $this->_redirect('/index/rpcfail');
        }else{
            $user = (array) $user;
        }
        if($user['username'] == $username && $user['user_email'] == $email){
            $new_pass = $this->view->generatePassword();
            $data = array(
                "user_password" => phpbb_hash($new_pass),
                "user_pass_convert" => "0"
            );
            Model_User::updateUserData($user['user_id'],$data);
            
            $request = Zend_Controller_Front::getInstance()->getRequest();
            $servParam = $request->getServer();
            $server_name = $servParam['SERVER_NAME'];
            $user_ip = $servParam["HTTP_X_REAL_IP"];
            $curr_date = date('d.m.Y, H:i',time());
            $fullname = $user['pf_real_name_n'];
            $login = $user['username'];
            $email = $user['user_email'];
            
            $login_с = base64_encode($login);
            $email_с = base64_encode($email);
            
            $headers2 = "MIME-Version: 1.0\r\n";
            $headers2 .= "From:tushkan.net <tushkan@tushkan.net>\r\nContent-type: text/html; charset=utf-8 \r\n";
            $headers2 .= "Reply-To: <tushkan@tushkan.net>\r\n";
    
            $p2 = "Здравствуйте, $fullname.<br/>
            <br/>
            Данные для входа:<br/>
            ----------------------------------------<br/>
            Логин: $login<br/>
            Пароль: $new_pass<br/>
            ----------------------------------------<br/>
            <br/>
            IP адрес: $user_ip<br/>
            Дата: $curr_date<br/>
            <br/>
            ВНИМАНИЕ! Если вы пользуетесь веб-интерфейсом для чтения почтовой корреспонденции, обязательно удалите это письмо и очистите корзину во избежание нанесения вреда вашей учетной записи на сайте \"Смотреть онлайн фильмы бесплатно и без регистрации\" в результате взлома почты.<br/>
            <br/>
            Всего наилучшего,<br/>
            Смотреть онлайн фильмы бесплатно и без регистрации (http://tushkan.net/).";
            
            mail($email, "Восстановление пароля",$p2,$headers2);
            $this->_redirect("/index/rpcok?p=$email_с");
        }else{
            //error link
            $this->_redirect('/index/rpcfail');
        }
    }
    
    public function rpcokAction(){
        $this->view->layout()->disableLayout();
        $this->view->email = base64_decode($this->_getParam("p"));
    }
    
    public function rpcfailAction(){
        $this->view->layout()->disableLayout();
    }
    
    public function checkuserAction(){
        $this->view->layout()->disableLayout();
        $user_online = Zend_Registry::get("user");
        $user_id = $user_online->data['user_id'];
        $user = (array) Model_User::getUserById($user_id);
        if($user['group_id'] != "11"){
            $this->_helper->json(array("status_user" => "ok"));die;
        }else{
            $this->_helper->json(array("status_user" => "banned"));die;
        }
    }
    
    public function testAction(){
        $this->view->layout()->disableLayout();
        //$server = $_SERVER["HTTP_HOST"];
        //var_dump($server);die;
        /*
        $date_now = time();
        $date_time_array = getdate($date_now);
        $hours = $date_time_array['hours'];
        $minutes = $date_time_array['minutes'];
        $seconds = $date_time_array['seconds'];
        $month = $date_time_array['mon'];
        $day = $date_time_array['mday'];
        $year = $date_time_array['year'];
        $date_1 = mktime($hours,$minutes,$seconds,$month,$day,$year);
        */
        
        $memcache = Zend_Registry::get("memcache");
        //print_r($memcache->getStats());die;
        //$memcache->delete('show_comments');
        
        /*
        // Замена смайлов в коментах
        //$text = '.ucoz.net/sm';
        $text = 'http://s78.ucoz.net/sm/2';
        $tmp_results = Model_Comments::searchComments($text);
        //var_dump($tmp_results);die;
        foreach($tmp_results as $comm){
            $new_comm = str_replace($text,'/sml',$comm['message']);
            Model_Comments::updateComment($comm['commentID'],$comm['moduleID'],array('message' => $new_comm));
        }
        */
        
        /*
        $tmp = Model_Publ::getPublsByParam('jpg');
        foreach($tmp as $item){
            $new = (array) Model_Publ::getOnePublByIdTmp($item['id']);
            $data = array(
                "files" => $new['files'],
                "lastmod" => $new['lastmod'],
                "url" => $new['url'],
                "other2" => $new['other2'],
                "other3" => $new['other3'],
                "other4" => $new['other4'],
                "other5" => $new['other5'],
                "other6" => $new['other6'],
                "other7" => $new['other7'],
                "other8" => $new['other8'],
                "hide_on_site" => 0
            );
            //var_dump($data);die;
            $res = Model_Publ::updatePublData($item['id'],$data);
            $memcache->delete('one_publ_'.$item['id']);
        }
        */
        
        /*
        $tmp_users = Model_User::getUsersByParam('http');
        $data = array(
            "user_avatar" => ""
        );
        foreach($tmp_users as $userr){
            Model_User::updateUserData($userr['user_id'],$data);
        }
        */
        
        //$memcache->delete('popular_blocks_casts');
        //$this->view->popularBlocks('films',10800);
        
        //$one_news = (array) Model_News::getOneNewsById(13306);
        //var_dump($one_news['message']);die;
        
        /*$some_news = Model_News::getNewsByParam('other1','/_nw/uploads/');
        if(!$some_news){
            var_dump("end");die;
        }
        foreach($some_news as $item){
            $new_str = str_replace('/admins/','/_nw/',$item['other1']);
            Model_News::updateNewsData($item['id'],array('other1' => $new_str));
            $memcache->delete('one_news_'.$item['id']);
            $memcache->delete('index_index_page');
            $memcache->delete('news_index_page');
            $memcache->delete('news_cat'.$item['catID']);
        }
        
        $some_publs = Model_Publ::getPublsByParam2('asite','/admins/');
        if(!$some_publs){
            var_dump("end");die;
        }
        foreach($some_publs as $item){
            $new_str = str_replace('/admins/','/_pu/',$item['asite']);
            Model_Publ::updatePublData($item['id'],array('asite' => $new_str));
            $memcache->delete('one_publ_'.$item['id']);
            $memcache->delete('publ_index_page');
            $memcache->delete('publ_cat'.$item['catID']);
        }
        */

        //$memcache->flush();
        //$memcache->delete('index_index_page');
        //$memcache->delete('news_index_page');
        //$memcache->delete('one_news_68');
        //$ttt = $memcache->get("news_cat18");
        //var_dump($ttt);die;
        
    }
    
}
