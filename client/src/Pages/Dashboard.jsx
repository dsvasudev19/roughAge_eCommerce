import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLoginpage from './AdminLoginPage';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const [ token, setToken ] = useState( localStorage.getItem( "token" ) || "" );
    const [ isAuthenticated, setIsAuthenticated ] = useState( localStorage.getItem( "Authenticated" ) === 'true' )
    const navigate = useNavigate();
    const [ count, setCount ] = useState( 0 );

    setTimeout( () => {
        setCount( count + 1 );
    }, 100 );
    useEffect( () => {
        async function validateToken() {
            var token = localStorage.getItem( "token" );
            console.log( token );
            const response = await fetch( "http://localhost:3001/api/auth/validateAdminAuthenctication", {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
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
        validateToken();
        console.log( isAuthenticated );
    }, [ count ] )

    return (
        ( isAuthenticated ) ?
            <div>
                <AdminNavbar />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                Admin Page bro
            </div> : <Navigate to="/adminLogin" replace />
    );
};

export default Dashboard;