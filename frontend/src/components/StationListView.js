import { React, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Pagination } from './Pagination';
import { ArrowDownUp } from "react-bootstrap-icons/"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpinnerLoading from './SpinnerLoading';
import StationOnMap from './StationOnMap';
import "./Modal.css"
export default function StationListView() {
  //receives list of stations through props, then displays the stations in a table
  const [stationData, setStationData] = useState([{}]);
  const stationlist = stationData.stationdata
  async function fetchData() {
    //fetch all stations from the backend since we are going to display all of the stations
    fetch(`api/stations`).then(
      response => {
        if (!response.ok) {
          alert(`Network error when fetching data, please try again later. Response status: ${response.status}`)
        } else {
          return response.json();
        }
      }
    ).then(
      data => {
        if (data !== undefined) {
          setStationData(data)
        } else {
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

      <div style={{ backgroundColor: "rgb(19, 19, 18)" }}>
        {(typeof stationlist === 'undefined' || stationlist.length < 1) ? (
          <><SpinnerLoading/></> //if there is nothing to show, show a spinner
        ) : (
          <>
            <StationTable stationlist={stationlist} />
          </>
        )}
      </div>

    </>
  );
}

const StationTable = (data) => {
  const [stationlist,setStationlist] = useState(data.stationlist);
  const [sort,setSort] = useState([]);
  const columns = [
    { label: 'Name' },
    { label: 'Address' },
    { label: 'City' },
    { label: 'Capacity' },
  ];

  const handleSortBtnClick =(label) =>{
    //sorts list when clicked
    const newList = [...stationlist];
    if(sort.includes(label)){ //if the sort has been clicked already, we want to reverse the sort
      setStationlist(newList.reverse());
    }else{
      setStationlist(newList.sort((a,b) => (a[label] > b[label]) ? 1:-1)); //else, just sort the list using the label as object key, e.g Name
      setSort(sort.concat(label)) 
    }
    
    
    
  }
  const [activePage, setActivePage] = useState(1)
  const rowsPerPage = 20 //amount of rows to display before slicing or filtering
  const count = stationlist.length //total amount of items (rows)
  const totalPages = Math.ceil(count / rowsPerPage) //total no. of pages in our pagination
  const calculatedList = stationlist.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage) //number of pages to show

  //modal variables
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [popupStationID,setpopupStationID] = useState(null);

  //modal variables
  const handleClick = (id) => {
    setpopupStationID(id);
    handleShow(); //show to modal
  }
  return (
    <>
      <Table striped bordered hover size="sm" variant='dark'>
        <thead>
          <tr>
            {columns.map(colume => {
              return <th key={colume.label}>{colume.label}
               <button onClick={()=>handleSortBtnClick(colume.label)}>
                <ArrowDownUp/>
                </button>
                </th>

            })}

          </tr>
        </thead>
        <tbody>
          {calculatedList.map(station => {
            return (
              <tr key={station._id}>
                <td>
                  <button onClick={() => handleClick(station.ID)}>
                    {station.Name}
                  </button>
                </td>
                <td>
                  {station.Address}
                </td>
                <td>
                  {station.City}
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
      {show ? StationPopup(show, handleClose,popupStationID,stationlist):<></>} 

    </>
  )
}


function StationPopup(show, handleClose,id,stationlist) { //single station view as a pop up
  //retrieves station info with given id
  
  const getStationInfo = () =>{
    if(stationlist !== undefined && id !== undefined){
      return (stationlist.find(station => station.ID === id));
      
    }
    return Object;
  }

  const station = getStationInfo();
  
  
  return <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size="lg"

  >
    <div className='dark_modal'>
		<Modal.Header closeButton>
			<Modal.Title><h3 className='h3'>{station.Name}</h3></Modal.Title>
		</Modal.Header>
		<Modal.Body className='dark_modal'>
			<div className='p'>
				<p>
					Name: <span className='span'>{station.Name}</span>
				</p>
				<br/>
				<p>
					City: <span className='span'>{station.City}</span>
				</p>
				<br/>
				<p>
					Address: <span className='span'>{station.Address}</span>
				</p>
				<br/>
				<p>
					Operator: <span className='span'>{station.Operator} </span>
				</p>
				<br/>
	
				<br/>
					<StationOnMap station ={station}/> 
			</div>
		
		</Modal.Body>
			<Modal.Footer>
				<Button variant="warning" style={{color:"black"}} onClick={handleClose}>
				Close
				</Button>
				
			</Modal.Footer>
		</div>
		
	</Modal>;
}
