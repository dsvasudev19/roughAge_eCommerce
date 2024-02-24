import React from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import VendorUpdateModel from "./VendorUpdateModal";
import { useState,useEffect } from "react";
import VendorCard from "./VendorCard";
type Props = {
  className: string;
};
type propertyProps = {
  id: number;
  title: string;
  phone: string;
  email: string;
  propertyMedia: propertyMedia;
  location: string;
  address: string;
  city: string;
  room: any;
  status: number;
  vendor: vendor;
  featuredPropertyMedia: featuredPropertyMedia;
};

type propertyMedia = {
  id: number;
  mediable_id: number;
  mediable_type: string;
  url: string;
  name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
type featuredPropertyMedia = {
  id: number;
  mediable_id: number;
  mediable_type: string;
  url: string;
  name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
type vendor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};
type profileMedia = {
  id: number;
  mediable_id: number;
  mediable_type: string;
  url: string;
  name: string;
  path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
type VendorCardProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  properties: propertyProps;
  profileMedia: profileMedia;
};
const VendorsNew: React.FC<Props> = ({ className }) => {
  const [vendorsData, setVendorsData] = useState<VendorCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Modalid, setModalId] = useState<any>("");
  const fetchVendorsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/admin/vendors"
      );

      if (!response.data.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = response.data.data;
      console.log(data);
      setVendorsData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }

  };
  const idSetter = (id: any) => {
    setModalId(id);
  };
  useEffect(() => {
    fetchVendorsData();
  }, []);
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
                <th className="min-w-140px">Mobile</th>
                <th className="min-w-120px">No.Of Properties</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {/* <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img
                        src={toAbsoluteUrl("media/avatars/300-14.jpg")}
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary fs-6"
                      >
                        Ana Simmons
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        example@demo.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-900 fw-bold d-block fs-6">
                    +91 000999900099
                  </span>
                </td>
                <td>
                  <span className="text-gray-900 fw-bold d-block fs-6">3</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
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
                  </div>
                </td>
              </tr> */}
              {vendorsData.map((vendor) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-45px me-5">
                        <img src={vendor.profileMedia.path} alt="" />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary fs-6"
                        >
                          {vendor.name}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {vendor.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      +91 {vendor.phone}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold d-block fs-6">
                      {vendor.properties.length}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end flex-shrink-0">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        data-bs-target="#kt_modal_2"
                        onClick={(e) => idSetter(vendor.id)}
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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
        <VendorUpdateModel id={Modalid} getVendors={fetchVendorsData} />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { VendorsNew };
