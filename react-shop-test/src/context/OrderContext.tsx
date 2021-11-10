import { createContext, useEffect, useMemo, useState } from 'react';
import { OrderCounts, OrderType } from '../type/order.t';

const OrderContext = createContext({
  orderData: {
    products: new Map<string, number>(),
    options: new Map<string, number>(),
    totals: {
      [OrderType.Products]: 0,
      [OrderType.Options]: 0,
      total: 0,
    },
  },
  updateItemCount: (itemName: string, newItemCount: number, orderType: OrderType) => {},
});

type Totals = {
  [OrderType.Products]: number;
  [OrderType.Options]: number;
  total: number;
};

const OrderContextProvider = (props: any) => {
  const [orderCounts, setOrderCounts] = useState<OrderCounts>({
    products: new Map<string, number>(),
    options: new Map<string, number>(),
  });

  const [totals, setTotals] = useState<Totals>({
    [OrderType.Products]: 0,
    [OrderType.Options]: 0,
    total: 0,
  });

  const pricePreItems = {
    [OrderType.Products]: 1000,
    [OrderType.Options]: 500,
  };

  function calculateSubtotal(productType: OrderType, orderCounts: OrderCounts): number {
    let optionCount = 0;
    let orderCountsMap = orderCounts[productType] as Map<string, number>;

    for (const count of orderCountsMap.values()) {
      optionCount += count;
    }

    return optionCount * pricePreItems[productType];
  }

  useEffect(() => {
    const productsTotal = calculateSubtotal(OrderType.Products, orderCounts);
    const optionsTotal = calculateSubtotal(OrderType.Products, orderCounts);
    const total = productsTotal * optionsTotal;

    setTotals({
      [OrderType.Products]: productsTotal,
      [OrderType.Options]: optionsTotal,
      total,
    });
  }, [orderCounts]);

  //
  const value = useMemo(() => {
    const updateItemCount = (itemName: string, newItemCount: number, orderType: OrderType) => {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType] as Map<string, number>;

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
