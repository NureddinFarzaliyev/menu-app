import express from 'express';
const router = express.Router();

import { createMenuController,
    deleteMenuController,
    editMenuController,
    getUserMenuController,
    getUserMenusController } from '../controllers/menus.controller.js';

router.post('/', createMenuController)
router.get('/', getUserMenusController)

router.get('/:menuId', getUserMenuController)
router.delete('/:menuId', deleteMenuController)
router.put('/:menuId', editMenuController)

export default router