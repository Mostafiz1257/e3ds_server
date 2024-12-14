import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { jobApplicationService } from './application.service';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const applicationData = req.body;
  const result = await jobApplicationService.createApplicationIntoDb(applicationData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job application created successfully',
    data: result,
  });
});

const getAllApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await jobApplicationService.getAllApplicationFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job applications retrieved successfully',
    data: result,
  });
});

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await jobApplicationService.deleteApplicationFromDb(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Job application not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job application deleted successfully',
    data: result,
  });
});

export const jobApplicationController = {
  createApplication,
  getAllApplication,
  deleteApplication,
};
