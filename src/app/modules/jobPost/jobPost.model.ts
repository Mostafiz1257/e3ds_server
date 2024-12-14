// JobPost Model Schema in Mongoose
import mongoose, { Schema } from 'mongoose';
import { IJobPost } from './jobPost.interface';

const jobPostSchema: Schema<IJobPost> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salaryRange:{
        type:String,
        required:true
    }
    ,
    jobType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
        required: true,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

jobPostSchema.pre<IJobPost>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const JobPost = mongoose.model<IJobPost>('JobPost', jobPostSchema);
export default JobPost;

