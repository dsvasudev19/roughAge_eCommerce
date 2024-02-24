import React, { useEffect, useState } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import StatusUpdateModal from './StatusUpdateModal'
import Swal from 'sweetalert2'
import { Navigate, useNavigate ,Link} from "react-router-dom";
import { ids } from 'webpack'
import ProfileUpdateModal from './ProductUpdateModal'
import GalleryUploadModal from './GalleryUploadModal'
import axios from 'axios'
type Props = {
  className: string
}


const Products: React.FC<Props> = ({ className }) => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ModalId, setModalId] = useState<number | null>(null);
  // const [page, setPage] = React.useState<number>(1)
  // const [totalPages, setTotalPages] = React.useState<number>(0)
  // const [totalRooms, setTotalRooms] = React.useState<number>(0)
  // const [limit, setLimit] = React.useState<number>(10)
  // const [search, setSearch] = React.useState<string>('')
  // const [sort, setSort] = React.useState<string>('')
  // const [sortType, setSortType] = React.useState<string>('')
  // const [filter, setFilter] = React.useState<string>('')
  const navigate = useNavigate();
  function idSetter(id: number) {
    console.log(id);
    setModalId(id);
  }
  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/products", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // const response = await fetch('http://localhost:3001/v1/admin/products/',{
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      } else {
        const data = response.data.data;
        console.log(data);
        setProducts(data);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  async function deleteRoomById(id: number) {
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
        const productId = id;
        const deleteUrl = `http://localhost:3001/v1/admin/products/${productId}`;
        const res = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await res.json();
        if (res.status === 200) {
          setProducts(
            products.filter((product: any) => product.id !== productId)
          );
          Swal.fire("Success!", response.message, "success");
        } else {
          Swal.fire("error", response.message, "error");
        }
      }
    });
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">New Arrivals</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 new Products
          </span>
        </h3>
        <div className="card-toolbar">
          <Link to={"/room/add-room"} className="btn btn-sm btn-light-primary">
            <KTIcon iconName="plus" />
            Add Room
          </Link>
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
                <th className="ps-4 min-w-325px rounded-start">Product</th>
                <th className="min-w-125px">Price</th>
                <th className="min-w-125px">Quantity Available</th>
                <th className="min-w-200px">Store Id</th>
                <th className="min-w-150px">Status</th>
                <th className="min-w-200px text-end rounded-end"></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {products.map((product: any, index: any) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="symbol symbol-50px me-5"
                        data-bs-toggle="modal"
                        data-bs-target="#profileUpdateModal"
                        onClick={(e) => idSetter(product.id)}
                      >
                        <img src={product?.featuredImage?.path} className="" />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                          {product.name}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {/* {room.property?.title} */}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {product.price}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* MAX.{room.endPrice} */}
                    </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {product.stock}
                    </a>
                    {/* <span className="text-muted fw-semibold text-muted d-block fs-7">
          
        </span> */}
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >
                      {product.storeId}
                    </a>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {/* {room.property?.vendor?.email} */}
                    </span>
                  </td>
                  <td>
                    {product.productStatus === 2 ? (
                      <span className="badge badge-light-success fs-7 fw-semibold">
                        Available
                      </span>
                    ) : product.productStatus === 1 ? (
                      <span className="badge badge-light-danger fs-7 fw-semibold">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="badge badge-light-info fs-7 fw-semibold">
                        Coming Soon
                      </span>
                    )}
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#galleryUploadModal"
                      onClick={(e) => idSetter(product.id)}
                    >
                      <KTIcon iconName="plus" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#profileUpdateModal"
                      onClick={(e) => idSetter(product.id)}
                    >
                      <KTIcon iconName="faceid" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#roomStatusUpdate"
                      onClick={(id) => idSetter(product.id)}
                    >
                      <KTIcon iconName="switch" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      onClick={(id) => {
                        idSetter(product.id);
                      }}
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      onClick={() => {
                        deleteRoomById(product.id);
                      }}
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </td>
                </tr>
              ))}

              {/* <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        src={toAbsoluteUrl("media/stock/600x400/img-3.jpg")}
                        className=""
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >
                        Telegram Development
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $4,790
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
                    $240
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
                    Chris Thompson
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    NBA Player
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-danger fs-7 fw-semibold">
                    In Progress
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="pencil" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon iconName="trash" className="fs-3" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        src={toAbsoluteUrl("media/stock/600x400/img-9.jpg")}
                        className=""
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >
                        Payroll Application
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
                    $4,390
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
                    $593
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
                    Zoey McGee
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Ruby Developer
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-success fs-7 fw-semibold">
                    Success
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="pencil" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon iconName="trash" className="fs-3" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        src={toAbsoluteUrl("media/stock/600x400/img-18.jpg")}
                        className=""
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >
                        HR Management System
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    $7,990
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
                    $980
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
                    Brandon Ingram
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Insurance
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-info fs-7 fw-semibold">
                    Rejected
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="pencil" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon iconName="trash" className="fs-3" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <img
                        src={toAbsoluteUrl("media/stock/600x400/img-8.jpg")}
                        className=""
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >
                        Telegram Mobile
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
                    $5,790
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
                    $750
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
                    Natali Trump
                  </a>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Insurance
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-warning fs-7 fw-semibold">
                    Approved
                  </span>
                </td>
                <td className="text-end">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="pencil" className="fs-3" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon iconName="trash" className="fs-3" />
                  </a>
                </td>
              </tr> */}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        <GalleryUploadModal id={ModalId} getProducts={fetchProductsData} />
        <ProfileUpdateModal id={ModalId} getProducts={fetchProductsData} />
        <StatusUpdateModal id={ModalId} getProducts={fetchProductsData} />
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Products };

