const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
        FID: Number,
        ID: Number,
        Name: String,
        Address: String,
        City: String,
        Operator: String,
        Capacity: Number,
        x: Number,
        y: Number
})
module.exports = mongoose.model("Station",stationSchema);

/*
    Data might look like this:
    {
        FID: '431',
        ID: '380',
        Nimi: 'Pirkkolan liikuntapuisto',
        Namn: 'Britas idrottspark',
        Name: 'Pirkkolan liikuntapuisto',
        Osoite: 'Pirkkolan metsätie 6',
        Adress: 'Britas skogsväg 6',
        Kaupunki: 'Helsinki',
        Stad: 'Helsinki',
        Operaattor: 'City Bike Finland',
        Kapasiteet: '14',
        x: '24.9097508532821',
        y: '60.232734803775'
}
  
*/ 