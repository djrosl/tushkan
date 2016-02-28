<?php
class Model_Votes extends Zend_Db_Table_Abstract{

    protected $_name = 'votes';

    public static function getNewVote($id, $userId) {
        $db = new Model_Votes();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('id_user = ?', $userId)->where('id_film = ?', $id);
        $result = $db->getAdapter()->query($select)->fetchObject();
        if($result) {
            return (array)$result;
        }
        return null;
    }

    public static function saveVote($id, $userId, $ip, $vote) {
        $db = new Model_Votes();
        return $db->insert(array(
            'id_film' => $id,
            'id_user' => $userId,
            'ip' => $ip,
            'vote' => $vote > 0 ? 1 : -1
        ));
    }

}