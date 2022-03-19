import React, { MouseEvent, useContext } from 'react';
import styles from './CompletePage.module.css';
import { useQuery } from 'react-query';
import { postOrder } from '../OrderPage/order.service';
import { useNavigate } from 'react-router';
import { OrderContext } from '../../context/OrderContext';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';

const CompletePage = () => {
  const { orderData, resetOrder } = useContext(OrderContext);

  const { data, isLoading, isError } = useQuery<{ orderNumber: number; price: number }[]>(
    ['order', orderData],
    () => postOrder(orderData)
  );
  let navigate = useNavigate();

  const goFirstPage = (e: MouseEvent) => {
    resetOrder();
    e.preventDefault();
    navigate('/');
  };

  if (isLoading) return <>loading</>;
  if (isError) return <ErrorBanner />;

  const ordersList = data?.map(({ orderNumber, price }) => (
    <tr key={orderNumber}>
      <td>{orderNumber}</td>
      <td>{price}</td>
    </tr>
  ));

  return (
    <div className={styles.CompletePage}>
      <h1>주문이 성공했습니다</h1>
      <h3>지금까지 모든 주문</h3>
      <table style={{ margin: 'auto', border: '1px' }}>
        <thead>
          <tr>
            <th>number</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>{ordersList}</tbody>
      </table>
      <button onClick={goFirstPage}>첫 페이지로 돌아가기</button>
    </div>
  );
};

export default CompletePage;
