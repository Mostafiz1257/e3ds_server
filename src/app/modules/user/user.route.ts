import express from 'express'
import validateRequest from '../middleware/validateRequest';
import { UserCollection } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';


const router = express.Router();

router.post('/signup',validateRequest(UserValidation.userValidationSchema),UserCollection.createUser )

router.get('/users',auth(USER_ROLE.admin),UserCollection.getAllUsers)

router.patch('/role/:id',auth(USER_ROLE.admin), UserCollection.updateUserRole);

export const userRouter = router;