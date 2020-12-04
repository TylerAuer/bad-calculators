import express from 'express';
import authorize from '../middleware/authorize';
import getUserData from '../endpoints/getUserData';

const router = express.Router();

router.get('/data', authorize, getUserData);
//router.put('/save-progress', authorize, saveProgress);

export default router;
