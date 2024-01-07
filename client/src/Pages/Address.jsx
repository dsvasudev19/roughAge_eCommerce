import React, { useEffect, useState } from "react";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Address() {
    const navigate = useNavigate();
    const [ userData, setUserData ] = useState( {
        fullName: null,
        email: null,
        phone: null,
        pincode: null,
        address: null,
        street: null,
        landmark: null,
        city: null,
        state: null,
    } );
    function handleNumChange( e ) {
        var num = e.target.value;
        if ( num.length > 10 ) {
            alert( "Number shouldn't be greater than 10 digits" );
        } else {
            setUserData( { ...userData, phone: e.target.value } );
        }
    }
    function handlePinChange( e ) {
        var pinCode = e.target.value;
        if ( pinCode.length > 6 ) {
            alert( "enter valid pincode" );
        } else {
            setUserData( { ...userData, pincode: pinCode } );
        }
    }
    const getUserData = async () => {
        Swal.fire( "hello", "", "success" )
        // var cartData = sessionStorage.getItem( 'cart' );
        // cartData = JSON.parse( cartData );
        var cartData = JSON.parse( localStorage.getItem( "cart" ) )
        const userAddressAndData = userData;
        console.log( userAddressAndData );
        const response = await fetch( "https://roughage-api.vercel.app/api/setUser", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify( { userDetails: userAddressAndData, cartData: JSON.parse( localStorage.getItem( "cart" ) ) } )
        } ).then( response => {
            console.log( response.status )
            if ( response.status === 200 ) {
                Swal.fire( "bye", "", "success" )
                navigate( '/success' )

            } else {

            }
        } )

    };
    useEffect( () => {
        Swal.fire( "Fill carefully Once submitted cannot be changed.", "", "warning" );
    }, [] );
    return (
        <div className="checkoutpage">
            <Navigationbar />
            <div className="addressheading">
                <h2>Shipping Address</h2>
            </div>
            <div className="co-form">
                <Form action="/success">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Full name"
                            value={ userData.fullName }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, fullName: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Address"
                            value={ userData.email }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, email: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Phone Number"
                            value={ userData.phone }
                            onChange={ handleNumChange }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Pincode"
                            value={ userData.pincode }
                            onChange={ handlePinChange }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Address"
                            value={ userData.address }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, address: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Street/Area/Village</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Stree/Area/Village"
                            value={ userData.street }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, street: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Landmark"
                            value={ userData.landmark }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, landmark: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Town/city</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Town/City"
                            value={ userData.city }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, city: e.target.value } );
                            } }
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="State"
                            value={ userData.state }
                            onChange={ ( e ) => {
                                setUserData( { ...userData, state: e.target.value } );
                            } }
                        />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>State</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={ ( e ) => {
                            setUserData( { ...userData, state: e.target.value } )
                        } }>
                            <option>State</option>
                            <option value="Telangana">Telangana</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={ getUserData }>
                        Proceed to Checkout
                    </Button>
                </Form>
            </div>
            <Footer />
        </div>
    )
}

export default Address;