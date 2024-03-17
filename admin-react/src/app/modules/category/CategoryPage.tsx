import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {CategoryHeader} from './CategoryHeader'
import { Categories } from './Categories'
import { Content } from '../../../_metronic/layout/components/content'
import { AddCategory } from './AddCategory'


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Category',
    path: '/category/categories',
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

const CategoryPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <CategoryHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="categories"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Categories</PageTitle>
              <Content>
                <Categories className="mb-5 mb-xl-8" />
              </Content>
            </>
          }
        />
        <Route
          path="add-category"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Add Category</PageTitle>
              <Content>
                <AddCategory />
              </Content>
            </>
          }
        />
        
        <Route index element={<Navigate to="/category/categories" />} />
      </Route>
    </Routes>
  );
}

export default CategoryPage
