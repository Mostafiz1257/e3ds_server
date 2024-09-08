import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBookingIntoDb(req.body);
  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDb();
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BookingService.updateBookingInDb(id, updatedData);
  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const deletedBooking = await BookingService.deleteBookingById(bookingId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking deleted successfully',
    data: deletedBooking,
  });
});

const myBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await BookingService.myBookingsFromDb(userId);
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

const rejectBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.rejectBookingIntoDb(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
})

const deleteUserBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBookingFromDb(id);

  
  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Data is not deleting',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });

})
export const BookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
  myBookings,
  deleteBooking,
  rejectBooking,
  deleteUserBooking
};
