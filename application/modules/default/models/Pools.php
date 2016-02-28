<?php

class Model_Pools extends Zend_Db_Table_Abstract{

    protected $_name = 'po_po';
    
    public static function getAllPools(){
        $db = new Model_Pools();
        $select = $db->getAdapter()->select()->from($db->_name);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getPoolById($id){
        $db = new Model_Pools();
        $select = $db->getAdapter()->select()->from($db->_name)->where($db->_name.'.1 = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public function getRandomPool() {
        $arrIds = array();
        $arrToShow = array();
        $countRecordsToShow = 1;

        $db = new Model_Pools();
        $select = $db->getAdapter()->select()->from($db->_name)->where($db->_name.'.3 = 1'); // только активные
        $res = $db->getAdapter()->query($select)->fetchAll();

        foreach ($res as $t) {
            array_push($arrIds, $t['1']);
        }

        shuffle($arrIds);

        for ($i = 0; $i < count($arrIds); $i++) {
            if ($countRecordsToShow == 0) {
                break;
            }
            foreach ($res as $t) {
                if ($arrIds[$i] == $t['1']) {
                    array_push($arrToShow, $t);
                }
            }
            $countRecordsToShow--;
        }
        return $arrToShow;
    }
    
    public static function updatePool($id_pool,$data)
    {
        $db = new Model_Pools();
        $db->update($data, ($db->_name.'.1 = '.$id_pool));
        return true;
    }

}