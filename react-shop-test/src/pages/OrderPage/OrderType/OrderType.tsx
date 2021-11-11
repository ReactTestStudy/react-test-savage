import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import styles from './OrderType.module.css';
import Products from '../Products/Products';
import { Options, OrderTypes, Product } from '../../../type/order.t';
import { getOptions, getProducts } from '../order.service';
import ErrorBanner from '../../../components/ErrorBanner/ErrorBanner';
import Option from '../Option/Option';
import { OrderContext } from '../../../context/OrderContext';

type Props = {
  orderType: 'product' | 'option';
};

const OrderType = ({ orderType }: Props) => {
  const { orderData, updateItemCount } = useContext(OrderContext);
  const totalType = orderType === 'product' ? OrderTypes.Products : OrderTypes.Options;

  const { data, isError, isLoading } = useQuery<Product[] | Options[], Error>(
    `get-${orderType}`,
    orderType === 'product' ? getProducts : getOptions
  );

  const handleCount = (itemName: string, currentCount: number, orderType: OrderTypes) => {
    updateItemCount(itemName, currentCount, orderType);
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <ErrorBanner message={'에러가 발생했습니다'} />;

  let optionItems = null;

  if (orderType === 'product' && (data as Product[])) {
    const product = data as Product[];

    optionItems = product.map(({ name, imagePath }) => (
      <Products key={name} name={name} imagePath={imagePath} updateItemCount={handleCount} />
    ));
  } else {
    optionItems = data?.map(({ name }) => (
      <Option key={name} name={name} updateItemCount={handleCount} />
    ));
  }

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: ${orderData.totals[totalType]}</p>
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

export default OrderType;
