import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cheerio from 'cheerio';
import dbConnect from "./config/dbConnect.js";
import cors from 'cors';
import { addFavourite,deleteSingleItem,fetchAllDatas, removeFavourite, viewAllSearches } from "./controllers/dataController.js";


dbConnect()
const app = express();
app.use(bodyParser.json()); 
app.use(cors());

app.get('/',(req,res)=>{
    res.send("welcome");
});

app.post('/api/fetchData',fetchAllDatas);
app.get('/api/viewAll',viewAllSearches);
app.put('/api/addFavourite',addFavourite);
app.put('/api/removeFavourite',removeFavourite);
app.delete('/api/delete',deleteSingleItem);


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`the server is running on port ${port}`);
})