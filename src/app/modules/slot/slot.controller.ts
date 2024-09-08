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
    result = await SlotService.getAvailableSlotFromDb(
      roomId as string,
      date as string,
    );
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


const getSlotsBySpecificRoom = catchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({
      success: false,
      message: 'Room ID is required',
    });
  }

  const result = await SlotService.getSlotsBySpecificRoomFromDb(roomId);

  if (!result || result.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No slots found for this room',
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Slots retrieved successfully',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotService.getAllSlotsFromDb();

  if (!result || result.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No slots found',
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'All slots retrieved successfully',
    data: result,
  });
});

const updateSlot = catchAsync(async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const result = await SlotService.updateSlotInDb(slotId, req.body);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Slot not found',
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot updated successfully',
    data: result,
  });
});

const deleteSlot = catchAsync(async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const result = await SlotService.deleteSlotFromDb(slotId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Slot not found',
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot deleted successfully',
    data: result,
  });
});


export const SlotController = {
  createSlot,
  getAvailableSlot,
  getSlotsBySpecificRoom,
  getAllSlots,
  updateSlot, 
  deleteSlot,
};
