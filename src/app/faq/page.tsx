import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { faqQueryOptions } from '../_api/queries/faq';
import { FAQ } from '../_api/types/faq';

import { FAQPageClient } from './_components/FAQPageClient';

export const metadata: Metadata = {
  title: '띵동 - FAQ',
};

export default async function FaqPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(faqQueryOptions.all());
  const FAQs = queryClient.getQueryData<FAQ[]>(faqQueryOptions.all().queryKey);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FAQPageClient FAQs={FAQs ?? []} />
    </HydrationBoundary>
  );
}
