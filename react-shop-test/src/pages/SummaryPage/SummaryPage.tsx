import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import styles from './SummaryPage.module.css';
import { useNavigate } from 'react-router';
import { OrderContext } from '../../context/OrderContext';
import { OrderTypes } from '../../type/order.t';

const OptionDisplay = () => {
  const {
    orderData: { totals, options },
  } = useContext(OrderContext);

  if (options.size < 1) return null;

  return (
    <>
      <h2>옵션: {totals[OrderTypes.Options]}</h2>
      <ul>
        {Array.from(options.keys()).map(option => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </>
  );
};

const SummaryPage = () => {
  let navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const {
    orderData: { totals, products },
  } = useContext(OrderContext);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(prevState => !prevState);
  };

  const productList = Array.from(products).map(([key, value]) => (
    <li key={key}>
      {value}&nbsp;{key}
    </li>
  ));

  const goCompletePage = (e: MouseEvent) => {
    e.preventDefault();
    navigate('/complete', {
      replace: true,
    });
  };

  return (
    <div className={styles.SummaryPage}>
      <h1>주문 확인</h1>
      <h2>여행 상품: {totals.total}</h2>
      {productList}
      <OptionDisplay />

      <form>
        <label htmlFor="confirm-checkbox" defaultChecked={false}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
            id="confirm-checkbox"
          />
          주문하려는 것을 확인하셧나요?
        </label>
        <button type="submit" onClick={goCompletePage} disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};
export default SummaryPage;
