import express from 'express';
import { register, loginUser } from '../controllers/auth';
import { fileUploader } from '../middlewares/fileHandler';

const router = express.Router();

router.post('/register', fileUploader, register);
router.post('/login',fileUploader, loginUser);


export default router;
