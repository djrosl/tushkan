<?php
class NewsController extends Zend_Controller_Action
{
    public function filmotekaAction()
	{
        $film = $this->_getParam("id");
        $type = $this->_getParam("type");
        $task = $this->_getParam("task");
        if(!$type || !is_numeric($type) || !in_array($type, array(1, 2, 3)) || !$film || !is_numeric($film) || $film < 1
            || !in_array($task, array('add', 'remove'))) {
            die('error|Неверный запрос');
        }

        $exists = (array)Model_News::getOneNewsById($film);
        if(!$exists) {
            die('error|Неверный запрос');
        }

        $user = Zend_Registry::get("user");
        $user = $user->data['is_registered'] ? $user->data['user_id'] : 0;

        if($user == 0) {
            die('register|Только для зарегистрированных пользователей');
        }

        $types = Model_News::getFilmoteka($user, $film);
        /*array('1' => 0, '2' => 0, '3' => 0);
        $db = Zend_Db_Table::getDefaultAdapter();
        $query = $db->query('SELECT type FROM `filmoteka` WHERE id_user = "'..'" AND id_film = "'.$film.'"');
        $results = $query->fetchall();
        foreach($results as $row) {
            $types[$row->type] = 1;
        }*/

        $db = Zend_Db_Table::getDefaultAdapter();
        switch($task) {
            case 'add':
                if($types[$type] == 1) {
                    die('error|Не нужно повторяться');
                }
                $db->query('INSERT INTO `filmoteka` (id_user, id_film, type) VALUES ("'.$user.'", "'.$film.'", "'.$type.'")');
                $types[$type] = 1;
                break;

            case 'remove':
                $query = $db->query('DELETE FROM `filmoteka` WHERE type = "'.$type.'" AND id_user = "'.$user.'" AND id_film = "'.$film.'"');
                break;
        }
        $response = 'ok|';
        foreach($types as $type) {
            $response .= '|'.$type;
        }
        die($response);
	}

    public function votefilmAction()
    {
        $film = $this->_getParam("id");
        $type = $this->_getParam("type");

        if(!$type || !is_numeric($type) || $type == 0 || !$film || !is_numeric($film) || $film < 1) {
            die('error|Неверный запрос');
        }

        $exists = (array)Model_News::getOneNewsById($film);
        if(!$exists) {
            die('error|Неверный запрос');
        }

        $user = Zend_Registry::get("user");
        $ip = GetIp();
        $user = $user->data['is_registered'] ? $user->data['user_id'] : 0;

        $vote = Model_Votes::getNewVote($film, $user);

        if($vote != null && $vote['ip'] == $ip) {
            die('error|Ваш голос "'.($vote['vote'] > 0 ? "Нравится" : 'Не нравится').'" был учтен ранее');
        }

        $typeString = $type > 0 ? 'cool' : 'bad';

        if(!Model_News::updateNewsData($film, array($typeString => $exists[$typeString] + 1))
            || !Model_Votes::saveVote($film, $user, $ip, $type)) {
            die('error|Произошла ошибка. Попробуйте проголосоавть позже.');
        }

        $memcache = Zend_Registry::get("memcache");
        $memcache->delete('one_news_'.$film);

        die('ok|Ваш голос учтен');
    }

    public function topAction()
    {
        $server_uri = explode('/', $_SERVER["REQUEST_URI"]);
        $order = $server_uri[count($server_uri) - 1];
        $types = array('comments' => 'count_comments', 'rating' => 'rate_num', 'view' => 'reads1');
        $typesText = array('comments' => 'числу комментариев', 'rating' => 'рейтингу', 'view' => 'просмотрам');
        if($order == 'top') {
            $this->_redirect('/news/top/rating');
        }
        if(empty($order) || !array_key_exists($order, $types)) {
            $this->_redirect('/error404');
        }

        $memcache = Zend_Registry::get("memcache");
        $key = 'top_news_'.$order;
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $news = Model_News::getTopBy($types[$order], MOVIE_TOP_COUNT);
            $memcache->set($key, $news, false, 3600 * 24 * 60);
        } else {
            $news = $result;
        }
        if(!$news){
            $this->_redirect('/error404');
        }

