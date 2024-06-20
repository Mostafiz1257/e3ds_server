
import express from 'express'
import validateRequest from '../middleware/validateRequest'
import { BookingValidation } from './booking.validation'
import { BookingController } from './booking.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()


router.post('/bookings',auth(USER_ROLE.user), validateRequest(BookingValidation.bookingValidation), BookingController.createBooking)

router.get('/bookings',auth(USER_ROLE.admin), BookingController.getAllBookings)

router.put('/bookings/:id',auth(USER_ROLE.admin), validateRequest(BookingValidation.updateBookingValidation), BookingController.updateBooking)

router.get('/my-bookings',auth(USER_ROLE.user), BookingController.myBookings)

router.delete('/bookings/:id', auth(USER_ROLE.admin),BookingController.deleteBooking)


export const BookingRouter = router