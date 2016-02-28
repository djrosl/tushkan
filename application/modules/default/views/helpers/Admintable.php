<?php
/**
 * Created by PhpStorm.
 * User: v
 * Date: 02.02.2015
 * Time: 13:41
 */

class Zend_View_Helper_Admintable extends  Zend_View_Helper_Abstract
{
    public $_view;
    public $_role;
    public $_userGroups;

    public function admintable($title, $type, $pagin = true)
    {
        $user = Zend_Registry::get('user');
        $this->_role = $user->data['group_id'];
        $this->_userGroups = Model_Admin_Users::getAllGruopUser();

        switch ($type)
        {
            case 'news':
                $this->_view .= $this->searchBar($type);
                break;
            case 'publ':
                $this->_view .= $this->searchBar($type);
                break;
            case 'users':
                $this->_view .= $this->searchBar($type);
                break;
            case 'comments':
                $this->_view .= $this->searchBar($type);
                break;
        }
        $this->initHead($title, $pagin);
        $this->initAddButton($type);
        if($type == 'statcomm')
            $this->filterMat();
        if($type == 'statmat')
            $this->filterMat2();
        if($type == 'userstat')
            $this->filterMat3();
        $this->tableHead();
        switch ($type)
        {
            case 'tags':
                $this->tagsContent();
                break;
            case 'news':
                $this->newsContent();
                break;
            case 'publ':
                $this->publContent();
                break;
            case 'statpages':
                $this->statpagesContent();
                break;
            case 'users':
                $this->usersContent();
                break;
            case 'comments':
                $this->commentsContent();
                break;
            case 'statcomm':
                $this->commentsStatContent();
                break;
            case 'statmat':
                $this->matstatContent();
                break;
            case 'statmat':
                $this->matstatContent2();
                break;
            case 'userstat':
                $this->userstatContent();
                break;
            case 'daystat':
                $this->dayStat();
                break;
            case 'daystat':
                $this->dayStat2();
                break;
            case 'pools':
                $this->poolsContent();
                break;
            case 'banners':
                $this->bannersContent();
                break;
            case 'metatags':
                $this->metaContent();
                break;
            case 'settings':
                $this->settingsContent();
                break;
            case 'security':
                $this->securityContent();
                break;
        }
        $this->tableEnd();


        if($type == 'statmat'){
            if($pagin) {
                $this->_view .= '<div class="col-lg-12">';
            }else{
                $this->_view .= '<div class="col-lg-6" style="margin-top: 98px">';
            }
            $this->_view .= '
                    <div class="table-responsive">';
            if($pagin)
                $this->_view .= '<ul class="pagination">'.$this->view->paginationControl($this->view->pag,'Sliding','pagination.phtml').'</ul>';
            $this->_view .= '<table id="filt" class="table table-bordered table-hover table-striped">';
            $this->initAddButton($type);
            $this->tableHead2();
            $this->matstatContent2();
            $this->tableEnd();
        }
        if($type == 'metatags'){
            if($pagin) {
                $this->_view .= '<div class="col-lg-12">';
            }else{
                $this->_view .= '<div class="col-lg-6" style="margin-top: 63px">';
            }
            $this->_view .= '
                    <div class="table-responsive">';
            if($pagin)
                $this->_view .= '<ul class="pagination">'.$this->view->paginationControl($this->view->pag,'Sliding','pagination.phtml').'</ul>';
            $this->_view .= '<table id="filt" class="table table-bordered table-hover table-striped">';
            $this->initAddButton($type);
            $this->tableHead2();
            $this->newsblockContent();
            $this->tableEnd();
        }
        if($type == 'daystat'){
            if($pagin) {
                $this->_view .= '<div class="col-lg-12">';
            }else{
                $this->_view .= '<div class="col-lg-6" style="margin-top: 63px">';
            }
            $this->_view .= '
                    <div class="table-responsive">';
            if($pagin)
                $this->_view .= '<ul class="pagination">'.$this->view->paginationControl($this->view->pag,'Sliding','pagination.phtml').'</ul>';
            $this->_view .= '<table id="filt" class="table table-bordered table-hover table-striped">';
            $this->initAddButton($type);
            $this->tableHead2();
            $this->dayStat2();
            $this->tableEnd();
        }
        $this->rowEnd();
        return $this->_view;
    }

