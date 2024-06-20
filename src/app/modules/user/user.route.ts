import express from 'express'
import validateRequest from '../middleware/validateRequest';
import { UserCollection } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/signup',validateRequest(UserValidation.userValidationSchema),UserCollection.createUser )


export const userRouter = router;