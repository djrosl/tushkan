<?php
class PublController extends Zend_Controller_Action
{
   public function indexAction()
   {
       $server_uri = $_SERVER["REQUEST_URI"];

       if($server_uri == "/publ/" || $server_uri == "/publ/?page1"
            || 0 === strpos($server_uri, '/publ?')
            || (0 === strpos($server_uri, '/publ/?') && !preg_match('!/publ/\?page\d+$!',$server_uri))) {
            $this->_redirect('/error404');
        }

       $str = substr($server_uri,1); // убираем первый слеш "/"
       $is_publ = strpos($str, "publ");
       $page_number = 0;
       $category_id = 0;
       if($is_publ === false){
           $this->_redirect('/error404');
       }else{
           $str = substr($str,5); // убираем строку "publ"
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
        //var_dump("category_id = ".$category_id." category_name = ".$category_name." page_number = ".$page_number);die;
        $this->view->title = "Новости кино 2015, новости кино со всего мира и новости российского кино";
       
        $memcache = Zend_Registry::get("memcache");
        $key = 'publ_index_page';
        if(($result = $memcache->get($key)) === false){
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('publ')
            ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
            ->order('addtime DESC');
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(10);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, 0);
        }else{
            $paginator = $result;
        }
        
        $paginator->setCurrentPageNumber($page_number);
        
        $this->view->publs = $paginator;
        $this->view->page_number = $page_number;
        
        $this->view->param_cat = 'publ';
   }
   
