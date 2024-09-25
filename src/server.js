import app from "../src/app.js"
import conntectdb from './db/connectDb.js';
import { serverPost } from "./config/index.js";

conntectdb();


app.listen(serverPost, ()=>console.log('server is runnig'));