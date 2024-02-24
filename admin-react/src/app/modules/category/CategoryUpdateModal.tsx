import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../Helpers/Api_instance";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import Swal from "sweetalert2";
import axios from "axios";

export interface IAppProps {}

export default function App({
  getCategories,
  id,
}: {
  getCategories: () => {};
  id: any;
}) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
    
  });
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("categoryImage", values.image);
      formData.append("phone", values.phone);
      console.log({...initialValues})
      const res=await axios.put("/admin/category/"+id,formData,{
        withCredentials:true
        })
      if (res.status===200 && res.data) {
        getCategories();
        toast.success("Category Updated successfully");
        resetForm();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      toast.error("Unable Update Category");
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryById = async () => {
    try {
      const response = await axios.get(
        `/admin/category/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      if (response && response.data) {
        console.log(response.data.data);
        setInitialValues(response.data.data);
      }
    } catch (error:any) {
      console.log(error.message);
    }

  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name,value)
    setInitialValues({ ...initialValues, [name]: value });
  };

  useEffect(() => {
    if (id !== "" && id !== undefined && id !== null) {
      getCategoryById();
    }
  }, [id]);
  return (
    <div>
      <div className="modal fade" tabIndex={-1} id="kt_modal_2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Category Profile</h5>
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
