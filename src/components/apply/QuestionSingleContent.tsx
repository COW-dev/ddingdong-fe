import React from 'react';
import Image from 'next/image';
import router from 'next/router';
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from '@radix-ui/react-tooltip';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import File from '@/assets/file.svg';
import { useSingleAnswer } from '@/hooks/api/apply/useSingleAnswer';
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
  const [{ token }] = useCookies();

  const { data } = useSingleAnswer(id, token);

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
    data?.data.type === 'FILE'
      ? groupFileItems(data?.data.answers)
      : data?.data.answers ?? [];
  const isFileItemType = (answer: FileItem | AnswerItem): answer is FileItem =>
    Array.isArray(answer.answer);

  return (
    <div className="flex w-full flex-col gap-4">
      {answers.map((answer, index) => (
        <TooltipProvider delayDuration={0} key={index}>
          <Tooltip>
            <TooltipTrigger>
              {isFileItemType(answer) ? (
                <FileList answer={answer} />
              ) : (
                <ChartComponent
                  answer={answer}
                  textType={type as 'TEXT' | 'LONG_TEXT'}
                />
              )}
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              sideOffset={0}
              className="m-2 rounded-lg bg-gray-100 p-1 px-1.5 text-sm md:p-2 md:px-2 md:text-base"
            >
              {answer.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
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
        <div key={fileName} className="flex items-center">
          <Image
            src={File}
            width={20}
            height={20}
            alt="file"
            className="my-2 cursor-pointer"
          />
          <span className="ml-3">{fileName}</span>
        </div>
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
      className="block w-full resize-none rounded-xl border border-[#E5E7EB]  p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      value={answer.answer}
    />
  );
}
