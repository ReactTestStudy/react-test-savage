import OrderType from '../OrderType/OrderType';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../util/test-utils';

describe('OrderType Component', () => {
  it("update product's total when product change", async () => {
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
});
