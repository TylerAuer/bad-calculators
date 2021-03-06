import express from 'express';
import authorize from '../middleware/authorize';
import getUserData from '../endpoints/getUserData';
import saveUserProgress from '../endpoints/saveUserProgress';
import getUserProgress from '../endpoints/getUserProgress';

const router = express.Router();

router.get('/data', authorize, getUserData);
router.get('/progress', authorize, getUserProgress);
router.put('/save-progress', authorize, saveUserProgress);

export default router;
