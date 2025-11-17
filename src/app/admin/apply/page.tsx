import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Metadata } from 'next';

import { applyQueryOptions } from '@/app/_api/queries/apply';

import { ApplyAdminClientPage } from './_pages/ApplyAdminClientPage';

export const metadata: Metadata = {
  title: '띵동 - 지원서 관리',
};

export default async function ApplyAdminPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(applyQueryOptions.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApplyAdminClientPage />
    </HydrationBoundary>
  );
}
