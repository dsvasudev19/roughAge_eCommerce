import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  IProfileDetails,
  profileDetailsInitValues as initialValues,
} from "./VendorModel";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage, Formik } from "formik";

const profileDetailsSchema = Yup.object().shape({
  vendorName: Yup.string().required("Vendor Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AddVendor = () => {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(values: any) {
    setLoading(true);
    try {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.vendorName);
      formData.append("email", values.email);
      formData.append("profileMedia", values.image);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      console.log(formData)

      try {
        const response = await axios.post(
          "http://localhost:3000/v1/admin/vendors",
          formData,
          
        );
        console.log(response);
        if (response.status ===200) {
          
          Swal.fire("Success!",response.data.message, "success");
        } 
      } catch (error:any) {
        console.log(error)
         if(error.status === 404){
          Swal.fire(
            "Error!",
            error.response.data.message,
            "error"
          );
        }
        else {
          Swal.fire("Error!", error.response.data.message, "error");
        }
        console.error("An error occurred while making the request:", error);
        // Handle the error as needed
      }

    } catch (error) {
      console.error("Error during form submission:", error);
      Swal.fire(
        "Error!",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Add Vendor</h3>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <div id="kt_account_profile_details" className="collapse show">
            <Form placeholder={undefined}>
              <div className="card-body border-top p-9">
                <div className="row mb-6">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-4 fv-row">
                        <label className="form-label required fw-bold fs-6">
                          Vendor Name
                        </label>
                        <Field
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Vendor Name"
                          name="vendorName"
                        />
                        <ErrorMessage
                          name="vendorName"
                          component="div"
                          className="fv-plugins-message-container"
                        ></ErrorMessage>
                      </div>
                      <div className="col-lg-4 fv-row">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="required form-label fw-bold fs-6"
                          >
                            Email
                          </label>
                          <Field
                            type="text"
                            className="form-control form-control-lg mb-3 mb-lg-0"
                            placeholder="Email"
                            name="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="fv-plugins-message-container"
                          ></ErrorMessage>
                        </div>
                      </div>
                      <div className="col-lg-4 fv-row">
                        <label className="form-label required fw-bold fs-6">
                          Phone
                        </label>
                        <Field
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Phone"
                          name="phone"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="fv-plugins-message-container"
                        ></ErrorMessage>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 fv-row">
                        <label className="form-label required fw-bold fs-6">
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="fv-plugins-message-container"
                        ></ErrorMessage>
                      </div>
                      <div className="col-lg-4 fv-row">
                        <label className="form-label required fw-bold fs-6">
                          Profile
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          placeholder="Profile Picture"
                          name="image"
                          onChange={(event: any) => {
                            setFieldValue("image", event.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button type="submit" className="btn btn-primary">
                  {!loading && "Save Changes"}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...{" "}
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  )}
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export { AddVendor };
