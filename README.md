# citybikeapp

This as a pre-assignment for Solita Dev Academy Finland 2023.  
The goal is to create a UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area.    
STATUS: In development as of 25.01.2023  
Link to the application: https://helcitybikeapp.fly.dev/  
  
I will be using open data from Helsinki public transport (HSL).  
    
Project structure (short):  
-Backend will be developed using the Express library  
-Frontend will be served as an React application  
-Data will be stored and retrieved from a MongoDB database  
  
Project structure (long):  
    
Backend  
-server.js is the server component of this app. In a nutshell, server's responsibility is to serve the front-end application, retrieve and serve station & journey data and lastly: handle database interaction.  
Front end can fetch monthly journey data from the server (e.g journeys from 2021/05). For optimization purposes journey data can only be fetched from a specific month, since the data sets are so huge. 
  
Database  
This project uses a MongoDB database. All data are validated either in the server's post functions (only when adding station data), or directly in the collection options. I have configured the collection validation parameters for journey data in such way that only valid journeys get added to the collection. This means journeys that are longer than 10 meters and last longer than 10mins.  
  
Frontend  
Frontend application uses Routes to split the components in to separate "pages". The application has four main pages: Home, Stationlist view, Journeylist view and Station map.  
Frontend fetches data from the server (with specific parameters), which in turn fethches it from the db.  
The main pages have a pretty self-explanatory purpose which you can propably tell by from their names.  
However, I do want to note that stationlist view is sligthly more advanced than journeylist view, since 
stationlist view allows users to open a pop up of information from a station they wish to examine more in depth.
