<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 02.02.2015
 * Time: 11:24
 */

class TncontrolController extends Source_Controller_Action
{
    private $_dbConf =  array(
         'dbhost' => 'localhost',
         'dbuser' => 'egor',
         'dbpassword' => '6M1hsnH4',
         'dbname' => 'tushkan',
    );


    public function init()
    {
        session_start();
        $this->_cache = Zend_Registry::get("memcache");
    }

    private function Chpu($string, $space = '_')
    {
      $rus = array('а', 'б', 'в', 'г', 'д', 'е', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п',
        'р', 'с', 'т', 'у', 'ф', 'х', 'ъ', 'ы', 'ь', 'э', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З',
        'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ъ', 'Ы', 'Ь',
        'Э', ' ', 'ё','ж','ц','ч','ш','щ','ю','я','Ё','Ж','Ц','Ч','Ш','Щ','Ю','Я');
      $lat = array('a', 'b', 'v', 'g', 'd', 'e', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'r', 's', 't', 'u', 'f', 'h', '_', 'i', '_', 'e', 'A', 'B', 'V', 'G', 'D', 'E', 'Z',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', '_', 'I', '_',
        'E', $space, 'yo','zh','tc','ch','sh','sh','yu','ya','YO','ZH','TC','CH','SH','SH','YU','YA');
      return str_replace($rus, $lat, $string);
    }

    private function ToLower($string)
    {
      $l = array(
          'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',
          'ё','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','ф','ы','в','а','п','р','о','л','д','ж','э','я','ч','с','м','и','т','ь','б','ю'
      );
      $u = array(
        'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M',
        'Ё','Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','Я','Ч','С','М','И','Т','Ь','Б','Ю'
      );
      return str_replace($u, $l, $string);
    }

    private function parseTags($html, &$already, &$filmTag, $echo = false)
    {
        $db = mysqli_connect($this->_dbConf['dbhost'], $this->_dbConf['dbuser'], $this->_dbConf['dbpassword'], $this->_dbConf['dbname']);
        if(!$db) {
            die('Can not connect');
        }
        $db->query('SET NAMES UTF8');
        $count = 0;
        $tags = array('country' => 'Страна', 'category' => 'Жанр',
            'actor' => 'В ролях', 'moderator' => 'Ведущие', 'producer' => 'Режиссер', 'quality' => 'Качество',
            'year' => 'Год', 'date' => 'Дата выхода'
        );
        $quality = array('hddvd' => 'HDDVDRip', 'satrip' => 'SATRip', 'camrip' => 'CAMRip',
            'hdtvrip' => 'HDTVRip', 'dvbrip' => 'DVBRip', 'webdlrip' => 'WEBDLRip', 'web-dlrip' => 'WEB-DLRip',
            'dvdrip' => 'DVDRip', 'pdtvrip' => 'PDTVRip', 'tc' => 'TeleCine',
            'vhsrip' => 'VHSRip', 'remux' => 'Remux', 'webdl-rip' => 'WEBDL-Rip',
            'bdrip' => 'BDRip', 'hdrip' => 'HDRip', 'tvrip' => 'TVRip',
            'dvd' => 'DVD', 'ts' => 'TS', 'webrip' => 'WEBRip', 'dvdscr' => 'DVDScr'
        );
        foreach($tags as $tag => $ttag) {
          if(!isset($already[$tag])) {
            $already[$tag] = array();
          }
          $temp = array();
          $html = str_replace(array('<br />', '<br/>', '<br>'), "\n", $html);
          if(!preg_match('/<b>\s*'.$ttag.'\s*:\s*<\/b>([^\n\r]+)/', $html, $temp)) {
            if($echo) echo 'Не найдено совпадений для "'.$ttag.'"<br />';
            continue;
          }
          //print_r($temp);
          if($tag == 'category') {
            $temp[1] = $this->ToLower($temp[1]);
          } else if($tag == 'quality') {
            $finded = false;
            foreach($quality as $k => $v) {
                if(strpos($this->ToLower($temp[1]), $k) !== false) {
                    //echo '!!!'.$temp[1].'=>'.$v.'<br />';
                    $temp[1] = $v;
                    $finded = true;
                    break;
                }
            }
            if(!$finded) {
                continue;
            }
          }

          $temp = explode(',', trim(strip_tags($temp[1])));

          $bad = array('(', ')', '\\', '/', '&uuml;',  '&eacute;', '&laquo;', '#', '"', '[', ']', '&nbsp;');
          //if($tag != 'quality') {
            //$bad[] = '-';
          //}

          for($i = 0; $i < count($temp); ++$i) {
              $temp[$i] = preg_replace('/\([^\)]*\)/', '', $temp[$i]);
              $temp[$i] = trim(str_replace($bad, '', $temp[$i]));
              $temp[$i] = str_replace(array('__', "\t"), '_', $temp[$i]);
              $temp[$i] = trim(str_replace(array(';'), '', $temp[$i]));

              while(!empty($temp[$i]) && $temp[$i][0] == ':') {
                 $temp[$i] = substr($temp[$i], 1);
              }

              while(!empty($temp[$i]) && $temp[$i][0] == '_') {
                 $temp[$i] = substr($temp[$i], 1);
              }

              $temp[$i] = trim($temp[$i]);

              if(empty($temp[$i]) || $temp[$i] == '_' || $temp[$i] == '.'
                || $temp[$i] == "'" || $temp[$i] == '`'
                || $temp[$i] == '-' || mb_strlen($temp[$i], 'UTF-8') > 40) {
                  continue;
              }

              $tagName = $tag.'_'.str_replace(array('__', '&rsquo;', "\t", "'", '’', '`'), '_', $this->ToLower($this->Chpu($temp[$i])));

              if($tag == 'date') {
                  $y = array();
                  if(preg_match('/\d{4}/', $temp[$i], $y)) {
                      $tag = 'year';
                      if(!in_array($y[0], $filmTag)) {
                          $filmTag[] = $y[0];
                      }
                  }
                  continue;
              }

              $filmTag[] = $tagName;

              if(in_array($temp[$i], $already[$tag])) {
                  continue;
              }
              $result = $db->query('SELECT * FROM news_tags WHERE title = "'.$temp[$i].'" AND type = "'.$tag.'"');
              if($result->num_rows == 0) {
                  ++$count;
                  if($echo) echo $tag.' | '.$tagName.'='.$temp[$i].'<br />';
                  $db->query('INSERT INTO news_tags (name, title, link, type) VALUES ("'.$tagName.'", "'.$temp[$i].'", "", "'.$tag.'");');
              }
              $already[$tag][] = $temp[$i];
              //print_r($result);
          }
       }
       $db->close();
       return $count;
    }

