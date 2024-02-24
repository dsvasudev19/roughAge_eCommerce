import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { KTSVG } from "../../../../_metronic/helpers";
import Swal from "sweetalert2";

export interface IAppProps {}

export default function App({ getUsers, id }: { getUsers: () => {}; id: any }) {
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("location", values.location);

      const response = await axios.put(
        `/admin/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Successfully Updated User Details",
          icon: "success",
          position: "center",
          timer: 800,
        });
        getUsers();
        resetForm();
      }
    } catch (error:any) {
      console.error("Error submitting form:", error.message);
      Swal.fire({
        title: error.message,
        icon: "error",
        position: "center",
        timer: 800,
      });
    } finally {
      getUsers();
      setSubmitting(false);
    }

  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`/admin/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("response.data", response.data)
        console.log(response.data);
        setInitialValues(response.data);
      }
    } catch (error:any) {
      console.log(error.message);
    }

  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialValues({ ...initialValues, [name]: value });
  };

  useEffect(() => {
    if (id !== "") {
      getUserById();
    }
  }, [id]);
  return (
    <div>
      <div className="modal fade" tabIndex={-1} id="userEditModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User Profile</h5>
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
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="first_name"
                        className="form-control form-control-white"
                        placeholder="Enter User Name"
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
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="last_name"
                        className="form-control form-control-white"
                        placeholder="Enter User Last name"
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
                        id="email"
                        name="email"
                        className="form-control form-control-white"
                        placeholder="Enter User Email"
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
                        Password
                      </label>
                      <Field
                        type="text"
                        id="password"
                        name="password"
                        className="form-control form-control-white"
                        placeholder="Enter User Account Password"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div> */}
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Location
                      </label>
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        className="form-control form-control-white"
                        placeholder="Enter User Location"
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
                        Gender
                      </label>
                      <div>
                        <label htmlFor="male" className="mr-3">
                          <Field
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="form-check-input"
                            onChange={handleChange}
                          />
                          Male
                        </label>
                        <label htmlFor="female" className="mr-3">
                          <Field
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="form-check-input"
                            onChange={handleChange}
                          />
                          Female
                        </label>
                        <label htmlFor="other">
                          <Field
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            className="form-check-input"
                            onChange={handleChange}
                          />
                          Other
                        </label>
                      </div>
                      <ErrorMessage
                        name="gender"
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
