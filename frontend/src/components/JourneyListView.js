import React, { useState,useEffect } from 'react';
import { Pagination } from './Pagination';
import Table from 'react-bootstrap/Table'
import {ArrowDownUp} from "react-bootstrap-icons/"
import SpinnerLoading from './SpinnerLoading';


import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function JourneyListView() {
  //this component accepts journey data as props to display journeys in a table
  //displays departure and return stations, covered distance in kilometers and duration in minutes
  const [fetchParams,setFetchParams] = useState("2021/05") //default fetch is for data from May 2021
  const [journeyData,setJourneyData] =useState([{}]);
  const [loading,setLoading] = useState(true);
  const journeylist = journeyData.journeyData

  const callback = payload => { //callback function to retrieve data from child component
    setFetchParams(payload);
  }

  async function fetchData(params){
    //params = e.g 2021/05

    fetch(`api/journeys/${params}`).then(
      response => {
        if(!response.ok){
          alert(`Network error when fetching data, please try again later. Response status: ${response.status}`)
        }else{
          return response.json();
        }
      }
    ).then(
      data => {
        //console.log(data)
        if(data!==undefined){
          setJourneyData(data)
          setLoading(false) //data fethced
        }else{
          setJourneyData([]);
        } 
      }
    ) 
  } 
  useEffect(() => {
    fetchData(fetchParams)
    setLoading(true) //app is loading while fetching is in progress
  }, [fetchParams])

  

  return (
    <>
    <div style={{backgroundColor:"rgb(19, 19, 18)"}}>
      <Actionbar callback = {callback}/>
      {loading ? (
      <><SpinnerLoading/></> //if there is nothing to show, show a spinner
        ):( //if there is data, display journeys
        <>
          <JourneyTable journeylist={journeylist}  />
        </>
        )}
    </div>
      
    </>
  );
}

const JourneyTable = (data) => {
  //For each journey show departure and return stations, covered distance in kilometers and duration in minutes
  const [journeylist,setJourneylist] = useState([]);

  useEffect(() => { //update the journeylist when data given as props changes. This gets called at mount, and when user selects a different month from the action bar
      setJourneylist(data.journeylist)
  }, [data])
  

  const [sort,setSort] = useState("Departurestationname");

  const columns = [
    { label: 'Departure',sortName:'Departurestationname' },
    { label: 'Return',sortName:'Returnstationname' },
    { label: 'Distance (km)',sortName:'Covereddistancem' }, //sortName = object actual values used in sorting 
    {  label: 'Duration (min)',sortName:'Durationsec' }
  ];

  const [activePage, setActivePage] = useState(1)
  const rowsPerPage = 20 //amount of rows to display before slicing or filtering
  const count = journeylist.length //total amount of items (rows)
  const totalPages = Math.ceil(count / rowsPerPage) //total no. of pages in our pagination
  const calculatedList = journeylist.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage) //number of pages to show
  
  const handleSortBtnClick =(label) =>{
    //sorts list when clicked
    //console.log("handleSort called");
    const newList = [...journeylist];
    if(sort===label){ //if the sort has been clicked already, we want to reverse the sort
      setJourneylist(newList.reverse());
    }else{
      setJourneylist(newList.sort((a,b) => (a[label] > b[label]) ? 1:-1)); //else, just sort the list using the label as object key, e.g Name
      setSort(label) 
    }
    
  }
  
  return (
    <>
      <Table striped bordered hover size="sm" variant='dark'>
      <thead>
        <tr>
          {columns.map(colume =>{
            return <th key={colume.label}>{colume.label}
            <button onClick={()=>handleSortBtnClick(colume.sortName)}>
             <ArrowDownUp/>
             </button>
             </th>
            
          })}
         
        </tr>
      </thead>
      <tbody>
        {calculatedList.map(journey =>{
          return (
          <tr key={journey._id}>
            <td>
              {journey.Departurestationname}
            </td>
            <td>
              {journey.Returnstationname}
            </td>
            <td>
              {(journey.Covereddistancem/1000).toFixed(2)}
            </td>
            <td>
              {(journey.Durationsec/60).toFixed(0)}
            </td>
          </tr>
          )
        })}
      </tbody>
      </Table>
      <Pagination
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </>
  )
  
}
const Actionbar = ({callback}) =>{
  const [newFetchParams,setNewFetchParams] = useState("2021/05");
  const handleCallback = (value) => { //delivers period option to the parent component 
    callback(value)
    setNewFetchParams(value) 
  }; 
  
  useEffect(() => {
    handleCallback(newFetchParams); //triggers callback function every time user switches periods
 },[newFetchParams]);

  const periods = {
  "2021/05":"May, 2021",
  "2021/06":"June, 2021",
  "2021/07":"July, 2021"
  }
  const period = periods[newFetchParams];
  return(
    <Navbar bg="dark" expand="lg" variant ="dark">
      <Container fluid>
        <Navbar.Brand >Journeys from: <span style={{color:"orange"}}>{period}</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            <NavDropdown title="Select month" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>{handleCallback("2021/05")}}>May</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{handleCallback("2021/06")}}>June</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{handleCallback("2021/07")}}>July</NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}