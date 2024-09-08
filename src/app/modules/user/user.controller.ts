import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await UserService.createUserIntoDb(req.body);
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'User is created successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error); 
//   }
// };
const createUser = catchAsync(async (req:Request, res:Response) => {
  const result = await UserService.createUserIntoDb(req.body);

  res.status(200).json({
    success: result.success,
    statusCode: result.statusCode,
    message: result.message,
    token: result.token, 
    data: result.data,
  });
});

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsersFromDb();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log("id",id);
    const result = await UserService.updateUserRole(id);
    console.log("result", result);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User role updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserCollection = {
  createUser,getAllUsers,
  updateUserRole
};
