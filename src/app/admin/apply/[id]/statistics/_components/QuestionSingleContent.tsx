'use client';
import { useRouter } from 'next/navigation';

import { Caption1, Flex, Icon, Tooltip } from 'ddingdong-design-system';
import TextareaAutosize from 'react-textarea-autosize';

import { AnswerItem, FileItem } from '@/types/apply';

import { useQuestion } from '../_hooks/useQeustion';

import { ChartComponent } from './ChartComponent';
import { isFileItemType } from '../_utils/validate';

type Props = {
  id: number;
  type: 'TEXT' | 'LONG_TEXT' | 'FILE';
};

export function QuestionSingleContent({ type, id }: Props) {
  const { answers } = useQuestion(id);
  console.log(answers);
  return (
    <Flex dir="col" gap={4} className="w-full">
      {answers.map((answer, index) => (
        <Tooltip content={answer.name} color="gray" key={index}>
          {isFileItemType(answer) ? (
            <FileList answer={answer} id={id} />
          ) : (
            <ChartComponent
              answer={answer}
              type={type as 'TEXT' | 'LONG_TEXT'}
              id={id}
            />
          )}
        </Tooltip>
      ))}
    </Flex>
  );
}

export function FileList({ answer, id }: { answer: FileItem; id: number }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/apply/${id}/${answer.applicationId}`);
  };

  return (
    <label
      className="flex flex-col rounded-xl border border-[#E5E7EB] px-5 py-2 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      htmlFor="file_input"
      onClick={handleClick}
    >
      {answer.answer.map((fileName, index) => (
        <Flex alignItems="center" key={index} gap={1}>
          <Icon name={'file'} className="my-2 cursor-pointer" />
          <Caption1>{fileName}</Caption1>
        </Flex>
      ))}
    </label>
  );
}

export function TextList({ answer, id }: { answer: AnswerItem; id: number }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/apply/${id}/${answer.applicationId}`);
  };

  return (
    <TextareaAutosize
      onClick={handleClick}
      readOnly
      className="w-full resize-none rounded-xl border border-[#E5E7EB] p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      value={answer.answer}
    />
  );
}