    private function initAddButton($type)
    {
        switch ($type)
        {
            case 'news':
                $this->_view .= $this->addbutton('Добавить новость', '/tncontrol/addnews');
                break;
            case 'publ':
                $this->_view .= $this->addbutton('Добавить статью', '/tncontrol/addpubl');
                break;
            case 'statpages':
                $this->_view .= $this->addbutton('Добавить страницу', '/tncontrol/addstatpage');
                break;
            case 'pools':
                $this->_view .= $this->addbutton('Добавить опрос', '/tncontrol/pool');
                break;
            case 'banners':
                $this->_view .= $this->addbutton('Добавить баннер', '/tncontrol/banner');
                break;
            case 'settings':
                $this->_view .= $this->addbutton('Добавить настройки', '/tncontrol/popupsett', 'rel="rels"');
                break;
            case 'security':
                $this->_view .= $this->addbutton('Добавить ip', '/tncontrol/popupipadd', 'rel="rels"');
                break;
        }
    }

    private function initHead($title, $pag = true)
    {
        $this->_view .= '<div class="row">';
        if($pag) {
            $this->_view .= '<div class="col-lg-12">';
        }else{
            $this->_view .= '<div class="col-lg-6">';
        }
        $this->_view .= '<h2>'.$title.'</h2>
                    <div class="table-responsive">';
        if($pag)
                    $this->_view .= '<ul class="pagination">'.$this->view->paginationControl($this->view->pag,'Sliding','pagination.phtml').'</ul>';
        $this->_view .= '<table id="filt" class="table table-bordered table-hover table-striped">';
    }

    private function tableHead(){
        $this->_view .= '<thead>
                            <tr>';
        foreach ($this->view->THBlock as $th):
            $this->_view .= '<th>'.$th.'</th>';
            endforeach;
        $this->_view .= '</tr>
                        </thead><tbody>';
    }
    private function tableHead2(){
        $this->_view .= '<thead>
                            <tr>';
        foreach ($this->view->THBlock2 as $th):
            $this->_view .= '<th>'.$th.'</th>';
        endforeach;
        $this->_view .= '</tr>
                        </thead><tbody>';
    }


    private function tableEnd()
    {
        $this->_view .= '</tbody> </table></div></div>';
    }

    private function rowEnd(){
        return '</div>';
    }

    private function addbutton($title, $href, $rel = '')
    {
        return '<a '.$rel.' href="'.$href.'"><button class="btn btn-sm btn-primary addbutton">'.$title.'</button></a>';
    }

    private function groupUser($gruopID, $role, $userID)
    {
        $user = Zend_Registry::get('user');
        if($user->data['group_id'] != 5)
            $dis = 'disabled';
        else
            $dis = '';
        //------
        $users = array('MODERATORS'=>'Модераторы','REGISTERED'=>'Пользователи'/*, 'NEWLY_REGISTERED'=>'Новые зарегистрированные'*/, 'ADMINISTRATORS'=>'Администраторы', /*'GUESTS'=>'Гости',*/ 'EDITORS'=>'Редакторы','CERTIFIED'=>'Проверенные','BANNED'=>'Забаненные');
        $v = '<select '.$dis.' user="'.$userID.'" class="form-control role">';
        $groups = $this->_userGroups;
        $v .= '<option value="'.$gruopID.'">' . $users[$role] . '</option>';
        foreach ($groups as $group) :
            if($gruopID != $group['group_id'] && $users[$group['group_name']]) {
                $v .= '<option value="'.$group['group_id'].'">' . $users[$group['group_name']] . '</option>';
            }
        endforeach;
        $v .= '</select>';
        return $v;
    }

