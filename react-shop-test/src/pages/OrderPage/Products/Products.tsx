import React, { ChangeEvent } from 'react';
import styles from './Products.module.css';
import { OrderType, Product } from '../../../type/order.t';

interface Props extends Product {
  updateItemCount: (itemName: string, currentCount: number, orderType: OrderType) => void;
}

const Products = ({ name, imagePath, updateItemCount }: Props) => {
  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, parseInt(e.currentTarget.value), OrderType.Products);
  };

  return (
    <div className={styles.Products} data-testid="Products">
      <img
        className={styles.image}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} Product`}
      />
      <form className={styles.form}>
        <label className={styles.label} htmlFor="quantity">
          {name}
        </label>
        <input
          type="number"
          className={styles.input}
          name="quantity"
          min="0"
          defaultValue={0}
          onChange={onChangeQuantity}
        />
      </form>
    </div>
  );
};

export default Products;
