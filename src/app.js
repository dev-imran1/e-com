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
import router from './routes/userRoute.js'
app.use("/api/v1", router);



export default app