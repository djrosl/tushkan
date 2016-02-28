<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 19.01.15
 * Time: 15:54
 */
class Model_Publ extends Zend_Db_Table_Abstract{

    protected $_name = 'publ';
    protected $_name_cat = 'pu_pu';
    protected $_name_tmp = 'publ_test_copy_1805';

    public function newPubl($arr)
    {
        $db = new Model_Publ();
        $last_inserted_id = $db->insert($arr);
        return $last_inserted_id;
    }
    
    public static function updatePublData($publ_id,$data){
        $db = new Model_Publ();
        $db->update($data, ($db->_name.'.id = '.$publ_id));
        return true;
    }

    public static function getPublsByCatID($catID){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.catID = ?',$catID);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getOnePublById($id){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
            ->where($db->_name.'.id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function getOnePublByAlt($alt){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
            ->where($db->_name.'.url = ?',$alt);
        $res = $db->getAdapter()->query($select)->fetchObject();
        return $res ? (array)$res : null;
    }

    public static function getAllCategories(){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name_cat);
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getCategoryById($id){
        $memcache = Zend_Registry::get("memcache");
        $key = 'publ_category_'.$id;
        if(($result = $memcache->get($key)) === false){
            $db = new Model_Publ();
            $select = $db->getAdapter()->select()->from($db->_name_cat)->where('id = ?',$id);
            $res = $db->getAdapter()->query($select)->fetchObject();
            $memcache->set($key, $res, false, 3600*12);
        }else{
            $res = $result;
        }
        return $res;
    }
    
    public static function getLastPubls(){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->joinLeft('pu_pu','pu_pu.id = publ.catID', array('password'))
            ->order('addtime DESC')
            ->limit(8);
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function updateRating($material_id, $data)
    {
        $db = new Model_Publ();
        $db->update($data, ('id ='.$material_id));
        return true;
    }
    
    public static function getPublsByUserId($user_id){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.uid = ?',$user_id)
            ->order('addtime ASC');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getPublsByParam($text){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where($db->_name.'.url LIKE ?', '%'.$text.'%');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    
    public static function getOnePublByIdTmp($id){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name_tmp)
            ->joinLeft('pu_pu','pu_pu.id = publ_test_copy_1805.catID', array('cat_name' => 'name', 'cat_pass' => 'password'))
            ->where($db->_name_tmp.'.id = ?',$id);
        return $db->getAdapter()->query($select)->fetchObject();
    }
    
    public static function getPublsByParam2($param = 'id',$value){
        $db = new Model_Publ();
        $select = $db->getAdapter()->select()->from($db->_name)
            //->where($db->_name.'.'.$param.' = ?', $value)
            ->where($db->_name.'.'.$param.' LIKE ?', '%'.$value.'%')
            ->order('addtime ASC')
            ->limit(100)
            ;
        return $db->getAdapter()->query($select)->fetchAll();
    }

}