    public function gettagsAction()
    {
        $html = $this->_getParam('html');
        $filmTag = $already = array();
        $this->parseTags($html, $already, $filmTag);
        die(implode(',', $filmTag));
    }

    public function fsAction()
    {
        if(!FSDEBUG) {
            die('Access denied');
        }
        header('Content-type: text/html; charset=utf-8');
        $db = mysqli_connect($this->_dbConf['dbhost'], $this->_dbConf['dbuser'], $this->_dbConf['dbpassword'], $this->_dbConf['dbname']);
        if(!$db) {
            die('Can not connect to database...');
        }
        $db->query('SET NAMES UTF8');
        /*$result = $db->query('SELECT commentID FROM comments WHERE temp = 0 LIMIT 50000');
        while($row = $result->fetch_assoc()) {
            $result2 = $db->query('SELECT COUNT(commentID) as c FROM comments WHERE parentID = "'.$row['commentID'].'"');
            $row2 = $result2->fetch_assoc();
            $db->query('UPDATE comments SET answerCount = '.$row2['c'].', temp = 1 WHERE commentID = "'.$row['commentID'].'"');
            if($row2['c'] > 0) {
                echo 'commentID '.$row['commentID'].' => '.$row2['c'].'<br />';
            }
        }*/

        $db->close();
        exit;
    }

    public function generatetagsAction()
    {
        header('Content-type: text/html; charset=utf-8');
        $db = mysqli_connect($this->_dbConf['dbhost'], $this->_dbConf['dbuser'], $this->_dbConf['dbpassword'], $this->_dbConf['dbname']);
        if(!$db) {
            die('Can not connect to database...');
        }
        $db->query('SET NAMES UTF8');
        /*
        //YEARS
        for($i = 1930; $i <= 2020; ++$i) {
            $db->query('INSERT INTO news_tags (name, title, link, type) VALUES (
                "'.$i.'", "'.$i.'", "", "year"
            )');
        }
        //QUALITY
        $quality = array('satrip' => 'SATRip', 'camrip' => 'CAMRip', 'tvrip' => 'TVRip',
            'dvdrip' => 'DVDRip', 'ts' => 'TS', 'pdtv' => 'PDTVRip', 'tc' => 'TeleCine',
            'vhs' => 'VHSRip', 'dvd' => 'DVD', 'webdl' => 'WEBDLRip', 'remux' => 'Remux',
            'dvbrip' => 'DVBRip', 'bdrip' => 'BDRip', 'hdrip' => 'HDRip', 'hdtv' => 'HDTVRip',
            'hddvd' => 'HDDVDRip',
        );
        foreach($quality as $q => $t) {
            $db->query('INSERT INTO news_tags (name, title, link, type) VALUES (
                "'.$q.'", "'.$t.'", "", "quality"
            )');
        }
        exit;*/

        $already = array(); $count = 0;

        $clear = trim(strip_tags($this->_getParam('clear')));
        if($clear == 1) {
            $db->query('UPDATE news SET tags_set = "0"'); //tags = "",
            $db->close();
            echo 'Wait...
            <script>setTimeout(function() { window.location = "/tncontrol/generatetags"; }, 10000);</script>';
        }

        $like = trim(strip_tags($this->_getParam('like')));
        $where = $like ? 'NOT LIKE "%'.$like.'%"' : '= ""';
        $page = isset($_GET['page']) && $_GET['page'] > 0 ? $_GET['page'] : 0;
        $limit = 100;
        /* WHERE tags '.$where.' */ //'.($limit * $page).', '.$limit
        $result = $db->query('SELECT * FROM news WHERE tags_set = "0" LIMIT '.$limit);
        $rows = 0; $placed = 0;
        while($row = $result->fetch_assoc()) {
            $filmTag = array();
            ++$rows;
            $count += $this->parseTags($row['message'], $already, $filmTag, false);
            $placed += count($filmTag);
            $db->query('UPDATE news SET tags = "'.implode(',', $filmTag).'", tags_set = "1" WHERE id = "'.$row['id'].'"');
        }

        $db->close();
        echo 'Added '.$placed.' (new: '.$count.') tags in '.$rows.' rows<br />';

        if($rows > 0) {
            echo '<script>setTimeout(function() { window.location = "/tncontrol/generatetags?page='.($page+1).'"; }, 5000);</script>';
        } else {
            echo 'DONE!';
        }
        exit;
    }

    public function testAction()
    {
        echo '<pre>';
        print_r($this->_cache->getStats());
        exit;
    }

