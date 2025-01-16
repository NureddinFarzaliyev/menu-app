import express from 'express';
const router = express.Router();

import { createMenuController,
    getUserMenusController } from '../controllers/menus.controller.js';

router.post('/', createMenuController)
router.get('/', getUserMenusController)

export default router