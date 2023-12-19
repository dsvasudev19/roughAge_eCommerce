import Footer from "../Components/Footer";
import Navbar from "../Components/Navigationbar";
import Form from "react-bootstrap/Form";
import { useState, React } from "react";
import Button from "react-bootstrap/esm/Button";
import "../index.css";
import { useNavigate } from "react-router-dom";

function ResitrationForm() {
    const [parsed, setParsed] = useState(false);
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: null,
    email: null,
    phone: null,
    username: null,
    password: null,
    confirmPassword: null,
  });

  function handleNumChange(e) {
    var num = e.target.value;
    if (num.length > 10) {
      alert("Number shouldn't be greater than 10 digits");
    } else {
      setUserData({ ...userData, phone: e.target.value });
    }
    }
    const registerUserData = async (e) => {
      alert("Registering the user");
       e.preventDefault();
       const userAddressAndData = userData;
       userAddressAndData.confirmPassword = null;
      const response = await fetch("https://roughage-api.vercel.app/api/register", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userAddressAndData),
      }).then(response => {
          if (response.status === 202) {
              alert("success");
              navigate('/');
          }
      })
    };
  const validateData = (e) => {
    e.preventDefault();
    alert("validating data");
    const { fullName, email, phone, username, password, confirmPassword } =
      userData;
    if (
      !(fullName && email && phone && username && password && confirmPassword)
    ) {
      alert("All field are required for registration");
    } else {
      try {
        if (username.length < 6) {
          alert("username must consist atleast 6 digits");
        }
          if (password.length >= 8) {
            if (password !== confirmPassword) {
              alert("Password and Confirm Password must be same");
            } else {
                setParsed(true);
            }
        } else {
            alert("Password must contain atleast 8 characters");
        }
          if (parsed) {
              alert("successfully parsed the data");
              registerUserData(e);
        }
      } catch (error) {
        console.error(error);
      }
        }
  };
  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Full name"
          value={userData.fullName}
          onChange={(e) => {
            setUserData({ ...userData, fullName: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email Address"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Phone Number"
          value={userData.phone}
          onChange={handleNumChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Username"
          value={userData.pincode}
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter Password"
          value={userData.address}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Confirm password"
          value={userData.address}
          onChange={(e) => {
            setUserData({ ...userData, confirmPassword: e.target.value });
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={validateData}>
        Proceed to Checkout
      </Button>
    </Form>
  );
}
function Resiter() {
  return (
    <div className="checkoutpage">
      <Navbar />
      <br></br>

      <div className="co-form">
        <ResitrationForm />
      </div>
      <Footer />
    </div>
  );
}

export default Resiter;
