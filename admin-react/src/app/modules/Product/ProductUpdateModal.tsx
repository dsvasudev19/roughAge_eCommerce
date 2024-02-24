import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import axios from "axios";
import { KTSVG } from "../../../_metronic/helpers";

export interface IAppProps {}

export default function App({ getProducts, id }: { getProducts: () => {}; id: any }) {
  const [initialValues, setInitialValues] = useState({
    status: 0,
  });
  const [stat, setStat] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      console.log(id);
      const formData = new FormData();

      formData.append("productImage", values.image);

      console.log({ ...initialValues });

      const res = await axios.post(
        "http://localhost:3001/v1/admin/products/profile/" + id,
        formData
      );

      console.log(res);

      if (res && res.data) {
        Swal.fire({
          title: "Profile Picture of Product Updated Successfully",
          position: "center",
          timer: 600,
          icon: "success",
        });
        getProducts();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Unable Update Category");
    } finally {
      // getProperties();
      setSubmitting(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialValues({ ...initialValues, [name]: value });
  };

  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="profileUpdateModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Profile of Product</h5>
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
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Image
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
