import mongoose from "mongoose";

export interface IJobPost  {
    title: string;
    description: string;
    requirements: string[];
    location: string;
    salaryRange: string;
    jobType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
    postedBy: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}