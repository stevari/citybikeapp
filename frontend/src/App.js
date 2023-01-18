import React, { useEffect, useState } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Navbar from "./components/MainNavbar";
import JourneyListView from "./components/JourneyListView";
import StationListView from "./components/StationListView";
import SingleStationView from "./components/SingleStationView";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App() {
  const [journeyData,setJourneyData] =useState([{}]);
  async function fetchData(params){
    //search params, e.g api/journeys/:year/:month, or api/stations
    fetch(`api/${params}`).then(
      response => {
        if(!response.ok){
          alert(`Network error when fetching data, please try again later. Response status: ${response.status}`)
        }else{
          return response.json();
        }
      }
    ).then(
      data => {
        //console.log(data.journeyData)
        if(data!==undefined){
          setJourneyData(data)
        }else{
          setJourneyData([]);
        } 
      }
    ) 
  } 
  useEffect(() => {
    fetchData("journeys/2021/05")
    
  }, [])
  
  return (
    
      <Router>
        <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/journeylist' element = {<JourneyListView props = {journeyData}/>}/>
              <Route path='/stationlist' element = {<StationListView/>}/>
              <Route path='/singlestation' element = {<SingleStationView/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    
  )
}


