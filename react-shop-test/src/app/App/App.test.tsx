import { render, screen } from '../../pages/util/test.util';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('From order to order completion', async () => {
    render(<App />);

    const americanInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americanInput);
    userEvent.type(americanInput, '2');

    const englandInput = await screen.findByRole('spinbutton', {
      name: 'England',
    });

    userEvent.clear(englandInput);
    userEvent.type(englandInput, '3');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    // 주문하기 라고  value 값으로 측정하네
    const orderButton = screen.getByRole('button', {
      name: '주문하기',
    });

    userEvent.click(orderButton);
  });
});
