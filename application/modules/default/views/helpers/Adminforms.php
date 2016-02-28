<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 03.02.2015
 * Time: 13:10
 */


class Zend_View_Helper_Adminforms extends  Zend_View_Helper_Abstract
{
    public $_view;

    public function adminforms($title, $type)
    {
        $this->initHead();
        switch ($type){
            case 'addnews':
                $this->contentNewsAdd();
                break;
            case 'editnews':
                $this->contentNewsEdit();
                break;
            /*
             *
             */
            case 'addpubl':
                $this->contentPublAdd();
                break;
            case 'editpubl':
                $this->contentPublEdit();
                break;
            /*
             *
             */

            case 'addstatpage':
                $this->contentStatpageAdd();
                break;

            case 'editstatpage':
                $this->contentStatpageEdit();
                break;

            /*
             *
             */

            case 'edituser':
                $this->contentStatuserEdit();
                break;
        }


        $this->initEnd();

        return $this->_view;
    }

    private function initHead()
    {
        $this->_view .= '<div class="row"><div class="col-lg-12">';
    }

    private function initEnd()
    {
        $this->_view .= '<div></div>';
    }

    private function title($title)
    {
        return '<h3>'.$title.'</h3>';
    }

    private function inputText($label, $id, $value = '' ,$width = '50%')
    {
        return "<label>".$label."</label><input type='text' id='$id' value='$value' style='width: 50%' class='form-control'>";
    }

    private function inputHiden($id, $value)
    {
        return '<input type="hidden" id="'.$id.'" value="'.$value.'" >';
    }

    private function textArea($id, $label, $text = '')
    {
        return '<label>'.$label.'</label><textarea style="width:50%" id="'.$id.'" placeholder="Текст анонса" class="form-control">'.$text.'</textarea>';
    }

