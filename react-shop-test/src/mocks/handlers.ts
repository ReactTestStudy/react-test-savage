import { RequestHandler, ResponseComposition, rest, RestContext, RestRequest } from 'msw';

// const responseResolver = (req: RestRequest, res: ResponseComposition, context: RestContext) => {};

const defaultUrl = 'http://localhost:5000';

export const handlers: RequestHandler[] = [
  rest.get(`${defaultUrl}/products`, (req, res, context) => {
    return res(
      context.json([
        {
          name: 'America',
          imagePath: '/images/america.jpeg',
        },
        {
          name: 'England',
          imagePath: '/images/england.jpeg',
        },
      ])
    );
  }),
  rest.get(`${defaultUrl}/options`, (req, res, context) => {
    return res(context.json([{ name: 'Insurance' }, { name: 'Dinner' }]));
  }),
  rest.post(`${defaultUrl}/orders`, (req, res, context) => {
    let dummyData = [{ orderNumber: 21232343234, price: 2000 }];

    return res(context.json(dummyData));
  }),
];

export const networkErrorHandlers = [
  rest.get('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.post('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.patch('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.put('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.delete('*', (req, res, ctx) => res.networkError('Boom there was error')),
];
