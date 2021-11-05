import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Type from './Type';
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from '../../../mocks/serever';
import { rest } from 'msw';

describe('<Type />', () => {
  // test('display product images from server', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Type orderType="product" />
  //     </QueryClientProvider>
  //   );
  //
  //   const images = (await screen.findAllByRole('img', {
  //     name: /product$/i,
  //   })) as HTMLImageElement[];
  //
  //   expect(images).toHaveLength(2);
  //
  //   const altTexts = images.map(value => value.alt);
  //
  //   expect(altTexts).toEqual(['America Product', 'England Product']);
  // });

  test('when fetching product data, face an error', async () => {
    server.resetHandlers(
      rest.get('http://localhost:5000/products', (req, res, context) => {
        return res(context.status(400));
      })
    );

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

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
});
