<?php
class Zend_View_Helper_ShowFilmTags extends Zend_View_Helper_Abstract
{
    public static $tagsArr = array(
        'country' => 'Страна',
        'category' => 'Жанр',
        'quality' => 'Качество',
        'producer' => 'Режиссер',
        'actor' => 'В ролях',
        'year' => 'Год',
        'moderator' => 'Ведущие',
    );

    public static function strTags($tag, $data, $before = '', $after = '<br />', $separator = ', ', $echo = false, $limit = 0) {
        $d = 0; $c = $limit > 0 && count($data) > $limit ? $limit : count($data); $str = '';
        foreach($data as $i) {
            $ai = '<a href="'.($i['link'] == '' ? '/news/tag/'.$i['name'].'/1' : $i['link']).'">'.$i['title'].'</a>'
                .($separator != '' && ++$d != $c ? $separator : '');
            $nbefore = str_replace($i['title'], $ai, $before);
            $nafter = str_replace($i['title'], $ai, $after);
            if($nbefore != $before || $nafter != $after) {
                $before = $nbefore;
                $after = $nafter;
            } else {
                $str .= $ai;
            }
            if($d == $c) {
                break;
            }
        }
        $str = $before.$str.$after;
        if($echo) {
            echo $str;
        }
        return $str;
    }

    public function showFilmTags($tags, $content, $cutData = true) {
        foreach(self::$tagsArr as $tagName => $tagTitle) {
            if(!isset($tags[$tagName])) {
                continue;
            }
            $matches = array();
            if($tagName == 'year') {
                if(preg_match('/<b>\s*Дата\s*выхода\s*:?\s*<\/\s*b>\s*(.*?)(<\s*\/?\s*br\s*\/?\s*>)?\n/', $content, $matches)) {
                    $content = str_replace($matches[0], self::strTags($tagName, $tags[$tagName], '<b>Дата выхода:</b> '.$matches[1].' ', $matches[2]), $content);
                }
            } else if($tagName == 'quality') {
                if(preg_match('/<b>\s*Качество\s*:?\s*<\/\s*b>\s*(.*?)(<\s*\/?\s*br\s*\/?\s*>)?\n/', $content, $matches)) {
                    $content = str_replace($matches[0], self::strTags($tagName, $tags[$tagName], '<b>Качество:</b> '.$matches[1].' ', $matches[2]), $content);
                }
                //$item_message = preg_replace('/<b>\s*Качество\s*:?\s*<\/\s*b>\s*(.*?)(<\s*\/?\s*br\s*\/?\s*>)?\n/', strTags($this->tags[$tagName], '<b>Качество:</b> $1 ', '$2'), $item_message);
            } else {
                //$prefix = 'actor' == $tagName ? '<span class="two-lines-visible"><b>'.$tagTitle.':</b> ': '<b>'.$tagTitle.':</b> ';
                //$sufix = 'actor' == $tagName ? '</span>$1': '$1';
                $content = preg_replace('/<b>\s*'.$tagTitle.'\s*:?\s*<\/\s*b>\s*.*?(<\s*\/?\s*br\s*\/?\s*>)?\n/', self::strTags($tagName, $tags[$tagName], '<b>'.$tagTitle.':</b> ', '$1', ', ', false, $cutData && $tagName == 'actor' ? 7 : 0), $content);
            }
        }
        $content = preg_replace('/<span\s+style="color:\s*[0-9a-zA-Z#]+">/', '', $content);
        $content = str_replace(array('</span>'), '', $content);
        return $content; //str_replace(array('<br /><br /><br />', '<br><br><br>', '<br><br /><br>'), '<br />',
    }

}