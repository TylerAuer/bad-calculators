import express from 'express';
import getLevel from '../endpoints/getLevel';

const router = express.Router();

router.get('/:id', getLevel);

export default router;
