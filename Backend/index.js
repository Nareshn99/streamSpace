import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/route.js';

const app=express();

//configu
dotenv.config();


//DB connection
connectDB()


app.use(express.json());

app.use("/api/docs/static/",router)

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is Runnning on Port ${PORT}`)
})