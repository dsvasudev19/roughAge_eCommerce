import React, { useState, useEffect } from "react";
import { KTIcon, KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
// import VendorCard from './VendorCard'
import Swal from "sweetalert2";
import { parse } from "path";
import VendorUpdateModel from "./VendorUpdateModal";
import { profile } from "console";
type Props = {
  className: string;
};

data: [
  {
    id: 12,
    name: "Malla Reddy Holidays",
    email: "malla reddy Holidays@gmail.com",
    phone: "989898989295",
    password: "$2b$10$oB/Fzkb8.6CKE9nPJKIc5uQD8KuZaQXOJfdge8vXFA/nK7euv7ScK",
    createdAt: "2024-01-31T15:10:09.000Z",
    updatedAt: "2024-01-31T15:10:09.000Z",
    deletedAt: null,
    properties: [],
    profileMedia: [
      {
        id: 1,
        mediable_id: 12,
        mediable_type: "Profile",
        url: "./uploads/profileMedia/profile_1706713809489_.jpg",
        name: "WIN_20230908_19_03_37_Pro.jpg",
        file_name: "profile_1706713809489_.jpg",
        file_type: "image/jpeg",
        file_size: "84217",
        createdAt: "2024-01-31T15:10:09.000Z",
        updatedAt: "2024-01-31T15:10:09.000Z",
        deletedAt: null,
      },
    ],
  },
];
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
type profileMedia={
  id: number;
  mediable_id: number;
  mediable_type: string;
  url: string;
  name: string;
  path:string;
  file_name: string;
  file_type: string;
  file_size: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
type VendorCardProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  properties: propertyProps;
  profileMedia: profileMedia;
};
const VendorCard: React.FC<VendorCardProps> = ({
    id,
    name,
    phone,
    profileMedia,
    email,
    properties,
  }) => {
    const [Modalid, setId] = useState<any>("");
    const [vendorsData, setVendorsData] = useState<VendorCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
      setId(id);
    };
    

    return (
      <tr>
        <td>
          <div className="d-flex align-items-center">
            <div className="symbol symbol-45px me-5">
              <img src={profileMedia.path} alt="" />
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
          <span className="text-gray-900 fw-bold d-block fs-6">
            +91 {phone}
          </span>
        </td>
        <td>
          <span className="text-gray-900 fw-bold d-block fs-6">
            {/* {properties.length} */}
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
              onClick={(e) => idSetter(id)}
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
    );
  };

  export default VendorCard;