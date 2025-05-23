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
    <div className="mb-7 max-h-[50vh] overflow-scroll rounded-md border border-[#E5E7EB] px-2 md:px-[14px]">
      <Accordion
        onToggle={() => setIsOpen(!isOpen)}
        className="border-none pt-2 md:pt-[14px]"
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
      <div className="block w-full p-5 pt-0 text-sm font-semibold text-[#6B7280] outline-none md:text-base">
        응답자가 없는 문항입니다.
      </div>
    );
  }

  return (
    <div className="w-full">
      {isSingleType(type) ? (
        <>
          {type === 'FILE' && (
            <div className="w-full p-2 text-left text-xs font-semibold text-gray-500 md:text-sm">
              * FILE 저장기능은 지원자 상세화면에서 지원해요
            </div>
          )}
          <QuestionSingleContent id={id} type={type} />
        </>
      ) : (
        <QuestionMultipleContent id={id} type={type} />
      )}
    </div>
  );
}
