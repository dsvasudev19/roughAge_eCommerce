import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { error } from "console";
import Swal from "sweetalert2";
import queryString from "query-string";
import UserEditModal from "./UserEditModal";
import axios from "axios";
type Props = {
  className: string;
};

const Users: FC<Props> = ({ className }) => {
  const [loading, setLoading] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalId, setModalId] = useState<number>();
  let [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [offSet,setOffSet]=useState(0)
  const [limit,setLimit]=useState(10)
  
  

  function idSetter(id: any) {
    setModalId(id);
  }
  const getAllUsers = async () => {
    try {
      const response=await axios.get(`/admin/users`,{
        withCredentials:true,
      })
      console.log(response)
      if(response.status===200){
        console.log(response.data);
        setUsers(response.data);
        
      }
    } catch (error) {
      console.log(error);
    }


  };
  async function deleteUser(id: number) {
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
          const userId = id;
          const deleteUrl = `admin/users/${userId}`;

          const response = await axios.delete(deleteUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseData = response.data;

          if (response.status === 200) {
            setUsers(users.filter((user:any) => user.id !== userId));
            Swal.fire({
              position: "center",
              timer: 1000,
              title: "Successfully Deleted the User Details",
              icon: "success",
            });
          } else {
            Swal.fire("error", responseData.message, "error");
          }
        } catch (error) {
          console.log(error);
        } finally {
          getAllUsers();
        }



      }
    });
  }

  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Member Statistics
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over {users.length} new members
          </span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          >
            <KTIcon iconName="category" className="fs-2" />
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
                <th className="ps-4 min-w-300px rounded-start">Agent</th>
                <th className="min-w-125px">Mobile</th>
                <th className="min-w-125px">Gender</th>
                <th className="min-w-200px">Location</th>
                <th className="min-w-150px">Bookings</th>
                <th className="min-w-200px text-end rounded-end"></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {users?.map((user: any, index: number) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <span className="symbol-label bg-light">
                          <img
                            src={toAbsoluteUrl("media/svg/avatars/001-boy.svg")}
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
                          {user.first_name + " " + user.last_name}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {user.phone}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Pending */}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {user?.gender}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Paid */}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {user?.location || "India"}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* Web, UI/UX Design */}
                    </span>
                  </td>
                  <td>
                    <div className="rating">
                      {user?.bookings?.length || (parseInt((Math.random() * 9).toString()))}
                    </div>
                    <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                      {/* Best Rated */}
                    </span>
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                      onClick={(id) => deleteUser(user.id)}
                    >
                      Delete
                    </a>
                    <a
                      href="#"
                      className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                      data-bs-toggle="modal"
                      data-bs-target="#userEditModal"
                      onClick={(id) => idSetter(user.id)}
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}

              {/* <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          src={toAbsoluteUrl(
                            "media/svg/avatars/047-girl-25.svg"
                          )}
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
                        Lebron Wayde
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $8,750,000
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Paid
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $7,400
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Paid
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    Agoda
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Houses &amp; Hotels
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                  </div>
                  <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                    Above Avarage
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          src={toAbsoluteUrl(
                            "media/svg/avatars/006-girl-3.svg"
                          )}
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
                        Brad Simmons
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $8,000,000
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    In Proccess
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $2,500
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Rejected
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    RoadGee
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Paid
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                  </div>
                  <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                    Best Rated
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          src={toAbsoluteUrl(
                            "media/svg/avatars/014-girl-7.svg"
                          )}
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
                        Natali Trump
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $700,000
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Pending
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $7,760
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Paid
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    The Hill
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Insurance
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                  </div>
                  <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                    Avarage
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-light">
                        <img
                          src={toAbsoluteUrl(
                            "media/svg/avatars/020-girl-11.svg"
                          )}
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
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $1,320,000
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Pending
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $6,250
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Paid
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    Intertico
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                    <div className="rating-label me-2 checked">
                      <i className="bi bi-star-fill fs-5"></i>
                    </div>
                  </div>
                  <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                    Best Rated
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                  >
                    Edit
                  </a>
                </td>
              </tr> */}
            </tbody>
            {/* end::Table body */}
          </table>
          <div className="d-flex justify-content-end align-items-center">
            <ul className="pagination">
              <li className="page-item previous">
                <a
                  href="#"
                  className="page-link"
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    } else {
                      setPageNumber(pageNumber);
                    }
                  }}
                >
                  <i className="previous"></i>
                </a>
              </li>
             
              {Array.from({ length: totalPages }, (_, i) => i+1).map(
                (pageNumber) => (
                  <li key={pageNumber} className="page-item">
                    <a href="#" className="page-link" onClick={()=>{setPageNumber(pageNumber)}}>
                      {pageNumber}
                    </a>
                  </li>
                )
              )}

              <li className="page-item previous">
                <a
                  href="#"
                  className="page-link"
                  onClick={() => {
                    console.log("inc");
                    console.log(totalPages);
                    if (pageNumber < totalPages) {
                      setPageNumber(pageNumber + 1);
                    } else {
                      setPageNumber(pageNumber);
                    }
                  }}
                >
                  <i className="next"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        <UserEditModal id={modalId} getUsers={getAllUsers} />.
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Users };
