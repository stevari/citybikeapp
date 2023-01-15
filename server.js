const needle = require("needle"); //to get data from api endpoint
const express = require('express'); //to make an express server
const csv = require("csv-parser"); //to parse csv data
require('dotenv').config();
const Journey = require('./models/journey.js');
const Station = require('./models/station.js');
const mongoose = require("mongoose");
const cors = require("cors")

const stationDataURL = `https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv`;
const sampleinputPath ="./sampledata/samplesationdata.csv"; //filepath for csv file used in testing




async function retrieveCityBikeDataFrom(year,month) {
    console.log("called retrievefunction")
    const journeysList = []; //contains journey -objects. for testing
    const dataURL = `https://infopalvelut.storage.hsldev.com/citybikes/od-trips-${year}/${year}-${month}.csv`;

    //fecthes csv data from the given URL, and then parses it to objects

    try {
       return new Promise((resolve, reject) => {
        needle
            .get(dataURL)
            .pipe(csv({
                mapHeaders: ({ header }) => header.replace(/\s|\(|\)|\./g, '') //get rid off whitespace and other stuff we don't want on headers
              }))
            .on('data', (row) => {
                if(row.Durationsec >= 10 && row.Covereddistancem > 10){ //only add journeys that meet the criteria we have determined
                    journeysList.push(row);
                }
            })
            .on("done", async (err) => {
                if (err){
                    console.log("An error has occurred");
                } 
                else{
                    await postJourneyToDatabase(journeysList[0]).then(result => resolve(result));
                     
                } 
                
                });
        
       }) 
        
    } catch (error) {
        console.log('error in retrieveCityBikeDataFrom(url)'+error);
        
    }
}

async function retrieveStationDataFrom(url) {
    const stationList = []; //contains station -objects. for testing
    //Retrieves and parses station data from url 

    try {
        return new Promise((resolve, reject) => {
        needle
        .get(url)
        .pipe(csv({
            mapValues: ({ value }) => value.replace(/\s/g, 'Helsinki') //empty fields are an indicator that the city is Helsinki, so replace empty with Helsinki
          }))
        .on('data', (row) =>{
            stationList.push(row);
        })
        .on("done", async (err) => {
            if (err){
                console.log("An error has occurred");
            } 
            else{
                await postStationToDatabase(stationList[0]).then(result => resolve(result));

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
    await journey.save().then(result => {
        console.log(result+' saved to db');
        return result;
        
    })
}
 async function postStationToDatabase(data){
    const station = new Station({
        FID: data.FID,
        ID: data.ID,
        Name: data.Name,
        Address: data.Address,
        City: data.City,
        Operator: data.Operator,
        Capacity: data.Capacity,
        x: data.x,
        y: data.y
    })
    await station.save().then(result => {
        console.log(result +' saved to db');
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
    //get journey data from specified year and month
    //front-end validates req parameters so that only data that actually exists in HSL open data, can be queried
    const year = req.params.year;
    const month = req.params.month;

    Journey.find({Departure:{$regex:`${year}-${month}*`}}).then( result => {
        if(result.length != 0){            
            res.json(result);
        }else{
           retrieveCityBikeDataFrom(year,month).then(
            () => {
                Journey.find({Departure:{$regex:`${year}-${month}*`}}).then( result => {res.json(result)})
                });
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