   public function publAction()
   {
       $server_uri = $_SERVER["REQUEST_URI"];
       $str = substr($server_uri,1); // убираем первый слеш "/"
       $is_publ = strpos($str, "publ");
       $page_number = 0;
       $category_id = 0;
       $category_name = "";
       if($is_publ === false){
           $this->_redirect('/error404');
       }else{
           $str = substr($str,5); // убираем строку "publ"
           $is_slash = strpos($str, "/");
           if($is_slash === false){ // если нету в строке "/"
               $min_pos_1 = strpos($str, "-");
               if($min_pos_1 === false){
                   $category_id = (int)($str);
                   if($category_id != 1){
                       $this->_redirect('/error404');
                   }
                   $str_cat_id = (string) $category_id;
                   if($str_cat_id != $str){
                       $this->_redirect('/error404');
                   }
               }else{
                   $str2 = substr($str,0,$min_pos_1);
                   $category_id = (int)($str2);
                   $str_cat_id = (string) $category_id;
                   if($str_cat_id != $str2){
                       $this->_redirect('/error404');
                   }
                   $str3 = substr($str,$min_pos_1+1);
                   $min_pos_2 = strpos($str3, "-");
                   $str4 = substr($str3,0,$min_pos_2);
                   $page_number = (int)($str4);
               }
           }else{
               $category_name = substr($str,0,$is_slash);
               $str2 = substr($str,$is_slash+1);
               $min_pos_1 = strpos($str2, "-");
               if($min_pos_1 === false){
                   $category_id = (int)($str2);
                   $str_cat_id = (string) $category_id;
                   if($str_cat_id != $str2){
                       $this->_redirect('/error404');
                   }
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

       //var_dump("category_id = ".$category_id." category_name = ".$category_name." page_number = ".$page_number);die;
        if($category_id == 0){
            $this->_redirect('/error404');
        }
       
       $category = (array) Model_Publ::getCategoryById($category_id);
       if($category_name != $category['password']){
            if($category['password'] != ""){
                $this->_redirect('/publ/'.$category['password'].'/'.$category_id);
            }else{
                $this->_redirect('/publ/'.$category_id);
            }
       }
       
        $this->view->title = $category['name'];
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'publ_cat'.$category_id;
        if(($result = $memcache->get($key)) === false){
            $db = Zend_Db_Table::getDefaultAdapter();
            $select = $db->select()->from('publ')
                ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
                ->where('catID = ?',$category_id)->order('addtime DESC');
    
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
            $paginator->setItemCountPerPage(10);
            $paginator->setPageRange(5);
            $memcache->set($key, $paginator, false, 0);
        }else{
            $paginator = $result;
        }
        
       $paginator->setCurrentPageNumber($page_number);
       
       $this->view->publs = $paginator;
       $this->view->category = $category;
       if($category['id'] == 1){
            Zend_Registry::set("active_cat","publ_1");
       }else{
            Zend_Registry::set("active_cat",$category['password']);
       }
       
       $this->view->param_cat = 'publ';
       
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
        $is_publ = strpos($str, "publ");
        $item_id = 0;
        $page_number = 0;
        if($is_publ === false){
            $this->_redirect('/error404');
        }else{
            $str = substr($str,5); // убираем строку "publ"
            $is_slash = strpos($str, "/");
            $str2 = substr($str,$is_slash+1);
            $cat_name = substr($str,0,$is_slash);
            $is_slash_2 = strpos($str2, "/");
            $item_name = substr($str2,0,$is_slash_2);
            $min_pos_1 = strpos($str2, "-");
            $str3 = substr($str2,$min_pos_1+1);
            $min_pos_2 = strpos($str3, "-");
            $str4 = substr($str3,$min_pos_2+1);
            $min_pos_3 = strpos($str4, "-");
            $str5 = substr($str4,$min_pos_3+1);
            $item_id = (int)($str5);
            $str_item_id = (string) $item_id;
            if($str_item_id != $str5){
                if($str_order === false){
                    $this->_redirect('/error404');
                }
            }
            $str_pn = substr($str3,0,$min_pos_2);
            $page_number = (int)$str_pn;
        }
        
        $memcache = Zend_Registry::get("memcache");
        $key = 'one_publ_'.$item_id;
        if(true || ($result = $memcache->get($key)) === false ) {
            $one_publ = (array) Model_Publ::getOnePublById($item_id);
            $memcache->set($key, $one_publ, false, 0);
        } else {
            $one_publ = $result;
        }
        
        if($one_publ['hide_on_site'] == "1"){
            $user_online = Zend_Registry::get("user");
            if($user_online->data['group_id'] != "5" && $user_online->data['group_id'] != "8" && $user_online->data['group_id'] != "9"){
                $this->_redirect('/error404');
            }
        }
        
        $this->view->one_publ = $one_publ;
        if($one_publ['catID'] == 1){
            Zend_Registry::set("active_cat","publ_1");
        }else{
            Zend_Registry::set("active_cat",$one_publ['cat_pass']);
        }
        
        if(urldecode($item_name) != $one_publ['url']){
            if($one_publ['cat_pass'] != ""){
                $this->_redirect('/publ/'.$one_publ['cat_pass'].'/'.$one_publ['url'].'/'.$one_publ['catID'].'-1-0-'.$item_id);
            }else{
                $this->_redirect('/publ/raznoe/'.$one_publ['url'].'/'.$one_publ['catID'].'-1-0-'.$item_id);
            }
        }
        
        if($one_publ['cat_pass'] == '' && $cat_name != 'raznoe'){
            $this->_redirect('/publ/raznoe/'.$one_publ['url'].'/'.$one_publ['catID'].'-1-0-'.$item_id);
        }
        
        if($one_publ['cat_pass'] != '' && $one_publ['cat_pass'] != $cat_name){
            $this->_redirect('/publ/'.$one_publ['cat_pass'].'/'.$one_publ['url'].'/'.$one_publ['catID'].'-1-0-'.$item_id);
        }
        
        $key = 'show_comments';
        if(($result = $memcache->get($key)) === false ) {
            $show_comments = Model_Settings::getParamSettingsByKey('show_comments');
            $memcache->set($key, $show_comments, false, 0);
        } else {
            $show_comments = $result;
        }
        $this->view->show_comments = $show_comments->value;
        
        if($show_comments->value == 'on'){
            $key = 'comments_keys_material_'.$item_id.'_module_3';
            if(($result = $memcache->get($key)) === false ) {
                $comments = Model_Comments::getCommentsIdsByMaterialID($item_id,3);
                $comments_keys = array();
                foreach($comments as $k=>$comment){
                    $comments_keys[$comment['commentID']] = $k+1;
                }
                $memcache->set($key, $comments_keys, false, 0);
            } else {
                $comments_keys = $result;
            }
            $this->view->comments_keys = $comments_keys;
            
            $key = 'count_comments_item_'.$item_id.'_module_3';
            if(($result = $memcache->get($key)) === false ) {
                $count_comments = Model_Comments::getCountCommentsByMaterialID($item_id,3);
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
            
            $key = 'publ_comments_material_'.$item_id.'_order_'.$comments_order;
            if(($result = $memcache->get($key)) === false ) {
                $db = Zend_Db_Table::getDefaultAdapter();
                $select = $db->select()->from('comments')
                    ->joinLeft('phpbb3_users','phpbb3_users.user_id = comments.userID', array('username', 'user_avatar', 'user_avatar_type'))
                    ->where('comments.moduleID = 3')
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

            $url = $_SERVER['REQUEST_URI'];
            if(preg_match('/\?.+$/', $url)) {
                $url = preg_replace('/\?.+$/', '', $url);
            }
            if($count_pages != 0 && $page_number > $count_pages){
                $url = preg_replace('/(\d+)\-'.$page_number.'\-(\d+)\-(\d+)(\?.+)?$/', '$1-1-$2-$3', $_SERVER['REQUEST_URI']);
                //$this->_redirect('/error404');
                $this->_redirect($url);
            }
            if($count_pages == 0 && $page_number > 1){
                $page_number = 1;
                //$this->_redirect('/error404');
            }
            if($url != $_SERVER['REQUEST_URI']) {
                $this->_redirect($url);
            }
        }
        
        $this->view->param_cat = 'publ';
        
        if (!isset($_COOKIE['publs'])) {
            SetCookie('publs['.$item_id.']','publ'.$item_id,time()+86400);
            $key = 'reads_publ_'.$item_id;
            if(($result = $memcache->get($key)) === false ) {
                $count_reads = (int) $one_publ['reads1'];
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
            
            $key = 'publ_'.$item_id.'_updated';
            if(($result = $memcache->get($key)) === false ) {
                $date_now = time();
                $date_time_array = getdate($date_now);
                $hours = $date_time_array['hours'];
                if( !( ($hours >= 16) && ($hours <= 23) ) ){
                    Model_Publ::updatePublData($item_id, array("reads1" => $reads));
                }
                $memcache->set($key, 'no', false, 14400);
                $need_clean = 'yes';
            } else {
                $need_clean = $result;
            }
            
            if($need_clean == 'yes'){
                $memcache->delete('one_publ_'.$item_id);
                $memcache->delete('publ_index_page');
                $memcache->delete('publ_cat'.$one_publ['catID']);
            }
        }
        
    }
    
}
