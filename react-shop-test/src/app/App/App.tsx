import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router';
import SummaryPage from '../../pages/SummaryPage/SummaryPage';
import Type from '../../pages/OrderPage/Type/Type';
import OrderPage from '../../pages/OrderPage/OrderPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SummaryPage />} />
          <Route path="order" element={<OrderPage />} />
          {/* Provider 등록때문에 */}
          <Route path="type" element={<Type orderType="product" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
