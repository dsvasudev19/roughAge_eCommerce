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

export default function App({
  getProducts,
  id,
}: {
  getProducts: () => {};
  id: any;
}) {
  const [initialValues, setInitialValues] = useState({
    status: 0,
  });
  const [stat, setStat] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      // formData.append("image", values.image);
      formData.append("phone", values.phone);
      console.log({ ...initialValues });
      // Swal.fire("Updating Property Status", `${stat}+ ${typeof(stat)}`, "info");
      const res = await fetch(
        "https://roughagebackend-production.up.railway.app/v1/admin/products/status/" +
          id,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: initialValues.status }),
        }
      );
      const response = await res.json();
      console.log(response);
      if (res.status === 200) {
        Swal.fire({
          title: "You work has been Saved",
          timer: 600,
          icon: "success",
          position: "center",
        });
        getProducts();
        // toast.success("Room Status Updated Successfully", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Unable Update Category");
    } finally {
      // getProperties();
      setSubmitting(false);
    }
  };

  const getProductById = async () => {
    try {
      const res = await fetch(
        `https://roughagebackend-production.up.railway.app/v1/admin/products/${id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      if (response && response.data) {
        console.log(response.data);
        setInitialValues(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialValues({ ...initialValues, [name]: value });
  };

  useEffect(() => {
    if (id !== "") {
      getProductById();
    }
  }, [id]);
  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="roomStatusUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status of Product</h5>
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
                    <div className="fv-row mb-7"></div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Status
                      </label>
                      <Field
                        as="select"
                        id="status"
                        name="status"
                        className="form-control form-control-white"
                        onChange={handleChange}
                      >
                        <option>Select Status of the Product</option>
                        <option id="0" value="Available">
                          Available
                        </option>
                        <option id="1" value="Out of Stock">
                          Out of Stock
                        </option>
                        <option id="1" value="Coming Soon">
                          Coming Soon
                        </option>
                      </Field>
                      <ErrorMessage
                        name="Status"
                        component="div"
                        className="text-danger mt-2"
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
