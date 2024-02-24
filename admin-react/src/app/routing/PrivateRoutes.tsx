import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import CategoryPage from "../modules/category/CategoryPage";


import RoomPage from "../modules/Product/ProductPage";
import BookingPage from "../modules/booking/BookingPage";

import SupportPage from '../modules/support/SupportPage';

const PrivateRoutes = () => {
  const ReviewPage = lazy(() => import("../modules/review/ReviewPage"));
  const AmenityPage = lazy(() => import("../modules/amenity/AmenityPage"));
  const UsersPage = lazy(() => import("../modules/user/UserPage"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        {/* Lazy Modules */}
        <Route
          path="category/*"
          element={
            <SuspensedView>
              <CategoryPage />
            </SuspensedView>
          }
        />
        
        <Route
          path="amenity/*"
          element={
            <SuspensedView>
              <AmenityPage />
            </SuspensedView>
          }
        />
        <Route
          path="product/*"
          element={
            <SuspensedView>
              <RoomPage />
            </SuspensedView>
          }
        />
        <Route
          path="booking/*"
          element={
            <SuspensedView>
              <BookingPage />
            </SuspensedView>
          }
        />
        <Route
          path="review/*"
          element={
            <SuspensedView>
              <ReviewPage />
            </SuspensedView>
          }
        />
        
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-support/*"
          element={
            <SuspensedView>
              <SupportPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
