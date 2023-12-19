import React, { useState } from "react";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import backdrop from "../_c28b5ce6-88c2-4b6e-a1dc-a935af8e6a93.jpg";
import im from "../roughAge_logo.jpg";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AdminLoginpage = () => {
  const [token, setToken] = useState("");
  const [ isAuthenticated, setIsAuthenticated ] = useState( Cookies.get( 'Authenticated' ) === 'true' );
  const navigate = useNavigate();
  // const history=useHistory();
  const [adminCredentials, setAdminCredentials] = useState({
    email: null,
    adminId: null,
    password: null,
  });
  function validateCredentials() {
    if (
      adminCredentials.email &&
      adminCredentials.password &&
      adminCredentials.adminId
    ) {
      if (
        adminCredentials.password.length < 10 &&
        adminCredentials.adminId.length < 8
      ) {
        Swal.fire("Check your Login Credentials", "", "error");
      } else {
        return true;
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (validateCredentials()) {
      await fetch("https://roughage-api.vercel.app/api/auth/authenticateAdmin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(adminCredentials),
      }).then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          setToken(data.token);
          setIsAuthenticated(true);
          Swal.fire(data.msg, "", "success");
          Cookies.set('token',data.token);
          Cookies.set('Authenticated',true);

          navigate("/admin",{replace:true});
          
        } else {
          Swal.fire(data.msg, "", "error");
        }
      });
    }
  }

  return (
    <div className="formdata">
      <Navigationbar />
      <div className="loginPageBody">
        <div className="row loginPage">
          <div className="col col-lg-6 col-md-12 col-sm-12 loginPageImage">
            <img src={backdrop} alt="hello" />
          </div>
          <div className="col col-lg-6 col-md-12 col-sm-12 loginPageForm">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <img src={im} alt="logo" id="logoImage" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin Id</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Admin Id"
                  id="forminput"
                  onChange={(e) => {
                    setAdminCredentials({
                      ...adminCredentials,
                      adminId: e.target.value,
                    });
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter Your email or username"
                  onChange={(e) => {
                    setAdminCredentials({
                      ...adminCredentials,
                      email: e.target.value,
                    });
                  }}
                  id="forminput"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setAdminCredentials({
                      ...adminCredentials,
                      password: e.target.value,
                    });
                  }}
                  id="forminput"
                ></Form.Control>
              </Form.Group>
              <br></br>
              <Button type="submit" variant="success" size="lg-12">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginpage;
