import { Room } from '../room/room.model';
import { ISlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlotsIntoDb = async (payload: ISlot) => {
  const existingRoom = await Room.findById(payload.room);
  if (!existingRoom) {
    throw new Error('Room not found');
  }

  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60; // Duration in minutes
  const slots = [];

  // Convert time strings to minutes since midnight
  const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * slotDuration;
    const slotEndMinutes = slotStartMinutes + slotDuration;

    const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, '0')}:${String(slotStartMinutes % 60).padStart(2, '0')}`;
    const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, '0')}:${String(slotEndMinutes % 60).padStart(2, '0')}`;

    const newSlot = await Slot.create({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    slots.push(newSlot);
  }

  return slots;
};


const getAvailableSlotFromDb = async(roomId?:string, date?:string)=>{

  let query: { [key: string]: any } = { isBooked: false };
 
  if (date && roomId) {
    query = { room: roomId, date };
  } else if (date) {
    query.date = date;
  } else if (roomId) {
    query.room = roomId;
  }

  const availableSlots = await Slot.find(query).populate('room');

  return availableSlots;
}




export const SlotService = {
  createSlotsIntoDb,
  getAvailableSlotFromDb,

};
