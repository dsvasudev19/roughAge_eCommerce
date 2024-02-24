import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { Enquiries } from "./components/Enquiries";
import { EnquiryHeader } from "./EnquiryHeader";

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: "Vendor",
    path: "/vendor/vendors",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const EnquiryPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <EnquiryHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="enquiries"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Enquiries</PageTitle>
              <Content>
                <Enquiries className="mb-5 mb-xl-8" />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to="/enquiry/enquiries" />} />
      </Route>
    </Routes>
  );
};

export default EnquiryPage;
