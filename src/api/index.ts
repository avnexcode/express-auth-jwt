import express from 'express';

import auth from './auth';
import profile from './profile';
const router = express.Router();

router.get('/', (req, res, next) => {
  const result = {
    statusCode: 200,
    message: 'Express Auth Jwt API',
  };
  res.locals = result;
  next();
});

router.use('/auth', auth);
router.use('/profile', profile);

export default router;
