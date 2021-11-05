import { Product } from './order.t';
import axios from 'axios';

const getProducts = (): Promise<Product[]> =>
  axios.get<Product[]>('http://localhost:5000/products').then(({ data }) => data);

export { getProducts };
