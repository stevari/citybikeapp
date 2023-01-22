import React from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet';
import "../App.css"
export default function StationMapView() {
   
  return (
    <div className='leaflet-container'>
    <MapContainer center={[60.1699, 24.9384]} zoom={13} scrollWheelZoom={true} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[60.1699, 24.9384]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
    
    
  )
}
