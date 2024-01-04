import React from "react";
import { ProductList } from "../Components/ProductList";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";


const ProductsPage = () => {
  return (
    <div>
      <Navigationbar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default ProductsPage;
