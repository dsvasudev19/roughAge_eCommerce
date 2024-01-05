import React, { useState } from "react";
import Navbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import { Mail, MapPin, MapPinned, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Contact() {
  const [ nameError, setNameError ] = useState( "" );
  const [ subError, setSubError ] = useState( "" );
  const [ textError, setTextError ] = useState( "" );
  const [ mailBody, setMailBody ] = useState( {
    from: null,
    subject: null,
    text: null
  } );
  const navigate = useNavigate();

  function handleFromChange( e ) {
    const from = e.target.value;

    setMailBody( { ...mailBody, from } );

  }
  function handleSubject( e ) {
    const subject = e.target.value;

    setMailBody( { ...mailBody, subject } );

  }
  function handleText( e ) {
    const text = e.target.value;

    setMailBody( { ...mailBody, text } );

  }
  function validateData( e ) {
    e.preventDefault();
    if ( mailBody.from && mailBody.subject && mailBody.text ) {
      handleSubmit();
    }
    else {
      Swal.fire( "Please fill all the fields", "", "error" );
    }
  }
  async function handleSubmit( e ) {
    const response = await fetch( 'https://roughage-api.vercel.app/api/sendMail', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( mailBody )
    } );
    const data = await response.json();
    if ( response.status === 200 ) {
      Swal.fire( "Successfully Sent.. Please refresh the page.", "", "success" );
      navigate( '/contact' );
    } else {
      Swal.fire( data.msg, "", "info" )
    }
    // 
  }
  return (
    <>
      <Navbar />
      <div className="contactPageMain">
        <div className="contactIntro">
          <h1
            id="abouthead"
            style={ {
              color: "green",
              fontSize: "50px",
              fontVariant: "all-petite-caps",
            } }
          >
            Get in Touch:
          </h1>
          <p id="abouttexts">
            Whether you're a health enthusiast, a conscious consumer, or someone
            just beginning their organic journey, we welcome you to explore our
            range of fresh, affordable, and organically grown fruits and
            vegetables.
            <br></br>
            Contact us at <span style={ { color: "orangered" } }>
              #roughAge
            </span>{ " " }
            to learn more about our products, farming practices, or to share
            your own organic journey. Together, let's savor the taste of nature
            and embrace a healthier way of living.
            <br></br>
            Thank you for being a part of the{ " " }
            <span style={ { color: "orangered" } }>#roughAge</span> family.
          </p>
          <br></br>
          <div
            style={ {
              display: "flex",
              justifyContent: "center",
              color: "green",
            } }
          >
            <h1 style={ { fontSize: "80px", fontVariant: "small-caps" } }>
              Contact{ " " }
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
              <MapPin size={ 30 } strokeWidth={ 2.25 } style={ { color: "black" } } />
              <span style={ { fontSize: "20px" } }>Hyderabad</span>
              <br></br>
              <br></br>
              <PhoneCall
                size={ 30 }
                strokeWidth={ 2.25 }
                style={ { color: "black" } }
              />
              +91 9999999999
              <br></br>
              <br></br>
              <Mail size={ 30 } strokeWidth={ 2.25 } style={ { color: "black" } } />
              <span style={ { fontSize: "20px" } }>
                contact.roughAge@gmail.com
              </span>
              <br></br>
              <h6>Connect with me:</h6>
              <a href="https://github.com/dsvasudev19"><img id="img" src="/images\GitHub.png" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/darseshikarivasudev/"><img id="img" src="/images/linkedin.png"
                alt="linkedin" /></a>
              <a href="https://wa.me/+918328203617"><img id="img" src="/images/what.webp" alt="Whatsapp" /></a>
              <a href="https://www.gmail.com"><img id="img" src="/images/gmail.png" alt="Gmail" /></a>
            </div>
            <div className="formContent">
              <h1 id="contactheading" style={ { fontVariant: "all-small-caps" } }>
                Let's Get in Touch
              </h1>
              <form onSubmit={ validateData }>
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  type="email"
                  id="email"
                  name="from"
                  placeholder="Enter your email id"
                  value={ mailBody.from }
                  onChange={ handleFromChange }
                  required
                />
                <br></br>
                <h6 style={ { color: 'red' } }>{ nameError }</h6>
                <label htmlFor="subject">Subject</label>
                <br></br>
                <input type="text" placeholder="Enter subject of your mail" name="subject" value={ mailBody.subject } onChange={ handleSubject } required />
                <br></br>
                <label htmlFor="text">Description</label>
                <br></br>
                <textarea name="text" id="description" value={ mailBody.text } onChange={ handleText } required></textarea>
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
