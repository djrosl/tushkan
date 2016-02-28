<?
class Controller_T_Action extends Zend_Controller_Action{
    
    protected $_user;
    
    public function _initUser(){
        $this->user = Zend_Registry::get("user");
    }
    
    public function preDisapatch(){
        parent::preDisapatch();
        $this->_initUser();
    }
    
}

