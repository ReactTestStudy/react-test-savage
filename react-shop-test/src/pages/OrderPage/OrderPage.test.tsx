import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderPage from './OrderPage';

describe('<OrderPage />', () => {
  test('it should mount', () => {
    render(<OrderPage />);

    const orderPage = screen.getByTestId('OrderPage');

    expect(orderPage).toBeInTheDocument();
  });
});
