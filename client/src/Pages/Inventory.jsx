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
        // console.log( await response.json() );
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
    // console.log( inventory );
  } );

  function EachProduct( props ) {
    function markAsSoldOut(){
      Swal.fire("Mark as sold out clicked.","","question");
    }
    function deleteProduct(){
      Swal.fire("Are you sure you want to delete product. ","","error");
    }
    async function updateDetails(){
      Swal.fire( {
        title: 'Enter multiple values',
        html:
          `<label>Product Id</label><input id="productId" class="swal2-input" placeholder="ProductID" value=${props.id}>`+
          `<label>Upd. Name</label><input id="productName" class="swal2-input" placeholder="ProductName" value=${ props.name }>` + `<label>Upd. Price</label><input id="productprice" class="swal2-input" placeholder="Price of the product" value=${ props.price }>` + `<label>Quantity</label><input id="quantity" class="swal2-input" placeholder="Quantity Update" value=${ props.quant }>` ,
          
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          // Retrieve values from the input fields
          const ProductId = document.getElementById( 'productId' ).value;
          const ProductName = document.getElementById( 'productName' ).value;
          const productPrice=document.getElementById("productprice").value;
          const quantity=document.getElementById("quantity").value;

          // Validate or process the inputs as needed
          // if ( input1 && input2 ) {
          //   Swal.fire( 'You entered: Input 1 - ' + input1 + ', Input 2 - ' + input2 );
          // } else {
          //   Swal.fire( 'Please fill in both input boxes' );
          // }
          Swal.fire( "Updated details of the product.. <br> Name: " + ProductName + "<br>Product Price : " + productPrice +"<br>Quantity:  "+quantity);
          const dataToBeUpdated={
            price:productPrice,
            quant:quantity
          }

          const response = await fetch( `https://roughage-api.vercel.app/api/admin/updateProduct/${ ProductId}`,{
            method:'put',
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify( dataToBeUpdated )
          }).then(async response=>{
            const data=await response.json();
            getAllInventoryProducts();
            // setInventory(data.products);
            if(response.status === 206){
              Swal.fire(data.msg,"","success");
            }
            else if(response.status===400){
              Swal.fire(data.msg,"","error");
            } else {
              Swal.fire( "something went wrong ", "", "error" );
            }
          })
          
        }
      } );
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
