import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Content } from '../../../_metronic/layout/components/content'
import { UserHeader } from './UserHeader'
import { Users } from './components/Users'

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

const UserPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <UserHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='users'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Users</PageTitle>
              <Content>
                <Users className='mb-5 mb-xl-8' />
              </Content>
            </>
          }
        />
        <Route index element={<Navigate to='/user/users' />} />
      </Route>
    </Routes>
  )
}

export default UserPage
