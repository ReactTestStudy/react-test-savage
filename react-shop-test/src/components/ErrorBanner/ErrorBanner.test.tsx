import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBanner from './ErrorBanner';

describe('<ErrorBanner />', () => {
  test('it should mount', () => {
    render(<ErrorBanner />);

    const errorBanner = screen.getByTestId('error-banner');

    expect(errorBanner).toBeInTheDocument();
  });
});
