const needle = require("needle"); //to get data from api endpoint
const express = require('express'); //to make an express server
const csv = require("csv-parser"); //to parse csv data
//const fs = require("fs"); //using file system to create a readable stream of data


//const dataBaseURL = `dev.hsl.fi/citybikes/od-trips-${year}/${year}-${month}.csv`
let year = "2021";
let month ="05";

const dataURL = `https://infopalvelut.storage.hsldev.com/citybikes/od-trips-${year}/${year}-${month}.csv`

const sampleinputPath ="./sampledata/samplejourneys.csv";
const journeysList = [];
async function retrieveCityBikeDataFrom(dataURL) {
    //fecthes csv data from the given URL
    
    /*
    data looks like this:
    {
        Departure: '2021-05-31T23:05:10',
        Return: '2021-05-31T23:10:25',
        Departurestationid: '270',
        Departurestationname: 'Tulisuontie',
        Returnstationid: '262',
        Returnstationname: 'Siilitie (M)',
        Covereddistancem: '1235',
        Durationsec: '311'
      } */
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

retrieveCityBikeDataFrom(dataURL);
