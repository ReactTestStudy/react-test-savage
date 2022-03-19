import React, { useContext, MouseEvent } from 'react';
import styles from './OrderPage.module.css';
import OrderType from '../OrderType/OrderType';
import { OrderContext } from '../../../context/OrderContext';
import { useNavigate } from 'react-router';

const OrderPage = () => {
  let navigate = useNavigate();
  const {
    orderData: {
      totals: { total: totalPrice },
    },
  } = useContext(OrderContext);

  const goSummeryPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/summary');
  };

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
        <button onClick={goSummeryPage}>주문하기</button>
      </div>
    </div>
  );
};

export default OrderPage;
