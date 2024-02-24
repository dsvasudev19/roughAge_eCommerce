import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Content } from '../../../_metronic/layout/components/content'
import { Reviews } from './components/Reviews'
import { ReviewHeader } from './ReviewHeader'

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

const ReviewPage: React.FC = () => {
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
          path='reviews'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reviews</PageTitle>
              <Content>
                <Reviews className='mb-5 mb-xl-8' />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to='/review/reviews' />} />
      </Route>
    </Routes>
  )
}

export default ReviewPage
