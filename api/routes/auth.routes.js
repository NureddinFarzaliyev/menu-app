import express from 'express';
const router = express.Router();

import { testController, signupController, loginController } from '../controllers/auth.controller.js';

router.get('/', testController)
router.post('/signup', signupController)
router.post('/login', loginController)

export default router