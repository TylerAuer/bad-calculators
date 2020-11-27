import path from 'path';
import express from 'express';
const router = express.Router();

router.get('/', (req, res): void => {
  res.sendFile(path.resolve(__dirname + '/../../app/index.html'));
});

export default router;
