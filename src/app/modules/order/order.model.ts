import mongoose, { Schema } from "mongoose";
import OrderData from "./order.interface";

const OrderDataSchema: Schema = new Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  room_name: { type: String, required: true },
  total_amount: { type: Number, required: true },
  date: { type: Date, required: true },
  transaction_id: { type: String, required: true },
});

  
  const OrderData = mongoose.model<OrderData>('OrderData', OrderDataSchema);
  export default OrderData;