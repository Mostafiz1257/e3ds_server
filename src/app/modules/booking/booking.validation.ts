import { z } from 'zod';

const bookingValidation = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), 
    slots: z.array(z.string()), 
    room: z.string(), 
    user: z.string(),
    // totalAmount: z.number(), // Ensure totalAmount is validated appropriately
    // isConfirmed: z.enum(['confirmed', 'unconfirmed']), // Validate isConfirmed as enum
    // isDeleted: z.boolean(),
  }),
});

const updateBookingValidation = z.object({
    body: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), 
      slots: z.array(z.string()).optional(), 
      room: z.string().optional(), 
      user: z.string().optional(),
      totalAmount: z.number().optional(), // Optional for update operations
    isConfirmed: z.enum(['confirmed', 'unconfirmed']).optional(), // Optional for update operations
    isDeleted: z.boolean().optional(), // Optional for update operations
    }),
  });

export const BookingValidation ={
bookingValidation,
updateBookingValidation
}