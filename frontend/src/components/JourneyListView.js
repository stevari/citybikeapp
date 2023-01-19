import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'


export default function JourneyListView(data) {
  //this component accepts journey data as props to display journeys in a table
  //displays departure and return stations, covered distance in kilometers and duration in minutes
  const journeylist = data.props.journeyData

  //console.log('journeylist '+journeylist);
  

  return (
    <>

       <div style={{backgroundColor:"rgb(19, 19, 18)"}}>
    {(typeof journeylist ==='undefined'||journeylist.length<1) ? (
      <>empty list</> //if there is nothing to show, show a spinner
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
  const columns = [
    { label: 'Departure' },
    { label: 'Return' },
    { label: 'Distance (km)' },
    {  label: 'Duration (min)' }
  ];
  const journeylist = data.journeylist
  const [activePage, setActivePage] = useState(1)
  const rowsPerPage = 20 //amount of rows to display before slicing or filtering
  const count = journeylist.length //total amount of items (rows)
  const totalPages = Math.ceil(count / rowsPerPage) //total no. of pages in our pagination
  const calculatedList = journeylist.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage) //number of pages to show
  
  
  return (
    <>
      <Table striped bordered hover size="sm" variant='dark'>
      <thead>
        <tr>
          {columns.map(colume =>{
            return <th key={colume.label}>{colume.label}</th>
            
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
              {(journey.Covereddistancem/1000).toFixed(1)}
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
const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  const pStyle = {
    "color":"orange",
    "padding":"1",
    "margin":"1"
  }
  return (
    <>
      <div className="pagination">
        <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
           First
        </button>
        <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
           Previous
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
          Next 
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
          Last 
        </button>
      </div>
      <div>
      <p style={pStyle}>
        Page {activePage} of {totalPages}
      </p>
      <p style={pStyle}>
        Journeys: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
      </div>
     
    </>
  )
}