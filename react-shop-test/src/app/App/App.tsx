import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import SummaryPage from '../../pages/SummaryPage/SummaryPage';
import OrderPage from '../../pages/OrderPage/OrderPage';

function App() {
  let routes = useRoutes([
    { path: '/', element: <SummaryPage /> },
    { path: 'order', element: <OrderPage /> },
  ]);

  return (
    <>
      <BrowserRouter>{routes}</BrowserRouter>
    </>
  );
}

export default App;
