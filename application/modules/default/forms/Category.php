<?php
	
class Form_Category extends Zend_Form{
	
    public function __construct(){
	      $this->setName('form_category');
          parent::__construct();
          
          $category = new Zend_Form_Element_Text('category');
          $category->setLabel('Назва Категорії')
                   ->setRequired(true)
                   ->addValidator('NotEmpty');                                      
                                                                                          
          $submit = new Zend_Form_Element_Submit('submit');
          $submit->setLabel('    OK    ');
          
          $this->addElements(array($category, $submit));
	}
    
}

?>