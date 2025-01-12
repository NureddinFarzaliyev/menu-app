import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@menuapp.ootv7.mongodb.net/menuapp?retryWrites=true&w=majority&appName=menuapp`)
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log('Error in MongoDB connection', error.message)        
    }
}

export default connectDB