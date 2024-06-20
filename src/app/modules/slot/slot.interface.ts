import { Types } from "mongoose";

export type ISlot= {
    room: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;

}