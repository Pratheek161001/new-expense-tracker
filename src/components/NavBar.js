import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button';
import ThemeToggle from './ThemeToggle';


function Navbartop() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MY.Cost-Track</Navbar.Brand>
        <ThemeToggle/>
        <Button variant="outline-danger" onClick={()=>{navigate('/')}}>logout</Button>
      </Container>
    </Navbar>
  );
}


export default Navbartop;