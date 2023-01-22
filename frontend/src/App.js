import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Navbar from "./components/MainNavbar";
import JourneyListView from "./components/JourneyListView";
import StationListView from "./components/StationListView";
import StationMapView from "./components/StationMapView";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App() {
  
  return (
    
      <Router>
        <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/journeylist' element = {<JourneyListView />}/>
              <Route path='/stationlist' element = {<StationListView />}/>
              <Route path='/stationmap' element = {<StationMapView/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    
  )
}


