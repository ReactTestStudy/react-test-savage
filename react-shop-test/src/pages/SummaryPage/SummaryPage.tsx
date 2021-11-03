import React, { MouseEvent, useState } from 'react';
import styles from './SummaryPage.module.css';

const SummaryPage = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = (e: MouseEvent) => {
    setChecked(prevState => !prevState);
  };
  return (
    <div className={styles.SummaryPage}>
      <form>
        <input type="checkbox" checked={checked} id="confirm-checkbox" />
        <label htmlFor="confirm-checkbox" onClick={handleCheckbox}>
          주문하려는 것을 확인하셧나요?
        </label>
        <button type="submit" disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};
export default SummaryPage;
