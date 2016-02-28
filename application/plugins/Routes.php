<?php
class Plugin_Routes extends Zend_Controller_Plugin_Abstract
{
    public function routeShutdown(Zend_Controller_Request_Abstract $request)
    {
        $url = str_replace('//', '/', $_SERVER['REQUEST_URI']);
        if($_SERVER['REQUEST_URI'] != $url) {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: '.$url);
            exit;
        }

        $controller_name = $request->getControllerName();
        $action_name = $request->getActionName();
        //if(FSDEBUG) die($controller_name.'/'.$action_name);
        if(isset($_REQUEST['nocache'])) {
          header("Cache-Control: no-cache, must-revalidate");
          header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
          header('Location: /');
          exit;
        } else {
          if($controller_name == 'index' && $action_name == 'index') {
//              header('Expires: ' . gmdate('D, d M Y H:i:s', strtotime('-5 days').' GMT'));
          } else {
//alfa
//              header('Expires: ' . gmdate('D, d M Y H:i:s', strtotime('-25 days').' GMT'));
          }
        }
        if($controller_name == "news"){
            if(!in_array($action_name, array('allserials', 'index', 'top', 'tag', 'votefilm', 'filmoteka', 'my'))) {
                $news_categories = Model_News::getAllCategories();
                $cats = array();
                foreach($news_categories as $cat){
                    array_push($cats,$cat['description']);
                }
                //print_r($cats);
                $check_cat = in_array($action_name,$cats);
                if(!$check_cat){
                    if($action_name == "videokhosting_dlja_serialov"){
                        $request->setActionName('player');
                    }elseif($action_name == "kak_zarabotat_na_kommentarijakh_k_filmam"){
                        $request->setActionName('zarabotai');
                    }elseif($action_name != "rss"){
                        $request->setActionName('view');
                    }
                    if(strpos($action_name,"0-0") === 0){
                        $request->setControllerName('index');
                        $request->setActionName('usernews');
                    }
                }elseif($action_name != "rss"){
                    $request->setActionName('news');
                }
            }
        }elseif($controller_name == "search"){
            $request->setControllerName('index');
            $request->setActionName('search');
        }elseif($controller_name == "index"){
            if($action_name == "dlja_pravoobladatelej"){
                $request->setActionName('contacts');
            }
            if($action_name == "tv_onlajn"){
                /*$parts = explode('?', $_SERVER['REQUEST_URI']);
                if(count($parts) > 1) {
                    header('HTTP/1.1 301 Moved Permanently');
                    header('Location: '.$parts[0]);
                    exit;
                }*/
                $request->setActionName('tv');
            }
            if(strpos($action_name,"8-") === 0){
                $request->setActionName('userpage');
            }
            if($action_name == "11"){
                $request->setActionName('edituser');
            }
            if(strpos($action_name,"34-") === 0){
                $request->setActionName('usercomments');
            }
        }elseif($controller_name == "publ"){
            if($action_name != "index"){
                $server_uri = $_SERVER["REQUEST_URI"];
                $str = substr($server_uri,1);
                $is_publ = strpos($str, "publ");
                if($is_publ !== false){
                    $str = substr($str,5);
                    $is_slash = strpos($str, "/");
                    if($is_slash !== false){
                        $str2 = substr($str,$is_slash+1);
                        $is_slash_2 = strpos($str2, "/");
                        $min_pos_1 = strpos($str2, "-");
                        $str3 = substr($str2,$min_pos_1+1);
                        $min_pos_2 = strpos($str3, "-");
                        $str4 = substr($str3,$min_pos_2+1);
                        $min_pos_3 = strpos($str4, "-");
                        $str5 = substr($str4,$min_pos_3+1);
                        $item_id = (int)($str5);
                    }
                }
                if($item_id != ""){
                    $request->setActionName('view');
                    $ppp = true;
                }
                if(strlen($server_uri) > 40){
                    $request->setActionName('view');
                    $ppp = true;
                }else{
                    if($ppp != true){
                        $request->setActionName('publ');
                    }
                }
                if(strpos($action_name,"0-") === 0){
                    $request->setControllerName('index');
                    $request->setActionName('userpubls');
                }else{
                    if($ppp != true){
                        $request->setActionName('publ');
                    }
                }
            }
        }elseif($controller_name == "error404"){
            $request->setControllerName('e');
            $request->setActionName('error404');
        } /*else {
            throw new Zend_Controller_Action_Exception('Your message here', 404);
            $request->setControllerName('index');
            $request->setActionName('error404');
        } */
    }
    
    /*
    public function postDispatch(Zend_Controller_Request_Abstract $request)
    {
        $profiler = Zend_Registry::get("profiler");
        
        
        $totalTime    = $profiler->getTotalElapsedSecs();
        $queryCount   = $profiler->getTotalNumQueries();
        $longestTime  = 0;
        $longestQuery = null;
        
        $res = '';
        $res .= 'Executed ' . $queryCount . ' queries in ' . $totalTime . ' seconds' . "\n";
        $res .= 'Average query length: ' . $totalTime / $queryCount . ' seconds' . "\n";
        $res .= 'Queries per second: ' . $queryCount / $totalTime . "\n";
        $res .= "List queries: \n";
        
        foreach ($profiler->getQueryProfiles() as $query) {
            if ($query->getElapsedSecs() > $longestTime) {
                $longestTime  = $query->getElapsedSecs();
                $longestQuery = $query->getQuery();
            }
            $res .= 'Query: ' . $query->getQuery() . "\n";
        }
        
        $res .= 'Longest query length: ' . $longestTime . ' seconds' . "\n";
        $res .= "Longest query: " . $longestQuery . "\n";
        
        $writer = new Zend_Log_Writer_Stream(APPLICATION_PATH . '/../logs/profiler.log');
        $logger = new Zend_Log($writer);
        $logger->info($res);
        
        
        $to_csv = array();
        foreach ($profiler->getQueryProfiles() as $query) {
            array_push($to_csv,$query->getQuery());
            //array_push($to_csv,$query->getElapsedSecs());
        }
        $fileName = APPLICATION_PATH . '/../logs/profiler.csv';
        $fp = fopen($fileName, 'a');
        fputcsv($fp, $to_csv);
        fclose($fp);
        
    }
    */
}
