import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDb = async (bookingData: IBooking) => {
  try {
    const room = await Room.findById(bookingData.room);
    if (!room) {
      throw new Error('Room not found');
    }

    const totalAmount = room.pricePerSlot * bookingData.slots.length;
    const createBooking = await Booking.create({
      ...bookingData,
      totalAmount,
      isConfirmed: 'unconfirmed',
      isDeleted: false,
    });

    await Slot.updateMany(
      { _id: { $in: bookingData.slots } },
      { isBooked: true },
    );

    const populatedBooking = await Booking.findById(createBooking._id)
      .populate({
        path: 'room',
        model: Room,
      })
      .populate({
        path: 'slots',
        model: Slot,
      })
      .populate({
        path: 'user',
        model: User,
      });

    if (!populatedBooking) {
      throw new Error('Failed to populate booking details');
    }
    return populatedBooking;
  } catch (error) {
    throw new Error('Failed to create booking');
  }
};

const getAllBookingsFromDb = async () => {
  const bookings = await Booking.find()
    .populate({
      path: 'room',
      model: Room,
    })
    .populate({
      path: 'slots',
      model: Slot,
    })
    .populate({
      path: 'user',
      model: User,
    });

  return bookings;
};
const updateBookingInDb = async (id: string, updateData: Partial<IBooking>) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('room').populate('slots').populate('user');

  if (!updatedBooking) {
    throw new Error('Booking not found');
  }

  return updatedBooking;
};

const deleteBookingById = async (bookingId: string) => {
  const deletedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { isDeleted: true },
    { new: true }
  )
    .populate('room')
    .populate('slots')
    .populate('user')
    .lean();

  if (!deletedBooking) {
    throw new Error('Booking not found');
  }
}

const myBookingsFromDb = async(userId: string)=>{
  const bookings = await Booking.find({ user: userId, isDeleted: false })
  .populate({
    path: 'room',
    model: Room,
  })
  .populate({
    path: 'slots',
    model: Slot,
  })
  .populate({
    path: 'user',
    model: User,
  });

return bookings;
}


export const BookingService = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  updateBookingInDb,
  myBookingsFromDb,
  deleteBookingById
};
