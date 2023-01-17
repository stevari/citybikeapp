import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Navbar.css"
export default function MainNavbar() {

  return (
    <Navbar className='Navbar' variant="dark" >
      <Container>
        <Navbar.Brand href="#home"><h2>Helsinki Citybikes</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="journeylist">Journey list view</Nav.Link>
            <Nav.Link href="stationlist">Station list view</Nav.Link>
            <Nav.Link href="singlestation">Inspect station</Nav.Link>
          
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by name"
              className="me-2"
              aria-label="Search"
            />
            
            <Button variant='outline-warning' >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
