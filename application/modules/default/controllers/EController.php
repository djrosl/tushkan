<?php
class EController extends Zend_Controller_Action
{

    public function error404Action()
    {
        $server_uri = $_SERVER["REQUEST_URI"];
        /*if($server_uri == '/error404'){
            $this->_redirect('/');
        }
        if($server_uri != '/error404'){
            $this->_redirect('/error404');
        }*/
        $this->view->message = 'Возможно, эта страница была удалена, переименована, или она временно недоступна';
    }
    
}

