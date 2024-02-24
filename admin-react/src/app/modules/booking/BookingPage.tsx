import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Content } from '../../../_metronic/layout/components/content'
import { Bookings } from './components/Bookings'
import { BookingHeader } from './BookingHeader'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
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

const BookingPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <BookingHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='bookings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Properties</PageTitle>
              <Content>
                <Bookings className='mb-5 mb-xl-8' />
              </Content>
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              
            </>
          }
        />
        <Route index element={<Navigate to='/booking/bookings' />} />
      </Route>
    </Routes>
  )
}

export default BookingPage
