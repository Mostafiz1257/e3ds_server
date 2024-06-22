import express from 'express'
import validateRequest from '../middleware/validateRequest'
import { RoomValidation } from './room.validation'
import { RoomController } from './room.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post('/rooms',auth(USER_ROLE.admin), validateRequest(RoomValidation.roomValidationSchema), RoomController.createRoom)

router.put('/rooms/:id',auth(USER_ROLE.admin), validateRequest(RoomValidation.updateRoomValidationSchema),RoomController.updateRoom)


router.get('/rooms',RoomController.getAllRooms)
router.get('/rooms/:id',RoomController.getSingleRoom)
router.delete('/rooms/:id',auth(USER_ROLE.admin),RoomController.deleteRoom)

export const RoomRouter = router;