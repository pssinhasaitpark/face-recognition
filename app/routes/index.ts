import express from 'express';
import authRoutes from './authRoutes';
import mediaRoutes from './media';



const router = express.Router();

// Use the imported routes
router.use('/auth', authRoutes); // Authentication routes
router.use('/media', mediaRoutes); // Authentication routes



export default router;
