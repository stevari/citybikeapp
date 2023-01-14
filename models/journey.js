const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const journeySchema = new mongoose.Schema({
        Departure: String,
        Return: String,
        Departurestationid: Number,
        Departurestationname: String,
        Returnstationid: Number,
        Returnstationname: String,
        Covereddistancem: Number,
        Durationsec: Number
})

module.exports = mongoose.model("Journey",journeySchema);
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