        $this->view->title = 'ТОП фильмов по '.$typesText[$order];
        $this->view->films = $news;
        $this->view->topname = $typesText[$order];
        $this->view->order = $order;
        $this->view->orderField = $types[$order];
    }

    public function  tagAction()
    {
        $server_uri = explode('/', $_SERVER["REQUEST_URI"]);
        $tag = $server_uri[count($server_uri) - 2];
        $page = $server_uri[count($server_uri) - 1];


        if(empty($tag) || !is_numeric($page) || $page < 1) {
            $this->_redirect('/error404');
        }

        $key = 'tag_is_'.$tag; $result = null;
        $memcache = Zend_Registry::get("memcache");
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false) {
            $result = Model_News::getNewsTagInfo($tag);
            $memcache->set($key, $result, false, NEWS_VIEW_CACHE_LIFETIME);
        }

        $tag = $result;

        if($tag == null) {
            $this->_redirect('/error404');
        }

        switch($tag['type']) {
            case 'producer':
                $this->view->title = $tag['title']." все фильмы смотреть онлайн бесплатно в хорошем качестве";
                $this->view->meta_kw = "режиссер ".$tag['title']." фильмы онлайн, смотреть ".$tag['title']." онлайн, все материалы с ".$tag['title']." смотреть";
                $this->view->meta_descr = $tag['title']." cмотреть фильмы онлайн бесплатно, в хорошем качестве без регистрации. Лучшие фильмы ".$tag['title'].", режиссер ".$tag['title']." и все его фильмы";
                $this->view->h1 = $tag['title'];
                break;

            case 'actor':
                $this->view->title = $tag['title']." все фильмы смотреть онлайн бесплатно в хорошем качестве";
                $this->view->meta_kw = $tag['title']." фильмы онлайн, смотреть ".$tag['title']." онлайн, все материалы с ".$tag['title']." смотреть";
                $this->view->meta_descr = $tag['title']." cмотреть фильмы онлайн бесплатно, в хорошем качестве без регистрации. Лучшие фильмы ".$tag['title'].", ".$tag['title']." и все его фильмы";
                $this->view->h1 = $tag['title'];
                break;

            case 'country':
                $this->view->title = "Смотреть фильмы онлайн, фильмы ".$tag['title']." онлайн";
                $this->view->meta_kw = "фильмы ".$tag['title']." онлайн, смотреть фильмы ".$tag['title'].", кино ".$tag['title'].", фильмы ".$tag['title'].", кино ".$tag['title']." смотреть";
                $this->view->meta_descr = "Смотреть ".$tag['title']." фильмы онлайн бесплатно, в хорошем качестве без регистрации. Лучшие фильмы проката ".$tag['title'].", известных режиссеров и актеров совершенно бесплатно без смс.";
                $this->view->h1 = "Раздел с фильмами и сериалами ".$tag['title'];
                break;

            case 'year':
                $this->view->title = "Фильмы ".$tag['title']." смотреть онлайн, смотреть кино новинки ".$tag['title']." в хорошем качестве";
                $this->view->meta_kw = "лучшие фильмы ".$tag['title'].", новинки кино ".$tag['title']." года, фильмы ".$tag['title']." года смотрите онлайн бесплатно, фильмы ".$tag['title']." в хорошем качестве";
                $this->view->meta_descr = "Все фильмы новинки ".$tag['title']." года онлайн в хорошем качестве. У нас посмотреть фильмы ".$tag['title']." года онлайн можно бесплатно и без регистрации.";
                $this->view->h1 = "Раздел с фильмами и сериалами ".$tag['title']." года";
                break;

            case 'quality':
                $this->view->title = $tag['title']." фильмы смотреть онлайн бесплатно в хорошем качестве, кино смотреть в качестве ".$tag['title'];
                $this->view->meta_kw = "блюрей качество, ".$tag['title']." качество, смотреть онлайн фильмы в высоком качестве, фильмы онлайн смотреть в хорошем качестве";
                $this->view->meta_descr = "Фильмы в ".$tag['title']." качестве смотреть онлайн бесплатно, фильмы смотреть в качестве ".$tag['title']." на Tushkan.NET";
                $this->view->h1 = "Смотреть фильмы в качестве ".$tag['title'];
                break;

            case 'custom':
                $this->view->title = $tag['title']." фильмы смотреть онлайн бесплатно в хорошем качестве, кино смотреть в качестве ".$tag['title'];
                $this->view->meta_kw = $tag['title'];
                $this->view->meta_descr = $tag['title'];
                $this->view->h1 = $tag['title'];
                break;

            case 'category':
            default:
                $this->view->title = $tag['title'].' смотреть онлайн бесплатно, лучшие '.$tag['title'].' смотреть онлайн бесплатно в хорошем качестве';
                $this->view->meta_kw = $tag['title']."смотреть онлайн, лучшие ".$tag['title']." смотреть онлайн, новые ".$tag['title']." смотреть онлайн бесплатно в хорошем качестве";
                $this->view->meta_descr = "Если вы ищите ".$tag['title']." онлайн, то вы по адресу у нас лучшие и новые ".$tag['title']." онлайн, приятного просмотра.";
                $this->view->h1 = $tag['title'].' смотреть онлайн бесплатно';
                break;

        }

        $this->view->h2 = '';

        if(!empty($tag['header'])) {
            $this->view->title = $tag['header'];
        }
        if(!empty($tag['h1'])) {
            $this->view->h1 = $tag['h1'];
        }
        if(!empty($tag['h2'])) {
            $this->view->h2 = $tag['h2'];
        }
        if(!empty($tag['meta_kw'])) {
            $this->view->meta_kw = $tag['meta_kw'];
        }
        if(!empty($tag['meta_descr'])) {
            $this->view->meta_descr = $tag['meta_descr'];
        }
        $key = 'news_tags_'.$tag['name'];
        if(NEWS_VIEW_CACHE_OFF || ($paginator = $memcache->get($key)) === false){
            $db = Zend_Db_Table::getDefaultAdapter();
            if($tag['type'] == 'custom') {
              switch($tag['name']) {
                case 'hd_filmy':
                    $sql1 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.`tags` LIKE "quality_bdrip,%" OR n.`tags` LIKE "%,quality_bdrip,%" OR n.`tags` LIKE "%,quality_bdrip")';
                    $sql2 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.`tags` LIKE "quality_hdtvrip,%" OR n.`tags` LIKE "%,quality_hdtvrip,%" OR n.`tags` LIKE "%,quality_hdtvrip")';
                    $sql3 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.`tags` LIKE "quality_hdrip,%" OR n.`tags` LIKE "%,quality_hdrip,%" OR n.`tags` LIKE "%,quality_hdrip")';
                    $select = $db->select()->union(array($sql1, $sql2, $sql3), Zend_Db_Select::SQL_UNION_ALL)->order('addtime DESC');
                    //die($select);
                    break;

                case 'novinki_kino':
                    $year = date('Y');
                    $sql1 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.catID NOT IN (3, 7) AND (n.`tags` LIKE "'.$year.',%" OR n.`tags` LIKE "%,'.$year.',%" OR n.`tags` LIKE "%,'.$year.'"))';
                    $sql2 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.catID NOT IN (3, 7) AND (n.`tags` LIKE "'.($year + 1).',%" OR n.`tags` LIKE "%,'.($year + 1).',%" OR n.`tags` LIKE "%,'.($year + 1).'"))';
                    $sql3 = '(SELECT n.*, c.name as cat_name FROM `news` n JOIN nw_nw c ON c.id = n.catID WHERE n.catID NOT IN (3, 7) AND (n.`tags` LIKE "'.($year - 1).',%" OR n.`tags` LIKE "%,'.($year - 1).',%" OR n.`tags` LIKE "%,'.($year - 1).'"))';
                    $select = $db->select()->union(array($sql1, $sql2, $sql3), Zend_Db_Select::SQL_UNION_ALL)->order('addtime DESC');
                    //die($select);
                    break;
                default:
                    $this->_redirect('/error404');
              }
            } else {
              $select = $db->select()->from('news')
                  ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
                  ->where('tags LIKE ?', "%,".$tag['name'].",%")
                  ->Orwhere('tags LIKE ?', $tag['name'].",%")
                  ->Orwhere('tags LIKE ?', "%,".$tag['name'])
                  ->order('ontop DESC')
                  ->order('addtime DESC');
            }
            //die($select);
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, NEWS_VIEW_CACHE_LIFETIME);
        }

        $paginator->setCurrentPageNumber($page);
        $this->view->news = $paginator;
        $this->view->page_number = $page;
        $this->view->title_tag = $tag['title'];
        $_REQUEST['tag'] = $tag['name'];
        $_REQUEST['tagpage'] = true;
        $this->_helper->viewRenderer('index');
    }

    public function allserialsAction()
    {
        $category_id = 7;
        $second_param = $page_number = 1;
        $category = (array) Model_News::getCategoryById($category_id);
        $this->view->title = $category['name'];
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_cat_allserialy';
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('news')
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
            ->where('news.catID = ?', $category_id)
            ->order('ontop DESC')->order('addtime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(1000000);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, NEWS_VIEW_CACHE_LIFETIME);
        } else {
            $paginator = $result;
        }
        $paginator->setCurrentPageNumber($page_number);
        $this->view->all_count_pages = $paginator->count();
        $this->view->title = 'Все сериалы на Tushkan.TV';
        $this->view->news = $paginator;
        $this->view->category = $category;
        $this->view->page_number = $page_number;
        Zend_Registry::set("active_cat_allserialy");
        //$this->_helper->viewRenderer('index');
    }


    public function  indexAction()
    {
        //$this->_redirect('/error404');

        $server_uri = $_SERVER["REQUEST_URI"];

        if($server_uri == "/news" || $server_uri == "/news/" || $server_uri == "/news/?page1"
            || 0 === strpos($server_uri, '/news?')
            || (0 === strpos($server_uri, '/news/?') && !preg_match('!/news/\?page\d+$!',$server_uri))) {
            $this->_redirect('/error404');
        }
        $str = substr($server_uri,1); // убираем первый слеш "/"
        $is_news = strpos($str, "news");
        $page_number = 0;
        $category_id = 0;
        if($is_news === false){
            $this->_redirect('error404');
        }else{
            $str = substr($str,5); // убираем строку "news"
            $is_slash = strpos($str, "/");
            if($is_slash === false){ // если нету в строке "/"
                $is_ask = strpos($str, "?");
                if($is_ask === false){
                    $min_pos_1 = strpos($str, "-");
                    if($min_pos_1 === false){
                        $category_id = (int)($str);
                    }else{
                        $str2 = substr($str,0,$min_pos_1);
                        $category_id = (int)($str2);
                        $str3 = substr($str,$min_pos_1+1);
                        $min_pos_2 = strpos($str3, "-");
                        $str4 = substr($str3,0,$min_pos_2);
                        $page_number = (int)($str4);
                    }
                }else{
                    $str2 = substr($str,$is_ask+5);
                    $page_number = (int)($str2);
                }
            }else{
                $category_name = substr($str,0,$is_slash);
                $str2 = substr($str,$is_slash+1);
                $min_pos_1 = strpos($str2, "-");
                if($min_pos_1 === false){
                    $category_id = (int)($str2);
                }else{
                    $str3 = substr($str2,0,$min_pos_1);
                    $category_id = (int)($str3);
                    $str4 = substr($str2,$min_pos_1+1);
                    $min_pos_2 = strpos($str4, "-");
                    $str5 = substr($str4,0,$min_pos_2);
                    $page_number = (int)($str5);
                }
            }

        }

        $this->view->title = "Архив материалов - Смотреть онлайн фильмы бесплатно и без регистрации";
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_index_page';
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('news')
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
            ->order('ontop DESC')->order('addtime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, NEWS_VIEW_CACHE_LIFETIME);
        } else {
            $paginator = $result;
        }

        $paginator->setCurrentPageNumber($page_number);
        
        $this->view->news = $paginator;
        $this->view->page_number = $page_number;
    }

    public function newsAction()
    {
        $server_uri = $_SERVER["REQUEST_URI"];
        $str = substr($server_uri,1); // убираем первый слеш "/"
        $is_news = strpos($str, "news");
        $category_id = 0;
        $second_param = 0;
        $page_number = 0;
        $category_name = "";
        if($is_news === false){
            $this->_redirect('/error404');
        }else{
            $str = substr($str,5); // убираем строку "news"
            $is_slash = strpos($str, "/");
            if($is_slash === false){ // если нету в строке "/"
                $min_pos_1 = strpos($str, "-");
                if($min_pos_1 === false){
                    $page_number = (int)($str);
                }else{
                    $str2 = substr($str,0,$min_pos_1);
                    $page_number = (int)($str2);
                    $str3 = substr($str,$min_pos_1+1);
                    $min_pos_2 = strpos($str3, "-");
                    $str4 = substr($str3,0,$min_pos_2);
                    $second_param = (int)($str4);
                    $str5 = substr($str3,$min_pos_2+1);
                    $category_id = (int)($str5);
                }
            }else{
                $category_name = substr($str,0,$is_slash);
                $str2 = substr($str,$is_slash+1);
                $min_pos_1 = strpos($str2, "-");
                if($min_pos_1 === false){
                    $page_number = (int)($str2);
                }else{
                    $str3 = substr($str2,0,$min_pos_1);
                    $page_number = (int)($str3);
                    $str4 = substr($str2,$min_pos_1+1);
                    $min_pos_2 = strpos($str4, "-");
                    $str5 = substr($str4,0,$min_pos_2);
                    if($str5 != "0"){
                        $this->_redirect('/error404');
                    }
                    $second_param = (int)($str5);
                    $str6 = substr($str4,$min_pos_2+1);
                    $category_id = (int)($str6);
                    $str_category_id = (string) $category_id;
                    if($str_category_id != $str6){
                        $this->_redirect('/error404');
                    }
                }
            }

        }

        //var_dump("category_id = ".$category_id." second_param = ".$str5." page_number = ".$page_number);die;
        $category = (array) Model_News::getCategoryById($category_id);

        if($category['description'] != $category_name) {
            $this->_redirect('/news/'.$category['description'].'/'.$page_number.'-0-'.$category_id);
        }
        //print_r($category);die($category_name);

        $this->view->title = $category['name'];
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_cat'.$category_id;
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('news')
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name'))
            ->where('news.catID = ?',$category_id)
            ->order('ontop DESC')->order('addtime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, NEWS_VIEW_CACHE_LIFETIME);
        } else {
            $paginator = $result;
        }
        
        $paginator->setCurrentPageNumber($page_number);
        
        $this->view->all_count_pages = $paginator->count();
        $this->view->news = $paginator;
        $this->view->category = $category;
        $this->view->page_number = $page_number;
        Zend_Registry::set("active_cat",$category['description']);
    }

    public function viewAction(){
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $this->view->ip = $user_ip;
        $server_uri = $_SERVER["REQUEST_URI"];
        $comments_order = $this->_getParam("comments_order");
        $str = substr($server_uri,1); // убираем первый слеш "/"
        $str_order = strpos($server_uri, "?comments_order");
        $is_news = strpos($str, "news");
        $item_id = 0;
        $item_name = "";
        $page_number = 0;

        $parts = explode('/', substr($_SERVER["REQUEST_URI"], 1));
        $partsNew = explode('-', $parts[count($parts) - 1]);
        if(count($partsNew) > 6) {
            while(count($partsNew) > 6) {
                unset($partsNew[count($partsNew) - 1]);
            }
            $this->_redirect('/'.$parts[0].'/'.$parts[1].'/'.implode('-', $partsNew));
        }

        if($is_news === false){
            $this->_redirect('/error404');
        }else{
            $str = substr($str,5); // убираем строку "news"
            $is_slash = strpos($str, "/");
            $item_name = substr($str,0,$is_slash);
            $str2 = substr($str,$is_slash+1);
            
            $min_pos_1 = strpos($str2, "-");
            $str3 = substr($str2,$min_pos_1+1);
            $min_pos_2 = strpos($str3, "-");
            $str4 = substr($str3,$min_pos_2+1);
            $min_pos_3 = strpos($str4, "-");
            $str5 = substr($str4,$min_pos_3+1);
            $min_pos_4 = strpos($str5, "-");
            if($min_pos_4 === false){
                $item_id = (int)($str5);
                $page_number = 1;
                $str_item_id = (string) $item_id;
                if($str_item_id != $str5){
                    if($str_order === false){
                        $this->_redirect('/error404');
                    }
                }
            }else{
                $str6 = substr($str5,0,$min_pos_4);
                if(!is_numeric($str6)) {
                    $this->_redirect('/error404');
                }
                $item_id = $str6;
                $str7 = substr($str5,$min_pos_4+1);
                $min_pos_5 = strpos($str7, "-");
                $str8 = substr($str7,0,$min_pos_5);
                $param_0 = (int)($str8);
                $str9 = substr($str7,$min_pos_5+1);
                $page_number = (int)($str9);
            }
            $data1 = substr($str2,0,$min_pos_1);
            $data2 = substr($str3,0,$min_pos_2);
            $data3 = substr($str4,0,$min_pos_3);
            $date_url = $data1."-".$data2."-".$data3;
        }
        if($min_pos_1 === false || $min_pos_2 === false || $min_pos_3 === false){
            $this->_redirect('/error404');
        }
        
        if($item_id == 0){
            $this->_redirect('/error404');
        }

        $memcache = Zend_Registry::get("memcache");
        $key = 'one_news_'.$item_id;
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $one_news = Model_News::getOneNewsById($item_id);
            $one_news_arr = (array) $one_news;
            $image = $one_news_arr['other1'];
            $is_admins = strpos($image,'/_nw/');
            if($is_admins !== false){
                $image = 'http://tushkan.net'.$one_news_arr['other1'];
            }
            $name = CACHE_DIR.'/one_news_'.$one_news_arr['id'].'.jpg';
            $this->view->resizeImage($image,$name,170,250);
            $memcache->set($key, $one_news, false, NEWS_VIEW_CACHE_LIFETIME);
            //$this->getResponse()->appendBody('<div style="display:none;">data WRITE TO cache</div>');
        } else {
            $one_news = $result;
            //$this->getResponse()->appendBody('<div style="display:none;">data GET FROM cache</div>');
        }
        
        if($one_news == false){
            $this->_redirect('/error404');
        }else{
            $one_news = (array) $one_news;
        }

        $key = md5($one_news['tags']);
        if(FSDEBUG || ($tags = $memcache->get($key)) === false) {
            $tags = Model_News::getNewsTagsInfo($one_news['tags']);
            $memcache->set($key, $tags, false, 3600 * 24 * 7);
        }
        $this->view->tags = $tags;

        $user_online = Zend_Registry::get("user");
        $this->view->filmoteka = Model_News::getFilmoteka($user_online->data['user_id'], $item_id);

        if($one_news['hide_on_site'] == "1"){
            if($user_online->data['group_id'] != "5" && $user_online->data['group_id'] != "8" && $user_online->data['group_id'] != "9"){
                $this->_redirect('/error404');
            }
        }

        $one_news_addtime = date('Y-m-d', $one_news['urltime']);
        if($item_name != $one_news['sbscr']){
            if($page_number == 1){
                $this->_redirect('/news/'.$one_news['sbscr'].'/'.$one_news_addtime.'-'.$item_id);
            }else{
                $this->_redirect('/news/'.$one_news['sbscr'].'/'.$one_news_addtime.'-'.$item_id.'-0-'.$page_number);
            }
        }elseif($one_news_addtime != $date_url){
            if($page_number == 1){
                $this->_redirect('/news/'.$one_news['sbscr'].'/'.$one_news_addtime.'-'.$item_id);
            }else{
                $this->_redirect('/news/'.$one_news['sbscr'].'/'.$one_news_addtime.'-'.$item_id.'-0-'.$page_number);
            }
        }
        $this->view->one_news = $one_news;
        $this->view->isPageOfFilm = true;
        Zend_Registry::set("active_cat",$one_news['cat_description']);
        
        $key = 'show_comments';
        if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
            $show_comments = Model_Settings::getParamSettingsByKey('show_comments');
            $memcache->set($key, $show_comments, false, NEWS_VIEW_CACHE_LIFETIME);
        } else {
            $show_comments = $result;
        }
        $this->view->show_comments = $show_comments->value;
        if($show_comments->value == 'on'){
            $key = 'comments_keys_material_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $comments = Model_Comments::getCommentsIdsByMaterialID($item_id,2);
                $comments_keys = array();
                foreach($comments as $k=>$comment){
                    $comments_keys[$comment['commentID']] = $k+1;
                }
                $memcache->set($key, $comments_keys, false, 3600);
            } else {
                $comments_keys = $result;
            }
            $this->view->comments_keys = $comments_keys;

            $key = 'count_comments_item_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $count_comments = Model_Comments::getCountCommentsByMaterialID($item_id,2);
                $memcache->set($key, $count_comments, false, 3600);
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
            
            $key = 'news_comments_material_'.$item_id.'_order_'.$comments_order;
            if(NEWS_VIEW_CACHE_OFF || ($result = $memcache->get($key)) === false ) {
                $db = Zend_Db_Table::getDefaultAdapter();
                $select = $db->select()->from('comments')
                    ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                    ->where('comments.moduleID = 2')
                    ->where('comments.materialID = ?',$item_id)
                    ->where('comments.parentID = 0')
                    ->order('addTime '.$comments_order);
                //die($select->__toString());
                $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
                $paginator->setItemCountPerPage(COMMENTS_COUNT);
                $memcache->set($key, $paginator, false, NEWS_VIEW_CACHE_LIFETIME);
            } else {
                $paginator = $result;
            }
            $paginator->setCurrentPageNumber($page_number);
            
            $this->view->comments = $paginator;
            $this->view->page_number = $page_number;

            $count_pages = $paginator->getPages()->pageCount;

            $url = $_SERVER['REQUEST_URI'];
            if(preg_match('/\?.+$/', $url)) {
                $url = preg_replace('/\?.+$/', '', $url);
            }
            if(preg_match('/\-0\-1(\?.+)?$/', $url)) {
                $url = preg_replace('/\-0\-1(\?.+)?$/', '', $url);
                $this->_redirect($url);
            }
            if($count_pages != 0 && $page_number > $count_pages){
                 $url = preg_replace('/\-0\-'.$page_number.'(\?.+)?$/', '', $url);
                 $this->_redirect($url);
            }
            if($url != $_SERVER['REQUEST_URI']) {
                $this->_redirect($url);
            }
            if($count_pages == 0 && $page_number > 1){
                 $page_number = 1;
            }
        }

        $key = 'recommend_to_view';
        if(NEWS_VIEW_CACHE_OFF ||  ($result = $memcache->get($key)) === false ) {
            $last_films = Model_News::getLastFilms();
            $memcache->set($key, $last_films, false, 10800);
        } else {
            $last_films = $result;
        }
        $this->view->last_films = $last_films;

        if (!isset($_COOKIE['films'])) {
            SetCookie('films['.$item_id.']','film'.$item_id,time()+86400);
            $key = 'reads_news_'.$item_id;
            if(($result = $memcache->get($key)) === false ) {
                $count_reads = (int) $one_news['reads1'];
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
            
            $key = 'news_'.$item_id.'_updated';
            if(($result = $memcache->get($key)) === false ) {
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                if( !( ($hours >= 16) && ($hours <= 23) ) ){
                    Model_News::updateNewsData($item_id, array("reads1" => $reads));
                }
                $memcache->set($key, 'no', false, 14400);
                $need_clean = 'yes';
            } else {
                $need_clean = $result;
            }
            
            if($need_clean == 'yes'){
                $memcache->delete('one_news_'.$item_id);
                $memcache->delete('index_index_page');
                $memcache->delete('news_index_page');
                $memcache->delete('news_cat'.$one_news['catID']);
            }
        }

    }
    
    public function rssAction()
	{
		$this->view->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
        //include_once("rss.php");
        $this->_redirect('/rss.xml');
	}
    
    public function playerAction()
    {
        $memcache = Zend_Registry::get("memcache");
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $this->view->ip = $user_ip;
        $server_uri = $_SERVER["REQUEST_URI"];
        $comments_order = $this->_getParam("comments_order");
        $str = substr($server_uri,1); // убираем первый слеш "/"
        $is_news = strpos($str, "news");
        $item_id = 0;
        $item_name = "";
        $page_number = 0;
        if($is_news === false){
            var_dump("error url");die;
        }else{
            $str = substr($str,5); // убираем строку "news"
            $is_slash = strpos($str, "/");
            $item_name = substr($str,0,$is_slash);
            $str2 = substr($str,$is_slash+1);
            
            $min_pos_1 = strpos($str2, "-");
            $str3 = substr($str2,$min_pos_1+1);
            $min_pos_2 = strpos($str3, "-");
            $str4 = substr($str3,$min_pos_2+1);
            $min_pos_3 = strpos($str4, "-");
            $str5 = substr($str4,$min_pos_3+1);
            $min_pos_4 = strpos($str5, "-");
            
            if($min_pos_4 === false){
                $item_id = (int)($str5);
                $page_number = 1;
            }else{
                $str6 = substr($str5,0,$min_pos_4);
                $item_id = (int)($str6);
                $str7 = substr($str5,$min_pos_4+1);
                $min_pos_5 = strpos($str7, "-");
                $str8 = substr($str7,0,$min_pos_5);
                $param_0 = (int)($str8);
                $str9 = substr($str7,$min_pos_5+1);
                $page_number = (int)($str9);
            }
        }
        
        //var_dump("item_id = ".$page_number." item_name = ".$item_name);die;
        $one_news = (array) Model_StaticPages::getPageById($item_id);
        $this->view->one_news = $one_news;
        $category = (array) Model_News::getCategoryById($one_news['catID']);
        //Zend_Debug::dump($category);die;
        $this->view->category = $category;
        
        $key = 'show_comments';
        if(($result = $memcache->get($key)) === false ) {
            $show_comments = Model_Settings::getParamSettingsByKey('show_comments');
            $memcache->set($key, $show_comments, false, 0);
        } else {
            $show_comments = $result;
        }
        $this->view->show_comments = $show_comments->value;
        
        if($show_comments->value == 'on'){
            $key = 'comments_keys_material_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $comments = Model_Comments::getCommentsIdsByMaterialID($item_id,2);
                $comments_keys = array();
                foreach($comments as $k=>$comment){
                    $comments_keys[$comment['commentID']] = $k+1;
                }
                $memcache->set($key, $comments_keys, false, 0);
            } else {
                $comments_keys = $result;
            }
            $this->view->comments_keys = $comments_keys;
            
            $key = 'count_comments_item_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $count_comments = Model_Comments::getCountCommentsByMaterialID($item_id,2);
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
            
            $key = 'news_comments_material_'.$item_id.'_order_'.$comments_order;
            if(true || ($result = $memcache->get($key)) === false ) {
                $db = Zend_Db_Table::getDefaultAdapter();
                $select = $db->select()->from('comments')
                    ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                    ->where('comments.moduleID = 2')
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
                $this->_redirect('/error404');
            }
            if($count_pages == 0 && $page_number > 1){
                $this->_redirect('/error404');
            }
        }
        
        if (!isset($_COOKIE['player'])) {
            SetCookie('player','player',time()+86400);
            $key = 'reads_player';
            if(($result = $memcache->get($key)) === false ) {
                $count_reads = (int) $one_news['reads1'];
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
            
            $key = 'player_updated';
            if(($result = $memcache->get($key)) === false ) {
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                if( !( ($hours >= 16) && ($hours <= 23) ) ){
                    Model_StaticPages::updatePageData($item_id, array("reads1" => $reads));
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
    
    public function zarabotaiAction()
    {
        $memcache = Zend_Registry::get("memcache");
        $request = Zend_Controller_Front::getInstance()->getRequest();
        $servParam = $request->getServer();
        $user_ip = $servParam["HTTP_X_REAL_IP"];
        $this->view->ip = $user_ip;
        $server_uri = $_SERVER["REQUEST_URI"];
        $comments_order = $this->_getParam("comments_order");
        $str = substr($server_uri,1); // убираем первый слеш "/"
        $is_news = strpos($str, "news");
        $item_id = 0;
        $item_name = "";
        $page_number = 0;
        if($is_news === false){
            var_dump("error url");die;
        }else{
            $str = substr($str,5); // убираем строку "news"
            $is_slash = strpos($str, "/");
            $item_name = substr($str,0,$is_slash);
            $str2 = substr($str,$is_slash+1);
            
            $min_pos_1 = strpos($str2, "-");
            $str3 = substr($str2,$min_pos_1+1);
            $min_pos_2 = strpos($str3, "-");
            $str4 = substr($str3,$min_pos_2+1);
            $min_pos_3 = strpos($str4, "-");
            $str5 = substr($str4,$min_pos_3+1);
            $min_pos_4 = strpos($str5, "-");
            
            if($min_pos_4 === false){
                $item_id = (int)($str5);
                $page_number = 1;
            }else{
                $str6 = substr($str5,0,$min_pos_4);
                $item_id = (int)($str6);
                $str7 = substr($str5,$min_pos_4+1);
                $min_pos_5 = strpos($str7, "-");
                $str8 = substr($str7,0,$min_pos_5);
                $param_0 = (int)($str8);
                $str9 = substr($str7,$min_pos_5+1);
                $page_number = (int)($str9);
            }
        }
        
        //var_dump("item_id = ".$page_number." item_name = ".$item_name);die;
        $one_news = (array) Model_StaticPages::getPageById($item_id);
        $this->view->one_news = $one_news;
        $category = (array) Model_News::getCategoryById($one_news['catID']);
        //Zend_Debug::dump($category);die;
        $this->view->category = $category;
        
        $key = 'show_comments';
        if(($result = $memcache->get($key)) === false ) {
            $show_comments = Model_Settings::getParamSettingsByKey('show_comments');
            $memcache->set($key, $show_comments, false, 0);
        } else {
            $show_comments = $result;
        }
        $this->view->show_comments = $show_comments->value;
        
        if($show_comments->value == 'on'){
            $key = 'comments_keys_material_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $comments = Model_Comments::getCommentsIdsByMaterialID($item_id,2);
                $comments_keys = array();
                foreach($comments as $k=>$comment){
                    $comments_keys[$comment['commentID']] = $k+1;
                }
                $memcache->set($key, $comments_keys, false, 0);
            } else {
                $comments_keys = $result;
            }
            $this->view->comments_keys = $comments_keys;
            
            $key = 'count_comments_item_'.$item_id.'_module_2';
            if(($result = $memcache->get($key)) === false ) {
                $count_comments = Model_Comments::getCountCommentsByMaterialID($item_id,2);
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
            
            $key = 'news_comments_material_'.$item_id.'_order_'.$comments_order;
            if(($result = $memcache->get($key)) === false ) {
                $db = Zend_Db_Table::getDefaultAdapter();
                $select = $db->select()->from('comments')
                    ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                    ->where('comments.moduleID = 2')
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
                $this->_redirect('/error404');
            }
            if($count_pages == 0 && $page_number > 1){
                $this->_redirect('/error404');
            }
        }
        
        if (!isset($_COOKIE['zarabotai'])) {
            SetCookie('zarabotai','zarabotai',time()+86400);
            $key = 'reads_zarabotai';
            if(($result = $memcache->get($key)) === false ) {
                $count_reads = (int) $one_news['reads1'];
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
            
            $key = 'zarabotai_updated';
            if(($result = $memcache->get($key)) === false ) {
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                if( !( ($hours >= 16) && ($hours <= 23) ) ){
                    Model_StaticPages::updatePageData($item_id, array("reads1" => $reads));
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

}