import app from "../src/app.js"
import conntectdb from './db/connectDb.js';
import { serverPort } from "./config/index.js";

conntectdb();


app.listen(serverPort, ()=>console.log('server is runnig'));