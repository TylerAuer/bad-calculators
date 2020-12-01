import express from 'express';
import getTotalStarCount from '../endpoints/getTotalStarCount';

const router = express.Router();

router.get('/', getTotalStarCount);

export default router;
