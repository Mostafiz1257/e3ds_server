import { z } from 'zod';

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number().int(),
    floorNo: z.number().int(),
    capacity: z.number().int().positive(),
    pricePerSlot: z.number().positive(),
    amenities: z.array(z.string()),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().int().optional(),
    floorNo: z.number().int().optional(),
    capacity: z.number().int().positive().optional(),
    pricePerSlot: z.number().positive().optional(),
    amenities: z.array(z.string()).optional(),
  }),
});

 export const RoomValidation = {
    roomValidationSchema,
    updateRoomValidationSchema
}