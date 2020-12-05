import express from 'express';
import authorize from '../middleware/authorize';
import { googleAuth, googleCallback } from '../auth';
import handleSignOut from '../auth/handleSignOut';

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

router.get('/signout', authorize, handleSignOut);

export default router;