    public function delimageflagAction()
    {
        switch ($this->_getParam('type')){
            case 'news':
                $_SESSION['img']['news'] = true;
                break;
            case 'publ':
                $_SESSION['img']['publ'] = true;
                break;
        }
        $this->_helper->json('1');
    }

    public function passAction()
    {
        if($this->_user['group_id'] == 8){
            $user = Model_Admin_Users::getUserbyID($this->_getParam('id'));
            if($user->group_id == 5 || $user->group_id == 8 || $user->group_id == 9 || $user->group_id == 4){
                $this->_helper->json('access_denied');
                exit;
            }
        }
        $pad = $this->_getParam('pass');
        include_once '/forum/includes/functions.php';
        $pass = phpbb_hash($pad);
        Model_Admin_Users::editUser($this->_getParam('id'), array('user_password'=>$pass, 'user_pass_convert'=>'0', 'user_login_attempts'=>'0'));
        $this->_helper->json('1');
        exit;
    }

    public function popuppassAction()
    {
        $this->view->id = $this->_getParam('id');
    }

    public function loginAction()
    {
        $this->view->layout()->disableLayout();
        if($this->_getParam('log')){
            $user = Zend_Registry::get("user");
            $auth = Zend_Registry::get("auth");
            $login = array();
            $curr_user = $this->_getParam("user");
            $username = $curr_user['username'];
            $password = $curr_user['password'];
            $autologin	= (!empty($_POST['autologin'])) ? true : false;
            $viewonline	= (!empty($_POST['viewonline'])) ? false : true;
            $login = $auth->login($username, $password, $autologin, $viewonline);
            if(Model_Admin_Security::verifyIp($_SERVER["REMOTE_ADDR"])){
                if($login['error_msg'] == false){
                    $user = Zend_Registry::get("user");
                    $u = $user->data;
                    if(Model_Admin_Users::isAdmin($u['group_id'])){
                        $this->_helper->json("login_success");die;
                    }else{
                        $user->session_kill();
                        $this->_helper->json("acces_denied");die;
                    }

                }else{
                    $this->_helper->json("auto_error");die;
                }
            }else{
                $user->session_kill();
                $this->_helper->json("ip_wrong");die;
            }
        }
    }

    /*
     * Новости - фильмы
     */

