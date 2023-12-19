import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLoginpage from './AdminLoginPage';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const [ token, setToken ] = useState( Cookies.get( "token" ) || "" );
    const [ isAuthenticated, setIsAuthenticated ] = useState( Cookies.get( "Authenticated" ) ==='true' )
    const navigate = useNavigate();
    const location = useLocation();
    const [ count, setCount ] = useState( 0 );

    setTimeout( () => {
        setCount( count + 1 );
    }, 100 );
    useEffect( () => {
        async function validateToken() {
            var token = Cookies.get( "token" );
            console.log( token );
            const response = await fetch( "https://roughage-api.vercel.app/api/auth/validateAdminAuthenctication", {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( { token } )
            } ).then( async ( response ) => {
                if ( response.status === 205 ) {
                    Cookies.set('Authenticated',true);
                    // localStorage.setItem( "authenticated", true );
                    // sessionStorage.setItem( 'authenticated', true );
                    setIsAuthenticated( true );
                } else if ( response.status === 401 ) {
                    console.log( "failure" )
                    setIsAuthenticated( false );
                    Cookies.set('Authenticated',false);
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
                <br></br>
                Admin Page bro
            </div> : <Navigate to="/adminLogin" replace />
    );
};

export default Dashboard;