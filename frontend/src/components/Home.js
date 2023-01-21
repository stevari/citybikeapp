import React from 'react'
import Button from 'react-bootstrap/Button';
import "./Home.css"

export default function Home() {
  return ( //NOTE logo before h1
      <>
        <div className='hero-image'>
        
        </div>
        <div className='hero-text'>
          <h1 className='h1'>Helsinki Citybikes</h1>
          <p>Explore citybike journeys made in Helsinki & Espoo</p>
         </div>
         <Button variant='dark' className='btnJourney' href='journeylist'>Journey list</Button>
         <Button variant='dark' className='btnStation' href='stationlist'>Station list</Button>
         
         
         
      </>
      
      //hero section 2: introduce journey list view

      //hero section 3: introduce station list view

      //hero section 4: introduce station info view
    
    
  )
}
