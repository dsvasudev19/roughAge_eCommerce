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
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';



function AdminNavbar() {
    const navigate=useNavigate();
    async function logOutAdmin(){
        
        // const token=sessionStorage.getItem("token")||"";
        var token=Cookies.get('token') || "";
        const response=await fetch('http://localhost:3001/api/auth/logoutAdmin',{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({token})
        }).then(async response=>{
            const parsedData=response.json();
            if(response.status === 206){
                Cookies.set('Authenticated',false)
                // localStorage.setItem("authenticated",false);
                // sessionStorage.setItem("token","");
                Cookies.set('token',"");
                // sessionStorage.setItem("authenticated",false);
                Swal.fire("Successfully Logged Out","","success");
                navigate("/admin",{replace:true});
            }else{
                Swal.fire(parsedData.msg,"","question");
            }
        })
    }
    

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" fixed="top" className='navbar'>
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
            </Navbar>
        </>
    );
}

export default AdminNavbar;