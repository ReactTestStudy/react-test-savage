import {QueryClient, QueryClientProvider} from "react-query";
import {Wrapper} from "react-test-wrapper/react-testing-library";

const queryClientOption = {
  defaultOptions: {
    queries: {
      retry: false,
      cache: false
    },
  },
};
const queryClient = new QueryClient(queryClientOption);

const WrapperComponent = new Wrapper(QueryClientProvider)
  .withDefaultProps({
    client: queryClient
  })

export { WrapperComponent }