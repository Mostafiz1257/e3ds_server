import mongoose, { Schema } from "mongoose";
import { IJobApplication } from "./applicant.interface";

const applicationSchema: Schema<IJobApplication> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        resume: {
            type: String,
            required: true,
        },
        jobPost: {
            type: Schema.Types.ObjectId,
            ref: "JobPost", 
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false, 
        },
    },
    {
        timestamps: true, 
    }
);

applicationSchema.pre<IJobApplication>("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const JobApplication = mongoose.model<IJobApplication>("Applicant", applicationSchema);
export default JobApplication;
