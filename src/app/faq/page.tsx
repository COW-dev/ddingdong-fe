'use client';

import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import { faqQueryOptions } from '../_api/queries/faq';
import { Title1 } from 'ddingdong-design-system';
import { FAQAccordion } from './_components/FAQAccordion';

export default function FaqPage() {
  const { data: FAQs } = useQuery(faqQueryOptions.all());

  return (
    <>
      <Head>
        <title>띵동 - FAQ</title>
      </Head>
      <Title1 weight="bold" className="py-7 md:py-10">
        FAQ
      </Title1>
      <FAQAccordion FAQs={FAQs ?? []} />
    </>
  );
}
