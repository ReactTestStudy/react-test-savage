import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Products from '../Products/Products';
import { Product } from '../order.t';
import { getProducts } from '../order.service';
import ErrorBanner from '../../../components/ErrorBanner/ErrorBanner';

type Props = {
  orderType: 'product' | 'option';
};

const Type = ({ orderType }: Props) => {
  const { data, status, isError, isLoading } = useQuery<Product[], Error>(
    'getProducts',
    getProducts
  );
  // console.log({
  //   data,
  //   isError,
  //   isLoading,
  //   status,
  //   date: new Date().getSeconds(),
  // });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <ErrorBanner message={'에러가 발생했습니다'} />;

  const optionItems = data?.map(({ name, imagePath }) => (
    <Products key={name} name={name} imagePath={imagePath} />
  ));

  return <div>{optionItems}</div>;
};

export default Type;
