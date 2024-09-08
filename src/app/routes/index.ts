import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.router";
import { RoomRouter } from "../modules/room/room.route";
import { SlotRouter } from "../modules/slot/slot.route";
import { BookingRouter } from "../modules/booking/booking.route";
import { orderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoute = [
    {
      path: '/api/auth',
      router: userRouter,
    },
    {
      path: '/api/auth',
      router: AuthRouter,
    },
   
    {
      path: '/api',
      router: RoomRouter,
    },
    {
      path: '/api',
      router: SlotRouter,
    },
    {
      path: '/api',
      router: BookingRouter,
    },
    {
      path:'/api/create-checkout-session',
      router : orderRoutes

    }
   
  ];
  
  moduleRoute.forEach((route) => router.use(route.path, route.router));
  
  export default router;
  