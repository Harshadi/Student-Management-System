import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";
import "bootstrap";
import { NavLink } from "react-router-dom"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import './styles.css';

const Header = () => {
    return (
            <Navbar bg="light" expand="lg" sticky="top">
  <Navbar.Brand href="/" style={{fontSize: '2rem'}}>Envision Overseas</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll" >
    <Nav
   
      className="ml-auto my-2 my-lg-0"
      style={{ maxHeight: '100px', marginLeft: '50rem' }}
      navbarScroll
    >
      <NavLink className="navitem" to="/" style={{fontSize: '1.5rem', textDecoration:"none", paddingLeft: 13, color: "black"}}>Home</NavLink>
      <NavLink className="navitem" to="/signup" style={{fontSize: '1.5rem', textDecoration:"none", paddingLeft: 13, color: "black"}}>Registration</NavLink>
      <NavLink className="navitem" to="/login" style={{fontSize: '1.5rem', textDecoration:"none", paddingLeft: 13, color: "black"}}>Login</NavLink>
      <NavLink className="navitem" to="/contact" style={{fontSize: '1.5rem', textDecoration:"none", paddingLeft: 13, color: "black"}}>Contact Us</NavLink>
      {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#" disabled>
        Link
      </Nav.Link> */}
    </Nav>
 
  </Navbar.Collapse>
</Navbar>
       
    )
}

export default Header
