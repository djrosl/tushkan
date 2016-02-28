<?php
	
class Form_New extends Zend_Form{
	
    public function __construct(){
	      $this->setName('form_new');
          parent::__construct();
          
          $title = new Zend_Form_Element_Text('title');
          $title->setLabel('Назва новини')
                   ->setRequired(true)
                   ->addValidator('NotEmpty');         
          $text = new Zend_Form_Element_Textarea('text');
          $text->setLabel('Текст новини')
                   ->setRequired(true)                   
                   ->addValidator('NotEmpty');
          $category_id = new Zend_Form_Element_Select('category_id');
          $category_id->setLabel('Категорія')
                ->setRequired(true)                
                ->addValidator('NotEmpty');                                       
          
          $categories = new Model_DbTable_Categories;
          $categories = $categories->fetchAll();
          foreach($categories as $category)
          {
            $category_id->addMultiOption($category->id, $category->category);
          }                                               
                                                                                          
          $submit = new Zend_Form_Element_Submit('submit');
          $submit->setLabel('    OK    ');
          
          $this->addElements(array($title, $text, $category_id, $submit));
	}
    
}

?>