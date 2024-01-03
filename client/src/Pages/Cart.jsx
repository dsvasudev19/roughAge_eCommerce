import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../index.css'
import Figure from 'react-bootstrap/Figure';
import { Trash2 } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate, NavLink } from "react-router-dom";

const url = "https://roughage-api.vercel.app//";
const localUrl = "https://roughage-api.vercel.app//api/"
const EmptyCart = () => {
    return (
        <div className="emptyCartContainer">
            <h1>Your Cart is Empty !! </h1>
            <Figure>
                <Figure.Image width={ 800 } height={ 600 } alt="171x180" src="/empty-cart.png" ></Figure.Image>
            </Figure>
        </div>

    )
}

function Cart() {
    const navigate = useNavigate();
    const [ products, setProducts ] = useState( [] );
    const [ totalCost, setTotalCost ] = useState( 0 );
    const [ itemCount, setItemCount ] = useState( 0 );
    const [ discount, setDiscount ] = useState( 0 );
    function CartItem( props ) {
        const [ quant, setQuant ] = useState( props.count );

        function increamentCount() {

            setQuant( ( prevQuant ) => {
                var newQuant = prevQuant + 1;
                const cart = JSON.parse( localStorage.getItem( "cart" ) );
                const productIndex = cart.findIndex( product => product.productID === props.id );

                if ( productIndex !== -1 ) {
                    cart[ productIndex ].count = newQuant;
                    localStorage.setItem( "cart", JSON.stringify( cart ) );
                    setProducts( [ ...cart ] );

                }

                return newQuant;
            } );
        }

        function decreamentCount() {
            setItemCount( ( prevItemCount ) => prevItemCount - 1 ); // Ensure consistent state updates
            setQuant( quant - 1 );
        }
        function decrementCount() {
            // alert("decre");
            setItemCount( itemCount - 1 );
            setQuant( ( prevQuant ) => {
                if ( prevQuant > 1 ) {
                    var newQuant = prevQuant - 1;
                    var cart = JSON.parse( localStorage.getItem( "cart" ) );
                    var ind = cart.findIndex( ( cartItem ) => cartItem.productID === props.id );

                    if ( ind !== -1 ) {
                        cart[ ind ].count = newQuant;
                        localStorage.setItem( "cart", JSON.stringify( cart ) );
                        setProducts( [ ...cart ] );
                    }
                    return newQuant;
                }

                return prevQuant;
            } );
        }
        async function removeProduct() {

            Swal.fire( {
                title: "Are you sure?",
                text: "You want to delete this Item from the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            } ).then( async ( result ) => {
                if ( result.isConfirmed ) {
                    setItemCount( itemCount - props.count );
                    const id = props.id;
                    try {
                        var cart = JSON.parse( localStorage.getItem( "cart" ) );
                        var newCart = cart.filter( product => {
                            return product.id !== id
                        } )
                        localStorage.setItem( "cart", JSON.stringify( newCart ) );
                        await fetch( 'https://roughage-api.vercel.app//api/deleteProduct', {
                            method: "DELETE",
                            headers: {
                                'content-type': "application/json"
                            },
                            body: JSON.stringify( { id } )
                        } ).then( async data => {
                            var parseData = await data.json();
                            // console.log(parseData);
                            setProducts( parseData );
                        } )
                    } catch ( error ) {
                        console.log( error );
                    }
                    Swal.fire( {
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success"
                    } );
                }
            } );

        }

        return (
            <>
                <Row className="justify-content-md-center cartProduct">
                    <Col lg="2" md="1" sm={ 4 } xs={ 6 } className="content">{ props.ind }</Col>

                    <Col lg="1" md="2" sm={ 4 } xs={ 6 } className="content cartImage">
                        <NavLink to={ `/product/${ props.id }` }>
                            <Figure>
                                <Figure.Image width={ 100 } height={ 100 } xs={ 6 } alt="171x180" src={ props.img } >
                                </Figure.Image></Figure></NavLink></Col>
                    <Col lg="2" md="3" sm={ 4 } xs={ 6 } className="content">{ props.name }</Col>
                    {/* <Col lg="2" md="2" sm={4}  xs={6} className="content" style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)' }}>{props.cost}</Col> */ }
                    <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" >
                        {
                            ( quant > 1 ) ? <Minus onClick={ () => { decreamentCount() } } style={ { border: '1px solid black', marginRight: '5px' } } /> :

                                // <Button variant="light" value={props.id} style={{fontSize:"large"}} onClick={()=>{decreamentCount()}}>-</Button>:
                                <Trash2 onClick={ () => { removeProduct() } } style={ { border: '1px solid black', marginRight: '5px' } } />
                        }
                        { ' ' }
                        { quant }

                        { '' }<Plus onClick={ () => { increamentCount() } } style={ { border: '1px solid black', marginLeft: '5px' } } />
                        {/* <Button variant="light" value={props.id} style={{fontSize:"large"}} onClick={()=>{increamentCount()}}>+</Button>{' '} */ }
                    </Col>
                    <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" >

                        {/* <Button variant="danger" value={props.id} onClick={()=>{removeProduct()}}>Remove</Button>{' '} */ }
                        { quant * props.cost }
                    </Col>
                </Row>
            </>
        )
    }
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await fetch( 'https://roughage-api.vercel.app//api/getCart' )
                    .then( async response => {
                        const recievedData = await response.json();
                        // console.log(recievedData);
                        setProducts( recievedData );
                        localStorage.setItem( "cart", JSON.stringify( recievedData ) );
                    } )

            } catch ( error ) {
                console.log( "cant fetch data" );
            }

        }
        fetchData()
    }, [ itemCount ] )

    const Cart = products.map( ( item, index ) => (
        <CartItem
            ind={ index + 1 }
            id={ item.productID }
            key={ item.productID }
            name={ item.productName }
            cost={ item.price }
            category={ item.category }
            count={ item.count }
            img={ item.image }

        />
    ) );
    async function handleCheckout() {
        const response = await fetch( 'https://roughage-api.vercel.app//api/setCart', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( products )
        } )
        sessionStorage.setItem( "cart", JSON.stringify( products ) );
        // <Navigate to="/checkout" replace />
        navigate( '/address' )

    }
    useEffect( () => {
        // console.log(products)
        const totalCost = products.reduce( ( acc, curr ) => {
            // console.log(curr.price,curr.count);
            return acc + curr.price * curr.count;
        }, 0 );
        setTotalCost( totalCost )
    }, [ products ] )
    return (
        ( products.length === 0 ) ? <EmptyCart /> :
            <Row className="justify-content-md-center">
                <Col lg={ 9 } md={ 8 } sm={ 12 }>
                    <Container className="original">
                        <Row className="justify-content-md-center">
                            <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" style={ { color: "orange", fontSize: "x-large" } } >S.No</Col>
                            <Col lg="1" md="2" sm={ 4 } xs={ 6 } className="content productImage" style={ { color: "orange", fontSize: "x-large" } }>Product</Col>
                            <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" style={ { color: "orange", fontSize: "x-large" } }>Product Name</Col>
                            {/* <Col lg="2" md="2" sm={4} xs={6} className="content" style={{color:"orange",fontSize:"x-large"}}>Price</Col> */ }
                            <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" style={ { color: "orange", fontSize: "x-large" } }>Quantity</Col>
                            <Col lg="2" md="2" sm={ 4 } xs={ 6 } className="content" style={ { color: "orange", fontSize: "x-large" } }>Total</Col>
                        </Row>
                        { Cart }
                        <Row className="justify-content-md-center">
                            <Col lg="7" style={ { color: "green", fontWeight: "bold", fontSize: "xx-large" } } className="content">Sub Total</Col>

                            <Col lg="4" style={ { color: "red", fontWeight: "bold", fontSize: "xx-large" } } className="content">{ totalCost }</Col>
                            {/* <Col lg="2" style={{color:"red",fontWeight:"bold",fontSize:"xx-large"}} className="content"><Button variant="warning" value="123" id="456">Proceed to Checkout</Button></Col> */ }
                        </Row>
                        <Row >
                            <Col lg="4"></Col>
                            <Col lg="4"></Col>
                            <Col lg="4"><Button variant="warning" className="justify-content-md-center" onClick={ handleCheckout }
                                style={
                                    {
                                        position: 'relative',
                                        top: '12%',
                                        marginBottom: '20px'
                                    }
                                }
                            >Proceed to Checkout</Button></Col>
                        </Row>
                    </Container>

                </Col>
                <Col lg={ 2 } md={ 4 } sm={ 12 }>
                    <Container className="subTotal">
                        <h2>Total Cart Value</h2>
                        <h5>Sub Total : { totalCost }</h5>
                        {/* <h5>Discount : {calculateDiscount()}</h5> */ }
                        <h5>Delivery Charges : { 40 }</h5>
                        <h5>Coupon : { -40 }</h5>
                        {/* <h5>Total Value : {totalCost-calculateDiscount()}</h5> */ }
                        <Button variant="warning" className="justify-content-md-center  checkout-button" onClick={ handleCheckout }>Proceed to Checkout</Button>
                        <br></br>
                    </Container>

                </Col>

            </Row>




    )
}

export default Cart;