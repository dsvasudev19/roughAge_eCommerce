import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";

const ReactVendors = () => {
    const [vendorsData, setVendorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Modalid, setId] = useState("");

    const fetchVendorsData = async () => {
        try {
            const response = await fetch("http://localhost:3000/v1/admin/vendors");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const res = await response.json();
            const data = res.data;
            console.log(data);
            setVendorsData(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setLoading(false);
        }
    };

    const idSetter = (id) => {
        setId(id);
    };

    const getMediaUrl = (url) => {
        const baseUrl = "http://localhost:3000/";
        const parts = url.split("/");

        const indexOfProfileMedia = parts.indexOf("profileMedia");

        if (indexOfProfileMedia !== -1 && indexOfProfileMedia < parts.length - 1) {
            const extractedPart = parts.slice(indexOfProfileMedia).join("/");
            return baseUrl + extractedPart;
        } else {
            console.log('The URL does not contain "profileMedia" or is incomplete');
        }
    };

    const deleteVendor = async (id) => {
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
                const deleteUrl = `http://localhost:3000/v1/admin/vendors/${ vendorId }`;
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
    };

    const uploadVendorImage = async (id) => {
        const vendorId = id;
        const uploadUrl = `http://localhost:3000/v1/admin/vendors/image/${ vendorId }`;
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
    };

    useEffect(() => {
        fetchVendorsData();
    }, []);

    return (
        <div className={`card ${ className }`}>
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Vendors</span>
                    <span className="text-muted mt-1 fw-semibold fs-7">
                        Over 500 Vendors
                    </span>
                </h3>
                <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
                    <a href="#" className="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">
                        <i className="fs-3">+</i> New Member
                    </a>
                </div>
            </div>
            <div className="card-body py-3">
                <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bold text-muted">
                                <th className="min-w-150px">Host</th>
                                <th className="min-w-140px">Mobile</th>
                                <th className="min-w-120px">No.Of Properties</th>
                                <th className="min-w-100px text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorsData.map((vendor) => (
                                <tr key={vendor.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="symbol symbol-45px me-5">
                                                <img src={getMediaUrl(vendor.url)} alt="" />
                                            </div>
                                            <div className="d-flex justify-content-start flex-column">
                                                <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                                                    {vendor.name}
                                                </a>
                                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                                    {vendor.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-gray-900 fw-bold d-block fs-6">{vendor.phone}</span>
                                    </td>
                                    <td>
                                        <span className="text-gray-900 fw-bold d-block fs-6">{vendor.properties.length}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end flex-shrink-0">
                                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" id={`${ vendor.id }`}>
                                                <i className="fs-3">switch</i>
                                            </a>
                                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_2" onClick={(e) => idSetter(vendor.id)}>
                                                <i className="fs-3">pencil</i>
                                            </a>
                                            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" data-bs-toggle="modal" data-bs-target="#" onClick={(e) => deleteVendor(vendor.id)}>
                                                <i className="fs-3">trash</i>
                                            </a>
                                            <>{vendor.id}</>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <VendorUpdateModel id={Modalid} getVendors={fetchVendorsData} />
            </div>
        </div>
    );
};

export default ReactVendors;
