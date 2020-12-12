import express from 'express';
import trackSuccess from '../endpoints/trackSuccess';
import trackAttempt from '../endpoints/trackAttempt';
const router = express.Router();

router.put('/success', trackSuccess);
router.put('/attempt', trackAttempt);

export default router;
