interface Product {
  name: string;
  imagePath: string;
}

interface Options {
  name: string;
}
export type { Product, Options };

export enum OrderTypes {
  Products = 'products',
  Options = 'options',
}

export type OrderCounts = {
  [OrderTypes.Products]: object;
  [OrderTypes.Options]: object;
};

export type Totals = {
  [OrderTypes.Products]: number;
  [OrderTypes.Options]: number;
  total: number;
};
