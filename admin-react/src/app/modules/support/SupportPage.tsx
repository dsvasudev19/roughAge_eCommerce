import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { SupportHeader } from "./SupportHeader";
import { SupportEnquiries } from "./components/SupportEnquiries";
// import { Users } from "./components/Users";

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: "Support",
    path: "/support/overview",
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

const UserPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <SupportHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="enquiries"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Support Enquiries</PageTitle>
              <Content>
                <SupportEnquiries className="mb-5 mb-xl-8" />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to="/support/enquiries" />} />
      </Route>
    </Routes>
  );
};

export default UserPage;
