import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { documentQueryOptions } from '../_api/queries/document';

import { DocumentClientPage } from './_pages/DocumentClientPage';

export const metadata: Metadata = {
  title: '띵동 - 자료실',
};

export default async function DocumentsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(documentQueryOptions.all(1));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentClientPage />
    </HydrationBoundary>
  );
}
