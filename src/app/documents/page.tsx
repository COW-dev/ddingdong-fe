import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { documentQueryOptions } from '../_api/queries/document';

import { DocumentClient } from './_components/DocumentClient';

export const metadata: Metadata = {
  title: '띵동 - 자료실',
};

export default async function DocumentsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(documentQueryOptions.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentClient />
    </HydrationBoundary>
  );
}
