import express from 'express';
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cors({
    origin: "*",
    credentials: true
}))

// all routes 
// import userRouter from './routes/userRoute.js'
// app.use("/api/v1", userRouter);
app.use('/api/v2',()=>{
    console.log("routes app.js v2")
})


export default app