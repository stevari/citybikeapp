import {React,useState,useEffect} from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet';
import "../App.css"


export default function StationMapView() {
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
        //console.log(data)
        if (data !== undefined) {
          setStationData(data)
        } else {
          setStationData([]);
        }
      }
    )
  }
  useEffect(() => {
    fetchData()

  }, [])
  return (
    <div className='leaflet-container'>
    <MapContainer center={[60.1699, 24.9384]} zoom={13} scrollWheelZoom={true} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
      {stationlist ? <Marker key={stationlist[0].ID} position = {[stationlist[0].y, stationlist[0].x]}/> : <></>}
  </MapContainer>
    </div>
    
    
  )
}

    
  
   

