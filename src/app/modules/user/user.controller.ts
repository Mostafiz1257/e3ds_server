import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createUserIntoDb(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const UserCollection = {
  createUser,
};
