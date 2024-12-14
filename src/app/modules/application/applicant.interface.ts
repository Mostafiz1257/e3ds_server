import mongoose from "mongoose";

export interface IJobApplication {
    name: string;
    email: string;
    website?: string; 
    linkedin?: string;
    address: string;
    resume: string; 
    jobPost: mongoose.Types.ObjectId; 
    isDeleted:boolean;
    createdAt: Date;
    updatedAt: Date;
}
