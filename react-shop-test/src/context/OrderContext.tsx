import { createContext, useEffect, useMemo, useState } from 'react';
import { OrderCounts, OrderTypes } from '../type/order.t';

const OrderContext = createContext({
  orderData: {
    products: new Map<string, number>(),
    options: new Map<string, number>(),
    totals: {
      [OrderTypes.Products]: 0,
      [OrderTypes.Options]: 0,
      total: 0,
    },
  },
  updateItemCount: (itemName: string, newItemCount: number, orderType: OrderTypes) => {},
});

type Totals = {
  [OrderTypes.Products]: number;
  [OrderTypes.Options]: number;
  total: number;
};

const OrderContextProvider = (props: any) => {
  const [orderCounts, setOrderCounts] = useState<OrderCounts>({
    products: new Map<string, number>(),
    options: new Map<string, number>(),
  });

  const [totals, setTotals] = useState<Totals>({
    [OrderTypes.Products]: 0,
    [OrderTypes.Options]: 0,
    total: 0,
  });

  const pricePreItems = {
    [OrderTypes.Products]: 1000,
    [OrderTypes.Options]: 500,
  };

  function calculateSubtotal(productType: OrderTypes, orderCounts: OrderCounts): number {
    let optionCount = 0;
    let orderCountsMap = orderCounts[productType] as Map<string, number>;

    for (const count of orderCountsMap.values()) {
      optionCount += count;
    }

    return optionCount * pricePreItems[productType];
  }

  // test 때문에 버그 수정함
  useEffect(() => {
    const productsTotal = calculateSubtotal(OrderTypes.Products, orderCounts);
    const optionsTotal = calculateSubtotal(OrderTypes.Options, orderCounts);
    // const total = productsTotal * optionsTotal; 테스트를 통한 버그 수정
    const total = productsTotal + optionsTotal;

    setTotals({
      [OrderTypes.Products]: productsTotal,
      [OrderTypes.Options]: optionsTotal,
      total,
    });
  }, [orderCounts]);

  //
  const value = useMemo(() => {
    const updateItemCount = (itemName: string, newItemCount: number, orderTypes: OrderTypes) => {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderTypes] as Map<string, number>;

      orderCountsMap.set(itemName, newItemCount);
      setOrderCounts({ ...newOrderCounts });
    };

    // 넣는 칸 이 헷갈림, 배열로 하지말고 객체로 하자
    return { orderData: { ...orderCounts, totals }, updateItemCount };
  }, [orderCounts, totals]);
  // 변할때 나오는값을 deps 에 넣어준다

  return <OrderContext.Provider value={value} {...props} />;
};

export { OrderContextProvider, OrderContext };
