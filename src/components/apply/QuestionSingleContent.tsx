import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import router from 'next/router';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import File from '@/assets/file.svg';
import { AnswerItem, useSingleAnswer } from '@/hooks/api/apply/useSingleAnswer';
const componentMap = {
  TEXT: TextList,
  LONG_TEXT: TextList,
  FILE: FileList,
} as const;

type Props = {
  id: number;
  type: 'TEXT' | 'FILE' | 'LONG_TEXT';
};

export default function QuestionSingleContent({ type, id }: Props) {
  const [{ token }] = useCookies();
  const ChartComponent = componentMap[type];

  const { data } = useSingleAnswer(id, token);

  return (
    <div className="flex w-full flex-col gap-4">
      {data?.data.answers.map((answer, index) => {
        return <ChartComponent answer={answer} key={index} />;
      })}
    </div>
  );
}

function FileList({ answer }: { answer: AnswerItem }) {
  return (
    <label
      className="flex items-center rounded-xl border border-[#E5E7EB] p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      htmlFor="file_input"
    >
      <Image
        src={File}
        width={20}
        height={20}
        alt="file"
        className="my-2 ml-3 cursor-pointer"
      />
      <span className="ml-3">{answer.answer}</span>
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
      className="block w-full rounded-xl border border-[#E5E7EB]  p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      value={answer.answer}
    />
  );
}
