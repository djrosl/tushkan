<?php
class Zend_View_Helper_FsBreadCrumbs extends Zend_View_Helper_Abstract
{
    private function _metaElement($position, $url, $title) {
        return '{ "@type": "ListItem", "position": '.$position.', "item": { "@id": "'.$url.'", "name": "'.$title.'" } }';
    }

    public function fsBreadCrumbs($delemiter = " » ") {
        $crumbs = $_SERVER['REQUEST_URI'] == '/' ? '' : '<a href="/" title="Главная">Главная</a>';
        $meta = '<script type="application/ld+json">{"@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [{0}] }</script>';
        $metaCount = 0;
        $metaList = $this->_metaElement(++$metaCount, '/', 'Главная');
        //echo $_SERVER['REQUEST_URI'];
        $request = substr($_SERVER['REQUEST_URI'], 1);

        if(empty($request)) {
            echo $crumbs;
            return;
        }

        $memcache = Zend_Registry::get("memcache");
        $key = 'breadcrumbs_'.md5($request);
        if(false && ($cache = $memcache->get($key)) !== false) {
            echo $cache;
            return;
        }
        $request = explode('?', $request);
        $parts = explode('/', $request[0]);
        $count = count($parts);
        if($count > 2) {
            if($parts[1] == 'tag') {
                $info = Model_News::getNewsTagInfo($parts[2]);
                if($info !== null) {
                    $crumbs .= $delemiter.$info['h1'];
                }
            } else if($parts[1] == 'playlist') {
                $crumbs .= $delemiter.'Плейлист';
            } else if($parts[1] == 'watched') {
                $crumbs .= $delemiter.'Просмотренные фильмы';
            } else {
              $info = Model_News::getOneNewsByAlt($parts[1]);
              if($info !== null) {
                  $url = '/news/'.$info['cat_description'].'/1-0-'.$info['catID'];
                  $parts = explode(')', $info['title']);
                  $crumbs .= $delemiter.
                      '<a href="'.$url.'" title="'.$info['cat_name'].'">'.$info['cat_name'].'</a>'.
                      $delemiter.$parts[0].')';
                  $metaList .= ','.$this->_metaElement(++$metaCount, $url, $info['cat_name']);
                  $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], $info['title']);
              } else {
                  $info = Model_News::getCategoryByAlt($parts[1]);
                  if($info !== null && count($info) > 1) {
                      $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], $info['name']);
                      $crumbs .= $delemiter.$info['name'];
                  } else {
                      $info = Model_Publ::getOnePublByAlt($parts[2]);
                      if($info !== null) {
                          $url = '/publ/'.$info['cat_pass'].'/'.$info['catID'];
                          $crumbs .= $delemiter.
                            '<a href="'.$url.'" title="'.$info['cat_name'].'">'.$info['cat_name'].'</a>'.
                            $delemiter.$info['title'];
                          $metaList .= ','.$this->_metaElement(++$metaCount, $url, $info['cat_name']);
                          $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], $info['title']);

                      }
                  }
              }
            }
        } else {
            if($count == 1) {
                if($parts[0] == 'publ') {
                    $crumbs .= $delemiter.'Новости кино';
                    $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], 'Новости кино');
                } else if($parts[0] == 'news') {
                    $crumbs .= $delemiter.'Новинки кино';
                    $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], 'Новинки кино');
                } else if($parts[0] == 'error404') {
                    $crumbs = ''; //$delemiter.'Страниа не найдена';
                    $meta = '';
                    //$metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], 'Страниа не найдена');
                }
            } else { //два параметра
                if($parts[1] == 'orderdesc') {
                    $crumbs .= $delemiter.'Стол заказов';
                    $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], 'Стол заказов');
                } else if($parts[1] == 'my') {
                    $crumbs .= $delemiter.'Моя фильмотека';
                    $metaList .= ','.$this->_metaElement(++$metaCount, $_SERVER['REQUEST_URI'], 'Моя фильмотека');
                }
            }
        }
        $meta = str_replace('{0}', $metaList, $meta);
        $crumbs .= $meta;
        //print_r($info);
        $memcache->set($key, $crumbs, false, 86400);
        echo $crumbs;
    }

}