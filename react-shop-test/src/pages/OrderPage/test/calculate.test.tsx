import OrderType from '../OrderType/OrderType';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '../../util/test.utils';
import OrderPage from '../index/OrderPage';

describe('OrderType Component', () => {
  test("update product's total when product change", async () => {
    render(<OrderType orderType={'product'} />);

    // 부분적으로 찾으면 되니 정확도를 끈다
    const productsTotalPrice = await screen.findByText('상품 총 가격', {
      exact: false,
    });
    expect(productsTotalPrice).toHaveTextContent('0');

    // 아메리카 상품 가격을 1개 올리면 1000이 되어야 한다
    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(productsTotalPrice).toHaveTextContent('1000');

    // 영국 세개 더
    // findByRole 사용 이유 => 서버에서 데이터 패치후에 되기때문에(비동기)
    const englandInput = await screen.findByRole('spinbutton', {
      name: 'England',
    });

    // input textarea 에 텍스를 선택 한 후 제거 한다.
    userEvent.clear(englandInput);
    userEvent.type(englandInput, '3');
    expect(productsTotalPrice).toHaveTextContent('4000');
  });

  test('update option`s when options change', async () => {
    render(<OrderType orderType="option" />);

    // 옵션 총가격이 0부터 시작
    const optionsTotalPrice = await screen.findByText('옵션 총 가격', {
      exact: false,
    });

    expect(optionsTotalPrice).toHaveTextContent('0');

    // 보험 옵션 추가
    const insuranceCheckBox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckBox);
    expect(insuranceCheckBox).toBeChecked();
    expect(optionsTotalPrice).toHaveTextContent('500');

    const dinnerCheckbox = screen.getByRole('checkbox', {
      name: 'Dinner',
    });
    userEvent.click(dinnerCheckbox);
    expect(optionsTotalPrice).toHaveTextContent('1000');
  });

  describe('total price of goods and options', () => {
    test('total price starts with 0 and Updating total price when adding one product', async () => {
      render(<OrderPage />);

      const totalPrice = screen.getByText('Total Price', { exact: false });

      expect(totalPrice).toHaveTextContent('0');

      const americaInput = await screen.findByRole('spinbutton', {
        name: 'America',
      });

      userEvent.clear(americaInput);
      userEvent.type(americaInput, '1');

      expect(totalPrice).toHaveTextContent('1000');
    });

    test('Updating total price adding one option', async () => {
      render(<OrderPage />);

      const americaInput = await screen.findByRole('spinbutton', {
        name: 'America',
      });

      const totalPrice = screen.getByText('Total Price', { exact: false });

      userEvent.clear(americaInput);
      userEvent.type(americaInput, '1');
      expect(totalPrice).toHaveTextContent('0');

      // 보험 옵션 추가
      const insuranceCheckBox = await screen.findByRole('checkbox', {
        name: 'Insurance',
      });
      userEvent.click(insuranceCheckBox);

      expect(insuranceCheckBox).toBeChecked();
      expect(totalPrice).toHaveTextContent('500');
      expect(totalPrice).toHaveTextContent('1500');
    });

    test('Updating total price when removing option and products', async () => {
      render(<OrderPage />);

      const totalPrice = screen.getByText('Total Price', { exact: false });

      expect(totalPrice).toHaveTextContent('0');

      const americaInput = await screen.findByRole('spinbutton', {
        name: 'America',
      });
      const insuranceCheckBox = await screen.findByRole('checkbox', {
        name: 'Insurance',
      });

      userEvent.clear(americaInput);
      userEvent.type(americaInput, '1');

      userEvent.click(insuranceCheckBox);

      userEvent.clear(americaInput);
      userEvent.type(americaInput, '3');

      // 0 이 틀린거다 500
      expect(totalPrice).toHaveTextContent('0');
      expect(totalPrice).toHaveTextContent('3500');
    });
  });
});
