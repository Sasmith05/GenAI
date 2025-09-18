import express from 'express';
import { login } from '../controllers/Auth_Login.js';

const router = express.Router();

// POST /api/login
router.post('/login', login);

export default router;
