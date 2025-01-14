import express from 'express';
const router = express.Router();

import { testController, signupController, loginController, logoutController, verificationController } from '../controllers/auth.controller.js';

router.get('/', testController)
router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/logout', logoutController)
router.post('/verify', verificationController)

export default router