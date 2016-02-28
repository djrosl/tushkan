<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 06.02.2015
 * Time: 11:03
 */
class Model_Admin_Comments extends Source_Db_Table_Abstract
{
    protected $_name = 'comments';

    public static function getAllComments()
    {

        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('comments')->order('commentID DESC')
            ->joinLeft('news', 'news.id = comments.materialID ', array('news_url'=>'sbscr','news_time'=>'addtime'))
            ->joinLeft('publ', 'publ.id = comments.materialID ', array('publ_catID'=>'catID', 'publ_url'=>'url','publ_time'=>'addtime'))
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID ', array('publ_password'=>'password'));
        return $select;
    }

    public static function getCommentById($id)
    {
        $db = new Model_Admin_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('commentID = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getCommentByUserId($idu)
    {
        $db = new Model_Admin_Comments();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('userID = ?', $idu);
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function editComment($id, $data)
    {
        $db = new Model_Admin_Comments();
        $db->update($data, ('commentID = '.$id));
        return true;
    }

    public static function delComment($id)
    {
        $db = new Model_Admin_Comments();
        $db->delete('commentID = '.$id);
        return true;
    }

    public static function getC($idu)
    {
        $db = new Model_Admin_Comments();
        $select = $db->getAdapter()->select()->from($db->_name, array('c'=>'COUNT(*)'))
            ->where('userID = ?', $idu)->group('userID');
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function delUserComment($idU)
    {
        $userComments = self::getC($idU);
        $db = new Model_Admin_Comments();
        for ($i=0; $i < $userComments; $i++) {
            $db->delete('userID = ' . $idU);
        }
        return true;
    }

    public static function delSComment()
    {
        if($_SESSION['del_comm']) {
            $db = new Model_Admin_Comments();
            for ($i = 0; $i < count($_SESSION['del_comm']); $i++) {
                $db->delete('commentID = ' . $_SESSION['del_comm'][$i]['cid']);
            }
        }
        return true;
    }

    /*
     *
     * DATE_FORMAT(datestamp , '%Y') as year //for grouping over year
        DATE_FORMAT(datestamp , '%Y-%m') as month //for grouping over month
        DATE_FORMAT(datestamp , '%Y-%m-%d') as day //for grouping over day
     */

    public static function getComms()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('comments', array("commentID","moduleID","materialID","addTime","count"=>"COUNT(*)"))
            ->joinLeft('news', 'news.id = comments.materialID ', array('news_title'=>'title', 'news_url'=>'sbscr','news_time'=>'addtime'))
            ->joinLeft('publ', 'publ.id = comments.materialID ', array('publ_title'=>'title','publ_catID'=>'catID', 'publ_url'=>'url','publ_time'=>'addtime'))
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID ', array('publ_password'=>'password'))
            ->group("comments.materialID")->order('count DESC');

        return $select;
    }

    public static function getCommsFilter($df, $dt, $md, $m)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('comments', array("commentID","moduleID","materialID","addTime","count"=>"COUNT(*)"))
            ->joinLeft('news', 'news.id = comments.materialID ', array('news_title'=>'title', 'news_url'=>'sbscr','news_time'=>'addtime'))
            ->joinLeft('publ', 'publ.id = comments.materialID ', array('publ_title'=>'title','publ_catID'=>'catID', 'publ_url'=>'url','publ_time'=>'addtime'))
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID ', array('publ_password'=>'password'));
        if($df)
            $select->where('comments.addTime >= ?', $df);
        if($dt)
            $select->where('comments.addTime <= ?', $dt);
        if($md)
            $select->where('comments.moduleID = ?', $md);
        if($m) {
            if ($md == 2)
                $select->where('news.catID = ?', $m);
            if ($md == 3)
                $select->where('publ.catID = ?', $m);
        }

        $select->group("comments.materialID")->order('count DESC');

        return $select;
    }


    public static function getMatAddtime()
    {
        $db = new Model_Admin_News();

        $sql = "(SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time
                FROM   news
                WHERE createtime <> '' AND createtime <> 'edited'
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y'))
                UNION
                (SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time
                FROM   publ
                WHERE createtime <> '' AND createtime <> 'edited'
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y')) 
                ORDER BY time DESC
                LIMIT 60";
        return $db->getAdapter()->query($sql)->fetchAll();
    }

    public static function getMatLastmod()
    {
        $db = new Model_Admin_News();

        $sql = "(SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime, createtime AS crtime
                FROM   news
                WHERE lastmod <> createtime AND createtime <> ''
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y'))
                UNION
                (SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime , createtime AS crtime
                FROM   publ
                WHERE lastmod <> createtime AND createtime <> ''
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y'))
                ORDER BY ltime DESC
                LIMIT 60";
        return $db->getAdapter()->query($sql)->fetchAll();
    }

    public static function getMatAddtimef($df, $dt, $md, $m)
    {
        $db = new Model_Admin_News();

        $sql = "(SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time, lastmod AS ltime
                FROM   news
                WHERE createtime >= '$df' AND createtime <= '$dt'
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y'))
                UNION
                (SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time, lastmod AS ltime
                FROM   publ
                WHERE createtime >= '$df' AND createtime <= '$dt'
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y'))";

        if($md == 2){
            $sql = "SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time, lastmod AS ltime, catID
                FROM   news
                WHERE createtime >= '$df' AND createtime <= '$dt'";
            if($m){
                $sql .= " AND catID = '$m'";
            }
            $sql .= "GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y')";
        }
        if($md == 3) {
            $sql = "SELECT DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') as dd, COUNT(*) AS cc, createtime AS time, lastmod AS ltime, catID
                FROM   publ
                WHERE createtime >= '$df' AND createtime <= '$dt'";
            if ($m) {
                $sql .= " AND catID = '$m'";
            }
            $sql .= "GROUP BY  DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y')";
        }
        $sql .= " ORDER BY time DESC LIMIT 60";


        return $db->getAdapter()->query($sql)->fetchAll();
    }

    public static function getMatLastmodf($df, $dt, $md, $m)
    {
        $db = new Model_Admin_News();

        $sql = "(SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime, createtime AS crtime
                FROM   news
                WHERE lastmod >= '$df' AND lastmod <= '$dt' AND createtime <> lastmod AND createtime <> ''
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y'))
                UNION
                (SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime, createtime AS crtime
                FROM   publ
                WHERE lastmod >= '$df' AND lastmod <= '$dt' AND createtime <> lastmod AND createtime <> ''
                GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y'))";
        if($md == 2){
            $sql = "SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime, catID, createtime AS crtime
                FROM   news
                WHERE lastmod >= '$df' AND lastmod <= '$dt' AND createtime <> lastmod AND createtime <> ''";
            if($m){
                $sql .= " AND catID = '$m'";
            }
            $sql .= "GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y')";
        }
        if($md == 3){
            $sql = "SELECT DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') as dd, COUNT(*) AS cc, addtime AS time, lastmod AS ltime, catID, createtime AS crtime
                FROM   publ
                WHERE lastmod >= '$df' AND lastmod <= '$dt' AND createtime <> lastmod AND createtime <> ''";
            if($m){
                $sql .= " AND catID = '$m'";
            }
            $sql .= "GROUP BY  DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y')";
        }
        $sql .= " ORDER BY ltime DESC LIMIT 60";
        return $db->getAdapter()->query($sql)->fetchAll();
    }



    public static function getMatAddNews($dateb)
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from('news')
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'))
            ->where("DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') = ?", $dateb)->order('id DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    public static function getMatLastModNews($dateb)
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from('news')
            ->joinLeft('nw_nw', 'nw_nw.id = news.catID', array('cat_name'=>'name'))
            ->where("DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') = ?", $dateb)->where('news.createtime <> news.lastmod')->where('news.createtime <> ?', '')->order('id DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }


    public static function getMatAddPubl($dateb)
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))
            ->where("DATE_FORMAT(FROM_UNIXTIME(createtime), '%d.%m.%Y') = ?", $dateb)->order('id DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getMatLastModPubl($dateb)
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from('publ')
            ->joinLeft('pu_pu', 'pu_pu.id = publ.catID', array('cat_name'=>'name'))
            ->where("DATE_FORMAT(FROM_UNIXTIME(lastmod), '%d.%m.%Y') = ?", $dateb)->where('publ.createtime <> publ.lastmod')->where('publ.createtime <> ?', '')->order('id DESC');
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getCatName($id, $type='nw_nw')
    {
        $db = new Model_Admin_News();
        $select = $db->getAdapter()->select()->from($type)
            ->where('id = ?',$id);
        $row = $db->getAdapter()->query($select)->fetchObject();
        return $row->name;
    }



    public static function userRegs()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('phpbb3_users', array("date"=>"DATE_FORMAT(FROM_UNIXTIME(user_regdate), '%d.%m.%Y')","count"=>"COUNT(*)"))
            ->group("DATE_FORMAT(FROM_UNIXTIME(user_regdate), '%d.%m.%Y')")->order('user_regdate DESC');
        return $select;
    }

    public static function userRegsF($df, $dt)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('phpbb3_users', array("date"=>"DATE_FORMAT(FROM_UNIXTIME(user_regdate), '%d.%m.%Y')","count"=>"COUNT(*)"))->where('user_regdate >= ?', $df)->where('user_regdate <= ?', $dt)
            ->group("DATE_FORMAT(FROM_UNIXTIME(user_regdate), '%d.%m.%Y')")->order('user_regdate DESC');

        return $select;
    }

}