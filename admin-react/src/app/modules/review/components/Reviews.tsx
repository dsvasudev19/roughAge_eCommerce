import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
import axios from "axios";

type Props = {
  className: string;
};

const Reviews: FC<Props> = ({ className }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllReviews = async () => {
    try {
      const res = await axios.get("/admin/reviews", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 200) {
        setReviews(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }

  };
  async function deleteReview(id: number) {
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
          const reviewId = id;
          const deleteUrl = `/admin/reviews/${reviewId}`;

          const res = await axios.delete(deleteUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const response = res.data;

          if (res.status === 200) {
            setReviews(reviews.filter((review:any) => review.id !== reviewId));

            Swal.fire({
              position: "center",
              timer: 1000,
              title: "Successfully Deleted the Review",
              icon: "success",
            });
          } else {
            Swal.fire("error", response.message, "error");
          }
        } catch (error) {
          console.log(error);
        } finally {
          getAllReviews();
        }
      }
    });
  }
  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Review Statistics
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 Reviews
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

      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-200px rounded-start">Agent</th>
                <th className="min-w-350px">Review</th>
                <th className="min-w-150px">Product</th>
                <th className="min-w-100px">Rating</th>
                <th className="min-w-200px text-end rounded-end"></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {reviews.map((review: any, index: any) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <span className="symbol-label bg-light">
                          <img
                            // toAbsoluteUrl("media/svg/avatars/001-boy.svg")
                            src={faker.image.avatar()}
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
                          {review.User
                            ? review.User.first_name +
                              " " +
                              review.User.last_name
                            : null}
                          {/* {review?.User?.first_name+" "+review?.User?.last_name} */}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {/* HTML, JS, ReactJS */}
                          {review?.User?.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {/* $8,000,000 */}
                      {review?.content}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {review?.reviewable_type}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                    >
                      {review?.Product?.name}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {review?.Product?.category}
                    </span>
                  </td>

                  <td>
                    <div className="rating">
                      {Array.from({ length: review?.rating }, (_, index) => (
                        <div key={index} className="rating-label me-2 checked">
                          <i className="bi bi-star-fill fs-5"></i>
                        </div>
                      ))}
                    </div>
                    <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1">
                      Best Rated
                    </span>
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-light-danger btn-sm px-4 me-2"
                      onClick={(e) => deleteReview(review.id)}
                    >
                      Delete
                    </a>
                    {/* <a href="#" className="btn btn-light-success btn-sm px-4">
                      Edit
                    </a> */}
                  </td>
                </tr>
              ))}
              {/* <tr>
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
                    Pending
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
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Reviews };
