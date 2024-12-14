import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.router";
import { JobRouter } from "../modules/jobPost/jobPost.route";
import { ApplicationRouter } from "../modules/application/application.route";


const router = Router();

const moduleRoute = [
    {
      path: '/api/v1/auth',
      router: userRouter,
    },
    {
      path: '/api/v1/auth',
      router: AuthRouter,
    },
    {
    path:'/api/v1/job',
    router:JobRouter
    },
    {
      path:'/api/v1/application',
      router:ApplicationRouter
    }
   
  ];
  
  moduleRoute.forEach((route) => router.use(route.path, route.router));
  
  export default router;
  