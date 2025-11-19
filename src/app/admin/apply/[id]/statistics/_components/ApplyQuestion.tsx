import {
  Accordion,
  AccordionItem,
  Body3,
  Caption1,
  Card,
} from 'ddingdong-design-system';

import QuestionMultipleContent from '@/app/admin/apply/[id]/statistics/_components/QuestionMultipleContent';
import QuestionSingleContent from '@/app/admin/apply/[id]/statistics/_components/QuestionSingleContent';
import { ApplyQuestion } from '@/types/apply';

export function Question({ data }: { data: ApplyQuestion }) {
  const { question, count } = data;

  return (
    <Card className="max-h-[50vh] overflow-scroll p-0">
      <Accordion>
        <AccordionItem
          trigger={
            <div>
              <Body3 className="text-blue-500">{question}</Body3>
              <Caption1 weight="normal">응답 {count}개</Caption1>
            </div>
          }
          value="question"
        >
          <QuestionResponse data={data} />
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

function isSingleType(type: string): type is 'TEXT' | 'FILE' | 'LONG_TEXT' {
  return type === 'TEXT' || type === 'FILE' || type === 'LONG_TEXT';
}

function QuestionResponse({ data }: { data: ApplyQuestion }) {
  const { id, count, type } = data;

  if (!count) {
    return <Body3>응답자가 없는 문항입니다.</Body3>;
  }

  return (
    <div className="w-full">
      {isSingleType(type) ? (
        <>
          {type === 'FILE' && (
            <Caption1 className="w-full p-2 text-left">
              * FILE 저장기능은 지원자 상세화면에서 지원해요
            </Caption1>
          )}
          <QuestionSingleContent id={id} type={type} />
        </>
      ) : (
        <QuestionMultipleContent id={id} type={type} />
      )}
    </div>
  );
}
