const needle = require("needle"); //to get data from api endpoint
const express = require('express'); //to make an express server
const csv = require("csv-parser"); //to parse csv data
require('dotenv').config();
const Journey = require('./models/journey.js');
const Station = require('./models/station.js');
const mongoose = require("mongoose");


//const dataBaseURL = `dev.hsl.fi/citybikes/od-trips-${year}/${year}-${month}.csv`
let year = "2021";
let month ="05";

const journeyDataURL = `https://infopalvelut.storage.hsldev.com/citybikes/od-trips-${year}/${year}-${month}.csv`;
const stationDataURL = `https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv`;
const sampleinputPath ="./sampledata/samplesationdata.csv";

const journeysList = [];
const stationList = [];

async function retrieveCityBikeDataFrom(dataURL) {
    //fecthes csv data from the given URL, and then parses it to objects
    
    try {
        needle
            .get(dataURL)
            .pipe(csv({
                mapHeaders: ({ header }) => header.replace(/\s|\(|\)|\./g, '') //get rid off whitespace and other stuff we don't want on headers
              }))
            .on('data', (row) => {
                if(row.Durationsec >= 10 && row.Covereddistancem > 10){ //only add journeys that meet the criteria we have determined
                    journeysList.push(row)
                }
            })
            .on("done", (err) => {
                if (err) console.log("An error has occurred");
                else console.log(`Done. JourneysList has ${journeysList.length} items`); 
                });
        
    } catch (error) {
        console.log('error in retrieveCityBikeDataFrom(url)'+error);
    }
}

async function retrieveStationDataFrom(url) {
    
    //Retrieves and parses station data from url 

    try {
        needle
        .get(url)
        .pipe(csv({
            mapValues: ({ value }) => value.replace(/\s/g, 'Helsinki') //empty fields are an indicator that the city is Helsinki, so replace empty with Helsinki
          }))
        .on('data', (row) =>{
            stationList.push(row);
        })
        .on("done", (err) => {
            if (err) console.log("An error has occurred");
            else console.log(`Done. StationList has ${stationList.length} items`); 
            });
    } catch (error) {
        console.log('error in retrieveStationDataFrom(url)'+error);
    }
}

