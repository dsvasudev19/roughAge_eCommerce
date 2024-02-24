import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import Swal from "sweetalert2";

export interface IAppProps {}

export default function App({
  getVendors,
  id,
}: {
  getVendors: () => {};
  id: any;
}) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      // formData.append("image", values.image);
      formData.append("phone", values.phone);
      console.log({...initialValues})
      const res = await fetch(`http://localhost:3000/v1/admin/vendors/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialValues),
      });
      const response = await res.json();
      if (response && response.data) {
        getVendors();
        toast.success("Vendors Updated successfully");
        resetForm();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      toast.error("Unable Update Category");
    } finally {
      setSubmitting(false);
    }
  };

  const getVendorById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/admin/vendors/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        setInitialValues(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }

  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name,value)
    setInitialValues({ ...initialValues, [name]: value });
  };

  useEffect(() => {
    if (id !== "") {
      getVendorById();
    }
  }, [id]);
  return (
    <div>
      <div className="modal fade" tabIndex={-1} id="kt_modal_2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Vendor Profile</h5>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="ki-outline ki-cross fs-1"
                />
              </div>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form placeholder={undefined}>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Name
                      </label>
                      <Field
                        type="text"
                        id="offeredPrice"
                        name="name"
                        className="form-control form-control-white"
                        placeholder="Enter Your Name"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Email
                      </label>
                      <Field
                        type="text"
                        id="offeredPrice"
                        name="email"
                        className="form-control form-control-white"
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                      ></Field>
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label
                        className="required fs-6 fw-semibold mb-2"
                        htmlFor="icon"
                      >
                        Phone
                      </label>
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control form-control-white"
                        placeholder="Phone"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="Phone"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    {/* <div className="fv-row mb-7">
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
                    </div> */}
                    <div className="modal-footer">
                      <a
                        className="btn btn-light-danger me-3"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </a>
                      <button
                        type="submit"
                        className="btn btn-light-primary"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="modal fade" tabIndex={-1} id="update">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Vendor Profile Details</h5>
        <div
          className="btn btn-icon btn-sm btn-active-light-primary ms-2"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <KTSVG
            path="media/icons/duotune/arrows/arr061.svg"
            className="svg-icon svg-icon-2x"
          />
        </div>
      </div>
      <div className="modal-body">
        <form className="form">
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6">Name</label>
            <div className="col-lg-8 fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid"
                placeholder="Name"
                // value={name}
              />
            </div>
          </div>
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6">
              Email
            </label>
            <div className="col-lg-8 fv-row">
              <input
                type="email"
                className="form-control form-control-lg form-control-solid"
                placeholder="Email"
                // value={email}
                
              />
            </div>
          </div>
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6">
              Phone
            </label>
            <div className="col-lg-8 fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => updateVendor(id)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>; */
}

