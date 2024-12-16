import { IJobApplication } from "./applicant.interface";
import JobApplication from "./application.model";


const createApplicationIntoDb = async (applicationData: IJobApplication): Promise<IJobApplication> => {
  try {
    const newApplication = new JobApplication(applicationData);
    await newApplication.save();
    return newApplication;
  } catch (error) {
    throw new Error('Error creating job application: ' );
  }
};

const getAllApplicationFromDb = async (): Promise<IJobApplication[]> => {
  try {
    // Fetch applications where isDeleted is false
    const applications = await JobApplication.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('jobPost','title salaryRange jobType');
    return applications;
  } catch (error) {
    throw new Error('Error fetching job applications: ' );
  }
};

const deleteApplicationFromDb = async (applicationId: string): Promise<IJobApplication | null> => {
  try {
    // Update the isDeleted field to true instead of deleting the document
    const deletedApplication = await JobApplication.findByIdAndUpdate(
      applicationId,
      { isDeleted: true },
      { new: true } 
    );
    return deletedApplication;
  } catch (error) {
    throw new Error('Error deleting job application: ' );
  }
};


const getSingleApplicationFromDb = async (applicationId: string): Promise<IJobApplication | null> => {
  try {
    const application = await JobApplication.findById(applicationId).populate('jobPost', 'title salaryRange jobType');
    return application;
  } catch (error) {
    throw new Error('Error fetching job application: ' );
  }
};
export const jobApplicationService = {
  createApplicationIntoDb,
  getAllApplicationFromDb,
  deleteApplicationFromDb,
  getSingleApplicationFromDb
};