    private function dateS($date = '')
    {
        if($date){
            $d = explode('-', $date);
            for($i=0; $i<count($d); $i++){if(!$d[$i]){ $d[$i] = '00';}}
            $newdate = trim($d[0]).'-'.trim($d[1]).'-'.trim($d[2]);
            $date = $newdate;
        }
        if($date){
            $y = Source_M::dateIterator($date, '0 day', 'Y');
            $m = Source_M::dateIterator($date, '0 day', 'm');
            $d = Source_M::dateIterator($date, '0 day', 'd');
            $h = Source_M::dateIterator($date, '0 day', 'H');
            $ii = Source_M::dateIterator($date, '0 day', 'i');
        }else{
            $y = date('Y');
            $m = date('m');
            $d = date('d');
            $h = date('H');
            $ii = date('i');
        }

        $dates .= '<label style="width: 100%;  margin-top: 20px;">Дата добавления</label>';
        $dates .= '<select id="year" class="form-control datess" style="width: auto; float: left;">';

        for ($i = date('Y')+2; $i>= 2000; $i--){
            if($i != $y) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="mount" class="form-control datess" style="width: auto; float: left;">';
        for ($i = 1; $i<= 12; $i++){
            if($i != $m) {
                $dates .= '<option value="' . $i . '">' . $this->getDate($i) . '</option>';
            }else{
                $dates .= '<option selected value="' . $i . '">' . $this->getDate($i) . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="day" class="form-control datess" style="width: auto; float: left;">';
        for ($i = 1; $i <= 31; $i++){
            if($i< 10){
                $i = '0'.$i;
            }
            if($i != $d) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="hour" class="form-control datess" style="width: auto; float: left;">';
        for ($i = 0; $i <= 23; $i++){
            if($i< 10)
                $i = '0'.$i;
            if($i != $h) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="min" class="form-control datess" style="width: auto; float: left;">';
        for ($i = 0; $i <= 59; $i++){
            if($i< 10)
                $i = '0'.$i;
            if($i != $ii) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        return $dates;
    }

    private function dateSs($date = '')
    {
        if($date){
            $d = explode('-', $date);
            for($i=0; $i<count($d); $i++){if(!$d[$i]){ $d[$i] = '00';}}
            $newdate = trim($d[0]).'-'.trim($d[1]).'-'.trim($d[2]);
            $date = $newdate;
        }
        if($date){
            $y = Source_M::dateIterator($date, '0 day', 'Y');
            $m = Source_M::dateIterator($date, '0 day', 'm');
            $d = Source_M::dateIterator($date, '0 day', 'd');
            $h = Source_M::dateIterator($date, '0 day', 'H');
            $ii = Source_M::dateIterator($date, '0 day', 'i');
        }else{
            $y = date('Y');
            $m = date('m');
            $d = date('d');
            $h = date('H');
            $ii = date('i');
        }

        $dates .= '<label style="width: 100%;   margin-top: 20px;">Дата для адреса:</label>';
        $dates .= '<select id="year2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = date('Y')+2; $i>= 2000; $i--){
            if($i != $y) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="mount2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 1; $i<= 12; $i++){
            if($i != $m) {
                $dates .= '<option value="' . $i . '">' . $this->getDate($i) . '</option>';
            }else{
                $dates .= '<option selected value="' . $i . '">' . $this->getDate($i) . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="day2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 1; $i <= 31; $i++){
            if($i< 10){
                $i = '0'.$i;
            }
            if($i != $d) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="hour2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 0; $i <= 23; $i++){
            if($i< 10)
                $i = '0'.$i;
            if($i != $h) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="min2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 0; $i <= 59; $i++){
            if($i< 10)
                $i = '0'.$i;
            if($i != $ii) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';

        return $dates;
    }

    private function dateB($date = '', $title = 'Дата добавления')
    {
        if($date){
            $d = explode('-', $date);
            for($i=0; $i<count($d); $i++){if(!$d[$i]){ $d[$i] = '01';}}
            $newdate = trim($d[0]).'-'.trim($d[1]).'-'.trim($d[2]);
            $date = $newdate;
        }
        if($date){
            $y = Source_M::dateIterator($date, '0 day', 'Y');
            $m = Source_M::dateIterator($date, '0 day', 'm');
            $d = Source_M::dateIterator($date, '0 day', 'd');
        }else{
            $y = date('Y');
            $m = date('m');
            $d = date('d');
        }

        $dates .= '<label style="width: 100%;   margin-top: 20px;">'.$title.'</label>';
        $dates .= '<select id="year" class="form-control datess" style="width: auto; float: left;">';

        for ($i = date('Y')+2; $i>= 1900; $i--){
            if($i != $y) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="mount" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 1; $i<= 12; $i++){
            if($i != $m) {
                $dates .= '<option value="' . $i . '">' . $this->getDate($i) . '</option>';
            }else{
                $dates .= '<option selected value="' . $i . '">' . $this->getDate($i) . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="day" class="form-control datess" style="width: auto; ">';

        for ($i = 1; $i <= 31; $i++){
            if($i< 10){
                $i = '0'.$i;
            }
            if($i != $d) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        return $dates;
    }

    private function dateBb($date = '', $title = 'Дата регистрации')
    {
        if($date){
            $d = explode('-', $date);
            for($i=0; $i<count($d); $i++){if(!$d[$i]){ $d[$i] = '00';}}
            $newdate = trim($d[0]).'-'.trim($d[1]).'-'.trim($d[2]);
            $date = $newdate;
        }
        if($date){
            $y = Source_M::dateIterator($date, '0 day', 'Y');
            $m = Source_M::dateIterator($date, '0 day', 'm');
            $d = Source_M::dateIterator($date, '0 day', 'd');
        }else{
            $y = date('Y');
            $m = date('m');
            $d = date('d');
        }

        $dates .= '<label style="width: 100%;   margin-top: 20px;">'.$title.'</label>';
        $dates .= '<select id="year2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = date('Y')+2; $i>= 2000; $i--){
            if($i != $y) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="mount2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 1; $i<= 12; $i++){
            if($i != $m) {
                $dates .= '<option value="' . $i . '">' . $this->getDate($i) . '</option>';
            }else{
                $dates .= '<option selected value="' . $i . '">' . $this->getDate($i) . '</option>';
            }
        }
        $dates .= '</select>';
        $dates .= '<select id="day2" class="form-control datess" style="width: auto; float: left;">';

        for ($i = 1; $i <= 31; $i++){
            if($i< 10){
                $i = '0'.$i;
            }
            if($i != $d) {
                $dates .= '<option>' . $i . '</option>';
            }else{
                $dates .= '<option selected>' . $i . '</option>';
            }
        }
        $dates .= '</select>';


        return $dates;
    }

    private function getDate($d)
    {
        switch ($d){
            case '01':
            case '1':
                return 'Январь';
                break;
            case '02':
            case '2':
                return 'Февраль';
                break;
            case '03':
            case '3':
                return 'Март';
                break;
            case '04':
            case '4':
                return 'Апрель';
                break;
            case '05':
            case '5':
                return 'Май';
                break;
            case '06':
            case '6':
                return 'Июнь';
                break;
            case '07':
            case '7':
                return 'Июль';
                break;
            case '08':
            case '8':
                return 'Август';
                break;
            case '09':
            case '9':
                return 'Сентябрь';
                break;
            case '10':
                return 'Октябрь';
                break;
            case '11':
                return 'Ноябрь';
                break;
            case '12':
                return 'Декабрь';
                break;
        }
    }

    public function groupUser($gruopID, $role, $userID, $title = 'Група пользователя')
    {
        $user = Zend_Registry::get('user');
        if($user->data['group_id'] != 5)
            $dis = 'disabled';
        else
            $dis = '';
        //------
        $users = array('MODERATORS'=>'Модераторы','REGISTERED'=>'Пользователи'/*, 'NEWLY_REGISTERED'=>'Новые зарегистрированные'*/, 'ADMINISTRATORS'=>'Администраторы', /*'GUESTS'=>'Гости',*/ 'EDITORS'=>'Редакторы','CERTIFIED'=>'Проверенные','BANNED'=>'Забаненные');
        $v = '<label style="width: 100%;   margin-top: 20px;">'.$title.'</label><select '.$dis.' user="'.$userID.'" class="form-control" id="role">';
        $groups = Model_Admin_Users::getAllGruopUser();
        $v .= '<option value="'.$gruopID.'">' . $users[$role] . '</option>';
        foreach ($groups as $group) :
            if($gruopID != $group['group_id'] && $users[$group['group_name']]) {
                $v .= '<option value="'.$group['group_id'].'">' . $users[$group['group_name']] . '</option>';
            }
        endforeach;
        $v .= '</select>';
        return $v;
    }

    public function CkEditirHide($class1, $class2, $cl = '')
    {
        $view = '<div class="btn-group '.$cl.'" data-toggle="buttons">
                      <label class="btn btn-primary active '.$class1.'">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Скрыть редактор
                      </label>
                      <label class="btn btn-primary '.$class2.'">
                        <input type="radio" name="options" id="option2" autocomplete="off"> Показать редактор
                      </label>
                    </div>';

        return $view;
    }

    /*
     * Content
     */

    public function contentNewsAdd()
    {
        $this->_view .= $this->title('Добавление новости');
        $cats  = Model_Admin_News::getCategories();
        $this->_view .= '<label>Категория:</label><select id="cat" style="width: auto;" class="form-control">';
        foreach ($cats as $cat):
            $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
            endforeach;
        $this->_view .= '</select>';
        $this->_view .= $this->inputText('Название материала:', 'name');
        $this->_view .= $this->inputText('Название отображения в URL:', 'url');
        $this->_view .= $this->inputText('Продолжительность, мин:', 'duration');
        $this->_view .= $this->inputText('Torrent файл:', 'file');
        $this->_view .= $this->inputText('Метки: (<a href="javascript:;" onclick="generateMeta()">сгенерировать</a>)', 'tags');


        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '');
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht"></textarea></div>';

        $this->_view .= $this->dateS();
        $this->_view .= $this->dateSs();
        $this->_view .= '<label style="width: 100%; margin-top: 15px">Изображение</label><input type="file" id="news-file">';
        $this->_view .= '<label style="width: 90%;margin-top: 5px;margin-left: 10px"><input type="checkbox" id="ontop"> Материал всегда сверху</label>';
        $this->_view .= '<label style="width: 90%;margin-top: 5px;margin-left: 10px"><input type="checkbox" id="hide_on_site"> Не отображать на сайте</label>';
        $this->_view .= '<button class="btn btn-primary accept_news">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_news" data-skip-meta="true">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_news" data-skip-meta="false">Сохранить с метками</button>';
        $this->_view .= '<button class="btn btn-success save_news_open">Сохранить и открыть</button>';
    }

    public function contentNewsEdit()
    {
        $this->_view .= $this->inputHiden('idnews', $this->view->news->id);
        $this->_view .= $this->inputHiden('createtime', $this->view->news->createtime);
        $this->_view .= $this->title('Редактирование новости');
        $this->_view .= '<label>Автор материала:</label><c class="author_ch">'.$this->view->news->author.'</c> '.'<a rel="rels" href="/tncontrol/contenuser/content/news/id/'.$this->view->news->id.'">[изменить]</a>';
        $cats  = Model_Admin_News::getCategories();
        $this->_view .= '<label>Категория:</label><select id="cat" style="width: auto;" class="form-control">';
        $this->_view .= '<option value="'.$this->view->news->catID.'">'.$this->view->news->cat_name.'</option>';
        foreach ($cats as $cat):
            if($cat['id'] != $this->view->news->catID)
                $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
        endforeach;
        $this->_view .= '</select>';
        $this->_view .= $this->inputText('Название материала:', 'name', $this->view->news->title);
        $this->_view .= $this->inputText('Название отображения в URL:', 'url', $this->view->news->sbscr);
        $this->_view .= $this->inputText('Продолжительность, мин:', 'duration', $this->view->news->duration);
        $this->_view .= $this->inputText('Torrent файл: (<a href="javascript:;" onclick="$(\'#file\').val(\'\');">стереть</a>)', 'file', $this->view->news->file);
        $this->_view .= $this->inputText('Метки: (<a href="javascript:;" onclick="generateMeta()">сгенерировать</a>)', 'tags', $this->view->news->tags);
        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '', $this->view->news->message);
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht">'.$this->view->news->message.'</textarea></div>';
        $this->_view .= $this->dateS(date("d-m-Y H:i", $this->view->news->addtime));
        $this->_view .= $this->dateSs(date("d-m-Y H:i", $this->view->news->urltime));
        if($this->view->news->other1 != '' && $this->view->news->other1 != ' '){
            $this->_view .= '<div class="prevv"><a class="del_img"><i style="font-size: 20px" class="fa fa-remove"></i></a><img class="prel" src="'.$this->view->news->other1.'"></div>';
        }else{
            $this->_view .= '<div class="prevv"></div>';
        }
        $this->_view .= '<label style="width: 100%; margin-top: 15px">Изображение</label><input type="file" id="news-file">';
        if($this->view->news->ontop == 1) {
            $this->_view .= '<label style="width: 90%; margin-left: 10px"><input checked type="checkbox" id="ontop"> Материал всегда сверху</label>';
        }else{
            $this->_view .= '<label style="width: 90%;margin-left: 10px"><input type="checkbox" id="ontop"> Материал всегда сверху</label>';
        }
        if($this->view->news->hide_on_site == 0){
            $this->_view .= '<label style="width: 100%;margin-top: 5px;margin-left: 10px"><input type="checkbox" id="hide_on_site"> Не отображать на сайте</label>';
        }else{
            $this->_view .= '<label style="width: 100%;margin-top: 5px;margin-left: 10px"><input type="checkbox" checked id="hide_on_site"> Не отображать на сайте</label>';
        }
        $this->_view .= '<button class="btn btn-primary accept_news">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_news" data-skip-meta="true">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_news" data-skip-meta="false">Сохранить с метками</button>';
        $this->_view .= '<button class="btn btn-success save_news_open">Сохранить и открыть</button>';
    }

    /*
     *
     */

    public function contentPublAdd()
    {
        $this->_view .= $this->title('Добавление статьи');
        $cats  = Model_Admin_Publ::getCategories();
        $this->_view .= '<label>Категория:</label><select id="cat" style="width: auto;" class="form-control">';
        foreach ($cats as $cat):
            $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
        endforeach;
        $this->_view .= '</select>';
        $this->_view .= $this->inputText('Название материала:', 'name');
        $this->_view .= $this->inputText('Название отображения в URL:', 'url');


        $this->_view .= '<label>Краткое описание</label>';
        $this->_view .= $this->CkEditirHide('hidde2', 'show2', 'second');
        $this->_view .= '<div class="cke_h2">'.$this->textArea('text2', '');
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text2').'</div>';
        $this->_view .= '<div class="cke_s2"><textarea class="ht"></textarea></div>';

        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show', 'first');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '');
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht"></textarea></div>';


        $this->_view .= $this->dateS();
        $this->_view .= '<label style="width: 90%;margin-top: 5px;margin-left: 10px"><input type="checkbox" id="hide_on_site"> Не отображать на сайте</label>';
        $this->_view .= '<label style="width: 100%;margin-top: 15px">Изображение</label><input type="file" id="publ-file">';
        $this->_view .= '<button class="btn btn-primary accept_publ">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_publ">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_publ_open">Сохранить и открыть</button>';
    }

    public function contentPublEdit()
    {
        $this->_view .= $this->inputHiden('idnews', $this->view->news->id);
        $this->_view .= $this->inputHiden('createtime', $this->view->news->createtime);
        $this->_view .= $this->title('Редактирование статьи');
        $this->_view .= '<label>Автор материала:</label><c class="author_ch">'.$this->view->news->user.'</c> '.'<a rel="rels" href="/tncontrol/contenuser/content/publ/id/'.$this->view->news->id.'">[изменить]</a>';
        $cats  = Model_Admin_Publ::getCategories();
        $this->_view .= '<label>Категория:</label><select id="cat" style="width: auto;" class="form-control">';
        $this->_view .= '<option value="'.$this->view->news->catID.'">'.$this->view->news->cat_name.'</option>';
        foreach ($cats as $cat):
            if($cat['id'] != $this->view->news->catID)
                $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
        endforeach;
        $this->_view .= '</select>';
        $this->_view .= $this->inputText('Название материала:', 'name', $this->view->news->title);
        $this->_view .= $this->inputText('Название отображения в URL:', 'url', $this->view->news->url);

        $this->_view .= '<label>Краткое описание</label>';
        $this->_view .= $this->CkEditirHide('hidde2', 'show2', 'second');
        $this->_view .= '<div class="cke_h2">'.$this->textArea('text2', '', $this->view->news->brief);
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text2').'</div>';
        $this->_view .= '<div class="cke_s2"><textarea class="ht">'.$this->view->news->brief.'</textarea></div>';

        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show', 'first');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '', $this->view->news->message);
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht">'.$this->view->news->message.'</textarea></div>';

        $this->_view .= $this->dateS(date("d-m-Y H:i",$this->view->news->addtime));

        if($this->view->news->asite != '' && $this->view->news->asite != ' '){
            $this->_view .= '<div class="prevv"><a class="del_img"><i style="font-size: 20px" class="fa fa-remove"></i></a><img class="prel" src="'.$this->view->news->asite.'"></div>';
        }else{
            $this->_view .= '<div class="prevv"></div>';
        }
        $this->_view .= '<label style="width: 100%; margin-top: 15px">Изображение</label><input type="file" id="publ-file">';
        if($this->view->news->hide_on_site == 0){
            $this->_view .= '<label style="width: 100%;margin-top: 5px;margin-left: 0px"><input type="checkbox" id="hide_on_site"> Не отображать на сайте</label>';
        }else{
            $this->_view .= '<label style="width: 100%;margin-top: 5px;margin-left: 0px"><input type="checkbox" checked id="hide_on_site"> Не отображать на сайте</label>';
        }
        $this->_view .= '<button class="btn btn-primary accept_publ">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_publ">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_publ_open">Сохранить и открыть</button>';
    }

    /*
     *
     */

    public function contentStatpageAdd()
    {
        $this->_view .= $this->title('Добавление страницы');
        $this->_view .= '</select>';
        $this->_view .= $this->inputText('Название страницы:', 'name');
        $this->_view .= $this->inputText('Название отображения в URL:', 'url');
        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '');
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht"></textarea></div>';
        $this->_view .= '<button class="btn btn-primary accept_statpage">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_statpage">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_statpage_open">Сохранить и открыть</button>';
    }

    public function contentStatpageEdit()
    {
        $this->_view .= $this->inputHiden('idnews', $this->view->news->id);
        $this->_view .= $this->title('Редактирование страницы');
        $this->_view .= $this->inputText('Название страницы:', 'name', $this->view->news->title);
        $this->_view .= $this->inputText('Название отображения в URL:', 'url', $this->view->news->sbscr);
        $this->_view .= '<label>Полный текст материала</label>';
        $this->_view .= $this->CkEditirHide('hidde', 'show');
        $this->_view .= '<div class="cke_h">'.$this->textArea('text', '', $this->view->news->message);
        $this->_view .= Model_Admin_Ckeditor::CkEditor_js('text').'</div>';
        $this->_view .= '<div class="cke_s"><textarea class="ht">'.$this->view->news->message.'</textarea></div>';
        $this->_view .= '<button class="btn btn-primary accept_statpage">Применить</button>';
        $this->_view .= '<button class="btn btn-success save_statpage">Сохранить</button>';
        $this->_view .= '<button class="btn btn-success save_statpage_open">Сохранить и открыть</button>';
    }

    /*
     *
     */

    public function contentStatuserEdit()
    {
        $user = Zend_Registry::get('user');
        $this->_view .= $this->inputHiden('iduser', $this->view->user->user_id);
        $this->_view .= $this->title('Редактирование пользователя');
        $this->_view .= '<label>Логин:*</label><input type="text" style="width: 50%" class="form-control" value="'.$this->view->user->username.'" disabled>';
        if($user->data['group_id'] == 8){
            if($this->view->user->group_id == 5 || $this->view->user->group_id == 8 || $this->view->user->group_id == 9){
                $this->_view .= '<label>Пароль:*</label><p>******** [изменить]</p>';
            }else
                $this->_view .= '<label>Пароль:*</label><p>******** [<a rel="rels" href="/tncontrol/popuppass/id/'.$this->view->user->user_id.'">изменить</a>]</p>';
        }else
            $this->_view .= '<label>Пароль:*</label><p>******** [<a rel="rels" href="/tncontrol/popuppass/id/'.$this->view->user->user_id.'">изменить</a>]</p>';
        $this->_view .= $this->inputText('Полное имя:*', 'name', $this->view->user->full_name);
        $this->_view .= $this->inputText('E-mail адрес:*', 'email', $this->view->user->user_email);
        $this->_view .= $this->groupUser($this->view->user->group_id, $this->view->user->role, $this->view->user->user_id);
        $this->_view .= $this->dateB($this->view->user->user_birthday, 'Дата рождения');
        $this->_view .= $this->dateBb(date('d-m-Y', $this->view->user->user_regdate), 'Дата регистрации');
        $this->_view .= '<label>Ваш пол:</label><select class="form-control"><option>Мужчина</option><option>Женщина</option></select>';
        $this->_view .= $this->inputText('Город:', 'city', $this->view->user->user_from);
        $this->_view .= $this->inputText('Подпись:', 'sig', $this->view->user->user_sig);
        $this->_view .= '<button class="btn btn-success save_user">Сохранить</button>';
    }

}