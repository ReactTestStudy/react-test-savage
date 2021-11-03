import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SummaryPage from './SummaryPage';

describe('<SummaryPage />', () => {
  test('it should mount', () => {
    render(<SummaryPage />);

    const summaryPage = screen.getByTestId('SummaryPage');

    expect(summaryPage).toBeInTheDocument();
  });
});
