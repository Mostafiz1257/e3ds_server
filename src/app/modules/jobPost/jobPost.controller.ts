// controllers/jobPost.controller.ts
import { Request, Response, NextFunction } from 'express';
import { jobPostService } from './jobPost.service';
import sendResponse from '../../utils/sendResponse';


const createJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPostData = req.body; 
    const result = await jobPostService.createJobPostIntoDb(jobPostData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Job post created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const jobPostData = req.body; // Data sent by the client
    const result = await jobPostService.updateJobPostIntoDb(id, jobPostData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Job post updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const blockJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await jobPostService.blockJobPostIntoDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Job post blocked successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await jobPostService.getAllJobPostFromDb();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Job posts retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; 
    const result = await jobPostService.getSingleJobPostFromDb(id);
    if (!result) {
     res.send("No data found")
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Job post retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await jobPostService.deleteJobPostFromDb(id);
    if (!result) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Job post not found',
        data: null,
      });
      return;
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Job post deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const JobPostCollection = {
  createJobPost,
  updateJobPost,
  blockJobPost,
  getAllJobPost,
  getSingleJobPost,
  deleteJobPost
};
