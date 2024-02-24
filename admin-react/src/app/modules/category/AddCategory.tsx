import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  IProfileDetails,
  profileDetailsInitValues as initialValues,
} from "./CategoryModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage, Formik } from "formik";

const profileDetailsSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
});

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(values: any) {
    setLoading(true);
    try {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.categoryName);
      formData.append("categoryImage", values.image);
     


      try {
        const response = await axios.post(
          "/admin/category",
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
          <h3 className="fw-bolder m-0">Add Category</h3>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <div id="kt_account_profile_details" className="collapse show">
            <Form placeholder={undefined}>
              <div className="card-body border-top p-9">
                <div className="row mb-6">
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <label className="form-label required fw-bold fs-6">
                          Category Name
                        </label>
                        <Field
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Category Name"
                          name="categoryName"
                        />
                        <ErrorMessage
                          name="categoryName"
                          component="div"
                          className="fv-plugins-message-container"
                        ></ErrorMessage>
                      </div>
                      
                    </div>
                    
                  </div>
                  <div className="col col-lg-6">
                      <label className="required fs-6 fw-semibold mb-2">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="form-control"
                        onChange={(e: any) => {
                          setFieldValue("image", e.target.files[0]);
                        }}
                      />
                      <ErrorMessage
                        name="Image"
                        component="div"
                        className="text-danger mt-2"
                      />
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

export { AddCategory };
