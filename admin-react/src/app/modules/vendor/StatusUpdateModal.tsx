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

export default function App({ getEnquiries, id }: { getEnquiries: () => {}; id: any }) {
  const [initialValues, setInitialValues] = useState({
    status: 0,
  });
  const [stat, setStat] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
        
      const updateToast = toast.warning(
        "Updating Enquiry.Don't Refresh the Page.",
        {
          autoClose: false, // Prevent the toast from auto-closing
          closeButton: false, // Hide the close button
        }
      );
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      // formData.append("image", values.image);
      formData.append("phone", values.phone);
      console.log({ ...initialValues });
      // Swal.fire("Updating Property Status", `${stat}+ ${typeof(stat)}`, "info");
      const res = await fetch(
        "http://localhost:3000/v1/admin/vendor/enquiries/" + id,
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
        toast.update(updateToast, {
          render: "Enquiry updated successfully!",
          type: "success",
          autoClose: 500, // Close the toast after 3 seconds
          closeButton: true, // Show the close button
        });
        getEnquiries();
        
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Unable Update Category");
    } finally {
      // getProperties();
      setSubmitting(false);
    }
  };

  const getEnquiryById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/admin/vendor/enquiries/${id}`,
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
      getEnquiryById();
    }
  }, [id]);
  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="enquiryStatusUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status of Vendor Enquiry</h5>
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
                        Status
                      </label>
                      <Field
                        as="select"
                        id="status"
                        name="status"
                        className="form-control form-control-white"
                        onChange={handleChange}
                      >
                        <option>Select Status of the Property</option>
                        <option id="2" value={2}>
                          Completed
                        </option>
                        <option id="1" value={1}>
                          Processing
                        </option>
                        <option id="-1" value={-1}>
                          Pending
                        </option>
                        <option id="0" value={0}>
                          Rejected
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
