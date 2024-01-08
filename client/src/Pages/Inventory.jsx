import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import AdminLoginpage from "./AdminLoginPage";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./InventCss.css";

const Inventory = () => {
  const [ inventory, setInventory ] = useState( [] );
  const [loaded,setLoaded]=useState(false);

  const [ isAuthenticated, setIsAuthenticated ] = useState(
    localStorage.getItem( "Authenticated" ) == "true"
  );

  const navigate = useNavigate();
  const [ count, setCount ] = useState( 0 );

  setTimeout( () => {
    setCount( count + 1 );
  }, 10000 );

  async function validateToken() {
    var token = localStorage.getItem( "token" );
    // console.log( token );
    const response = await fetch(
      "https://roughage-api.vercel.app/api/auth/validateAdminAuthenctication",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
        body: JSON.stringify( token ),
      }
    ).then( async ( response ) => {
      if ( response.status === 205 ) {
        localStorage.setItem( "Authenticated", true );
        // localStorage.setItem("authenticated",true);
        // sessionStorage.setItem('authenticated',true);
        setIsAuthenticated( true );
      } else if ( response.status === 401 ) {
        // console.log( response );
        console.log( await response.json() );
        console.log( "failure" );
        setIsAuthenticated( false );
        localStorage.setItem( "Authenticated", false );
        // localStorage.setItem( "authenticated", false );
        // sessionStorage.setItem( 'authenticated', false );
        // <AdminLoginpage />
        navigate( "/adminLogin" );
      }
    } );
  }
  useEffect( () => {
    validateToken();
  }, [ count ] );

  async function getAllInventoryProducts() {
    const response = await fetch(
      "https://roughage-api.vercel.app/api/getAllInventoryProducts"
    ).then( async ( response ) => {
      const data = await response.json();
      if ( response.status === 200 ) {
        setInventory( data );
        setLoaded(true);
        // Swal.fire("Successfully Fetched the Inventory.", "", "success");
      } else {
        Swal.fire( "Something Went Wrong" );
      }
    } );
  }
  useEffect( () => {
    getAllInventoryProducts();
  }, [ isAuthenticated ] );
  useEffect( () => {
    console.log( inventory );
  } );

  function EachProduct( props ) {
    function markAsSoldOut(){
      Swal.fire("Mark as sold out clicked.","","question");
    }
    function deleteProduct(){
      Swal.fire("Are you sure you want to delete product. ","","error");
    }
    function updateDetails(){
      Swal.fire("What do you want to update","","question");
    }
    return (
      <>
        <div className="inventProduct">
          <div className="inventProductImage">
            <img src={ props.img } alt="image" id="inventProImage" />
          </div>
          <div className="inventProductDetails">
            <h4>Product ID: { props.id }</h4>
            <h4>Product: { props.name }</h4>
            <h4>Price: { props.price }</h4>
            <h4>Quantity Available: { props.quant }</h4>
            <button onClick={updateDetails}>Update Details</button>{ '    ' }<button onClick={deleteProduct}>Delete Product</button> <br></br>
            <br></br>
            <button onClick={markAsSoldOut}>Mark as Sold Out</button>
          </div>
        </div>
      </>
    );
  }

  return isAuthenticated ? (
    <div>
      <AdminNavbar />
      <div>
        <div className="inventoryMain">
          <h1>Inventory</h1>
          {loaded ? inventory.map( ( eachInventory ) => (
            <div key={ eachInventory.productID }>
              <EachProduct
                img={ eachInventory.image }
                name={ eachInventory.productName }
                id={ eachInventory.productID }
                price={ eachInventory.price }
                quant={ eachInventory.quantityAvailable }
              />
              <br></br>
            </div>
          ) ) : <h2>Loading....... please wait..</h2>}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/adminLogin" replace />
  );
};

export default Inventory;
