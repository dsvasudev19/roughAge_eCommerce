import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2'
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
async function handleEvent( e ) {
  e.preventDefault();
  const productDetails = {
    productId: e.target.value
  }
  Swal.fire( {
    title: "Do you want to add the product to the Cart?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  } ).then( async ( result ) => {
    if ( result.isConfirmed ) {
      var cart=JSON.parse(localStorage.getItem("cart"))|| [];
      
      const response = await fetch( 'http://localhost:3001/api/addToCart', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify( productDetails )
      } ).then( response => {
        if ( response.status === 201 ) {
          Swal.fire( "Successfull added to the cart.." );
        }
      } )

    } else if ( result.isDenied ) {
      Swal.fire( "Changes are not saved", "", "info" );
    }
  } );



}
// className="col col-xs-12 col-sm-12 col-md-6 col-lg-3 text-center oneProduct"
//function Product( props ) {
//   return (
//     <NavLink
//       to={`/product/${props.id}`}
//       lg="3"
//       md="6"
//       sm="12"
//       xs="12"
//       className="col col-lg-3  col-md-6  col-sm-12 col-xs-12"
//       style={{ height: "480px" }}
//     >
//       <Card>
//         <Card.Img variant="top" src={props.img} className="cardImage" />
//         <Card.Body>
//           <Card.Title>{props.productName}</Card.Title>

//           <Card.Text>
//             Starting @ {props.cost}
//             <br></br>
//             {/* <span id="productDesc">{ props.description }</span> */}
//           </Card.Text>
//           <Button
//             variant="success"
//             value={props.id}
//             id="addToCartButton"
//             onClick={(e) => {
//               handleEvent(e);
//             }}
//           >
//             Quick Add
//           </Button>
//         </Card.Body>
//       </Card>
//     </NavLink>
//   );
// }
export default Product;