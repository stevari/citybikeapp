import React from 'react'
import Button from 'react-bootstrap/Button';
import "./Home.css"


export default function Home() {
  //Landing page component
  return ( 
      <>
        <div className='hero-image'/>
        <div className='hero-text'>
          <h1 className='h1'>Helsinki <span style={{color:'orange'}}>Citybikes</span></h1>
          <p>Explore citybike journeys made in Helsinki & Espoo</p>
         </div>
         <div className='button-container'>
          <Button variant='dark' className='btn' href='journeylist'>Journey list</Button>
          <Button variant='dark' className='btn' href='stationlist'>Station list</Button>
          <Button variant='dark' className='btn' href='stationmap'>Map view</Button>
         </div>
         

      </>

    
  )
}
