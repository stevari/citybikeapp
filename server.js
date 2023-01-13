const axios = require("axios"); //to get data from api endpoint
const express = require('express'); //to make an express server
const { parse } = require("csv-parse"); //to parse csv data
const fs = require("fs"); //using file system to create a readable stream of data

//const dataBaseURL = `dev.hsl.fi/citybikes/od-trips-${year}/${year}-${month}.csv`
let year = "2021";
let month ="05";

const dataURL = `https://infopalvelut.storage.hsldev.com/citybikes/od-trips-${year}/${year}-${month}.csv`

async function retrieveCityBikeDataFrom(dataURL) {
    //fecthes csv data from the given URL
    try {
       await axios.get(dataURL).then(res =>{
            console.log(res.status)
        })
    } catch (error) {
        console.log("Error in function retrieveCityBikeDataFrom(url) "+error)
    }
}
