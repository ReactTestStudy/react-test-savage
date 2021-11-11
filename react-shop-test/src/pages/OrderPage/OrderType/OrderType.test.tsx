import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderType from './OrderType';
import { server } from '../../../mocks/serever';
import { networkErrorHandlers } from '../../../mocks/handlers';
import { render } from '../../util/test.utils';

describe('OrderType Component', () => {
  test('display product images from server', async () => {
    render(<OrderType orderType={'product'} />);

    const images = (await screen.findAllByRole('img', {
      name: /product$/i,
    })) as HTMLImageElement[];

    expect(images).toHaveLength(2);

    const altTexts = images.map(value => value.alt);

    expect(altTexts).toEqual(['America Product', 'England Product']);
  });

  test('when fetching product data, face an error', async () => {
    server.resetHandlers(...networkErrorHandlers);

    render(<OrderType orderType={'product'} />);

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
    render(<OrderType orderType={'option'} />);

    const optionCheckBoxes = await screen.findAllByRole('checkbox');

    expect(optionCheckBoxes).toHaveLength(2);
  });
});