    private function filterMat()
    {
        $razd = array('2'=>'Новости', '3'=>'Статьи');
        $this->_view .= '<input type="text" class="form-control fil_from" value="'.$this->view->filterparams['df'].'"><input value="'.$this->view->filterparams['dt'].'" type="text" class="form-control fil_to">';
        if($this->view->filterparams['razd'])
            $r = '<option value="'.$this->view->filterparams['razd'].'">'.$razd[$this->view->filterparams['razd']].'</option>';
        $this->_view .= '<select class="form-control razd">'.$r.'<option value="0">Все</option><option value="2">Новости</option><option value="3">Статьи</option></select>';
            if($this->view->filterparams['razd'] == 2){
                $cats = Model_Admin_News::getCategories();
                $this->_view .= '<select class="form-control cat">';
                if(!$this->view->filterparams['cat'])
                    $this->_view .= '<option selected value="0">Все</option>';
                foreach ($cats as $cat):
                    if($cat['id'] == $this->view->filterparams['cat'])
                        $this->_view .= '<option selected value="'.$cat['id'].'">'.$cat['name'].'</option>';
                    else
                    $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
                    endforeach;
                $this->_view .= '<select>';
            }
        if($this->view->filterparams['razd'] == 3){
            $cats = Model_Admin_Publ::getCategories();
            $this->_view .= '<select class="form-control cat">';
            if(!$this->view->filterparams['cat'])
                $this->_view .= '<option selected value="0">Все</option>';
            foreach ($cats as $cat):
                if($cat['id'] == $this->view->filterparams['cat'])
                    $this->_view .= '<option selected value="'.$cat['id'].'">'.$cat['name'].'</option>';
                else
                    $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
            endforeach;
            $this->_view .= '<select>';
        }
        $this->_view .= '<button style="height: 30px;" class="btn btn-success filter">Искать</button>';
    }

    private function filterMat2()
    {
        $razd = array('2'=>'Новости', '3'=>'Статьи');
        $this->_view .= '<input type="text" class="form-control fil_from" value="'.$this->view->filterparams['df'].'"><input value="'.$this->view->filterparams['dt'].'" type="text" class="form-control fil_to">';
        if($this->view->filterparams['razd'])
            $r = '<option value="'.$this->view->filterparams['razd'].'">'.$razd[$this->view->filterparams['razd']].'</option>';
        $this->_view .= '<select class="form-control razd">'.$r.'<option value="0">Все</option><option value="2">Новости</option><option value="3">Статьи</option></select>';
        if($this->view->filterparams['razd'] == 2){
            $cats = Model_Admin_News::getCategories();
            $this->_view .= '<select class="form-control cat">';
            if(!$this->view->filterparams['cat'])
                $this->_view .= '<option selected value="0">Все</option>';
            foreach ($cats as $cat):
                if($cat['id'] == $this->view->filterparams['cat'])
                    $this->_view .= '<option selected value="'.$cat['id'].'">'.$cat['name'].'</option>';
                else
                    $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
            endforeach;
            $this->_view .= '<select>';
        }
        if($this->view->filterparams['razd'] == 3){
            $cats = Model_Admin_Publ::getCategories();
            $this->_view .= '<select class="form-control cat">';
            if(!$this->view->filterparams['cat'])
                $this->_view .= '<option selected value="0">Все</option>';
            foreach ($cats as $cat):
                if($cat['id'] == $this->view->filterparams['cat'])
                    $this->_view .= '<option selected value="'.$cat['id'].'">'.$cat['name'].'</option>';
                else
                    $this->_view .= '<option value="'.$cat['id'].'">'.$cat['name'].'</option>';
            endforeach;
            $this->_view .= '<select>';
        }
        $this->_view .= '<button style="height: 30px;" class="btn btn-success filtermat">Искать</button>';
    }

    private function filterMat3()
    {
        $this->_view .= '<input type="text" class="form-control fil_from" value="'.$this->view->filterparams['df'].'"><input value="'.$this->view->filterparams['dt'].'" type="text" class="form-control fil_to">';
        $this->_view .= '<button style="height: 30px;" class="btn btn-success filtuser">Искать</button>';
    }

