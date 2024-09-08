import { Router } from "express";
import orderPayment from "./order.controller";

const router = Router()

router.post('/',orderPayment)


export const orderRoutes  = router