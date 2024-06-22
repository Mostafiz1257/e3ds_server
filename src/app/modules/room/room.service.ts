
import { IRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDb = async (room: IRoom) => {
  const result = await Room.create(room);
 return result
};

const getAllRoomFromDb = async()=>{
  const result = await Room.find({ isDeleted: false });
  return result;

}


export const getSingleRoomFromDb = async (id: string) => {
  try {
    const result = await Room.findOne({ _id: id, isDeleted: false }).exec();
    return result;
  } catch (error) {
    throw new Error('Database query failed');
  }
};

const deleteRoomFromDb = async(id:string)=>{
    const result = await Room.findByIdAndUpdate(id,  { isDeleted: true },
      { new: true })
    return result
}

const updateRoomIntoDb = async(id:string, updateData:any)=>{
    try {
        const result = await Room.findOneAndUpdate(
          {_id:id},
          { $set: updateData  },
          { new: true, runValidators: true },
        );
        return result;
      } catch (error) {
        console.log(error);
      }
}

export const RoomService = {
  createRoomIntoDb,
  getAllRoomFromDb,
  getSingleRoomFromDb,
  deleteRoomFromDb,
  updateRoomIntoDb
};
