import React from 'react';
import { render, screen } from '../../../pages/util/test.util';
import '@testing-library/jest-dom/extend-expect';
import OrderPage from './OrderPage';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('<OrderPage />', () => {
  test('it should mount', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <OrderPage />
      </QueryClientProvider>
    );

    const orderPage = screen.getByTestId('OrderPage');

    expect(orderPage).toBeInTheDocument();
  });
});
