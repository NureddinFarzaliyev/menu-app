import express from 'express';
const router = express.Router();

import { createCategoryController, 
    createItemController, 
    deleteCategoryController, 
    deleteItemController, 
    editCategoryController,
    editItemController, } from '../controllers/content.controller.js';


// router.get('/', (req,res) => {res.json({test: "test"})})

router.post('/category/:menuId', createCategoryController)
router.put('/category/:menuId/:categoryId', editCategoryController)
router.delete('/category/:menuId/:categoryId', deleteCategoryController)

router.post('/item/:menuId/:categoryId', createItemController)
router.put('/item/:menuId/:categoryId/:itemId', editItemController)
router.delete('/item/:menuId/:categoryId/:itemId', deleteItemController)

export default router