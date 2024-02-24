import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ProductHeader} from './ProductHeader'
import { Products } from './Products'
import { Content } from '../../../_metronic/layout/components/content'
import { AddProduct } from "./AddProduct";

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

const ProductPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <ProductHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="products"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Products</PageTitle>
              <Content>
                <Products className="mb-5 mb-xl-8" />
              </Content>
            </>
          }
        />
        <Route
          path="add-product"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Add Product
              </PageTitle>
              <Content>
                <AddProduct />
              </Content>
            </>
          }
        />

        <Route index element={<Navigate to="/product/products" />} />
      </Route>
    </Routes>
  );
}

export default ProductPage;
