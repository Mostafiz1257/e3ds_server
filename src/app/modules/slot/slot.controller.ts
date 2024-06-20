// 
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotService } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotService.createSlotsIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'New slot is created successfully',
    data: result,
  });
});

const getAvailableSlot = catchAsync(async (req: Request, res: Response) => {
  const { date, roomId } = req.query;

  let result;

  if (!date && !roomId) {
    result = await SlotService.getAvailableSlotFromDb();
  } else {
    result = await SlotService.getAvailableSlotFromDb(roomId as string, date as string);
  }

  if (!result || result.length === 0) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAvailableSlot,
};
