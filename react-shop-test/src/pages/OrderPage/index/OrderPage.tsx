import React, { useContext } from 'react';
import styles from './OrderPage.module.css';
import OrderType from '../OrderType/OrderType';
import { OrderContext } from '../../../context/OrderContext';

const OrderPage = () => {
  const {
    orderData: {
      totals: { total: totalPrice },
    },
  } = useContext(OrderContext);

  return (
    <div className={styles.OrderPage} data-testid="OrderPage">
      <h1>Travel Products</h1>
      <div>
        <OrderType orderType="product" />
      </div>
      <div className={styles.options}>
        <div style={{ width: '50%' }}>
          <OrderType orderType="option" />
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <h2>Total Price: {totalPrice}</h2> <br />
        <button>주문</button>
      </div>
    </div>
  );
};

export default OrderPage;
