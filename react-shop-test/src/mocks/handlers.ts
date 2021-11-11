import { RequestHandler, ResponseComposition, rest, RestContext, RestRequest } from 'msw';

// const responseResolver = (req: RestRequest, res: ResponseComposition, context: RestContext) => {};

export const handlers: RequestHandler[] = [
  rest.get('http://localhost:5000/products', (req, res, context) => {
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
  rest.get('http://localhost:5000/options', (req, res, context) => {
    return res(context.json([{ name: 'Insurance' }, { name: 'Dinner' }]));
  }),
];

export const networkErrorHandlers = [
  rest.get('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.post('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.patch('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.put('*', (req, res, ctx) => res.networkError('Boom there was error')),
  rest.delete('*', (req, res, ctx) => res.networkError('Boom there was error')),
];
