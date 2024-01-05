import React, { useEffect } from "react";
import "../index.css";
import Navigationbar from "../Components/Navigationbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductList } from "../Components/ProductList";

import Dna from "../Components/Dna";
// import Trust from "../Components/Trust";
import Frequent from "../Components/Frequent";
import Footer from "../Components/Footer";

import Swal from "sweetalert2";

var similarProducts = [
  { img: "/images/corouselImages/carousel5.jpg" },
  { img: "/images/corouselImages/carousel1.jpeg" },
  // {img:"/images/corousel images/carousel9.jpeg"},
  { img: "/images/corouselImages/carousel3.jpeg" },
  // {img:"/images/corouselImages/carousel4.jpeg"},
  { img: "/images/corouselImages/carousel6.jpg" },
];

function Home() {
  async function establishSession() {
    const response = await fetch( 'https://roughage-api.vercel.app/api/establishSession' )
      .then( async response => {
        if ( response.status === 202 ) {
          const dataParsed = await response.json();
          console.log( dataParsed );
          Swal.fire( dataParsed.msg, ",", "success" );
        }
      } )
  }
  // useEffect(()=>{
  //   establishSession();
  // })
  return (
    <>
      <Navigationbar />
      <div className="mainpage row">
        <div className="col leftRow"></div>
        <div className="col midRow"></div>
        <div className="col">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Dna />
        </div>
      </div>
      <div className="head">
        <h1 id="head">NATURAL AND HEALTHY FOODS</h1>
      </div>

      {/* <CategoryTabs /> */ }
      <ProductList />

      <marquee behavior="scroll" direction="left" className="marq">
        <h1>
          <i className="fa fa-solid fa-leaf"></i> EAT NATURAL, STAY HEALTHY ..!
          <i className="fa fa-solid fa-leaf"></i> “ THE FIRST WEALTH IS HEALTH ”{ " " }
          <i className="fa fa-solid fa-leaf"></i>{ " " }
        </h1>
      </marquee>
      <div className="showProducts">
        { similarProducts.map( ( product ) => {
          return (
            <img src={ product.img } alt="product" className="showCaseProduct" />
          );
        } ) }
      </div>
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
      <div className="text-center">
        <h1 id="testimonialHead">What User's Speak about us !</h1>
      </div>
      <div className="text-center testimonials">
        <div className="testimonialsBody">
          <div className="test">
            <img src="/Gallery/maize.jpg" alt="g7" />
            <h1>User One</h1>
            <h5>Rating:⭐⭐⭐⭐</h5>
            <div className="testBody">
              <p>
                Organic fruits and vegetables boost my health and taste buds. Vibrant colors, robust flavors, and nutrient-rich profiles make every meal a delight. Supporting local farmers and enjoying these organic gems contributes to a healthier planet.
              </p>
            </div>

          </div>
          <div className="test">
            <img src="/Gallery/popaya.jpg" alt="g7" />
            <h1>User One</h1>
            <h5>Rating:⭐⭐⭐⭐</h5>
            <div className="testBody">
              <p>
                Organic fruits and vegetables boost my health and taste buds. Vibrant colors, robust flavors, and nutrient-rich profiles make every meal a delight. Supporting local farmers and enjoying these organic gems contributes to a healthier planet.
              </p>

            </div>

          </div>
          <div className="test">
            <img src="/Gallery/banana.jpg" alt="g7" />
            <h1>User One</h1>
            <h5>Rating:⭐⭐⭐⭐</h5>
            <div className="testBody">
              <p>
                Organic fruits and vegetables boost my health and taste buds. Vibrant colors, robust flavors, and nutrient-rich profiles make every meal a delight. Supporting local farmers and enjoying these organic gems contributes to a healthier planet.
              </p>

            </div>

          </div>


        </div>
      </div>
      {/* <Trust /> */ }
      <div className="naturality">
        <h1 id="naturality">
          100% NATURAL AND PURE <i class="fa fa-solid fa-leaf"></i>
        </h1>
      </div>

      <div className="faq">
        <div className="subject">
          <pre id="faqSubject">FAQ's</pre>
        </div>
        <div className="questions">
          <Frequent />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
