import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { createOrder } from './order.service';

const orderPayment = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body.bookingInfo;

  if (!booking) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }

  try {
    const sessionId = await createOrder(booking);
    res.json({ id: sessionId });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
});

export default orderPayment;
