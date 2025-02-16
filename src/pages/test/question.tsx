import React, { useState } from 'react';
import QuestionMultipleContent from '@/components/apply/QuestionMultipleContent';
import QuestionSingleContent from '@/components/apply/QuestionSingleContent';
import Accordion from '@/components/common/Accordion';
import { ApplyQuestion } from '@/types/apply';

type Props = {
  data: ApplyQuestion;
};

export default function Question({ data }: Props) {
  const { question, count } = data;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-7 max-h-[50vh] overflow-scroll rounded-md border border-[#E5E7EB] p-2 md:p-[14px]">
      <Accordion
        onToggle={() => setIsOpen(!isOpen)}
        className="border-none"
        visible={false}
        title={
          <>
            <p className="text-base font-semibold text-blue-500 md:text-xl">
              {question}
            </p>
            <span className="text-sm">응답 {count}개</span>
          </>
        }
      >
        {isOpen && <QuestionResponse data={data} />}
      </Accordion>
    </div>
  );
}

function isSingleType(type: string): type is 'TEXT' | 'FILE' | 'LONG_TEXT' {
  return type === 'TEXT' || type === 'FILE' || type === 'LONG_TEXT';
}

function QuestionResponse({ data }: Props) {
  const { id, count, type } = data;

  if (!count) {
    return (
      <div className="block w-full p-5 text-sm font-semibold text-[#6B7280] outline-none md:text-base">
        응답자가 없는 문항입니다.
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      {isSingleType(type) ? (
        <QuestionSingleContent id={id} type={type} />
      ) : (
        <QuestionMultipleContent id={id} type={type} />
      )}
    </div>
  );
}
