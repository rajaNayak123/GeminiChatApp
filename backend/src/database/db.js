import mongoose from "mongoose";

const connectToDb = async() =>{
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`);
    } catch (error) {
        console.log("Error while connecting database",error);
        process.exit(1);
    }
}

export {connectToDb}