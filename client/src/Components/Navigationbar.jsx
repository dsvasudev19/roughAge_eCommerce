// eslint-disable-next-line
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

import figure from '../roughAge_logo.png'

function Navigationbar() {
  const [ cartLength, setCartLength ] = useState( 0 );
  useEffect( () => {
    const fetchLength = async () => {
      try {
        const data = await fetch( 'http://localhost:3001/api/getCart' )
        const parsedData = await data.json();
        const totalCount = parsedData.reduce( ( acc, curr ) => {
          return acc + curr.count;
        }, 0 );

        setCartLength( totalCount );

      } catch ( error ) {
        console.error( "error occured" );
      }
    }
    fetchLength();
  }, [] )
  // className = "bg-body-tertiary"
  return (
    <Navbar collapseOnSelect expand="lg" style={ {
      WebkitBackdropFilter: 'blur(5px)',
      backdropFilter: 'blur(50px)'

    } } sticky='top'>
      <Container>
        <Navbar.Brand href="/" className='brand'><Image width={ 60 } height={ 60 } src={ figure }></Image></Navbar.Brand>
        <Navbar.Brand href="/" className='brand'>roughAge</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" id='nav-item'>Home</Nav.Link>
            <Nav.Link href="/about" id='nav-item'>About</Nav.Link>
            <Nav.Link href="/contact" id='nav-item'>Contact</Nav.Link>
            <Nav.Link href="/Cart" id='nav-item'>Cart</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          {/* <Nav>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  //   <>

  //     <Navbar key={ false } expand="lg" sticky="top" className="mb-3" style={{
  //         WebkitBackdropFilter:'blur(5px)',
  //         backdropFilter:'blur(50px)'
  //         // backgroundColor:''
  //       }}>
  //         <Container fluid>

  //           {/* <Navbar.Brand href="/" className='brand'><Image width={ 80 } height={ 80 } xs={ 6 } src={ figure }></Image></Navbar.Brand>
  //         <Navbar.Brand href="/" style={ {
  //           fontSize: '50px',
  //           fontFamily: 'cursive',
  //           fontWeight: '700',
  //           backgroundImage: 'linear-gradient(#E43D00, #FFE900)',
  //           color: 'transparent',
  //           backgroundClip: 'text'
  //         } }>roughAge</Navbar.Brand> */}
  //         <Navbar.Toggle aria-controls={ `offcanvasNavbar-expand-${ false }` } />
  //           <Navbar.Offcanvas
  //           id={ `offcanvasNavbar-expand-${ false }` }
  //           aria-labelledby={ `offcanvasNavbarLabel-expand-${ false }` }
  //             placement="end"
  //           >
  //             <Offcanvas.Header closeButton>
  //             <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${ false }` }>
  //                 Offcanvas
  //               </Offcanvas.Title>
  //             </Offcanvas.Header>
  //             <Offcanvas.Body>
  //               <Nav className="justify-content-end flex-grow-1 pe-3">
  //                 <Nav.Link href="/">Home</Nav.Link>
  //               <Nav.Link href="/about">About</Nav.Link>
  //               <Nav.Link href="/contact">Contact</Nav.Link>
  //               <Nav.Link href="/Cart">Cart</Nav.Link>
  //               </Nav>
  //               <Form className="d-flex">
  //                 <Form.Control
  //                   type="search"
  //                   placeholder="Search"
  //                   className="me-2"
  //                   aria-label="Search"
  //                 />
  //                 <Button variant="outline-success">Search</Button>
  //               </Form>
  //             </Offcanvas.Body>
  //           </Navbar.Offcanvas>
  //         </Container>
  //       </Navbar>

  //   </>
  // );
}

export default Navigationbar;