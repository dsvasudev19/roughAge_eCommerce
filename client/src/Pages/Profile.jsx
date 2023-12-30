import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLoginpage from './AdminLoginPage';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const Profile = () => {
    const [ adminData, setAdminData ] = useState( null );
    const [ token, setToken ] = useState( Cookies.get( "token" ) || "" );
    const [ isAuthenticated, setIsAuthenticated ] = useState( Cookies.get( "Authenticated" ) === 'true' )
    const navigate = useNavigate();
    const location = useLocation();
    const [ count, setCount ] = useState( 0 );

    setTimeout( () => {
        setCount( count + 1 );
    }, 100 );
    useEffect( () => {
        async function validateToken() {
            var token = Cookies.get( "token" );
            const response = await fetch( "http://localhost:3001/api/auth/validateAdminAuthenctication", {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${ token }`
                }, 
                body: JSON.stringify( token )
            } ).then( async ( response ) => {
                if ( response.status === 205 ) {
                    

                    Cookies.set( 'Authenticated', true );


                    setIsAuthenticated( true );
                    
                } else if ( response.status === 401 ) {
                    console.log( "failure" )
                    setIsAuthenticated( false );
                    Cookies.set( 'Authenticated', false );
                    localStorage.setItem( "authenticated", false );
                    sessionStorage.setItem( 'authenticated', false );
                    <AdminLoginpage />
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
                {/* {adminData.adminId + adminData.email} */ }
                <br></br>

            </div> : <Navigate to="/adminLogin" replace />
    );
};

export default Profile;