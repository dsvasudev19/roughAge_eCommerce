import React, { useEffect, useState } from "react";
import products from "../products";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import './Card.css'

import { NavLink } from "react-router-dom";
import "../index.css";


async function handleEvent( e ) {
  e.preventDefault();
  const productDetails = {
    productID: e.target.value,
  };

  const response = await fetch( "https://roughage-api.vercel.app/api/addToCart", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify( productDetails ),
  } ).then( ( response ) => {
    if ( response.status === 201 ) {
      // Swal.fire( {
      //   width: 500,
      //   height: 100,
      //   icon: "success",
      //   title: "Product is Added to the Cart",
      //   showConfirmButton: true,
      //   timer: 990,
      // } );
      Swal.fire( "Product is Added to the Cart", "", "success" );
    }
  } );
}

function Product( props ) {
  const [ buttonContent, setButtonContent ] = useState( 'Quick Add' );
  function showFullContent( e ) {

    setButtonContent( "Quick Add" )
  }
  function showLessContent( e ) {
    setButtonContent( "+" );

  }
  return (
    <>
      <NavLink
        to={ `/product/${ props.id }` }
        className="col col-lg-3  col-md-6  col-sm-6 col-xs-6"
        style={ { textDecoration: 'none' } }
      >
        <div className="cardS">
          <div className="cardI">
            <img src={ props.img } alt={ props.productName } id="productImage" />
          </div>
          <div className="cardB">
            <div className="cartT">
              <text id="name">{ props.productName }</text>
            </div>
            <div className="cardText">
              <text id="price">Starting Price @ { props.cost }</text>
            </div>
            <div className="cardButtonClass">
              <Button
                // onMouseOver={ ( e ) => showFullContent( e ) }
                // onMouseOut={ ( e ) => showLessContent( e ) }
                name={ props.productName }
                variant="success"
                value={ props.id }
                className="addToCartButton"
                id="addToCartButton"
                onClick={ ( e ) => {
                  handleEvent( e );
                } }
              >
                { buttonContent }
              </Button>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}


function ProductList() {
  const [ loaded, setLoaded ] = useState( false );
  const [ productsAvailable, setProductsAvailable ] = useState( [] );
  // useEffect(() => {
  //   axios
  //     .get("https://roughage-api.vercel.app/api/getProducts")
  //     .then((productsRecieved) => {
  //       if (productsRecieved.status === 200) {
  //         // Swal.fire( "Sucessfully loaded all the products", "", "success" );
  //         setProductsAvailable(productsRecieved.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect( async () => {
    const response = await fetch( "https://roughage-api.vercel.app/api/getProducts" )
      .then( async response => {
        if ( response.status === 200 ) {
          const data = await response.json();
          // console.log( data );
          setProductsAvailable( data );
          setLoaded( true );
        }
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] )
  const productList = products.map( ( product ) => (
    <Product
      key={ product.id }
      id={ product.id }
      productName={ product.name }
      cost={ product.cost }
      img={ product.img }
    />
  ) );
  const producedProducts = productsAvailable.map( ( producedProduct ) => (
    <Product
      key={ producedProduct.productID }
      id={ producedProduct.productID }
      productName={ producedProduct.productName }
      cost={ producedProduct.price }
      img={ producedProduct.image }
      description={ producedProduct.description }
    />
  ) );
  return (
    <div className="row allProducts">
      { loaded ? productsAvailable.map( ( prouctAvailable ) => (
        <Product
          key={ prouctAvailable.productID }
          id={ prouctAvailable.productID }
          productName={ prouctAvailable.productName }
          cost={ prouctAvailable.price }
          img={ prouctAvailable.image }
          description={ prouctAvailable.description }
        />
      ) ) : <h1>Please Wait...</h1> }
    </div>
  );
}

export { Product, ProductList };
