<?php
class Zend_View_Helper_CategoriesRight extends Zend_View_Helper_Abstract
{
    public $view;
    
    public function categoriesRight($cat){
        $memcache = Zend_Registry::get("memcache");
        $active_cat = Zend_Registry::get("active_cat");
        if($cat == 'news'){
            $key = 'categories_right_news_active_'.$active_cat;
            if(($result = $memcache->get($key)) === false ) {
                $news_categories = Model_News::getAllCategories();
                $html = $this->_renderHTMLnews($news_categories,$active_cat);
                $memcache->set($key, $html, false, 0);
            } else {
                //$html = $result;
                $news_categories = Model_News::getAllCategories();
                $html = $this->_renderHTMLnews($news_categories,$active_cat);
            }
        } elseif($cat == 'publ'){
            $key = 'categories_right_publ_active_'.$active_cat;
            if(($result = $memcache->get($key)) === false ) {
                $publ_categories = Model_Publ::getAllCategories();
                $html = $this->_renderHTMLpubl($publ_categories,$active_cat);
                $memcache->set($key, $html, false, 0);
            } else {
                //$html = $result;
                $publ_categories = Model_Publ::getAllCategories();
                $html = $this->_renderHTMLpubl($publ_categories,$active_cat);
            }
        }
        return $html;
    }
    
    protected function _renderHTMLnews($news_categories,$active_cat){
        $icons = array(
            "triller.png",
            "series.png",
            "anime.png",
            "thriller.png",
            "war.png",
            "detective.png",
            "documental.png",
            "dram.png",
            "history.png",
            "comedy.png",
            "criminal.png",
            "mel_dram.png",
            "music.png",
            "m_films.png",
            "adventure.png",
            "family.png",
            "sport.png",
            "broadcast.png",
            "thriller1.png",
            "horrors.png",
            "fantastic.png",
            "interesting.png"
        );
        ob_start();
        ?>
        <ul class="navigation-cat">
        <? $step=6; $i=1; foreach($news_categories as $key => $category){ ?>

            <li>
                <a class="<? if($active_cat == $category['description']){echo "catNameActive";}else{echo "catName";} ?>" href="/news/<? if($category['description'] != ""){ echo $category['description']."/";}?>1-0-<? echo $category['id'];?>">
                    <img src="/redesign_assets/images/<?=$icons[$key]?>" alt="">&#160;
                <? echo $category['name'];?></a>
            </li>
        <? if($i%$step===0){
                echo "</ul><ul class=\"navigation-cat\">";
                $i=0;
                if($step == 5) {
                    $step = 6;
                } else {
                    $step = 5;
                }
            }
            $i++;
            } ?>
        </ul>

        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
    
    protected function _renderHTMLpubl($publ_categories,$active_cat){
        ob_start();
        ?>
        <table border="0" cellspacing="1" cellpadding="0" width="100%" class="catsTable">
            <tbody>
            <? foreach($publ_categories as $category){ ?>
            <tr>
                <td style="width:100%" class="catsTd" valign="top" id="cid<? echo $category['id'];?>">
                    <a class="<? if($active_cat == $category['password'] || ($active_cat == "publ_1" && $category['id'] == 1) ){echo "catNameActive";}else{echo "catName";} ?>" href="/publ/<? if($category['password'] != ""){ echo $category['password']."/";}?><? echo $category['id'];?>"><? echo $category['name'];?></a>
                    <span class="catNumData" style="unicode-bidi:embed;">[<? echo $category['num_data'];?>]</span>
                </td>
            </tr>
            <?}?>
            </tbody>
        </table>
        <?php
        $cont = ob_get_contents();
        ob_end_clean();
        return $cont;        
    }
}