<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 21.01.15
 * Time: 11:13
 */
class Model_News extends Zend_Db_Table_Abstract{

    protected $_name = 'news';
    protected $_name_cat = 'nw_nw';
    protected $_name_blocks = 'news_blocks';

    public function newNews($arr)
    {
        $db = new Model_News();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }

    public static function getFilmoteka($userId, $filmId)
    {
        $types = array('1' => 0, '2' => 0, '3' => 0);
        $db = Zend_Db_Table::getDefaultAdapter();
        $query = $db->query('SELECT type FROM `filmoteka` WHERE id_user = "'.$userId.'" AND id_film = "'.$filmId.'"');
        $results = $query->fetchall();
        foreach($results as $row) {
            $types[$row['type']] = 1;
        }
        return $types;
    }

    public static function updateNewsData($news_id,$data){
        $db = new Model_News();
        $db->getAdapter()->update('news',$data, ('news.id = '.$news_id));
        return true;
    }
    
    public function getNewsBlocksById($id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name_blocks)->where('id = ?',$id);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if($result) return $result;
        else return false;
    }
    
    public function getNewsBlocksByCategoryNewsId($id_category_news){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name_blocks)->where('id_category_news = ?',$id_category_news);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if($result) return $result;
        else return false;
    }

    public static function getNewsByCatID($category_id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.other1'))
            ->where('p.catID = ?',$category_id)
            ->order('p.ontop DESC')->order('p.addtime DESC');
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }

    public static function getAllCategories(){
        $memcache = Zend_Registry::get("memcache");
        $key = 'all_categories_news';
        if(($result = $memcache->get($key)) === false){
            $db = new Model_News();
            $select = $db->getAdapter()->select()->from($db->_name_cat);
            $res = $db->getAdapter()->query($select)->fetchAll();
            $memcache->set($key, $res, false, 21600);
        }else{
            $res = $result;
        }
        return $res;
    }

    public static function getCategoryById($id){
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_category_'.$id;
        if(($result = $memcache->get($key)) === false){
            $db = new Model_News();
            $select = $db->getAdapter()->select()->from($db->_name_cat)->where('id = ?',$id);
            $res = $db->getAdapter()->query($select)->fetchObject();
            $memcache->set($key, $res, false, NEWS_VIEW_CACHE_LIFETIME);
        }else{
            $res = $result;
        }
        return $res;
    }

    public static function getCategoryByAlt($alt){
        $memcache = Zend_Registry::get("memcache");
        $key = 'news_category_'.$alt;
        if(($result = $memcache->get($key)) === false){
            $db = new Model_News();
            $select = $db->getAdapter()->select()->from($db->_name_cat)->where('description = ?',$alt);
            $res = $db->getAdapter()->query($select)->fetchObject();
            $memcache->set($key, $res, false, NEWS_VIEW_CACHE_LIFETIME);
        }else{
            $res = $result;
        }
        return (array)$res;
    }

    public static function getOneNewsById($id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('nw_nw','nw_nw.id = news.catID', array('cat_name' => 'name', 'cat_description' => 'description'))
            ->where('news.id = ?',$id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }

    public static function getOneNewsByAlt($alt){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('nw_nw',  'nw_nw.id = news.catID', array('cat_name' => 'name', 'cat_description' => 'description'))
            ->where('news.sbscr = ?',$alt);
        $res = $db->getAdapter()->query($select)->fetchObject();
        return $res ? (array)$res : null;
    }

    public static function getNewsTagInfo($tag) {
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from('news_tags')->where('name = ?', $tag);
        $res = $db->getAdapter()->query($select)->fetchObject();
        return $res ? (array)$res : null;
    }

    public static function getNewsTagsInfo($tagList){
        $db = new Model_News();
        $strOrder = '';
        foreach(explode(',', $tagList) as $tag) {
            $strOrder .= ($strOrder == '' ? '' : ',')."'".$tag."'";
        }
        $select = $db->getAdapter()->select()->from('news_tags')->where('name IN (?)', explode(',', $tagList))
            ->order(new Zend_Db_Expr("FIELD(name, ".$strOrder.")"));
        //if(FSDEBUG)die($select);
        $res = $db->getAdapter()->query($select)->fetchAll();
        $ret = array();
        if($res){
            $res = (array)$res;
            foreach($res as $r) {
                if(!isset($ret[$r['type']])) {
                    $ret[$r['type']] = array();
                }
                $ret[$r['type']][] = $r;
            }
        }
        return $ret;
    }

    public static function getOneNewsSomeFieldsById($id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.addtime', 'p.title', 'p.other1', 'p.sbscr', 'p.catID'))->where('id = ?',$id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getSomeNewsSomeFieldsByIds($ids){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.addtime', 'p.title', 'p.other1', 'p.sbscr'))
            ->where($db->_name.'.id IN ('.$ids.')')
            ->limit(7);
            //->where('id = ?',$id);
        $res = $db->getAdapter()->query($select)->fetchAll();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getTopBy($order, $limit = 100) {
        $db = new Model_News();

        if($order == 'rate_num') {
            $order = new Zend_Db_Expr("CAST(rate_num AS SIGNED) DESC");
        } else {
            $order .= ' DESC';
        }

        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.hide_on_site', 'p.addtime', 'p.rate_num', 'p.reads1', 'p.urltime', 'p.num_com', 'p.title', 'p.rating',  'p.other1', 'p.sbscr',
                'COUNT(comments.commentID) as count_comments'
            ))
            ->joinLeft('comments', 'comments.materialID = p.id')
            ->group('p.id')
            ->having('p.hide_on_site = ?', 0)
            ->order($order)->limit($limit);

        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getTopFilms($beforeTime = '-15 years'){
        $settings = (array) Model_Settings::getParamSettingsByKey("sort_popular_films");
        $order_param = $settings['value'];
        $settings = (array) Model_Settings::getParamSettingsByKey("limit_popular_films");
        $limit_param = $settings['value'];
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.addtime', 'p.'.$order_param, 'p.urltime', 'p.num_com', 'p.title', 'p.rating', 'p.other1', 'p.sbscr'))
            ->where('addtime BETWEEN '.strtotime($beforeTime).' AND '.time())
            ->where('(catID = ?',8)
            ->Orwhere('catID = ?',26)
            ->Orwhere('catID = ?',26)
            ->Orwhere('catID = ?',17)
            ->Orwhere('catID = ?',2)
            ->Orwhere('catID = ?',16)
            ->Orwhere('catID = ?',6)
            ->Orwhere('catID = ?',18)
            ->Orwhere('catID = ?',24)
            ->Orwhere('catID = ?',10)
            ->Orwhere('catID = ?',5)
            ->Orwhere('catID = ?',13)
            ->Orwhere('catID = ?',15)
            ->Orwhere('catID = ?',9)
            ->Orwhere('catID = ?)',1)
            ->order($order_param.' DESC')
            ->limit($limit_param);
        //if(FSDEBUG) echo $select;
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getTopNewsByCatId($catID, $beforeTime = '-15 years'){
        switch($catID){
            case 7 : $str = 'serials'; break;
            case 20 : $str = 'mults'; break;
            case 3 : $str = 'casts'; break;
            default : $str = 'serials'; break;
        }
        $settings = (array) Model_Settings::getParamSettingsByKey("sort_popular_".$str);
        $order_param = $settings['value'];
        $settings = (array) Model_Settings::getParamSettingsByKey("limit_popular_".$str);
        $limit_param = $settings['value'];
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.addtime', 'p.'.$order_param, 'p.urltime', 'p.num_com', 'p.title', 'p.rating', 'p.other1', 'p.sbscr'))
            ->where('addtime BETWEEN '.strtotime($beforeTime).' AND '.time())
            ->where('catID = ?',$catID)
            ->order($order_param.' DESC')
            ->limit($limit_param);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getLastFilms($excludeId = 0, $tags = array()){
        $result = array();
        if(is_numeric($excludeId) && $excludeId > 0 && is_array($tags) && count($tags) > 0) {
            $str = '';
            foreach($tags as $t) {
                if(strpos($t, 'actor_') === 0 || strpos($t, 'producer_') === 0
                    || strpos($t, 'category_') === 0) {
                    $str .= ($str == '' ? '' : ' OR ').'FIND_IN_SET("'.$t.'", tags) > 0';
                }
            }
            if($str == '') { $str = '1'; }
            $db = Zend_Db_Table::getDefaultAdapter();
            $sql = 'SELECT * FROM news WHERE hide_on_site = 0 AND id != "'.$excludeId.'" AND ('.$str.') ORDER BY addtime DESC LIMIT 4';
            $query = $db->query($sql);
            $result = $query->fetchall();
        } else {
            $db = new Model_News();
            $select = $db->getAdapter()->select()->from($db->_name)
            ->where('hide_on_site = 0')
            ->order('addtime DESC')
            ->limit(4);
            $result = $db->getAdapter()->query($select)->fetchAll();
        }
        return $result;
    }
    
    public static function getLastNews(){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            //->joinLeft('nw_nw','nw_nw.id = news.catID', array('name'))
            ->order('news.addtime DESC')
            ->limit(10);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getLastNewsToSitemap($limit = 10000){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.urltime', 'p.sbscr', 'p.lastmod'))
            ->order('p.lastmod DESC')
            ->limit($limit);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getLastPubToSitemap($limit = 10000){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => 'publ'),
            array('p.id', 'p.addtime', 'p.catID', 'p.url', 'p.lastmod'))
            ->order('p.lastmod DESC')
            ->limit($limit);
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function searchNews($text){

require_once '/var/www/user/data/www/tushkan.net/lib/class.SphinxClient.php';
require_once '/var/www/user/data/www/tushkan.net/lib/db.php';

Db::set_options(array(
        'database' => 'tushkan',
        'host' => 'localhost',
        'username' => 'egor',
        'password' => '6M1hsnH4',
        'use_slave' => false
));                                         
$sphinx = new SphinxClient();               
$sphinx->SetServer('127.0.0.1', 9312);      
$sphinx->SetMatchMode(SPH_MATCH_ALL);  
$sphinx->SetSortMode(SPH_SORT_ATTR_DESC, 'date_added');
$sphinx->SetArrayResult(true);              
$sphinx->SetLimits(0,999999);              

$sphinx_result = $sphinx->Query(strtolower($text));    
$total = $sphinx_result['total'];
$result_time = $sphinx_result['time'];
if ($sphinx_result && isset($sphinx_result['matches'])) {
foreach ($sphinx_result['matches'] as $item) {
$id[]=$item['id'];
}
/*$ts = '';
$tags = Db::get_rows('SELECT name FROM news_tags WHERE LOWER(title) = LOWER("'.$text.'")');
foreach($tags as $tag)  {
    $ts .= " OR FIND_IN_SET('".$tag['name']."', `tags`) > 0";
}*/
$sql = "SELECT news.*, nw_nw.name as cat_name FROM `news` LEFT JOIN nw_nw ON nw_nw.id = news.catID
    WHERE news.hide_on_site = 0 AND (news.`id` IN (".implode(",",$id).")) ORDER BY news.`ontop` DESC, news.`addtime` DESC";

//if(FSDEBUG) die($sql);
$a=Db::get_rows($sql);
}

/*

        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.title LIKE ?', '%'.$text.'%')
            ->Orwhere($db->_name.'.message LIKE ?', '%'.$text.'%')
            ->order($db->_name.'.ontop DESC')
            ->order($db->_name.'.addtime DESC');
        $a=$db->getAdapter()->query($select)->fetchAll();
*/
//        $z=serialize($a);
//file_put_contents('/var/www/user/data/www/log2.txt',$z,FILE_APPEND);
        return $a;
        //$db->getAdapter()->query($select)->fetchAll();

        
    }
    
    public static function updateRating($material_id, $data)
    {
        $db = new Model_News();
        $db->update($data, ('id ='.$material_id));
        return true;
    }
    
    public static function getNewsByUserId($user_id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.other6 = ?',$user_id)
            ->order('addTime ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getReadsOneNewsById($id){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from(array('p' => $db->_name),
            array('p.id', 'p.reads1'))->where('p.id = ?',$id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if($res){
            return $res;
        }else{
            return false;
        }
    }
    
    public static function getNewsByParam($param = 'id',$value){
        $db = new Model_News();
        $select = $db->getAdapter()->select()->from($db->_name)
            //->where($db->_name.'.'.$param.' = ?', $value)
            ->where($db->_name.'.'.$param.' LIKE ?', '%'.$value.'%')
            ->order('addTime ASC')
            //->limit(100)
            ;
        return $db->getAdapter()->query($select)->fetchAll();
    }

}