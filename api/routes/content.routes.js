import express from 'express';
const router = express.Router();

import { createCategoryController, 
    deleteCategoryController, 
    editCategoryController, } from '../controllers/content.controller.js';


// router.get('/', (req,res) => {res.json({test: "test"})})

router.post('/category/:menuId', createCategoryController)
router.put('/category/:menuId/:categoryId', editCategoryController)
router.delete('/category/:menuId/:categoryId', deleteCategoryController)

export default router