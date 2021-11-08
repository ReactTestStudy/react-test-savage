import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './SummaryPage.module.css';
import { useNavigate } from 'react-router';

const SummaryPage = () => {
  const [checked, setChecked] = useState(false);
  let navigate = useNavigate();

  const handleCheckbox = (e: ChangeEvent) => {
    setChecked(prevState => !prevState);
  };

  const goOrderPage = (e: MouseEvent) => {
    e.preventDefault();
    navigate('order');
  };

  return (
    <div className={styles.SummaryPage}>
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
        <button type="submit" onClick={goOrderPage} disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};
export default SummaryPage;
