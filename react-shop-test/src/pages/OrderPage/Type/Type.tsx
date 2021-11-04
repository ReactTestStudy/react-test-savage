import React from 'react';
import styles from './Type.module.css';

type Props = {
  orderType: 'product' | 'option';
};

const Type = ({ orderType }: Props) => {
  return (
    <div className={styles.Type} data-testid="Type">
      <img src="" alt="" />
    </div>
  );
};

export default Type;
