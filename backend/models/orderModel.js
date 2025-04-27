import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount:{ type: Number ,required:true},
  address:{ type: Object,required:true},
  status:{ type: String ,required:true , default:'Order Placed'},
  paymentMethod:{ type: String ,required:true},
  payment:{ type: Boolean ,required:true , default:false},
  Date:{ type: Date ,required:true},
});

const orderModel = mongoose.model.order || mongoose.model('order',orderShema)
export default orderModel;