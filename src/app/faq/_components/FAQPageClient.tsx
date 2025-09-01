'use client';
import { Title1 } from 'ddingdong-design-system';

import { FAQ } from '@/app/_api/types/faq';

import { FAQAccordion } from './FAQAccordion';

export function FAQPageClient({ FAQs }: { FAQs: FAQ[] }) {
  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        FAQ
      </Title1>
      <FAQAccordion FAQs={FAQs ?? []} />
    </>
  );
}
