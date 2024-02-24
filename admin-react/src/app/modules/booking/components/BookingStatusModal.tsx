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

export default function App({ getBookings, id }: { getBookings: () => {}; id: any }) {
  const [initialValues, setInitialValues] = useState({
    status: "",
    attended:0
  });

  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const formData = new FormData();
      formData.append("status", values.status);
      formData.append("attended", values.attended);

      console.log({ ...initialValues });

      // Swal.fire("Updating Property Status", `${stat}+ ${typeof(stat)}`, "info");

      const response = await axios.put(
        `http://localhost:3000/v1/admin/bookings/status/${id}`,
        {
          status: initialValues.status,
          attended: initialValues.attended,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        getBookings();
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
      getBookings();
      setSubmitting(false);
    }

  };

  const getBookingById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/admin/bookings/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
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
      getBookingById();
    }
  },[id]);
  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="bookingStatusModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status of Booking</h5>
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
                        Acceptance Status of Booking
                      </label>
                      <Field
                        as="select"
                        id="status"
                        name="status"
                        className="form-control form-control-white"
                        onChange={handleChange}
                      >
                        <option>Select Status of the Booking</option>
                        <option id="0" value="Cancelled">
                          Cancelled
                        </option>
                        <option id="1" value="Accepted">
                          Accepted
                        </option>
                      </Field>
                      <ErrorMessage
                        name="Status"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Status
                      </label>
                      <Field
                        as="select"
                        id="attended"
                        name="attended"
                        className="form-control form-control-white"
                        onChange={handleChange}
                      >
                        <option>Select Status of the Booking</option>
                        <option id="0" value={0}>
                          Not Attended
                        </option>
                        <option id="1" value={1}>
                          Attended
                        </option>
                      </Field>
                      <ErrorMessage
                        name="attended"
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
