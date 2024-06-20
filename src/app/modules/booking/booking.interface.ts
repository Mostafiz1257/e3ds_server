import { Types } from "mongoose";

export type IBooking ={
    date: string;
  slots: Types.ObjectId[]; 
  room: Types.ObjectId;   
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: 'confirmed' | 'unconfirmed'; 
  isDeleted: boolean;
}