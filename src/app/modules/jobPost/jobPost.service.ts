// services/jobPost.service.ts

import { IJobPost } from './jobPost.interface';
import JobPost from './jobPost.model';


const createJobPostIntoDb = async (jobData: IJobPost): Promise<IJobPost> => {
  try {
    const newJobPost = new JobPost(jobData);
    await newJobPost.save();
    return newJobPost;
  } catch (error) {
    throw new Error('Error creating job post: ' + error.message);
  }
};

const updateJobPostIntoDb = async (jobPostId: string, updatedData: Partial<IJobPost>): Promise<IJobPost | null> => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(jobPostId, updatedData, {
      new: true,
      runValidators: true,
    });
    return updatedJobPost;
  } catch (error) {
    throw new Error('Error updating job post: ' + error.message);
  }
};

const blockJobPostIntoDb = async (jobPostId: string): Promise<IJobPost | null> => {
  try {
    const blockedJobPost = await JobPost.findByIdAndUpdate(jobPostId, { isActive: false }, { new: true });
    return blockedJobPost;
  } catch (error) {
    throw new Error('Error blocking job post: ' + error.message);
  }
};

const getAllJobPostFromDb = async (): Promise<IJobPost[]> => {
  try {
    const jobPosts = await JobPost.find().sort({ createdAt: -1 });
    return jobPosts;
  } catch (error) {
    throw new Error('Error fetching job posts: ' + error.message);
  }
};

const getSingleJobPostFromDb = async (jobPostId: string): Promise<IJobPost | null> => {
  try {
    const jobPost = await JobPost.findById(jobPostId);
    return jobPost;
  } catch (error) {
    throw new Error('Error fetching job post: ' + error.message);
  }
};
const deleteJobPostFromDb = async (jobPostId: string): Promise<IJobPost | null> => {
  try {
    const deletedJobPost = await JobPost.findByIdAndDelete(jobPostId);
    return deletedJobPost;
  } catch (error) {
    throw new Error('Error deleting job post: ' + error.message);
  }
};

export const jobPostService = {
  createJobPostIntoDb,
  updateJobPostIntoDb,
  blockJobPostIntoDb,
  getAllJobPostFromDb,
  getSingleJobPostFromDb,
  deleteJobPostFromDb
};
