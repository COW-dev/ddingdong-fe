import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
      },
    },
  });
};

let clientQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (!clientQueryClient) {
    clientQueryClient = makeQueryClient();
  }
  return clientQueryClient;
};

export const ClientQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
