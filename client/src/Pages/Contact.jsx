import React from "react";
import Navbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import { Mail, MapPin, MapPinned, PhoneCall } from "lucide-react";

function Contact() {
 
  return (
    <>
      <Navbar />
      <div className="contactPageMain">
        <div className="contactIntro">
          <h1
            id="abouthead"
            style={{
              color: "green",
              fontSize: "50px",
              fontVariant: "all-petite-caps",
            }}
          >
            Get in Touch:
          </h1>
          <p id="abouttexts">
            Whether you're a health enthusiast, a conscious consumer, or someone
            just beginning their organic journey, we welcome you to explore our
            range of fresh, affordable, and organically grown fruits and
            vegetables.
            <br></br>
            Contact us at <span style={{ color: "orangered" }}>
              #roughAge
            </span>{" "}
            to learn more about our products, farming practices, or to share
            your own organic journey. Together, let's savor the taste of nature
            and embrace a healthier way of living.
            <br></br>
            Thank you for being a part of the{" "}
            <span style={{ color: "orangered" }}>#roughAge</span> family.
          </p>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "green",
            }}
          >
            <h1 style={{ fontSize: "80px", fontVariant: "small-caps" }}>
              Contact{" "}
            </h1>
          </div>
          <div className="contactForm">
            <div className="contactSuggestions">
              <br></br>
              <h4>Feel free to reach out</h4>
              <p>
                For any inquiries, concerns, or product-related queries, please
                do not hesitate to reach out to us. We are here to assist you
                with professionalism and dedication, ensuring that your
                experience with our products is seamless and satisfactory.
              </p>
              <br></br>
              <MapPin size={30} strokeWidth={2.25} style={{ color: "black" }} />
              <span style={{ fontSize: "20px" }}>Hyderabad</span>
              <br></br>
              <br></br>
              <PhoneCall
                size={30}
                strokeWidth={2.25}
                style={{ color: "black" }}
              />
              +91 9999999999
              <br></br>
              <br></br>
              <Mail size={30} strokeWidth={2.25} style={{ color: "black" }} />
              <span style={{ fontSize: "20px" }}>
                contact.roughAge@gmail.com
              </span>
            </div>
            <div className="formContent">
              <h1 id="contactheading" style={{ fontVariant: "all-small-caps" }}>
                Let's Get in Touch
              </h1>
              <form>
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  type="email"
                  id="email"
                  name="from"
                  placeholder="Enter your email id"
                />
                <br></br>
                <label htmlFor="subject">Subject</label>
                <br></br>
                <input type="text" placeholder="Enter subject of your mail" name="subject" />
                <br></br>
                <label htmlFor="text">Description</label>
                <br></br>
                <textarea name="text" id="description"></textarea>
                <input type="submit" id="submitButton" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Contact;
