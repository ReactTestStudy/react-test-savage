interface Product {
  name: string;
  imagePath: string;
}

interface Options {
  name: string;
}
export type { Product, Options };

export enum OrderType {
  Products = 'products',
  Options = 'options',
}

export type OrderCounts = {
  [OrderType.Products]: object;
  [OrderType.Options]: object;
};
