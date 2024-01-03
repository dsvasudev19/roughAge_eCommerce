// eslint-disable-next-line
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';
import Image from 'react-bootstrap/Image';

import { useNavigate } from 'react-router-dom';
import figure from '../roughAge_logo.png'
import Form from 'react-bootstrap/Form';

import Cookies from 'js-cookie';



function AdminNavbar() {
    const navigate = useNavigate();
    async function logOutAdmin() {

        // const token=sessionStorage.getItem("token")||"";
        var token = localStorage.getItem( "token" );

        const response = await fetch( 'https://roughage-api.vercel.app//api/auth/logoutAdmin', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( { token: token } )
        } ).then( async response => {
            const data = await response.json();
            if ( response.status === 206 ) {
                localStorage.setItem( "token", "" );
                localStorage.setItem( "Authenticated", false );
                Cookies.set( "token", "" );
                Cookies.set( "Authenticated", false );
                Cookies.set( "_url", "" )
                localStorage.setItem( "_url", "" );
                Swal.fire( data.msg, "", "success" );
                navigate( '/adminLogin' );
            } else {
                Swal.fire( data.msg, "", "question" );
            }
        } )
    }


    return (
        <>
            {/* <Navbar bg="light" data-bs-theme="light" fixed="top" className='navbar'>
                <Container>
                    <Navbar.Brand href="/" className='brand'>roughAge</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin">Home</Nav.Link>
                        <Nav.Link href="/admin/Profile">Profile</Nav.Link>
                        <Nav.Link href="/admin/Inventory">Inventory</Nav.Link>
                        <Nav.Link href="/admin/RegisterProduct">Register New Product </Nav.Link>
                        <Nav.Link > <Button onClick={logOutAdmin} >logout</Button> </Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}
            <Navbar collapseOnSelect expand="lg" style={ {
                WebkitBackdropFilter: 'blur(5px)',
                backdropFilter: 'blur(50px)'

            } } sticky='top'>
                <Container>
                    <Navbar.Brand href="/admin" className='brand'><Image width={ 60 } height={ 60 } src={ figure }></Image></Navbar.Brand>
                    <Navbar.Brand href="/admin" className='brand'>roughAge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin" id='nav-item'>Home</Nav.Link>
                            <Nav.Link href="/admin/Profile" id='nav-item'>Profile</Nav.Link>
                            <Nav.Link href="/admin/Inventory" id='nav-item'>Inventory</Nav.Link>
                            <Nav.Link href="/admin/RegisterProduct" id='nav-item'>Register New Product</Nav.Link>
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
                        <Nav>
                            <Nav.Link > <Button onClick={ logOutAdmin } >logout</Button> </Nav.Link>
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
        </>
    );
}

export default AdminNavbar;