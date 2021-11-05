import React from 'react';
import styles from './Products.module.css';
import { Product } from '../order.t';

interface Props extends Product {}

const Products = ({ name, imagePath }: Props) => {
  return (
    <div className={styles.Products} data-testid="Products">
      <img className={styles.image} src={imagePath} alt={`${name} Product`} />
      <form className={styles.form}>
        <label className={styles.label} htmlFor="quantity">
          {name}
        </label>
        <input type="number" className={styles.input} name="quantity" min="0" defaultValue={0} />
      </form>
    </div>
  );
};

export default Products;
