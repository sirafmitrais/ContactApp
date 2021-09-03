import { Router } from 'express';
import { 
    validateField,
    validateLogin
} from '../controllers/validator/auth.validator';

import {
    login,
    register
} from '../controllers/auth.controller';
var router = Router();

router.post('/register', [validateField], register);
router.post('/login', [validateLogin], login );

export {router as AuthRouter};