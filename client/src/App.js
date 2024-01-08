import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Checkout from './Pages/Checkout';
import CartPage from './Pages/CartPage';
import Register from './Pages/Register.jsx';
import RegisterNewProduct from './Pages/RegisterNewProduct.jsx';
import MainProduct from './Components/MainProduct.jsx';
import AdminLoginpage from './Pages/AdminLoginPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Success from './Pages/Success.jsx';
import NotFound from './Pages/NotFound.jsx';
import Address from './Pages/Address.jsx';
import Profile from './Pages/Profile.jsx';
import Inventory from './Pages/Inventory.jsx';
import { Check } from 'lucide-react';
import { ProductList } from './Components/ProductList.jsx';
import ProductsPage from './Pages/ProductsPage.jsx';
import SpecificProduct from './Components/SpecificProduct.jsx';

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/checkout' element={<Checkout /> } />
        <Route path='/address' element={<Address/>} />
        <Route path="/register" element={ <Register /> } />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/adminLogin' element={<AdminLoginpage/>} />
        <Route path='admin/registerProduct' element={<RegisterNewProduct />} />
        <Route path='/product/:productID' element={ <MainProduct />} />
        <Route path='/success' element={<Success /> } />
        <Route path='/admin/Profile' element={<Profile />} />
        <Route path='/admin/Inventory' element={<Inventory />} />
        <Route path='/products' element={<ProductsPage/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

