import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { applyQueryOptions } from '@/app/_api/queries/apply';

import { ApplySubmitClientPage } from './_pages/ApplySubmitClientPage';

export default async function ApplySubmitPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(applyQueryOptions.sections(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApplySubmitClientPage id={Number(id)} />
    </HydrationBoundary>
  );
}
