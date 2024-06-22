import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  try {
    const result = await RoomService.createRoomIntoDb(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'New room is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 400,
      message: 'Failed to create new Room',
      error: error,
    });
  }
});

const getAllRooms = catchAsync(async (req, res) => {
  try {
    const result = await RoomService.getAllRoomFromDb();

    if (result.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'No rooms found',
        data: [],
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Room retrieved  successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieved Room',
      error: error,
    });
  }
});

const getSingleRoom = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await RoomService.getSingleRoomFromDb(id);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Room not found',
      });
    }
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Successfully retrieved the room',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to get the room data by the room ID',
    });
  }
});

const deleteRoom = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await RoomService.deleteRoomFromDb(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Successfully delete  the room',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 400,
      message: 'Failed to delete the room Data by the room id',
    });
  }
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await RoomService.updateRoomIntoDb(id, updateData);
  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Room updated successfully',
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }
});

export const RoomController = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
};
