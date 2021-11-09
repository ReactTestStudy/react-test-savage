import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Type from './Type';
import {QueryClient, QueryClientProvider} from 'react-query';
import {server} from '../../../mocks/serever';
import {networkErrorHandlers} from '../../../mocks/handlers';
import {Wrapper} from "react-test-wrapper/react-testing-library";
import userEvent from "@testing-library/user-event";
import {WrapperComponent} from "../../../app/TestWrapper";


describe('Type Component', () => {
  test('display product images from server', async () => {
    WrapperComponent.withDefaultChildren(<Type orderType='product'/>).render();

    const images = (await screen.findAllByRole('img', {
      name: /product$/i,
    })) as HTMLImageElement[];

    expect(images).toHaveLength(2);

    const altTexts = images.map(value => value.alt);

    expect(altTexts).toEqual(['America Product', 'England Product']);
  });

  test('when fetching product data, face an error', async () => {
    server.resetHandlers(...networkErrorHandlers);

    WrapperComponent.withDefaultChildren(<Type orderType='product'/>).render();

    const errorBanner = await screen.findByTestId(
      'error-banner',
      {},
      {
        timeout: 4000,
      }
    );
    expect(errorBanner).toHaveTextContent('에러가 발생했습니다');
  });

  it('fetch option information from server', async () => {
    WrapperComponent.withDefaultChildren(<Type orderType='option'/>).render();

    const optionCheckBoxes = await screen.findAllByRole('checkbox');

    expect(optionCheckBoxes).toHaveLength(2);
  });

  it("update product's total when product change", async () => {
    WrapperComponent.withDefaultChildren(<Type orderType='option'/>).render();

    // 부분적으로 찾으면 되니 정확도를 끈다
    const productsTotalPrice = await screen.findByText('상품 총 가격', {
      exact: false
    })
    expect(productsTotalPrice).toHaveTextContent("0");

    // 아메리카 상품 가격을 1개 올리면 1000이 되어야 한다
    const americaInput = await  screen.findByRole('spinbutton', {
      name: 'America'
    })

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");
    expect(productsTotalPrice).toHaveTextContent("1000");
    
    // 영국 세개 더
    // findByRole 사용 이유 => 서버에서 데이터 패치후에 되기때문에(비동기)
    const englandInput = await screen.findByRole('spinbutton', {
      name: "England"
    });

    // input textarea 에 텍스를 선택 한 후 제거 한다.
    userEvent.clear(englandInput);
    userEvent.type(englandInput, "3");
    expect(productsTotalPrice).toHaveTextContent("4000");
  });
});
