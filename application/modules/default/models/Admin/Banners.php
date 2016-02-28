<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 11.02.2015
 * Time: 11:33
 */

class Model_Admin_Banners extends Source_Db_Table_Abstract
{
    protected $_name = 'banners';
    protected $_meta = 'meta_tags';
    protected $_seo = 'news_blocks';

    public static function getAllBanners()
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from('banners')->order('category DESC');
        return $select;
    }

    public static function getBanner($id)
    {
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('id = ?', $id);
        return (array)$db->getAdapter()->query($select)->fetchObject();
    }

    public static function addBanner($data)
    {
        $db = new Model_Admin_Banners();
        $db->insert($data);
        return true;
    }

    public static function getBannerByCatName($c){
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_name)
            ->where('category = ?', $c)->where('status = ?', 'active');
        return $db->getAdapter()->query($select)->fetchAll();
    }
    public static function editBanner($id, $data)
    {
        $db = new Model_Admin_Banners();
        $db->update($data, ('id = '.$id));
        return true;
    }
    public static function deleteBanner($id)
    {
        $db = new Model_Admin_Banners();
        $db->delete(('id = '.$id));
        return true;
    }

    /*
     * Meta
     */

    public static function getAllMeta()
    {
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_meta)->order('location');

        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getMeta($id)
    {
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_meta)->where('id = ?', $id);

        return $db->getAdapter()->query($select)->fetchObject();
    }
    public static function editMeta($id, $data)
    {
        $db = new Model_Admin_Banners();
        $db->_update($db->_meta, $data, ('id = '.$id));
        return true;
    }


    /*
     * News blocks
     */

    public static function getAllSeo()
    {
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_seo)
            ->joinLeft('nw_nw', 'nw_nw.id = '.$db->_seo.'.id_category_news', array('nw_name'=>'name'));
        return $db->getAdapter()->query($select)->fetchAll();
    }

    public static function getSeo($id)
    {
        $db = new Model_Admin_Banners();
        $select = $db->getAdapter()->select()->from($db->_seo)
            ->joinLeft('nw_nw', 'nw_nw.id = '.$db->_seo.'.id_category_news', array('nw_name'=>'name'))->where($db->_seo.'.id = ?', $id);
        return $db->getAdapter()->query($select)->fetchObject();
    }

    public static function editSeo($id, $data)
    {
        $db = new Model_Admin_Banners();
        $db->_update($db->_seo, $data, ('id = '.$id));
        return true;
    }
}