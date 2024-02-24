// import React from 'react'
import React, { useState, useEffect } from "react";
import { KTIcon, KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";

import Swal from "sweetalert2";
import { parse } from "path";
import { AddCategory } from "./AddCategory";
import CategoryAddModal from "./CategoryAddModal";
import CategoryUpdateModal from "./CategoryUpdateModal";
import StatusUpdateModal from './StatusUpdateModal';
import axios from "axios";
type Props = {
  className: string;
};



type categoryCardProps = {
  id: number;
  name: string;
  status: boolean;
  media: any;
};


const Categories: React.FC<Props> = ({ className }) => {
  const [categories, setCategories] = useState<categoryCardProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Modalid, setId] = useState<any>("");
  const fetchCategories = async () => {
    try {
      const res=await axios.get("/admin/category",{
        withCredentials:true
      })
      if(res.status===200){
        const data: categoryCardProps[] = res.data.data;
        console.log(data);
        setCategories(data);
        setLoading(false);
      }
      else{
        setError("Failed to fetch data");
        setLoading(false);
        throw new Error("Failed to fetch data");
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const idSetter = (id: any) => {
    setId(id);
  };
  const CategoryCard: React.FC<categoryCardProps> = ({
    id,
    name,
    status,
    media,
  }) => {
    
    
    async function deleteCategory(id: number) {
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
          const categoryId = id;
          const response=await axios.delete(`/admin/category/${categoryId}`,{
            withCredentials:true
          })
          if(response.status===200){
            setCategories(categories.filter((category) => category.id !== id));
            Swal.fire("Success!", "Category deleted successfully!", "success");
          }
           else {
            Swal.fire(
              "Error!",
              "Failed to delete Category. Please try again.",
              "error"
            );
          }
          
        }
      });
      
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
              <img src={media.path} alt={name} />
            </div>
            <div className="d-flex justify-content-start flex-column">
              <a
                href="#"
                className="text-gray-900 fw-bold text-hover-primary fs-6"
              >
                {name}
              </a>
              
            </div>
          </div>
        </td>
        <td>
          
          <div className="d-flex align-items-center">
            
            <div className="d-flex justify-content-start flex-column">
              <a
                href="#"
                className="text-gray-900 fw-bold text-hover-primary fs-6"
              >
                
                {status===true?<span className="badge badge-light-success fs-7 fw-semibold">
                        Available
                      </span>:<span className="badge badge-light-info fs-7 fw-semibold">
                        Coming Soon
                      </span>}
              </a>
              
            </div>
          </div>
        </td>
        
        <td>
          <div className="d-flex justify-content-end flex-shrink-0">
            <a
              href="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              data-bs-toggle="modal"
              data-bs-target="#categoryStatusUpdate"
              onClick={(e) => idSetter(id)}
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
              onClick={(e) => deleteCategory(id)}
            >
              <KTIcon iconName="trash" className="fs-3" />
            </a>
           
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
    fetchCategories();
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Categories</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over {categories.length} Categories
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
                <th className="min-w-350px">Category</th>
                <th className="min-w-150px">Status</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {categories.map((category, id: any) => (
                <CategoryCard {...category} id={category.id} key={category.id} />
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        <StatusUpdateModal id={Modalid} getCategories={fetchCategories} />
        <CategoryUpdateModal id={Modalid} getCategories={fetchCategories} />
        <CategoryAddModal getCategories={fetchCategories} />
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { Categories };
