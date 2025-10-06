'use client';

import { PropsWithChildren } from 'react';

import {
  Accordion,
  Body1,
  Flex,
  AccordionItem,
  IconButton,
} from 'ddingdong-design-system';

import { FAQ } from '@/app/_api/types/faq';

type NewFAQAccordionProps = {
  newFAQs: FAQ[];
  onUpdate: (id: number, field: 'question' | 'reply', value: string) => void;
  onDelete: (id: number) => void;
};
export function NewFAQAccordion({
  newFAQs,
  onUpdate,
  onDelete,
}: NewFAQAccordionProps) {
  return (
    <FAQContainer>
      <Accordion type="single" className="w-full">
        {newFAQs?.map((faq) => (
          <Flex
            key={faq.id}
            justifyContent="between"
            alignItems="center"
            className="w-full gap-2"
          >
            <div className="min-w-0 flex-1">
              <AccordionItem
                value={`item-${faq.id}`}
                trigger={<FAQInput faq={faq} onUpdate={onUpdate} />}
                btnClassName="p-6"
              >
                <FAQAnswer faq={faq} onUpdate={onUpdate} />
              </AccordionItem>
            </div>

            <IconButton
              iconName="close"
              color="gray"
              size={20}
              className="shrink-0"
              onClick={() => onDelete(faq.id)}
            />
          </Flex>
        ))}
      </Accordion>
    </FAQContainer>
  );
}

function FAQInput({
  faq,
  onUpdate,
}: {
  faq: FAQ;
  onUpdate: (id: number, field: 'question' | 'reply', value: string) => void;
}) {
  return (
    <Flex gap={6} className="min-w-0 flex-1">
      <Flex className="shrink-0">
        <Body1>Q</Body1>
        <Body1 className="text-primary-300">.</Body1>
      </Flex>
      <div
        className="min-w-0 flex-1"
        onClickCapture={(e) => e.stopPropagation()}
        onMouseDownCapture={(e) => e.stopPropagation()}
      >
        <input
          name="question"
          placeholder="질문을 입력하세요."
          value={faq.question}
          onChange={(e) => {
            onUpdate(faq.id, 'question', e.target.value);
          }}
          className="w-full bg-transparent pb-2 text-left text-base font-semibold outline-none placeholder:text-gray-300 md:text-xl"
        />
      </div>
    </Flex>
  );
}

function FAQAnswer({
  faq,
  onUpdate,
}: {
  faq: FAQ;
  onUpdate: (id: number, field: 'question' | 'reply', value: string) => void;
}) {
  return (
    <Flex gap={6} className="w-full">
      <Flex className="shrink-0">
        <Body1>A</Body1>
        <Body1 className="text-primary-300">.</Body1>
      </Flex>
      <textarea
        name="reply"
        value={faq.reply}
        placeholder="답변을 입력하세요"
        rows={4}
        onChange={(e) => onUpdate(faq.id, 'reply', e.target.value)}
        className="max-w-full flex-1 resize-none rounded-md bg-white p-2 text-base font-medium outline-1 outline-gray-300 placeholder:text-gray-300 md:text-lg"
      />
    </Flex>
  );
}

function FAQContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      dir="col"
      justifyContent="between"
      alignItems="center"
      className="w-full"
    >
      {children}
    </Flex>
  );
}
