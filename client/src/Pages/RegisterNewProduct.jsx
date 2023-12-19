import React, { useEffect, useState } from "react";
import Navigationbar from "../Components/Navigationbar";
import Footer from '../Components/Footer'
import Form from "react-bootstrap/Form";
import Skeleton from "../skeleton-loading.gif";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AdminLoginpage from "./AdminLoginPage";
import AdminNavbar from "./AdminNavbar";
import Cookies from "js-cookie";


// client\public\skeleton-loading.gif
const RegisterNewProduct = () => {
  const [ base64, setBase64 ] = useState( "" );
  const [ validated, setValidated ] = useState( true );
  const [ token, setToken ] = useState( Cookies.get( "token" ) || "" );
  const [ isAuthenticated, setIsAuthenticated ] = useState( Cookies.get("Authenticated"))
  const navigate = useNavigate();
  const location = useLocation();
  const [ count, setCount ] = useState( 0 )
  const [ productData, setProductData ] = useState( {
    image: base64,
    productID: null,
    productName: null,
    price: null,
    quantityAvailable: 100,
    description: null,
    category: null,
  } );
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
          // localStorage.setItem("authenticated",true);
          // sessionStorage.setItem('authenticated',true);
          setIsAuthenticated(true);
        } else if(response.status === 401){
          console.log("failure")
          setIsAuthenticated(false);
          Cookies.set('Authenticated',false);
          // localStorage.setItem( "authenticated", false );
          // sessionStorage.setItem( 'authenticated', false );
          <AdminLoginpage/>
        }

      } )
    }
    validateToken();
    console.log(isAuthenticated);
  }, [ count ] )
  useEffect(()=>{
    console.log(isAuthenticated)
  })
  function convertToBase64( file ) {
    return new Promise( ( resolve, reject ) => {
      const reader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = () => {
        resolve( reader.result );
      };
      reader.onerror = ( error ) => {
        console.log( error );
        reject( error );
      };
    } );
  }
  // async function validateToken(){
  //   var token=sessionStorage.getItem("token");
  //   const response=await fetch("http://localhost:3001/api/auth/validateAdminAuthenctication")
  //   const result=response.json();
  //   console.log(result);
  // }
  function validateData() { }
  async function handleFileChange( e ) {
    let file = e.target.files[ 0 ];
    if ( file ) {
      await convertToBase64( file )
        .then( ( base64String ) => {
          console.log( base64String );
          setBase64( base64String );
          setProductData( { ...productData, image: base64String } );
        } )
        .catch( ( error ) => {
          console.log( error );
        } );
    }
  }
  const resetForm = () => {
    setBase64( "" );
    setProductData( "" );
  };
  async function handleSubmit( e ) {
    e.preventDefault();
    validateData();
    if ( validated ) {
      Swal.fire( {
        title: "Are you sure about the Product Details ? ",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sure",
        denyButtonText: `Not Sure`,
      } ).then( async ( result ) => {
        /* Read more about isConfirmed, isDenied below */
        if ( result.isConfirmed ) {
          await fetch( "https://roughage-api.vercel.app/api/admin/registerProduct", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify( productData ),
          } ).then( ( response ) => {
            if ( response.status === 203 ) {
              Swal.fire( "Product Saved successfully.", "", "success" );
              resetForm();
            } else {
              Swal.fire( "Compress Image and try again", "", "warning" );
            }
          } );
        } else if ( result.isDenied ) {
          Swal.fire( "Product Not saved into database ", "", "info" );
        }
      } );
    } else {
      alert( "please check the data and try again" );
    }
  }
  useEffect( () => {
    // validateToken();
  } )
  return isAuthenticated ? (
    <>
      <AdminNavbar/>
      <div className="productReg">
        <div className="productDetails">
          <Form onSubmit={ handleSubmit }>
            <Form.Group>
              <Form.Label>Insert Image of the Product</Form.Label>
              <Form.Control
                required
                type="file"
                placeholder="Image of the Product"
                onChange={ handleFileChange }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Product ID"
                //             productID: null,
                // productName: null,
                // price: null,
                value={ productData.productID || null }
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    productID: e.target.value,
                  } );
                } }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name of the Product</Form.Label>
              <Form.Control
                required="text"
                placeholder="Name of the Product"
                value={ productData.productName || null }
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    productName: e.target.value,
                  } );
                } }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Starting Price of the Product</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Starting Price of the product"
                value={ productData.price }
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    price: e.target.value,
                  } );
                } }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Available Quantity of the Products</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Total quantity of the products available"
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    quantityAvailable: e.target.value,
                  } );
                } }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Something about the product"
                value={ productData.description || null }
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    description: e.target.value,
                  } );
                } }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category of the Product</Form.Label>
              <Form.Select
                required
                onChange={ ( e ) => {
                  setProductData( {
                    ...productData,
                    category: e.target.value,
                  } );
                } }
              >
                <option>Select the Category of the product</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="warning" size="lg">
              Submit
            </Button>
          </Form>
        </div>
        <div className="imagePreview">
          <img src={ base64 || Skeleton } alt="" />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/adminLogin" replace />
  );
};

export default RegisterNewProduct;
