import React from 'react'
import Button from 'react-bootstrap/Button';
import "./Home.css"

export default function Home() {
  //Landing page component
  return ( 
      <>
        <div className='hero-image'/>
        <div className='hero-text'>
          <h1 className='h1'>Helsinki Citybikes</h1>
          <p>Explore citybike journeys made in Helsinki & Espoo</p>
         </div>
         <Button variant='dark' className='btnJourney' href='journeylist'>Journey list</Button>
         <Button variant='dark' className='btnStation' href='stationlist'>Station list</Button>
         <Button variant='dark' className='btnStationMap' href='stationmap'>Map view</Button>

      </>

    
  )
}
