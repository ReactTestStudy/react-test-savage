import React from 'react';
import styles from './OrderPage.module.css';
import Type from './Type/Type';

const OrderPage = () => (
  <div className={styles.OrderPage} data-testid="OrderPage">
    <Type orderType="product" />
  </div>
);

export default OrderPage;
