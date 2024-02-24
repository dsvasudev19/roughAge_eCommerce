import React from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import VendorUpdateModel from "./VendorUpdateModal";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
import StatusUpdateModal from './StatusUpdateModal'
type Props = {
  className: string;
};

const VendorEnquiries: React.FC<Props> = ({ className }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [modalId,setModalId]=useState();

  const idSetter=(id:number)=>{
    setModalId(id)
  }

  const getAllEnquiries = async () => {
    const url = `http://localhost:3000/v1/admin/vendor/enquiries`;
    try {
      const res = await fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await res.json();
      if (res.status === 200) {
        const data = response.data;
        console.log(data);
        setEnquiries(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteEnquiry(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          const enquiryId = id;
          const deleteUrl = `http://localhost:3000/v1/admin/vendor/enquiries/${enquiryId}`;
          const res = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const response = await res.json();
          if (res.status === 200) {
            setEnquiries(
              enquiries.filter((enquiry) => enquiry.id !== enquiryId)
            );
            Swal.fire("Success!", response.message, "success");
          } else {
            Swal.fire("error", response.message, "error");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  useEffect(()=>{
    getAllEnquiries();
  },[]);


  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Vendors</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 Vendors
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <a
            href="#"
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_invite_friends"
          >
            <KTIcon iconName="plus" className="fs-3" />
            New Member
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-150px">Host</th>
                <th className="min-w-130px">Location</th>
                <th className="min-w-140px">Mobile</th>
                <th className="min-w-120px">Property Type</th>
                <th className="min-w-120px">No.of Rooms</th>
                <th className="min-w-120px">Status</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {enquiries.map((enquiry: any, index: number) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-45px me-5">
                        <img src={faker.image.avatar()} alt="" />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary fs-6"
                        >
                          {enquiry.name}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {enquiry.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {enquiry.location}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {enquiry.phone}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {enquiry.property_type}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {enquiry.roomsCount}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {enquiry?.status === -1 ? (
                        <span className="badge badge-light-info fs-7 fw-semibold">
                          Pending
                        </span>
                      ) : enquiry?.status === 1 ? (
                        <span className="badge badge-light-primary fs-7 fw-semibold">
                          Processing <KTIcon iconName="setting-4" />
                        </span>
                      ) : enquiry?.status === 2 ? (
                        <span className="badge badge-light-success fs-7 fw-semibold">
                          Completed
                        </span>
                      ) : (
                        <span className="badge badge-light-danger fs-7 fw-semibold">
                          Rejected
                        </span>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end flex-shrink-0">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#enquiryStatusUpdate"
                        onClick={(id) => idSetter(enquiry.id)}
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => deleteEnquiry(enquiry.id)}
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        <StatusUpdateModal getEnquiries={getAllEnquiries} id={modalId} />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { VendorEnquiries };
