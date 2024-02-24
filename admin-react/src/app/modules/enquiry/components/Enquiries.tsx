import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { IndianRupee } from "lucide-react";
import Swal from "sweetalert2";
import EnquiryUpdateModal from './EnquiryUpdateModal'
import axios from "axios";
type Props = {
  className: string;
};

const Enquiries: React.FC<Props> = ({ className }) => {
    const [enquiries,setEnquiries]=useState([]);
    const [loading,setLoading]=useState(false);
    const [modalId,setModalId]=useState<number>(0);
    const [mode,setMode]=useState('all')
    const idSetter=(id:number)=>{
        setModalId(id)
    }
    const getAllEnquiries=async ()=>{
        try {
          const response = await axios.get(
            "http://localhost:3000/v1/admin/enquiries",
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const res = response.data;
          if (response.status === 200) {
            console.log(res.data);
            setEnquiries(res.data);
          }
        } catch (error) {
          console.error("Error fetching enquiries:", error);
        }
    }
    const getFilteredEnquiries=async(filter:string)=>{
      const url = `http://localhost:3000/v1/admin/enquiries/filter/${filter}/enquiries`;
      try {
        const response = await axios.get(url, {
          headers: {
            "content-type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          setEnquiries(response.data);
        }
      } catch (error) {
        console.log(error);
      }

    }
    useEffect(()=>{
      if(mode==='all'){
          getAllEnquiries();
      }else{
        getFilteredEnquiries(mode);
      }
    },[mode]);
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
            const deleteUrl = `http://localhost:3000/v1/admin/enquiries/${enquiryId}`;

            const response = await axios.delete(deleteUrl, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.status === 200) {
              setEnquiries(
                enquiries.filter((enquiry) => enquiry.id !== enquiryId)
              );
              Swal.fire("Success!", response.data.message, "success");
            } else {
              Swal.fire("error", response.data.message, "error");
            }
          } catch (error) {
            console.log(error);
          }

        }
      });
    }
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Recent Enquirires
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 Enquiries
          </span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
          <button
            className="btn btn-light-primary btn-sm me-4"
            onClick={() => {
              setMode("pending");
            }}
          >
            Pending
          </button>
          <button
            className="btn btn-light-warning btn-sm me-4"
            onClick={() => setMode("cancelled")}
          >
            Cancelled
          </button>
          <button
            className="btn btn-light-success btn-sm me-4"
            onClick={() => setMode("rejected")}
          >
            Rejected
          </button>
          <button
            className="btn btn-light-info btn-sm me-4"
            onClick={() => setMode("all")}
          >
            All
          </button>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-100px">Enquiry Id</th>
                <th className="min-w-120px">Property</th>
                <th className="min-w-120px">Rooms</th>
                <th className="min-w-120px">Customer</th>
                <th className="min-w-120px">Check In/Out</th>
                <th className="min-w-120px">Guests</th>
                <th className="min-w-120px">Message</th>
                <th className="min-w-100px">Services</th>
                <th className="min-w-120px">Amount</th>
                <th className="min-w-120px">Status</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {enquiries.length > 0 ?
              enquiries.map((enquiry: any) => (
                <tr>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary fs-6"
                    >
                      {enquiry.id}
                      {/* 56037-XDER(Booking Id) */}
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {enquiry?.property?.title}
                      {/* Brasil(property name) */}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Code: PH(vendor name) */}
                      {enquiry?.property?.vendor?.name}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {enquiry?.rooms}
                      {/* Brasil(property name) */}
                    </a>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                      {/* Brasil(customer name) */}
                      {enquiry?.user?.first_name +
                        " " +
                        enquiry?.user?.last_name}
                    </span>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Code: PH(vendor name) */}
                      {enquiry?.user?.email}
                    </span>
                  </td>
                  <td>
                    <a className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                      {enquiry?.checkin}
                      {/* 05/28/2020(check in) */}
                    </a>
                    <a className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Date(check out) */}
                      {enquiry?.checkout}
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {enquiry?.guests}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      guests
                    </span>
                  </td>
                  <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                    {/* "Comfirmation required at any cost" */}
                    {enquiry.message}
                  </td>
                  <td className="text-start">
                    {enquiry.services.includes(1) && (
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="car-2" className="fs-3" />
                      </a>
                    )}

                    {enquiry.services.includes(2) && (
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2"
                      >
                        <KTIcon iconName="airplane-square" className="fs-3" />
                      </a>
                    )}
                  </td>
                  <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                    <IndianRupee size={18} strokeWidth={1.5} />
                    {enquiry?.amount}
                  </td>
                  <td>
                    {enquiry?.status === "Pending" ? (
                      <span className="badge badge-light-info fs-7 fw-semibold">
                        Pending
                      </span>
                    ) : enquiry?.status === "Rejected" ? (
                      <span className="badge badge-light-danger fs-7 fw-semibold">
                        Rejected
                      </span>
                    ) : enquiry?.status === "Accepted" ? (
                      <span className="badge badge-light-success fs-7 fw-semibold">
                        Accepted
                      </span>
                    ) : (
                      <span className="badge badge-light-warning fs-7 fw-semibold">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      onClick={(id) => idSetter(enquiry.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#enquiryStatusUpdate"
                    >
                      <KTIcon iconName="switch" className="fs-3" />
                    </a>
                    {/* <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      onClick={(id) => idSetter(enquiry.id)}
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a> */}
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      onClick={(e) => deleteEnquiry(enquiry.id)}
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </td>
                </tr>
              )):<tr>
                <td colSpan={11} className="text-center">
                  No Enquiries Found
                </td>
              </tr>}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      <EnquiryUpdateModal id={modalId} getEnquiries={getAllEnquiries} />
      {/* begin::Body */}
    </div>
  );
};

export { Enquiries };
