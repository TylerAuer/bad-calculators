import express from 'express';
import getPuzzle from '../endpoints/getPuzzle';

const router = express.Router();

router.get('/:id', getPuzzle);

export default router;
