<?php
$GLOBALS['seoIds'] = array(
    '^\/$' => 23,
    '^\/publ$' => 27,
    '^\/publ\/\?page\d+$' => 27,
    '^\/news\/trejlery' => 2,
    '^\/index\/orderdesc' => 28,
);

function getSeoId($id = 0)
{
    if($id != 0) {
        return $id;
    }
    //echo $_SERVER['REQUEST_URI'];
    foreach($GLOBALS['seoIds'] as $key => $id) {
        if(preg_match('/'.$key.'/', $_SERVER['REQUEST_URI'])) {
            return $id;
        }
    }
    return null;
}

function getSeoInfo($id = 0, $how = 'getNewsBlocksById')
{
    global $news_blocks;
    if(!$news_blocks) {
        $seoId = getSeoId($id);
        $news_blocks = $seoId !== null ? (array)Model_News::$how($seoId) : null;
    }
    return $news_blocks;
}