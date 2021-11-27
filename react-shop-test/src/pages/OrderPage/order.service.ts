import { Options, Product, Totals } from '../../type/order.t';
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000',
});
const getProducts = (): Promise<Product[]> =>
  Axios.get<Product[]>('/products').then(({ data }) => data);

const getOptions = (): Promise<Options[]> => Axios.get('options').then(({ data }) => data);

const postOrder = (orderData: {
  totals: Totals;
  products: Map<string, number>;
  options: Map<string, number>;
}): Promise<{ orderNumber: number; price: number }[]> =>
  Axios.post('/order', { ...orderData }).then(({ data }) => data);

export { getProducts, getOptions, postOrder };
