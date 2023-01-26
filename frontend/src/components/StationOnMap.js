import React from 'react'
import { MapContainer, TileLayer,Marker} from 'react-leaflet';
import "../App.css"
export default function StationOnMap(props) {
    //displays a map with the station location as a marker
    //this component is only used within the StationListView component. Idea is to present a single station view
    const station = props.station

  return (
    <div className='leaflet-container-small'>
        <MapContainer  center={[station.y, station.x]} zoom={20} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
            <Marker 
                key ={station.ID} 
                position = {[station.y,station.x]}>

            </Marker>
        </MapContainer>
    </div>
  )
}
