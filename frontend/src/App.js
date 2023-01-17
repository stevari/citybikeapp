import React from 'react'
import "./App.css"
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import JourneyListView from "./components/JourneyListView";
import StationListView from "./components/StationListView";
import SingleStationView from "./components/SingleStationView";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App() {
  return (
    
      <Router>
        <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/journeylist' element = {<JourneyListView/>}/>
              <Route path='/stationlist' element = {<StationListView/>}/>
              <Route path='/singlestation' element = {<SingleStationView/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    
  )
}


