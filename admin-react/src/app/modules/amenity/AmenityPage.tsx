import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Content } from '../../../_metronic/layout/components/content'
import { Amenities } from './components/Amenities'
import { ReviewHeader } from './AmenityHeader'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Vendor',
    path: '/vendor/overview',
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

const AmenityPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <ReviewHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='amenities'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Amenities</PageTitle>
              <Content>
                <Amenities className='mb-5 mb-xl-6' />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to='/amenity/amenities' />} />
      </Route>
    </Routes>
  )
}

export default AmenityPage
