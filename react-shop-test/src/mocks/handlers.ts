import { RequestHandler, rest } from 'msw';

export const handlers: RequestHandler[] = [
  rest.get('http://localhsot:5000/products', (req, res, context) => {
    return res(
      context.json([
        {
          name: 'America',
          imagePath: '/images/america.jpeg',
        },
        {
          name: 'england',
          imagePath: '/images/england.jpeg',
        },
      ])
    );
  }),
  rest.get('http://localhost:5000/options', (req, res, context) => {
    return res(context.json([{ name: 'Insurance' }, { name: 'Dinner' }]));
  }),
];
