
import express from 'express'
import validateRequest from '../middleware/validateRequest';
import { slotValidation } from './slot.validation';
import { SlotController } from './slot.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router()

router.post('/slots',auth(USER_ROLE.admin), validateRequest(slotValidation.createSlotValidation), SlotController.createSlot)

router.get('/slots/availability', SlotController.getAvailableSlot)

export const SlotRouter = router;