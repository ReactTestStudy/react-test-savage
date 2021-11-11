import React, { ChangeEvent } from 'react';
import styles from './Option.module.css';
import { OrderTypes } from '../../../type/order.t';

type Props = {
  name: string;
  updateItemCount: (itemName: string, currentCount: number, orderType: OrderTypes) => void;
};

const Option = ({ name, updateItemCount }: Props) => {
  const handleChecked = ({ currentTarget: { checked } }: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, checked ? 1 : 0, OrderTypes.Options);
  };

  return (
    <div className={styles.Option} data-testid="Option">
      <form>
        <input id={`${name} option`} type="checkbox" onChange={handleChecked} />
        <label htmlFor={`${name} option`}>{name}</label>
      </form>
    </div>
  );
};

export default Option;
