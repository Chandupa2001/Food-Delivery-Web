import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://chanduparanawaka2001:chane@cluster0.zydsz8d.mongodb.net/food-delivery')
    .then(()=>console.log("DB Connected"));
}