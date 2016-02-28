<?php

class Default_Bootstrap extends Zend_Application_Module_Bootstrap
{
    public function _initPlugins(){
        //$front = Zend_Controller_Front::getInstance();
        //$front->registerPlugin(new Default_Plugin_Constant());
    }

    public function _initRoutes(){
        $routes = array();
        
        /*
        $routes[] = new Zend_Controller_Router_Route(
            'publ/:param',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/novosti_kino/:novosti_kino',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/kino/:kino',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/jumor/:jumor',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/serialy/:serialy',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/recenzii_na_filmy/:recenzii_na_filmy',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
        $routes[] = new Zend_Controller_Router_Route(
            'publ/biografija_akterov/:biografija_akterov',
            array(
                'module' => 'default',
                'controller' => 'publ',
                'action'     => 'publ'
            )
        );
*/



        try {
            $controller = Zend_Controller_Front::getInstance();
            foreach ($routes as $_key => &$route) $controller->getRouter()->addRoute('myroute'.$_key, $route);
            $controller->throwExceptions(THROW_EXCEPTIONS);
            //$controller->dispatch();
        }
        catch (Exception $error) {
            print $error;
        }

    }
}
