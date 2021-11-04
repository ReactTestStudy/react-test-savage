import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Type from './Type';

describe('<Type />', () => {
  test('display product images from server', async () => {
    render(<Type orderType="product" />);

    const images = (await screen.findAllByRole('img', {
      name: /product$/i,
    })) as HTMLImageElement[];

    expect(images).toHaveLength(2);

    const altTexts = images.map(value => value.alt);

    expect(altTexts).toEqual(['America Product', 'England Product']);
  });
});
