import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompletePage from './CompletePage';

describe('<CompletePage />', () => {
  test('it should mount', () => {
    render(<CompletePage />);
    
    const completePage = screen.getByTestId('CompletePage');

    expect(completePage).toBeInTheDocument();
  });
});