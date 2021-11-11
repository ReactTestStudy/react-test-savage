import { Options, Product } from '../../type/order.t';
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000',
});
const getProducts = (): Promise<Product[]> =>
  Axios.get<Product[]>('/products').then(({ data }) => data);

const getOptions = (): Promise<Options[]> => Axios.get('options').then(({ data }) => data);

export { getProducts, getOptions };
