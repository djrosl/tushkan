<?php
	class Plugin_Adminroutes extends Zend_Controller_Plugin_Abstract
    {
        public function routeStartup(Zend_Controller_Request_Abstract $request)
        {
            /*$url = $_SERVER[REQUEST_URI];
            $ex_url = explode('/', $url);
            $router = Zend_Controller_Front::getInstance()->getRouter();
            if($ex_url['1'] == 'admin' && !$request->isXmlHttpRequest()){
                $url = str_replace('admin','tn-control', $url);
                $r = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
                $r->gotoUrl($url)->redirectAndExit();
            }
            $route_login = new Zend_Controller_Router_Route('/tn-control/login',array('controller' => 'admin','action'=> 'login'));
            $route_logout = new Zend_Controller_Router_Route('/tn-control/logout',array('controller' => 'admin','action'=> 'logout'));
            //-----------------------------------------------------------------
            $route_news = new Zend_Controller_Router_Route('/tn-control/',array('controller' => 'admin','action'=> 'index'));
            $route_news2 = new Zend_Controller_Router_Route('/tn-control/news',array('controller' => 'admin','action'=> 'news'));
            $route_newsadd = new Zend_Controller_Router_Route('/tn-control/addnews',array('controller' => 'admin','action'=> 'addnews'));
            $route_newsedit = new Zend_Controller_Router_Route('/tn-control/editnews',array('controller' => 'admin','action'=> 'editnews','id'=>''), array('id'=>'\d+'));
            $route_newsdelete = new Zend_Controller_Router_Route('/tn-control/deletenews',array('controller' => 'admin','action'=> 'deletenews'));
            //-------------------------------------------------------------------------------
            $route_publ = new Zend_Controller_Router_Route('/tn-control/login',array('controller' => 'admin','action'=> 'login'));
            $router->addRoute('login', $route_login);
            $router->addRoute('logout', $route_logout);
            $router->addRoute('news', $route_news);
            $router->addRoute('news2', $route_news2);
            $router->addRoute('newsa', $route_newsadd);
            $router->addRoute('newse', $route_newsedit);
            $router->addRoute('newsd', $route_newsdelete);*/

        }
        public function routeShutdown(Zend_Controller_Request_Abstract $request)
        {
            $url = $_SERVER[REQUEST_URI];
            $ex_url = explode('/', $url);
            if($ex_url['1'] == 'admin' && !$request->isXmlHttpRequest()){
                $url = str_replace('admin','tn-control', $url);
                $r = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
                //$r->gotoUrl($url)->redirectAndExit();
                exit;
            }
            $controller_name = $request->getControllerName();
            $action_name = $request->getActionName();
            if($controller_name == 'tn-control'){
                $request->setControllerName('admin');
            }
        }


    }