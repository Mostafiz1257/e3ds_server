import { z } from "zod";

const createSlotValidation = z.object({
    body:z.object({
        room: z.string().min(1),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Validate date as YYYY-MM-DD format
        startTime: z.string().regex(/^\d{2}:\d{2}$/), // Validate startTime as HH:MM format
        endTime: z.string().regex(/^\d{2}:\d{2}$/), // Validate endTime as HH:MM format
        isBooked: z.boolean().optional(), // Validate isBooked as a boolean
    })
})

const updateSlotValidation = z.object({
    body:z.object({
        room: z.string().min(1).optional(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), // Validate date as YYYY-MM-DD format
        startTime: z.string().regex(/^\d{2}:\d{2}$/).optional(), // Validate startTime as HH:MM format
        endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(), // Validate endTime as HH:MM format
        isBooked: z.boolean().optional(), // Validate isBooked as a boolean
    })
})



export const slotValidation ={
    createSlotValidation,
    updateSlotValidation

} 