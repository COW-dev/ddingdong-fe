'use client';

import { Accordion, Body1, Body2, Flex, Item } from 'ddingdong-design-system';
import { FAQContainer } from '../_containers/FAQContainer';
import { FAQ } from '@/app/_api/types/faq';

export function FAQAccordion({ FAQs }: { FAQs: FAQ[] }) {
  return (
    <FAQContainer>
      <Accordion type="single">
        {FAQs?.map((faq) => (
          <Item
            key={faq.id}
            value={`item-${faq.id}`}
            trigger={
              <Flex gap={6}>
                <Flex>
                  <Body1>Q</Body1>
                  <Body1 className="text-primary-300">.</Body1>
                </Flex>

                <Body1>{faq.question}</Body1>
              </Flex>
            }
            btnClassName="p-6"
          >
            <Flex gap={6}>
              <Flex>
                <Body1>A</Body1>
                <Body1 className="text-primary-300">.</Body1>
              </Flex>
              <Body2>{faq.reply}</Body2>
            </Flex>
          </Item>
        ))}
      </Accordion>
    </FAQContainer>
  );
}
