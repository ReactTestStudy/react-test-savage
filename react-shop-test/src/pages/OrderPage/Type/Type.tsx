import React from 'react';
import { useQuery } from 'react-query';
import styles from './Type.module.css';
import Products from '../Products/Products';
import { Options, Product } from '../order.t';
import { getOptions, getProducts } from '../order.service';
import ErrorBanner from '../../../components/ErrorBanner/ErrorBanner';
import Option from '../Option/Option';

type Props = {
  orderType: 'product' | 'option';
};

const Type = ({ orderType }: Props) => {
  const { data, isError, isLoading } = useQuery<Product[] | Options[], Error>(
    `get-${orderType}`,
    orderType === 'product' ? getProducts : getOptions
  );

  if (isLoading) return <div>loading...</div>;
  if (isError) return <ErrorBanner message={'에러가 발생했습니다'} />;

  let optionItems = null;
  if (orderType === 'product' && (data as Product[])) {
    const product = data as Product[];

    optionItems = product.map(({ name, imagePath }) => (
      <Products key={name} name={name} imagePath={imagePath} />
    ));
  } else {
    optionItems = data?.map(({ name }) => <Option key={name} name={name} />);
  }

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격:$ {}</p>
      <div
        className={styles.optionContainer}
        style={{
          flexDirection: orderType === 'option' ? 'column' : 'row',
        }}
      >
        {optionItems}
      </div>
    </>
  );
};

export default Type;
