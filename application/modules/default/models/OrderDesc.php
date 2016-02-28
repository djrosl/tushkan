<?php
class Model_OrderDesc extends Zend_Db_Table_Abstract {

    protected $_name = 'orderlist';

    public static function addNew($arr) {
        $db = new Model_OrderDesc();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }

    public static function Vote($id, $userId) {
        $c = "orderdescvote".$id;
        if(isset($_COOKIE[$c])) {
            return 'Вы уже голосовали';
        }
        $db = new Model_OrderDesc();
        $select = $db->getAdapter()->select()->from($db->_name)->where('id = ?', $id);
        $res = $db->getAdapter()->query($select)->fetchObject();
        if(!$res) {
            return 'Заявка не найдена';
        }
        $res = (array)$res;
        if($res['user'] == $userId) {
            return 'Вы уже голосовали';
        }
        $db->update(array('rating' => $res['rating'] + 1), ('id = '.$id));
        setcookie($c, 1, time()+3600*24*365);
        return '';
    }

    public static function Edit($id, $link) {
        $db = new Model_OrderDesc();
        $db->update(array('link' => strip_tags($link)), ('id = '.$id));
        return '';
    }

    public static function Remove($id) {
        $db = new Model_OrderDesc();
        $where = array('id = ?' => $id);
        $db->getAdapter()->delete($db->_name, $where);
        return '';
    }

    public static function selectDesc($page, $sort = 'date', $sortType = 'desc', $year = '', $user = '', $ready = null, $cat = '') {
        $db = new Model_OrderDesc();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('phpbb3_users', 'phpbb3_users.user_id = '.$db->_name.'.user', array('login' => 'username'));

        if($year != '') {
            $select = $select->where('year = ?', $year);
        }
        if($user != '') {
            $select = $select->where('user = ?', $user);
        }
        if($ready !== null) {
            $select = $select->where('link '.($ready ? '!=' : '=').' ?', '');
        }
        if($cat != '') {
            $select = $select->where('category = ?', $cat);
        }
        $select = $select->order($sort.' '.$sortType);

        $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($select));
        $paginator->setCurrentPageNumber($page);
        $paginator->setItemCountPerPage(MOVIE_ON_PAGE);
        $paginator->setPageRange(5);
        //echo $select;  exit;
        return $paginator; //$db->getAdapter()->query($select)->fetchAll();
    }

}