    private function searchBar($class){
        $user_type_search = array('1'=>'Логин', '2'=>'Имя', '3'=>'Email адрес', '4'=>'IP адрес');
        $news_type_search = array('1'=>'Название', '2'=>'Полное описание', '3'=>'Автор');
        $publ_type_search = array('1'=>'Название', '2'=>'Краткое описание','3'=>'Полное описание', '4'=>'Автор');
        $comment_type_search = array('1'=>'Логин автора', '2'=>'Имя автора','4'=>'IP автора','3'=>'Текст комментария' );
        // --------
        if($this->view->filterparams['search'] == '0')
            $this->view->filterparams['search'] = '';
        $users = array('8'=>'Модераторы','2'=>'Пользователи', /*'7'=>'Новые зарегистрированные',*/ '5'=>'Администраторы', /*'1'=>'Гости',*/ '9'=>'Редакторы', '10'=>'Проверенные','11'=>'Забаненый');
        $s .= '<form id="ssearch_'.$class.'"><div id="search_bar"><img src="/admins/s.png"><input id="search" type="text" class="form-control" value="'.$this->view->filterparams['search'].'" autocomplete="off" placeholder="Введите текст">
                <button class="btn btn-success '.$class.'">Искать</button>';
        if($class == 'comments'){
            $s .= '<button value="'.$this->view->s.'" class="btn btn-danger del-search">Удалить найденное</button>';
        }

        /*****************************************************User SEARCH ********************************************* */
        if($class == 'users'){
            $s .= '<select class="form-control us_role">';
            if($this->view->role){
                $s .= '<option value="'.$this->view->role.'">'.$users[$this->view->role].'</option>';
                $s .= '<option value="">Роли пользователей</option>';
            }else{
                $s .= '<option value="">Роли пользователей</option>';
            }
            foreach ($users as $u=>$v):
                $s .= '<option value="'.$u.'">'.$v.'</option>';
                endforeach;
            $s .= '</select>';
            $s .= '<select style="float: left; margin-left: 131px;" class="form-control search_type">';
            if($this->view->search_type){
                $s .= '<option value="'.$this->view->search_type.'">'.$user_type_search[$this->view->search_type].'</option>';
                $s .= '<option value="0">Критерий поиска</option>';
            }else{
                $s .= '<option value="0">Критерий поиска</option>';
            }
            foreach ($user_type_search as $k=>$v):
                $s .= '<option value="'.$k.'">'.$v.'</option>';
                endforeach;
            $s .= '</select>';
        }
        /****************************************************NEWS SEARCH */

        if($class == 'news'){
            $s .= '<select class="form-control search_type">';
            if($this->view->search_type){
                $s .= '<option value="'.$this->view->search_type.'">'.$news_type_search[$this->view->search_type].'</option>';
                $s .= '<option value="">Критерий поиска</option>';
            }else{
                $s .= '<option value="">Критерий поиска</option>';
            }
            foreach ($news_type_search as $u=>$v):
                $s .= '<option value="'.$u.'">'.$v.'</option>';
            endforeach;
             $s .= '<option value="4">Скрытые</option>';
            $s .= '</select> ';
        }
        if($class == 'publ'){
            $s .= '<select class="form-control search_type">';
            if($this->view->search_type){
                $s .= '<option value="'.$this->view->search_type.'">'.$publ_type_search[$this->view->search_type].'</option>';
                $s .= '<option value="">Критерий поиска</option>';
            }else{
                $s .= '<option value="">Критерий поиска</option>';
            }
            foreach ($publ_type_search as $u=>$v):
                $s .= '<option value="'.$u.'">'.$v.'</option>';
            endforeach;
            $s .= '</select>';
        }
        if($class == 'comments'){
            $s .= '<select class="form-control search_type">';
            if($this->view->search_type){
                $s .= '<option value="'.$this->view->search_type.'">'.$comment_type_search[$this->view->search_type].'</option>';
                $s .= '<option value="">Критерий поиска</option>';
            }else{
                $s .= '<option value="">Критерий поиска</option>';
            }
            foreach ($comment_type_search as $u=>$v):
                $s .= '<option value="'.$u.'">'.$v.'</option>';
            endforeach;
            $s .= '</select>';
        }
        $s .= '</div></form>';
        return $s;
    }

