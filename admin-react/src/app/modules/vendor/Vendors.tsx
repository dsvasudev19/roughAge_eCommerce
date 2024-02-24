// import React from 'react'
import React, { useState, useEffect } from "react";
import { KTIcon, KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
// import VendorCard from './VendorCard'
import Swal from "sweetalert2";
import { parse } from "path";
import { AddVendor } from "./AddVendor";
import AddVendorModal from "./AddVendorModal";
import VendorUpdateModel from "./VendorUpdateModal";
import { profile } from "console";
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


const Vendors: React.FC<Props> = ({ className }) => {
  const [vendorsData, setVendorsData] = useState<VendorCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Modalid, setId] = useState<any>("");
  const fetchVendorsData = async () => {
    try {
      const response = await fetch("http://localhost:3000/v1/admin/vendors");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const res = await response.json();
      const data: VendorCardProps[] = res.data;
      console.log(data);
      setVendorsData(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const idSetter = (id: any) => {
    setId(id);
  };
  const VendorCard: React.FC<VendorCardProps> = ({
    id,
    name,
    phone,
    profileMedia,
    email,
    properties,
  }) => {
    // const [avatar,setAvatar]=useState("");
    // const [updateDetails, setUpdateDetails] = useState({
    //   name: name,
    //   phone: phone,
    //   email: email,
    // });
    function getMediaUrl(url:string) {
      const baseUrl="http://localhost:3000/";
      const parts = url.split("/")[2];
      return baseUrl+parts;
    }
    async function deleteVendor(id: number) {
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
          const vendorId = id;
          const deleteUrl = `http://localhost:3000/v1/admin/vendors/${vendorId}`;
          const res = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const response = await res.json();
          if (res.ok) {
            setVendorsData(vendorsData.filter((vendor) => vendor.id !== id));
            Swal.fire("Success!", "Vendor deleted successfully!", "success");
          } else {
            Swal.fire(
              "Error!",
              "Failed to delete vendor. Please try again.",
              "error"
            );
          }
          
        }
      });
      
    }

    async function uploadVendorImage(id: any) {
      try {
        const vendorId = id;
        const uploadUrl = `http://localhost:3000/v1/admin/vendors/image/${vendorId}`;
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await res.json();
        if (res.ok) {
          Swal.fire(
            "Success!",
            "Vendor image uploaded successfully!",
            "success"
          );
        } else {
          Swal.fire(
            "Error!",
            "Failed to upload vendor image. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

   
    return (
      <tr>
        <td>
          {/* getMediaUrl(profileMedia.url) */}
          <div className="d-flex align-items-center">
            <div
              className="symbol symbol-45px me-5"
              data-bs-toggle="modal"
              data-bs-target="#profileUpdateModal"
            >
              <img src={profileMedia.path} alt={name} />
            </div>
            <div className="d-flex justify-content-start flex-column">
              <a
                href="#"
                className="text-gray-900 fw-bold text-hover-primary fs-6"
              >
                {name}
              </a>
              <span className="text-muted fw-semibold text-muted d-block fs-7">
                {email}
              </span>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-900 fw-bold d-block fs-6">{phone}</span>
        </td>
        <td>
          <span className="text-gray-900 fw-bold d-block fs-6">
            {properties.length}
          </span>
        </td>
        <td>
          <div className="d-flex justify-content-end flex-shrink-0">
            <a
              href="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              data-bs-toggle="modal"
              // data-bs-target="#upload"
              id={`${id}`}
            >
              <KTIcon iconName="switch" className="fs-3" />
            </a>
            <a
              href="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_2"
              onClick={(e) => idSetter(id)}
            >
              <KTIcon iconName="pencil" className="fs-3" />
            </a>
            <a
              href="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#"
              onClick={(e) => deleteVendor(id)}
            >
              <KTIcon iconName="trash" className="fs-3" />
            </a>
            <>{id}</>
          </div>
        </td>
      </tr>
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
    );
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
            data-bs-target="#kt_modal_3"
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
              {vendorsData.map((vendor, id: any) => (
                <VendorCard {...vendor} id={vendor.id} key={vendor.id} />
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        <VendorUpdateModel id={Modalid} getVendors={fetchVendorsData} />
        <AddVendorModal getVendors={fetchVendorsData} />
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Vendors };
