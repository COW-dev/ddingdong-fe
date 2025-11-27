import {
  Accordion,
  AccordionItem,
  Body3,
  Caption1,
  Card,
} from 'ddingdong-design-system';

import { QuestionMultipleContent } from '@/app/admin/apply/[id]/statistics/_components/QuestionMultipleContent';
import { QuestionSingleContent } from '@/app/admin/apply/[id]/statistics/_components/QuestionSingleContent';
import { ApplyQuestion } from '@/types/apply';

import { isSingleType } from '../_utils/validate';

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

function QuestionResponse({ data }: { data: ApplyQuestion }) {
  const { id, count, type } = data;

  if (!count) {
    return (
      <Caption1 weight="normal" className="text-gray-300">
        응답자가 없는 문항입니다.
      </Caption1>
    );
  }

  return (
    <div>
      {isSingleType(type) ? (
        <>
          {type === 'FILE' && (
            <Caption1
              weight="normal"
              className="w-full p-2 text-left text-gray-400"
            >
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
