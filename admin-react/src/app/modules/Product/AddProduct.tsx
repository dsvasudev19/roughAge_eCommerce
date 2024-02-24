import {useState, FC, useEffect} from 'react'
import {IProfileDetails, profileDetailsInitValues as initialValues} from './ProductModal'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Field, Form, Formik, ErrorMessage } from "formik";

import axios from 'axios';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { totalmem } from 'os';

const profileDetailsSchema = Yup.object().shape({
  title: Yup.string().required('Title is required')

})



const AddProduct: FC = () => {
  const [data, setData] = useState<IProfileDetails>(initialValues)
  // const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
  //   const updatedData = Object.assign(data, fieldsToUpdate)
  //   setData(updatedData)
  // }

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (values:any,{resetForm}:any)=>{
    // const newDates=selectedDates.map((date:any)=>date.toLocaleDateString());
    // console.log(newDates)
    console.log("submitting")
    const formData=new FormData();
    formData.append("productName", values.productName);
    formData.append("productDescription",values.description);
    formData.append("storeId","1");
    formData.append("prices",values.prices);
    formData.append("productImage",values.image);
    formData.append("productStock",values.productStock);  
    formData.append("productPrice",values.productPrice);
    formData.append("productCategory",values.productCategory);

    try{
      const response = await axios.post(
        "http://localhost:3001/v1/admin/products/",
        formData
      );
      console.log(response);
      if (response.status===200) {
        toast.success("Product Added Successfully", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        resetForm();
        values.image=null;
      } else {
        toast.error("Error while adding the Product the Property")
      }

    }catch(error){
      console.log(error);
    }

  }




  

  useEffect(() => {
   
  }, []);

 
  return (
    <div className="card mb-5 mb-xl-10">
      <ToastContainer />
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Add Room</h3>
        </div>
        <div className="card-toolbar"></div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <Formik
          initialValues={initialValues}
          // validationSchema={profileDetailsSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form placeholder={""}>
              <div className="card-body border-top p-9">
                <div className="row mb-6">
                  <div className="col-lg-4 fv-row">
                    <label className="form-label required fw-bold fs-6">
                      Product Name
                    </label>
                    <Field
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Product Name"
                      name="productName"
                    />
                    <ErrorMessage
                      name="productName"
                      component="div"
                      className="fv-plugins-message-container"
                    />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <label className="form-label required fw-bold fs-6">
                      Category
                    </label>
                    <Field
                      as="select"
                      className="form-select form-select-lg"
                      name="productCategory"
                    >
                      <option>Select the Category of the Product</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Fruits">Fruits</option>
                    </Field>
                    <ErrorMessage
                      name="productCategory"
                      component="div"
                      className="fv-plugins-message-container"
                    />
                  </div>
                  <div className="col-lg-4 fv-row">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Product Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={(event: any) => {
                          setFieldValue("image", event.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-6 mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label required fw-semibold fs-6 mb-2"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={1}
                      name="description"
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="fv-plugins-message-container"
                    />
                  </div>
                  <div className="col-lg-6 fv-row">
                    <label className="form-label required fw-bold fs-6">
                      Price of the Product
                    </label>
                    <Field
                      type="number"
                      className="form-control form-control-lg"
                      name="productPrice"
                      placeholder="Price of the Product"
                    />
                    <ErrorMessage
                      name="Saturday Price"
                      component="div"
                      className="fv-plugins-message-container"
                    />
                  </div>
                </div>
                <div className="row mb-6"></div>
                <div className="row mb-6">
                  <div className="col-lg-6 fv-row">
                    <label className="form-label required fw-bold fs-6">
                      Stock Available
                    </label>
                    <Field
                      type="number"
                      className="form-select form-select-lg"
                      name="productStock"
                    ></Field>
                    <ErrorMessage
                      name="productStock"
                      component="div"
                      className="fv-plugins-message-container"
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label required fw-bold fs-6">
                      Status of the Product
                    </label>
                    \
                    <Field
                      as="select"
                      className="form-select form-select-lg"
                      name="productStatus"
                    >
                      <option>Select the Status of the Product</option>
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </Field>
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
          )}
        </Formik>
      </div>
    </div>
  );
}

export { AddProduct };