    /*
     * Content
     */

    public function tagsContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td colspan="5"><p>На даной странице нету материалов.</p></td></tr>';
        }
        foreach ($this->view->pag as $tag) {
            $this->_view .= '<tr id="tag-'.$tag['name'].'">
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="name">'.$tag['name'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="title">'.$tag['title'].'</td>
                            <td>'.$tag['type'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="link">'.$tag['link'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="header">'.$tag['header'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="h1">'.$tag['h1'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="h2">'.$tag['h2'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="meta_kw">'.$tag['meta_kw'].'</td>
                            <td class="edit-tag" data-id="'.$tag['name'].'" data-field="meta_descr">'.$tag['meta_descr'].'</td>
                            <td style="width: 120px;">';
            if($this->_role == 5) {
                $this->_view .='<a class="deltag" href="javascript:;" data-type="'.$tag['type'].'" data-name="'.$tag['name'].'"><i class="fa fa-remove"></i></a>';
            }
            $this->_view .='</td></tr>';
        }
    }

    public function newsContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $news):
        $this->_view .= '<tr>
                            <td><a target="_blank" href="/news/'.$news['sbscr'].'/'.date('Y-m-d', $news['addtime']).'-'.$news['id'].'">'.$news['title'].'</a> <b>('.$news['cat_name'].')</b>'.'</td>
                            <td>'.$news['author'].'</td>
                            <td>'.date("d.m.Y H:i",$news['addtime']).'</td>
                            <td style="width: 120px;">
                            <a href="/tncontrol/editnews/id/'.$news['id'].'"><i class="fa fa-edit"></i></a>';
            if($this->_role == 5)
                $this->_view .='<a class="delnew" href="/tncontrol/deletenews/id/'.$news['id'].'"><i class="fa fa-remove"></i></a>';
            $this->_view .='</td></tr>';
        endforeach;
    }

    public function publContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $publ):
            $pass = '';
            if($com['publ_password'])
                $pass = $com['publ_password'].'/';
            $this->_view .= '<tr>
                            <td><a target="_blank" href="/publ/'.$pass.$publ['url'].'/'.$publ['catID'].'-1-0-'.$publ['id'].'">'.$publ['title'].'</a> <b>('.$publ['cat_name'].')</b>'.'</td>
                            <td>'.$publ['user'].'</td>
                            <td>'.date("d.m.Y H:i",$publ['addtime']).'</td>
                            <td style="width: 120px;"><a href="/tncontrol/editpubl/id/'.$publ['id'].'"><i class="fa fa-edit"></i></a>';
            if($this->_role == 5) {
                $this->_view .= '<a class="delpubl" href="/tncontrol/deletepubl/id/' . $publ['id'] . '"><i class="fa fa-remove"></i></a></td>';
            }
            $this->_view .= '</tr>';
        endforeach;
    }

    public function statpagesContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $publ):
            if($publ['title'] == "Контакты"){
                $href = '/index/dlja_pravoobladatelej/0-48';
            }elseif($publ['title'] == "ТВ-онлайн"){
                $href = '/index/tv_onlajn/0-51';
            }else{
                $href = '/news/'.$publ['sbscr'].'/'.date('Y-m-d', $publ['addtime']).'-'.$publ['id'];
            }
            $this->_view .= '<tr>
                            <td><a target="_blank" href="'.$href.'">'.$publ['title'].'</a>'.'</td>
                            <td>'.$publ['user'].'</td>
                            <td>'.date("d.m.Y H:i",$publ['addtime']).'</td>
                            <td style="width: 120px;"><a href="/tncontrol/editstatpage/id/'.$publ['id'].'"><i class="fa fa-edit"></i></a>
                            <a class="delstatepage"  href="/tncontrol/deletestatpage/id/'.$publ['id'].'"><i class="fa fa-remove"></i></a></td>
                        </tr>';
        endforeach;
    }

    public function usersContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></tr>';
        }
        foreach ($this->view->pag as $user):
            $w = "window.open('/index/8-".$user['user_id']."','subwindow','HEIGHT=350,WIDTH=680'); return false;";
            $this->_view .= '<tr>
                            <td>'.$user['user_id'].'</td>
                            <td><a target="_blank" href="/index/8-'.$user['user_id'].'" >'.$user['username'].'</a></td>
                            <td>'.$user['user_ip'].'</td>
                            <td>'.$this->groupUser($user['group_id'], $user['role'], $user['user_id']).'</td>
                            <td>'.$user['username_clean'].'</td>
                            <td>'.$user['user_email'].'</td>
                            <td>';
            if($user['user_avatar_type'] == '1'){
                if($user['user_avatar'])
                    $this->_view .= '<img class="ava" src="/forum/download/file.php?avatar='.$user['user_avatar'].'">';
            }elseif($user['user_avatar_type'] == '2'){
                if($user['user_avatar'])
                    $this->_view .= '<img class="ava" src="'.$user['user_avatar'].'">';
            }
          $this->_view .= '</td>
                            <td style="width: 120px;"><a  href="/tncontrol/edituser/id/'.$user['user_id'].'"><i class="fa fa-edit"></i></a>
                            <a class="deluser" href="/tncontrol/deleteuser/id/'.$user['user_id'].'"><i class="fa fa-remove"></i></a></td>
                        </tr>';
        endforeach;
    }

    public function commentsContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $com):
            $w = "window.open('/index/8-".$com['userID']."','subwindow','HEIGHT=350,WIDTH=680'); return false;";
            $pass = '';
            if($com['publ_password'])
                $pass = $com['publ_password'].'/';
            $this->_view .= '<tr>
                            <td><p class="user_box"><a target="_blank" href="/index/8-'.$com['userID'].'"><b>'.$com['user'].'</b></a> ['.$com['name'].'<img iduser="'.$com['userID'].'" class="delcomm" src="/admins/del.png"  title="Удалить все комментарии пользователя" alt="">]<div class="comm_date"><p>'.$com['ip'].' <c>'.date('d.m.Y H:i', $com['addTime']).'</c></p></div>';
            if($com['moduleID'] == 2)
                $this->_view .= '<a href="/news/'.$com['news_url'].'/'.date('Y-m-d', $com['news_time']).'-'.$com['materialID'].'" target="_blank" class="mat_box">[материал]</a></p>';
            if($com['moduleID'] == 3)
                $this->_view .= '<a href="/publ/'.$pass.$com['publ_url'].'/'.$com['publ_catID'].'-1-0-'.$com['materialID'].'" target="_blank" class="mat_box">[материал]</a></p>';
            $this->_view .= '<div class="message_box">'.$com['message'].'</div></td>

                            <td style="width: 120px;"><a rel="rels"  href="/tncontrol/popupcomennt/id/'.$com['commentID'].'"><i class="fa fa-edit"></i></a>
                            <a class="delcomment" href="/tncontrol/deletecomment/id/'.$com['commentID'].'"><i class="fa fa-remove"></i></a></td>
                        </tr>';
        endforeach;
    }

    public function commentsStatContent()
    {
        foreach ($this->view->pag as $s):
            $pass = '';
            if($com['publ_password'])
                $pass = $com['publ_password'].'/';
            $this->_view .= '<tr>
                            <td>';
            if($s['moduleID'] == 2)
                $this->_view .= '<a href="/news/'.$s['news_url'].'/'.date('Y-m-d', $s['news_time']).'-'.$s['materialID'].'" target="_blank" class="mat_box">'.$s['news_title'].'</a></p>';
            if($s['moduleID'] == 3)
                $this->_view .= '<a href="/publ/'.$pass.$s['publ_url'].'/'.$s['publ_catID'].'-1-0-'.$s['materialID'].'" target="_blank" class="mat_box">'.$s['publ_title'].'</a></p>';
            $this->_view .= '</td>
                            <td>'.$s['count'].'</td></tr>';
            endforeach;
    }

    public function matstatContent()
    {
        for ($i = 0; $i < count($this->view->pag); $i++) {
            if($this->view->pag[$i]['dd'] == $this->view->pag[$i+1]['dd']){
                $count = $this->view->pag[$i]['cc'] + $this->view->pag[$i+1]['cc'];
                $i++;
            }else{
                $count = $this->view->pag[$i]['cc'];
            }
            $this->_view .= '<tr>
                            <td>' . $this->view->pag[$i]['dd'] . '</td>
                            <td><a href="/tncontrol/daystat/type/add/date/' . $this->view->pag[$i]['dd'] . '">' . $count . '</a></td>
                            </tr>';
        }
    }
    public function matstatContent2()
    {
        for ($i = 0; $i < count($this->view->pag2); $i++) {
            if($this->view->pag2[$i]['dd'] == $this->view->pag2[$i+1]['dd']){
                $count = $this->view->pag2[$i]['cc'] + $this->view->pag2[$i+1]['cc'];
                $i++;
            }else{
                $count = $this->view->pag2[$i]['cc'];
            }
            $this->_view .= '<tr>
                            <td>' . $this->view->pag2[$i]['dd'] . '</td>
                            <td><a href="/tncontrol/daystat/type/edit/date/' . $this->view->pag2[$i]['dd'] . '">' . $count . '</a></td>
                            </tr>';
        }
    }

    public function userstatContent()
    {
        foreach ($this->view->pag as $s):
            $this->_view .= '<tr>
                            <td>'.$s['date'].'</td>
                            <td>'.$s['count'].'</td>
                            </tr>';
        endforeach;
    }

    public function poolsContent()
    {
        $i = 1;
        foreach ($this->view->pag as $s):
            $this->_view .= '<tr>
                            <td>'.$i.'</td>';
            if($s['3'] == 1)
            $this->_view .= '<td><a href="/tncontrol/pool/id/'.$s['1'].'">'.$s['7'].'</a></td>';
            else
                $this->_view .= '<td><a href="/tncontrol/pool/id/'.$s['1'].'" style="color: #c0c0c0">'.$s['7'].'</a></td>';
            $this->_view .= '<td style="width: 120px;" ><a href="/tncontrol/pool/id/'.$s['1'].'"><i class="fa fa-pencil-square-o fa-3"></i> </a>
            <a class="delpool"  href="/tncontrol/deletepool/id/'.$s['1'].'"><i class="fa fa-remove"></i></a></td>
                            </tr>';$i++;
        endforeach;
    }
    public function securityContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td></tr>';
        }else{
            $i = 1;
            foreach ($this->view->pag as $s):
                $this->_view .= '<tr>
                            <td>'.$i.'</td>';
                if($s['status'] == 1)
                    $this->_view .= '<td><a rel="rels" href="/tncontrol/ip/id/'.$s['id'].'">'.$s['value'].'</a></td>';
                else
                    $this->_view .= '<td><a rel="rels" href="/tncontrol/ip/id/'.$s['id'].'" style="color: #c0c0c0">'.$s['value'].'</a></td>';
                $this->_view .= '<td style="width: 120px;" ><a rel="rels" href="/tncontrol/ip/id/'.$s['id'].'"><i class="fa fa-pencil-square-o fa-3"></i></a>
                <a class="delip"  href="/tncontrol/deleteip/id/'.$s['id'].'"><i class="fa fa-remove"></i></a></td>
                            </tr>';$i++;
            endforeach;
        }

    }


    private function statusBanner($status){
        $stat = array('active'=>'Активный', 'inactive'=>'Не активный');
        return $stat[$status];
    }

    private function catBanner($c){
        $cat = array('right_big'=>'Справа большой', 'above_news'=>'Над новостью','under_news'=>'Под новостью',
            'left_top'=>'Слева сверху','left_center'=>'Слева по центру', 'left_bottom'=>'Слева внизу', 'head_block'=>'В head');
        return $cat[$c];
    }

    public function bannersContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $b):
            $this->_view .= '<tr>
                            <td><a href="/tncontrol/banner/id/'.$b['id'].'">'.$b['title'].'</a>'.'</td>
                            <td>'.$this->catBanner($b['category']).'</td>
                            <td>'.$this->statusBanner($b['status']).'</td>
                            <td style="width: 120px;"><a href="/tncontrol/banner/id/'.$b['id'].'"><i class="fa fa-edit"></i></a>
                            <a class="delbanner"  href="/tncontrol/deletebanner/id/'.$b['id'].'"><i class="fa fa-remove"></i></a></td>
                        </tr>';
        endforeach;
    }

    public function metaContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td><td></td><td></td></tr>';
        }
        foreach ($this->view->pag as $b):
            $this->_view .= '<tr>
                            <td>'.$b['location'].'</td>
                            <td>'.$b['name'].'</td>
                            <td>'.$b['content'].'</td>
                            <td style="width: 100px;"><a rel="rels" href="/tncontrol/popupmeta/id/'.$b['id'].'"><i class="fa fa-edit"></i></a>
                            </td>
                        </tr>';
        endforeach;
    }

    public function newsblockContent()
    {
        if(count($this->view->pag2) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td></tr>';
        }
        $static = array(
            23 => 'Главная',
            27 => 'Новости кино',
            28 => 'Стол заказов',
        );
        foreach ($this->view->pag2 as $b):
            $this->_view .= '<tr>
                            <td>'.(!empty($b['nw_name']) ? $b['nw_name'] : $static[$b['id']]).'</td>
                            <td style="width: 100px;"><a href="/tncontrol/seo/id/'.$b['id'].'"><i class="fa fa-edit"></i></a>
                            </td>
                        </tr>';
        endforeach;
    }

    public function settingsContent()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td></tr>';
        }
        foreach ($this->view->pag as $b):
            $this->_view .= '<tr>
                            <td>'.$b['key'].'</td>
                            <td>'.$b['value'].'</td>
                            <td style="width: 120px;"><a rel="rels" href="/tncontrol/popupsett/id/'.$b['id'].'"><i class="fa fa-edit"></i></a>
                            <a class="delsett"  href="/tncontrol/deletesett/id/'.$b['id'].'"><i class="fa fa-remove"></i></a></td>
                        </tr>';
        endforeach;
    }

    public function dayStat()
    {
        if(count($this->view->pag) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td></tr>';
        }
        foreach ($this->view->pag as $news):
            $this->_view .= '<tr>
                            <td><a target="_blank" href="/news/'.$news['sbscr'].'/'.date('Y-m-d', $news['addtime']).'-'.$news['id'].'">'.$news['title'].'</a> <b>('.$news['cat_name'].')</b>'.'</td>
                            <td>'.$news['author'].'</td>
                            ';
            $this->_view .='</td></tr>';
        endforeach;
    }

    public function dayStat2()
    {
        if(count($this->view->pag2) == 0){
            $this->_view .= '<tr><td><p>На даной странице нету материалов.</p></td><td></td></tr>';
        }
        foreach ($this->view->pag2 as $publ):
            $pass = '';
            if($com['publ_password'])
                $pass = $com['publ_password'].'/';
            $this->_view .= '<tr>
                            <td><a target="_blank" href="/publ/'.$pass.$publ['url'].'/'.$publ['catID'].'-1-0-'.$publ['id'].'">'.$publ['title'].'</a> <b>('.$publ['cat_name'].')</b>'.'</td>
                            <td>'.$publ['user'].'</td>
                            </tr>';
        endforeach;
    }
}