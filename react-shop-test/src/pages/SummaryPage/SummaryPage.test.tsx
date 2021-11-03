import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SummaryPage from './SummaryPage';

describe('<SummaryPage />', () => {
  test('checkbox and button', () => {
    render(<SummaryPage />);

    const checkbox = screen.getByRole('checkbox', {
      name: '주문하려는 것을 확인하셧나요?',
    }) as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);

    const confirmButton = screen.getByRole('button', {
      name: '주문 확인',
    }) as HTMLInputElement;

    expect(confirmButton.disabled).toEqual(true);
    expect(confirmButton.type).toBe('submit');
  });
});
