import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log(`MongoDB is Connected with ${connect.connection.host}`)
    }
    catch (e) {
        console.error(e.message)
    }
}

export default connectDB;