import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
import "./Navbar.css"
import {Bicycle} from "react-bootstrap-icons"
export default function MainNavbar() {

  return (
    <Navbar className='Navbar' variant="dark" >
      <Container>
        <Navbar.Brand href="/">
          <h2>Helsinki Citybikes
          <Bicycle size={40} color ={"orange"} style={{marginLeft:"2%"}}/>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
        <Nav className="Nav" >
            <Nav.Link href="/" className='navlink'>Home</Nav.Link>
            <Nav.Link href="singlestation" className='navlink'>Inspect station</Nav.Link>
            <Nav.Link href="journeylist" className='navlink'>Journey list</Nav.Link>
            <Nav.Link href="stationlist" className='navlink'>Station list</Nav.Link>
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
