import React, { ChangeEvent } from 'react';
import styles from './Products.module.css';
import { OrderTypes, Product } from '../../../type/order.t';

interface Props extends Product {
  updateItemCount: (itemName: string, currentCount: number, orderType: OrderTypes) => void;
}

const Products = ({ name, imagePath, updateItemCount }: Props) => {
  const onChangeQuantity = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    const count = isNaN(parseInt(value)) ? 0 : parseInt(value);
    updateItemCount(name, count, OrderTypes.Products);
  };

  return (
    <div className={styles.Products} data-testid="Products">
      <img
        className={styles.image}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} Product`}
      />
      <form className={styles.form}>
        <label className={styles.label} htmlFor={name}>
          {name}
        </label>
        <input
          id={name}
          type="number"
          className={styles.input}
          name="quantity"
          min="0"
          onChange={onChangeQuantity}
        />
      </form>
    </div>
  );
};

export default Products;
