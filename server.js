const needle = require("needle"); //to get data from api endpoint
const express = require('express'); //to make an express server
const csv = require("csv-parser"); //to parse csv data
require('dotenv').config();
const Journey = require('./models/journey.js');
const Station = require('./models/station.js');
const mongoose = require("mongoose");
const cors = require("cors")
const fs = require("fs");
const { resolve } = require("path");
const journey = require("./models/journey.js");

const stationDataURL = `https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv`;
const citybikepath= "./sampledata/" 



async function retrieveCityBikeDataFrom(path) {
    console.log("called retrievefunction with path params: "+path) //debugging
    const journeysList = []; //contains journey -objects. for testing
    return new Promise((resolve,reject) =>{
        fs.createReadStream(path) //using streams to work with large files more effecticelt
        .pipe(csv({
            mapHeaders: ({ header }) => header.replace(/\s|\(|\)|\./g, '') //get rid off whitespace and other stuff we don't want on headers
        }))
        .on("data", (data) => {
            if(data.Durationsec >= 10 && data.Covereddistancem > 10){ //only add journeys that meet the criteria we have determined
                journeysList.push(data)
            }
         })
        .on("end", () => {
        //console.log(journeysList);
        journeysList.forEach(journey => { //loop through the list of journeys and add to db
            postJourneyToDatabase(journey)
        })
        resolve(journeysList) //return the list of journeys
  });
    })
    
}

async function retrieveStationDataFrom(url) {
    const stationList = []; //contains station -objects. for testing
    //Retrieves and parses station data from url 

    try {
        return new Promise((resolve, reject) => {
        needle
        .get(url)
        .pipe(csv({
            //mapValues: ({ value }) => value.replace(/\s/g, 'Helsinki') //empty fields are an indicator that the city is Helsinki, so replace empty with Helsinki
          }))
        .on('data', async (row) =>{
            if(row.Kaupunki ==" "){ //the dataset contains unwanted empty fields so we have to manually fix them
                row.Kaupunki = "Helsinki"
                row.Stad = "Helsingfors"
                row.Operaattor ="CityBike Finland"
            }
            stationList.push(row);
            
        })
        .on("done", async (err) => {
            if (err){
                console.log("An error has occurred");
            } 
            else{
                //loop through the station list and post each one to the db
                stationList.forEach(station =>{
                    postStationToDatabase(station);
                })
                resolve(stationList); //return list of stations

            } 
            });
        })

    } catch (error) {
        console.log('error in retrieveStationDataFrom(url)'+error);
    }
}

async function postJourneyToDatabase(data){ 
    
    const journey = new Journey({
        Departure: data.Departure,
        Return: data.Return,
        Departurestationid: data.Departurestationid,
        Departurestationname: data.Departurestationname,
        Returnstationid: data.Returnstationid,
        Returnstationname: data.Returnstationname,
        Covereddistancem: data.Covereddistancem,
        Durationsec: data.Durationsec
    })
    journey.save().then(result => {
        //console.log(' saved to db');
        return result;
        
    })
}
 async function postStationToDatabase(data){
    const station = new Station({
        FID: data.FID,
        ID: data.ID,
        Name: data.Name,
        Address: data.Osoite,
        City: data.Kaupunki,
        Operator: data.Operaattor,
        Capacity: data.Kapasiteet,
        x: data.x,
        y: data.y
    })
    await station.save().then(result => {
        //console.log(result +' saved to db');
        return result;
        
    })
}
    


const PORT = process.env.PORT || "8080"; //port for the web server
const app = express(); //using express library to make the server
app.use(cors()); //allow cross origin resource sharing

app.get('/api',(req,res) => {
    res.send("<h1>Empty page</h1>");
  })

app.get('/api/journeys/:year/:month', async (req,res) => {
    //searches for journeys with the given parameters from the db. If the db doesn't have these journeys, the server will fetch them from a file and add to db
    //front-end validates req parameters (2021-05/06/07) so that only data that actually exists in HSL open data, can be queried
    const year = req.params.year;
    const month = req.params.month;

    Journey.find({"Departure":{$gte: `${year}-${month}-00 00:00:00`, $lt: `${year}-${month+1}-00 00:00:00`}}).then( result => {
        if(result.length != 0){            
            res.json(result);
        }else{
            retrieveCityBikeDataFrom(`${citybikepath}${year}-${month}-small.csv`).then(
                () => {
                    Journey.find({"Departure":{$gte: `${year}-${month}-00 00:00:00`, $lt: `${year}-${month+1}-00 00:00:00`}}).then(result => {res.json(result)})
                }
            );
            }
    });

  })

app.get('/api/stations/', async (req,res) => {
    const count = await Station.countDocuments({limit:1}); //counts document (stopping at one). 
    if(count > 0){ //if there are documents created, data is already in the db so we can retrieve it
        Station.find({}).then(result => {
            res.json(result)
        })
    }else{ //otherwise, call retrievestationdata to update our db
        console.log('no station data yet');
        retrieveStationDataFrom(stationDataURL).then(
            () => {
                Station.find({}).then(result => {res.json(result)})
            }
        );

    }
   
})


app.listen(PORT);
console.log(`Server running on port ${PORT}`);