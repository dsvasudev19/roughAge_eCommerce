import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import Swal from "sweetalert2";
import BookingStatusModal from "./BookingStatusModal";
import { faker } from "@faker-js/faker";
import axios from "axios";
type Props = {
  className: string;
};

const Bookings: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [totalBookings, setTotalBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [modalId, setModalId] = useState<number>();
  const [mode, setMode] = useState("all");

  const getBookings = async () => {
    try {
      // const res = await fetch("http://localhost:3000/v1/admin/bookings/", {
      //   method: "get",
        
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      // const response = await res.json();
      // if (res.status === 200) {
      //   const data = response.data;
      //   setBookings(data);
      // }
      const response = await axios.get(
        "http://localhost:3000/v1/admin/bookings/",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = response.data.data; // Assuming the data is nested under the "data" property
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFilteredBookings = async (day: string) => {
    console.log(day);
    const url = `http://localhost:3000/v1/admin/bookings/${day}/bookings`;
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const responseData = response.data;

      if (response.status === 200) {
        console.log(responseData.bookings);
        const data = responseData.bookings;
        console.log(data);
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }

  };

  async function deleteBooking(id: number) {
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
         const bookingId = id;
         const deleteUrl = `http://localhost:3000/v1/admin/bookings/${bookingId}`;
         const response = await axios.delete(deleteUrl, {
           headers: {
             "Content-Type": "application/json",
           },
         });

         if (response.status === 204) {
           setBookings(bookings.filter((booking:any) => booking.id !== bookingId));
           Swal.fire({
             position: "center",
             timer: 1000,
             title: "Successfully Deleted the Booking",
             icon: "success",
           });
         } else {
           Swal.fire("error", response.data.message, "error");
         }
       } catch (error) {
         console.log(error);
       } finally {
         getBookings();
       }

      }
    });
  }

  function idSetter(id: number) {
    setModalId(id);
  }

  useEffect(() => {
    setBookings([]);
    if (mode === "all") {
      getBookings();
    } else{
      getFilteredBookings(mode);
    } 
    
  }, [mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recent Bookings</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 Bookings
          </span>
        </h3>
        <div className="card-toolbar">
          <button
            className="btn btn-light-primary btn-sm me-4"
            onClick={() => {
              setMode("previous");
            }}
          >
            Previous Bookings
          </button>
          <button
            className="btn btn-light-warning btn-sm me-4"
            onClick={() => setMode("today")}
          >
            Today Bookings
          </button>
          <button
            className="btn btn-light-success btn-sm me-4"
            onClick={() => setMode("today-checkin")}
          >
            Today Check-in's
          </button>
          <button
            className="btn btn-light-success btn-sm me-4"
            onClick={() => setMode("upcoming")}
          >
            Upcoming Check-in's
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
                <th className="min-w-100px">Booking Id</th>
                <th className="min-w-140px">Property</th>
                <th className="min-w-120px">Rooms</th>
                <th className="min-w-120px">Check In</th>
                <th className="min-w-120px">Check Out</th>
                <th className="min-w-120px">Guests</th>
                <th className="min-w-120px">Amount</th>
                <th className="min-w-120px">Status</th>
                <th className="min-w-120px">Attended</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {bookings?.map((booking: any, index: any) => (
                <tr key={index}>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary fs-6"
                    >
                      {booking.reference_number}
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {booking?.Property?.title}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {booking?.Property?.vendor?.name}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                      {booking?.rooms || null}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {booking?.checkin}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      Date
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {booking?.checkout}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      Date
                    </span>
                  </td>
                  <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                    {booking?.guests}
                  </td>
                  <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                    {booking?.amount}
                  </td>
                  <td>
                    {booking.status === "Accepted" ? (
                      <span className="badge badge-light-success fs-7 fw-semibold">
                        Accepted
                      </span>
                    ) : (
                      <span className="badge badge-light-danger fs-7 fw-semibold">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td>
                    {booking?.attended == 1 ? (
                      <span className="badge badge-light-success fs-7 fw-semibold">
                        Attended
                      </span>
                    ) : (
                      <span className="badge badge-light-danger fs-7 fw-semibold">
                        Not Attended
                      </span>
                    )}
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#bookingStatusModal"
                      onClick={(id) => idSetter(booking.id)}
                    >
                      <KTIcon iconName="switch" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      onClick={(e) => deleteBooking(booking.id)}
                    >
                      <KTIcon iconName="trash" className="fs-3" />
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
        <BookingStatusModal id={modalId} getBookings={getBookings} />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Bookings };
