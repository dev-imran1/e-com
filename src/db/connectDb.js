import mongoose from "mongoose";
import { dbUrl } from "../config/index.js";


const connectDb = async()=>{
    console.log('database')
    try {
        await mongoose.connect(dbUrl)
        console.log('database connect')
    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb 