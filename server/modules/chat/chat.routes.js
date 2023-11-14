// routes/messageRoutes.js
import { Router } from 'express';
const router = Router();
import {  sendMessage } from './chat.controller.js';

// Send a new message
router.post('/sendMessages', sendMessage);

export default router;
