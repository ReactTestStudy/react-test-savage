import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import SummaryPage from '../../pages/SummaryPage/SummaryPage';
import OrderPage from '../../pages/OrderPage/index/OrderPage';
import { OrderContextProvider } from '../../context/OrderContext';
import CompletePage from '../../pages/CompletePage/CompletePage';

function App() {
  let routes = useRoutes([
    { path: '/', element: <OrderPage /> },
    { path: '/summary', element: <SummaryPage /> },
    { path: '/complete', element: <CompletePage /> },
  ]);

  return <OrderContextProvider>{routes}</OrderContextProvider>;
}

export default App;
