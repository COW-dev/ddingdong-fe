import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { documentQueryOptions } from '@/app/_api/queries/document';
import { RoleType } from '@/constants/role';

import { DocumentList } from './_components/DocumentList';

export const metadata: Metadata = {
  title: '띵동 - 자료실',
};

export default async function DocumentsPage() {
  const cookie = await cookies();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(documentQueryOptions.all(1));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentList role={cookie.get('role')?.value as keyof RoleType} />
    </HydrationBoundary>
  );
}
