import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { KTSVG } from "../../../_metronic/helpers";
import Swal from "sweetalert2";
import { KTSVG } from "../../../../_metronic/helpers";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { get } from "http";
import { Amenities } from "../../amenity/components/Amenities";
import { setEngine } from "crypto";
import { setTimeout } from "timers/promises";

export interface IAppProps {}

export default function App({
  
  roomAmenities,
  propertyAmenities,
}: {
  
  roomAmenities: () => {};
  propertyAmenities: () => {};
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    amenity_type: "",
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("amenity_type", values.amenity_type);
    formData.append("amenityImage", values.image);

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/admin/amenities/",
        formData
      );

      console.log(response);

      if (response && response.data) {
        // toast.success("Successfully Created Amenity");
        Swal.fire({
          position: "center",
          title: "Successfully Created Amenity",
          icon: "success",
          timer: 600,
        });

        console.log(response.data.message);

        if (
          initialValues.amenity_type === "Room" ||
          initialValues.amenity_type === "room"
        ) {
          roomAmenities();
        } else {
          propertyAmenities();
        }

        resetForm();

        // navigate("/amenity/amenities");
      }
    } catch (error) {
      console.log(error);
      resetForm();
    }

  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialValues({ ...initialValues, [name]: value });
  };

  return (
    <div>
      <div className="modal fade" tabIndex={-1} id="addAmenity">
        <ToastContainer />
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Amenity Details</h5>
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
                onSubmit={handleSubmit}
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
                        placeholder="Enter Amenity Name"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="Amenity Name"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Amenity Type
                      </label>
                      <Field
                        type="text"
                        id="offeredPrice"
                        name="amenity_type"
                        className="form-control form-control-white"
                        placeholder="Enter Amenity type"
                        onChange={handleChange}
                      ></Field>
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    {/* <div className="fv-row mb-7">
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
                      </div> */}
                    <div className="fv-row mb-7">
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
                        name="Amenity"
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
