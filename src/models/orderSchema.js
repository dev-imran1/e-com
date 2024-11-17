import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    orderId:{
        type:Number,
        unique:true,
    },
    total:Number,
    subTotal:Number,
    name:String,
    country:{
        type:String,
        default:"bangladesh",
    },
    address:String,
    city:String,
    distict:String,
    postcode:String,
    phone:String,
    email:String,
    shippingCost:Number,
    paymentType:{
        type:String,
        enum:["cod","online"],
    },
    orderStatus:{
        type:String,
        enum:["pending","confirm","proccesing","shopping","delivered","returned","cancelled"]
    },
    returnInfo:String,
},{
    timestamps:true
})