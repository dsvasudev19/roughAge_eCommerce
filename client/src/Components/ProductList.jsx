import React, { useEffect, useState } from "react";
import products from "../products";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import './Card.css'
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../index.css";

async function handleEvent(e) {
  e.preventDefault();
  const productDetails = {
    productID: e.target.value,
  };

  const response = await fetch("http://localhost:3001/api/addToCart", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(productDetails),
  }).then((response) => {
    if (response.status === 201) {
      Swal.fire({
        position: "top-end",
        width: 500,
        height: 100,
        icon: "success",
        title: "Product is Added to the Cart",
        showConfirmButton: true,
        timer: 990,
      });
    }
  });
}

function Product(props) {
  return (
    <>
      <NavLink
        to={`/product/${props.id}`}
        className="col col-lg-3  col-md-6  col-sm-12 col-xs-12"
        style={{textDecoration:'none'}}
      >
        <div className="cardS">
          <div className="cardI">
            <img src={props.img} alt={props.productName} id="productImage" />
          </div>
          <div className="cardB">
            <div className="cartT">
              <text id="name">{props.productName}</text>
            </div>
            <div className="cardText">
              <text id="price">Starting Price @ {props.cost}</text>
            </div>
            <Button
              variant="success"
              value={props.id}
              id="addToCartButton"
              onClick={(e) => {
                handleEvent(e);
              }}
            >
              Quick Add
            </Button>
          </div>
        </div>
      </NavLink>
    </>
  );
}


function ProductList() {
  const [productsAvailable, setProductsAvailable] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getProducts")
      .then((productsRecieved) => {
        if (productsRecieved.status === 200) {
          // Swal.fire( "Sucessfully loaded all the products", "", "success" );
          setProductsAvailable(productsRecieved.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const productList = products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      productName={product.name}
      cost={product.cost}
      img={product.img}
    />
  ));
  const producedProducts = productsAvailable.map((producedProduct) => (
    <Product
      key={producedProduct.productID}
      id={producedProduct.productID}
      productName={producedProduct.productName}
      cost={producedProduct.price}
      img={producedProduct.image}
      description={producedProduct.description}
    />
  ));
  return (
    <div className="row allProducts">
      {productsAvailable.map((prouctAvailable) => (
        <Product
          key={prouctAvailable.productID}
          id={prouctAvailable.productID}
          productName={prouctAvailable.productName}
          cost={prouctAvailable.price}
          img={prouctAvailable.image}
          description={prouctAvailable.description}
        />
      ))}
    </div>
  );
}

export { Product, ProductList } ;
