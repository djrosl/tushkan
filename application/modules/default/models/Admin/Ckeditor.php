<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Model_Admin_Ckeditor {
    public static function CkEditor_js ($id){
        $str = "<script>CKEDITOR.replace('".$id."',{
            filebrowserBrowseUrl : '/admins/fckeditor',
        	filebrowserImageBrowseUrl : '/_nw/kcfinder/browse.php?type=images',
        	filebrowserImageUploadUrl : '/_nw/kcfinder/upload.php?type=images', 
        });</script>";
        return $str;
    }
}