import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cheerio from 'cheerio';
import dbConnect from "./config/dbConnect.js";
import cors from 'cors';
import { calculateWordCount, viewAllSearches } from "./controllers/dataController.js";


dbConnect()
const app = express();
app.use(bodyParser.json()); 
app.use(cors());


app.post('/api/fetchData',calculateWordCount);
app.get('/api/viewAll',viewAllSearches)


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`the server is running on port ${port}`);
})