import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Type from './Type';
import {QueryClient, QueryClientProvider} from 'react-query';
import {server} from '../../../mocks/serever';
import {networkErrorHandlers} from '../../../mocks/handlers';
import {Wrapper} from "react-test-wrapper/react-testing-library";

const queryClientOption = {
  defaultOptions: {
    queries: {
      retry: false,
      cache: false
    },
  },
};
const queryClient = new QueryClient(queryClientOption);

const WrapperComponent = new Wrapper(QueryClientProvider)
  .withDefaultProps({
    client: queryClient
  })

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


    // 상품 가격을 1개 올리면 1000이 되어야 한다
    // 먼저 총가격이 이라는 role 을 찾아야한다
    // const productsTotal =

  });
});
