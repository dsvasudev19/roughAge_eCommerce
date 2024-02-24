import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import AmenityEditModal from "./AmenityEditModal";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import AmenityAddModal from './AmenityAddModal'
import Swal from "sweetalert2";
import queryString from "query-string";
import axios from "axios";
type Props = {
  className: string;
};

const Amenities: FC<Props> = ({ className }) => {
  const [ModalId, setModalId] = useState<number | null>(null);
  const [amenities, setAmenities] = useState([]);
  const [roomAmenities,setRoomAmenities]=useState([]);
  const [propertyAmenities,setPropertyAmenities]=useState([]);
  const [roomAmenitiesNumber, setroomAmenitiesNumber] = useState(1);
  const [propertyAmenitiesNumber, setPropertyAmenitiesNumber] = useState(1);
  
  const [offSet, setOffSet] = useState(0);
  const [limit, setLimit] = useState(10);
  

  
  
  

  const getAllAmenitites = async () => {
    try {
      // const queryParams = queryString.stringify({ page: pageNumber, limit }); ?${queryParams}
      const response = await axios.get(
        "http://localhost:3000/v1/admin/amenities",
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const res = response.data;
      if (response.status === 201) {
        setAmenities(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllPropertyAmenities=async()=>{
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/admin/amenities/type/property",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = response.data;

      if (response.status === 201) {
        setPropertyAmenities(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }


  }
  
  const getAllRoomAmenities=async()=>{
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/admin/amenities/type/room",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = response.data;

      if (response.status === 201) {
        setRoomAmenities(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }

  }
  

  function idSetter(id: number) {
    console.log(id);
    setModalId(id);
  }
  function changePageNumber(){
     var newNumber=pageNumber+1;
     setPageNumber(newNumber);
     return newNumber;
  }
  async function deleteAmenity(id: number) {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/v1/admin/amenities/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response);
          const res = response.data;

          if (response.status === 202) {
            // toast.success("Amenity Deleted Successfully");
            getAllAmenitites();
            Swal.fire({
              position: "center",
              title: "Deleted!",
              text: "Amenity has been deleted.",
              icon: "success",
            });
            console.log("Amenity Deleted Successfully");
          }
        } catch (error) {
          console.log(error);
        }

        
      }
    });
    
  }

  useEffect(() => {
    getAllAmenitites();
    getAllPropertyAmenities();
    getAllRoomAmenities();
  }, []);

  return (
    <>
      <div className="row">
        <AmenityAddModal
          roomAmenities={getAllRoomAmenities}
          propertyAmenities={getAllPropertyAmenities}
        />
        <div className="col-lg-6">
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <ToastContainer />
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Property Amenities
                </span>
                <span className="text-muted mt-1 fw-semibold fs-7">
                  Over {propertyAmenities.length} Amenities
                </span>
              </h3>
              <div className="card-toolbar">
                {/* begin::Menu */}
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-color-success btn-active-light-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addAmenity"
                >
                  <KTIcon iconName="plus" className="fs-2" />
                </button>
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className="card-body py-3">
              {/* begin::Table container */}
              <div className="table-responsive">
                {/* begin::Table */}
                <table className="table align-middle gs-0 gy-4">
                  {/* begin::Table head */}
                  <thead>
                    <tr className="fw-bold text-muted bg-light">
                      <th className="ps-4 min-w-300px rounded-start">
                        Details
                      </th>
                      <th className="min-w-200px text-end rounded-end">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}

                  <tbody>
                    {propertyAmenities.map((amenity: any, index: any) => (
                      <tr>
                        <td className="col-lg-6">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-50px me-5">
                              <span className="symbol-label bg-light">
                                <img
                                  src={amenity?.featuredMedia?.path}
                                  className="h-75 align-self-end"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div className="d-flex justify-content-start flex-column">
                              <a
                                href="#"
                                className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                              >
                                {amenity.name}
                              </a>
                              <span className="text-muted fw-semibold text-muted d-block fs-7">
                                {amenity?.amenity_type}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <a
                            href="#"
                            className="btn btn-bg-light btn-color-danger btn-active-color-danger btn-sm px-4 me-2"
                            onClick={(id) => {
                              deleteAmenity(amenity.id);
                            }}
                          >
                            Delete
                          </a>
                          <a
                            href="#"
                            className="btn btn-bg-light btn-color-primary btn-active-color-primary btn-sm px-4"
                            data-bs-toggle="modal"
                            data-bs-target="#amenityUpdate"
                            onClick={(id) => idSetter(amenity.id)}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
              <AmenityEditModal
                id={ModalId}
                roomAmenities={getAllRoomAmenities}
                propertyAmenities={getAllPropertyAmenities}
              />
            </div>
            {/* begin::Body */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-5 mb-xl-6">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Room Amenities
                </span>
                <span className="text-muted mt-1 fw-semibold fs-7">
                  Over {roomAmenities.length} Amenities
                </span>
              </h3>
              <div className="card-toolbar">
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-color-success btn-active-light-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addAmenity"
                >
                  <KTIcon iconName="plus" className="fs-2" />
                </button>
              </div>
            </div>

            <div className="card-body py-3">
              <table className="table align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th className="ps-4 min-w-300px rounded-start">Details</th>
                    <th className="min-w-200px text-end rounded-end">Action</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}

                <tbody>
                  {roomAmenities.map((amenity: any, index: any) => (
                    <tr>
                      <td className="col-lg-6">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-50px me-5">
                            <span className="symbol-label bg-light">
                              <img
                                src={amenity?.featuredMedia?.path}
                                className="h-75 align-self-end"
                                alt=""
                              />
                            </span>
                          </div>
                          <div className="d-flex justify-content-start flex-column">
                            <a
                              href="#"
                              className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                            >
                              {amenity.name}
                            </a>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {amenity?.amenity_type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <a
                          href="#"
                          className="btn btn-bg-light btn-color-danger btn-active-color-danger btn-sm px-4 me-2"
                          onClick={(id) => {
                            deleteAmenity(amenity.id);
                          }}
                        >
                          Delete
                        </a>
                        <a
                          href="#"
                          className="btn btn-bg-light btn-color-primary btn-active-color-primary btn-sm px-4"
                          data-bs-toggle="modal"
                          data-bs-target="#amenityUpdate"
                          onClick={(id) => idSetter(amenity.id)}
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Amenities };
