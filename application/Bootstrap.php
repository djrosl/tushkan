<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    
    protected function _initModuleStructure()
    {
        $moduleLoader = new Zend_Application_Module_Autoloader(array(
        'namespace' => '',
         'basePath' => APPLICATION_PATH.'/modules/default'));
          
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $autoloader->registerNamespace(array('Source_'));
        $autoloader->registerNamespace(array('App_'));
        
        return $moduleLoader;
    }
    
    protected function _initUser(){
        global $phpbb_root_path, $phpEx, $user, $db, $config, $cache, $template, $auth;
        define('IN_PHPBB', true);
        define('ROOT_PATH', "forum");
        
        if (!defined('IN_PHPBB') || !defined('ROOT_PATH')) {
            exit();
        }
        
        $phpEx = substr(strrchr(__FILE__, '.'), 1);
        $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
        include($phpbb_root_path . 'common.' . $phpEx);
        include($phpbb_root_path . 'includes/functions_display.' . $phpEx);
        
        $user->session_begin();
        $auth->acl($user->data);
        $user->setup('ucp');
        
        Zend_Registry::set("user", $user);
        Zend_Registry::set("auth", $auth);
        
    }
    
    protected function _initPlugins()
    {
        include APPLICATION_PATH.'/plugins/Routes.php';
        $front = Zend_Controller_Front::getInstance();
        $front->registerPlugin(new Plugin_Routes());
        $front->registerPlugin(new Zend_Controller_Plugin_ErrorHandler());
        Zend_Registry::set("active_cat", "test");
    }
    
    protected function _initViewHelpers()
    {
//        date_default_timezone_set("Asia/Novosibirsk");
        $this->bootstrap('layout');
        $layout = $this->getResource('layout');
        $view = $layout->getView();
        
        $view->doctype('XHTML1_STRICT');
        $view->headMeta()->appendHttpEquiv('Content-Type', 'text/html;charset=utf-8');
    }
    
    protected function _initMemcache(){
        $memcache = new Source_Memcached_Action();
        Zend_Registry::set('memcache',$memcache->getInstance());
    }
    
    protected function _initNavigation()
	{
  		$this->bootstrap('layout');
        $layout = $this->getResource('layout');
        $view = $layout->getView();		
        $config = new Zend_Config_Xml(APPLICATION_PATH . '/configs/navigation.xml', 'nav');
		$container = new Zend_Navigation($config);
		$view->navigation($container);
	}
    
    /*
    protected function _initProfiler(){
        $this->bootstrap('db');
        $db = $this->getPluginResource('db')->getDbAdapter();
        $db->getProfiler()->setEnabled(true);
        $profiler = $db->getProfiler();
        Zend_Registry::set('profiler',$profiler);
    }
    */
    
    /*
    protected function _initZFDebug()
    {
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $autoloader->registerNamespace('ZFDebug');
        //$db = Zend_Db_Table::getDefaultAdapter();
        $this->bootstrap('db');
        $db = $this->getPluginResource('db')->getDbAdapter();
                
        //$cache = Zend_Registry::get("cache");
        $options = array(
            'plugins' => array('Variables',
                               'Database' => array('adapter' => $db),
                               'File' => array('basePath' => APPLICATION_PATH),
                               //'Cache' => array('backend' => $cache->getBackend()),
                               'Exception')
        );
        $debug = new ZFDebug_Controller_Plugin_Debug($options);
     
        $this->bootstrap('frontController');
        $frontController = $this->getResource('frontController');
        $frontController->registerPlugin($debug);
    }
    */
    
}