    public function indexAction()
    {
        //chmod(getcwd().'/_pu/images/64.jpg', 0777);
        /*if($this->_user['group_id'] == 8)
            $this->redirect('/tncontrol/users');*/
        $this->view->THBlock = array('Название','Автор', 'Дата добавления', 'Действия');
        $news = Model_Admin_News::getAllNews();
        if($this->_user['group_id'] == 9)
            $news = Model_Admin_News::getAllNewsByEditorId($this->_user['user_id']);
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($news));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
        $_SESSION['img']['news'] = false;
    }



    public function newsAction()
    {
        $this->forward('index');
    }

    public function addnewsAction()
    {
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $_SESSION['img']['news'] = false;
        // html view
    }

    public function editnewsAction()
    {
        $this->view->news = Model_Admin_News::getNewsById($this->_getParam('id'));
        if($this->_user['group_id'] == 9){
            if($this->view->news->other6 != $this->_user['user_id'])
                $this->_redirect($_SERVER['HTTP_REFERER']);
        }
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $_SESSION['img']['news'] = false;
        Zend_Layout::getMvcInstance()->assign('title', $this->view->news->title);
    }

    public function deletenewsAction()
    {
        $news = Model_Admin_News::getNewsById($this->_getParam('id'));
        $cat_ID = $news->catID;
        Model_Admin_News::deleteNews($this->_getParam('id'));
        $this->_cache->delete('index_index_page');
        $this->_cache->delete('news_index_page');
        $this->_cache->delete('news_cat'.$cat_ID);
        $this->_cache->delete('one_news_'.$this->_getParam('id'));
        $this->_helper->json('1');
    }

    /*
     * Статьи
     */

    public function publAction()
    {
        $this->view->THBlock = array('Название','Автор', 'Дата добавления', 'Действия');
        $publ = Model_Admin_Publ::getAllPubl();
        if($this->_user['group_id'] == 9)
            $publ = Model_Admin_Publ::getAllPublEditor($this->_user['user_id']);
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($publ));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
        $_SESSION['img']['publ'] = false;
    }

    public function addpublAction()
    {
        // html view
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $_SESSION['img']['publ'] = false;
    }

    public function editpublAction()
    {
        $this->view->news = Model_Admin_Publ::getPublbyId($this->_getParam('id'));
        if($this->_user['group_id'] == 9){
            if($this->view->news->uid != $this->_user['user_id'])
                $this->_redirect($_SERVER['HTTP_REFERER']);
        }
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $_SESSION['img']['publ'] = false;
        Zend_Layout::getMvcInstance()->assign('title', $this->view->news->title);
    }

    public function deletepublAction()
    {
        $publ = Model_Admin_Publ::getPublbyId($this->_getParam('id'));
        $catID = $publ->catID;

        $this->_cache->delete('publ_index_page');
        $this->_cache->delete('publ_cat'.$catID);
        $this->_cache->delete('one_publ_'.$this->_getParam('id'));

        Model_Admin_Publ::delPubl($this->_getParam('id'));
        $this->_helper->json('1');
    }
    /*
     *
     */

    public function statpagesAction()
    {
        $this->view->THBlock = array('Название','Автор', 'Дата добавления', 'Действия');
        $publ = Model_Admin_Statpages::getAllStatPages();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($publ));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function addstatpageAction()
    {
        // html view
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
    }
    public function editstatpageAction()
    {
        $this->view->news = Model_Admin_Statpages::getStatPage($this->_getParam('id'));
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        Zend_Layout::getMvcInstance()->assign('title', $this->view->news->title);
    }
    public function deletestatpageAction()
    {
        Model_Admin_Statpages::deletePage($this->_getParam('id'));
        $this->_helper->json('1');
    }

    /*
     * Users
     */

    public function usersAction()
    {
        $this->view->THBlock = array('ID','Имя пользователя (логин)','Рег IP','Группа', 'Полное имя', 'E-mail','Аватар','Действия');
        $users = Model_Admin_Users::getAllUsers();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($users));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function adduserAction()
    {
        // html view
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
    }

    public function edituserAction()
    {
        // html view
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $this->view->user = Model_Admin_Users::getUserbyID($this->_getParam('id'));
    }

    public function deleteuserAction()
    {
        Model_Admin_Users::deleteUser($this->_getParam('id'));
        $this->_helper->json('1');
    }

    /*
     * Comments
     */

    public function commentsAction()
    {
        $this->view->THBlock = array('Коментарий','Действия');
        $comm = Model_Admin_Comments::getAllComments();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;

    }

    public function popupcomenntAction()
    {
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $this->view->comment = Model_Admin_Comments::getCommentById($this->_getParam('id'));
    }

    public function deletecommentAction()
    {
        $comment = Model_Admin_Comments::getCommentById($this->_getParam('id'));
        if($comment->moduleID == '2') {
            $this->_cache->delete('news_comments_material_' . $comment->materialID . '_order_asc');
            $this->_cache->delete('news_comments_material_' . $comment->materialID . '_order_desc');
        }
        if($comment->moduleID == '3') {
            $this->_cache->delete('publ_comments_material_' . $comment->materialID . '_order_asc');
            $this->_cache->delete('publ_comments_material_' . $comment->materialID . '_order_desc');
        }
        if($comment->moduleID == '8') {
            $this->_cache->delete('tv_comments_material_' . $comment->materialID . '_order_asc');
            $this->_cache->delete('tv_comments_material_' . $comment->materialID . '_order_desc');
        }
        $this->_cache->delete('count_comments_item_'.$comment->materialID.'_module_'.$comment->moduleID);
        $this->_cache->delete('view_comments_material_'.$comment->materialID.'_module_'.$comment->moduleID.'_role_admin');
        $this->_cache->delete('view_comments_material_'.$comment->materialID.'_module_'.$comment->moduleID.'_role_user');
        Model_Admin_Comments::delComment($this->_getParam('id'));
        $this->_helper->json('1');
    }

    public function deleteusercommentAction()
    {
        Model_Admin_Comments::delUserComment($this->_getParam('user_id'));
        $this->_helper->json('1');
    }

    public function deletesearchAction()
    {
        Model_Admin_Comments::delSComment();
        $this->_helper->json('1');
    }

    /*
     * Stat
     */

    public function commstatAction()
    {
        $this->view->THBlock = array('Название ссылка','Количество');
        $comm = Model_Admin_Comments::getComms();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function matstatAction()
    {
        $this->view->THBlock = array('Дата','Добавлено');
        $comm = Model_Admin_Comments::getMatAddtime();
        $this->view->pag = $comm;

        $this->view->THBlock2 = array('Дата','Редактировано');
        $comm2 = Model_Admin_Comments::getMatLastmod();
        $this->view->pag2 = $comm2;
    }

    public function regstatAction()
    {
        $this->view->THBlock = array('Дата','Количество');
        $comm = Model_Admin_Comments::userRegs();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function daystatAction()
    {
        switch($this->_getParam('type')){
            case 'add':
                $this->view->title = 'Добавлено за '.$this->_getParam('date');
                $this->view->THBlock = array('Материал (Новости)','Автор');
                $comm = Model_Admin_Comments::getMatAddNews($this->_getParam('date'));
                $this->view->pag = $comm;

                $this->view->THBlock2 = array('Материал (Статьи)','Автор');
                $comm2 = Model_Admin_Comments::getMatAddPubl($this->_getParam('date'));
                $this->view->pag2 = $comm2;
                break;
            case 'edit':
                $this->view->title = 'Редактировано за '.$this->_getParam('date');
                $this->view->THBlock = array('Материал (Новости)','Автор');
                $comm = Model_Admin_Comments::getMatLastModNews($this->_getParam('date'));
                $this->view->pag = $comm;

                $this->view->THBlock2 = array('Материал (Статьи)','Автор');
                $comm2 = Model_Admin_Comments::getMatLastModPubl($this->_getParam('date'));
                $this->view->pag2 = $comm2;
                break;
            default:
                $this->redirect($_SERVER['HTTP_REFERER']);
                break;
        }
    }
    /*
     * Pools
     */

    public function poolsAction()
    {
        $this->view->THBlock = array('#','Опрос','Действия');
        $comm = Model_Admin_Pools::getAllPools();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function poolAction()
    {
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        if($this->_getParam('id')){
            $pool = Model_Admin_Pools::getAllPool($this->_getParam('id'));
            foreach ($pool as $p=>$v):
                $rr['k'.$p] =  $v;
                endforeach;
            $this->view->pool = $rr;
        }
    }

    public function deletepoolAction()
    {
        Model_Admin_Pools::delPool($this->_getParam('id'));
        $this->_helper->json('1');
    }

    /*
     * Banners
     */

    public function bannersAction()
    {
        $this->view->THBlock = array('Название','Категория','Статус','Действия');
        $comm = Model_Admin_Banners::getAllBanners();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function bannerAction()
    {
        $this->view->category = array('right_big'=>'Справа большой', 'above_news'=>'Над новостью','under_news'=>'Под новостью',
            'left_top'=>'Слева сверху','left_center'=>'Слева по центру', 'left_bottom'=>'Слева внизу', 'head_block'=>'В head');
        $this->view->status = array('active'=>'Активный', 'inactive'=>'Не активный');
        if($this->_getParam('id')){
            $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
            $this->view->banner = Model_Admin_Banners::getBanner($this->_getParam('id'));
        }
    }

    public function deletebannerAction()
    {
        $banner = Model_Admin_Banners::getBanner($this->_getParam('id'));
        Model_Admin_Banners::deleteBanner($this->_getParam('id'));
        $banners = Model_Admin_Banners::getBannerByCatName($banner['category']);
        Source_M::readFile($banner['category'], $banners);
        if($banner['category'] == 'head_block'){
            $this->_cache->delete('head_block_banner');
        }
        $this->_helper->json('1');
    }

    /*
     * Meta
     */

    public function metatagsAction()
    {
        $_SESSION['ref'] = $_SERVER['HTTP_REFERER'];
        $this->view->THBlock = array('Страница','Тег', 'Содержимое', 'Действие');
        $comm = Model_Admin_Banners::getAllMeta();
        $this->view->pag = $comm;

        $this->view->THBlock2 = array('Сео блоки по категориям','Действие');
        $comm2 = Model_Admin_Banners::getAllSeo();
        $this->view->pag2 = $comm2;
    }

    public function popupmetaAction()
    {
        $this->view->meta = Model_Admin_Banners::getMeta($this->_getParam('id'));
    }

    public function seoAction()
    {
        $this->view->seo = Model_Admin_Banners::getSeo($this->_getParam('id'));
    }

    /*
     * Settings
     */

    public function settingsAction()
    {
        $this->view->THBlock = array('Параметр','Значение','Действия');
        $comm = Model_Admin_Settings::getAllSettings();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function deletesettAction()
    {
        Model_Admin_Settings::deleteField($this->_getParam('id'));
        $this->_helper->json('1');
    }

    public function popupsettAction()
    {
        if($this->_getParam('id')){
            $this->view->sett = Model_Admin_Settings::getSett($this->_getParam('id'));
        }
    }

    public function deletetagsAction()
    {
        if(Model_Admin_NewsTags::deleteTag($this->_getParam('id'), $this->_getParam('type'))) {
            exit;
        }
        die('Ошибка удаления');
    }

     public function updatetagAction()
    {
        if(Model_Admin_NewsTags::updateTag($this->_getParam('id'), $this->_getParam('field'), $this->_getParam('value'))) {
            exit;
        }
        die('Ошибка редактирования');
    }

    public function tagsaddAction()
    {
        $name = strtolower(trim($this->_getParam('name')));
        $title = trim($this->_getParam('title'));
        $type = trim($this->_getParam('type'));
        $link = trim($this->_getParam('link'));
        $header = trim($this->_getParam('header'));
        $h1 = trim($this->_getParam('h1'));
        $h2 = trim($this->_getParam('h2'));
        $meta_kw = trim($this->_getParam('meta_kw'));
        $meta_descr = trim($this->_getParam('meta_descr'));
        if(empty($name) || empty($title)) {
            die('Заголовок и название должны быть заполнены');
        }
        $addName = $type != 'custom' ? $type.'_'.$name : $name;
        if(Model_Admin_NewsTags::findTag($addName) != null) {
            die('Данное название уже существует');
        }
        if(Model_Admin_NewsTags::addTag(array(
            'name' => $addName,
            'title' => $title,
            'link' => $link,
            'type' => $type,
            'h1' => $h1,
            'h2' => $h2,
            'header' => $header,
            'meta_kw' => $meta_kw,
            'meta_descr' => $meta_descr,
        ))) {
            exit;
        }
        die('Ошибка при добавлении метки в базу');
    }

    public function tagsAction()
    {
        $type = $this->_getParam('type');
        $page = $this->_getParam('page');
        $kw = $this->_getParam('kw');
        if(!is_numeric($page) || $page < 1) {
            $page = 1;
        }
        $types = array(
            'actor' => 'Актер',
            'moderator' => 'Ведущие',
            'year' => 'Год',
            'country' => 'Страна',
            'producer' => 'Режисер',
            'quality' => 'Качество',
            'category' => 'Жанр',
            'custom' => 'Без группы',
        );
        $this->view->currentType = array_key_exists($type, $types) ? $type : '';
        $this->view->types = $types;

        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()->from('news_tags')
            ->where($type ? 'type = ?' : '1', $type)
            ->where($kw ? 'title LIKE "%'.$kw.'%"' : '1')
            ->order('type')
            ->order('title');
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
        $paginator->setItemCountPerPage(25);
        $paginator->setPageRange(5);
        $paginator->setCurrentPageNumber($page);
        $this->view->pag = $paginator;
        $this->view->page_number = $page;
        $this->view->THBlock = array('Метка', 'Заголовок', 'Тип', 'Ссылка', 'Title', 'H1', 'H2', 'META KW', 'Meta Описание', '&nbsp;');
    }

    /*
     *
     * Ajax functions responses
     */

    public function ajaxAction()
    {

        switch($this->_getParam('fl')) {

            case 'addnews':
                $params = $this->_getParam('params');
                $params['author'] = $this->_user['username'];
                $params['addtime'] = strtotime($params['date']);
                $params['createtime'] = strtotime(date('d.m.Y H:i'));
                $params['urltime'] = strtotime($params['date2']);
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                $params['other6'] = $this->_user['user_id'];
                unset($params['date']);unset($params['date2']);
                $id = Model_Admin_News::addNews($params);
                $ref = array('id'=>$id, 'href'=> $_SESSION['ref'],'author'=>$params['author']);

                $this->_cache->delete('index_index_page');
                $this->_cache->delete('news_index_page');
                $this->_cache->delete('news_cat'.$params['catID']);
                if($this->_getParam('fl2')){
                    $href = '/news/'.$params['sbscr'].'/'.date('Y-m-d', $params['addtime']).'-'.$id;
                    $this->_helper->json($href);
                }
                $this->_helper->json($ref);
                break;

            case 'editnews':
                $params = $this->_getParam('params');
                //$params['author'] = $this->_user['username'];
                $params['addtime'] = strtotime($params['date']);
                $params['urltime'] = strtotime($params['date2']);
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                if($_SESSION['img']['news']) {
                    $new = Model_Admin_News::getNewsById($this->_getParam('id'));
                    unlink(getcwd() . $new->other1);
                    if(!$params['other1']){
                        $params['other1'] = ' ';
                    }
                }
                unset($params['date']);unset($params['date2']);
                if(!$this->_getParam('createtime')){
                    $params['createtime'] = 'edited';
                }else{
                    unset($params['createtime']);
                }
                $params = Model_Admin_News::deleteEmptyKey($params);
                if(!isset($params['file'])) $params['file'] = '';
                if(!isset($params['tags'])) $params['tags'] = '';
                Model_Admin_News::editNews($this->_getParam('id'), $params);
                $this->_cache->delete('one_news_'.$this->_getParam('id'));
                $this->_cache->delete('index_index_page');
                $this->_cache->delete('news_index_page');
                $this->_cache->delete('news_cat'.$params['catID']);
                if($this->_getParam('fl2')){
                    $href = '/news/'.$params['sbscr'].'/'.date('Y-m-d', $params['addtime']).'-'.$this->_getParam('id');
                    $this->_helper->json($href);
                }
                $this->_helper->json($_SESSION['ref'] ? $_SESSION['ref'] : $this->_getParam('id'));
                break;

            case 'upload':
                $file = isset($_FILES['torrent']) ? $_FILES['torrent'] : $_FILES[0];
                $dir = '/_nw/'.date('Y').date('m').'/';
                $ext = explode('.', basename($file['name']));
                //$filename = md5(rand().time().basename($file['name'])).'.'.$ext[count($ext) - 1];
                $filename = basename($file['name']);
                while(file_exists(getcwd() . $dir . iconv('utf-8', 'windows-1251', $filename))) {
                    $filename = '_'.$filename;
                }
                Source_Upload::UploadingFolder($dir);
                if (move_uploaded_file($file['tmp_name'], getcwd() . $dir . iconv('utf-8', 'windows-1251', $filename))){
                    $this->_helper->json($dir.iconv('utf-8', 'windows-1251', $filename));
                }
                break;
            /*
             *
             */

                case 'addpubl':
                $params = $this->_getParam('params');
                $params['user'] = $this->_user['username'];
                $params['addtime'] = strtotime($params['date']);
                $params['createtime'] = strtotime(date('d.m.Y H:i'));
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                $params['uid'] = $this->_user['user_id'];
                unset($params['date']);
                $id = Model_Admin_Publ::addPubl($params);
                $ref = array('id'=>$id, 'href'=> $_SESSION['ref'], 'author'=>$params['user']);

                $this->_cache->delete('publ_index_page');
                $this->_cache->delete('publ_cat'.$params['catID']);
                    if($this->_getParam('fl2')){
                        $href = '/publ/'.$params['url'].'/'.$params['catID'].'-1-0-'.$id;
                        $this->_helper->json($href);
                    }
                $this->_helper->json($ref);
                break;

            case 'editpubl':
                $params = $this->_getParam('params');
                //$params['user'] = $this->_user['username'];
                $params['addtime'] = strtotime($params['date']);
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                if($_SESSION['img']['publ']) {
                    $new = Model_Admin_Publ::getPublbyId($this->_getParam('id'));
                    unlink(getcwd() . $new->asite);
                    if(!$params['asite']){
                        $params['asite'] = ' ';
                    }
                }
                unset($params['date']);
                $this->_cache->delete('one_publ_'.$this->_getParam('id'));
                $this->_cache->delete('publ_index_page');
                $this->_cache->delete('publ_cat'.$params['catID']);
                if(!$this->_getParam('createtime')){
                    $params['createtime'] = 'edited';
                }else{
                    unset($params['createtime']);
                }
                Model_Admin_Publ::editPubl($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                if($this->_getParam('fl2')){
                    $href = '/publ/'.$params['url'].'/'.$params['catID'].'-1-0-'.$this->_getParam('id');
                    $this->_helper->json($href);
                }
                $this->_helper->json($_SESSION['ref']);
                break;

            case 'uploadpubl':
                $file = $_FILES[0];
                $dir = '/_pu/'.date('Y').date('m').'/';
                Source_Upload::UploadingFolder($dir);
                if (move_uploaded_file($file['tmp_name'], getcwd() . $dir . iconv('utf-8', 'windows-1251', basename($file['name'])))){
                    $this->_helper->json($dir.iconv('utf-8', 'windows-1251', basename($file['name'])));
                }
                break;

            /*
             *
             */

            case 'addstatpage':
                $params = $this->_getParam('params');
                $params['author'] = $this->_user['username'];
                $params['addtime'] = strtotime(date('d.m.Y H:i'));
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                $id = Model_Admin_Statpages::newPage($params);
                $ref = array('id'=>$id, 'href'=> $_SESSION['ref']);
                if($this->_getParam('fl2')){
                    if($publ['title'] == "Контакты"){
                        $href = '/index/dlja_pravoobladatelej/0-48';
                    }elseif($publ['title'] == "ТВ-онлайн"){
                        $href = '/index/tv_onlajn/0-51';
                    }else{
                        $href = '/news/'.$params['sbscr'].'/'.date('Y-m-d', $params['addtime']).'-'.$id;
                    }
                    $this->_helper->json($href);
                }
                $this->_helper->json($ref);
                break;

            case 'editstatpage':
                $params = $this->_getParam('params');
                //$params['author'] = $this->_user['username'];
                $params['addtime'] = strtotime(date('d.m.Y H:i'));
                $params['lastmod'] = strtotime(date('d.m.Y H:i'));
                Model_Admin_Statpages::editPage($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                if($this->_getParam('fl2')){
                    if($publ['title'] == "Контакты"){
                        $href = '/index/dlja_pravoobladatelej/0-48';
                    }elseif($publ['title'] == "ТВ-онлайн"){
                        $href = '/index/tv_onlajn/0-51';
                    }else{
                        $href = '/news/'.$params['sbscr'].'/'.date('Y-m-d', $params['addtime']).'-'.$this->_getParam('id');
                    }
                    $this->_helper->json($href);
                }
                $this->_helper->json($_SESSION['ref']);
                break;

            /*
             * Users
             */

            case 'newrole':
                $params['group_id'] = $this->_getParam('role');
                Model_Admin_Users::editUser($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                $this->_helper->json('1');
                break;
            case 'edituser':
                $params = $this->_getParam('params');
                $params['user_regdate'] = strtotime($params['reg']);
                $params2['pf_real_name_n'] = $params['username_clean'];
                unset($params['username_clean']);
                unset($params['reg']);
                Model_Admin_Users::editUser($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                Model_Admin_Users::editUserFildData($this->_getParam('id'), array('pf_real_name_n'=>$params2['pf_real_name_n']));
                $this->_helper->json($_SESSION['ref']);
                break;
            /*
             * Comments
             */

            case 'editcomment':
                $params['message'] = $this->_getParam('message');
                Model_Admin_Comments::editComment($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                $comment = Model_Admin_Comments::getCommentById($this->_getParam('id'));
                    if($comment->moduleID = '2') {
                        $this->_cache->delete('news_comments_material_' . $comment->materialID . '_order_asc');
                        $this->_cache->delete('news_comments_material_' . $comment->materialID . '_order_desc');
                    }
                    if($comment->moduleID = '3') {
                        $this->_cache->delete('publ_comments_material_' . $comment->materialID . '_order_asc');
                        $this->_cache->delete('publ_comments_material_' . $comment->materialID . '_order_desc');
                    }
                    if($comment->moduleID = '8') {
                        $this->_cache->delete('tv_comments_material_' . $comment->materialID . '_order_asc');
                        $this->_cache->delete('tv_comments_material_' . $comment->materialID . '_order_desc');
                    }
                $this->_cache->delete('count_comments_item_'.$comment->materialID.'_module_'.$comment->moduleID);
                $this->_cache->delete('view_comments_material_'.$comment->materialID.'_module_'.$comment->moduleID.'_role_admin');
                $this->_cache->delete('view_comments_material_'.$comment->materialID.'_module_'.$comment->moduleID.'_role_user');
                $this->_helper->json($_SESSION['ref']);
                break;

            case 'getcat':
                if($this->_getParam('cat') == '2'){
                    $this->_helper->json(Model_Admin_News::getCategories());
                }
                if($this->_getParam('cat') == '3'){
                    $this->_helper->json(Model_Admin_Publ::getCategories());
                }
            break;

            case 'addpool':
                $params = $this->_getParam('params');
                Model_Admin_Pools::newPool($params);
                $this->_helper->json($_SESSION['ref']);
                break;
            case 'editpool':
                $params = $this->_getParam('params');
                Model_Admin_Pools::editPool($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($params));
                $this->_helper->json($_SESSION['ref']);
                break;

            /*
             * banners
             */
            case 'addbanner':
                $params = $this->_getParam('params');
                Model_Admin_Banners::addBanner($this->_getParam('params'));
                $banners = Model_Admin_Banners::getBannerByCatName($params['category']);
                Source_M::readFile($params['category'], $banners);
                if($params['category'] == 'head_block'){
                    $this->_cache->delete('head_block_banner');
                }
                $this->_helper->json($_SESSION['ref']);
                break;
            case 'editbanner':
                $params = $this->_getParam('params');
                Model_Admin_Banners::editBanner($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($this->_getParam('params')));
                $banners = Model_Admin_Banners::getBannerByCatName($params['category']);
                Source_M::readFile($params['category'], $banners);
                if($params['category'] == 'head_block'){
                    $this->_cache->delete('head_block_banner');
                }
                $this->_helper->json($_SESSION['ref']);
                break;
            case 'editmeta':
                Model_Admin_Banners::editMeta($this->_getParam('id'), Model_Admin_News::deleteEmptyKey(array('content'=>$this->_getParam('content'))));
                $this->_helper->json($_SESSION['ref']);
                break;
            case 'editseo':
                Model_Admin_Banners::editSeo($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($this->_getParam('params')));
                $this->_helper->json($_SESSION['ref']);
                break;
            case 'addsett':
                Model_Admin_Settings::newField($this->_getParam('params'));
                $this->_helper->json('1');
                break;
            case 'editsett':
                $params = $this->_getParam('params');
                Model_Admin_Settings::editField($this->_getParam('id'), Model_Admin_News::deleteEmptyKey($this->_getParam('params')));
                if($params['key'] == 'show_comments'){
                    $this->_cache->delete('show_comments');
                }
                $this->_helper->json('1');
                break;

            /*
             * Sec
             */
            case 'addip':
                Model_Admin_Security::addIp(array('value'=>$this->_getParam('ip'), 'status'=>$this->_getParam('status')));
                $this->_helper->json('1');
                break;
            case 'editip':
                Model_Admin_Security::editIp($this->_getParam('id'), array('value'=>$this->_getParam('ip'), 'status'=>$this->_getParam('status')));
                $this->_helper->json('1');
                break;
            /*
             * New author
             */
            case 'newauthor':
                $user = Model_Admin_Users::getUserbyLogin($this->_getParam('user'));
               switch($this->_getParam('cont')){
                   case 'news':
                       if($user->username) {
                           Model_Admin_News::editNews($this->_getParam('id'), array('author' => $user->username, 'other6' => $user->user_id));
                           $this->_helper->json($user->username); // success
                       }else{
                           $this->_helper->json('2');
                       }
                       break;

                   case 'publ':
                       if($user->username) {
                           Model_Admin_Publ::editPubl($this->_getParam('id'), array('user' => $user->username, 'uid' => $user->user_id));
                           $this->_helper->json($user->username); // success
                       }else{
                           $this->_helper->json('2');
                       }
                       break;
               }

            // -----------------------------------------------------------------------------------------------------------------------
            default:
                exit;
                break;
        }
    }

    public function filcommstatAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Название ссылка','Количество');
        $comm = Model_Admin_Comments::getCommsFilter(strtotime($this->_getParam('df')), strtotime($this->_getParam('dt').' 23:59'), $this->_getParam('razd'), $this->_getParam('cat'));
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function filmatstatAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Дата','Добавлено');
        $comm = Model_Admin_Comments::getMatAddtimef(strtotime($this->_getParam('df').' 00:00'), strtotime(Source_M::dateIterator($this->_getParam('dt'), ' +1 day', 'd.m.Y').' 02:59'), $this->_getParam('razd'), $this->_getParam('cat'));
        $this->view->pag = $comm;

        $this->view->THBlock2 = array('Дата','Редактировано');
        $comm2 = Model_Admin_Comments::getMatLastmodf(strtotime($this->_getParam('df').' 00:00'), strtotime(Source_M::dateIterator($this->_getParam('dt'), ' +1 day', 'd.m.Y').' 02:59'), $this->_getParam('razd'), $this->_getParam('cat'));
        $this->view->pag2 = $comm2;
    }

    public function filuserstatAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Дата','Количество');
        $comm = Model_Admin_Comments::userRegsF(strtotime($this->_getParam('df')), strtotime($this->_getParam('dt').' 23:59'));
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    /*
     * Seach for Comments, Users, News,
     */

    public function searchnewsAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Название','Автор', 'Дата добавления', 'Действия');
        $this->view->search_type = $this->_getParam('s');
        $news = Model_Admin_Search::searchNews($this->_getParam('search'), $this->_getParam('s'));
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($news));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function searchpublAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Название','Автор', 'Дата добавления', 'Действия');
        $publ = Model_Admin_Search::searchPubl($this->_getParam('search'), $this->_getParam('s'));
        $this->view->search_type = $this->_getParam('s');
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($publ));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function searchuserAction()
    {
        $search = $this->_getParam('search');
        $role = $this->_getParam('role');
        if($search == '0')
            $search = '';
        if($role == '0')
            $role = '';
        $this->view->filterparams = $this->_getAllParams();
        $this->view->role = $role;
        $this->view->search_type =  $this->_getParam('s');
        $this->view->THBlock = array('ID','Имя пользователя (логин)','Рег IP','Группа', 'Полное имя', 'E-mail','Аватар','Действия');
        $users = Model_Admin_Search::searchUsers($search, $role, $this->_getParam('s'));
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($users));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function searchcommentsAction()
    {
        $this->view->filterparams = $this->_getAllParams();
        $this->view->THBlock = array('Коментарий','Действия');
        $comm = Model_Admin_Search::searchComments($this->_getParam('search'), $this->_getParam('s'));
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
        $this->view->search_type = $this->_getParam('s');
        $_SESSION['del_comm'] = Model_Admin_Search::searchComments2($this->_getParam('search'), $this->_getParam('s'));
    }
    public function logoutAction(){
        $user = Zend_Registry::get("user");
        $auth = Zend_Registry::get("auth");
        $user->session_kill();
        $this->redirect("/tncontrol/login");
    }

    public function securityAction()
    {
        $this->view->THBlock = array('#','Ip адрес','Действия');
        $comm = Model_Admin_Security::getAllIp();
        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($comm));
        $paginator->setItemCountPerPage(20);
        $paginator->setCurrentPageNumber($this->_getParam('page', 1));
        $this->view->pag = $paginator;
    }

    public function ipAction()
    {
        $ip = Model_Admin_Security::getIp($this->_getParam('id'));
        $this->view->ip = $ip;
        $this->view->ex_ip = explode('.', $ip->value);
    }

    public function popupipaddAction()
    {

    }

    public function deleteipAction()
    {
        Model_Admin_Security::deleteIp($this->_getParam('id'));
        $this->_redirect($_SERVER['HTTP_REFERER']);
    }

    public function contenuserAction()
    {
        switch($this->_getParam('content')){
            case 'news':
                $user = Model_Admin_News::getNewsById($this->_getParam('id'));
                $this->view->user = $user->author;
                break;
            case 'publ':
                $user = Model_Admin_Publ::getPublbyId($this->_getParam('id'));
                $this->view->user = $user->user;
                break;
        }
        $this->view->id = $this->_getParam('id');
        $this->view->content = $this->_getParam('content');
    }
}