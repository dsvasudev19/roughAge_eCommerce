import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {VendorHeader} from './VendorHeader'
import { Vendors } from './Vendors'
import { Content } from '../../../_metronic/layout/components/content'
import { AddVendor } from './AddVendor'
import {VendorsNew} from './VendorsNew'
import {VendorEnquiries} from './VendorEnquiries'
const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Vendor',
    path: '/vendor/vendors',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const VendorPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <VendorHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="vendors"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Vendors</PageTitle>
              <Content>
                <Vendors className="mb-5 mb-xl-8" />

                {/* <VendorsNew className='mb-5 mb-xl-8' />  */}
              </Content>
            </>
          }
        />
        <Route
          path="add-vendor"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Add Vendor</PageTitle>
              <Content>
                <AddVendor />
              </Content>
            </>
          }
        />
        <Route
          path="enquiries"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Vendor Enquiries
              </PageTitle>
              <Content>
                <VendorEnquiries className="mb-5 mb-xl-8" />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to="/vendor/vendors" />} />
      </Route>
    </Routes>
  );
}

export default VendorPage
