import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLoginpage from './AdminLoginPage';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import './ProfileCss.css'
import '../index.css'
import { jwtDecode } from "jwt-decode";
import Footer from '../Components/Footer';
const Profile = () => {
    const [ adminDetails, setAdminDetails ] = useState( {
        email: null,
        employeId: null,
        designation: null,
        phone: null,
        name: null,
        image: ""
    } );
    const [ token, setToken ] = useState( localStorage.getItem( "token" ) || "" );
    const [ isAuthenticated, setIsAuthenticated ] = useState( localStorage.getItem( "Authenticated" ) === 'true' )

    const navigate = useNavigate();
    const [ count, setCount ] = useState( 0 );

    setTimeout( () => {
        setCount( count + 1 );
    }, 10000 );

    async function fetchData() {
        const ad = jwtDecode( localStorage.getItem( "token" ) )
        console.log( ad );
        setAdminDetails( ad );
        adminDetails.image = localStorage.getItem( "_url" );
    }

    async function validateToken() {
        var token = localStorage.getItem( "token" );
        console.log( token );
        const response = await fetch( "https://roughage-api.vercel.app/api/auth/validateAdminAuthenctication", {
            method: 'post',
            headers: {

                'content-type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify( token )
        } ).then( async ( response ) => {
            if ( response.status === 205 ) {
                localStorage.setItem( 'Authenticated', true );
                // localStorage.setItem("authenticated",true);
                // sessionStorage.setItem('authenticated',true);
                setIsAuthenticated( true );
            } else if ( response.status === 401 ) {
                console.log( response );
                console.log( await response.json() );
                console.log( "failure" )
                setIsAuthenticated( false );
                localStorage.setItem( 'Authenticated', false );
                // localStorage.setItem( "authenticated", false );
                // sessionStorage.setItem( 'authenticated', false );
                // <AdminLoginpage />
                navigate( "/adminLogin" );

            }

        } )
    }
    useEffect( () => {
        validateToken();
    }, [ count ] )
    useEffect( () => {

        console.log( isAuthenticated );
        fetchData();
    }, [ isAuthenticated ] )

    return (
        ( isAuthenticated ) ?
            <div>
                <AdminNavbar />
                {/* <img src={localStorage.getItem("_url")} alt='image' id='profilePic' /> */ }
                <div className="productReg">
                    <div className="productDetails">
                        <Form>
                            <Form.Group>
                                <Form.Label>EmployeId ID</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product ID"
                                    //             productID: null,
                                    // productName: null,
                                    // price: null,
                                    value={ adminDetails.employeId || null }
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required="text"
                                    placeholder="Name"
                                    value={ adminDetails.name || null }
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={ adminDetails.email }
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    required
                                    type="mobile"
                                    placeholder="Phone"
                                    value={ adminDetails.phone }
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Desgination of the Employee"
                                    value={ adminDetails.designation }
                                ></Form.Control>
                            </Form.Group>

                        </Form>
                    </div>
                    <div className="imagePreview">
                        <img src={ localStorage.getItem( "_url" ) } alt='image' id='profilePic' />
                    </div>
                </div>
                <Footer />

            </div> : <Navigate to="/adminLogin" replace />
    );
};

export default Profile;