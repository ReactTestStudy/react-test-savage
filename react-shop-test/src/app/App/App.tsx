import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import SummaryPage from '../../pages/SummaryPage/SummaryPage';
import OrderPage from '../../pages/OrderPage/index/OrderPage';

function App() {
  let routes = useRoutes([
    { path: '/', element: <SummaryPage /> },
    { path: 'order', element: <OrderPage /> },
  ]);

  return <>{routes}</>;
}

export default App;
