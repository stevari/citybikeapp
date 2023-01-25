import React, { useState,useEffect } from 'react';
import { Pagination } from './Pagination';
import Table from 'react-bootstrap/Table'
import {ArrowDownUp} from "react-bootstrap-icons/"
import SpinnerLoading from './SpinnerLoading';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function JourneyListView() {
  //this component accepts journey data as props to display journeys in a table
  //displays departure and return stations, covered distance in kilometers and duration in minutes
  const [fetchParams,setFetchParams] = useState("2021/05") //default fetch is for data from May 2021
  const [journeyData,setJourneyData] =useState([{}]);
  const journeylist = journeyData.journeyData

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
        }else{
          setJourneyData([]);
        } 
      }
    ) 
  } 
  useEffect(() => {
    fetchData(fetchParams)
    
  }, [])

  

  return (
    <>
    <div style={{backgroundColor:"rgb(19, 19, 18)"}}>
      <Actionbar/>
      {(typeof journeylist ==='undefined'||journeylist.length<1) ? (
      <><SpinnerLoading/></> //if there is nothing to show, show a spinner
        ):( //display journey
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
  const [journeylist,setJourneylist] = useState(data.journeylist);
  const [sort,setSort] = useState([]);
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
    if(sort.includes(label)){ //if the sort has been clicked already, we want to reverse the sort
      setJourneylist(newList.reverse());
    }else{
      setJourneylist(newList.sort((a,b) => (a[label] > b[label]) ? 1:-1)); //else, just sort the list using the label as object key, e.g Name
      setSort(sort.concat(label)) 
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
const Actionbar = () =>{
  return(
    <Navbar bg="dark" expand="lg" variant ="dark">
      <Container fluid>
        <Navbar.Brand >Journeys from: <span style={{color:"orange"}}>May, 2021</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            <NavDropdown title="Select month" id="navbarScrollingDropdown">
              <NavDropdown.Item >May</NavDropdown.Item>
              <NavDropdown.Item >June</NavDropdown.Item>
              <NavDropdown.Item >July</NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}