import React from 'react';
import styles from './ErrorBanner.module.css';

type Props = {
  message?: string;
};

const ErrorBanner = ({ message = '에러가 발생했습니다.' }: Props) => (
  <div className={styles.ErrorBanner} data-testid="error-banner">
    {message}
  </div>
);

export default ErrorBanner;
