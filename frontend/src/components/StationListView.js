import {React,useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'

export default function StationListView(data) {
    //receives list of stations through props, then displays the stations in a table
    const [stationData,setStationData] =useState([{}]);
    const stationlist = stationData.stationdata
    async function fetchData(){
      //fetch all stations from the backend since we are going to display all of the stations
      fetch(`api/stations`).then(
        response => {
          if(!response.ok){
            alert(`Network error when fetching data, please try again later. Response status: ${response.status}`)
          }else{
            return response.json();
          }
        }
      ).then(
        data => {
          console.log(data)
          if(data!==undefined){
            setStationData(data)
          }else{
            setStationData([]);
          } 
        }
      ) 
    } 
    useEffect(() => {
      fetchData("stations")
      
    }, [])

    
  return (
    <>

    <div style={{backgroundColor:"rgb(19, 19, 18)"}}>
    {(typeof stationlist ==='undefined'||stationlist.length<1) ? (
      <>empty list</> //if there is nothing to show, show a spinner
    ):( 
     <>
     <StationTable stationlist={stationlist}  />
     </>
    )}
    </div>
      
    </>
  );
}

const StationTable = (data) => {
  
  const columns = [
    { label: 'ID' },
    { label: 'Name' },
    { label: 'Address' },
    {  label: 'City' },
    {  label: 'Operator' },
    {  label: 'Capacity' },
  ];
  const stationlist = data.stationlist

  
  const [activePage, setActivePage] = useState(1)
  const rowsPerPage = 20 //amount of rows to display before slicing or filtering
  const count = stationlist.length //total amount of items (rows)
  const totalPages = Math.ceil(count / rowsPerPage) //total no. of pages in our pagination
  const calculatedList = stationlist.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage) //number of pages to show
  
  
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
        {calculatedList.map(station =>{
          return (
          <tr key={station.ID}>
            <td>
              {station.ID}
            </td>
            <td>
              {station.Name}
            </td>
            <td>
              {station.Address}
            </td>
            <td>
              {station.City}
            </td>
            <td>
              {station.Operator}
            </td>
            <td>
              {station.Capacity}
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
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;
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
        Stations: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
      </div>
     
    </>
  )
}