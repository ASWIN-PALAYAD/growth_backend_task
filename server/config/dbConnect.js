import { log } from 'console';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
 
mongoose.set('strictQuery',false);

const dbConnect = async() => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL); 
        console.log(`mongodb connected to ${connected.connection.host}`);
    } catch (error) {
            console.log(`Error : ${error.message}`);
    }
}
 
export  default dbConnect;