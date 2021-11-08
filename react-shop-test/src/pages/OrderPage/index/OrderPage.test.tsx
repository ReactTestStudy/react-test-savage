import React from 'react';
import { render, screen } from '@testing-library/react';
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
