import Data from "../models/Data.js";
import axios from "axios";
import * as cheerio from "cheerio"


export const calculateWordCount = async (req,res) => {
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
      console.error('Error calculating word count:', error);
      
    }
  }