import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigationbar from './Navigationbar';
import Footer from './Footer';
import { CheckCircle, IndianRupee, MinusSquare, PlusSquare, Truck } from 'lucide-react';

import Skeleton from "../skeleton-loading.gif";
import Button from 'react-bootstrap/esm/Button';

const SpecificProduct = () => {
  const product = useParams();
  const [ quantity, setQuantity ] = useState( 1 );
  const [ productId, setProductId ] = useState();
  const [ similarProducts, setSimilarProducts ] = useState( [] );
  const [ productDetails, setProductDetails ] = useState( {
    image: "",
    productID: "",
    productName: "",
    price: "",
    description: "",
    category: ""
  } );

  async function handleCart( e ) {
    const id = productId;
    try {
      const response = await fetch( `https://roughage-api.vercel.app/api/addToCart/${ id }`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify( { id, quantity } )
      } );

      if ( response.status !== 404 ) {
        Swal.fire( "Successfully Added", "", "success" );
      } else {
        Swal.fire( "Error", "", "error" );
      }
    } catch ( error ) {
      console.error( "Error adding to cart:", error );
      Swal.fire( "Error", "", "error" );
    }
  }
  function increaseCount( e ) {
    setQuantity( quantity + 1 )
  }
  function decreaseCount( e ) {
    if ( quantity > 1 ) {
      setQuantity( quantity - 1 );
    }
  }
  useEffect( () => {
    fetchProductDetails();

  }, [ product.productID ] );

  useEffect( () => {

    window.scrollTo( 0, 0 );


  }, [] );

  async function fetchProductDetails() {
    try {
      const response = await fetch( `https://roughage-api.vercel.app/api/getProductDetails/${ product.productID }` );

      if ( response.status === 202 ) {
        const parsedData = await response.json();
        const data = parsedData[ 0 ];

        setProductId( data.productID );
        setProductDetails( {
          image: data.image,
          productID: data.productID,
          productName: data.productName,
          price: data.price,
          description: data.description,
          category: data.category
        } );
      } else if ( response.status === 404 ) {
        Swal.fire( "No Product found", "", "error" );
      }
    } catch ( error ) {
      console.error( "Error fetching product details:", error );
    }
  }
  return (
    <>
      <Navigationbar />
      <section className="sec">
        <div className="row organicProduct" >
          <div className="col col-lg-5 col-md-10 col-sm-12 col-xs-12 imageClass" lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
            <img src={ productDetails.image || Skeleton } id="organicImage" />
          </div>
          <div className="col col-lg-5 col-md-10 col-sm-12 col-xs-12 detailsClass" lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
            <table>
              <tbody>
                <tr>
                  <th id="brand">roughAge</th>
                </tr>
                <tr className="data">
                  <td style={ { fontFamily: "Sans-serif", fontSize: "3rem", fontWeight: "bolder", lineHeight: "1.2" } }>{ productDetails.productName }</td>
                </tr>
                <tr className="data">
                  <td><CheckCircle style={ { color: 'green' } } /> In Stock</td>
                </tr>
                <tr className="data">
                  <td><IndianRupee size={ 35 } strokeWidth={ 1.2 } /> { productDetails.price } /-</td>

                </tr>
                <tr>
                  <td style={ { fontSize: '15px' } }>Inclusive of All taxes</td>
                </tr>
                <tr className="data">
                  <td style={ { fontSize: '20px' } }><Truck size={ 20 } strokeWidth={ 1.5 } absoluteStrokeWidth /> Free Delivery available on orders above 499</td>
                </tr>
                <tr className="data">
                  <td>Pack : 1 KG</td>
                </tr>
                <tr className="data">
                  <td>Quantity</td>
                </tr>
                <tr className="data">
                  <td>
                    <MinusSquare size={ 50 } strokeWidth={ 2.5 } absoluteStrokeWidth onClick={ ( e ) => { decreaseCount( e ) } } />
                    { ' ' }
                    { quantity }
                    { ' ' }
                    <PlusSquare size={ 50 } strokeWidth={ 2.5 } absoluteStrokeWidth onClick={ ( e ) => { increaseCount( e ) } } />
                  </td>
                </tr>

                <tr className="data">
                  <td style={ { color: 'orange' } }>{ productDetails.description }</td>
                </tr>
                <tr className="data" id="addMe">
                  <td><Button variant="success" type="submit" id={ productDetails.productID } onClick={ ( e ) => handleCart( e ) }>Add to Cart</Button></td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
      </section>
      {/* <section>
                <div className="head">
                    <h1 id="similarhead">Products You may Like</h1>

                </div>

                <div className="row allProducts">
                    { similarProducts.map( ( prouctAvailable, index ) => (
                        ( prouctAvailable.productID !== productDetails.productID ) &&
                        index < 5 &&
                        <Product
                            key={ prouctAvailable.productID }
                            id={ prouctAvailable.productID }
                            productName={ prouctAvailable.productName }
                            cost={ prouctAvailable.price }
                            img={ prouctAvailable.image }
                            description={ prouctAvailable.description }
                        />
                    ) ) }
                </div>
            </section> */}
      <div className="text-center galleryHead">
        <h1 id="gallery">Gallery</h1>
      </div>
      <div className="gallery">
        <div className="row galleryImages">
          <img src="/Gallery/cauliflower.jpg" alt="Cauliflower" />
          <img src="/Gallery/galleryPicTwo.jpg" alt="Maize" />
          <img src="/Gallery/mango.jpg" alt="Mango" />
          <img src="/Gallery/galleryPicFour.jpg" alt="Grapes" />
          <img src="/Gallery/popaya.jpg" alt="Popaya" />
          <img src="/Gallery/watermelon.jpg" alt="Watermelon" />
          <img src="/Gallery/bananaSmall.jpg" alt="Banana" />
          <img src="/Gallery/banana.jpg" alt="Banana" />

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecificProduct;