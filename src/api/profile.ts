import express from 'express';
import { deleteProfileController, getProfileController, patchProfileController, putProfileController } from '../controllers/profile.controller';
import * as middlewares from '../middlewares/index';
const router = express.Router();

router.use(middlewares.authenticateToken);

router.get('/', getProfileController);
router.put('/', putProfileController);
router.patch('/', patchProfileController);
router.delete('/', deleteProfileController);

export default router;