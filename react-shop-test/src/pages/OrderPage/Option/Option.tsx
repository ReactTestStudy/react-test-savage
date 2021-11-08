import React from 'react';
import styles from './Option.module.css';

type Props = {
  name: string;
};

const Option = ({ name }: Props) => (
  <div className={styles.Option} data-testid="Option">
    <form>
      <input id={`${name} option`} type="checkbox" />
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  </div>
);

export default Option;
