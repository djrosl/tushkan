<?php
	class Model_Category extends Mod_Model
    {	   

        public function __construct($id = null)
        {
            parent::__construct(new Model_DbTable_Categories, $id);
        }
        
        public function getAllCategories()
        {
            return $this->_dbTable->fetchAll();
        }
            
        public function populateForm()
        {
            return $this->_row->toArray();
        }
                        
}
?>