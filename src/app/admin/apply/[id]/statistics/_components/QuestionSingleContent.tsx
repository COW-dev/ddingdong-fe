'use client';
import Image from 'next/image';
import router from 'next/router';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Tooltip } from 'ddingdong-design-system';
import TextareaAutosize from 'react-textarea-autosize';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import File from '@/assets/file.svg';
import { AnswerItem, FileItem } from '@/types/apply';

const componentMap = {
  TEXT: TextList,
  LONG_TEXT: TextList,
} as const;

const ChartComponent = ({
  textType,
  answer,
}: {
  textType: 'TEXT' | 'LONG_TEXT';
  answer: AnswerItem;
}) => {
  const Component = componentMap[textType];
  return <Component answer={answer} />;
};

type Props = {
  id: number;
  type: 'TEXT' | 'LONG_TEXT' | 'FILE';
};

export default function QuestionSingleContent({ type, id }: Props) {
  const { data: answerData } = useSuspenseQuery(
    applyQueryOptions.singleField(id),
  );

  const groupFileItems = (data: AnswerItem[]) => {
    const grouped = data.reduce<Record<number, FileItem>>(
      (acc, { applicationId, name, answer }) => {
        if (!acc[applicationId]) {
          acc[applicationId] = { applicationId, name, answer: [] };
        }
        acc[applicationId].answer.push(answer);
        return acc;
      },
      {},
    );
    return Object.values(grouped);
  };

  const answers =
    answerData.type === 'FILE'
      ? groupFileItems(answerData.answers)
      : (answerData.answers ?? []);
  const isFileItemType = (answer: FileItem | AnswerItem): answer is FileItem =>
    Array.isArray(answer.answer);

  return (
    <Flex dir="col" gap={4} className="w-full">
      {answers.map((answer, index) => (
        <Tooltip content={answer.name} color="gray" key={index}>
          {isFileItemType(answer) ? (
            <FileList answer={answer} />
          ) : (
            <ChartComponent
              answer={answer}
              textType={type as 'TEXT' | 'LONG_TEXT'}
            />
          )}
        </Tooltip>
      ))}
    </Flex>
  );
}

function FileList({ answer }: { answer: FileItem }) {
  const handleClick = () => {
    const { id } = router.query;
    router.push(`/apply/${id}/${answer.applicationId}`);
  };

  return (
    <label
      className="flex flex-col rounded-xl border border-[#E5E7EB] px-5 py-2 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      htmlFor="file_input"
      onClick={handleClick}
    >
      {answer.answer.map((fileName) => (
        <Flex alignItems="center" key={fileName}>
          <Image
            src={File}
            width={20}
            height={20}
            alt="file"
            className="my-2 cursor-pointer"
          />
          <span className="ml-3">{fileName}</span>
        </Flex>
      ))}
    </label>
  );
}

function TextList({ answer }: { answer: AnswerItem }) {
  const handleClick = () => {
    const { id } = router.query;
    router.push(`/apply/${id}/${answer.applicationId}`);
  };

  return (
    <TextareaAutosize
      onClick={handleClick}
      readOnly
      className="block w-full resize-none rounded-xl border border-[#E5E7EB] p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      value={answer.answer}
    />
  );
}
