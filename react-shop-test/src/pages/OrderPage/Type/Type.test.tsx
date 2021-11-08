import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Type from './Type';
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from '../../../mocks/serever';
import { networkErrorHandlers } from '../../../mocks/handlers';

const queryClientOption = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

describe('<Type />', () => {
  test('display product images from server', async () => {
    const queryClient = new QueryClient(queryClientOption);

    render(
      <QueryClientProvider client={queryClient}>
        <Type orderType="product" />
      </QueryClientProvider>
    );

    const images = (await screen.findAllByRole('img', {
      name: /product$/i,
    })) as HTMLImageElement[];

    expect(images).toHaveLength(2);

    const altTexts = images.map(value => value.alt);

    expect(altTexts).toEqual(['America Product', 'England Product']);
  });

  test('when fetching product data, face an error', async () => {
    server.resetHandlers(...networkErrorHandlers);

    const queryClient = new QueryClient(queryClientOption);

    render(
      <QueryClientProvider client={queryClient}>
        <Type orderType="product" />
      </QueryClientProvider>
    );

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
    const client = new QueryClient(queryClientOption);

    render(
      <QueryClientProvider client={client}>
        <Type orderType="option" />
      </QueryClientProvider>
    );

    const optionCheckBoxes = await screen.findAllByRole('checkbox');

    expect(optionCheckBoxes).toHaveLength(2);
  });
});
