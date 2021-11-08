import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Option from './Option';

describe('<Option />', () => {
  test('it should mount', () => {
    render(<Option name={'hello'} />);

    const option = screen.getByTestId('Option');

    expect(option).toBeInTheDocument();
  });
});
