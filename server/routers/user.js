import express from 'express';
import {
  login,
  register,
  profile,
  update_profile,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/:id').get(auth, profile).put(auth, update_profile);

export default router;
