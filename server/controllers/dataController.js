import Data from "../models/Data.js";
import axios from "axios";
import * as cheerio from "cheerio"

//fetch datas and wordcound
export const fetchAllDatas = async (req,res) => {
    const {url} = req.body; 
    
    try {
        
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const text = $('body').text();
      const words = text.split(' ');
      const wordCount = words.length;

      const webLinks = [];
    $('a').each((index,element) => {
      const href = $(element).attr('href')
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        webLinks.push(href);
      }
    });

    const mediaLinks = [];
    $('img, video').each((index,element) => { 
        const source = $(element).attr('src');
        if (source) {
          mediaLinks.push(source);
        }
      });



      const data = await Data.create({
        url,
        wordCount,
        webLinks,
        mediaLinks

      });

      res.json({
        status:'success',
        message:"data added",
        data,
      })
  
    } catch (error) {
      console.error(error.message); 
      
    }
  }


//get all previous searches
  export const viewAllSearches = async(req,res)=>{
    try {
        const data = await Data.find();
        res.json({
            status:"success",
            message:"fetched all datas",
            data
        })
    } catch (error) {
        console.log(error.message);
    }
  }


//add to favourite
  export const addFavourite = async(req,res)=> {
    const {id} = req.body
    try {
        const data = await Data.findByIdAndUpdate(id,{
            isFavourite:true
        },{new:true,runValidators:true})

        res.json({
            status:'success',
            message:"add to favourite",
            data
        })
        
    } catch (error) {
        console.log(error.message);
    }
  }


  //remove from favourite
  export const removeFavourite = async(req,res)=> {
    const {id} = req.body
    try {
        const data = await Data.findByIdAndUpdate(id,{
            isFavourite:false
        },{new:true,runValidators:true})

        res.json({
            status:'success',
            message:"removed form favourite",
            data
        })
        
    } catch (error) {
        console.log(error.message);
    }
  }

  //delete
  export const deleteSingleItem = async(req,res)=>{
    const {id} = req.body
    console.log(id);
    try {
      const data = await Data.findOneAndDelete(id);
      res.json({
        message:"deleted"
      })
      
    } catch (error) {
      console.log(error.message);
    }
  }