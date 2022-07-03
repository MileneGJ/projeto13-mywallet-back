import { Router } from 'express';
import {createUser,signInUser} from '../controllers/authControllers.js'
import validateNewUser from '../middlewares/validateNewUser.js'
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post("/sign-up", validateNewUser, createUser);
router.post('/login', validateUser, signInUser);

export default router