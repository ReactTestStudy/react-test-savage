import { QueryClient, QueryClientProvider } from 'react-query';
import { FC, ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OrderContextProvider } from '../../context/OrderContext';
import { RenderOptions, render } from '@testing-library/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <OrderContextProvider>{children}</OrderContextProvider>
      </QueryClientProvider>
    </Router>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
