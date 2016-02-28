<?php
class Zend_View_Helper_TopMenu extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function topMenu(){
        $memcache = Zend_Registry::get("memcache");
        $key = 'top_menu';
        if(($result = $memcache->get($key)) === false){
            $page_zarabotai = (array) Model_StaticPages::getPageById(16858);
            $page_player = (array) Model_StaticPages::getPageById(17802);
            $html = $this->_renderHTML($page_zarabotai,$page_player);
            $memcache->set($key, $html, false, 3600 * 24);
        }else{
            $html = $this->_renderHTML($page_zarabotai,$page_player);
        }
        
        return $html;
    }
    
    protected function _renderHTML($page_zarabotai,$page_player){
        ob_start();
        ?>
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/publ">Новости кино</a></li>
                <li><a href="/index/orderdesc">Стол заказов</a></li>
                <li><a href="/index/tv_onlajn/0-51">Тв онлайн</a></li>
                <li><a href="/news/<? echo $page_zarabotai['sbscr']?>/<? echo date('Y-m-d', $page_zarabotai['addtime']); ?>-<? echo $page_zarabotai['id']?>">Заработай на Тушкане</a></li>
            </ul>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}