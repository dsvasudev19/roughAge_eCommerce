import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import '../index.css'
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CheckCircle, IndianRupee, Minus, MinusSquare, Plus, PlusSquare, Truck } from 'lucide-react';
import Navigationbar from '../Components/Navigationbar'
import axios from 'axios'
import { Product } from "./ProductList";
import Footer from "./Footer";
import Skeleton from "../skeleton-loading.gif";




function MainProduct() {
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
    // const [productDetails,setProductDetails]=useState();
    // async function handleCart( e ) {
    //     const id = productId;
    //     await fetch( `https://roughage-api.vercel.app/api/addToCart/${ id }`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify( { id, quantity } )
    //     } ).then( response => {
    //         if ( response.status !== 404 ) {
    //             Swal.fire( "Successfully Added", "", "success" );
    //         } else {
    //             Swal.fire( "Error", "", "error" );
    //         }
    //     } )
    // }

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






    // async function fetchProductDetails() {
    //     await fetch( `https://roughage-api.vercel.app/api/getProductDetails/${ product.productID }` ).then(
    //         async response => {
    //             if ( response.status === 202 ) {
    //                 const parsedData = await response.json();

    //                 const data = parsedData[ 0 ];
    //                 setProductId( data.productID );
    //                 setProductDetails( { image: data.image, productID: data.productID, productName: data.productName, price: data.price, description: data.description, category: data.category } );
    //                 // Swal.fire("success","","success");
    //             }
    //             if ( response.status === 404 ) {
    //                 Swal.fire( "No Product found", "", "error" );
    //             }
    //         }
    //     )

    // }
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
    // async function fetchSimilarProducts() {
    //     // console.log(productDetails.category)
    //     // console.log(typeof(productDetails.category))
    //     const response = await fetch( 'https://roughage-api.vercel.app/api/getSimilarCategoryProducts', {
    //         method: 'post',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify( { category: productDetails.category } )
    //     } ).then( async response => {
    //         if ( response.status === 202 ) {
    //             const ParsedData = await response.json();
    //             // console.log(ParsedData)
    //             const similarProductsFetched = ParsedData.products;
    //             setSimilarProducts( similarProductsFetched )
    //             // console.log( similarProductsFetched );
    //         }
    //     } ).catch( error => {
    //         console.log( error )
    //     } )
    // }

    async function fetchSimilarProducts() {
        try {
            const response = await fetch( 'https://roughage-api.vercel.app/api/getSimilarCategoryProducts', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( { category: productDetails.category } )
            } );

            if ( response.status === 202 ) {
                const ParsedData = await response.json();
                const similarProductsFetched = ParsedData.products;

                setSimilarProducts( similarProductsFetched );
            }
        } catch ( error ) {
            console.error( "Error fetching similar products:", error );
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

    }, [ product.productID ] ); // Add product.productID as a dependency
    // useEffect( () => {
    //     // console.log( productDetails );
    //     // console.log( productDetails )
    //     fetchSimilarProducts();

    // }, [ productDetails.productID ] );
    const [ hasReloaded, setHasReloaded ] = useState( false );

    useEffect( () => {
        
        window.scrollTo( 0, 0 );

        
    }, [  ] );
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

                        </table>

                    </div>

                </div>
            </section>
            <section>
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
            </section>
            <div className="text-center galleryHead">
                <h1 id="gallery">Gallery</h1>
            </div>
            <div className="gallery">
                <div className="row galleryImages">
                    <img src="/Gallery/galleryPicOne.jpg" alt="g1" />
                    <img src="/Gallery/galleryPicTwo.jpg" alt="g2" />
                    <img src="/Gallery/galleryPicThree.jpg" alt="g3" />
                    <img src="/Gallery/galleryPicFour.jpg" alt="g4" />
                    <img src="/Gallery/galleryPicFive.jpg" alt="g5" />
                    <img src="/Gallery/galleryPicSix.jpg" alt="g6" />
                    {/* <img src="/Gallery/g7.jpg" alt="g7" />
          <img src="/Gallery/g8.jpg" alt="g8" />
          <img src="/Gallery/g9.jpg" alt="g9" />  */}
                </div>
            </div>
            <Footer />
        </>

    );
}

export default MainProduct