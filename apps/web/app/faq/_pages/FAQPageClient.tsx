'use client';
import { Title1 } from '@dds/shared';

import { FAQ } from '@/_api/types/faq';

import { FAQAccordion } from '../_components/FAQAccordion';

export function FAQPageClient({ FAQs }: { FAQs: FAQ[] }) {
  return (
    <>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        FAQ
      </Title1>
      <FAQAccordion FAQs={FAQs ?? []} />
    </>
  );
}
