import mongoose from "mongoose";

let connected = false;

const connectDB = async () =>
{
    mongoose.set("strictQuery",true)


    // if the database is already connected, return the existing connection

    if (connected)
    {
        console.log('the database is already connected');
        return ;
    }
    // if the database is not connected, connect to the database

    try {
       await mongoose.connect(process.env.MONGODB_URI);
       connected = true;
       console.log("Connected to the database");
    } catch (error) {
        console.log('error connecting to the database',error);
        
    }
}

export default connectDB;