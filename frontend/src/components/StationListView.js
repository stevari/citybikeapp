import { React, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Pagination } from './Pagination';
import { ArrowDownUp } from "react-bootstrap-icons/"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
        console.log(data)
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
          <>empty list</> //if there is nothing to show, show a spinner
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
  const columns = [
    { label: 'Name' },
    { label: 'Address' },
    { label: 'City' },
    { label: 'Operator' },
    { label: 'Capacity' },
  ];
  const stationlist = data.stationlist


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
              return <th key={colume.label}>{colume.label} <ArrowDownUp /></th>

            })}

          </tr>
        </thead>
        <tbody>
          {calculatedList.map(station => {
            return (
              <tr key={station.ID}>
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
      {StationPopup(show, handleClose,popupStationID)} 

    </>
  )
}


function StationPopup(show, handleClose,id) { //single station view as a pop up
  //retrieves station info with given id
  const stationID = id;
  return <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size="lg"
    
  >
    <Modal.Header closeButton>
      <Modal.Title>Station popup</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      I will not close if you click outside me. Don't even try to press
      escape key.  
      My station id is {stationID}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary">Understood</Button>
    </Modal.Footer>
  </Modal>;
}
