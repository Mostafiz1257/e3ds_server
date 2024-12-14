import express from 'express'
import { jobApplicationController } from './application.controller';

const router = express.Router();

router.post('/create-application',jobApplicationController.createApplication)

router.get('/all-application',jobApplicationController.getAllApplication)

router.delete('/:id',jobApplicationController.deleteApplication)

export const ApplicationRouter = router;