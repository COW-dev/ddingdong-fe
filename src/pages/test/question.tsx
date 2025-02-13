import React, { useState } from 'react';
import QuestionMultipleContent from '@/components/apply/QuestionMultipleContent';
import QuestionSingleContent from '@/components/apply/QuestionSingleContent';
import Accordion from '@/components/common/Accordion';
import { ApplyQuestion } from '@/types/apply';

type Props = {
  data: ApplyQuestion;
};

function Question({ data }: Props) {
  const { id, question, count, type } = data;
  const [isOpen, setIsOpen] = useState(false);

  function isSingleType(type: string): type is 'TEXT' | 'FILE' | 'LONG_TEXT' {
    return type === 'TEXT' || type === 'FILE' || type === 'LONG_TEXT';
  }

  return (
    <div className="mt-7 rounded-md border border-[#E5E7EB] p-2 md:p-[14px]">
      <Accordion
        onToggle={() => setIsOpen(!isOpen)}
        className="border-none"
        visible={false}
        title={
          <div>
            <p className="text-base font-semibold text-blue-500 md:text-xl">
              {question}
            </p>
            <span className="text-sm">응답 {count}개</span>
          </div>
        }
      >
        <div className="flex justify-center">
          {isOpen && (
            <>
              {isSingleType(type) ? (
                <QuestionSingleContent id={id} type={type} />
              ) : (
                <QuestionMultipleContent id={id} type={type} />
              )}
            </>
          )}
        </div>
      </Accordion>
    </div>
  );
}

export default Question;
