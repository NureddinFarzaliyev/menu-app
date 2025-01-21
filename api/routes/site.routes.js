import express from 'express';
const router = express.Router();

import { getSiteController } from '../controllers/site.controller.js';

router.get('/:url', getSiteController)

export default router