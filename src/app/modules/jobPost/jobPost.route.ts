import express from 'express'
import { JobPostCollection } from './jobPost.controller';


const router = express.Router();

router.post('/create-jobPost',JobPostCollection.createJobPost )

router.get('/all-jobPost',JobPostCollection.getAllJobPost)

router.patch('/:id', JobPostCollection.updateJobPost);

router.patch('/:id',JobPostCollection.blockJobPost)

router.get('/:id', JobPostCollection.getSingleJobPost);

router.delete('/:id', JobPostCollection.deleteJobPost);

export const JobRouter = router;