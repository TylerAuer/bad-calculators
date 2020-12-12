import express from 'express';
import trackPuzzleAction from '../endpoints/trackPuzzleAction';
const router = express.Router();

router.put('/', trackPuzzleAction);

export default router;
