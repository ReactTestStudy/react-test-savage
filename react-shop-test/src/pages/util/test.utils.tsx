import { QueryClient, QueryClientProvider } from 'react-query';
import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { OrderContextProvider } from '../../context/OrderContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderContextProvider>{children}</OrderContextProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
