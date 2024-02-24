import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import axios from "axios";
import { KTSVG } from "../../../../_metronic/helpers";

export interface IAppProps {}

export default function App({ getEnquiries, id }: { getEnquiries: () => {}; id: any }) {
  const [initialValues, setInitialValues] = useState({
    status: "",
    message:"",
    amount:""
  });

  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
   try {
     const formData = new FormData();
     formData.append("status", values.status);

     const response = await axios.put(
       `/admin/support/${id}`,
       {
         status: initialValues.status,
       },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );


     if (response.status === 200) {
       getEnquiries();
       Swal.fire({
         position: "center",
         title: "Successfully Changed the Status of Enquiry",
         timer: 800,
         icon: "success",
       });
     }
   } catch (error) {
     console.error("Error submitting form:", error);
     toast.error("Unable to Update Category");
   } finally {
     getEnquiries();
     setSubmitting(false);
   }

  };

  const getEnquiryById = async () => {
    try {
      const response = await axios.get(
        `/admin/support/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data) {
        console.log(response.data.data);
        setInitialValues(response.data.data);
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
  },[id]);
  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="enquiryStatusUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status of Enquiry</h5>
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
                        <option>Select Status of the Enquiry</option>
                        <option id="0" value={0}>
                          Pending
                        </option>
                        <option id="1" value={1}>
                          Resolved
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
